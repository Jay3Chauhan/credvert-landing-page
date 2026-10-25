'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, ArrowRight, Download, Eye, EyeOff, Copy, Check, RotateCw, Sparkles } from 'lucide-react';
import { CREDVERT_CARDS } from '@/lib/cards-data';
import { soundManager, playHapticFeedback } from '@/lib/sound';
import { AppleWordReveal, AppleShimmerText, AppleCyclingPunchline } from '@/components/ui/AppleText';

interface HeroProps {
  onOpenDownload: () => void;
  onCopyNotice: (msg: string) => void;
}

const CYCLING_ITEMS = [
  'Dining at 16.6% Net Return with HDFC Infinia',
  'Online Shopping at Flat 5% Direct Cashback with SBI',
  'Singapore Airlines Flights at 5X EDGE Miles with Axis Atlas',
  'International Travel at 1.5% Ultra-Low Forex with ICICI Emeralde',
  'Tata Neu UPI QR Merchant Swipes at 1.5% NeuCoins',
];

export function Hero({ onOpenDownload, onCopyNotice }: HeroProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [copied, setCopied] = useState(false);

  const card = CREDVERT_CARDS[selectedIdx];

  // Framer Motion spring physics for 3D card tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apple spring parameters: damping 20, stiffness 160
  const springConfig = { damping: 20, stiffness: 160, mass: 1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);

  const cardRef = useRef<HTMLDivElement>(null);
  const [sheenPos, setSheenPos] = useState({ x: 50, y: 50 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    setSheenPos({ x: (x + 0.5) * 100, y: (y + 0.5) * 100 });
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setSheenPos({ x: 50, y: 50 });
  };

  const handleFlip = () => {
    playHapticFeedback('flip');
    setIsFlipped(!isFlipped);
  };

  const handleReveal = () => {
    playHapticFeedback('light');
    if (!isRevealed) {
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        setIsRevealed(true);
        playHapticFeedback('success');
      }, 700);
    } else {
      setIsRevealed(false);
    }
  };

  const handleCopy = () => {
    const pan = isRevealed ? `4111 2300 8900 ${card.last4}` : `•••• •••• •••• ${card.last4}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pan);
      setCopied(true);
      playHapticFeedback('success');
      onCopyNotice(`Card number ending in ${card.last4} copied to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Card Skins
  const getSkinGradient = (skin: string) => {
    switch (skin) {
      case 'aurum':
        return 'from-[#2A2315] via-[#1A160E] to-[#0E0C08] border-gold/40 text-gold-light';
      case 'emerald':
        return 'from-[#0D241C] via-[#091712] to-[#050C0A] border-emerald/40 text-emerald-light';
      case 'sapphire':
        return 'from-[#10223D] via-[#0A1627] to-[#060D17] border-sapphire/40 text-sapphire-light';
      case 'titanium':
        return 'from-[#2A2C33] via-[#1C1D22] to-[#121317] border-zinc-400/40 text-zinc-200';
      case 'obsidian':
        return 'from-[#1A1B22] via-[#101116] to-[#0A0A0D] border-white/20 text-zinc-100';
      case 'rosso':
        return 'from-[#2B1014] via-[#1C0A0D] to-[#0D0506] border-red-500/40 text-rose-200';
      case 'amethyst':
        return 'from-[#22102B] via-[#160A1C] to-[#0C0510] border-purple-500/40 text-purple-200';
      default:
        return 'from-[#1A160E] to-[#0E0C08] border-gold/40 text-gold-light';
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-16 md:pb-28">
      {/* Background Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/[0.08] dark:bg-gold/10 rounded-full blur-[128px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/[0.08] dark:bg-sapphire/10 rounded-full blur-[128px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-white/5 border border-black/10 dark:border-gold/20 text-xs font-semibold text-neutral-800 dark:text-gold-light mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald animate-ping" />
              <span>Live Card Intelligence · Powered by Credvert AI</span>
            </div>

            {/* Apple Animated Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display text-neutral-900 dark:text-white leading-[1.08] mb-6">
              <AppleWordReveal text="Never Leave" /> <br />
              <AppleShimmerText>Reward Points</AppleShimmerText> <br />
              <AppleWordReveal text="On The Table." delayOffset={0.2} />
            </h1>

            {/* Subtitle with High Contrast */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed mb-6 font-sans">
              Credvert reads every swipe in real-time and tells you exactly which card unlocks the{' '}
              <strong className="text-neutral-900 dark:text-white font-semibold">
                highest cashback, airline miles, or milestone perks
              </strong>{' '}
              — with zero-knowledge on-device privacy by design.
            </p>

            {/* Live Cycling Optimizer Bar */}
            <div className="w-full max-w-lg mb-8 p-3 rounded-2xl bg-white dark:bg-white/[0.04] border border-black/10 dark:border-white/10 flex items-center gap-3 text-xs shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-credvert-gold shadow-[0_0_8px_#D4A853] shrink-0" />
              <span className="text-neutral-500 dark:text-neutral-400 font-mono font-semibold uppercase tracking-wider shrink-0">
                Optimizing now:
              </span>
              <AppleCyclingPunchline
                items={CYCLING_ITEMS}
                className="text-neutral-900 dark:text-credvert-goldLight font-medium"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#advisor"
                onClick={() => playHapticFeedback('light')}
                className="px-6 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-credvert-gold to-credvert-goldLight text-neutral-950 shadow-lg shadow-credvert-gold/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Experience Live Advisor</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  playHapticFeedback('medium');
                  onOpenDownload();
                }}
                className="px-6 py-3.5 rounded-2xl text-sm font-semibold bg-white dark:bg-white/[0.05] hover:bg-neutral-100 dark:hover:bg-white/[0.1] text-neutral-800 dark:text-white border border-black/10 dark:border-white/10 flex items-center gap-2 transition-all active:scale-95 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Get App Free</span>
              </button>
            </div>

            {/* Hero Key Stats (High Contrast Guaranteed) */}
            <div className="flex items-center gap-6 sm:gap-10 pt-6 border-t border-black/10 dark:border-white/10 w-full max-w-lg">
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold font-display text-neutral-900 dark:text-white">
                  ₹8.4Cr+
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium font-sans">
                  Rewards Unlocked
                </span>
              </div>
              <div className="h-8 w-px bg-black/10 dark:bg-white/10" />
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold font-display text-neutral-900 dark:text-white">
                  45,000+
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium font-sans">
                  Active Cardholders
                </span>
              </div>
              <div className="h-8 w-px bg-black/10 dark:bg-white/10" />
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold font-display text-emerald-600 dark:text-emerald-400">
                  100%
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium font-sans">
                  On-Device Privacy
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Card Stage */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* The 3D Card Container */}
            <div
              className="relative w-full max-w-[400px] h-[250px] sm:h-[260px] cursor-grab active:cursor-grabbing select-none"
              style={{ perspective: 1200 }}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              ref={cardRef}
            >
              <motion.div
                className="w-full h-full relative"
                style={{
                  rotateX: isFlipped ? 0 : rotateX,
                  rotateY: isFlipped ? 180 : rotateY,
                  transformStyle: 'preserve-3d',
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 160 }}
              >
                {/* ── CARD FRONT ── */}
                <div
                  className={`absolute inset-0 rounded-3xl p-6 bg-gradient-to-br border shadow-2xl flex flex-col justify-between overflow-hidden backface-hidden ${getSkinGradient(
                    card.skin
                  )}`}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                  onClick={handleFlip}
                >
                  {/* Specular Sheen Layer */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(255,255,255,0.4) 0%, transparent 65%)`,
                    }}
                  />

                  {/* Biometric Laser Scan Line */}
                  {isScanning && (
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald to-transparent shadow-[0_0_12px_#10B981] animate-laserScan z-30" />
                  )}

                  {/* Top Row: Bank logo, Name, Contactless */}
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-2.5">
                      <Image
                        src={card.bankLogo}
                        alt={card.bank}
                        width={28}
                        height={28}
                        className="w-7 h-7 object-contain drop-shadow"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold tracking-wider text-white uppercase">{card.bank}</span>
                        {card.metal && (
                          <span className="text-[9px] font-mono font-extrabold text-credvert-goldLight tracking-widest uppercase">
                            METAL EDITION
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Contactless Wave */}
                    <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M9 12a3 3 0 0 1 0-4.24M6.17 14.83A7 7 0 0 1 6.17 5M12 12a5 5 0 0 1 0-7.07" />
                    </svg>
                  </div>

                  {/* Mid Row: EMV Chip */}
                  <div className="z-10 my-2">
                    <div className="w-11 h-8 rounded-lg bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-500 border border-amber-600/50 shadow-inner flex items-center justify-center relative overflow-hidden">
                      <div className="w-full h-[1px] bg-amber-700/40 my-auto" />
                      <div className="h-full w-[1px] bg-amber-700/40 mx-auto" />
                    </div>
                  </div>

                  {/* Bottom Row: Card number, Cardholder, Network */}
                  <div className="z-10 flex items-end justify-between">
                    <div>
                      <div className="font-mono text-base sm:text-lg tracking-[0.2em] font-medium text-white mb-2">
                        {isRevealed ? `4111 2300 8900 ${card.last4}` : `•••• •••• •••• ${card.last4}`}
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-neutral-300 uppercase tracking-wider font-semibold">
                        <div>
                          <span className="block text-[8px] text-neutral-400">Cardholder</span>
                          <span className="text-white font-bold">JAY CHAUHAN</span>
                        </div>
                        <div>
                          <span className="block text-[8px] text-neutral-400">Expires</span>
                          <span className="text-white font-bold">10/29</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Image
                        src={card.networkLogo}
                        alt={card.network}
                        width={48}
                        height={26}
                        className="h-6 w-auto object-contain drop-shadow"
                      />
                    </div>
                  </div>
                </div>

                {/* ── CARD BACK ── */}
                <div
                  className={`absolute inset-0 rounded-3xl p-6 bg-gradient-to-br border shadow-2xl flex flex-col justify-between overflow-hidden backface-hidden ${getSkinGradient(
                    card.skin
                  )}`}
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                  onClick={handleFlip}
                >
                  <div className="w-full h-10 bg-black/90 -mx-6 my-1" />
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-white/20 h-8 rounded px-3 flex items-center font-mono text-xs text-neutral-100 italic">
                      Jay Chauhan
                    </div>
                    <div className="bg-white text-black font-mono font-bold text-xs px-2.5 py-1.5 rounded shadow">
                      {isRevealed ? '842' : '•••'}
                    </div>
                  </div>
                  <p className="text-[9px] text-neutral-300 leading-tight">
                    Authorized signature required. Stored securely in hardware Secure Enclave. Zero cloud transmission
                    per RBI & India DPDP Act 2023 §6.
                  </p>
                  <div className="flex justify-between items-center text-[9px] text-neutral-400 font-mono">
                    <span>24x7 Concierge: 1800 266 3333</span>
                    <span>CID: 8492</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card Controls */}
            <div className="flex items-center gap-2 mt-6">
              <button
                onClick={handleFlip}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-white/[0.06] hover:bg-neutral-100 dark:hover:bg-white/[0.12] text-neutral-800 dark:text-neutral-200 border border-black/10 dark:border-white/10 flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{isFlipped ? 'View Front' : 'Flip Card'}</span>
              </button>
              <button
                onClick={handleReveal}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-white/[0.06] hover:bg-neutral-100 dark:hover:bg-white/[0.12] text-neutral-800 dark:text-neutral-200 border border-black/10 dark:border-white/10 flex items-center gap-1.5 transition-colors shadow-sm"
              >
                {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{isRevealed ? 'Hide Details' : 'Biometric Reveal'}</span>
              </button>
              <button
                onClick={handleCopy}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-white/[0.06] hover:bg-neutral-100 dark:hover:bg-white/[0.12] text-neutral-800 dark:text-neutral-200 border border-black/10 dark:border-white/10 flex items-center gap-1.5 transition-colors shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Segmented Switcher Dock with Sliding Active Pill */}
            <div className="flex flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-[#111217] border border-black/10 dark:border-white/10 mt-6 max-w-md shadow-sm">
              {CREDVERT_CARDS.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => {
                    playHapticFeedback('light');
                    setSelectedIdx(i);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    selectedIdx === i
                      ? 'bg-credvert-gold/20 text-neutral-900 dark:text-credvert-goldLight border border-credvert-gold/50 shadow-sm font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {c.displayName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
