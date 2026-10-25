'use client';

import React, { useRef } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** Surface with a pointer-following gold spotlight. Writes CSS vars directly — no re-renders. */
export function SpotlightCard({ children, className = '', onPointerMove, ...rest }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (el) {
          const r = el.getBoundingClientRect();
          el.style.setProperty('--x', `${e.clientX - r.left}px`);
          el.style.setProperty('--y', `${e.clientY - r.top}px`);
        }
        onPointerMove?.(e);
      }}
      className={`spotlight ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
