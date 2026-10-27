'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis } from '@/lib/smooth-scroll';

/** Inertial wheel scrolling on desktop. Touch keeps native momentum; reduced motion opts out entirely. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      allowNestedScroll: true,
      anchors: { offset: -72 },
    });
    setLenis(lenis);
    document.documentElement.classList.add('lenis');

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      setLenis(null);
      document.documentElement.classList.remove('lenis');
    };
  }, []);

  return null;
}
