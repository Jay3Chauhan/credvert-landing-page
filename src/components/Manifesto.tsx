'use client';

import React from 'react';
import { ScrollWordReveal } from '@/components/ui/AppleText';

const COPY =
  'Every card in your wallet plays by its own rules — multipliers, monthly caps, forex markups, milestone bonuses. Nobody remembers them at the counter. credVert. does. It reads the fine print of every card you own and tells you *which* *one* *to* *tap,* before you pay.';

export default function Manifesto() {
  return (
    <section aria-label="Why credVert." className="relative py-24 sm:py-40 px-5">
      <div className="max-w-5xl mx-auto">
        <ScrollWordReveal
          text={COPY}
          className="font-display font-semibold tracking-[-0.03em] leading-[1.12] text-[clamp(1.85rem,4.4vw,3.6rem)] text-neutral-900 dark:text-white"
        />
      </div>
    </section>
  );
}
