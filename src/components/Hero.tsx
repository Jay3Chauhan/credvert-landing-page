'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowRight, BadgeCheck, Crown, Globe2, Lock, ShieldCheck, CalendarClock } from 'lucide-react';
import { playHapticFeedback } from '@/lib/sound';
import { LineReveal } from '@/components/ui/AppleText';
import { Magnetic } from '@/components/ui/Magnetic';
import { easeOutExpo } from '@/lib/motion';

interface HeroProps {
  onOpenDownload: () => void;
}

interface Chip {
  id: string;
  className: string;
  depth: number;
  icon: React.ReactNode;
  iconTint: string;
  label: string;
  value: React.ReactNode;
}

const CHIPS: Chip[] = [
  {
    id: 'forex',
    className: 'left-[1%] top-[18%] hidden md:block',
    depth: 1.4,
    icon: <Globe2 className="w-4 h-4" />,
    iconTint: 'bg-sapphire/15 text-sapphire-light',
    label: 'Paying abroad',
    value: 'Forex + GST counted',
  },
  {
    id: 'best',
    className: 'left-[-2%] sm:left-[3%] top-[58%]',
    depth: 2.2,
    icon: <Crown className="w-4 h-4" />,
    iconTint: 'bg-credvert-gold/20 text-credvert-goldLight',
    label: 'Best for dining',
    value: (
      <>
        Tiger · <span className="text-emerald-light">6.00% back</span>
      </>
    ),
  },
  {
    id: 'due',
    className: 'right-[1%] top-[16%] hidden md:block',
    depth: 1.1,
    icon: <CalendarClock className="w-4 h-4" />,
    iconTint: 'bg-white/10 text-white',
    label: 'Next statement',
    value: '14 Nov · due in 20 days',
  },
  {
    id: 'secure',
    className: 'right-[-2%] sm:right-[2%] top-[66%]',
    depth: 1.8,
    icon: <ShieldCheck className="w-4 h-4" />,
    iconTint: 'bg-emerald/15 text-emerald-light',
    label: 'Secured on device',
    value: 'Only last 4 digits saved',
  },
];

export function Hero({ onOpenDownload }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const stageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -40]);
  const stageScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.08]);
  const glowY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 160]);

  // 1:1 pointer tracking smoothed by a critically damped spring.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 22, mass: 0.8 });
  const sy = useSpring(py, { stiffness: 120, damping: 22, mass: 0.8 });
  const tiltY = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-7, 7]);
  const tiltX = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [5, -5]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const resetPointer = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section ref={sectionRef} className="relative pt-28 sm:pt-36 pb-6 overflow-hidden" aria-labelledby="hero-title">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 hairline-grid mask-radial opacity-80" />
        <motion.div
          style={{ y: glowY }}
          className="absolute left-1/2 top-[46%] -translate-x-1/2 w-[min(1000px,120vw)] h-[620px] rounded-full bg-credvert-gold/[0.16] dark:bg-credvert-gold/[0.13] blur-[140px]"
        />
        <div className="absolute left-[12%] top-[62%] w-[420px] h-[420px] rounded-full bg-sapphire/[0.08] blur-[120px]" />
      </div>

      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative max-w-5xl mx-auto px-5 text-center">
        <motion.a
          href="#film"
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 mb-8 rounded-full glass text-[13px] font-medium text-neutral-700 dark:text-neutral-300"
        >
          <span className="px-2 py-0.5 rounded-full bg-credvert-gold text-neutral-950 text-[11px] font-bold tracking-wide">
            NEW
          </span>
          <span>credVert. 2.1 is here — see it in motion</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </motion.a>

        <h1 id="hero-title" className="display-xl text-neutral-950 dark:text-white">
          <LineReveal
            trigger="mount"
            delay={0.1}
            stagger={0.12}
            lines={['The right card.', <span key="l2" className="text-gold-gradient">Every single swipe.</span>]}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.45 }}
          className="mt-7 mx-auto max-w-2xl text-lg sm:text-xl leading-relaxed text-neutral-600 dark:text-neutral-400 text-pretty"
        >
          credVert. knows the reward rules of every card in your wallet and tells you which one to tap — for
          dining, travel, fuel, UPI or paying abroad. Privately, on your phone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Magnetic>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                playHapticFeedback('medium');
                onOpenDownload();
              }}
              className="group relative h-12 px-7 rounded-full font-semibold text-[15px] text-neutral-950 bg-gradient-to-b from-[#FDE38A] to-credvert-gold shadow-[0_10px_40px_-10px_rgba(212,168,83,0.7)] inline-flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Get the app — it’s free</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              />
            </motion.button>
          </Magnetic>
          <motion.a
            whileTap={{ scale: 0.97 }}
            href="#lab"
            onClick={() => playHapticFeedback('light')}
            className="h-12 px-7 rounded-full font-semibold text-[15px] inline-flex items-center gap-2 text-neutral-900 dark:text-white border border-black/10 dark:border-white/15 hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-colors"
          >
            Try it live
          </motion.a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-neutral-500 dark:text-neutral-400"
        >
          <li className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Processed on your phone
          </li>
          <li className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-credvert-gold" /> Only last 4 digits stored
          </li>
          <li className="flex items-center gap-1.5">
            <BadgeCheck className="w-4 h-4 text-sapphire" /> Built for DPDP Act 2023
          </li>
        </motion.ul>
      </motion.div>

      <div
        className="relative mt-12 sm:mt-16 mx-auto max-w-6xl px-2 sm:px-6"
        style={{ perspective: 1600 }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        <motion.div
          initial={{ opacity: 0, y: 120, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: easeOutExpo, delay: 0.25 }}
        >
          <motion.div
            style={{ y: stageY, scale: stageScale, rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
            className="relative will-change-transform"
          >
            <Image
              src="/assets/mockups/wallet-mockup.png"
              alt="credVert. app on two iPhones: the home screen recommending the best card for a ₹2,000 dining spend, and the wallet showing an Axis My Zone card secured on device."
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 1152px) 1100px, 100vw"
              className="w-full h-auto select-none pointer-events-none drop-shadow-[0_60px_80px_rgba(0,0,0,0.45)]"
              draggable={false}
            />
            {CHIPS.map((chip, i) => (
              <FloatingChip key={chip.id} chip={chip} index={i} pointerX={sx} pointerY={sy} scroll={scrollYProgress} reduce={!!reduce} />
            ))}
          </motion.div>
        </motion.div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F8F7F4] dark:from-[#09090C] to-transparent" />
      </div>
    </section>
  );
}

function FloatingChip({
  chip,
  index,
  pointerX,
  pointerY,
  scroll,
  reduce,
}: {
  chip: Chip;
  index: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  scroll: MotionValue<number>;
  reduce: boolean;
}) {
  const depth = reduce ? 0 : chip.depth;
  const x = useTransform(pointerX, (v) => v * depth * 36);
  const pointerOffsetY = useTransform(pointerY, (v) => v * depth * 24);
  const scrollOffsetY = useTransform(scroll, [0, 1], [0, -depth * 120]);
  const y = useTransform([pointerOffsetY, scrollOffsetY], ([a, b]) => (a as number) + (b as number));

  return (
    <motion.div style={{ x, y }} className={`absolute z-10 ${chip.className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 24, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.9, delay: 1.0 + index * 0.12 }}
        className="flex items-center gap-3 rounded-2xl pl-2.5 pr-4 py-2.5 bg-white/80 dark:bg-[#181A22]/75 backdrop-blur-xl border border-black/[0.06] dark:border-white/10 shadow-glass"
      >
        <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center ${chip.iconTint}`}>
          {chip.icon}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400">{chip.label}</span>
          <span className="text-[11px] sm:text-[13px] font-semibold text-neutral-900 dark:text-white whitespace-nowrap">{chip.value}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}
