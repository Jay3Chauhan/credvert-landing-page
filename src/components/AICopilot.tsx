'use client';

import React, { useState } from 'react';
import { Sparkles, Bot, User, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { playHapticFeedback } from '@/lib/sound';
import { AppleWordReveal } from '@/components/ui/AppleText';

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
          <strong>1. Infinia SmartBuy:</strong> Book through the SmartBuy portal to unlock a 5X reward multiplier (16.6% net return).
          ₹85,000 earns ~14,166 Reward Points, directly redeemable 1:1 for Singapore Airlines KrisFlyer miles or luxury hotel stays.
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
    id: 'forex',
    label: '🌏 $1,500 Bali Hotel Spend with Forex',
    query:
      "I'm paying $1,500 (approx ₹1,26,000) for a resort in Bali. Which card avoids high forex markup while still earning rewards?",
    tools: [
      {
        icon: '⚙️',
        text: 'Tool Invoked: forex.calculate_net_markup({ card: "idfc-wealth", fee_percent: 1.5, gst: 18 })',
      },
      {
        icon: '📊',
        text: 'Calculated: IDFC FIRST Wealth = 1.5% markup + 18% GST = 1.77% total cost. Net return = 2.5% RPs - 1.77% = +0.73% net profit.',
      },
      {
        icon: '⚡',
        text: 'Tool Invoked: forex.calculate_net_markup({ card: "sbi-cashback", fee_percent: 3.5, gst: 18 })',
      },
    ],
    title: '🏆 Optimal Strategy: IDFC FIRST Wealth (1.5% Forex) or ICICI Emeralde',
    metrics: [
      { val: '+₹920', lbl: 'Net Gain After Forex & GST' },
      { val: '1.5% + GST', lbl: 'Ultra-Low Forex Markup' },
      { val: '₹0 Lost', lbl: 'Protected Against Surcharges' },
    ],
    body: (
      <>
        <p className="mb-2">
          <strong>1. Beware the 4.13% Forex Trap:</strong> Standard cards like SBI Cashback charge 3.5% forex markup + 18% GST = 4.13% penalty,
          wiping out base cashback completely and causing a net loss of ₹5,200.
        </p>
        <p>
          <strong>2. IDFC FIRST Wealth / ICICI Emeralde Advantage:</strong> IDFC charges only 1.5% markup (1.77% effective).
          Combined with 10X reward points on spends exceeding ₹30k/month, international transactions actually remain net profitable!
        </p>
      </>
    ),
  },
  {
    id: 'neucoins',
    label: '⚡ ₹8,000 Groceries on Tata Neu App',
    query:
      'Buying ₹8,000 groceries on BigBasket via Tata Neu app. How do I get maximum NeuCoins?',
    tools: [
      {
        icon: '⚙️',
        text: 'Tool Invoked: catalog.check_co_branded({ card: "tata-neu-infinity", app: "Tata Neu", merchant: "BigBasket" })',
      },
      {
        icon: '📊',
        text: 'Calculated: 5% NeuCoins on Tata Neu Infinity + 5% NeuPass member bonus = 10% total NeuCoins (800 NeuCoins = ₹800 value).',
      },
    ],
    title: '🏆 Optimal Strategy: Tata Neu Infinity HDFC Card on Tata Neu App',
    metrics: [
      { val: '800 NeuCoins', lbl: 'Total Rewards Earned' },
      { val: '10.0%', lbl: 'Effective Return Rate' },
      { val: '1:1 = ₹800', lbl: 'Redemption on Air India / Croma' },
    ],
    body: (
      <>
        <p className="mb-2">
          <strong>1. Stacked 10% Yield:</strong> Paying via Tata Neu Infinity inside the Neu app delivers 5% base NeuCoins
          plus 5% NeuPass member privileges, totaling 10% direct value.
        </p>
        <p>
          <strong>2. Direct Redemption:</strong> 800 NeuCoins equal ₹800 directly usable on Air India, Tata 1mg, Croma,
          or IHCL Taj hotels without any conversion loss.
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-credvert-gold/15 border border-credvert-gold/30 text-xs font-mono font-semibold text-credvert-goldDark dark:text-credvert-goldLight mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FRONTIER AI ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-neutral-900 dark:text-white tracking-tight mb-4">
            <AppleWordReveal text="Credvert AI — Autonomous Credit Copilot" />
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
            Powered by <strong className="text-neutral-900 dark:text-white font-semibold">Anthropic Claude 3.5 Sonnet</strong> and
            on-device privacy tokenization. Ask complex credit card queries in natural language, audit statement fees,
            and let multi-step tool calling optimize your rewards in real-time.
          </p>
        </div>

        {/* AI Terminal Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white dark:bg-[#111217]/90 border border-black/10 dark:border-credvert-gold/20 shadow-xl dark:shadow-2xl backdrop-blur-2xl p-6 sm:p-10 relative overflow-hidden">
          {/* Top Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-black/10 dark:border-white/10 mb-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]" />
                Claude 3.5 Sonnet Active
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[11px] text-neutral-600 dark:text-neutral-400 font-medium">
                Function Calling Ready
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                ✓ DPDP 2023 Tokenized (0 PII to Cloud)
              </span>
            </div>
            <div className="font-mono text-xs text-credvert-goldDark dark:text-credvert-goldLight bg-credvert-gold/10 px-2.5 py-1 rounded-lg border border-credvert-gold/30">
              ⚡ 240ms Inference
            </div>
          </div>

          {/* Prompt Selector Chips */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  playHapticFeedback('light');
                  setActiveScenario(s);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-medium transition-all ${
                  activeScenario.id === s.id
                    ? 'bg-credvert-gold/20 text-neutral-900 dark:text-white border border-credvert-gold shadow-sm font-semibold'
                    : 'bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Interactive Chat Thread */}
          <div className="space-y-6 bg-neutral-50 dark:bg-black/40 border border-black/5 dark:border-white/5 rounded-3xl p-6 mb-6">
            {/* User Message */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-neutral-200 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-neutral-700 dark:text-neutral-300 flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1 bg-white dark:bg-white/[0.04] border border-black/5 dark:border-white/5 rounded-2xl p-4 text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed shadow-sm">
                {activeScenario.query}
              </div>
            </div>

            {/* Agent Tool Invocations */}
            <div className="ml-11 border-l-2 border-credvert-gold/60 pl-4 space-y-2 py-1 font-mono text-xs text-neutral-600 dark:text-neutral-300">
              {activeScenario.tools.map((t, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span>{t.icon}</span>
                  <span className="leading-snug">{t.text}</span>
                </div>
              ))}
            </div>

            {/* AI Bot Response */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-credvert-gold to-credvert-goldLight flex items-center justify-center text-xs font-bold text-neutral-950 shadow-md flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-4">
                {/* Recommendation Highlight Box */}
                <div className="rounded-2xl bg-amber-500/10 dark:bg-gradient-to-r dark:from-credvert-gold/15 dark:to-emerald-500/10 border border-credvert-gold/40 p-4 shadow-sm">
                  <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mb-3">
                    {activeScenario.title}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-black/10 dark:border-white/10">
                    {activeScenario.metrics.map((m, idx) => (
                      <div key={idx}>
                        <span className="block text-lg font-bold font-display text-credvert-goldDark dark:text-credvert-goldLight">
                          {m.val}
                        </span>
                        <span className="text-[10px] uppercase font-semibold text-neutral-500 dark:text-neutral-400 font-mono">
                          {m.lbl}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Strategy Body */}
                <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl p-4 shadow-sm">
                  {activeScenario.body}
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/10 dark:border-white/10 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
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
