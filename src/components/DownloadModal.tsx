'use client';

import React from 'react';
import { Apple, ArrowUpRight, Download, ShieldCheck } from 'lucide-react';
import { Sheet } from '@/components/ui/Sheet';
import { BrandMark } from '@/components/brand/Logo';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RELEASES_URL = 'https://github.com/Jay3Chauhan/CreditVance/releases';

/* Decorative QR-style glyph; the real link is the buttons below. */
function QrGlyph() {
  const cells = [
    [40, 10], [52, 10], [40, 22], [10, 40], [22, 40], [70, 40], [82, 40], [70, 52],
    [40, 70], [52, 70], [70, 70], [82, 82], [52, 82], [64, 58], [28, 58], [58, 28],
  ];
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full text-neutral-950" fill="currentColor" aria-hidden>
      {[
        [0, 0],
        [70, 0],
        [0, 70],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="30" height="30" rx="7" />
          <rect x={x + 5} y={y + 5} width="20" height="20" rx="4" fill="white" />
          <rect x={x + 10} y={y + 10} width="10" height="10" rx="2" />
        </g>
      ))}
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" rx="2" />
      ))}
      <rect x="40" y="40" width="20" height="20" rx="5" fill="#D4A853" />
    </svg>
  );
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  return (
    <Sheet open={isOpen} onClose={onClose} title="Get credVert." description="Free on Android and iOS">
      <div className="flex items-center gap-5 p-5 rounded-3xl bg-neutral-50 dark:bg-white/[0.04] border border-black/5 dark:border-white/[0.06]">
        <div className="relative w-28 h-28 shrink-0 rounded-2xl bg-white p-2.5 border border-black/10">
          <QrGlyph />
          <BrandMark className="absolute inset-0 m-auto w-8 h-8" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-neutral-900 dark:text-white">Scan on your phone</p>
          <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
            Point your camera here to open the latest Android release or the iOS TestFlight beta.
          </p>
          <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> SHA-256 verified builds
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <a
          href={RELEASES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-14 px-5 rounded-2xl bg-gradient-to-b from-[#FDE38A] to-credvert-gold text-neutral-950 font-semibold text-[15px] flex items-center justify-between active:scale-[0.98] transition-transform"
        >
          <span className="flex items-center gap-3">
            <Download className="w-5 h-5" /> Download for Android
          </span>
          <span className="text-xs font-medium opacity-70">APK · v1.2.4</span>
        </a>
        <a
          href="https://testflight.apple.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-14 px-5 rounded-2xl border border-black/10 dark:border-white/15 text-neutral-900 dark:text-white font-semibold text-[15px] flex items-center justify-between hover:bg-black/[0.03] dark:hover:bg-white/[0.05] active:scale-[0.98] transition"
        >
          <span className="flex items-center gap-3">
            <Apple className="w-5 h-5" /> Join the iOS beta
          </span>
          <ArrowUpRight className="w-4 h-4 opacity-60" />
        </a>
      </div>

      <p className="mt-5 text-center text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
        Requires iOS 15 or Android 10 and later. SMS are parsed on your device and never uploaded.
      </p>
    </Sheet>
  );
}
