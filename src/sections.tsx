import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Arrow } from './icons';
import { StepIcon } from './figures';

const technologyTabs = [
  {
    label: 'El material',
    title: 'Conocimiento aplicado al suelo',
    text: 'Nuestra tecnología utiliza materiales puzolánicos naturales con propiedades aglutinantes y cementantes. Con ellos modificamos las características del suelo según lo que necesita cada obra.',
    items: ['Resistencia mecánica y capacidad portante', 'Comportamiento frente al agua y la abrasión', 'Plasticidad y estabilidad del material'],
  },
  {
    label: 'Aplicaciones',
    title: 'Una tecnología, diferentes contextos',
    text: 'La aplicamos en distintas áreas de la ingeniería. La solución depende del material disponible, el uso previsto y las condiciones particulares de cada proyecto.',
    items: ['Pavimentos, vías y estabilización de suelos', 'Obras de hidráulica y geotecnia', 'Sobrantes de túneles y materiales de excavación', 'Elementos constructivos y manejo paisajístico'],
  },
  {
    label: 'El diseño',
    title: 'Cada terreno necesita su propio estudio',
    text: 'Caracterizamos el suelo y hacemos estudios de dosificación para definir la metodología de implementación. El diseño también considera la geometría de la obra, los recursos necesarios y la normativa aplicable.',
    items: ['Caracterización del material existente', 'Dosificación ajustada a las condiciones del suelo', 'Variables técnicas, maquinaria y logística de aplicación'],
  },
];

export function Technology() {
  const [active, setActive] = useState(0);
  function navigate(event: KeyboardEvent<HTMLButtonElement>) {
    let next = active;
    if (event.key === 'ArrowRight') next = (active + 1) % technologyTabs.length;
    else if (event.key === 'ArrowLeft') next = (active + technologyTabs.length - 1) % technologyTabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = technologyTabs.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`technology-tab-${next}`)?.focus();
  }
  return <section className="technology section-pad" id="tecnologia">
    <div className="wrap section-head reveal"><div><p className="eyebrow eyebrow-light">Nuestra tecnología</p><h2>La diferencia está <span>debajo.</span></h2></div><p>Estabilizar un suelo empieza por conocerlo. Explora el material, sus aplicaciones y el diseño que hace posible su implementación.</p></div>
    <div className="wrap technology-grid">
      <figure className="technology-visual media-reveal reveal">
        <img src="/images/tech-terrain-v2.webp" alt="Representación conceptual del suelo y las capas de una estructura vial" loading="lazy" width="980" height="660" />
      </figure>
      <div className="technology-copy reveal">
        <div className="technology-tabs" role="tablist" aria-label="Información sobre la tecnología">
          {technologyTabs.map((tab, index) => <button key={tab.label} id={`technology-tab-${index}`} role="tab" type="button" aria-selected={active === index} aria-controls={`technology-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={navigate}>{tab.label}</button>)}
        </div>
        {technologyTabs.map((tab, index) => <div key={tab.label} role="tabpanel" id={`technology-panel-${index}`} aria-labelledby={`technology-tab-${index}`} hidden={active !== index} className="technology-panel" tabIndex={0}>
          <h3>{tab.title}</h3><p>{tab.text}</p><ul>{tab.items.map(item => <li key={item}>{item}</li>)}</ul>
        </div>)}
        <a className="text-link light" href="#proceso">Conoce el proceso <Arrow /></a>
      </div>
    </div>
  </section>;
}

const steps = [
  { title: 'Entender el terreno', description: 'La caracterización del suelo establece el punto de partida: material disponible, condiciones y requerimientos de la infraestructura.', output: 'Características del suelo y necesidades del proyecto.' },
  { title: 'Definir la dosificación', description: 'Con los estudios del material ajustamos la solución y establecemos una dosificación específica para las condiciones de cada obra.', output: 'Dosificación y parámetros ajustados al material.' },
  { title: 'Diseñar la implementación', description: 'Incorporamos la geometría, los recursos, la maquinaria y la logística en una metodología de aplicación y una propuesta de costos.', output: 'Metodología, recursos y valores unitarios del proyecto.' },
  { title: 'Llevar la solución a obra', description: 'Aplicamos la solución con el producto, el transporte, la mano de obra y la maquinaria definidos para el proyecto.', output: 'La solución diseñada, aplicada en campo.' },
];

export function Methodology() {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  /* On wide screens the image stays pinned, so the step crossing the middle of the viewport becomes active. */
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 981px)');
    let observer: IntersectionObserver | undefined;
    const connect = () => {
      observer?.disconnect();
      if (!wide.matches || !track.current) return;
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
      }), { rootMargin: '-48% 0px -48% 0px' });
      track.current.querySelectorAll('.methodology-step').forEach(step => observer!.observe(step));
    };
    connect();
    wide.addEventListener('change', connect);
    return () => { observer?.disconnect(); wide.removeEventListener('change', connect); };
  }, []);
  return <section className="methodology section-pad" id="proceso">
    <div className="wrap">
      <div className="section-head reveal"><div><p className="eyebrow">Cómo trabajamos</p><h2>De la muestra <span>a la obra.</span></h2></div><p>Una solución se construye en etapas. El estudio del terreno guía las decisiones que después llevamos a campo.</p></div>
      <div className="methodology-grid">
        <figure className="methodology-visual reveal" data-inview>
          <img src="/images/methodology.webp" alt="Imagen conceptual de manos de un profesional examinando una muestra de suelo sobre planos de ingeniería" loading="lazy" width="920" height="941" />
          <figcaption className="methodology-overlay"><span className="methodology-head"><span className="methodology-counter">0{active + 1}<span> / 04</span></span><StepIcon step={active} /></span><span className="methodology-output-label">Entregable</span><p key={active}>{steps[active].output}</p></figcaption>
        </figure>
        <div className="methodology-steps reveal">
          <div className="methodology-track" ref={track} aria-label="Etapas del proyecto">
            {steps.map((step, index) => <button key={step.title} type="button" data-step={index} className={`methodology-step${active === index ? ' selected' : ''}${index < active ? ' done' : ''}`} aria-pressed={active === index} onClick={() => setActive(index)}>
              <span className="step-node">0{index + 1}</span><span className="step-content"><strong>{step.title}</strong><span>{step.description}</span></span>
            </button>)}
          </div>
          <a href="#contacto" className="text-link methodology-cta">Cuéntanos sobre tu terreno <Arrow diagonal /></a>
        </div>
      </div>
    </div>
  </section>;
}

const questions = [
  { question: '¿Qué información necesitan para estudiar mi proyecto?', answer: 'La ubicación, el tipo de obra y una descripción de la necesidad nos ayudan a iniciar la conversación. Si ya tienes estudios del suelo, planos o requerimientos técnicos, menciónalos en tu consulta para orientar la evaluación.' },
  { question: '¿La misma dosificación sirve para todos los suelos?', answer: 'No. Diseñamos cada caso: la caracterización del suelo, los estudios de dosificación y los requerimientos de la infraestructura definen una metodología específica.' },
  { question: '¿Qué aplicaciones contempla la tecnología?', answer: 'Pavimentos, estabilización de suelos, hidráulica, geotecnia, materiales provenientes de túneles, elementos constructivos y obras de manejo paisajístico. Revisamos la viabilidad de cada aplicación según las condiciones del proyecto.' },
  { question: '¿Cómo se define el presupuesto de una intervención?', answer: 'La geometría y el diseño de la obra determinan la cantidad de producto y los recursos necesarios. La propuesta incluye suministro, transporte, mano de obra, maquinaria y otros costos de implementación; por eso preparamos el presupuesto para cada proyecto.' },
  { question: '¿Puedo consultar si mi proyecto todavía está en etapa de idea?', answer: 'Sí. Cuéntanos la ubicación, el uso previsto y el problema que quieres resolver. Con eso iniciamos la conversación y te decimos qué estudios o datos harían falta para avanzar.' },
];

export function Questions() {
  return <section className="questions section-pad" id="preguntas"><div className="wrap questions-grid">
    <div className="questions-intro reveal"><p className="eyebrow">Antes de empezar</p><h2>Buenas preguntas. <span>Mejores decisiones.</span></h2><p>Lo que conviene conocer antes de llevar una solución de estabilización a tu proyecto.</p><a className="text-link" href="#contacto">Hablemos de tu caso <Arrow diagonal /></a></div>
    <div className="questions-list reveal">{questions.map(item => <details key={item.question} name="eeco-questions"><summary><span>{item.question}</span><span className="question-toggle" aria-hidden="true" /></summary><div className="question-answer"><p>{item.answer}</p></div></details>)}</div>
  </div></section>;
}
