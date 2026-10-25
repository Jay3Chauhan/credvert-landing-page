import type { Transition } from 'framer-motion';

/** Critically damped (damping ratio 1.0) — default for UI that settles without overshoot. */
export const springSettle: Transition = { type: 'spring', bounce: 0, duration: 0.4 };

/** Snappier critically damped spring for small controls (pills, toggles, tabs). */
export const springSnappy: Transition = { type: 'spring', bounce: 0, duration: 0.3 };

/** Under-damped (~0.8) — reserved for gestures that carried momentum (flicks, drag releases). */
export const springMomentum: Transition = { type: 'spring', bounce: 0.2, duration: 0.4 };

/** Sheets and drawers: Apple ships damping 0.8 / response 0.3. */
export const springSheet: Transition = { type: 'spring', bounce: 0.15, duration: 0.35 };

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * Apple's momentum projection (Designing Fluid Interfaces, WWDC18):
 * distance a flick travels before coming to rest.
 */
export function projectMomentum(velocityPxPerSec: number, decelerationRate = 0.998) {
  return ((velocityPxPerSec / 1000) * decelerationRate) / (1 - decelerationRate);
}
