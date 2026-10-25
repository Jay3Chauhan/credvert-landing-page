'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
  animate,
  type MotionValue,
} from 'framer-motion';
import { easeOutExpo } from '@/lib/motion';

interface AppleWordRevealProps {
  text: string;
  className?: string;
  delayOffset?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

/** Word-by-word masked rise, triggered when scrolled into view. */
export function AppleWordReveal({
  text,
  className = '',
  delayOffset = 0,
  as: Component = 'span',
}: AppleWordRevealProps) {
  const words = text.split(' ');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <Component ref={ref as React.RefObject<never>} className={`inline ${className}`} aria-label={text}>
      {words.map((word, index) => (
        <span key={index} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span
            initial={{ y: '105%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : undefined}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: delayOffset + index * 0.05 }}
            className="inline-block"
          >
            {word}
            {index < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

interface LineRevealProps {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** 'mount' plays immediately (hero); 'inView' waits for the viewport. */
  trigger?: 'mount' | 'inView';
}

/** Apple headline choreography: each line rises from behind an invisible mask edge. */
export function LineReveal({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.09,
  trigger = 'inView',
}: LineRevealProps) {
  // Observe the unclipped wrapper: the lines start fully hidden by their mask,
  // and IntersectionObserver treats clipped targets as never intersecting.
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const shown = trigger === 'mount' || inView;

  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <motion.span
            className={`block origin-bottom-left ${lineClassName}`}
            initial={{ y: '110%', opacity: 0, rotate: 2 }}
            animate={shown ? { y: '0%', opacity: 1, rotate: 0 } : undefined}
            transition={{ duration: 1.1, ease: easeOutExpo, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface ScrollWordRevealProps {
  /** Wrap words in *asterisks* to accent them in gold. */
  text: string;
  className?: string;
}

/**
 * Scroll-scrubbed word reveal: each word's opacity is tied to scroll progress,
 * so it plays forward on scroll down and rewinds on scroll up.
 */
export function ScrollWordReveal({ text, className = '' }: ScrollWordRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });

  const tokens = text.split(' ').map((raw) => {
    const accent = raw.startsWith('*') && raw.replace(/[.,]$/, '').endsWith('*');
    return { word: raw.replace(/\*/g, ''), accent };
  });

  return (
    <p ref={ref} className={className} aria-label={text.replace(/\*/g, '')}>
      {tokens.map((t, i) => {
        const start = i / tokens.length;
        const end = start + 1 / tokens.length;
        return (
          <ScrubWord key={i} progress={scrollYProgress} range={[start, end]} accent={t.accent} reduce={!!reduce}>
            {t.word}
          </ScrubWord>
        );
      })}
    </p>
  );
}

function ScrubWord({
  children,
  progress,
  range,
  accent,
  reduce,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, reduce ? [1, 1] : [0.14, 1]);
  return (
    <motion.span
      aria-hidden
      style={{ opacity }}
      className={`inline-block mr-[0.24em] ${accent ? 'text-gold-gradient' : ''}`}
    >
      {children}
    </motion.span>
  );
}

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

/** Counts from 0 when scrolled into view; formatted with Indian digit grouping. */
export function CountUp({ to, prefix = '', suffix = '', decimals = 0, duration = 1.6, className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const format = (v: number) =>
    `${prefix}${v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = format(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: easeOutExpo,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {format(0)}
    </span>
  );
}

interface AppleShimmerTextProps {
  children: React.ReactNode;
  className?: string;
}

export function AppleShimmerText({ children, className = '' }: AppleShimmerTextProps) {
  return <span className={`text-gold-gradient ${className}`}>{children}</span>;
}

interface AppleCyclingPunchlineProps {
  items: string[];
  intervalMs?: number;
  className?: string;
}

export function AppleCyclingPunchline({ items, intervalMs = 3200, className = '' }: AppleCyclingPunchlineProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % items.length), intervalMs);
    return () => clearInterval(timer);
  }, [items.length, intervalMs]);

  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
