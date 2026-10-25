'use client';

import React, { useState } from 'react';
import { Sparkles, Bot, User, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { soundManager } from '@/lib/sound';

interface Scenario {
  id: string;
  label: string;
  query: string;
  tools: Array<{ icon: string; text: string }>;
  title: string;
  metrics: Array<{ val: string; lbl: string }>;
  body: React.ReactNode;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'flight',
    label: '✈️ ₹85k Singapore Airlines Flight',
    query:
      "I'm booking flights to Singapore for ₹85,000 next month. Between my HDFC Infinia, Axis Atlas, and Amex Plat Travel, which card gives me the highest net return and lounge access?",
    tools: [
      {
        icon: '⚙️',
        text: 'Tool Invoked: catalog.evaluate_category({ category: "flights", spend: 85000, portal: "SmartBuy" })',
      },
      {
        icon: '📊',
        text: 'Calculated: Infinia 5X SmartBuy = 14,166 RPs (16.6% return, ₹14,166 value). Calendar daily cap: 7,500 bonus RPs.',
      },
      {
        icon: '⚡',
        text: 'Tool Invoked: partner_miles.simulate_transfer({ card: "Axis Atlas", spend: 85000, ratio: "1:2" })',
      },
    ],
    title: '🏆 Optimal Strategy: Split or swipe HDFC Infinia via SmartBuy',
    metrics: [
      { val: '₹14,166', lbl: 'Net Miles Value (16.6%)' },
      { val: 'Unlimited', lbl: 'T3 Lounge + 1 Guest' },
      { val: '₹0', lbl: 'Zero Forex Markup' },
    ],
    body: (
      <>
        <p className="mb-2">
          <strong>1. HDFC Infinia (Best Value):</strong> Book via SmartBuy flights for{' '}
          <strong>5X Reward Points (16.6% effective return)</strong>. You generate 14,166 points worth ₹14,166 when
          transferred 1:1 to Singapore KrisFlyer or booked on flights.
        </p>
        <p className="mb-2">
          <strong>2. Daily Cap Alert:</strong> Infinia SmartBuy has a calendar daily cap of 7,500 accelerated points.
          Since ₹85k generates 11,333 bonus points, <em>book two tickets on consecutive days</em> to capture the full 16.6%
          return, or use <strong>Axis Atlas</strong> for an unconstrained 5 EDGE Miles per ₹100.
        </p>
        <p>
          <strong>3. Lounge Access at DEL T3:</strong> Infinia gives you and your guest complimentary access to the
          Encalm Privé lounge without any prior quarter spend threshold.
        </p>
      </>
    ),
  },
  {
    id: 'macbook',
    label: '💻 ₹1.2L MacBook on Amazon vs Apple',
    query:
      "I'm buying a ₹1,20,000 MacBook Pro. Should I buy directly on Apple Store India or on Amazon with SBI Cashback or HDFC Infinia?",
    tools: [
      {
        icon: '⚙️',
        text: 'Tool Invoked: catalog.check_merchant_discounts({ merchant: "Amazon", card: "sbi-cashback", amount: 120000 })',
      },
      {
        icon: '📊',
        text: 'Calculated: SBI Cashback 5% = ₹6,000 (Hits monthly ₹5,000 max cashback cap -> Net return = ₹5,000 / 4.16%).',
      },
      {
        icon: '⚡',
        text: 'Tool Invoked: gyftr.check_voucher_multiplier({ card: "hdfc-infinia", brand: "Amazon Shopping Voucher" })',
      },
    ],
    title: '🏆 Optimal Strategy: Amazon via SBI Cashback or SmartBuy Gyftr',
    metrics: [
      { val: '₹5,000', lbl: 'Instant Statement Credit' },
      { val: '5.0% -> 4.16%', lbl: 'Effective Return Rate' },
      { val: 'Immediate', lbl: 'Cashback Turnaround' },
    ],
    body: (
      <>
        <p className="mb-2">
          <strong>1. SBI Cashback on Amazon:</strong> Gives an instant 5% cashback straight into your next statement,
          capped at ₹5,000 monthly. You capture the maximum ₹5,000 reward instantly.
        </p>
        <p>
          <strong>2. HDFC Gyftr Strategy:</strong> If you prefer travel points, purchase ₹20,000 Amazon vouchers on
          SmartBuy Gyftr (3X multiplier = 9.9% return) and put ₹1,00,000 directly on Infinia for a combined 5,280 RPs
          worth ₹5,280 in flight redemptions.
        </p>
      </>
    ),
  },
  {
    id: 'audit',
    label: '🔍 Audit June Statement for Hidden Fees',
    query: 'Audit my latest June statement for unexpected fees, interest, and missed rewards.',
    tools: [
      {
        icon: '⚙️',
        text: 'Tool Invoked: vision_ocr.parse_statement({ period: "June 2026", bank: "HDFC Bank" })',
      },
      {
        icon: '⚠️',
        text: 'Detected: ₹1,450 IGST + Forex markup on Spotify US & AWS subscriptions.',
      },
      {
        icon: '⚡',
        text: 'Tool Invoked: advisor.recommend_alternative({ category: "international_saas", spend: 41200 })',
      },
    ],
    title: '⚠️ Audit Findings: ₹1,450 Unnecessary Forex Fees Detected',
    metrics: [
      { val: '₹1,450', lbl: 'Wasted Forex Markup' },
      { val: '2', lbl: 'Excluded Spend Categories' },
      { val: '₹38,200', lbl: 'Remaining for Fee Waiver' },
    ],
    body: (
      <>
        <p className="mb-2">
          <strong>1. Forex Leakage:</strong> Your AWS cloud hosting ($499) was billed in USD with a 2% bank markup + 18%
          GST (2.36% net loss). Routing this via an ICICI Emeralde (1.5% markup) or zero-forex card saves ₹960/month.
        </p>
        <p className="mb-2">
          <strong>2. Jewellery Exclusion:</strong> ₹45,000 spent on Tanishq was classified under MCC 5094, which HDFC
          excluded from reward points as of latest circular.
        </p>
        <p>
          <strong>3. Milestone Status:</strong> You are ₹38,200 away from your ₹10L annual fee waiver with 42 days left
          in your card anniversary.
        </p>
      </>
    ),
  },
  {
    id: 'lounge',
    label: '🛋️ Delhi Terminal 3 Lounge Guests',
    query:
      'Flying international from Delhi Terminal 3 tonight with my spouse and child. Can all 3 of us enter the lounge for free?',
    tools: [
      {
        icon: '⚙️',
        text: 'Tool Invoked: lounge_db.get_access_rules({ airport: "DEL", terminal: "T3 International", cards: ["HDFC Infinia Metal", "Axis Atlas"] })',
      },
      {
        icon: '📊',
        text: 'Rule Evaluated: Infinia Metal Priority Pass permits primary + 1 complimentary guest.',
      },
      {
        icon: '⚡',
        text: 'Rule Evaluated: Axis Atlas DreamFolks requires ₹15,000 spend in preceding quarter.',
      },
    ],
    title: '🛋️ Lounge Access Strategy: Encalm Privé Delhi T3',
    metrics: [
      { val: '2 Adults Free', lbl: 'Infinia Priority Pass' },
      { val: 'Child < 2 Free', lbl: 'Infant Policy' },
      { val: 'Encalm Privé', lbl: 'Eligible Lounge' },
    ],
    body: (
      <>
        <p className="mb-2">
          <strong>1. Adults (Free):</strong> Your primary HDFC Infinia Priority Pass grants free entry to you and 1
          accompanying adult guest at Delhi T3 Encalm Privé.
        </p>
        <p>
          <strong>2. Child Policy:</strong> Children under 2 years enter free. If older than 2, use your Add-on Infinia
          Priority Pass (if issued in advance) or swipe Axis Atlas to avoid paying the walk-in guest fee of ₹2,400 + GST.
        </p>
      </>
    ),
  },
];

export function AICopilot() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);

  return (
    <section id="ai-copilot" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-semibold text-gold-light mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Frontier AI Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
            Credvert AI — Autonomous Credit Copilot
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Powered by <strong className="text-zinc-200">Anthropic Claude 3.5 Sonnet</strong> and on-device privacy
            tokenization. Ask complex credit card queries in natural language, audit statement fees, and let multi-step
            tool calling optimize your rewards in real-time.
          </p>
        </div>

        {/* AI Terminal Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#111217]/90 border border-gold/20 shadow-2xl backdrop-blur-2xl p-6 sm:p-10 relative overflow-hidden">
          {/* Top Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex items-center gap-2 text-xs font-semibold text-emerald">
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse shadow-[0_0_8px_#10B981]" />
                Claude 3.5 Sonnet Active
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-zinc-400 font-medium">
                Function Calling Ready
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald/10 border border-emerald/30 text-[11px] text-emerald font-semibold">
                ✓ DPDP 2023 Tokenized (0 PII to Cloud)
              </span>
            </div>
            <div className="font-mono text-xs text-gold-light bg-gold/10 px-2.5 py-1 rounded-md border border-gold/20">
              ⚡ 240ms Inference
            </div>
          </div>

          {/* Prompt Selector Chips */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveScenario(s);
                }}
                className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                  activeScenario.id === s.id
                    ? 'bg-gradient-to-r from-gold-light/20 via-gold/20 to-gold-deep/20 text-white border border-gold shadow-[0_2px_12px_rgba(212,168,83,0.2)] font-semibold'
                    : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5 hover:border-white/15'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Interactive Chat Thread */}
          <div className="space-y-6 bg-black/40 border border-white/5 rounded-2xl p-6 mb-6">
            {/* User Message */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-zinc-300 flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1 bg-white/[0.04] border border-white/5 rounded-2xl p-4 text-sm text-zinc-200 leading-relaxed">
                {activeScenario.query}
              </div>
            </div>

            {/* Agent Tool Invocations */}
            <div className="ml-11 border-l-2 border-gold/60 pl-4 space-y-2 py-1 font-mono text-xs text-zinc-400">
              {activeScenario.tools.map((t, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span>{t.icon}</span>
                  <span className="leading-snug">{t.text}</span>
                </div>
              ))}
            </div>

            {/* AI Bot Response */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-light to-gold-deep flex items-center justify-center text-xs font-bold text-obsidian shadow-gold flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-4">
                {/* Recommendation Highlight Box */}
                <div className="rounded-xl bg-gradient-to-r from-gold/15 to-emerald/10 border border-gold/30 p-4">
                  <h4 className="text-sm sm:text-base font-bold text-white mb-3">{activeScenario.title}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10">
                    {activeScenario.metrics.map((m, idx) => (
                      <div key={idx}>
                        <span className="block text-lg font-bold font-display text-gold-light">{m.val}</span>
                        <span className="text-[10px] uppercase font-semibold text-zinc-400">{m.lbl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Strategy Body */}
                <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-white/[0.02] border border-white/5 rounded-xl p-4">
                  {activeScenario.body}
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-zinc-500">
            <div>
              <strong>Architecture:</strong> Hybrid Edge-RAM Tokenizer + Cloud LLM
            </div>
            <div>
              <strong>Reasoning Engine:</strong> Claude 3.5 Native Tool Use
            </div>
            <div>
              <strong>Compliance:</strong> DPDP Act 2023 & RBI Vault Guidelines
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
