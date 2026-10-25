'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Volume2, VolumeX, Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
import { soundManager } from '@/lib/sound';

interface NavbarProps {
  onOpenDownload: () => void;
}

export function Navbar({ onOpenDownload }: NavbarProps) {
  const [soundOn, setSoundOn] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSoundOn(soundManager.isEnabled());
    const savedTheme = localStorage.getItem('credvert_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = soundManager.toggle();
    setSoundOn(newState);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('credvert_theme', nextTheme);
    soundManager.playClick();
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#111217] border-b border-white/5 py-2 px-4 text-center text-xs text-zinc-400">
        <span className="inline-block bg-gold-deep/20 text-gold-light border border-gold/30 rounded-full px-2 py-0.5 text-[10px] font-bold mr-2 uppercase tracking-wider">
          Credvert 2.0
        </span>
        <span>Zero-Knowledge SMS Intelligence · DPDP Act 2023 Compliant · India’s Smartest Card Advisor</span>
        <a href="#sms-intelligence" className="text-gold-light ml-2 font-medium hover:underline inline-flex items-center gap-1">
          Explore <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#09090C]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
            : 'bg-[#09090C]/60 backdrop-blur-md border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-gold group-hover:scale-105 transition-transform">
              <Image
                src="/assets/brand/credvert-mark.svg"
                alt="credVert Mark"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <Image
                src="/assets/brand/credvert-gold.svg"
                alt="credVert."
                width={120}
                height={26}
                className={`h-6 w-auto object-contain transition-all ${
                  theme === 'light' ? 'brightness-0 contrast-200' : ''
                }`}
                priority
              />
              <span className="text-[9px] font-bold tracking-[0.2em] text-gold-light/80 uppercase">
                Card Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
            <a href="#advisor" className="hover:text-gold-light transition-colors">Smart Advisor</a>
            <a href="#ai-copilot" className="hover:text-gold-light transition-colors">AI Copilot</a>
            <a href="#sms-intelligence" className="hover:text-gold-light transition-colors">SMS Intelligence</a>
            <a href="#calculator" className="hover:text-gold-light transition-colors">ROI Calculator</a>
            <a href="#catalog" className="hover:text-gold-light transition-colors">Card Catalog</a>
            <a href="#security" className="hover:text-gold-light transition-colors">Security</a>
            <a href="#faq" className="hover:text-gold-light transition-colors">FAQ</a>
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-3">
            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              aria-label="Toggle Sound"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors border border-white/5"
              title={soundOn ? 'Sound feedback active' : 'Sound feedback muted'}
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors border border-white/5"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-gold-light" /> : <Moon className="w-4 h-4 text-zinc-400" />}
            </button>

            {/* Try Demo Button */}
            <a
              href="#advisor"
              onClick={() => soundManager.playClick()}
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 transition-colors"
            >
              Try Demo
            </a>

            {/* Get App Button */}
            <button
              onClick={() => {
                soundManager.playChime();
                onOpenDownload();
              }}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-gold-light via-gold to-gold-deep text-obsidian shadow-gold hover:opacity-95 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get App
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 text-zinc-300 hover:text-white"
              aria-label="Toggle Mobile Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0D0E13] border-b border-white/10 px-6 py-5 flex flex-col gap-4 text-sm font-medium text-zinc-300 animate-fadeIn">
            <a href="#advisor" onClick={() => setMobileOpen(false)} className="hover:text-gold-light">Smart Advisor</a>
            <a href="#ai-copilot" onClick={() => setMobileOpen(false)} className="hover:text-gold-light">AI Copilot</a>
            <a href="#sms-intelligence" onClick={() => setMobileOpen(false)} className="hover:text-gold-light">SMS Intelligence</a>
            <a href="#calculator" onClick={() => setMobileOpen(false)} className="hover:text-gold-light">ROI Calculator</a>
            <a href="#catalog" onClick={() => setMobileOpen(false)} className="hover:text-gold-light">Card Catalog</a>
            <a href="#security" onClick={() => setMobileOpen(false)} className="hover:text-gold-light">Security</a>
            <a href="#faq" onClick={() => setMobileOpen(false)} className="hover:text-gold-light">FAQ</a>
          </div>
        )}
      </header>
    </>
  );
}
