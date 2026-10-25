'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShieldCheck, Lock, Cpu, Trash2, KeyRound, CheckCircle2, ArrowRight } from 'lucide-react';
import { AppleWordReveal } from '@/components/ui/AppleText';

const SECURITY_CARDS = [
  {
    icon: Lock,
    iconColor: 'text-credvert-gold',
    bgBadge: 'bg-credvert-gold/15 border-credvert-gold/30',
    title: 'Apple Secure Enclave & Android Keystore',
    description:
      'Card identifiers and metadata are encrypted inside your phone’s dedicated hardware security module (HSM). Decryption requires local FaceID/Fingerprint biometric confirmation and never touches network transit.',
    badge: 'Hardware HSM Level 3',
  },
  {
    icon: ShieldCheck,
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    bgBadge: 'bg-emerald-500/15 border-emerald-500/30',
    title: 'DPDP Act 2023 Statutory Compliance',
    description:
      'Strict adherence to India’s Digital Personal Data Protection Act §6 consent architecture. Raw transaction SMS bodies are mathematically prohibited from leaving local device memory.',
    badge: 'Statutory DPDP Guard',
  },
  {
    icon: Trash2,
    iconColor: 'text-cyan-500 dark:text-cyan-400',
    bgBadge: 'bg-cyan-500/15 border-cyan-500/30',
    title: 'One-Tap Right to Erasure (DPDP §12)',
    description:
      'You own your financial data unconditionally. Initiate an instant self-service deletion request in-app or via our web portal to permanently purge all associated metadata within 24 hours.',
    badge: 'Zero Retention Guarantee',
    actionLink: '/deletion',
    actionText: 'Open Deletion Portal',
  },
];

export default function SecurityVault() {
  return (
    <section id="security" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium tracking-wide mb-4 shadow-sm"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>HARDWARE-SECURED ENCLAVE ARCHITECTURE</span>
        </motion.div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-neutral-900 dark:text-white mb-4">
          <AppleWordReveal text="Security Architecture That" />{' '}
          <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
            Never Compromises.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
          We do not sell your transactional telemetry. Your financial identity is sealed inside
          tamper-resistant silicon chips and protected under Indian privacy jurisprudence.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SECURITY_CARDS.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="rounded-3xl bg-white dark:bg-neutral-900/60 border border-black/10 dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 backdrop-blur-2xl p-7 sm:p-8 flex flex-col justify-between transition-all group shadow-md dark:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${card.bgBadge} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 border border-black/10 dark:border-white/10 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-white/[0.02]">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-neutral-900 dark:text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                  {card.description}
                </p>
              </div>

              {card.actionLink ? (
                <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/[0.06]">
                  <Link
                    href={card.actionLink}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-credvert-goldDark dark:text-credvert-gold hover:underline transition-colors"
                  >
                    <span>{card.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/[0.06] flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Always active by default</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Code Audit & Verification Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 p-6 rounded-3xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <KeyRound className="w-5 h-5 text-credvert-gold shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-neutral-900 dark:text-white">Cryptographically Verifiable Open Architecture.</span>
            <span className="text-neutral-600 dark:text-neutral-400 ml-1">
              Audit the core parser engine, SQLite schema, and zero-telemetry network layer on GitHub.
            </span>
          </div>
        </div>
        <a
          href="https://github.com/Jay3Chauhan/CreditVance.git"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-xs font-mono font-semibold text-neutral-900 dark:text-white transition-colors flex items-center gap-1.5 border border-black/10 dark:border-white/10 shadow-sm"
        >
          <span>View Source on GitHub</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </section>
  );
}
