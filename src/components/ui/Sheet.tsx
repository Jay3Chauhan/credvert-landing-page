'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls, type PanInfo } from 'framer-motion';
import { X } from 'lucide-react';
import { useEscape, useMediaQuery, useScrollLock } from '@/lib/hooks';
import { projectMomentum, springSettle, springSheet } from '@/lib/motion';
import { playHapticFeedback } from '@/lib/sound';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

const DISMISS_DISTANCE = 140;

/**
 * Bottom sheet on phones (drag down to dismiss, with momentum projection),
 * centred dialog on larger screens. Enters and exits along the same path.
 */
export function Sheet({ open, onClose, title, description, children, maxWidth = 'max-w-lg' }: SheetProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const dragControls = useDragControls();
  const panelRef = useRef<HTMLDivElement>(null);

  useScrollLock(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const projected = info.offset.y + projectMomentum(info.velocity.y, 0.99);
    if (projected > DISMISS_DISTANCE) {
      playHapticFeedback('light');
      onClose();
    }
  };

  const panelMotion = isDesktop
    ? {
        initial: { opacity: 0, scale: 0.96, y: 12, filter: 'blur(8px)' },
        animate: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, scale: 0.96, y: 12, filter: 'blur(8px)' },
        transition: springSettle,
      }
    : {
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '100%' },
        transition: springSheet,
      };

  return (
    <AnimatePresence>
      {open && (
        <div key="sheet" className="fixed inset-0 z-[70] flex items-end md:items-center justify-center md:p-6">
          <motion.div
            key="scrim"
            className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            {...panelMotion}
            drag={isDesktop ? false : 'y'}
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.04, bottom: 0.7 }}
            onDragEnd={handleDragEnd}
            className={`relative w-full ${maxWidth} max-h-[92svh] flex flex-col rounded-t-[28px] md:rounded-[28px] bg-white dark:bg-obsidian-100 border border-black/10 dark:border-white/10 shadow-2xl outline-none overflow-hidden`}
          >
            <div
              className="shrink-0 px-6 pt-3 pb-4 md:pt-6 touch-none cursor-grab active:cursor-grabbing md:cursor-default"
              onPointerDown={(e) => !isDesktop && dragControls.start(e)}
            >
              <div className="md:hidden mx-auto mb-4 h-1.5 w-10 rounded-full bg-black/15 dark:bg-white/20" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-display font-semibold tracking-tight text-neutral-900 dark:text-white">
                    {title}
                  </h2>
                  {description && (
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  onPointerDown={(e) => e.stopPropagation()}
                  aria-label="Close"
                  className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white active:scale-95 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto overscroll-contain px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
