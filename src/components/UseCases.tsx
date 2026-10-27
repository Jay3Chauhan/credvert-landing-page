'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Fuel, Globe2, Plane, ShoppingBag, Smartphone, Utensils } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useMediaQuery } from '@/lib/hooks';
import { getBankSymbolUrl } from '@/lib/bank-logos';

interface UseCase {
  id: string;
  icon: React.ElementType;
  category: string;
  title: string;
  body: string;
  checks: string[];
  pick: { card: string; bankSlug: string | null; value: string; note: string };
  tint: string;
}

const CASES: UseCase[] = [
  {
    id: 'dining',
    icon: Utensils,
    category: 'Dining',
    title: 'Best credit card for dining in India',
    body: 'Restaurant bills, Swiggy Dineout, Zomato — credVert. compares accelerated dining rates, partner-portal multipliers and monthly caps across every card you hold.',
    checks: ['Portal multipliers like SmartBuy', 'Monthly reward caps', 'Merchant-category exclusions'],
    pick: { card: 'HDFC Infinia · SmartBuy', bankSlug: 'hdfc', value: '16.6%', note: 'top effective return' },
    tint: 'from-amber-500/25 via-credvert-gold/10',
  },
  {
    id: 'flights',
    icon: Plane,
    category: 'Flights & travel',
    title: 'Best credit card for flights and hotels',
    body: 'Airline miles, hotel transfers and lounge access are valued in rupees, so a mile on Axis Atlas and a point on HDFC are finally comparable.',
    checks: ['Miles valued at real transfer rates', 'Lounge-visit eligibility', 'Milestone bonus progress'],
    pick: { card: 'Axis Atlas · EDGE Miles', bankSlug: 'utib', value: '10%', note: 'on travel bookings' },
    tint: 'from-sapphire/25 via-sapphire/10',
  },
  {
    id: 'forex',
    icon: Globe2,
    category: 'Paying abroad',
    title: 'Zero-forex and low-markup cards, ranked',
    body: 'Foreign-currency spends carry a markup plus 18% GST. credVert. subtracts both before ranking, so the card that looks rewarding abroad actually is.',
    checks: ['Markup + 18% GST deducted', 'Dynamic currency conversion warning', 'International reward multipliers'],
    pick: { card: 'Typical 3.5% markup', bankSlug: null, value: '4.13%', note: 'real cost after GST' },
    tint: 'from-rose-500/25 via-rose-500/10',
  },
  {
    id: 'shopping',
    icon: ShoppingBag,
    category: 'Online shopping',
    title: 'Best cashback credit card for online shopping',
    body: 'Amazon, Flipkart, Myntra and every other checkout: see which card returns the most after cashback caps and excluded merchants.',
    checks: ['Cashback caps per statement', 'Wallet-load and EMI exclusions', 'Co-brand partner boosts'],
    pick: { card: 'SBI Cashback', bankSlug: 'sbin', value: '5%', note: 'flat online cashback' },
    tint: 'from-emerald/25 via-emerald/10',
  },
  {
    id: 'upi',
    icon: Smartphone,
    category: 'UPI on RuPay',
    title: 'Rewards on UPI with a RuPay credit card',
    body: 'Scan-and-pay is now a credit card spend. credVert. knows which RuPay cards earn on UPI and which quietly skip small-value transactions.',
    checks: ['RuPay UPI eligibility', 'Small-transaction exclusions', 'Per-month UPI caps'],
    pick: { card: 'Tata Neu Infinity', bankSlug: 'hdfc', value: '1.5%', note: 'NeuCoins on UPI' },
    tint: 'from-violet-500/25 via-violet-500/10',
  },
  {
    id: 'fuel',
    icon: Fuel,
    category: 'Fuel',
    title: 'Fuel surcharge waiver, tracked',
    body: 'Most cards earn nothing on fuel, but many waive the 1% surcharge within a band. credVert. tells you which card keeps that 1% in your pocket.',
    checks: ['Waiver transaction band', 'Monthly waiver cap', 'Fuel co-brand accelerators'],
    pick: { card: 'Surcharge waiver', bankSlug: null, value: '1%', note: 'saved per fill-up' },
    tint: 'from-orange-500/25 via-orange-500/10',
  },
];

export default function UseCases() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduce = useReducedMotion();
  const pinned = isDesktop && !reduce;

  return (
    <section id="use-cases" aria-label="Use cases" className="relative py-24 sm:py-32">
      <SectionHeading
        eyebrow="Use cases"
        title={['One answer for', <span key="b" className="text-gold-gradient">every kind of spend.</span>]}
        description="From a dinner bill to a hotel in Bali — credVert. ranks the cards you already own by what they actually pay back."
        className="px-5"
      />
      {pinned ? <PinnedTrack /> : <SwipeTrack />}
    </section>
  );
}

function PinnedTrack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });
  const x = useTransform(progress, [0, 1], [0, -distance]);

  return (
    <div ref={sectionRef} className="relative mt-4" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <motion.ul ref={trackRef} style={{ x }} className="flex gap-6 pl-[max(1.25rem,calc((100vw-72rem)/2))] pr-[20vw] will-change-transform">
          {CASES.map((c, i) => (
            <li key={c.id} className="shrink-0 w-[min(560px,42vw)]">
              <CaseCard data={c} index={i} progress={progress} />
            </li>
          ))}
        </motion.ul>
        <div className="mt-10 mx-auto w-[min(72rem,calc(100vw-2.5rem))] h-px bg-black/10 dark:bg-white/10 overflow-hidden" aria-hidden>
          <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gradient-to-r from-credvert-goldDark via-credvert-gold to-credvert-goldLight" />
        </div>
      </div>
    </div>
  );
}

function SwipeTrack() {
  return (
    <ul className="mt-12 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none px-5 pb-4 scroll-px-5">
      {CASES.map((c, i) => (
        <li key={c.id} className="snap-start shrink-0 w-[84vw] max-w-[420px]">
          <CaseCard data={c} index={i} />
        </li>
      ))}
    </ul>
  );
}

function CaseCard({ data, index, progress }: { data: UseCase; index: number; progress?: MotionValue<number> }) {
  const Icon = data.icon;
  const center = index / (CASES.length - 1);
  const fallback = useSpring(0);
  const p = progress ?? fallback;
  const numeralX = useTransform(p, [center - 0.5, center + 0.5], progress ? [90, -90] : [0, 0]);
  const iconY = useTransform(p, [center - 0.5, center + 0.5], progress ? [30, -30] : [0, 0]);

  return (
    <article className="relative h-full min-h-[440px] lg:min-h-[520px] rounded-[32px] border border-black/[0.07] dark:border-white/[0.08] bg-white dark:bg-[#111217] p-7 sm:p-9 overflow-hidden flex flex-col">
      <div aria-hidden className={`absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br ${data.tint} to-transparent blur-3xl`} />
      <motion.span
        aria-hidden
        style={{ x: numeralX }}
        className="absolute right-6 bottom-2 font-display font-bold leading-none text-[9rem] lg:text-[11rem] tracking-[-0.06em] text-black/[0.04] dark:text-white/[0.04] select-none"
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      <div className="relative flex items-center justify-between">
        <motion.span
          style={{ y: iconY }}
          className="w-12 h-12 rounded-2xl bg-credvert-gold/10 dark:bg-credvert-gold/15 border border-credvert-gold/25 text-credvert-goldDark dark:text-credvert-gold flex items-center justify-center"
        >
          <Icon className="w-6 h-6" />
        </motion.span>
        <span className="eyebrow text-neutral-500 dark:text-neutral-400">{data.category}</span>
      </div>

      <h3 className="relative mt-8 text-2xl lg:text-[1.9rem] font-display font-semibold tracking-tight leading-[1.1] text-neutral-900 dark:text-white text-balance">
        {data.title}
      </h3>
      <p className="relative mt-4 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400 text-pretty">{data.body}</p>

      <ul className="relative mt-5 flex flex-wrap gap-2">
        {data.checks.map((c) => (
          <li key={c} className="text-xs font-medium px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300">
            {c}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-8 flex items-end justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          {data.pick.bankSlug && (
            <span className="w-8 h-8 rounded-lg bg-white p-1 border border-black/5 shrink-0 flex items-center justify-center">
              <Image src={getBankSymbolUrl(data.pick.bankSlug)} alt="" width={24} height={24} className="w-full h-full object-contain" unoptimized />
            </span>
          )}
          <span className="text-[13px] sm:text-sm leading-tight font-semibold text-neutral-800 dark:text-neutral-200">{data.pick.card}</span>
        </div>
        <div className="text-right shrink-0">
          <div className="text-3xl lg:text-4xl font-display font-semibold tabular text-neutral-950 dark:text-white">{data.pick.value}</div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400">{data.pick.note}</div>
        </div>
      </div>
    </article>
  );
}
