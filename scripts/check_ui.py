from pathlib import Path
from playwright.sync_api import sync_playwright

out = Path('artifacts')
out.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for label, width, height in [('wide', 1920, 1080), ('desktop', 1440, 900), ('laptop', 1024, 768), ('menu-breakpoint', 980, 800), ('tablet', 768, 900), ('compact-tablet', 600, 800), ('mobile', 390, 844), ('small-mobile', 320, 700)]:
        page = browser.new_page(viewport={'width': width, 'height': height}, device_scale_factor=1)
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto('http://localhost:5173/', wait_until='networkidle')
        page.locator('img').evaluate_all('(imgs) => imgs.forEach(i => { if (i.loading === "lazy") i.loading = "eager" })')
        page.wait_for_timeout(700)
        page.evaluate('''async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo({top:y, behavior:'instant'}); await new Promise(r => setTimeout(r, 80)); } scrollTo({top:0, behavior:'instant'}); }''')
        page.wait_for_timeout(750)
        if label in ('desktop', 'tablet', 'mobile'):
            page.screenshot(path=str(out / f'{label}.png'), full_page=True)
        clipped_titles = page.locator('h1,h2,h3').evaluate_all('(headings) => headings.filter(h => h.scrollWidth > h.clientWidth + 2).map(h => h.textContent)')
        assert not clipped_titles, f'{label}: title exceeds its column: {clipped_titles}'
        overflow = page.evaluate('document.documentElement.scrollWidth > window.innerWidth')
        if overflow:
            offenders = page.evaluate('''() => ({widths:[document.documentElement.scrollWidth, document.body.scrollWidth, innerWidth], wide:[...document.querySelectorAll('*')].filter(el => el.scrollWidth > el.clientWidth + 2).slice(0, 20).map(el => [el.tagName, el.className, el.scrollWidth, el.clientWidth])})''')
            raise AssertionError(f'{label}: horizontal overflow: {offenders}')
        assert page.locator('h1').count() == 1
        broken = page.locator('img').evaluate_all('(imgs) => imgs.filter(i => !i.complete || !i.naturalWidth).map(i => i.src)')
        assert not broken, f'{label}: image failed: {broken}'
        assert not errors, f'{label}: {errors}'
        if width <= 980:
            page.get_by_role('button', name='Abrir menú').click()
            assert page.get_by_role('navigation', name='Navegación principal').is_visible()
            page.keyboard.press('Escape')
            assert page.get_by_role('button', name='Abrir menú').get_attribute('aria-expanded') == 'false'
            page.get_by_role('button', name='Abrir menú').click()
            page.get_by_role('navigation', name='Navegación principal').get_by_text('Servicios').click()
            assert page.get_by_role('button', name='Abrir menú').get_attribute('aria-expanded') == 'false'
        service_boxes = page.locator('.service-card').evaluate_all('(cards) => cards.map(c => { const b=c.getBoundingClientRect(); return {x:b.x,y:b.y,width:b.width,height:b.height}; })')
        if width > 760:
            assert service_boxes[0]['height'] > service_boxes[1]['height'] * 1.5, f'{label}: missing dominant service image'
            assert abs(service_boxes[1]['x'] - service_boxes[2]['x']) < 2, f'{label}: supporting services are misaligned'
        else:
            assert max(box['x'] for box in service_boxes) - min(box['x'] for box in service_boxes) < 2, f'{label}: mobile services must stack'
        portfolio_heading = page.locator('.portfolio .section-head').bounding_box()
        portfolio_caption = page.locator('.portfolio-main > div').bounding_box()
        assert portfolio_heading['y'] + portfolio_heading['height'] < portfolio_caption['y'], f'{label}: gallery title overlaps caption'
        anchors = page.locator('a[href^="#"]').evaluate_all('(links) => links.every(a => document.querySelector(a.getAttribute("href")))')
        assert anchors, f'{label}: broken section link'
        page.get_by_role('button', name='Ver detalle').first.click()
        assert page.get_by_text('Caracterización, diseño de dosificación').is_visible()
        page.get_by_role('link', name='Consultar esta solución').first.click()
        assert page.locator('#subject').input_value() == 'Estabilización de suelos'
        page.get_by_role('tab', name='Aplicaciones', exact=True).click()
        assert page.get_by_role('tabpanel', name='Aplicaciones').is_visible()
        assert page.get_by_text('Sobrantes de túneles y materiales de excavación', exact=True).is_visible()
        page.get_by_role('tab', name='Aplicaciones', exact=True).press('ArrowRight')
        assert page.get_by_role('tab', name='El diseño', exact=True).get_attribute('aria-selected') == 'true'
        page.get_by_role('button', name='Llevar la solución a obra').click()
        assert page.get_by_text('En campo: aplicación de la solución diseñada para esa infraestructura.', exact=True).is_visible()
        page.get_by_text('¿La misma dosificación sirve para todos los suelos?', exact=True).click()
        assert page.locator('details[open]').count() == 1
        assert page.get_by_text('La tecnología descrita por EECO requiere un diseño para cada caso.', exact=False).is_visible()
        page.get_by_text('¿Cómo se define el presupuesto de una intervención?', exact=True).click()
        assert page.locator('details[open]').count() == 1
        assert not page.locator('.contact-form').evaluate('(form) => form.checkValidity()'), f'{label}: blank required form should be invalid'
        assert not page.evaluate('document.documentElement.scrollWidth > window.innerWidth'), f'{label}: expanded content causes overflow'
        assert not errors, f'{label}: interaction errors: {errors}'
        print(label, 'ok', 'overflow:', overflow, 'page errors:', len(errors))
        page.close()
    reduced = browser.new_page(viewport={'width': 390, 'height': 844}, reduced_motion='reduce')
    reduced.goto('http://localhost:5173/', wait_until='networkidle')
    duration = reduced.locator('.hero-image').evaluate('(element) => getComputedStyle(element).animationDuration')
    assert all(float(item.strip().replace('s', '')) <= 0.001 for item in duration.split(',')), f'Reduced motion not respected: {duration}'
    print('reduced-motion ok')
    reduced.close()
    browser.close()
