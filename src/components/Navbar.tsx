'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Volume2, VolumeX, Sun, Moon, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { soundManager, playHapticFeedback } from '@/lib/sound';
import { useTheme } from '@/components/ThemeProvider';

interface NavbarProps {
  onOpenDownload: () => void;
}

export function Navbar({ onOpenDownload }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [soundOn, setSoundOn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSoundOn(soundManager.isEnabled());

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = soundManager.toggle();
    setSoundOn(newState);
    playHapticFeedback('light');
  };

  const handleToggleTheme = () => {
    playHapticFeedback('light');
    toggleTheme();
  };

  return (
    <>
      {/* Top Protocol Announcement Bar */}
      <div className="bg-[#EFECE6] dark:bg-[#0F1117] border-b border-black/[0.06] dark:border-white/[0.06] py-2 px-4 text-center text-xs text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
        <span className="inline-block bg-credvert-gold/15 text-credvert-goldDark dark:text-credvert-goldLight border border-credvert-gold/30 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold mr-2 uppercase tracking-wider">
          Credvert 2.1
        </span>
        <span className="font-sans">
          Zero-Knowledge On-Device SMS Intelligence · DPDP Act 2023 Compliant · Apple Fluid UI
        </span>
        <a
          href="#sms-intelligence"
          className="text-credvert-goldDark dark:text-credvert-gold hover:underline ml-2 font-medium inline-flex items-center gap-1 transition-colors"
        >
          <span>Explore Architecture</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* Sticky Frosted Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F8F7F4]/90 dark:bg-[#07090D]/85 backdrop-blur-2xl border-b border-black/10 dark:border-white/10 shadow-lg dark:shadow-2xl py-3'
            : 'bg-[#F8F7F4]/60 dark:bg-[#07090D]/60 backdrop-blur-md border-b border-black/5 dark:border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md group-hover:scale-105 active:scale-95 transition-transform bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 p-1.5 flex items-center justify-center">
              <Image
                src="/assets/brand/credvert-mark.svg"
                alt="credVert Mark"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <Image
                src={theme === 'light' ? '/assets/brand/credvert-dark.svg' : '/assets/brand/credvert-gold.svg'}
                alt="credVert."
                width={112}
                height={24}
                className="h-5 w-auto object-contain transition-opacity"
                priority
              />
              <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-neutral-500 dark:text-credvert-goldLight/80 uppercase">
                Card Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
            <a href="#advisor" className="hover:text-credvert-goldDark dark:hover:text-credvert-gold transition-colors">
              Advisor
            </a>
            <a href="#ai-copilot" className="hover:text-credvert-goldDark dark:hover:text-credvert-gold transition-colors">
              AI Copilot
            </a>
            <a href="#sms-intelligence" className="hover:text-credvert-goldDark dark:hover:text-credvert-gold transition-colors">
              SMS Vault
            </a>
            <a href="#calculator" className="hover:text-credvert-goldDark dark:hover:text-credvert-gold transition-colors">
              ROI Calculator
            </a>
            <a href="#cards" className="hover:text-credvert-goldDark dark:hover:text-credvert-gold transition-colors">
              Catalog
            </a>
            <a href="#offers" className="hover:text-credvert-goldDark dark:hover:text-credvert-gold transition-colors">
              Perks
            </a>
            <a href="#security" className="hover:text-credvert-goldDark dark:hover:text-credvert-gold transition-colors">
              Security
            </a>
            <a href="#faq" className="hover:text-credvert-goldDark dark:hover:text-credvert-gold transition-colors">
              FAQ
            </a>
          </nav>

          {/* Controls & CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              aria-label="Toggle Sound Effects"
              className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white border border-black/5 dark:border-white/10 transition-colors"
              title={soundOn ? 'Sound feedback active' : 'Sound feedback muted'}
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-neutral-400" />
              )}
            </button>

            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={handleToggleTheme}
              aria-label="Toggle Color Theme"
              className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white border border-black/5 dark:border-white/10 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700" />
              )}
            </button>

            {/* Try Demo Button */}
            <a
              href="#advisor"
              onClick={() => playHapticFeedback('light')}
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/10 transition-colors"
            >
              Try Simulator
            </a>

            {/* Get App Button */}
            <button
              onClick={() => {
                playHapticFeedback('medium');
                onOpenDownload();
              }}
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-credvert-gold to-credvert-goldLight text-neutral-950 shadow-md hover:brightness-110 active:scale-95 transition-all"
            >
              Get App
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                playHapticFeedback('light');
                setMobileOpen(!mobileOpen);
              }}
              className="lg:hidden p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white border border-black/5 dark:border-white/10 transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#F8F7F4] dark:bg-[#07090D] border-b border-black/10 dark:border-white/10 px-6 py-6 flex flex-col gap-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300 animate-fadeIn">
            <a
              href="#advisor"
              onClick={() => setMobileOpen(false)}
              className="hover:text-credvert-goldDark dark:hover:text-credvert-gold py-1"
            >
              Smart Advisor
            </a>
            <a
              href="#ai-copilot"
              onClick={() => setMobileOpen(false)}
              className="hover:text-credvert-goldDark dark:hover:text-credvert-gold py-1"
            >
              Claude AI Copilot
            </a>
            <a
              href="#sms-intelligence"
              onClick={() => setMobileOpen(false)}
              className="hover:text-credvert-goldDark dark:hover:text-credvert-gold py-1"
            >
              SMS Intelligence Sandbox
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileOpen(false)}
              className="hover:text-credvert-goldDark dark:hover:text-credvert-gold py-1"
            >
              ROI Calculator
            </a>
            <a
              href="#cards"
              onClick={() => setMobileOpen(false)}
              className="hover:text-credvert-goldDark dark:hover:text-credvert-gold py-1"
            >
              Card Catalog
            </a>
            <a
              href="#offers"
              onClick={() => setMobileOpen(false)}
              className="hover:text-credvert-goldDark dark:hover:text-credvert-gold py-1"
            >
              Exclusive Offers
            </a>
            <a
              href="#security"
              onClick={() => setMobileOpen(false)}
              className="hover:text-credvert-goldDark dark:hover:text-credvert-gold py-1"
            >
              Security Vault
            </a>
            <a
              href="#faq"
              onClick={() => setMobileOpen(false)}
              className="hover:text-credvert-goldDark dark:hover:text-credvert-gold py-1"
            >
              FAQ
            </a>
          </div>
        )}
      </header>
    </>
  );
}
