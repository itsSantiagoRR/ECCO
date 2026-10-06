import type React from 'react';

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" className="arrow" viewBox="0 0 24 24" fill="none"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/* The three parallel strokes of the EECO mark, drawn as a road. It is the site's only decorative motif. */
const strataPaths = [
  'M-80 430C180 430 140 80 400 80S700 510 970 260 1170 0 1320 90',
  'M-80 452C180 452 140 102 400 102S700 532 970 282 1170 22 1320 112',
  'M-80 474C180 474 140 124 400 124S700 554 970 304 1170 44 1320 134',
];

/* Every stroke has pathLength=1, so a dash of 1 always spans the whole line at any screen size.
   `pulse` adds a short light travelling along each stroke, like traffic on the road.
   It only runs while the svg carries .in-view (it is tagged data-inview). */
export function Strata({ className, pulse = false }: { className?: string; pulse?: boolean }) {
  return <svg className={className} viewBox="0 0 1200 500" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true" data-inview={pulse || undefined}>
    {strataPaths.map((d, i) => <path key={d} d={d} pathLength={1} style={{ '--i': i } as React.CSSProperties} />)}
    {pulse && strataPaths.map((d, i) => <path key={`p${d}`} className="strata-pulse" d={d} pathLength={1} style={{ '--i': i } as React.CSSProperties} />)}
  </svg>;
}
