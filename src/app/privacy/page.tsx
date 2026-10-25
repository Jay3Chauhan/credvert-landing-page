import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, ArrowLeft, Lock, Mail, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Zero-Knowledge Security — Credvert',
  description:
    'Credvert Privacy Policy: On-device processing, DPDP Act 2023 compliance, Zero-Knowledge security architecture, and your rights.',
  alternates: {
    canonical: 'https://credvert.tech/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto pb-8 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Credvert Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <Image
            src="/assets/brand/credvert-mark.svg"
            alt="Credvert Mark"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span className="text-xs font-mono text-credvert-goldDark dark:text-credvert-gold font-bold uppercase tracking-wider">
            DPDP Act 2023 Compliant
          </span>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto py-12 space-y-10 font-sans">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>DPDP ACT 2023 & GDPR PRIVACY PROTOCOL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-white mb-2">
            Privacy Policy & Zero-Knowledge Architecture
          </h1>
          <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            Effective Date: October 24, 2026 • Last Reviewed: October 2026
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white">1. Overview and Scope</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Credvert (&quot;Credvert&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operated at{' '}
            <strong className="text-neutral-900 dark:text-white">https://credvert.tech</strong> by Jay Chauhan, provides intelligent
            credit card spend optimization, rewards tracking, and financial analytics.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We are built on a <strong className="text-neutral-900 dark:text-neutral-200">Zero-Knowledge Architecture</strong>. We
            believe that your financial transactions, credit limits, and purchase history are deeply sensitive
            personal information that should never sit in a centralized marketing database.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white">
            2. Information Stored Strictly On-Device (Never Leaves Your Phone)
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            The following data is processed exclusively inside your device&apos;s local application sandbox (RAM and
            SQLite Cipher encrypted storage) and is mathematically prohibited from transmission to any Credvert
            server or third-party cloud:
          </p>
          <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-900 dark:text-white">Raw Transaction SMS Messages:</strong> Financial transaction alerts received on Android or
                pasted into iOS are parsed locally. Full message bodies are discarded immediately after regex extraction.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-900 dark:text-white">Credit Card Numbers & Identifiers:</strong> We never collect, store, or transmit 16-digit Primary
                Account Numbers (PANs), CVVs, or card PINs. Only card network types (e.g., Visa, Mastercard) and
                last-4-digit masks (e.g., •••• 9842) are kept locally.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-900 dark:text-white">One-Time Passwords (OTPs):</strong> Credvert’s regex filter strictly ignores OTPs, login codes,
                and authentication passwords. They are never read or stored under any circumstance.
              </span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white">
            3. Information Collected When You Create an Account
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            If you optionally choose to sign in to sync preferences across devices:
          </p>
          <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-credvert-gold shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-900 dark:text-white">Account Credentials:</strong> Email address and hashed authentication tokens via Supabase Auth
                (Argon2id hashing).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-credvert-gold shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-900 dark:text-white">Card Portfolio Names:</strong> The names and banks of cards in your wallet (e.g., &quot;HDFC Infinia Metal&quot;)
                to sync reward catalogs without financial balances.
              </span>
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white">
            4. Financial SMS Processing (Google Play Policy Compliance)
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            On Android, the <code className="text-xs font-mono bg-neutral-200 dark:bg-white/10 px-1.5 py-0.5 rounded">READ_SMS</code> permission
            is requested solely for detecting incoming financial transaction alerts from bank sender IDs (e.g., HDFCBK,
            SBICRD, AXISBK).
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We strictly adhere to Google Play’s Financial Services and Personal Loans Policies. SMS parsing is conducted
            entirely within an on-device isolated Dart isolate. No remote SMS scraping is performed.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white">
            5. No Sale or Brokerage of Data
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We do not sell, rent, license, or broker your personal information or spend records to third-party data brokers,
            advertisers, credit rating agencies, or financial institutions.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white">
            6. Statutory Rights & Grievance Redressal (DPDP Act 2023)
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Under India’s Digital Personal Data Protection Act 2023 and the General Data Protection Regulation (GDPR),
            you have the unconditional right to access, rectify, and permanently erase all data.
          </p>
          <div className="p-5 rounded-3xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2 text-xs shadow-sm">
            <div className="font-bold text-neutral-900 dark:text-white">DPDP Grievance Officer:</div>
            <div className="text-neutral-700 dark:text-neutral-300 font-medium">Jay Chauhan</div>
            <div className="text-neutral-500 dark:text-neutral-400">Credvert Technologies, Ahmedabad, Gujarat, India</div>
            <div className="text-credvert-goldDark dark:text-credvert-gold font-semibold">
              Email:{' '}
              <a href="mailto:grievance@credvert.tech" className="hover:underline">
                grievance@credvert.tech
              </a>
            </div>
            <div className="text-neutral-600 dark:text-neutral-400 pt-2 font-sans">
              For immediate self-service data erasure, visit our{' '}
              <Link href="/deletion" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                Online Deletion Portal
              </Link>
              .
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
