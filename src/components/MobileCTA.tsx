'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BrandMark } from '@/components/brand/Logo';
import { playHapticFeedback } from '@/lib/sound';
import { springSheet } from '@/lib/motion';

/** Thumb-reach download bar for phones; appears after the hero and steps aside near the footer. */
export default function MobileCTA({ onOpenDownload, suppressed }: { onOpenDownload: () => void; suppressed: boolean }) {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 900;
    setVisible(y > window.innerHeight * 0.9 && !nearEnd);
  });

  return (
    <AnimatePresence>
      {visible && !suppressed && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={springSheet}
          className="lg:hidden fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30"
        >
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              playHapticFeedback('medium');
              onOpenDownload();
            }}
            className="w-full h-14 pl-2 pr-5 rounded-2xl glass shadow-[0_20px_50px_-15px_rgba(0,0,0,0.45)] flex items-center gap-3 text-left"
          >
            <span className="w-10 h-10 rounded-xl bg-neutral-950 flex items-center justify-center shrink-0">
              <BrandMark className="w-6 h-6" />
            </span>
            <span className="flex-1 leading-tight">
              <span className="block text-sm font-semibold text-neutral-950 dark:text-white">Get credVert. — free</span>
              <span className="block text-xs text-neutral-500 dark:text-neutral-400">Android · iOS beta</span>
            </span>
            <span className="h-9 px-4 rounded-full bg-gradient-to-b from-[#FDE38A] to-credvert-gold text-neutral-950 text-[13px] font-semibold inline-flex items-center gap-1.5">
              Install <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
