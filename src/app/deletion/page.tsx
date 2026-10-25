'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import {
  ArrowLeft,
  Trash2,
  CheckCircle2,
  Send,
  ShieldCheck,
  AlertOctagon,
  Clock,
  Mail,
  Smartphone,
  Globe,
  Database,
  FileCheck,
} from 'lucide-react';
import { playHapticFeedback } from '@/lib/sound';

export default function DeletionPage() {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('No longer using the app');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    playHapticFeedback('success');
    const ref = 'DEL-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString().slice(-4);
    setTicketId(ref);
    setSubmitted(true);
  };

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
          <span className="hidden sm:inline-block text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
            DPDP §12 Right to Erasure
          </span>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto py-12 space-y-12 font-sans">
        {/* Title & Metadata Banner */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-bold">
            <Trash2 className="w-3.5 h-3.5" />
            <span>UNCONDITIONAL DATA ERASURE POLICY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Account and Data Deletion Policy
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

        {/* 1. Overview and Commitment */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-500 shrink-0" />
            <span>1. Overview and Commitment</span>
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Credvert respects your right to privacy and full control over your personal data. In strict compliance with{' '}
            <strong className="text-neutral-900 dark:text-white">Google Play Store Data Safety Policies</strong>,{' '}
            <strong className="text-neutral-900 dark:text-white">Apple App Store Review Guidelines (Guideline 5.1.1)</strong>, the{' '}
            <strong className="text-neutral-900 dark:text-white">India Digital Personal Data Protection Act (DPDP Act, 2023)</strong>, and
            the <strong className="text-neutral-900 dark:text-white">General Data Protection Regulation (GDPR Article 17)</strong>,
            Credvert provides straightforward, transparent, and permanent data deletion mechanisms.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            You can delete your account and all associated data at any time:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-1">
              <span className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-cyan-500" />
                1. Inside App
              </span>
              <p className="text-neutral-500 dark:text-neutral-400">One-tap instant deletion from your Account screen.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-1">
              <span className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-cyan-500" />
                2. Web Portal
              </span>
              <p className="text-neutral-500 dark:text-neutral-400">Online form without needing to reinstall the app.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-1">
              <span className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-cyan-500" />
                3. Direct Email
              </span>
              <p className="text-neutral-500 dark:text-neutral-400">Email privacy officer; processed within 48 hours.</p>
            </div>
          </div>
        </section>

        {/* 2. How to Delete Your Account and Data */}
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            2. How to Delete Your Account and Data
          </h2>

          {/* Method 1: In-App */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-base font-bold text-neutral-900 dark:text-white">
              <span className="w-6 h-6 rounded-full bg-credvert-gold/20 text-credvert-goldDark dark:text-credvert-gold flex items-center justify-center text-xs font-mono font-bold">
                1
              </span>
              <span>Method 1: In-App Instant Deletion (Recommended)</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              If you have the Credvert app installed on your device:
            </p>
            <ol className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 list-decimal list-inside">
              <li>Open the <strong className="text-neutral-900 dark:text-white">Credvert</strong> application.</li>
              <li>Navigate to the <strong className="text-neutral-900 dark:text-white">Account</strong> tab (profile icon in the bottom navigation bar).</li>
              <li>Scroll down to the <strong className="text-neutral-900 dark:text-white">Account management</strong> section.</li>
              <li>Tap <strong className="text-rose-500 font-semibold">Delete account</strong> (highlighted in red).</li>
              <li>Read the confirmation dialog summarizing the permanent deletion process.</li>
              <li>Tap <strong className="text-rose-500 font-semibold">Delete permanently</strong> to confirm.</li>
              <li>Your session is terminated immediately, your cloud account and all synced records are queued for immediate permanent erasure, and the local app cache is purged.</li>
            </ol>
          </div>

          {/* Method 2: Web Deletion Request Portal */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900/60 border border-black/10 dark:border-white/10 backdrop-blur-xl space-y-6 shadow-md dark:shadow-xl">
            <div className="flex items-center gap-2 text-base font-bold text-neutral-900 dark:text-white">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-xs font-mono font-bold">
                2
              </span>
              <span>Method 2: Web Deletion Request (If App is Uninstalled)</span>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              If you no longer have access to your mobile device or have uninstalled Credvert, you can initiate a verified deletion request online:
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 space-y-3">
                <div className="flex items-center gap-2 text-base font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Deletion Request Queued Successfully</span>
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300">
                  We have registered your deletion request for <strong className="text-neutral-900 dark:text-white">{email}</strong>. All
                  associated cloud tokens, notification subscriptions, and synced card portfolios will be permanently purged within 24 hours.
                </p>
                <div className="pt-2 border-t border-emerald-500/20 flex flex-wrap items-center justify-between text-xs font-mono">
                  <span>Reference ID: <strong className="text-emerald-900 dark:text-emerald-100">{ticketId}</strong></span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Status: Pending Queue Verification</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                    Registered Credvert Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-black/30 border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-sans"
                  />
                </div>

                <div>
                  <label htmlFor="reason" className="block text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                    Reason for Deletion (Optional)
                  </label>
                  <select
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-black/30 border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-sans"
                  >
                    <option>No longer using credit cards</option>
                    <option>Switching to another device</option>
                    <option>Privacy concerns</option>
                    <option>Cleaning up unused accounts</option>
                    <option>Other / prefer not to say</option>
                  </select>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
                  <AlertOctagon className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Irreversible Action:</strong> Deleting your account will immediately wipe your synced card portfolio, historical reward calculations, and subscription notices. This action cannot be undone.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Web Deletion Request</span>
                </button>
              </form>
            )}
          </div>

          {/* Method 3: Email Request */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-base font-bold text-neutral-900 dark:text-white">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-mono font-bold">
                3
              </span>
              <span>Method 3: Email Request</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              You can also request account and data deletion by sending an email from your registered email address:
            </p>
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 space-y-1.5 text-xs font-mono">
              <div>
                <span className="text-neutral-400">Email:</span>{' '}
                <a href="mailto:privacy@credvert.tech" className="text-credvert-goldDark dark:text-credvert-gold font-bold hover:underline">
                  privacy@credvert.tech
                </a>
              </div>
              <div>
                <span className="text-neutral-400">Subject:</span>{' '}
                <span className="text-neutral-800 dark:text-neutral-200">Data Deletion Request - [Your Registered Email]</span>
              </div>
              <div>
                <span className="text-neutral-400">Processing Time:</span>{' '}
                <span className="text-neutral-800 dark:text-neutral-200 font-semibold">Within forty-eight (48) hours with written confirmation.</span>
              </div>
            </div>
          </div>

          {/* Method 4: Guest Mode */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-base font-bold text-neutral-900 dark:text-white">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">
                4
              </span>
              <span>Method 4: Guest Mode / Local-Only Users</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              If you used Credvert without creating an account (Guest Mode):
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300 list-disc list-inside">
              <li>None of your data was ever sent to our remote servers.</li>
              <li>To purge all locally stored information:
                <ul className="pl-6 space-y-1 pt-1 list-none">
                  <li>• Go to <strong className="text-neutral-900 dark:text-white">Account → Reset this device</strong>, or</li>
                  <li>• Go to your device&apos;s <strong className="text-neutral-900 dark:text-white">Settings → Apps → Credvert → Storage → Clear Storage / Clear Data</strong>, or</li>
                  <li>• Simply uninstall the Credvert app from your device.</li>
                </ul>
              </li>
              <li>All hardware-encrypted card tokens and local SQLite database records will be instantaneously and permanently destroyed.</li>
            </ul>
          </div>
        </section>

        {/* 3. What Information Is Deleted */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            3. What Information Is Deleted
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            When an account deletion request is processed, the following information is{' '}
            <strong className="text-neutral-900 dark:text-white">permanently and irreversibly purged</strong>:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 bg-neutral-100/70 dark:bg-white/[0.04]">
                  <th className="py-3 px-4 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                    Data Category
                  </th>
                  <th className="py-3 px-4 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                    Specific Items Deleted
                  </th>
                  <th className="py-3 px-4 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 text-right">
                    Timeline
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs">
                <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                  <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                    Authentication &amp; Profile Data
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                    User ID, email address, password hash, display name, and authentication session tokens.
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      Within 24 hours
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                  <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                    Synced Card Metadata
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                    Card product mappings, issuing bank names, user-assigned card nicknames, last 4 digits, billing statement dates, and payment due dates.
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      Within 24 hours
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                  <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                    Spend &amp; Expense History
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                    All parsed transaction records, merchant names, amounts, categories, milestone histories, and bill reminders stored in your cloud account.
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      Within 24 hours
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                  <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                    Shortlist &amp; Preferences
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                    Bookmarked cards, comparison tray configurations, custom spend assumptions, and notification preferences.
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      Within 24 hours
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                  <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                    Device Tokens
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                    Firebase Cloud Messaging (FCM) push notification tokens and installation IDs.
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      Invalidated immediately
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                  <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                    Local Device Secrets
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                    Hardware-encrypted card numbers (PAN), CVVs, and expiry dates stored in Android KeyStore / iOS Secure Enclave.
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Destroyed locally
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. What Information Is Retained */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            4. What Information Is Retained (If Any) and Retention Timelines
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-sm">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 bg-neutral-100/70 dark:bg-white/[0.04]">
                  <th className="py-3 px-4 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                    Category
                  </th>
                  <th className="py-3 px-4 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                    Reason for Temporary Retention
                  </th>
                  <th className="py-3 px-4 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                    Maximum Retention Period
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs">
                <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                  <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                    Server Logs (Anonymized)
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                    System security logs, IP addresses associated with requests, and rate-limiting traces retained strictly for threat mitigation and fraud prevention.
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400 font-medium">
                    Purged automatically on a rolling 30-day window.
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                  <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                    Database Backups
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                    Encrypted snapshots of the production database maintained for disaster recovery. Backups are isolated and cannot be queried for production operations.
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400 font-medium">
                    Automatically overwritten and permanently expunged within 30 to 90 days in accordance with automated backup rotation cycles.
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.01]">
                  <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                    Legal / Dispute Records
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                    In the rare event of an ongoing legal dispute, regulatory inquiry, or valid law enforcement subpoena, minimal relevant records may be preserved as mandated by applicable statutory law.
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400 font-medium">
                    Only for the duration legally required by court order or statutory limitation period.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Third-Party Service Providers */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            5. Third-Party Service Providers (Sub-Processors)
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            When your deletion request is executed, deletion directives are cascaded to our cloud processors:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/10 space-y-2">
              <strong className="text-neutral-900 dark:text-white block font-bold">Google Firebase</strong>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                User authentication records are removed from Firebase Auth; analytics user properties are unlinked (<code className="font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">setUserId(null)</code>).
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/10 space-y-2">
              <strong className="text-neutral-900 dark:text-white block font-bold">PostgreSQL Cloud Database</strong>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                All foreign-key relationships linked to your user record (<code className="font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">cards</code>, <code className="font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">shortlist</code>, <code className="font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">spend_transactions</code>, <code className="font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">bill_notices</code>) use <code className="font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">ON DELETE CASCADE</code> and are immediately deleted.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Questions and Contact */}
        <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/10 shadow-sm">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            6. Questions and Contact
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            For any questions, verification status, or assistance regarding data deletion, please contact:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] space-y-1 border border-black/5 dark:border-white/5">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono">Data Protection Officer / Grievance Officer</span>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">Jay Chauhan</p>
              <p className="text-neutral-600 dark:text-neutral-400">Ahmedabad, Gujarat, India</p>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] space-y-1.5 border border-black/5 dark:border-white/5 font-mono">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-500" />
                <span className="text-neutral-500">Privacy:</span>
                <a href="mailto:privacy@credvert.tech" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                  privacy@credvert.tech
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
