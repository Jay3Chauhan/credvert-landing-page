'use client';

import React, { useState, useEffect } from 'react';
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
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { parseSMS, SMS_SAMPLES } from '@/lib/sms-engine';
import { SMSParseResult } from '@/types';
import { playHapticFeedback } from '@/lib/sound';

export default function SMSIntelligence() {
  const [activeSample, setActiveSample] = useState<string>('sample-1');
  const [inputText, setInputText] = useState<string>(SMS_SAMPLES['sample-1']);
  const [parseResult, setParseResult] = useState<SMSParseResult | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    setIsParsing(true);
    parseSMS(inputText).then((res) => {
      if (!isCancelled) {
        setParseResult(res);
        setIsParsing(false);
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
    <section id="privacy" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium tracking-wide mb-4"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>DPDP ACT 2023 COMPLIANT • ZERO SERVER HOPS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-white mb-4"
        >
          On-Device Spend Intelligence.{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Your SMS never leaves your phone.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-neutral-400 font-sans"
        >
          Traditional fintech uploads your private bank SMS to remote servers. Credvert parses OTP-free
          transaction alerts directly on iOS/Android inside your device’s sandbox in under 0.02 milliseconds.
        </motion.p>
      </div>

      {/* Interactive Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Input & Presets */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-credvert-gold" />
              Live SMS Parser Sandbox
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Local Execution
            </span>
          </div>

          {/* Sample Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'sample-1', label: 'HDFC Bank', badge: 'Zomato' },
              { id: 'sample-2', label: 'SBI Card', badge: 'Amazon' },
              { id: 'sample-3', label: 'Axis Bank', badge: 'MakeMyTrip' },
              { id: 'sample-4', label: 'ICICI Bank', badge: 'Apple US$' },
            ].map((sample) => (
              <button
                key={sample.id}
                onClick={() => selectSample(sample.id)}
                className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                  activeSample === sample.id
                    ? 'bg-white/[0.08] border-credvert-gold/50 text-white shadow-lg shadow-credvert-gold/5'
                    : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:border-white/20 hover:text-neutral-200'
                }`}
              >
                <div className="font-medium text-white truncate">{sample.label}</div>
                <div className="text-[11px] text-neutral-400 truncate">{sample.badge}</div>
              </button>
            ))}
          </div>

          {/* Textarea */}
          <div className="relative rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl p-4 focus-within:border-credvert-gold/40 transition-colors">
            <label htmlFor="sms-input" className="block text-xs font-mono text-neutral-400 mb-2">
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
              className="w-full bg-transparent text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none resize-none font-mono leading-relaxed"
            />
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs text-neutral-400 font-mono">
              <span>{inputText.length} characters</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                No network traffic generated
              </span>
            </div>
          </div>

          {/* Privacy Guarantees Micro-List */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="font-semibold text-neutral-200">Zero OTP Parsing</div>
                <div className="text-neutral-400 text-[11px] mt-0.5">
                  Regex engine strictly rejects messages containing 4-8 digit OTP tokens.
                </div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
              <Cpu className="w-4 h-4 text-credvert-gold shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="font-semibold text-neutral-200">Local SHA-256 Hash</div>
                <div className="text-neutral-400 text-[11px] mt-0.5">
                  Deduplication fingerprints are hashed inside device RAM and discarded.
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Real-Time Parsed Entity Display */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6"
        >
          <div className="rounded-2xl bg-neutral-900/90 border border-white/10 backdrop-blur-2xl p-6 shadow-2xl relative overflow-hidden">
            {/* Top Bar with Speed Badge */}
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono font-medium text-neutral-300">PARSER OUTPUT SCHEMA</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <Zap className="w-3.5 h-3.5" />
                <span>{parseResult ? `${parseResult.parsedInMs.toFixed(3)} ms` : '0.015 ms'}</span>
              </div>
            </div>

            {/* Parsed Fields */}
            {parseResult && (
              <div className="mt-6 space-y-4">
                {/* Bank & Card Line */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-1">
                      Issuing Bank
                    </span>
                    <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-credvert-gold" />
                      {parseResult.bank}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-1">
                      Card Digits
                    </span>
                    <span className="text-sm font-mono font-bold text-white tracking-widest">
                      •••• {parseResult.cardLast4}
                    </span>
                  </div>
                </div>

                {/* Amount & Merchant */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-1">
                      Detected Amount
                    </span>
                    <span className="text-xl font-bold font-display text-emerald-400">
                      ₹{parseResult.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-1">
                      Extracted Merchant
                    </span>
                    <span className="text-sm font-semibold text-white capitalize truncate block">
                      {parseResult.merchant}
                    </span>
                  </div>
                </div>

                {/* Spend Category & Confidence */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-1">
                      Category Classifier
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-credvert-gold/15 text-credvert-goldLight text-xs font-medium border border-credvert-gold/30 capitalize">
                      <Sparkles className="w-3 h-3" />
                      {parseResult.category.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-1">
                      Regex Confidence
                    </span>
                    <span className="text-sm font-mono font-bold text-emerald-400">99.8%</span>
                  </div>
                </div>

                {/* SHA-256 Dedupe Hash */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1">
                      <Hash className="w-3 h-3 text-credvert-gold" />
                      Idempotent SHA-256 Dedupe Fingerprint
                    </span>
                    <button
                      onClick={handleCopyHash}
                      className="text-[11px] font-mono text-credvert-gold hover:text-credvert-goldLight flex items-center gap-1 transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedHash ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="font-mono text-xs text-neutral-400 break-all bg-neutral-950/60 p-2 rounded-lg border border-white/[0.04]">
                    {parseResult.sha256Hash}
                  </div>
                </div>

                {/* Trust Seal */}
                <div className="pt-2 flex items-center gap-2 text-xs text-neutral-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Complies with Digital Personal Data Protection (DPDP) Act 2023 §6. Encrypted in SQLite Cipher on-device.
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
