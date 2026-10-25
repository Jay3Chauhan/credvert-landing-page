'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, QrCode, ArrowRight, ShieldCheck, Download, Apple } from 'lucide-react';
import Image from 'next/image';
import { playHapticFeedback } from '@/lib/sound';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playHapticFeedback('light');
            onClose();
          }}
          className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 240, damping: 25 }}
          className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-neutral-950 border border-black/15 dark:border-white/15 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
        >
          {/* Top radial highlight */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-credvert-gold/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => {
              playHapticFeedback('light');
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-xl text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.05] dark:hover:bg-white/10 border border-black/5 dark:border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-credvert-gold/30 p-2 flex items-center justify-center shadow-md">
              <Image
                src="/assets/brand/credvert-mark.svg"
                alt="Credvert Monogram"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-white">Get Credvert</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                On-Device Credit Card Intelligence Platform
              </p>
            </div>
          </div>

          {/* QR Code & Direct Scan */}
          <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/[0.08] flex flex-col sm:flex-row items-center gap-6 mb-6">
            {/* High-contrast QR Container */}
            <div className="w-32 h-32 rounded-2xl bg-white p-2.5 flex items-center justify-center shadow-inner shrink-0 border border-black/10">
              <svg viewBox="0 0 100 100" className="w-full h-full text-neutral-950" fill="currentColor">
                {/* 3 Position Detection Patterns */}
                <rect x="0" y="0" width="30" height="30" rx="4" />
                <rect x="5" y="5" width="20" height="20" rx="2" fill="white" />
                <rect x="10" y="10" width="10" height="10" rx="1" fill="currentColor" />

                <rect x="70" y="0" width="30" height="30" rx="4" />
                <rect x="75" y="5" width="20" height="20" rx="2" fill="white" />
                <rect x="80" y="10" width="10" height="10" rx="1" fill="currentColor" />

                <rect x="0" y="70" width="30" height="30" rx="4" />
                <rect x="5" y="75" width="20" height="20" rx="2" fill="white" />
                <rect x="10" y="80" width="10" height="10" rx="1" fill="currentColor" />

                {/* Data Matrix Dots */}
                <rect x="40" y="10" width="8" height="8" rx="1" />
                <rect x="52" y="10" width="8" height="8" rx="1" />
                <rect x="40" y="22" width="8" height="8" rx="1" />
                <rect x="10" y="40" width="8" height="8" rx="1" />
                <rect x="22" y="40" width="8" height="8" rx="1" />
                <rect x="40" y="40" width="20" height="20" rx="3" fill="#C5A880" />
                <rect x="70" y="40" width="8" height="8" rx="1" />
                <rect x="82" y="40" width="8" height="8" rx="1" />
                <rect x="70" y="52" width="8" height="8" rx="1" />
                <rect x="40" y="70" width="8" height="8" rx="1" />
                <rect x="52" y="70" width="8" height="8" rx="1" />
                <rect x="70" y="70" width="8" height="8" rx="1" />
                <rect x="82" y="82" width="8" height="8" rx="1" />
                <rect x="52" y="82" width="8" height="8" rx="1" />
              </svg>
            </div>

            <div className="text-center sm:text-left space-y-2">
              <span className="text-xs font-mono font-bold text-credvert-goldDark dark:text-credvert-gold uppercase tracking-wider block">
                Instant Mobile Scan
              </span>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                Point your phone camera at this QR code to download the latest Android Release APK or join the iOS
                TestFlight Beta directly from GitHub.
              </p>
              <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center justify-center sm:justify-start gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SHA-256 Verified Binary</span>
              </div>
            </div>
          </div>

          {/* Action Download Buttons */}
          <div className="space-y-3">
            <a
              href="https://github.com/Jay3Chauhan/CreditVance/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-credvert-gold to-credvert-goldLight text-neutral-950 font-bold text-sm flex items-center justify-between hover:brightness-110 shadow-lg shadow-credvert-gold/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5" />
                <span>Download Android APK (v1.2.4)</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://testflight.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white font-semibold text-sm flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-3">
                <Apple className="w-5 h-5" />
                <span>Join iOS TestFlight Beta</span>
              </div>
              <span className="text-xs font-mono text-neutral-500 font-medium">Public Beta</span>
            </a>
          </div>

          {/* DPDP Disclaimer */}
          <div className="mt-6 text-center text-[11px] text-neutral-500 dark:text-neutral-400 font-sans">
            Requires iOS 15.0+ or Android 10+. Fully compliant with Digital Personal Data Protection
            Act 2023 §6. Zero remote SMS ingestion.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
