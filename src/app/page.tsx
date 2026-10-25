'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Advisor } from '@/components/Advisor';
import { AICopilot } from '@/components/AICopilot';
import SMSIntelligence from '@/components/SMSIntelligence';
import ROICalculator from '@/components/ROICalculator';
import CardCatalog from '@/components/CardCatalog';
import Offers from '@/components/Offers';
import SecurityVault from '@/components/SecurityVault';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ComparisonDock from '@/components/ComparisonDock';
import DownloadModal from '@/components/DownloadModal';
import Toast, { ToastMessage } from '@/components/Toast';
import { playHapticFeedback } from '@/lib/sound';
import { AppleWordReveal } from '@/components/ui/AppleText';

export default function HomePage() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>(['hdfc-infinia-metal', 'axis-atlas']);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'warning', title: string, message?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    const newToast: ToastMessage = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleToggleCompare = (cardId: string) => {
    if (selectedCardIds.includes(cardId)) {
      setSelectedCardIds((prev) => prev.filter((id) => id !== cardId));
      addToast('info', 'Card Removed', 'Removed card from comparison dock.');
    } else {
      if (selectedCardIds.length >= 3) {
        addToast('warning', 'Comparison Limit Reached', 'You can compare up to 3 cards simultaneously.');
        return;
      }
      setSelectedCardIds((prev) => [...prev, cardId]);
      addToast('success', 'Card Added to Comparison', 'Added card to floating comparison dock.');
    }
  };

  const handleRemoveCompare = (cardId: string) => {
    setSelectedCardIds((prev) => prev.filter((id) => id !== cardId));
  };

  const handleClearCompare = () => {
    setSelectedCardIds([]);
    addToast('info', 'Comparison Cleared', 'Removed all cards from comparison.');
  };

  return (
    <main className="relative min-h-screen bg-[#F8F7F4] dark:bg-[#07090D] text-neutral-900 dark:text-neutral-100 flex flex-col selection:bg-credvert-gold/30 selection:text-neutral-900 dark:selection:text-white transition-colors duration-300">
      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

      {/* Frosted Navigation Header */}
      <Navbar onOpenDownload={() => setDownloadModalOpen(true)} />

      {/* Hero Section with Interactive 3D Perspective Card */}
      <Hero
        onOpenDownload={() => setDownloadModalOpen(true)}
        onCopyNotice={(msg) => addToast('success', 'Copied to Clipboard', msg)}
      />

      {/* Real-Time Smart Advisor Optimizer */}
      <Advisor />

      {/* Claude 3.5 Sonnet Tool-Calling Copilot Simulation */}
      <AICopilot />

      {/* On-Device DPDP Act 2023 SMS Spend Intelligence Sandbox */}
      <SMSIntelligence />

      {/* Interactive Annual Milestone & ROI Calculator */}
      <ROICalculator
        onSelectCard={(cardId) => {
          if (!selectedCardIds.includes(cardId)) {
            handleToggleCompare(cardId);
          }
          const el = document.getElementById('cards');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Filterable Card Catalog */}
      <CardCatalog
        selectedCardIds={selectedCardIds}
        onToggleCompare={handleToggleCompare}
        onSelectForAdvisor={(cardId) => {
          const el = document.getElementById('advisor');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Curated Exclusive Perks & Verified Coupons */}
      <Offers
        onCopyCode={(code) =>
          addToast('success', `Copied Code: ${code}`, 'Discount code ready to paste at checkout.')
        }
      />

      {/* Zero-Knowledge Hardware Enclave Security */}
      <SecurityVault />

      {/* FAQ Accordion */}
      <FAQ />

      {/* Pre-Footer Final Download Banner */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl overflow-hidden border border-black/10 dark:border-credvert-gold/30 bg-white dark:bg-gradient-to-b dark:from-neutral-900/90 dark:to-neutral-950/95 p-8 sm:p-14 text-center shadow-xl dark:shadow-2xl backdrop-blur-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-credvert-gold/15 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4">
            <AppleWordReveal text="The Right Card." />{' '}
            <span className="bg-gradient-to-r from-credvert-gold via-amber-500 to-amber-600 dark:from-credvert-gold dark:via-credvert-goldLight dark:to-amber-200 bg-clip-text text-transparent">
              Every Checkout.
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mb-8 font-sans">
            Join 45,000+ smart Indian cardholders maximizing every rupee with Credvert’s on-device
            intelligence engine.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                playHapticFeedback('medium');
                setDownloadModalOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-credvert-gold to-credvert-goldLight text-neutral-950 font-bold text-sm hover:brightness-110 shadow-xl shadow-credvert-gold/25 transition-all"
            >
              Get Started Free
            </button>
            <a
              href="https://github.com/Jay3Chauhan/CreditVance"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.04] border border-black/10 dark:border-white/10 dark:hover:bg-white/[0.08] text-neutral-900 dark:text-white font-semibold text-sm transition-all shadow-sm"
            >
              Explore Open Source Repo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating Comparison Dock & Modal */}
      <ComparisonDock
        selectedCardIds={selectedCardIds}
        onRemoveCard={handleRemoveCompare}
        onClearAll={handleClearCompare}
        isModalOpen={comparisonModalOpen}
        setIsModalOpen={setComparisonModalOpen}
      />

      {/* Download Sheet Modal */}
      <DownloadModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </main>
  );
}
