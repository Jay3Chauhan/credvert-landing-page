'use client';

import React from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { getBankSymbolUrl } from '@/lib/bank-logos';

interface MarqueeItem {
  kind: 'bank' | 'network';
  name: string;
  src: string;
}

const ITEMS: MarqueeItem[] = [
  { kind: 'bank', name: 'HDFC Bank', src: getBankSymbolUrl('hdfc') },
  { kind: 'network', name: 'Visa', src: '/assets/network-logo/visa.svg' },
  { kind: 'bank', name: 'SBI Card', src: getBankSymbolUrl('sbin') },
  { kind: 'network', name: 'Mastercard', src: '/assets/network-logo/Mastercard.svg' },
  { kind: 'bank', name: 'ICICI Bank', src: getBankSymbolUrl('icic') },
  { kind: 'network', name: 'RuPay', src: '/assets/network-logo/RuPay.svg' },
  { kind: 'bank', name: 'Axis Bank', src: getBankSymbolUrl('utib') },
  { kind: 'bank', name: 'Kotak Mahindra', src: getBankSymbolUrl('kkbk') },
  { kind: 'bank', name: 'American Express', src: getBankSymbolUrl('amex') },
  { kind: 'network', name: 'Diners Club', src: '/assets/network-logo/dinersclub.svg' },
  { kind: 'bank', name: 'IDFC FIRST', src: getBankSymbolUrl('idfb') },
  { kind: 'bank', name: 'IndusInd Bank', src: getBankSymbolUrl('indb') },
  { kind: 'bank', name: 'Bank of Baroda', src: getBankSymbolUrl('barb') },
  { kind: 'bank', name: 'RBL Bank', src: getBankSymbolUrl('ratn') },
  { kind: 'bank', name: 'Yes Bank', src: getBankSymbolUrl('yesb') },
  { kind: 'bank', name: 'Federal Bank', src: getBankSymbolUrl('fdrl') },
  { kind: 'bank', name: 'AU Small Finance', src: getBankSymbolUrl('aubl') },
];

export default function BankMarquee() {
  const half = Math.ceil(ITEMS.length / 2);

  return (
    <section aria-label="Supported banks and networks" className="relative py-14 sm:py-20">
      <Reveal y={10}>
        <p className="text-center text-[11px] sm:text-[13px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-8 px-5">
          Optimized for credit cards from India&apos;s leading financial institutions &amp; payment networks
        </p>
      </Reveal>
      <div className="space-y-3 sm:space-y-4">
        <MarqueeRow items={ITEMS.slice(0, half)} />
        <MarqueeRow items={ITEMS.slice(half)} reverse />
      </div>
    </section>
  );
}

function MarqueeRow({ items, reverse = false }: { items: MarqueeItem[]; reverse?: boolean }) {
  const row = [...items, ...items, ...items, ...items];

  return (
      <div className="marquee relative overflow-hidden mask-fade-x">
        <ul className={`marquee-track ${reverse ? 'marquee-track-reverse' : ''} flex w-max items-center gap-3 sm:gap-4`}>
          {row.map((item, i) => (
            <li
              key={`${item.name}-${i}`}
              aria-hidden={i >= items.length}
              className="flex items-center gap-3 h-14 pl-2 pr-5 rounded-2xl border border-black/[0.06] dark:border-white/[0.07] bg-white/80 dark:bg-white/[0.03] backdrop-blur-md shadow-sm transition-transform hover:scale-[1.02]"
            >
              {item.kind === 'bank' ? (
                <div className="w-10 h-10 rounded-xl bg-neutral-100/80 dark:bg-white/[0.08] p-1.5 flex items-center justify-center shrink-0 border border-black/5 dark:border-white/10 shadow-sm overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <span className="h-10 w-14 rounded-xl bg-white flex items-center justify-center px-2 border border-black/5 shadow-sm">
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={48}
                    height={24}
                    className="max-h-5 w-auto object-contain"
                    unoptimized
                  />
                </span>
              )}
              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 whitespace-nowrap font-sans">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
  );
}
