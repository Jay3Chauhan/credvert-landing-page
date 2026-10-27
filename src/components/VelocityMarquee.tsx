'use client';

import React, { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion';

const WORDS = ['Dining', 'Flights', 'Fuel', 'UPI', 'Forex', 'Groceries', 'Shopping', 'Hotels'];

function Row({ baseVelocity, outlined }: { baseVelocity: number; outlined?: boolean }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(velocity, [-2500, 0, 2500], reduce ? [0, 0, 0] : [6, 0, -6]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) direction.current = -1;
    else if (b > 0) direction.current = 1;
    const move = direction.current * baseVelocity * (delta / 1000) * (1 + Math.abs(b));
    baseX.set(baseX.get() + move);
  });

  const items = [...WORDS, ...WORDS];

  return (
    <div className="overflow-hidden whitespace-nowrap flex">
      <motion.div style={{ x, skewX: skew }} className="flex shrink-0 items-center will-change-transform">
        {items.map((w, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`font-display font-bold tracking-[-0.04em] leading-none text-[clamp(3rem,9vw,8.5rem)] px-4 sm:px-6 ${
                outlined
                  ? 'text-transparent [-webkit-text-stroke:1.5px_rgba(17,18,21,0.22)] dark:[-webkit-text-stroke:1.5px_rgba(255,255,255,0.22)]'
                  : 'text-neutral-900 dark:text-white'
              }`}
            >
              {w}
            </span>
            <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-credvert-gold shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Oversized category band whose speed and skew follow scroll velocity. */
export default function VelocityMarquee() {
  return (
    <section aria-hidden className="relative py-16 sm:py-24 overflow-hidden select-none mask-fade-x">
      <div className="-rotate-2 space-y-2 sm:space-y-4">
        <Row baseVelocity={-2.2} />
        <Row baseVelocity={2.2} outlined />
      </div>
    </section>
  );
}
