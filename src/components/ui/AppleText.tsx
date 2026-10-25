'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AppleWordRevealProps {
  text: string;
  className?: string;
  delayOffset?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function AppleWordReveal({
  text,
  className = '',
  delayOffset = 0,
  as: Component = 'span',
}: AppleWordRevealProps) {
  const words = text.split(' ');

  return (
    <Component className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] align-top">
          <motion.span
            initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
            whileInView={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 20,
              delay: delayOffset + index * 0.045,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

interface AppleShimmerTextProps {
  children: React.ReactNode;
  className?: string;
}

export function AppleShimmerText({ children, className = '' }: AppleShimmerTextProps) {
  return (
    <span
      className={`relative inline-block bg-gradient-to-r from-amber-200 via-credvert-gold to-yellow-100 dark:from-[#F5E6CC] dark:via-[#D4A853] dark:to-[#FFFFFF] bg-[length:250%_100%] bg-clip-text text-transparent animate-shimmer ${className}`}
    >
      {children}
    </span>
  );
}

interface AppleCyclingPunchlineProps {
  items: string[];
  intervalMs?: number;
  className?: string;
}

export function AppleCyclingPunchline({
  items,
  intervalMs = 3800,
  className = '',
}: AppleCyclingPunchlineProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, intervalMs]);

  return (
    <div className={`relative h-6 sm:h-7 overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
          transition={{
            type: 'spring',
            stiffness: 240,
            damping: 22,
          }}
          className="absolute inset-0 flex items-center font-medium truncate"
        >
          {items[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
