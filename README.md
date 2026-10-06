# EECO — propuesta de sitio web

Prototipo de una página corporativa para presentar a EECO. Está construido con React, TypeScript y Vite. Los textos son HTML editable y accesible; las imágenes originales se generaron primero como referencias visuales, y luego se recortaron y optimizaron para la web.

## Ejecutar

```bash
npm install
npm run dev
```

Para validar la versión de producción: `npm run build`. El sitio no tiene backend. El formulario abre un correo prellenado a `info@eeco-group.com`.

## Lectura del negocio y el mercado

**Oferta observada.** EECO se presenta como empresa de ingeniería civil enfocada en construcción de vías e infraestructura, enroque, tratamiento y estabilización de suelos. Expone una tecnología de estabilización basada en materiales puzolánicos naturales y un proceso de diseño dependiente de la caracterización de cada terreno. El sitio actual organiza su información en Nosotros, Servicios, Portafolio, Multimedia, Noticias y Contacto. [Inicio](https://eeco-group.com/), [Nosotros](https://eeco-group.com/nosotros/), [Portafolio](https://eeco-group.com/portafolio/).

**Modelo comercial inferido.** Es una venta consultiva por proyecto: el visitante presenta una necesidad, EECO evalúa condiciones técnicas y prepara una solución/cotización. Los públicos más probables son entidades contratantes, concesionarios, constructoras, desarrolladores y aliados de ingeniería. Es una inferencia para orientar la arquitectura de la página; requiere confirmación comercial con EECO.

**Contexto sectorial.** La política de transporte colombiana incluye la transitabilidad de vías terciarias y la infraestructura con sentido ambiental. El Ministerio de Transporte informó en 2026 intervenciones y procesos de obra vial y rural, lo que respalda dar prioridad a claridad técnica, cumplimiento y evidencia de proyectos. No se usan cifras de mercado en la página porque estas cambian y no prueban resultados propios de EECO. [Plan sectorial](https://mintransporte.gov.co/publicaciones/11459/plan-nacional-de-desarrollo-sector-transporte/), [Vías para la Paz](https://mintransporte.gov.co/publicaciones/12274/mintransporte-e-invias-aceleran-la-ejecucion-del-conpes-vias-para-la-paz-cerrados-procesos-de-obra-por-mas-de-91-billones/).

**Problema de comunicación detectado.** El sitio actual mezcla aspiraciones, descripciones extensas y noticias antiguas. Para una primera conversación comercial, la propuesta prioriza qué hace EECO, cómo aborda el suelo, dónde aplica sus capacidades y cómo contactarla. Evita presentar fotografías generadas como obras terminadas o atribuir métricas no verificadas a su tecnología.

## Arquitectura de información

1. **Inicio:** propuesta de valor en una frase y ruta de contacto.
2. **Nosotros:** propósito, alcance y enfoque.
3. **Servicios:** estabilización, enroque/tratamiento e infraestructura vial, con detalle y aplicaciones desplegables.
4. **Tecnología:** pestañas sobre el material, sus aplicaciones y los criterios de diseño.
5. **Proceso:** cuatro etapas, desde la caracterización hasta la implementación en obra, con entregables orientativos.
6. **Portafolio:** campos de trabajo ilustrados como conceptos, sin falsear casos reales.
7. **Equipo:** enfoque, historia y principios de trabajo.
8. **Alianzas** (dentro de Nuestra mirada): convenios con la Universidad de Antioquia y la Fundación Sócrates, con enlace al anuncio original.
9. **Preguntas frecuentes:** datos para consultar, dosificación, aplicaciones, presupuesto y etapa del proyecto.
10. **Contacto:** teléfono, correo y formulario que prepara un email con empresa, ubicación, servicio y etapa.

Fuentes de alianzas: [cooperación con la Universidad de Antioquia](https://eeco-group.com/2023/05/03/the-raven-part-3/) y [colaboración con la Fundación Sócrates](https://eeco-group.com/2023/05/03/the-raven-part-2/), ambas publicadas el 3 de mayo de 2023. Son las únicas entradas de la categoría Noticias del sitio actual (revisado en octubre de 2026), por lo que se presentan como alianzas vigentes y no como noticias recientes.

Para una versión final con mayor autoridad comercial conviene recibir del cliente fichas de obras autorizadas, ubicaciones, fotografías reales, certificaciones, ensayos, hojas técnicas y datos legales. Esos materiales permitirían convertir “Campos de trabajo” en casos verificables y abrir páginas individuales de servicios y proyectos.

## Dirección visual

La idea central es **“el futuro se construye desde el suelo”**, leída como un perfil de suelo: las secciones alternan superficie clara (niebla), estrato mineral (jade profundo) y roca (azul petróleo). El único ornamento es el trazo de tres líneas del logo: aparece como vía que cruza la introducción y el contacto, como viñeta de los antetítulos y de las listas técnicas. Todo lo demás es sobrio.

- **Color:** azul petróleo `#102a36` / `#0b2029`, jade `#2f766e` / `#173f3c`, niebla `#f7f9f6` / `#ebf0eb`, cobre `#d2a267` (solo sobre fondos oscuros o como relleno de botón).
- **Tipografía:** DM Sans para titulares y lectura (cuerpo 16–17 px, mínimo 13 px); Barlow Condensed en mayúsculas para anotaciones técnicas: antetítulos, categorías, contadores. Sin serif de acento.
- **Forma:** un solo radio (4 px) y una sola sombra (formulario). Contenedor de 1200 px.

Los estilos viven en un único archivo, `src/styles.css`, organizado por tokens, componentes y puntos de quiebre. Las referencias de diseño originales están en [`design-references`](design-references/); las imágenes WebP utilizadas en el sitio están en [`public/images`](public/images/).

Todas las imágenes de obra, equipo y paisaje de esta propuesta son generadas. Están señaladas como conceptuales en la página. Se generaron nueve referencias por separado mediante la herramienta integrada `image_gen`: hero, servicios, tecnología, portafolio, equipo, contacto, proceso, actualidad y preguntas frecuentes. Los prompts y decisiones se registran en [`design-references/PROMPTS.md`](design-references/PROMPTS.md).

## Comportamiento y calidad

La portada declara los tres servicios en una franja inferior; servicios usa una tarjeta dominante y dos de apoyo; tecnología y portafolio son los estratos oscuros. En móvil se reorganizan las composiciones conservando jerarquía y lectura, en lugar de reducir la maqueta de escritorio.

- Diseño responsive con navegación móvil, imágenes optimizadas y revisión en 320, 390, 600, 768, 980, 1024, 1440 y 1920 px.
- Navegación por anclas, detalle desplegable de servicios, pestañas con navegación por teclado, proceso interactivo y preguntas frecuentes con apertura exclusiva.
- Selección del servicio desde su tarjeta, validación nativa del formulario y enlaces `tel:` y `mailto:`.
- Movimiento: la portada es una escena fijada en pantalla (la imagen se aleja del suelo y aparece el contenido) y la frase de la introducción se ilumina palabra por palabra al ritmo del scroll, con las palabras clave en jade. En el resto, cada bloque se anima una sola vez al entrar en pantalla y, en escritorio, las etapas del proceso se activan al bajar. Solo se animan `transform`, `opacity` y color, para que el navegador no tenga que repintar mientras se desplaza.
- Figuras animadas: en Proceso, un ícono de línea que se dibuja por etapa (`src/figures.tsx`); en portada y contacto, pulsos de luz que recorren las tres líneas del logo. Las animaciones en bucle solo corren mientras su sección está en pantalla (`data-inview`).
- El contenido entra con un fundido suave una sola vez; indicador de lectura y regreso al inicio.
- Texto semántico, enlace para saltar al contenido, foco visible y respeto a `prefers-reduced-motion`.
- Verificación local: `npm run build` y `python scripts/check_ui.py` mediante el servidor de desarrollo.

## Estado de la propuesta

Este es un prototipo listo para revisión visual y de contenido. Antes de publicar: confirmar redacción técnica con EECO, sustituir imágenes conceptuales donde haya fotografía autorizada, conectar formulario a un servicio de envío y revisar aviso de privacidad, SEO y datos legales del cliente.
