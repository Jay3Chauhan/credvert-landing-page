'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Check } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { springSnappy } from '@/lib/motion';

const STEPS = [
  {
    id: 'wallet',
    kicker: '01 — Wallet',
    title: 'Add your cards. Just the last four digits.',
    body: 'Pick your bank and card variant. credVert. keeps the card name and last 4 digits — never the full number, CVV or expiry — encrypted on your phone.',
    points: ['Statement and due dates tracked', 'Base return, annual fee and forex at a glance'],
  },
  {
    id: 'ask',
    kicker: '02 — Ask',
    title: 'Tell it what you’re paying for.',
    body: 'Enter the amount, tap where you’re paying — dining, online shopping, travel, fuel, UPI — and switch on “Paying abroad” to include forex markup and GST.',
    points: ['Quick amounts from ₹500 to ₹25K', 'Nine spend categories and counting'],
  },
  {
    id: 'tap',
    kicker: '03 — Tap',
    title: 'Get the one card that pays you most.',
    body: 'Every card is ranked by real net return after caps, exclusions and fees. You see exactly what you’ll earn, then tap “Use this card”.',
    points: ['Explains why the winner wins', 'Shows the runners-up, ranked'],
  },
];

/* Camera stops over the 1536×1024 mockup: translate (% of image) and zoom. */
const STOPS = [0, 0.12, 0.28, 0.38, 0.48, 0.62, 0.76, 1];
const ZOOM = [1, 1.75, 1.75, 1.3, 1.75, 1.75, 2, 2];
const PAN_X = [0, -28.9, -28.9, 0, 26.2, 26.2, 28, 28];
const PAN_Y = [0, 17.5, 17.5, 8, 14, 14, -48, -48];

export default function HowItWorks() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start center', 'end center'] });

  const rawScale = useTransform(scrollYProgress, STOPS, ZOOM);
  const rawX = useTransform(scrollYProgress, STOPS, PAN_X);
  const rawY = useTransform(scrollYProgress, STOPS, PAN_Y);
  const camera = { stiffness: 90, damping: 24, mass: 0.9 };
  const scale = useSpring(rawScale, camera);
  const xNum = useSpring(rawX, camera);
  const yNum = useSpring(rawY, camera);
  const x = useMotionTemplate`${xNum}%`;
  const y = useMotionTemplate`${yNum}%`;

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = p < 0.36 ? 0 : p < 0.68 ? 1 : 2;
    setActive((cur) => (cur === next ? cur : next));
  });

  return (
    <section id="how" className="relative py-24 sm:py-32" aria-label="How it works">
      <SectionHeading
        eyebrow="How it works"
        title={['Your wallet,', <span key="b" className="text-gold-gradient">finally with a brain.</span>]}
        description="Three steps from “which card?” to the right answer — the same flow you’ll use at every checkout."
        className="px-5"
      />

      <div className="max-w-6xl mx-auto px-5 mt-14 lg:mt-20 lg:grid lg:grid-cols-[0.95fr_1.1fr] lg:gap-16">
        <div className="lg:order-2 sticky top-14 lg:top-[max(5rem,calc(50vh-220px))] z-10 lg:self-start pb-6 lg:pb-0 bg-[#F8F7F4] dark:bg-[#09090C] lg:bg-transparent lg:dark:bg-transparent">
          <div className="relative aspect-[3/2] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-b from-[#1A1C24] to-[#0B0C10] ring-1 ring-black/10 dark:ring-white/10 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)]">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(212,168,83,0.18),transparent_60%)]" />
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={reduce ? undefined : { scale, x, y }}
            >
              <Image
                src="/assets/mockups/wallet-mockup.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-contain select-none"
                draggable={false}
              />
            </motion.div>
            <div aria-hidden className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_30px_rgba(9,9,12,0.65)]" />

            <div className="absolute top-4 right-4 flex items-center gap-1.5" aria-hidden>
              {STEPS.map((s, i) => (
                <motion.span
                  key={s.id}
                  layout
                  transition={springSnappy}
                  className={`h-1.5 rounded-full ${i === active ? 'w-6 bg-credvert-gold' : 'w-1.5 bg-white/30'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div ref={stepsRef} className="lg:order-1 relative">
          {STEPS.map((step, i) => (
            <motion.article
              key={step.id}
              animate={{ opacity: i === active ? 1 : 0.28 }}
              transition={{ duration: 0.4 }}
              className="min-h-[62vh] lg:min-h-[82vh] flex flex-col justify-center py-10"
              aria-current={i === active ? 'step' : undefined}
            >
              <span className="eyebrow text-credvert-goldDark dark:text-credvert-gold">{step.kicker}</span>
              <h3 className="mt-4 display-md text-neutral-900 dark:text-white text-balance">
                {step.title}
              </h3>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 text-pretty">
                {step.body}
              </p>
              <ul className="mt-6 space-y-2.5">
                {step.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-[15px] text-neutral-800 dark:text-neutral-200">
                    <span className="w-5 h-5 rounded-full bg-credvert-gold/15 text-credvert-goldDark dark:text-credvert-gold flex items-center justify-center">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
