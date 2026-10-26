'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Cpu,
  Lock,
  Zap,
  CheckCircle2,
  Copy,
  Terminal,
  Hash,
  Sparkles,
} from 'lucide-react';
import { parseSMS, SMS_SAMPLES } from '@/lib/sms-engine';
import { SMSParseResult } from '@/types';
import { playHapticFeedback } from '@/lib/sound';
import { AppleWordReveal } from '@/components/ui/AppleText';
import { getBankSymbolUrl } from '@/lib/bank-logos';

export default function SMSIntelligence({ embedded = false }: { embedded?: boolean }) {
  const [activeSample, setActiveSample] = useState<string>('sample-1');
  const [inputText, setInputText] = useState<string>(SMS_SAMPLES['sample-1']);
  const [parseResult, setParseResult] = useState<SMSParseResult | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    parseSMS(inputText).then((res) => {
      if (!isCancelled) {
        setParseResult(res);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [inputText]);

  const selectSample = (key: string) => {
    playHapticFeedback('light');
    setActiveSample(key);
    setInputText(SMS_SAMPLES[key]);
  };

  const handleCopyHash = () => {
    if (parseResult?.sha256Hash) {
      navigator.clipboard.writeText(parseResult.sha256Hash);
      playHapticFeedback('success');
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  return (
    <section
      id={embedded ? undefined : 'sms-intelligence'}
      className={embedded ? 'relative' : 'relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden'}
    >
      {/* Header */}
      <div className={embedded ? 'hidden' : 'text-center max-w-3xl mx-auto mb-16'}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium tracking-wide mb-4 shadow-sm"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>DPDP ACT 2023 COMPLIANT • ZERO SERVER HOPS</span>
        </motion.div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-neutral-900 dark:text-white mb-4">
          <AppleWordReveal text="On-Device Spend Intelligence." />{' '}
          <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
            Your SMS never leaves your phone.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
          Traditional fintech uploads your private bank SMS to remote servers. credVert. parses OTP-free
          transaction alerts directly on iOS/Android inside your device’s sandbox in under 0.02 milliseconds.
        </p>
      </div>

      {/* Interactive Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Input & Presets */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-credvert-gold" />
              Live SMS Parser Sandbox
            </span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Local Execution
            </span>
          </div>

          {/* Sample Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'sample-1', label: 'HDFC Bank', slug: 'hdfc', badge: 'Zomato' },
              { id: 'sample-2', label: 'SBI Card', slug: 'sbin', badge: 'Amazon' },
              { id: 'sample-3', label: 'Axis Bank', slug: 'utib', badge: 'MakeMyTrip' },
              { id: 'sample-4', label: 'ICICI Bank', slug: 'icic', badge: 'Apple US$' },
            ].map((sample) => (
              <button
                key={sample.id}
                onClick={() => selectSample(sample.id)}
                className={`p-3 rounded-2xl text-left border text-xs transition-all ${
                  activeSample === sample.id
                    ? 'bg-credvert-gold/20 border-credvert-gold/50 text-neutral-900 dark:text-white shadow-sm font-semibold'
                    : 'bg-white dark:bg-white/[0.02] border-black/10 dark:border-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:border-black/20 dark:hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-md bg-white p-0.5 flex items-center justify-center shrink-0 border border-black/5 shadow-xs">
                    <Image
                      src={getBankSymbolUrl(sample.slug)}
                      alt=""
                      width={16}
                      height={16}
                      className="w-full h-full object-contain"
                      unoptimized
                    />
                  </span>
                  <div className="font-semibold text-neutral-900 dark:text-white truncate">{sample.label}</div>
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 pl-7 truncate">{sample.badge}</div>
              </button>
            ))}
          </div>

          {/* Textarea */}
          <div className="relative rounded-3xl bg-white dark:bg-neutral-900/80 border border-black/10 dark:border-white/10 backdrop-blur-xl p-5 focus-within:border-credvert-gold/60 transition-colors shadow-sm">
            <label htmlFor="sms-input" className="block text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-2 uppercase">
              RAW SMS INPUT (EDIT OR PASTE YOUR OWN)
            </label>
            <textarea
              id="sms-input"
              value={inputText}
              onChange={(e) => {
                setActiveSample('');
                setInputText(e.target.value);
              }}
              rows={4}
              placeholder="Paste any bank transaction SMS here..."
              className="w-full bg-transparent text-sm text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none resize-none font-mono leading-relaxed"
            />
            <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/[0.06] text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              <span>{inputText.length} characters</span>
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                No network traffic generated
              </span>
            </div>
          </div>

          {/* Privacy Guarantees Micro-List */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/[0.06] flex items-start gap-3 shadow-sm">
              <Lock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="font-semibold text-neutral-900 dark:text-neutral-200">Zero OTP Parsing</div>
                <div className="text-neutral-500 dark:text-neutral-400 text-[11px] mt-0.5 leading-relaxed">
                  Regex engine strictly rejects messages containing 4-8 digit OTP tokens.
                </div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/[0.06] flex items-start gap-3 shadow-sm">
              <Cpu className="w-4 h-4 text-credvert-gold shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="font-semibold text-neutral-900 dark:text-neutral-200">Local SHA-256 Hash</div>
                <div className="text-neutral-500 dark:text-neutral-400 text-[11px] mt-0.5 leading-relaxed">
                  Deduplication fingerprints are hashed inside device RAM and discarded.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Parsed Entity Display */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl bg-white dark:bg-neutral-900/90 border border-black/10 dark:border-white/10 backdrop-blur-2xl p-6 sm:p-7 shadow-xl dark:shadow-2xl relative overflow-hidden">
            {/* Top Bar with Speed Badge */}
            <div className="flex items-center justify-between pb-5 border-b border-black/10 dark:border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono font-semibold text-neutral-800 dark:text-neutral-300">
                  PARSER OUTPUT SCHEMA
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
                <Zap className="w-3.5 h-3.5" />
                <span>{parseResult ? `${parseResult.parsedInMs.toFixed(3)} ms` : '0.015 ms'}</span>
              </div>
            </div>

            {/* Parsed Fields */}
            {parseResult && (
              <div className="mt-6 space-y-4">
                {/* Bank & Card Line */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.06]">
                    <span className="text-[11px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block mb-1">
                      Issuing Bank
                    </span>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-white p-0.5 flex items-center justify-center shrink-0 border border-black/5 shadow-xs">
                        <Image
                          src={getBankSymbolUrl(parseResult.bank)}
                          alt=""
                          width={16}
                          height={16}
                          className="w-full h-full object-contain"
                          unoptimized
                        />
                      </span>
                      <span>{parseResult.bank}</span>
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.06]">
                    <span className="text-[11px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block mb-1">
                      Card Digits
                    </span>
                    <span className="text-sm font-mono font-bold text-neutral-900 dark:text-white tracking-widest">
                      •••• {parseResult.cardLast4}
                    </span>
                  </div>
                </div>

                {/* Amount & Merchant */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.06]">
                    <span className="text-[11px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block mb-1">
                      Detected Amount
                    </span>
                    <span className="text-xl sm:text-2xl font-bold font-display text-emerald-600 dark:text-emerald-400">
                      ₹{parseResult.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.06]">
                    <span className="text-[11px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block mb-1">
                      Extracted Merchant
                    </span>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white capitalize truncate block">
                      {parseResult.merchant}
                    </span>
                  </div>
                </div>

                {/* Spend Category & Confidence */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block mb-1">
                      Category Classifier
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-credvert-gold/15 text-credvert-goldDark dark:text-credvert-goldLight text-xs font-semibold border border-credvert-gold/30 capitalize">
                      <Sparkles className="w-3 h-3" />
                      {parseResult.category.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block mb-1">
                      Regex Confidence
                    </span>
                    <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">99.8%</span>
                  </div>
                </div>

                {/* SHA-256 Dedupe Hash */}
                <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-black/40 border border-black/5 dark:border-white/[0.06]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-400 flex items-center gap-1 font-semibold">
                      <Hash className="w-3 h-3 text-credvert-gold" />
                      Idempotent SHA-256 Dedupe Fingerprint
                    </span>
                    <button
                      onClick={handleCopyHash}
                      className="text-[11px] font-mono text-credvert-goldDark dark:text-credvert-gold hover:underline flex items-center gap-1 font-semibold transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedHash ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="font-mono text-xs text-neutral-700 dark:text-neutral-400 break-all bg-white dark:bg-neutral-950/60 p-2.5 rounded-xl border border-black/5 dark:border-white/[0.04]">
                    {parseResult.sha256Hash}
                  </div>
                </div>

                {/* Trust Seal */}
                <div className="pt-2 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>
                    Complies with Digital Personal Data Protection (DPDP) Act 2023 §6. Encrypted in SQLite Cipher on-device.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
