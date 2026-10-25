import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and Conditions governing the use of credVert Card Intelligence Platform.',
  alternates: {
    canonical: 'https://credvert.tech/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto pb-8 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </Link>
        <div className="flex items-center gap-2">
          <Logo markClassName="w-6 h-6" wordmarkClassName="h-4 w-auto" />
          <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 font-bold uppercase tracking-wider">
            Terms of Service
          </span>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto py-12 space-y-10 font-sans">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-white mb-2">
            Terms and Conditions of Service
          </h1>
          <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            Last Updated: October 24, 2026 • Effective Date: October 2026
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white">1. Acceptance of Terms</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            By accessing or using the website at <strong className="text-neutral-900 dark:text-white">https://credvert.tech</strong>,
            or downloading and using the credVert mobile applications, you agree to be bound by these Terms and
            Conditions and our Privacy Policy. If you do not agree, do not use the services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white">2. Nature of Services</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            credVert provides informational tools, algorithms, and calculators to assist users in understanding
            credit card reward multiplier structures, milestone thresholds, foreign exchange markups, and lounge
            benefits available in India.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white">
            3. Disclaimer of Financial & Investment Advice
          </h2>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-300 leading-relaxed flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              credVert is not an RBI-registered NBFC, commercial bank, payment system operator, or SEBI-registered
              investment advisor. All content, recommendations, rankings, and calculations provided on the platform
              are for informational and educational purposes only. Always verify fees and reward conditions directly
              with your issuing bank before applying or executing transactions.
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white">
            4. Intellectual Property & Fair Use of Trademarks
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            All bank names, card product titles, logos, and trademarks (including but not limited to HDFC Bank,
            Infinia, SBI Card, Axis Bank, Atlas, ICICI Bank, Emeralde, American Express, and IDFC FIRST Bank) are the
            exclusive property of their respective owners. Their display on credVert constitutes nominative fair use
            under applicable trademark law strictly for informational identification and comparison purposes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white">5. Governing Law & Jurisdiction</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes
            arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the
            competent courts in Ahmedabad, Gujarat, India.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white">6. Contact Information</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            For questions regarding these Terms, contact our legal counsel at{' '}
            <a href="mailto:legal@credvert.tech" className="text-credvert-goldDark dark:text-credvert-gold font-bold hover:underline">
              legal@credvert.tech
            </a>{' '}
            or write to Jay Chauhan, credVert Technologies, Ahmedabad, Gujarat, India.
          </p>
        </section>
      </article>
    </div>
  );
}
