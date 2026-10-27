'use client';

import React, { useCallback, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import BankMarquee from '@/components/BankMarquee';
import Manifesto from '@/components/Manifesto';
import FeatureBento from '@/components/FeatureBento';
import FilmSection from '@/components/FilmSection';
import HowItWorks from '@/components/HowItWorks';
import Lab, { openLabTab } from '@/components/Lab';
import CardCatalog from '@/components/CardCatalog';
import Offers from '@/components/Offers';
import SecurityVault from '@/components/SecurityVault';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ComparisonDock from '@/components/ComparisonDock';
import DownloadModal from '@/components/DownloadModal';
import Toast, { ToastMessage } from '@/components/Toast';
import VelocityMarquee from '@/components/VelocityMarquee';
import UseCases from '@/components/UseCases';
import MobileCTA from '@/components/MobileCTA';
import { CREDVERT_CARDS } from '@/lib/cards-data';
import { scrollToId } from '@/lib/smooth-scroll';

const MAX_COMPARE = 3;

export default function HomePage() {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: ToastMessage['type'], title: string, message?: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev.slice(-2), { id, type, title, message }]);
    setTimeout(() => setToasts((cur) => cur.filter((t) => t.id !== id)), 3600);
  }, []);

  const cardName = (slug: string) => CREDVERT_CARDS.find((c) => c.slug === slug)?.name ?? 'Card';

  const toggleCompare = (slug: string) => {
    if (selectedCardIds.includes(slug)) {
      setSelectedCardIds((prev) => prev.filter((id) => id !== slug));
      return;
    }
    if (selectedCardIds.length >= MAX_COMPARE) {
      addToast('warning', 'Compare up to 3 cards', 'Remove one from the dock to add another.');
      return;
    }
    setSelectedCardIds((prev) => [...prev, slug]);
    addToast('success', `${cardName(slug)} added`, 'Open the dock below to compare side by side.');
  };

  const openDownload = () => setDownloadOpen(true);

  return (
    <main className="relative min-h-screen bg-[#FAFAF7] dark:bg-[#09090C] text-neutral-900 dark:text-neutral-100 flex flex-col">
      <Toast toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

      <Navbar onOpenDownload={openDownload} />
      <Hero onOpenDownload={openDownload} />
      <BankMarquee />
      <Manifesto />
      <FeatureBento />
      <VelocityMarquee />
      <FilmSection />
      <HowItWorks />
      <UseCases />
      <Lab
        onSelectCard={(slug) => {
          if (!selectedCardIds.includes(slug)) toggleCompare(slug);
          scrollToId('cards');
        }}
      />
      <CardCatalog
        selectedCardIds={selectedCardIds}
        onToggleCompare={toggleCompare}
        onSelectForAdvisor={() => openLabTab('advisor')}
      />
      <Offers onCopyCode={(code) => addToast('success', `Copied ${code}`, 'Paste it at checkout.')} />
      <SecurityVault />
      <FAQ />
      <FinalCTA onOpenDownload={openDownload} />
      <Footer />

      <ComparisonDock
        selectedCardIds={selectedCardIds}
        onRemoveCard={(slug) => setSelectedCardIds((prev) => prev.filter((id) => id !== slug))}
        onClearAll={() => setSelectedCardIds([])}
        isModalOpen={compareOpen}
        setIsModalOpen={setCompareOpen}
      />
      <MobileCTA onOpenDownload={openDownload} suppressed={downloadOpen || selectedCardIds.length > 0} />
      <DownloadModal isOpen={downloadOpen} onClose={() => setDownloadOpen(false)} />
    </main>
  );
}
