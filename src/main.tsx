import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { Arrow, Strata } from './icons';
import { Technology, Methodology, Questions } from './sections';

const image = (name: string) => `/images/${name}.webp`;

const nav = [
  ['Nosotros', '#nosotros'],
  ['Servicios', '#servicios'],
  ['Tecnología', '#tecnologia'],
  ['Proceso', '#proceso'],
  ['Portafolio', '#portafolio'],
] as const;

const services = [
  {
    title: 'Estabilización de suelos',
    category: 'Tecnología del suelo',
    image: 'service-soil',
    size: [605, 535],
    description: 'Estudiamos el terreno y definimos una solución de estabilización ajustada a las condiciones de cada obra.',
    detail: 'Caracterización, diseño de dosificación y aplicación de tecnología de mejoramiento para bases y subrasantes.',
    applications: ['Vías y pavimentos', 'Bases y subrasantes', 'Materiales disponibles en el terreno'],
  },
  {
    title: 'Enroque y tratamiento',
    category: 'Preparación del terreno',
    image: 'service-enroque',
    size: [410, 530],
    description: 'Intervenimos terrenos y superficies que requieren soporte, control y preparación para proyectos civiles.',
    detail: 'Soluciones de enroque, tratamiento de suelos y adecuación según la geometría y las necesidades del proyecto.',
    applications: ['Obras de ingeniería civil', 'Tratamiento de suelos', 'Preparación y adecuación del terreno'],
  },
  {
    title: 'Infraestructura vial',
    category: 'Conectividad',
    image: 'service-roads',
    size: [505, 530],
    description: 'Desarrollamos vías y obras de infraestructura con criterios técnicos, durabilidad y responsabilidad ambiental.',
    detail: 'Planeación y ejecución para corredores, accesos y otras obras de ingeniería civil.',
    applications: ['Construcción de vías', 'Accesos y conectividad', 'Obras de infraestructura'],
  },
];

const navIds = new Set<string>(nav.map(([, href]) => href));

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        setActive(navIds.has(id) ? id : '');
      });
    }, { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    document.addEventListener('keydown', close);
    return () => { observer.disconnect(); document.removeEventListener('keydown', close); };
  }, []);
  return <header className="site-header">
    <div className="wrap header-inner">
      <a className="brand" href="#inicio" aria-label="EECO, ir al inicio"><img src="/eeco-mark.svg" alt="EECO" width="400" height="105" /></a>
      <button className="menu-toggle" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>
        <span /><span />
      </button>
      <nav id="primary-nav" className={open ? 'nav open' : 'nav'} aria-label="Navegación principal">
        {nav.map(([label, href]) => <a key={href} href={href} aria-current={active === href ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="button button-small" href="#contacto" onClick={() => setOpen(false)}>Hablemos <Arrow diagonal /></a>
      </nav>
    </div>
    <div className="reading-progress" aria-hidden="true" />
  </header>;
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const phase = (value: number, start: number, end: number) => clamp01((value - start) / (end - start));

/* Scroll-driven opening scene: the stage stays pinned while the camera pulls back from the ground
   to reveal the road, then the supporting copy settles in. It is the only scroll-linked effect on the page. */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let last = '';
    const update = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      root.classList.toggle('over-hero', rect.bottom > 80);
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = reduced.matches ? 1 : clamp01(-rect.top / travel);
      const zoom = phase(progress, 0, .5).toFixed(3);
      const reveal = phase(progress, .28, .72);
      // Once the scene has scrolled past, its values stop changing: skip the style writes.
      const key = zoom + reveal.toFixed(3);
      if (key === last) return;
      last = key;
      hero.style.setProperty('--zoom', zoom);
      hero.style.setProperty('--reveal', reveal.toFixed(3));
      hero.classList.toggle('is-revealed', reveal > .3);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule);
    update();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', schedule);
      cancelAnimationFrame(frame);
      root.classList.remove('over-hero');
    };
  }, []);
  const words = ['El', 'futuro', 'se', 'construye'];
  return <section className="hero" id="inicio" aria-labelledby="hero-title" ref={ref}>
    <div className="hero-stage">
      <div className="hero-media" aria-hidden="true"><div className="hero-image" /></div>
      <div className="hero-veil" aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
      <Strata className="hero-trace" pulse />
      <div className="hero-content wrap">
        <p className="hero-eyebrow">Ingeniería civil · Colombia</p>
        <h1 id="hero-title">
          {words.map((word, index) => <span className="hero-word" style={{ '--i': index } as React.CSSProperties} key={word}>{word}</span>).flatMap((word, index) => index ? [' ', word] : [word])}{' '}
          <em className="hero-word" style={{ '--i': words.length } as React.CSSProperties}>desde el suelo.</em>
        </h1>
        <div className="hero-reveal">
          <p className="hero-sub">Estabilizamos suelos, hacemos enroque y construimos vías con materiales puzolánicos naturales y un diseño hecho para cada terreno.</p>
          <div className="hero-actions">
            <a className="button" href="#contacto">Cuéntanos tu proyecto <Arrow diagonal /></a>
            <a className="text-link light" href="#servicios">Ver servicios <Arrow /></a>
          </div>
        </div>
      </div>
      <ul className="hero-strip wrap" aria-label="Servicios principales">
        {services.map((service, index) => <li key={service.title} style={{ '--i': index } as React.CSSProperties}><span>{service.category}</span>{service.title}</li>)}
      </ul>
      <p className="hero-hint" aria-hidden="true">Desliza<span /></p>
    </div>
  </section>;
}

const introStatement = 'Combinamos conocimiento del *terreno,* tecnología y ejecución responsable para desarrollar infraestructura que responda a cada contexto. Una solución sólida empieza por *entender* *el* *suelo.*'.split(' ');

/* Read-along: words brighten one by one as the paragraph travels up the viewport (--progress),
   key words turn jade. Only listens to scroll while the paragraph is on screen. */
function Intro() {
  const statement = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = statement.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      // 0 when the paragraph's top is at 85% of the viewport, 1 when it reaches 30%.
      const progress = reduced.matches ? 1 : clamp01((vh * .85 - top) / (vh * .55));
      el.style.setProperty('--progress', progress.toFixed(3));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const watcher = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { window.addEventListener('scroll', schedule, { passive: true }); schedule(); }
      else window.removeEventListener('scroll', schedule);
    });
    watcher.observe(el);
    update();
    return () => { watcher.disconnect(); window.removeEventListener('scroll', schedule); cancelAnimationFrame(frame); };
  }, []);
  return <section className="intro section-pad" id="nosotros">
    <Strata className="route-trace reveal" />
    <div className="wrap intro-inner">
      <p className="eyebrow reveal">Una nueva ruta</p>
      <h2 className="reveal">Construir una vía es <span>abrir posibilidades.</span></h2>
      <p className="intro-statement" ref={statement} style={{ '--n': introStatement.length } as React.CSSProperties}>
        {introStatement.map((word, index) => {
          const key = word.startsWith('*');
          return <span key={index} className={key ? 'key' : undefined} style={{ '--i': index } as React.CSSProperties}>{key ? word.replaceAll('*', '') : word} </span>;
        })}
      </p>
      <ul className="intro-capabilities reveal"><li>Ingeniería civil</li><li>Innovación aplicada</li><li>Visión sostenible</li></ul>
    </div>
  </section>;
}

function Services({ onConsult }: { onConsult: (service: string) => void }) {
  const [active, setActive] = useState<number | null>(null);
  return <section className="services section-pad" id="servicios"><div className="wrap">
    <div className="section-head reveal"><div><p className="eyebrow">Qué hacemos</p><h2>Soluciones para <span>cada terreno.</span></h2></div><p>Desde la caracterización del suelo hasta la obra terminada, articulamos capacidades técnicas para construir mejor.</p></div>
    <div className="service-grid">{services.map((service, index) => <article className={`service-card reveal${active === index ? ' expanded' : ''}`} style={{ '--d': index } as React.CSSProperties} key={service.title}>
      <div className="service-image"><img src={image(service.image)} alt="" width={service.size[0]} height={service.size[1]} loading="lazy" /></div>
      <div className="service-body">
        <span className="service-category">{service.category}</span>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <button type="button" aria-expanded={active === index} aria-controls={`service-detail-${index}`} onClick={() => setActive(active === index ? null : index)}>{active === index ? 'Cerrar detalle' : 'Ver detalle'} <span className="service-toggle" aria-hidden="true" /></button>
        <div id={`service-detail-${index}`} hidden={active !== index} className="service-detail">
          <p>{service.detail}</p>
          <h4>Campos de aplicación</h4>
          <ul>{service.applications.map(application => <li key={application}>{application}</li>)}</ul>
          <a href="#contacto" className="button button-small" onClick={() => onConsult(service.title)}>Consultar esta solución <Arrow diagonal /></a>
        </div>
      </div>
    </article>)}</div>
  </div></section>;
}

function Portfolio() {
  return <section className="portfolio section-pad" id="portafolio"><div className="wrap">
    <div className="section-head section-head-dark reveal"><div><p className="eyebrow eyebrow-light">Campos de trabajo</p><h2>Ingeniería visible. <span>Impacto real.</span></h2></div><p>Los frentes en los que aplicamos nuestra visión de infraestructura: vías, intervención del terreno e investigación.</p></div>
    <div className="portfolio-grid">
      <figure className="portfolio-main media-reveal reveal"><img src={image('project-road')} alt="Visualización conceptual de una vía en terreno montañoso" width="1035" height="770" loading="lazy" /><figcaption><span>Infraestructura</span><h3>Vías que conectan</h3></figcaption></figure>
      <figure className="portfolio-tile media-reveal reveal"><img src={image('project-work')} alt="Visualización conceptual de una obra de ingeniería civil" width="525" height="370" loading="lazy" /><figcaption><span>Terreno</span><h3>Obras y enroque</h3></figcaption></figure>
      <figure className="portfolio-tile media-reveal reveal"><img src={image('project-model')} alt="Visualización conceptual de una maqueta de investigación" width="525" height="350" loading="lazy" /><figcaption><span>Innovación</span><h3>Investigación e impresión 3D</h3></figcaption></figure>
    </div>
    <p className="concept-note">Visuales conceptuales de esta propuesta. Se reemplazarán por fotografías de obras ejecutadas.</p>
  </div></section>;
}

const alliances = [
  {
    partner: 'Universidad de Antioquia',
    field: 'Investigación y academia',
    text: 'Firmamos un convenio de cooperación con la Facultad de Ingeniería para investigar en conjunto, abrir espacios de movilidad estudiantil y compartir laboratorios.',
    url: 'https://eeco-group.com/2023/05/03/the-raven-part-3/',
  },
  {
    partner: 'Fundación Sócrates',
    field: 'Comunidad y cultura',
    text: 'Nos unimos para convertir pasivos ambientales en materia prima de obras artísticas y aportar al desarrollo social y cultural.',
    url: 'https://eeco-group.com/2023/05/03/the-raven-part-2/',
  },
];

function About() {
  return <section className="about section-pad" id="mirada"><div className="wrap">
    <div className="about-grid">
      <div className="about-copy reveal">
        <p className="eyebrow">Nuestra mirada</p>
        <h2>Progreso con <span>responsabilidad.</span></h2>
        <p>Creemos en una infraestructura vial que aporte al desarrollo de Colombia y América Latina. La sostenibilidad, la innovación y el trabajo en equipo orientan la forma en que pensamos y ejecutamos cada solución.</p>
        <ul className="about-principles">
          <li><strong>Investigación aplicada</strong><span>Conocimiento que responde a condiciones reales.</span></li>
          <li><strong>Responsabilidad ambiental</strong><span>Atención a los materiales, los recursos y el contexto.</span></li>
          <li><strong>Trabajo en equipo</strong><span>Colaboración entre ingeniería, academia y comunidad.</span></li>
        </ul>
      </div>
      <figure className="about-image media-reveal reveal"><img src={image('team')} alt="Representación conceptual de profesionales de ingeniería revisando planos en campo" width="1495" height="1052" loading="lazy" /></figure>
    </div>
    <div className="alliances" id="alianzas">
      <h3 className="alliances-title reveal">Alianzas</h3>
      {alliances.map(item => <article className="alliance reveal" key={item.partner}>
        <p className="alliance-field">{item.field}</p>
        <h4>{item.partner}</h4>
        <p>{item.text}</p>
        <a className="text-link" href={item.url} target="_blank" rel="noopener noreferrer">Leer el anuncio <span className="sr-only">sobre {item.partner}</span><Arrow diagonal /></a>
      </article>)}
    </div>
  </div></section>;
}

function Contact({ subject, onSubjectChange }: { subject: string; onSubjectChange: (value: string) => void }) {
  const [sent, setSent] = useState(false);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Consulta EECO: ${data.get('subject')}`);
    const body = encodeURIComponent(`Nombre: ${data.get('name')}\nCorreo: ${data.get('email')}\nEmpresa: ${data.get('company') || 'No indicada'}\nUbicación: ${data.get('location') || 'No indicada'}\nEtapa: ${data.get('stage')}\n\n${data.get('message')}`);
    window.location.href = `mailto:info@eeco-group.com?subject=${subject}&body=${body}`;
    setSent(true);
  }
  return <section className="contact section-pad" id="contacto">
    <Strata className="contact-trace" pulse />
    <div className="wrap contact-grid">
      <div className="contact-copy reveal">
        <p className="eyebrow eyebrow-light">Hablemos</p>
        <h2>¿Qué camino construimos <em>juntos?</em></h2>
        <p>Cuéntanos sobre tu proyecto, aunque todavía sea una idea. Te ayudamos a definir el siguiente paso.</p>
        <div className="contact-links">
          <a className="contact-email" href="mailto:info@eeco-group.com">info@eeco-group.com <Arrow diagonal /></a>
          <a className="contact-phone" href="tel:+573013910328">(+57) 301 391 0328</a>
        </div>
      </div>
      <form className="contact-form reveal" onSubmit={submit}>
        <h3>Empecemos la conversación</h3>
        <div className="form-row">
          <div className="field"><label htmlFor="name">Tu nombre</label><input id="name" name="name" autoComplete="name" required placeholder="Nombre y apellido" /></div>
          <div className="field"><label htmlFor="email">Correo electrónico</label><input id="email" name="email" type="email" autoComplete="email" required placeholder="nombre@empresa.com" /></div>
        </div>
        <div className="form-row">
          <div className="field"><label htmlFor="company">Empresa <span>(opcional)</span></label><input id="company" name="company" autoComplete="organization" placeholder="Nombre de tu empresa" /></div>
          <div className="field"><label htmlFor="location">Ubicación de la obra <span>(opcional)</span></label><input id="location" name="location" autoComplete="off" placeholder="Ciudad o municipio" /></div>
        </div>
        <div className="form-row">
          <div className="field"><label htmlFor="subject">Tipo de proyecto</label><select id="subject" name="subject" required value={subject} onChange={event => { onSubjectChange(event.target.value); setSent(false); }}><option value="" disabled>Selecciona una opción</option><option>Estabilización de suelos</option><option>Infraestructura vial</option><option>Enroque y tratamiento</option><option>Otro proyecto</option></select></div>
          <div className="field"><label htmlFor="stage">¿En qué etapa está?</label><select id="stage" name="stage" defaultValue="Idea inicial"><option>Idea inicial</option><option>Estudios del terreno</option><option>Diseño del proyecto</option><option>Ejecución de obra</option></select></div>
        </div>
        <div className="field"><label htmlFor="message">Cuéntanos un poco más</label><textarea id="message" name="message" required rows={3} placeholder="Describe tu idea o necesidad" /></div>
        <button className="button" type="submit">Preparar correo <Arrow diagonal /></button>
        {sent && <p className="form-note" role="status">Tu consulta está lista. Completa el envío desde tu aplicación de correo.</p>}
        <small>Este formulario prepara un correo desde tu dispositivo.</small>
      </form>
    </div>
  </section>;
}

function Footer() {
  return <footer className="footer"><div className="wrap footer-grid">
    <div><a href="#inicio" className="footer-brand" aria-label="EECO, volver al inicio"><img src="/eeco-mark.svg" alt="EECO" width="400" height="105" /></a><p>Construyendo el camino, hacemos el futuro.</p></div>
    <div><h4>Explora</h4>{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<a href="#alianzas">Alianzas</a><a href="#preguntas">Preguntas frecuentes</a></div>
    <div><h4>Contacto</h4><a href="tel:+573013910328">(+57) 301 391 0328</a><a href="mailto:info@eeco-group.com">info@eeco-group.com</a></div>
  </div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} EECO. Concepto de sitio web.</span><span>Imágenes generadas para la propuesta visual.</span></div></footer>;
}

function App() {
  const [selectedService, setSelectedService] = useState('');
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    // Looping figures run only while on screen: [data-inview] elements toggle .in-view both ways.
    const viewport = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('in-view', entry.isIntersecting)));
    document.querySelectorAll('[data-inview]').forEach(el => viewport.observe(el));
    let pending = [...document.querySelectorAll<HTMLElement>('.reveal')];
    pending.forEach(el => observer.observe(el));
    // Safety net, run only when scrolling stops: reveal anything a fast jump (anchor link) skipped past.
    const sweep = () => {
      const vh = window.innerHeight;
      pending = pending.filter(el => {
        if (el.classList.contains('visible')) return false;
        if (el.getBoundingClientRect().top > vh * .94) return true;
        el.classList.add('visible');
        observer.unobserve(el);
        return false;
      });
    };
    const bar = document.querySelector<HTMLElement>('.reading-progress');
    let frame = 0;
    let idle = 0;
    const update = () => {
      frame = 0;
      const available = root.scrollHeight - window.innerHeight;
      // Written to the bar itself: a variable on <html> would restyle the whole page every frame.
      if (bar) bar.style.transform = `scaleX(${available > 0 ? clamp01(window.scrollY / available) : 0})`;
      root.classList.toggle('has-scrolled', window.scrollY > 850);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
      clearTimeout(idle);
      idle = window.setTimeout(sweep, 160);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => { observer.disconnect(); viewport.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); clearTimeout(idle); };
  }, []);
  return <>
    <a className="skip-link" href="#nosotros">Saltar al contenido</a>
    <Header />
    <main><Hero /><Intro /><Services onConsult={setSelectedService} /><Technology /><Methodology /><Portfolio /><About /><Questions /><Contact subject={selectedService} onSubjectChange={setSelectedService} /></main>
    <Footer />
    <a className="back-top" href="#inicio" aria-label="Volver al inicio"><span aria-hidden="true">↑</span></a>
  </>;
}

createRoot(document.getElementById('root')!).render(<App />);
