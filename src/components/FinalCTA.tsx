'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Apple, ArrowRight, Play } from 'lucide-react';
import { CountUp, LineReveal } from '@/components/ui/AppleText';
import { Reveal } from '@/components/ui/Reveal';
import { Magnetic } from '@/components/ui/Magnetic';
import { playHapticFeedback } from '@/lib/sound';

const STATS = [
  { to: 8.4, decimals: 1, prefix: '₹', suffix: ' Cr+', label: 'in rewards unlocked' },
  { to: 45000, prefix: '', suffix: '+', label: 'cardholders' },
  { to: 0, prefix: '', suffix: ' bytes', label: 'of SMS uploaded' },
];

export default function FinalCTA({ onOpenDownload }: { onOpenDownload: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const rotateX = useTransform(scrollYProgress, [0.2, 0.9], reduce ? [0, 0] : [28, 0]);
  const y = useTransform(scrollYProgress, [0.2, 0.9], reduce ? [0, 0] : [140, 0]);
  const scale = useTransform(scrollYProgress, [0.2, 0.9], reduce ? [1, 1] : [0.88, 1]);

  const open = () => {
    playHapticFeedback('medium');
    onOpenDownload();
  };

  return (
    <section ref={ref} className="relative pt-24 sm:pt-32 overflow-hidden" aria-label="Get credVert.">
      <div aria-hidden className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[1100px] h-[700px] rounded-full bg-credvert-gold/[0.14] blur-[160px]" />

      <div className="relative max-w-6xl mx-auto px-5">
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 pb-20 sm:pb-28 border-b border-black/10 dark:border-white/10">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <dd className="display-md text-neutral-950 dark:text-white">
                <CountUp to={s.to} decimals={s.decimals ?? 0} prefix={s.prefix} suffix={s.suffix} />
              </dd>
              <dt className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{s.label}</dt>
            </Reveal>
          ))}
        </dl>

        <div className="pt-20 sm:pt-28 text-center">
          <h2 className="display-xl text-neutral-950 dark:text-white">
            <LineReveal lines={['Stop guessing.', <span key="b" className="text-gold-gradient">Start earning.</span>]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto text-pretty">
              Free on Android and iOS. Set up your wallet in under a minute.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Magnetic>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={open}
                className="h-14 pl-5 pr-6 rounded-2xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 inline-flex items-center gap-3 text-left"
              >
                <Play className="w-6 h-6 fill-current" />
                <span className="leading-tight">
                  <span className="block text-[11px] opacity-70">Get it on</span>
                  <span className="block text-base font-semibold">Google Play</span>
                </span>
              </motion.button>
            </Magnetic>
            <Magnetic>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={open}
                className="h-14 pl-5 pr-6 rounded-2xl border border-black/15 dark:border-white/20 text-neutral-950 dark:text-white inline-flex items-center gap-3 text-left hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors"
              >
                <Apple className="w-6 h-6" />
                <span className="leading-tight">
                  <span className="block text-[11px] opacity-70">Join the beta on</span>
                  <span className="block text-base font-semibold">TestFlight</span>
                </span>
              </motion.button>
            </Magnetic>
          </Reveal>
          <Reveal delay={0.3}>
            <a
              href="https://github.com/Jay3Chauhan/CreditVance"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
            >
              Or explore the open-source code <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>

        <div className="mt-16 sm:mt-20 mx-auto max-w-4xl" style={{ perspective: 1400 }}>
          <motion.div style={{ rotateX, y, scale, transformOrigin: '50% 100%' }} className="will-change-transform">
            <Image
              src="/assets/mockups/wallet-mockup.png"
              alt=""
              width={1536}
              height={1024}
              sizes="(min-width: 896px) 896px, 100vw"
              className="w-full h-auto mask-fade-b select-none pointer-events-none"
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
