'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { LineReveal } from '@/components/ui/AppleText';

const CAPTIONS = ['Set the amount', 'Pick where you’re paying', 'Tap the card it recommends'];

export default function FilmSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(frameRef, { amount: 0.35 });
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end end'] });
  const scale = useTransform(scrollYProgress, [0.15, 0.6], reduce ? [1, 1] : [0.74, 1]);
  const radius = useTransform(scrollYProgress, [0.15, 0.6], [44, 28]);
  const headingOpacity = useTransform(scrollYProgress, [0.35, 0.55], [1, 0]);
  const headingY = useTransform(scrollYProgress, [0.35, 0.6], reduce ? [0, 0] : [0, -40]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && !userPaused && !reduce) {
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [inView, userPaused, reduce]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      video.play().catch(() => {});
    } else {
      setUserPaused(true);
      video.pause();
    }
  };

  return (
    <section id="film" ref={sectionRef} aria-label="credVert. in motion" className="relative h-[190vh]">
      <div className="sticky top-0 h-[100svh] flex flex-col items-center justify-center px-4 overflow-hidden">
        <motion.div style={{ opacity: headingOpacity, y: headingY }} className="text-center mb-8 sm:mb-10">
          <span className="eyebrow text-credvert-goldDark dark:text-credvert-gold">The film</span>
          <h2 className="mt-3 display-md text-neutral-900 dark:text-white">
            <LineReveal lines={['Three taps. One right answer.']} />
          </h2>
        </motion.div>

        <motion.div
          ref={frameRef}
          style={{ scale, borderRadius: radius }}
          className="relative w-full max-w-[1200px] aspect-[16/9] max-h-[74svh] overflow-hidden bg-[#F7F7F7] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.55)] ring-1 ring-black/5 dark:ring-white/10 will-change-transform"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            poster="/assets/mockups/app-mockup-poster.jpg"
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Screen recording of the credVert. home screen: choosing ₹2,000, selecting Dining, and getting the best card."
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source src="/assets/mockups/app-mockup-1080.mp4" type="video/mp4" media="(min-width: 768px)" />
            <source src="/assets/mockups/app-mockup-720.mp4" type="video/mp4" />
          </video>

          <div className="absolute left-8 bottom-8 hidden sm:flex flex-col items-start gap-2">
            {CAPTIONS.map((c, i) => (
              <Caption key={c} index={i} progress={scrollYProgress}>
                {c}
              </Caption>
            ))}
          </div>

          <button
            type="button"
            onClick={togglePlayback}
            aria-label={playing ? 'Pause video' : 'Play video'}
            className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 w-11 h-11 rounded-full bg-neutral-950/80 text-white backdrop-blur-md flex items-center justify-center active:scale-95 transition-transform"
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-[1px]" />}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function Caption({ children, index, progress }: { children: React.ReactNode; index: number; progress: MotionValue<number> }) {
  const start = 0.55 + index * 0.1;
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1]);
  const x = useTransform(progress, [start, start + 0.08], [-16, 0]);

  return (
    <motion.span
      style={{ opacity, x }}
      className="inline-flex items-center gap-2 rounded-full pl-1.5 pr-3.5 py-1.5 bg-neutral-950/80 backdrop-blur-md text-white text-xs sm:text-sm font-medium"
    >
      <span className="w-5 h-5 rounded-full bg-credvert-gold text-neutral-950 text-[11px] font-bold flex items-center justify-center">
        {index + 1}
      </span>
      {children}
    </motion.span>
  );
}
