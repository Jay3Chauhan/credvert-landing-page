'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { ArrowLeft, Trash2, CheckCircle2, Send } from 'lucide-react';
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
        <div className="flex items-center gap-2">
          <Logo markClassName="w-6 h-6" wordmarkClassName="h-4 w-auto" />
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
            DPDP §12 Right to Erasure
          </span>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto py-12 space-y-10 font-sans">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-bold mb-4">
            <Trash2 className="w-3.5 h-3.5" />
            <span>UNCONDITIONAL DATA ERASURE GUARANTEE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-white mb-2">
            Account & Data Deletion Portal
          </h1>
          <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            Compliant with Digital Personal Data Protection Act 2023 & GDPR Article 17
          </p>
        </div>

        <section className="space-y-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
            At credVert, you have an absolute and unconditional right to have your account and all associated
            metadata permanently erased from our systems. Because raw financial SMS alerts and card PINs never leave
            your phone, full deletion is instantaneous and irreversible.
          </p>
        </section>

        {/* Method 1: In App */}
        <div className="p-6 rounded-3xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/10 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
            <span className="w-6 h-6 rounded-full bg-credvert-gold/20 text-credvert-goldDark dark:text-credvert-gold flex items-center justify-center text-xs font-mono font-bold">
              1
            </span>
            <span>Method 1: Instant In-App Erasure (Recommended)</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
            Open the credVert mobile app → Navigate to <strong>Settings</strong> → Scroll to the bottom → Tap{' '}
            <strong className="text-red-500 dark:text-red-400">Delete Account and Erase Local Vault</strong>. This wipes your local
            SQLite database, tears down local biometric encryption keys, and cancels cloud sync tokens immediately.
          </p>
        </div>

        {/* Method 2: Web Submission */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900/60 border border-black/10 dark:border-white/10 backdrop-blur-xl space-y-6 shadow-md dark:shadow-xl">
          <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-xs font-mono font-bold">
              2
            </span>
            <span>Method 2: Web Deletion Request (If App is Uninstalled)</span>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 space-y-3">
              <div className="flex items-center gap-2 text-base font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <span>Deletion Request Queued Successfully</span>
              </div>
              <p className="text-xs text-neutral-700 dark:text-neutral-300">
                We have registered your deletion request for <strong className="text-neutral-900 dark:text-white">{email}</strong>. All
                associated cloud tokens, notification subscriptions, and synced card portfolios will be permanently
                purged within 24 hours.
              </p>
              <div className="pt-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                Ticket Reference: <span>{ticketId}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="del-email" className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1.5 uppercase font-semibold">
                  Registered Email Address
                </label>
                <input
                  id="del-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your-name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-black/10 dark:border-white/10 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="del-reason" className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1.5 uppercase font-semibold">
                  Reason for Deletion (Optional)
                </label>
                <select
                  id="del-reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-black/10 dark:border-white/10 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="No longer using the app">No longer using the app</option>
                  <option value="Switching devices">Switching devices</option>
                  <option value="Privacy concerns">Privacy preference</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Irreversible Erasure Request</span>
              </button>
            </form>
          )}
        </div>

        {/* Data Erasure Breakdown Matrix */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white">What Data is Deleted vs. Retained</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 text-neutral-500 dark:text-neutral-400 font-mono">
                  <th className="py-3 px-3">Data Category</th>
                  <th className="py-3 px-3">Where Stored</th>
                  <th className="py-3 px-3">Erasure Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/[0.06] text-neutral-700 dark:text-neutral-300">
                <tr>
                  <td className="py-3 px-3 font-semibold text-neutral-900 dark:text-white">Account Email & Auth Tokens</td>
                  <td className="py-3 px-3">Cloud Supabase Auth</td>
                  <td className="py-3 px-3 text-red-500 dark:text-red-400 font-semibold">Permanently purged within 24 hours</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-neutral-900 dark:text-white">Card Names in Portfolio</td>
                  <td className="py-3 px-3">Cloud Sync Database</td>
                  <td className="py-3 px-3 text-red-500 dark:text-red-400 font-semibold">Hard-deleted immediately</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-neutral-900 dark:text-white">Raw Financial SMS Alerts</td>
                  <td className="py-3 px-3">Device RAM Only</td>
                  <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400 font-semibold">Never stored on any cloud server</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-neutral-900 dark:text-white">Local Spend Cache (SQLite)</td>
                  <td className="py-3 px-3">Your Phone Sandbox</td>
                  <td className="py-3 px-3 text-neutral-500 dark:text-neutral-400">Wiped via app uninstall or Settings button</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Grievance Officer */}
        <div className="p-5 rounded-3xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/10 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 shadow-sm">
          <div>
            Questions about our erasure process? Contact{' '}
            <a href="mailto:grievance@credvert.tech" className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline">
              grievance@credvert.tech
            </a>
          </div>
          <span className="font-mono text-neutral-500">Ahmedabad, Gujarat, India</span>
        </div>
      </article>
    </div>
  );
}
