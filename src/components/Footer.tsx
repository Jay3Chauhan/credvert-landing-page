'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Github, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="border-t border-black/10 dark:border-white/[0.08] bg-[#F0EFEA] dark:bg-neutral-950/80 backdrop-blur-xl relative overflow-hidden transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-credvert-gold/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-black/10 dark:border-white/[0.06]">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 p-1.5 flex items-center justify-center group-hover:scale-105 active:scale-95 transition-all shadow-md">
                <Image
                  src="/assets/brand/credvert-mark.svg"
                  alt="Credvert Mark"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <Image
                  src={theme === 'light' ? '/assets/brand/credvert-dark.svg' : '/assets/brand/credvert-gold.svg'}
                  alt="credVert."
                  width={112}
                  height={24}
                  className="h-5 w-auto object-contain transition-opacity"
                />
                <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 tracking-widest uppercase">
                  Card Intelligence Platform
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed max-w-sm">
              The intelligent credit card advisor and zero-knowledge hardware vault. Engineered for
              Indian cardholders to maximize miles, rewards, and cashback on every transaction.
            </p>

            <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
              <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-sans font-semibold">
                <span>Architected by Jay Chauhan</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-credvert-gold" />
                <a href="mailto:support@credvert.tech" className="hover:text-credvert-goldDark dark:hover:text-credvert-gold transition-colors font-medium">
                  support@credvert.tech
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <a href="mailto:grievance@credvert.tech" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                  grievance@credvert.tech (DPDP Grievance Officer)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>Ahmedabad, Gujarat, India</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-900 dark:text-neutral-200 font-bold">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
              <li>
                <a href="#advisor" className="hover:text-black dark:hover:text-white transition-colors">
                  Smart Advisor
                </a>
              </li>
              <li>
                <a href="#ai-copilot" className="hover:text-black dark:hover:text-white transition-colors">
                  Claude AI Copilot
                </a>
              </li>
              <li>
                <a href="#sms-intelligence" className="hover:text-black dark:hover:text-white transition-colors">
                  SMS Intelligence
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-black dark:hover:text-white transition-colors">
                  ROI Calculator
                </a>
              </li>
              <li>
                <a href="#cards" className="hover:text-black dark:hover:text-white transition-colors">
                  Card Catalog
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-black dark:hover:text-white transition-colors">
                  Exclusive Perks
                </a>
              </li>
            </ul>
          </div>

          {/* Open Source Ecosystem */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-900 dark:text-neutral-200 font-bold flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-credvert-gold" />
              <span>Open Source</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
              <li>
                <a
                  href="https://github.com/Jay3Chauhan/CreditVance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>CreditVance Flutter Client</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Jay3Chauhan/CreditVance-Backend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>FastAPI Cloud Backend</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Jay3Chauhan/CreditVance-Backend/blob/main/docs/API_REFERENCE.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>REST API Reference</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Jay3Chauhan/CreditVance-Backend/blob/main/docs/FRONTEND_GUIDE.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Architecture Documentation</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-900 dark:text-neutral-200 font-bold">
              Legal & Privacy
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
              <li>
                <Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-black dark:hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/deletion" className="hover:text-black dark:hover:text-white transition-colors">
                  Right to Erasure
                </Link>
              </li>
              <li>
                <a href="mailto:grievance@credvert.tech" className="hover:text-black dark:hover:text-white transition-colors">
                  Grievance Redressal
                </a>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold">
                  <ShieldCheck className="w-3 h-3" />
                  DPDP Act 2023
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <div>
            © 2026 Credvert Technologies. All rights reserved.{' '}
            <span className="font-mono text-neutral-700 dark:text-neutral-300 font-semibold">https://credvert.tech</span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <Link href="/privacy" className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
              Terms
            </Link>
            <Link href="/deletion" className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
              Erasure Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
