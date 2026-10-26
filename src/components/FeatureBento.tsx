'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { CalendarClock, Cpu, Globe2, Lock, Plane, ShoppingBag, Smartphone, Fuel, Utensils, Trophy } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Stagger, StaggerItem } from '@/components/ui/Reveal';
import { CountUp } from '@/components/ui/AppleText';
import { easeOutExpo } from '@/lib/motion';
import { getBankSymbolUrl } from '@/lib/bank-logos';

const RATES = [
  { icon: Utensils, label: 'Dining', card: 'HDFC Infinia · SmartBuy', bankSlug: 'hdfc', rate: 16.6 },
  { icon: Plane, label: 'Flights', card: 'Axis Atlas · EDGE Miles', bankSlug: 'utib', rate: 10 },
  { icon: ShoppingBag, label: 'Online shopping', card: 'SBI Cashback', bankSlug: 'sbin', rate: 5 },
  { icon: Smartphone, label: 'UPI on RuPay', card: 'Tata Neu Infinity', bankSlug: 'hdfc', rate: 1.5 },
  { icon: Fuel, label: 'Fuel', card: 'Surcharge waiver only', bankSlug: null, rate: 1 },
];

const tile =
  'h-full rounded-[28px] border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-[#111217] p-6 sm:p-8 overflow-hidden transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-credvert-gold/40';

function TileTitle({ icon: Icon, title, body }: { icon: React.ElementType; title: string; body: string }) {
  return (
    <div>
      <span className="w-10 h-10 rounded-2xl bg-credvert-gold/10 dark:bg-credvert-gold/15 text-credvert-goldDark dark:text-credvert-gold flex items-center justify-center mb-5 border border-credvert-gold/20">
        <Icon className="w-5 h-5" />
      </span>
      <h3 className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-neutral-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400 text-pretty">{body}</p>
    </div>
  );
}

function RateBars() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const max = Math.max(...RATES.map((r) => r.rate));

  return (
    <ul ref={ref} className="mt-8 space-y-3.5">
      {RATES.map((r, i) => {
        const Icon = r.icon;
        return (
          <li key={r.label} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-white/[0.05] flex items-center justify-center text-neutral-700 dark:text-neutral-300">
              <Icon className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className="font-semibold text-neutral-900 dark:text-white truncate">{r.label}</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-500 truncate flex items-center gap-1.5">
                  {r.bankSlug && (
                    <span className="w-3.5 h-3.5 rounded bg-white p-0.5 flex items-center justify-center shrink-0 shadow-xs">
                      <Image
                        src={getBankSymbolUrl(r.bankSlug)}
                        alt=""
                        width={12}
                        height={12}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                    </span>
                  )}
                  <span>{r.card}</span>
                </span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-neutral-100 dark:bg-white/[0.06] overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: inView ? r.rate / max : 0 }}
                  transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.15 + i * 0.08 }}
                  className="h-full origin-left rounded-full bg-gradient-to-r from-credvert-goldDark via-credvert-gold to-credvert-goldLight"
                />
              </div>
            </div>
            <span className="w-14 text-right font-display font-semibold tabular text-neutral-900 dark:text-white">
              {r.rate}%
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function WaiverRing() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const progress = 0.72;
  const c = 2 * Math.PI * 34;

  return (
    <div className="mt-6 flex items-center gap-5">
      <svg ref={ref} viewBox="0 0 80 80" className="w-20 h-20 -rotate-90 shrink-0">
        <circle cx="40" cy="40" r="34" className="stroke-neutral-200 dark:stroke-white/10" strokeWidth="8" fill="none" />
        <motion.circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          stroke="#D4A853"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: inView ? c * (1 - progress) : c }}
          transition={{ duration: 1.6, ease: easeOutExpo, delay: 0.2 }}
        />
      </svg>
      <div className="text-sm">
        <div className="text-2xl font-display font-semibold text-neutral-900 dark:text-white">
          <CountUp to={72} suffix="%" />
        </div>
        <div className="text-neutral-500 dark:text-neutral-400">₹7.2L of ₹10L to waive the ₹12,500 fee</div>
      </div>
    </div>
  );
}

export default function FeatureBento() {
  return (
    <section id="features" className="relative py-24 sm:py-32 px-5" aria-label="Features">
      <SectionHeading
        eyebrow="Features"
        title={['Everything a card expert knows.', <span key="b" className="text-neutral-400 dark:text-neutral-500">In your pocket.</span>]}
        description="credVert. keeps the reward catalogue current — multipliers, monthly caps, exclusions, lounge rules and fee waivers — so you never have to."
      />

      <Stagger className="max-w-6xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
        <StaggerItem className="sm:col-span-2 lg:col-span-4 lg:row-span-2">
          <SpotlightCard className={tile}>
            <TileTitle
              icon={Trophy}
              title="Every rule, every card."
              body="The best return for each kind of spend, calculated after caps and exclusions — not the headline rate on the brochure."
            />
            <RateBars />
          </SpotlightCard>
        </StaggerItem>

        <StaggerItem className="lg:col-span-2">
          <SpotlightCard className={tile}>
            <TileTitle icon={Globe2} title="Forex, honestly." body="Markup plus 18% GST is subtracted before ranking." />
            <div className="mt-6 flex items-baseline gap-2 font-display tabular text-neutral-900 dark:text-white">
              <span className="text-lg text-neutral-500">3.5% × 1.18 =</span>
              <span className="text-3xl font-semibold text-rose-500 dark:text-rose-400">4.13%</span>
            </div>
          </SpotlightCard>
        </StaggerItem>

        <StaggerItem className="lg:col-span-2">
          <SpotlightCard className={tile}>
            <TileTitle icon={Lock} title="Only the last four." body="No full card numbers, CVVs or OTPs. Ever." />
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl px-4 py-3 bg-gradient-to-br from-[#3B1D5E] to-[#1E1033] text-white font-mono tracking-[0.2em] text-sm">
              •••• •••• •••• <span className="text-credvert-goldLight">5556</span>
            </div>
          </SpotlightCard>
        </StaggerItem>

        <StaggerItem className="lg:col-span-2">
          <SpotlightCard className={tile}>
            <TileTitle icon={CalendarClock} title="Never miss a due date." body="Statement and payment dates for every card, in one timeline." />
            <div className="mt-6 relative flex items-center justify-between text-xs">
              <div className="absolute inset-x-2 top-[7px] h-px bg-neutral-200 dark:bg-white/10" />
              {[
                { d: '14 Nov', l: 'Statement', c: 'bg-credvert-gold' },
                { d: '2 Dec', l: 'Due', c: 'bg-rose-500' },
                { d: '14 Dec', l: 'Next', c: 'bg-neutral-400' },
              ].map((p) => (
                <div key={p.d} className="relative flex flex-col items-center gap-2">
                  <span className={`w-3.5 h-3.5 rounded-full ring-4 ring-white dark:ring-[#111217] ${p.c}`} />
                  <span className="font-semibold text-neutral-900 dark:text-white">{p.d}</span>
                  <span className="text-neutral-500">{p.l}</span>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </StaggerItem>

        <StaggerItem className="lg:col-span-2">
          <SpotlightCard className={tile}>
            <TileTitle icon={Trophy} title="Milestones & fee waivers." body="See how close you are to the next bonus or waiver." />
            <WaiverRing />
          </SpotlightCard>
        </StaggerItem>

        <StaggerItem className="sm:col-span-2 lg:col-span-2">
          <SpotlightCard className={tile}>
            <TileTitle icon={Cpu} title="Spends, parsed on-device." body="Bank SMS alerts become clean spend data without leaving your phone." />
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-neutral-50 dark:bg-white/[0.04] p-3">
                <div className="text-xl font-display font-semibold text-emerald-600 dark:text-emerald-400 tabular">0.02 ms</div>
                <div className="text-xs text-neutral-500">per message</div>
              </div>
              <div className="rounded-2xl bg-neutral-50 dark:bg-white/[0.04] p-3">
                <div className="text-xl font-display font-semibold text-neutral-900 dark:text-white tabular">0 bytes</div>
                <div className="text-xs text-neutral-500">SMS uploaded</div>
              </div>
            </div>
          </SpotlightCard>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
