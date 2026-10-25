'use client';

import React from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

const ITEMS: Array<{ kind: 'bank' | 'network'; name: string; src: string }> = [
  { kind: 'bank', name: 'HDFC Bank', src: '/assets/banks/hdfc.svg' },
  { kind: 'network', name: 'Visa', src: '/assets/network-logo/visa.svg' },
  { kind: 'bank', name: 'SBI Card', src: '/assets/banks/sbi.svg' },
  { kind: 'network', name: 'Mastercard', src: '/assets/network-logo/Mastercard.svg' },
  { kind: 'bank', name: 'Axis Bank', src: '/assets/banks/axis.svg' },
  { kind: 'network', name: 'RuPay', src: '/assets/network-logo/RuPay.svg' },
  { kind: 'bank', name: 'ICICI Bank', src: '/assets/banks/icici.svg' },
  { kind: 'network', name: 'Diners Club', src: '/assets/network-logo/dinersclub.svg' },
  { kind: 'bank', name: 'IDFC FIRST', src: '/assets/banks/idfc.svg' },
  { kind: 'bank', name: 'American Express', src: '/assets/banks/amex.svg' },
];

export default function BankMarquee() {
  const row = [...ITEMS, ...ITEMS];

  return (
    <section aria-label="Supported banks and networks" className="relative py-14 sm:py-20">
      <Reveal y={10}>
        <p className="text-center text-[13px] text-neutral-500 dark:text-neutral-400 mb-8">
          Reward rules for the cards already in Indian wallets
        </p>
      </Reveal>
      <div className="marquee relative overflow-hidden mask-fade-x">
        <ul className="marquee-track flex w-max items-center gap-3 sm:gap-4">
          {row.map((item, i) => (
            <li
              key={`${item.name}-${i}`}
              aria-hidden={i >= ITEMS.length}
              className="flex items-center gap-3 h-14 pl-2 pr-5 rounded-2xl border border-black/[0.06] dark:border-white/[0.07] bg-white/70 dark:bg-white/[0.03]"
            >
              {item.kind === 'bank' ? (
                <Image src={item.src} alt="" width={36} height={36} className="w-9 h-9 rounded-[10px]" />
              ) : (
                <span className="h-9 w-14 rounded-[10px] bg-white flex items-center justify-center px-2 border border-black/5">
                  <Image src={item.src} alt="" width={48} height={24} className="max-h-5 w-auto object-contain" />
                </span>
              )}
              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
