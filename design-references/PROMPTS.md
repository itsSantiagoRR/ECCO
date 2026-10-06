# Prompts visuales utilizados

Herramienta: `image_gen` integrada. Tipo: `ui-mockup`. Se produjo una imagen horizontal independiente por sección, sin texto incrustado para que la tipografía, la navegación y las acciones sean elementos HTML reales.

## 1. Hero

Referencia premium de portada 16:9 para EECO, ingeniería vial sostenible colombiana. Fotografía aérea cinematográfica original de carretera sinuosa en montañas andinas verdes al amanecer. Zona oscura segura a la izquierda para titular, navegación transparente arriba, pequeño acento cobre. Azul petróleo `#102a36`, jade `#2f766e`, niebla `#e9eee9`, cobre `#c8995b`. Sin texto, letras, logos ni números.

## 2. Servicios

Referencia horizontal de sección en fondo niebla, con tres paneles fotográficos asimétricos: estabilización de suelo y maquinaria, enroque de talud y vía de montaña. Área vacía para titular e introducción. Composición editorial de construcción realista, espaciado amplio y divisores técnicos finos. Sin texto ni logos.

## 3. Tecnología

Referencia horizontal de sección sobre estabilización de suelos. Corte diagonal fotográfico de capas de pavimento, agregado y tierra nativa, con muestra cilíndrica; visual a la izquierda y panel limpio para texto a la derecha. Líneas de diagrama muy finas, luz natural, paleta azul petróleo, jade, niebla y cobre. Sin texto ni logos.

## 4. Portafolio

Referencia horizontal tipo galería editorial en fondo azul petróleo. Tres imágenes originales: vía andina panorámica dominante, obra civil de terreno y modelo físico de investigación/impresión 3D. Una imagen grande y dos apiladas, con espacios para títulos vivos. Sin texto ni logos.

## 5. Nosotros

Referencia horizontal editorial de equipo de ingeniería colombiano revisando planos en una obra montañosa, fotografía documental y respetuosa, con detalle secundario de terreno. Zona limpia para titular a la izquierda y motivo de curva vial en cobre. Sin texto ni logos.

## 6. Contacto

Referencia horizontal de cierre y footer en azul petróleo profundo. Tres líneas de vía abstractas en cobre convergen hacia el horizonte, espacio amplio para llamado a la acción y datos de contacto, banda inferior de pie de página. Sin texto ni logos. Para la implementación se recortó el motivo de vía y se construyó el formulario real en HTML.

## Revisión visual — limpieza de imágenes

Herramienta integrada `image_gen`, edición de las imágenes existentes.

**Hero limpio:** eliminar la banda de navegación, el contorno de botón y las líneas horizontales incrustadas; reconstruir el paisaje debajo de ellas. Conservar la vía andina, vegetación, niebla, amanecer y composición. Entregar una fotografía editorial limpia, sin interfaz, texto o marcos. Fuente final: `hero-clean.png`; optimizada en `public/images/hero-concept.webp`.

**Equipo limpio:** eliminar la línea cobre de la izquierda y el collage diagonal de carretera en la parte inferior; extender la fotografía principal de forma natural. Conservar ingenieros, rostros, cascos, manos, planos, ropa y posiciones. Fotografía documental coherente sin gráficos, collage o texto. Fuente final: `team-clean.png`; optimizada en `public/images/team.webp`.

## Ampliación — proceso, actualidad y preguntas

Tres referencias horizontales independientes generadas con `image_gen`, tipo `ui-mockup`. Paleta niebla `#f7f9f6`, azul petróleo `#102a36`, jade `#2f766e` y cobre `#d2a267`.

**Proceso (`methodology.png`):** una sección 16:9 para ingeniería vial y estabilización de suelos colombiana. A la izquierda, 55% de fotografía documental original de manos enguantadas inspeccionando una muestra cilíndrica de suelo compactado sobre planos y agregados en un terreno andino. A la derecha, área segura para título y cuatro filas alineadas, líneas finas, puntos cobre y curva de ruta. Sin palabras, logos, números ni controles incrustados. La zona fotográfica se recortó y optimizó en `public/images/methodology.webp`.

**Actualidad (`insights.png`):** sección editorial horizontal sobre investigación y comunidad. Área superior para título, divisor fino y dos historias de proporciones distintas: instrumentos de laboratorio, muestras de suelo y planos; fotografía macro de minerales. Áreas vacías para fecha, título, resumen y enlace. Sin palabras, logos, números ni tarjetas flotantes. La implementación usa artículos de texto y fuentes reales; la imagen se conserva como referencia de composición.

**Preguntas frecuentes (`faq.png`):** sección horizontal con un tercio para título y curva vial técnica tenue, y dos tercios para cinco filas alineadas con divisores finos y signos de apertura. Una fila expandida. Sin texto legible, logos ni números. Se implementó con elementos HTML `details` y `summary`.

## Revisión editorial — variedad de composiciones

Tres referencias nuevas e independientes, horizontales 16:9, generadas con `image_gen`. Se conserva la paleta de marca y se cambia la escala y la relación entre texto y fotografía.

**Servicios (`services-editorial-v2.png`):** una fotografía dominante de maquinaria y suelo a la izquierda, dos franjas fotográficas de enroque y vía a la derecha. Títulos seguros sobre fondos oscuros, acciones circulares cobre, esquina superior izquierda e inferior derecha curvas. Sin tarjetas blancas, palabras, logos ni cifras. Una sola sección.

**Tecnología (`technology-editorial-v2.png`):** título superior amplio, corte fotográfico de asfalto, agregados y suelo mineral rojizo ocupando el 70% inferior izquierdo; panel jade superpuesto a la derecha con esquina superior izquierda curva y zonas para pestañas, texto técnico y acción. Sin letras, logos ni cifras. El recorte fotográfico limpio se optimizó en `public/images/tech-terrain-v2.webp`.

**Portafolio (`portfolio-editorial-v2.png`):** fotografía panorámica de vía andina sobre fondo azul petróleo, título seguro sobre degradado y dos fotografías secundarias de terreno y maqueta, con tamaños y alturas diferentes. Espacio negativo, composición editorial, sin palabras, logos ni cifras. Una sola sección.
