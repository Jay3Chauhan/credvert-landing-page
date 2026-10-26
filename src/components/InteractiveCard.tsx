'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { RotateCw, ShieldCheck, X } from 'lucide-react';
import { CREDVERT_CARDS } from '@/lib/cards-data';
import { playHapticFeedback } from '@/lib/sound';
import { springSnappy } from '@/lib/motion';
import type { CardSkin } from '@/types';

const SKINS: Record<CardSkin, string> = {
  aurum: 'from-[#3A2F17] via-[#1E1A10] to-[#0E0C08]',
  emerald: 'from-[#0F3326] via-[#0A1E17] to-[#050C0A]',
  sapphire: 'from-[#14305A] via-[#0B1B33] to-[#060D17]',
  titanium: 'from-[#3A3D45] via-[#202227] to-[#121317]',
  obsidian: 'from-[#22242D] via-[#121318] to-[#0A0A0D]',
  rosso: 'from-[#3D141A] via-[#220B0F] to-[#0D0506]',
  amethyst: 'from-[#3B1D5E] via-[#21103A] to-[#0C0510]',
};

const NEVER_STORED = ['Full 16-digit number', 'CVV', 'Expiry date', 'OTPs', 'Raw SMS text'];

export default function InteractiveCard() {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();
  const card = CREDVERT_CARDS[idx];
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const tiltSpring = { stiffness: 220, damping: 24, mass: 0.6 };
  const tiltX = useSpring(useTransform(py, [0, 1], reduce ? [0, 0] : [12, -12]), tiltSpring);
  const tiltY = useSpring(useTransform(px, [0, 1], reduce ? [0, 0] : [-16, 16]), tiltSpring);
  const flip = useSpring(0, { stiffness: 140, damping: 20, mass: 1 });
  const rotateY = useTransform([tiltY, flip], ([t, f]) => (t as number) + (f as number));
  const sheenX = useTransform(px, (v) => `${v * 100}%`);
  const sheenY = useTransform(py, (v) => `${v * 100}%`);
  const sheen = useMotionTemplate`radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.28), transparent 55%)`;

  const onPointerMove = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const onPointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const toggleFlip = () => {
    playHapticFeedback('flip');
    const next = !flipped;
    setFlipped(next);
    flip.set(next ? 180 : 0);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerLeave}
        className="relative w-full max-w-[420px] aspect-[1.586] select-none touch-pan-y"
        style={{ perspective: 1200 }}
      >
        <motion.button
          type="button"
          onClick={toggleFlip}
          aria-label={flipped ? 'Show card front' : 'Show what credVert. never stores'}
          whileTap={{ scale: 0.98 }}
          style={{ rotateX: tiltX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative w-full h-full rounded-[22px] text-left cursor-pointer"
        >
          {/* Front */}
          <div
            className={`absolute inset-0 rounded-[22px] p-6 bg-gradient-to-br ${SKINS[card.skin]} border border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between`}
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <motion.div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: sheen }} />
            <div aria-hidden className="absolute -right-16 -bottom-24 w-72 h-72 rounded-full border-[28px] border-white/[0.05]" />
            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-sm">
                  <Image src={card.bankLogo} alt={card.bank} width={26} height={26} className="w-full h-full object-contain" unoptimized />
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/90">{card.bank}</div>
                  <div className="text-[13px] font-semibold text-white">{card.displayName}</div>
                </div>
              </div>
              <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                <path d="M9 12a3 3 0 0 1 0-4.24M6.17 14.83A7 7 0 0 1 6.17 5M12 12a5 5 0 0 1 0-7.07" transform="rotate(90 12 12)" />
              </svg>
            </div>
            <div className="relative w-11 h-8 rounded-md bg-gradient-to-br from-[#F6E3A1] via-[#D9B45A] to-[#A07A2C] shadow-inner" aria-hidden />
            <div className="relative flex items-end justify-between">
              <div>
                <div className="font-mono text-lg sm:text-xl tracking-[0.18em] text-white">
                  •••• •••• •••• <span className="text-credvert-goldLight">{card.last4}</span>
                </div>
                <div className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-white/60">{card.network}</div>
              </div>
              <Image src={card.networkLogo} alt={card.network} width={48} height={28} className="h-7 w-auto rounded bg-white px-1.5 py-1" />
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-[22px] p-6 bg-gradient-to-br from-[#16181F] to-[#0A0B0E] border border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] flex flex-col justify-between"
            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-[0.14em]">
              <ShieldCheck className="w-4 h-4" /> Never leaves the bank
            </div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {NEVER_STORED.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[13px] text-white/90">
                  <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center">
                    <X className="w-2.5 h-2.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-white/50 leading-snug">
              credVert. keeps only the card name and last four digits, encrypted with your device keystore.
            </p>
          </div>
        </motion.button>
      </div>

      <div className="mt-7 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleFlip}
          className="h-9 px-4 rounded-full text-[13px] font-semibold bg-white/10 hover:bg-white/15 text-white flex items-center gap-2 active:scale-[0.97] transition"
        >
          <RotateCw className="w-3.5 h-3.5" />
          {flipped ? 'Show front' : 'What we never store'}
        </button>
      </div>

      <div className="mt-5 flex gap-1 p-1 rounded-full bg-white/[0.06] border border-white/10 max-w-full overflow-x-auto scrollbar-none">
        {CREDVERT_CARDS.map((c, i) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => {
              playHapticFeedback('light');
              setIdx(i);
            }}
            className={`relative shrink-0 whitespace-nowrap px-3 h-8 rounded-full text-xs font-medium transition-colors ${
              i === idx ? 'text-neutral-950' : 'text-white/60 hover:text-white'
            }`}
            aria-pressed={i === idx}
          >
            {i === idx && (
              <motion.span layoutId="card-pill" transition={springSnappy} className="absolute inset-0 rounded-full bg-white" />
            )}
            <span className="relative z-10">{c.displayName}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
