import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import {
  ShieldCheck,
  ArrowLeft,
  Lock,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  EyeOff,
  Server,
  FileText,
  UserCheck,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Zero-Knowledge Architecture',
  description:
    'Credvert Privacy Policy: Comprehensive disclosure on on-device SMS processing, zero-knowledge hardware enclave security, DPDP Act 2023, GDPR, and CCPA compliance.',
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
          <span>Back to home</span>
        </Link>
        <div className="flex items-center gap-3">
          <Logo markClassName="w-6 h-6" wordmarkClassName="h-4 w-auto" />
          <span className="hidden sm:inline-block text-xs font-mono text-credvert-goldDark dark:text-credvert-gold font-bold uppercase tracking-wider">
            DPDP Act 2023 Compliant
          </span>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto py-12 space-y-12 font-sans">
        {/* Title & Metadata Banner */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>ZERO-KNOWLEDGE ARCHITECTURE & PRIVACY POLICY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs font-mono text-neutral-500 dark:text-neutral-400 pt-2 border-t border-black/5 dark:border-white/5">
            <div>
              <span className="text-neutral-400 dark:text-neutral-500">Effective Date:</span>{' '}
              <strong className="text-neutral-700 dark:text-neutral-300">October 18, 2026</strong>
            </div>
            <div>
              <span className="text-neutral-400 dark:text-neutral-500">Last Updated:</span>{' '}
              <strong className="text-neutral-700 dark:text-neutral-300">October 18, 2026</strong>
            </div>
            <div>
              <span className="text-neutral-400 dark:text-neutral-500">Application:</span>{' '}
              <strong className="text-neutral-700 dark:text-neutral-300">Credvert</strong>
            </div>
            <div>
              <span className="text-neutral-400 dark:text-neutral-500">Package:</span>{' '}
              <code className="text-xs bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded text-neutral-800 dark:text-neutral-200">
                com.jaychauhan.credvert
              </code>
            </div>
            <div>
              <span className="text-neutral-400 dark:text-neutral-500">Developer:</span>{' '}
              <strong className="text-neutral-700 dark:text-neutral-300">Jay Chauhan</strong>
            </div>
          </div>
        </div>

        {/* 1. Introduction and Philosophy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-credvert-gold shrink-0" />
            <span>1. Introduction and Philosophy</span>
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Credvert (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) provides a privacy-first credit card intelligence, rewards
            optimization, expense tracking, and card management application. Our architectural philosophy is built
            upon <strong className="text-neutral-900 dark:text-white">Zero-Knowledge Security</strong> and{' '}
            <strong className="text-neutral-900 dark:text-white">Data Minimization</strong>:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>Hardware Enclave Isolation</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Your full card numbers (PAN), CVVs, and expiry dates never leave your physical device. They are stored
                exclusively in your device&apos;s hardware security enclave (Android Keystore / iOS Keychain &amp; Secure Enclave).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>No Data Commercialization</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We never sell, rent, monetize, or trade your personal or financial data to third-party data brokers,
                advertisers, loan aggregators, or credit bureaus.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>100% On-Device SMS Parsing</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                SMS parsing is performed 100% on-device. The raw text of your personal SMS messages, OTPs, or chats is
                never uploaded to any remote server or third-party API.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <span>Zero Biometric Exposure</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Biometric data (fingerprint or face) is processed exclusively by your device&apos;s operating system.
                Credvert never has access to, nor does it store or transmit, your biometric templates.
              </p>
            </div>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed pt-2">
            This Privacy Policy explains what information we collect, what information remains strictly on your device,
            how we process data, and your rights under global privacy laws including the{' '}
            <strong className="text-neutral-800 dark:text-neutral-200">
              Digital Personal Data Protection Act (DPDP Act, India 2023)
            </strong>
            , the{' '}
            <strong className="text-neutral-800 dark:text-neutral-200">
              General Data Protection Regulation (GDPR / UK GDPR)
            </strong>
            , and the{' '}
            <strong className="text-neutral-800 dark:text-neutral-200">
              California Consumer Privacy Act (CCPA / CPRA)
            </strong>
            .
          </p>
        </section>

        {/* 2. Information Handled by Credvert */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            2. Information Handled by Credvert
          </h2>

          {/* 2.1 Table */}
          <div className="space-y-3">
            <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>2.1 Information Stored Strictly On-Device (Never Collected by Servers)</span>
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              The following data categories are confined to device-local sandbox memory and encrypted hardware modules.
              They are never transmitted across the network:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10 bg-neutral-100/70 dark:bg-white/[0.04]">
                    <th className="py-3 px-4 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                      Data Type
                    </th>
                    <th className="py-3 px-4 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                      Storage Mechanism
                    </th>
                    <th className="py-3 px-4 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                      Description &amp; Purpose
                    </th>
                    <th className="py-3 px-4 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 text-right">
                      Transmitted to Server?
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs">
                  <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                      Card Primary Account Number (PAN)
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Hardware-backed Android Keystore / iOS Secure Enclave via{' '}
                      <code className="text-[11px] font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">
                        flutter_secure_storage
                      </code>
                      . Protected by AES-256-GCM / RSA encryption.
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Full 16-digit credit card number used for quick one-tap autofill or manual clipboard copy at checkout.
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        NO (Zero-Knowledge)
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                      Card CVV / Security Code
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Hardware-backed Android Keystore / iOS Secure Enclave. Protected by biometric authentication gate.
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      3-digit or 4-digit card verification value.
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        NO (Zero-Knowledge)
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                      Card Full Expiry Date
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Hardware-backed Android Keystore / iOS Secure Enclave.
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Expiry month and year.
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        NO (Zero-Knowledge)
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                      Biometric Credentials
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Handled entirely by Android BiometricPrompt and iOS LocalAuthentication frameworks.
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Fingerprint scans, Touch ID, Face ID, or system PINs.
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border border-neutral-500/20">
                        NO (Never Accessible)
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                      Raw SMS Text Messages
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Filtered in volatile memory for bank transaction alerts. Processed locally and discarded immediately.
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      The full body of text messages received on the device.
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        NO (Never Leaves Phone)
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                      Guest Mode Local Database
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Local SQLite database on the device.
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Card metadata, calculation inputs, and custom settings when using the app without signing in.
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        NO (Local Only)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2.2 Table */}
          <div className="space-y-3 pt-4">
            <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-credvert-gold shrink-0" />
              <span>2.2 Information Collected and Synced When You Create an Account</span>
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              If you choose to sign in to Credvert to sync your data across devices, we collect and process the following information:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10 bg-neutral-100/70 dark:bg-white/[0.04]">
                    <th className="py-3 px-4 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                      Category
                    </th>
                    <th className="py-3 px-4 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                      Specific Data Collected
                    </th>
                    <th className="py-3 px-4 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                      Purpose
                    </th>
                    <th className="py-3 px-4 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                      Lawful Basis
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs">
                  <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                      Account Credentials
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Email address, hashed password, optional display name, account creation timestamp.
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Account creation, authentication, password recovery, and security verification.
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        Performance of Contract
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                      Card Metadata (Non-Sensitive)
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Card product name (e.g., &quot;Infinia&quot;, &quot;Regalia Gold&quot;), issuing bank, user-defined card nickname, last 4 digits of the card, billing statement day, and payment due day.
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Multi-device synchronization of your active wallet, milestone reminders, and statement alerts. (Note: Last 4 digits are used solely for card identification).
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        Performance of Contract
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                      Spend &amp; Transaction Records
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Extracted transaction amount, currency code, merchant name, spend category, transaction timestamp, issuing bank, and the card&apos;s last 4 digits.
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Providing spend analytics, monthly category breakdowns, unusual spend alerts, and card fee-waiver milestone calculations.
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                        Explicit Consent / Contract
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                      Shortlisted &amp; Compared Cards
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Identifiers of credit cards you have bookmarked, shortlisted, or added to the comparison tray.
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Syncing your research progress and card preferences across your devices.
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        Performance of Contract
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                    <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                      App Settings &amp; Preferences
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Theme preference (dark/light), default currency, reminder lead times, and advisor spend defaults.
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                      Saving user experience preferences across sessions.
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border border-neutral-500/20">
                        Legitimate Interests
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2.3 Diagnostics */}
          <div className="space-y-3 pt-4">
            <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-white">
              2.3 Diagnostic, Performance, and Device Information
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              To ensure application stability, prevent crashes, and deliver timely reminders, we collect minimal technical diagnostics:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-credvert-gold shrink-0 mt-2" />
                <span>
                  <strong className="text-neutral-900 dark:text-white">Crash Reports (Firebase Crashlytics):</strong> Stack traces, device model, operating system version, and application build number when an unexpected error occurs. Crash reports are anonymized and <strong className="text-neutral-900 dark:text-white">never include card numbers, CVVs, or personal financial details</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-credvert-gold shrink-0 mt-2" />
                <span>
                  <strong className="text-neutral-900 dark:text-white">Performance Traces (Firebase Performance Monitoring):</strong> Anonymized network response durations and app launch latency to monitor server availability and optimize app speed.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-credvert-gold shrink-0 mt-2" />
                <span>
                  <strong className="text-neutral-900 dark:text-white">Usage Metrics (Firebase Analytics):</strong> Screen view counts, button tap events, and aggregated feature usage. You can disable analytics data collection at any time under <strong className="text-neutral-900 dark:text-white">Account → Settings → Diagnostics &amp; Analytics</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-credvert-gold shrink-0 mt-2" />
                <span>
                  <strong className="text-neutral-900 dark:text-white">Push Notification Tokens (Firebase Cloud Messaging):</strong> A pseudonymous device registration token used solely to dispatch scheduled bill payment reminders and critical security alerts.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* 3. Financial SMS Processing */}
        <section className="space-y-5">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            3. Financial SMS Processing (Google Play SMS Policy Disclosure)
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Credvert includes an optional on-device financial tracking module designed to help users track credit card
            expenses, verify bill statement totals, monitor fee-waiver milestones, and detect unusual charges.
          </p>

          <div className="p-6 rounded-3xl bg-neutral-900 text-white dark:bg-white/[0.03] dark:text-neutral-200 border border-neutral-800 dark:border-white/10 space-y-4">
            <h3 className="text-base font-display font-bold text-credvert-gold flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-credvert-gold" />
              <span>3.1 Strict Compliance with Google Play SMS Policy</span>
            </h3>
            <p className="text-xs text-neutral-300 dark:text-neutral-400 leading-relaxed">
              Credvert requests Android <code className="text-xs font-mono bg-white/10 px-1 py-0.5 rounded text-white">READ_SMS</code> and{' '}
              <code className="text-xs font-mono bg-white/10 px-1 py-0.5 rounded text-white">RECEIVE_SMS</code> permissions under the{' '}
              <strong className="text-white">Financial Services / SMS-based Money Management</strong> exception. We adhere to the following strict operating principles:
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-300 dark:text-neutral-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Prominent In-App Disclosure:</strong> Before requesting any runtime SMS permission from the operating system, Credvert displays a dedicated full-screen disclosure explaining exactly what is read, what stays on the device, and how the data is used.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Affirmative User Consent:</strong> SMS tracking is strictly opt-in. The runtime permission request is only triggered after the user taps &quot;I Agree, Allow SMS Access&quot;. Users can decline or skip this feature without losing access to card comparisons, rewards calculators, or the manual wallet.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Read-Only Operation:</strong> Credvert never requests <code className="text-[11px] font-mono bg-white/10 px-1 rounded">SEND_SMS</code>, <code className="text-[11px] font-mono bg-white/10 px-1 rounded">WRITE_SMS</code>, or phone call permissions. Credvert cannot and will never send SMS messages from your device.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Bank Sender Whitelisting:</strong> Our native bridge inspects SMS headers and strictly processes only messages originating from verified, pre-registered financial institution sender IDs (e.g., <code className="text-[11px] font-mono bg-white/10 px-1 rounded">HDFCBK</code>, <code className="text-[11px] font-mono bg-white/10 px-1 rounded">ICICIT</code>, <code className="text-[11px] font-mono bg-white/10 px-1 rounded">SBICRD</code>, <code className="text-[11px] font-mono bg-white/10 px-1 rounded">AXISBK</code>, <code className="text-[11px] font-mono bg-white/10 px-1 rounded">AMEXIN</code>, <code className="text-[11px] font-mono bg-white/10 px-1 rounded">KOTAKB</code>, etc.).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Zero Access to Personal Chats &amp; OTPs:</strong> Non-banking messages, personal conversations, verification codes, and one-time passwords (OTPs) are ignored at the system level and are never read, parsed, or stored.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">100% On-Device Parsing:</strong> All regex pattern matching and transaction extraction occurs entirely in device memory. The raw text of the SMS message is discarded immediately after parsing and <strong className="text-white">never leaves the physical device</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Complete Revocation &amp; Data Erasure:</strong> Users can pause tracking, toggle sync, or permanently erase all parsed transaction records at any time from <strong className="text-white">Spend Insights → Tracking &amp; Privacy → Delete all spend data</strong>.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* 4. How We Use Your Information */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            4. How We Use Your Information
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We use the collected information exclusively for the following operational purposes:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-credvert-gold shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-900 dark:text-white">Card Rewards &amp; Lounge Recommendation:</strong> Calculating estimated reward point yields, cashback percentages, and lounge access availability across different spending categories.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-credvert-gold shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-900 dark:text-white">Spend Insights &amp; Budgeting:</strong> Aggregating monthly spending trends, merchant distributions, recurring subscription detection, and card milestone progress.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-credvert-gold shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-900 dark:text-white">Bill Due Reminders:</strong> Sending timely local or push notifications prior to credit card payment due dates and statement generation dates.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-credvert-gold shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-900 dark:text-white">Security &amp; Account Integrity:</strong> Authenticating user sessions, enforcing rate limits, blocking fraudulent abuse, and safeguarding account access.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-credvert-gold shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-900 dark:text-white">Service Maintenance:</strong> Debugging software issues, optimizing network latency, and maintaining high platform reliability.
              </span>
            </li>
          </ul>

          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-900 dark:text-rose-200 space-y-2">
            <strong className="block text-sm font-bold text-rose-700 dark:text-rose-300">
              We do NOT use your information for:
            </strong>
            <ul className="list-disc list-inside space-y-1 text-rose-800 dark:text-rose-300">
              <li>Serving targeted or behavioural third-party advertisements.</li>
              <li>Credit scoring, profiling for loan underwriting, or sharing with financial lenders.</li>
              <li>Sale or brokerage to any external commercial entity.</li>
            </ul>
          </div>
        </section>

        {/* 5. Sharing and Disclosure */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            5. Sharing and Disclosure of Information
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We do not sell, rent, trade, or share your personal information with third parties for their direct marketing purposes. Information is only shared under the following limited circumstances:
          </p>
          <div className="space-y-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
            <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/10 space-y-2">
              <strong className="text-neutral-900 dark:text-white block font-bold">
                1. Authorized Service Providers (Sub-Processors)
              </strong>
              <ul className="space-y-1.5 pl-2">
                <li>
                  • <strong className="text-neutral-800 dark:text-neutral-200">Google Cloud / Firebase (USA / Global):</strong> Firebase Authentication, Cloud Messaging (FCM), Crashlytics, and Performance Monitoring.
                </li>
                <li>
                  • <strong className="text-neutral-800 dark:text-neutral-200">Database &amp; Backend Infrastructure (Neon / Supabase / AWS):</strong> Fully encrypted cloud databases and API hosting operating under strict Data Processing Agreements (DPAs) with TLS 1.3 in-transit encryption and AES-256 rest encryption.
                </li>
              </ul>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/10 space-y-1.5">
              <strong className="text-neutral-900 dark:text-white block font-bold">
                2. Legal and Regulatory Compliance
              </strong>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We may disclose information if required to do so by applicable law, court order, regulatory authority, or lawful subpoena, provided such disclosure is strictly necessary and legally enforceable.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/10 space-y-1.5">
              <strong className="text-neutral-900 dark:text-white block font-bold">
                3. Business Transfers
              </strong>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                If Credvert is involved in a merger, acquisition, reorganization, or sale of assets, your account data may be transferred as part of that transaction, subject to the acquiring party agreeing to honor this Privacy Policy.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Security Architecture */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <Lock className="w-6 h-6 text-emerald-500 shrink-0" />
            <span>6. Security Architecture &amp; Zero-Knowledge Vault</span>
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Credvert applies multi-layered enterprise-grade security protocols:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">End-to-End Encryption in Transit</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                All client-server communication is enforced over HTTPS utilizing Transport Layer Security (TLS 1.3) with Certificate Pinning safeguards.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Hardware Enclave Encryption at Rest</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Card PAN, CVVs, and expiry dates are encrypted using AES-256-GCM cryptographic keys generated and stored inside the Android KeyStore or iOS Secure Enclave.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Mandatory Biometric Gate</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Decrypting, viewing, or copying sensitive card data requires biometric verification (fingerprint or facial recognition).
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Clipboard Auto-Clearing</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                When a card number is copied to the clipboard for checkout convenience, Credvert flags the clipboard payload as sensitive content and wipes the clipboard after 30 seconds.
              </p>
            </div>
            <div className="sm:col-span-2 p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Screenshot &amp; App-Switcher Protection</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Credvert enables <code className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">FLAG_SECURE</code> on Android and applies a privacy blur cover on iOS when the application transitions into the background or multi-tasking app switcher.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Data Retention and Erasure */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            7. Data Retention and Erasure
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-900 dark:text-white">Account Data:</strong> Synced account information and card metadata are retained as long as your account remains active.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-900 dark:text-white">Spend &amp; Transaction History:</strong> Maintained to generate historical monthly trends. You may delete individual transactions or purge your entire spend history at any time.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-900 dark:text-white">Guest Mode Data:</strong> Stored exclusively in local application storage. Uninstalling the app or tapping <strong className="text-neutral-900 dark:text-white">Account → Reset this device</strong> immediately destroys all local data.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-900 dark:text-white">Account Deletion:</strong> When you request account deletion (via in-app <strong className="text-neutral-900 dark:text-white">Account → Delete Account</strong> or via our web portal at{' '}
                <Link href="/deletion" className="text-credvert-goldDark dark:text-credvert-gold hover:underline font-semibold">
                  https://credvert.tech/deletion
                </Link>
                ), your user record, synced cards, transaction history, and push tokens are permanently purged from live databases within 24 hours. Archived database backups are overwritten and expunged within 30 to 90 days in accordance with automated backup rotation cycles.
              </span>
            </li>
          </ul>
        </section>

        {/* 8. Your Legal Rights */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            8. Your Legal Rights
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Depending on your geographical jurisdiction, you possess specific statutory rights regarding your personal data:
          </p>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/10 space-y-3">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>8.1 Rights Under the India DPDP Act, 2023</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Right to Access Information:</strong> Request a summary of personal data processed by Credvert.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Right to Correction and Erasure:</strong> Correct inaccurate personal data or request complete erasure of your account.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Right to Grievance Redressal:</strong> Lodge inquiries or complaints with our designated Grievance Officer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Right to Nominate:</strong> Nominate an individual to exercise your rights in the event of death or incapacity.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/10 space-y-3">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>8.2 Rights Under GDPR / UK GDPR</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span><strong>Right to Access, Rectification &amp; Erasure:</strong> Full Right to be Forgotten.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span><strong>Right to Restriction &amp; Portability:</strong> Transfer data in machine-readable format.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span><strong>Right to Object:</strong> Object to processing or withdraw consent at any time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span><strong>Right to Lodge a Complaint:</strong> File with your local European Data Protection Authority (DPA).</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/10 space-y-3">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>8.3 Rights Under California Law (CCPA / CPRA)</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span><strong>Right to Know &amp; Access:</strong> Categories and specific pieces of personal info collected.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span><strong>Right to Delete:</strong> Unconditional right to request permanent deletion.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span><strong>Right to Non-Discrimination:</strong> Equal service regardless of privacy choices.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span><strong>Notice of No Sale:</strong> Credvert does not &quot;sell&quot; or &quot;share&quot; personal information.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 9. Protection of Children */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            9. Protection of Children
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Credvert is intended solely for adult consumers who are eligible to hold credit cards. We do not knowingly
            market to, solicit, or collect personal information from individuals under the age of 18 (or the age of
            majority in your jurisdiction). If we discover that an account has been created by a minor, we will promptly
            delete all associated information.
          </p>
        </section>

        {/* 10. Changes to This Privacy Policy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            10. Changes to This Privacy Policy
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We may update this Privacy Policy periodically to reflect enhancements to our features, changes in legal
            requirements, or adjustments to our operational practices. When material updates are made, we will notify
            you through an in-app notice, push notification, or email update prior to the changes taking effect. The date
            of the most recent revision will always be displayed at the top of this document.
          </p>
        </section>

        {/* 11. Contact Information & Grievance Officer */}
        <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/10 shadow-sm">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-credvert-gold shrink-0" />
            <span>11. Contact Information &amp; Grievance Redressal</span>
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            If you have questions, feedback, or wish to exercise any statutory rights regarding your personal data,
            you can reach our designated Data Protection &amp; Grievance Officer:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] space-y-1 border border-black/5 dark:border-white/5">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono">Grievance &amp; Privacy Officer</span>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">Jay Chauhan</p>
              <p className="text-neutral-600 dark:text-neutral-400">Ahmedabad, Gujarat, India</p>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] space-y-1.5 border border-black/5 dark:border-white/5 font-mono">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-credvert-gold" />
                <span className="text-neutral-500">Privacy:</span>
                <a href="mailto:privacy@credvert.tech" className="text-credvert-goldDark dark:text-credvert-gold hover:underline">
                  privacy@credvert.tech
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-credvert-gold" />
                <span className="text-neutral-500">Grievance:</span>
                <a href="mailto:grievance@credvert.tech" className="text-credvert-goldDark dark:text-credvert-gold hover:underline">
                  grievance@credvert.tech
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-neutral-500">Support:</span>
                <a href="mailto:support@credvert.tech" className="text-neutral-700 dark:text-neutral-300 hover:underline">
                  support@credvert.tech
                </a>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
