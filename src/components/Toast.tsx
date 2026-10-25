'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function Toast({ toasts, onDismiss }: ToastProps) {
  return (
    <div
      className="fixed top-[calc(var(--nav-height)+12px)] left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 z-[80] flex flex-col gap-2 max-w-sm w-[calc(100%-2rem)] pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: -16, scale: 0.96, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl glass shadow-glass text-left"
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-credvert-gold shrink-0 mt-0.5" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />}

            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-neutral-900 dark:text-white">{toast.title}</div>
              {toast.message && (
                <div className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5 leading-relaxed font-sans">
                  {toast.message}
                </div>
              )}
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
