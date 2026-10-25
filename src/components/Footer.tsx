'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ShieldCheck } from 'lucide-react';
import { Logo, Wordmark } from '@/components/brand/Logo';
import { springSettle } from '@/lib/motion';

type FooterLink = { label: string; href: string; external?: boolean };

const COLUMNS: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'How it works', href: '/#how' },
      { label: 'Best-card advisor', href: '/#advisor' },
      { label: 'Card catalogue', href: '/#cards' },
      { label: 'Offers', href: '/#offers' },
    ],
  },
  {
    title: 'Open source',
    links: [
      { label: 'Flutter app', href: 'https://github.com/Jay3Chauhan/CreditVance', external: true },
      { label: 'FastAPI backend', href: 'https://github.com/Jay3Chauhan/CreditVance-Backend', external: true },
      {
        label: 'API reference',
        href: 'https://github.com/Jay3Chauhan/CreditVance-Backend/blob/main/docs/API_REFERENCE.md',
        external: true,
      },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of service', href: '/terms' },
      { label: 'Delete my data', href: '/deletion' },
      { label: 'Grievance officer', href: 'mailto:grievance@credvert.tech' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'support@credvert.tech', href: 'mailto:support@credvert.tech' },
      { label: 'privacy@credvert.tech', href: 'mailto:privacy@credvert.tech' },
      { label: 'legal@credvert.tech', href: 'mailto:legal@credvert.tech' },
    ],
  },
];

function FooterAnchor({ link }: { link: FooterLink }) {
  const cls = 'text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors';
  if (link.external || link.href.startsWith('mailto:') || link.href.includes('#')) {
    return (
      <a href={link.href} className={cls} {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={cls}>
      {link.label}
    </Link>
  );
}

export default function Footer() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <footer className="relative border-t border-black/[0.07] dark:border-white/[0.07] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 pt-16 sm:pt-20">
        <div className="grid lg:grid-cols-[1.3fr_2fr] gap-12">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              The card advisor for Indian wallets. Know which card to tap for every purchase, with your data kept on your
              phone.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Built for the DPDP Act 2023
            </span>
          </div>

          {/* Desktop columns */}
          <div className="hidden sm:grid grid-cols-4 gap-8">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-neutral-900 dark:text-white mb-4">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <FooterAnchor link={l} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Mobile: collapsible groups */}
          <div className="sm:hidden border-t border-black/10 dark:border-white/10">
            {COLUMNS.map((col) => {
              const isOpen = open === col.title;
              return (
                <div key={col.title} className="border-b border-black/10 dark:border-white/10">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : col.title)}
                    className="w-full flex items-center justify-between py-4 text-sm font-semibold text-neutral-900 dark:text-white active:opacity-60"
                  >
                    {col.title}
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={springSettle}>
                      <Plus className="w-4 h-4 text-neutral-500" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={springSettle}
                        className="overflow-hidden"
                      >
                        {col.links.map((l) => (
                          <li key={l.label} className="pb-3 pl-1">
                            <FooterAnchor link={l} />
                          </li>
                        ))}
                        <li className="h-2" aria-hidden />
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-black/[0.07] dark:border-white/[0.07] flex flex-col sm:flex-row justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-500">
          <p>© {new Date().getFullYear()} credVert. Technologies · Ahmedabad, India · Designed by Jay Chauhan</p>
          <p>
            credVert. is not a bank or NBFC. Card names and logos belong to their respective issuers.
          </p>
        </div>
      </div>

      <div aria-hidden className="relative mt-10 -mb-[3.5vw] px-5 select-none pointer-events-none">
        <Wordmark
          goldDot
          className="w-full h-auto text-neutral-900/[0.06] dark:text-white/[0.05]"
          title=""
        />
      </div>
    </footer>
  );
}
