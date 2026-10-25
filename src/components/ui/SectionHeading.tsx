'use client';

import React from 'react';
import { LineReveal } from '@/components/ui/AppleText';
import { Reveal } from '@/components/ui/Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode[];
  description?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
  size?: 'lg' | 'md';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  size = 'lg',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col max-w-3xl ${alignment} ${className}`}>
      {eyebrow && (
        <Reveal y={12}>
          <span className="eyebrow text-credvert-goldDark dark:text-credvert-gold mb-4 inline-block">{eyebrow}</span>
        </Reveal>
      )}
      <h2
        className={`${size === 'lg' ? 'display-lg' : 'display-md'} text-neutral-900 dark:text-white text-balance`}
      >
        <LineReveal lines={title} />
      </h2>
      {description && (
        <Reveal delay={0.15} y={16}>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 text-pretty max-w-2xl">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
