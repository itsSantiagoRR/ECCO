/* Animated line icons, remounted (React key) to replay when the step changes.
   They stay paused until the parent carries .in-view (see [data-inview] in App). */

/* One line icon per methodology step: soil core, dosage flask, plan with route, road on site. */
const stepIcons = [
  <><ellipse cx="32" cy="12" rx="12" ry="4" /><path d="M20 12v38c0 2.2 5.4 4 12 4s12-1.8 12-4V12" /><path d="M20 24c4 2 20 2 24 0M20 34c5 2.4 19 2.4 24 0M20 43c6 2 18 2 24 0" /></>,
  <><path d="M26 8h12M28 8v16L16 50c-1 2.4.8 5 3.4 5h25.2c2.6 0 4.4-2.6 3.4-5L36 24V8" /><path d="M21 40h22" /><circle cx="28" cy="47" r="1.6" /><circle cx="36" cy="45" r="1.2" /></>,
  <><rect x="8" y="10" width="48" height="44" rx="2" /><path d="M8 24h48M8 38h48M22 10v44M38 10v44" /><path d="M14 48C24 46 22 30 32 28s14-12 18-14" /><circle cx="50" cy="16" r="3" /></>,
  <><path d="M24 12 8 54M40 12l16 42" /><path d="M32 16v6M32 28v8M32 42v10" /><path d="M8 54h48" /><path d="M20 12h24" /></>,
];

export function StepIcon({ step }: { step: number }) {
  return <svg key={step} className="step-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <g>{stepIcons[step]}</g>
  </svg>;
}
