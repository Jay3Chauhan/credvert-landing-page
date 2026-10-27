'use client';

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useMediaQuery } from '@/lib/hooks';

interface ParallaxProps {
  children?: React.ReactNode;
  className?: string;
  /** Pixels travelled across the element's pass through the viewport. Negative moves against the scroll. */
  offset?: number;
  /** Only animate from the `lg` breakpoint up, where stacked layouts can't collide. */
  desktopOnly?: boolean;
  'aria-hidden'?: boolean;
}

export function Parallax({ children, className, offset = 60, desktopOnly = false, ...rest }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const enabled = !reduce && (!desktopOnly || isDesktop);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const raw = useTransform(scrollYProgress, [0, 1], enabled ? [offset, -offset] : [0, 0]);
  const y = useSpring(raw, { stiffness: 140, damping: 30, mass: 0.6 });

  return (
    <motion.div ref={ref} style={{ y }} className={className} {...rest}>
      {children}
    </motion.div>
  );
}
