'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Cpu, Github, KeyRound, ShieldCheck, Trash2 } from 'lucide-react';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { LineReveal } from '@/components/ui/AppleText';
import { Reveal } from '@/components/ui/Reveal';
import InteractiveCard from '@/components/InteractiveCard';

const iconWrap = 'w-9 h-9 shrink-0 rounded-xl flex items-center justify-center border';

const PILLARS: AccordionItem[] = [
  {
    id: 'device',
    icon: (
      <span className={`${iconWrap} bg-credvert-gold/15 border-credvert-gold/30 text-credvert-gold`}>
        <KeyRound className="w-4 h-4" />
      </span>
    ),
    title: 'Encrypted with your phone’s keystore',
    content:
      'Card names, last-four digits and spend history live in an encrypted local database, keyed by the iOS Secure Enclave or Android Keystore. Unlocking sensitive views needs Face ID or your fingerprint.',
  },
  {
    id: 'sms',
    icon: (
      <span className={`${iconWrap} bg-emerald/15 border-emerald/30 text-emerald-light`}>
        <Cpu className="w-4 h-4" />
      </span>
    ),
    title: 'SMS parsed on-device, then discarded',
    content:
      'Bank alerts are read by a local parser that extracts amount, merchant and card suffix. Messages with OTPs are rejected outright. Duplicate detection uses a SHA-256 fingerprint computed on your phone — the raw text never reaches a server.',
  },
  {
    id: 'dpdp',
    icon: (
      <span className={`${iconWrap} bg-sapphire/15 border-sapphire/30 text-sapphire-light`}>
        <ShieldCheck className="w-4 h-4" />
      </span>
    ),
    title: 'Designed around the DPDP Act 2023',
    content:
      'Consent is asked for at the moment it’s needed, for exactly what’s needed, and can be withdrawn any time. A named grievance officer is reachable at grievance@credvert.tech.',
  },
  {
    id: 'erase',
    icon: (
      <span className={`${iconWrap} bg-rose-500/15 border-rose-500/30 text-rose-300`}>
        <Trash2 className="w-4 h-4" />
      </span>
    ),
    title: 'Delete everything, in one tap',
    content: (
      <>
        Go to Account → Delete account in the app, or use the{' '}
        <Link href="/deletion" className="text-credvert-gold underline underline-offset-4">
          online erasure portal
        </Link>
        . Every record and fingerprint is purged within 24 hours.
      </>
    ),
  },
];

export default function SecurityVault() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const panelScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.94, 1]);
  const panelY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, 0]);

  return (
    <section id="security" ref={ref} className="relative py-16 sm:py-24 px-3 sm:px-5" aria-label="Privacy and security">
      <motion.div
        style={{ scale: panelScale, y: panelY }}
        className="dark relative max-w-7xl mx-auto rounded-[32px] sm:rounded-[44px] bg-[#0B0C10] text-white overflow-hidden ring-1 ring-white/10"
      >
        <div aria-hidden className="absolute inset-0 hairline-grid mask-radial opacity-60" />
        <div aria-hidden className="absolute -top-40 right-0 w-[700px] h-[500px] rounded-full bg-emerald-500/[0.10] blur-[140px]" />
        <div aria-hidden className="absolute -bottom-40 -left-20 w-[600px] h-[500px] rounded-full bg-credvert-gold/[0.10] blur-[140px]" />

        <div className="relative grid lg:grid-cols-2 gap-14 lg:gap-16 px-6 sm:px-12 lg:px-16 py-16 sm:py-24">
          <div>
            <Reveal y={10}>
              <span className="eyebrow text-emerald-400">Privacy</span>
            </Reveal>
            <h2 className="mt-4 display-lg text-white text-balance">
              <LineReveal lines={['Your cards stay', <span key="b" className="text-white/40">yours.</span>]} />
            </h2>
            <Reveal delay={0.1} y={14}>
              <p className="mt-6 text-lg leading-relaxed text-neutral-400 max-w-lg text-pretty">
                Most finance apps upload your SMS inbox. credVert. was built the other way around: the intelligence
                comes to your data, and your data stays on your phone.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <Accordion items={PILLARS} defaultOpen={['device']} allowMultiple={false} itemClassName="border-b border-white/10" />
            </Reveal>

            <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://github.com/Jay3Chauhan/CreditVance"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-4 rounded-full bg-white text-neutral-950 text-sm font-semibold inline-flex items-center gap-2 active:scale-[0.97] transition"
              >
                <Github className="w-4 h-4" /> Audit the source
              </a>
              <Link
                href="/privacy"
                className="h-10 px-4 rounded-full border border-white/15 text-sm font-semibold inline-flex items-center gap-1.5 hover:bg-white/5 active:scale-[0.97] transition"
              >
                Read the privacy policy <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="flex items-center justify-center">
            <InteractiveCard />
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
