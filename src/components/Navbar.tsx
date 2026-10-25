'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from 'framer-motion';
import { Volume2, VolumeX, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { soundManager, playHapticFeedback } from '@/lib/sound';
import { useTheme } from '@/components/ThemeProvider';
import { Logo } from '@/components/brand/Logo';
import { useEscape, useScrollLock } from '@/lib/hooks';
import { easeOutExpo, springSettle, springSnappy } from '@/lib/motion';

interface NavbarProps {
  onOpenDownload: () => void;
}

const LINKS = [
  { href: '#features', id: 'features', label: 'Features' },
  { href: '#how', id: 'how', label: 'How it works' },
  { href: '#lab', id: 'lab', label: 'Try it' },
  { href: '#cards', id: 'cards', label: 'Cards' },
  { href: '#security', id: 'security', label: 'Privacy' },
  { href: '#faq', id: 'faq', label: 'FAQ' },
];

export function Navbar({ onOpenDownload }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [soundOn, setSoundOn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const lastY = useRef(0);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, 'change', (y) => {
    const delta = y - lastY.current;
    setScrolled(y > 12);
    if (Math.abs(delta) > 6) setHidden(delta > 0 && y > 480);
    lastY.current = y;
  });

  useEffect(() => setSoundOn(soundManager.isEnabled()), []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const inBand = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? inBand.add(e.target.id) : inBand.delete(e.target.id)));
        setActive(LINKS.find((l) => inBand.has(l.id))?.id ?? null);
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useScrollLock(mobileOpen);
  useEscape(mobileOpen, () => setMobileOpen(false));

  const handleToggleSound = () => {
    setSoundOn(soundManager.toggle());
    playHapticFeedback('light');
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden && !mobileOpen ? -80 : 0, opacity: 1 }}
        transition={springSettle}
        className="fixed top-0 inset-x-0 z-50"
      >
        <div
          className={`relative transition-[background-color,border-color,backdrop-filter] duration-300 border-b ${
            scrolled || mobileOpen
              ? 'bg-[#F8F7F4]/75 dark:bg-[#09090C]/70 backdrop-blur-2xl backdrop-saturate-150 border-black/[0.06] dark:border-white/[0.06]'
              : 'bg-transparent border-transparent'
          }`}
        >
          <nav
            aria-label="Primary"
            className="max-w-7xl mx-auto h-14 px-4 sm:px-6 flex items-center justify-between gap-4"
          >
            <Link
              href="/"
              aria-label="credVert. home"
              className="flex items-center active:scale-[0.97] transition-transform"
              onClick={() => setMobileOpen(false)}
            >
              <Logo markClassName="w-7 h-7" wordmarkClassName="h-[17px] w-auto" />
            </Link>

            <ul className="hidden lg:flex items-center gap-1 text-[13px] font-medium">
              {LINKS.map((l) => (
                <li key={l.id} className="relative">
                  <a
                    href={l.href}
                    onClick={() => playHapticFeedback('light')}
                    className={`relative z-10 block px-3.5 py-1.5 rounded-full transition-colors ${
                      active === l.id
                        ? 'text-neutral-950 dark:text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                    }`}
                  >
                    {l.label}
                  </a>
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-active"
                      transition={springSnappy}
                      className="absolute inset-0 rounded-full bg-black/[0.05] dark:bg-white/[0.08]"
                    />
                  )}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1.5">
              <IconButton
                label={soundOn ? 'Mute interface sounds' : 'Enable interface sounds'}
                onClick={handleToggleSound}
                className="hidden sm:flex"
              >
                {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </IconButton>
              <IconButton
                label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                onClick={() => {
                  playHapticFeedback('light');
                  toggleTheme();
                }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
                    transition={springSnappy}
                    className="flex"
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </motion.span>
                </AnimatePresence>
              </IconButton>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  playHapticFeedback('medium');
                  onOpenDownload();
                }}
                className="ml-1 h-8 px-4 rounded-full text-[13px] font-semibold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:opacity-90 transition-opacity"
              >
                Get the app
              </motion.button>

              <button
                onClick={() => {
                  playHapticFeedback('light');
                  setMobileOpen((o) => !o);
                }}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="lg:hidden relative w-9 h-9 flex items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/10"
              >
                <motion.span
                  className="absolute h-[1.5px] w-[18px] rounded-full bg-current text-neutral-900 dark:text-white"
                  animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                  transition={springSnappy}
                />
                <motion.span
                  className="absolute h-[1.5px] w-[18px] rounded-full bg-current text-neutral-900 dark:text-white"
                  animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                  transition={springSnappy}
                />
              </button>
            </div>
          </nav>

          <motion.div
            aria-hidden
            style={{ scaleX: progress }}
            className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-credvert-goldDark via-credvert-gold to-credvert-goldLight"
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="lg:hidden fixed inset-0 z-40 pt-14 bg-[#FAFAF7]/95 dark:bg-[#09090C]/95 backdrop-blur-2xl"
          >
            <motion.ul
              className="px-6 pt-8 space-y-1"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } }, hidden: {} }}
            >
              {LINKS.map((l) => (
                <motion.li
                  key={l.id}
                  variants={{
                    hidden: { opacity: 0, y: -12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } },
                  }}
                >
                  <a
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-3 text-3xl font-display font-semibold tracking-tight text-neutral-900 dark:text-white border-b border-black/[0.06] dark:border-white/[0.06] active:opacity-60"
                  >
                    {l.label}
                    <ArrowUpRight className="w-5 h-5 text-neutral-400" />
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="px-6 mt-8 flex items-center gap-3">
              <button
                onClick={handleToggleSound}
                className="flex items-center gap-2 h-10 px-4 rounded-full text-sm font-medium bg-black/5 dark:bg-white/10 text-neutral-800 dark:text-neutral-200"
              >
                {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                Sounds {soundOn ? 'on' : 'off'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function IconButton({
  children,
  label,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`w-9 h-9 items-center justify-center rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors flex ${className}`}
    >
      {children}
    </motion.button>
  );
}
