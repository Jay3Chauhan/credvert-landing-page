import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import {
  ShieldAlert,
  ArrowLeft,
  AlertTriangle,
  Scale,
  FileText,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Building,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms and Conditions of Service | Credvert',
  description:
    'Credvert Terms and Conditions of Service: Comprehensive user terms, non-lender disclaimers, intellectual property fair use, and limitation of liability.',
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
        <div className="flex items-center gap-3">
          <Logo markClassName="w-6 h-6" wordmarkClassName="h-4 w-auto" />
          <span className="hidden sm:inline-block text-xs font-mono text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider">
            Terms of Service
          </span>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto py-12 space-y-12 font-sans">
        {/* Title & Metadata Banner */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold">
            <Scale className="w-3.5 h-3.5" />
            <span>LEGAL AGREEMENT &amp; USER TERMS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Terms and Conditions of Service
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

        {/* 1. Acceptance of Terms */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            1. Acceptance of Terms
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            These Terms and Conditions of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User&quot;, &quot;you&quot;, or &quot;your&quot;) and Credvert (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), governing your access to and use of the Credvert mobile application, website (
            <Link href="/" className="text-credvert-goldDark dark:text-credvert-gold hover:underline font-medium">
              https://credvert.tech
            </Link>
            ), application programming interfaces (APIs), and related services (collectively, the &quot;Service&quot;).
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            By downloading, installing, accessing, or using Credvert, you signify that you have read, understood, and agreed to be bound by these Terms and our Privacy Policy. If you do not agree with any provision of these Terms, you must immediately discontinue use of the Service and uninstall the application.
          </p>
        </section>

        {/* 2. Eligibility */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            2. Eligibility
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            The Service is intended exclusively for individuals who are at least <strong className="text-neutral-900 dark:text-white">eighteen (18) years of age</strong> (or the age of legal majority in your jurisdiction) and possess the full legal capacity to enter into a binding contract. By accessing or using Credvert, you represent and warrant that you satisfy these eligibility requirements. If you are under 18 years of age, you are strictly prohibited from using the Service.
          </p>
        </section>

        {/* 3. Description of the Service */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            3. Description of the Service
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Credvert is an independent software application designed to help consumers research, compare, organize, and optimize credit cards. Key capabilities provided by the Service include:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2">
              <strong className="text-neutral-900 dark:text-white block font-bold">Card Catalog &amp; Comparison</strong>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                An informational database displaying publicly available credit card benefits, annual fees, reward structures, welcome perks, lounge access allowances, and foreign currency markup rates.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2">
              <strong className="text-neutral-900 dark:text-white block font-bold">Reward Engine &amp; Optimization Calculator</strong>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                An algorithmic simulation tool estimating potential cashbacks, airline airmiles, and reward point yields based on user-provided spending assumptions.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2">
              <strong className="text-neutral-900 dark:text-white block font-bold">Hardware-Encrypted Secure Vault</strong>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                A client-side, zero-knowledge digital organizer enabling users to encrypt and access card details on their local device using biometric authentication.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-2">
              <strong className="text-neutral-900 dark:text-white block font-bold">SMS Spend Tracking &amp; Bill Reminders</strong>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                An optional on-device parser that reads transactional SMS alerts from registered financial institutions to generate personal spend analytics, track fee-waiver milestones, and notify users of upcoming statement and payment due dates.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Non-Financial Entity Disclaimer */}
        <section className="space-y-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-100 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
              <h2 className="text-lg sm:text-xl font-display font-extrabold uppercase tracking-tight text-amber-900 dark:text-amber-200">
                4. Strict Non-Financial Entity &amp; Non-Lender Disclaimer
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              CREDVERT IS NOT A BANK, NON-BANKING FINANCIAL COMPANY (NBFC), CREDIT CARD ISSUER, LENDER, LOAN BROKER, PAYMENT SYSTEM OPERATOR, PAYMENT GATEWAY, OR CREDIT INFORMATION COMPANY (CREDIT BUREAU).
            </p>
            <ol className="space-y-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 list-decimal list-inside">
              <li>
                <strong className="text-neutral-900 dark:text-white">No Financial Products or Lending:</strong> Credvert does not issue credit cards, grant credit lines, offer personal loans, originate loans, provide installment financing (EMI), underwrite risk, approve or reject applications, collect repayments, or hold customer funds in escrow or deposit accounts.
              </li>
              <li>
                <strong className="text-neutral-900 dark:text-white">No Payment Processing:</strong> Credvert does not execute financial transactions, transfer money, process card debits/credits, or act as an intermediary for settlement between you and any merchant or card issuer.
              </li>
              <li>
                <strong className="text-neutral-900 dark:text-white">No Credit Scoring or Bureau Inquiries:</strong> Credvert does not check, pull, alter, report to, or repair your credit score or credit bureau records (such as CIBIL, Experian, Equifax, or CRIF High Mark).
              </li>
              <li>
                <strong className="text-neutral-900 dark:text-white">Third-Party Card Issuers:</strong> All credit cards referenced within the application are issued exclusively by third-party banks and financial institutions (such as HDFC Bank, ICICI Bank, State Bank of India, Axis Bank, American Express, etc.). Any decision to apply for a credit card, and any subsequent approval or rejection, rests solely between you and the respective card issuing institution.
              </li>
            </ol>
          </div>
        </section>

        {/* 5. Disclaimer of Financial Advice */}
        <section className="space-y-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white dark:bg-white/[0.03] dark:text-neutral-200 border border-neutral-800 dark:border-white/10 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-credvert-gold shrink-0" />
              <h2 className="text-lg sm:text-xl font-display font-extrabold uppercase tracking-tight text-credvert-gold">
                5. Disclaimer of Financial Advice
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-neutral-200 dark:text-neutral-200">
              ALL INFORMATION, REWARD SIMULATIONS, CARD COMPARISONS, AND ADVISORY OUTPUTS ARE PROVIDED SOLELY FOR EDUCATIONAL AND INFORMATIONAL PURPOSES.
            </p>
            <ol className="space-y-2.5 text-xs sm:text-sm text-neutral-300 dark:text-neutral-300 list-decimal list-inside">
              <li>
                <strong className="text-white">No Professional Advice:</strong> Credvert does not provide certified financial, legal, tax, or investment advice. The Service should not be relied upon as a substitute for formal financial guidance.
              </li>
              <li>
                <strong className="text-white">Estimates and Simulations:</strong> Reward calculations, cashbacks, airmile conversions, and return-on-spend percentages are algorithmic estimates derived from published reward charts. Reward values vary dynamically depending on redemption avenues (e.g., flight bookings, shopping vouchers, statement credits), partner redemption transfer ratios, quarterly bank caps, minimum transaction thresholds, and exclusion categories (such as fuel, rent, wallet loads, or utility spends).
              </li>
              <li>
                <strong className="text-white">Accuracy and Independent Verification:</strong> While we endeavor to maintain accurate and up-to-date catalog details, banks and card issuers frequently alter terms, annual fees, interest rates (Annual Percentage Rates / APR), reward programs, and airport lounge access criteria without notice. <strong className="text-credvert-gold">You are solely responsible for verifying all fees, interest charges, terms, and eligibility requirements directly on the official website or terms schedule of the card issuer prior to applying or making financial commitments.</strong>
              </li>
            </ol>
          </div>
        </section>

        {/* 6. Outbound Links & Affiliate Disclosure */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            6. Outbound Links, Issuer Portals, and Affiliate Disclosure
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-1.5">
              <strong className="text-neutral-900 dark:text-white block font-bold">1. Third-Party Web Portals</strong>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                The Service may feature links or redirects to websites, application forms, or digital portals operated by third-party card issuers and merchants. Credvert exercises no control over third-party platforms, does not endorse their content, and assumes no liability for their terms, privacy practices, or operational reliability.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-1.5">
              <strong className="text-neutral-900 dark:text-white block font-bold">2. Affiliate and Referral Links</strong>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Some outbound links within the Service may be commercial referral links. Credvert may receive a referral fee or commission from an issuer if you choose to submit an application through such links.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-1.5">
              <strong className="text-neutral-900 dark:text-white block font-bold">3. Editorial Independence</strong>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Affiliate arrangements do not compromise our objective ranking methodology. Our reward comparison engine and card recommendations are determined algorithmically based on user spending parameters, card benefits, and mathematical yields—not by paid sponsor placements.
              </p>
            </div>
          </div>
        </section>

        {/* 7. User Account & Biometrics */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            7. User Account, Biometrics &amp; Security Responsibilities
          </h2>
          <ol className="space-y-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 list-decimal list-inside">
            <li>
              <strong className="text-neutral-900 dark:text-white">Account Registration:</strong> You may access certain features of the Service as a guest without creating an account. If you register an account, you agree to provide true, accurate, and current information, and to maintain the security and confidentiality of your login credentials.
            </li>
            <li>
              <strong className="text-neutral-900 dark:text-white">Device Security &amp; Passcode:</strong> You are solely responsible for safeguarding the physical security of your device, your operating system lock (PIN, password, pattern), and your biometric authentication credentials (fingerprint, Touch ID, Face ID).
            </li>
            <li>
              <strong className="text-neutral-900 dark:text-white">Zero-Knowledge Architecture Acknowledgement:</strong>
              <ul className="pl-6 space-y-1 pt-1 list-disc list-inside text-xs text-neutral-600 dark:text-neutral-400">
                <li>You acknowledge and understand that your full 16-digit card number (PAN), CVV, and expiry date are encrypted on-device using keys managed by your device&apos;s hardware security module (Android KeyStore or iOS Secure Enclave).</li>
                <li><strong>Credvert servers never receive, store, or possess the cryptographic keys needed to decrypt your card secrets.</strong></li>
                <li>If you delete your local app data, lose or damage your physical device, forget your device lock credentials, or reset your operating system without an active device backup, <strong>Credvert cannot restore or recover your locally stored card secrets.</strong></li>
              </ul>
            </li>
            <li>
              <strong className="text-neutral-900 dark:text-white">Notification of Unauthorized Use:</strong> You agree to notify us immediately at{' '}
              <a href="mailto:security@credvert.tech" className="text-credvert-goldDark dark:text-credvert-gold hover:underline font-semibold font-mono">
                security@credvert.tech
              </a>{' '}
              if you suspect any unauthorized access to your Credvert account or any security breach.
            </li>
          </ol>
        </section>

        {/* 8. SMS Spend Tracking Terms of Use */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            8. SMS Spend Tracking Terms of Use
          </h2>
          <ol className="space-y-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 list-decimal list-inside">
            <li>
              <strong className="text-neutral-900 dark:text-white">Voluntary Opt-In:</strong> SMS spend tracking is an entirely voluntary feature requiring your explicit, informed consent and runtime operating system permissions (<code className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">READ_SMS</code>, <code className="text-xs font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">RECEIVE_SMS</code>).
            </li>
            <li>
              <strong className="text-neutral-900 dark:text-white">On-Device Operation:</strong> You acknowledge that parsing of bank SMS alerts occurs locally on your device, and that only extracted metadata (amount, merchant name, category, date, bank, last 4 digits) is stored or synced.
            </li>
            <li>
              <strong className="text-neutral-900 dark:text-white">Format Changes and Delivery Limitations:</strong> Credvert&apos;s parsing engine relies on standard transactional SMS formats dispatched by financial institutions. We do not warrant that all transactions will be recognized, parsed, or categorized without error, as bank SMS formats, sender headers, telecom delivery delays, and message truncation can affect parsing accuracy.
            </li>
            <li>
              <strong className="text-neutral-900 dark:text-white">Revocation &amp; Deletion:</strong> You may pause tracking, revoke permissions, or delete all parsed spend data at any time via the in-app tracking settings.
            </li>
          </ol>
        </section>

        {/* 9. Intellectual Property & Fair Use */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            9. Intellectual Property and Fair Use of Trademarks
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-1.5">
              <strong className="text-neutral-900 dark:text-white block font-bold">1. Credvert Proprietary Assets</strong>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                The Service, including its software architecture, source code, user interface designs, logos, graphic assets, computational algorithms, and documentation, is the exclusive intellectual property of Credvert and is protected by applicable copyright, trademark, and trade secret laws.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-1.5">
              <strong className="text-neutral-900 dark:text-white block font-bold">2. Third-Party Trademarks &amp; Fair Use</strong>
              <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                <li>• All bank names, financial institution logos, card network trademarks (e.g., Visa, Mastercard, RuPay, American Express, Diners Club), card product titles (e.g., &quot;Infinia&quot;, &quot;Magnus&quot;, &quot;Regalia&quot;, &quot;Sapphiro&quot;), and airline/hotel loyalty program names displayed in the Service are the registered trademarks of their respective owners.</li>
                <li>• The display of third-party trademarks and trade names within Credvert is strictly for <strong className="text-neutral-900 dark:text-white">nominative, descriptive, and comparative identification purposes</strong> to inform consumers about card products.</li>
                <li>• The use of these trademarks does not imply any affiliation, sponsorship, endorsement, or partnership between Credvert and any bank or card issuer, unless expressly stated otherwise.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 10. Prohibited Activities */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            10. Prohibited Activities
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            You agree that you will not:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600 dark:text-neutral-300">
            <li className="flex items-start gap-2 p-3 rounded-xl bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <span className="text-rose-500 font-bold">•</span>
              <span>Reverse engineer, decompile, disassemble, or attempt to derive the source code or underlying algorithms of the Service.</span>
            </li>
            <li className="flex items-start gap-2 p-3 rounded-xl bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <span className="text-rose-500 font-bold">•</span>
              <span>Access or monitor the Service using automated scrapers, web spiders, crawlers, or bots without prior written authorization.</span>
            </li>
            <li className="flex items-start gap-2 p-3 rounded-xl bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <span className="text-rose-500 font-bold">•</span>
              <span>Circumvent, disable, or tamper with security-related features, rate-limiting safeguards, biometric gates, or DRM protocols.</span>
            </li>
            <li className="flex items-start gap-2 p-3 rounded-xl bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <span className="text-rose-500 font-bold">•</span>
              <span>Use the Service to store, transmit, or process unlawful, fraudulent, or malicious data.</span>
            </li>
            <li className="flex items-start gap-2 p-3 rounded-xl bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <span className="text-rose-500 font-bold">•</span>
              <span>Introduce viruses, malware, trojans, worms, or any code designed to interrupt or compromise device or network integrity.</span>
            </li>
            <li className="flex items-start gap-2 p-3 rounded-xl bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <span className="text-rose-500 font-bold">•</span>
              <span>Resell, sublicense, lease, or commercially exploit the Service or any catalog dataset extracted from it.</span>
            </li>
          </ul>
        </section>

        {/* 11. Disclaimer of Warranties */}
        <section className="space-y-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-950 dark:text-rose-200 space-y-3">
            <h2 className="text-base sm:text-lg font-display font-extrabold uppercase tracking-tight text-rose-900 dark:text-rose-300">
              11. Disclaimer of Warranties
            </h2>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
              THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.
            </p>
            <p className="text-xs text-rose-900 dark:text-rose-300 leading-relaxed">
              TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, CREDVERT EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ol className="space-y-1.5 text-xs text-rose-900 dark:text-rose-300 list-decimal list-inside">
              <li>IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.</li>
              <li>WARRANTIES THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, BUG-FREE, OR ERROR-FREE.</li>
              <li>WARRANTIES REGARDING THE ACCURACY, RELIABILITY, COMPLETENESS, TIMELINESS, OR CORRECTNESS OF ANY CARD DETAILS, FEES, REWARD PERCENTAGES, LOUNGE ACCESS RULES, OR SPEND CALCULATIONS.</li>
              <li>WARRANTIES THAT ANY DEFECTS IN SOFTWARE WILL BE IMMEDIATELY CORRECTED.</li>
            </ol>
            <p className="text-xs font-semibold text-rose-900 dark:text-rose-200 pt-1">
              YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT YOUR USE OF THE SERVICE, AND ANY DECISIONS MADE IN RELIANCE UPON THE SERVICE, ARE AT YOUR SOLE RISK.
            </p>
          </div>
        </section>

        {/* 12. Limitation of Liability */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            12. Limitation of Liability
          </h2>
          <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-black/10 dark:border-white/10 space-y-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            <p className="font-semibold text-neutral-900 dark:text-white uppercase">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL CREDVERT, ITS FOUNDERS, DEVELOPERS, DIRECTORS, EMPLOYEES, AFFILIATES, AGENTS, OR LICENSORS BE LIABLE FOR ANY:
            </p>
            <ol className="space-y-1.5 list-decimal list-inside text-xs">
              <li>INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES;</li>
              <li>LOSS OF PROFITS, REVENUE, DATA, GOODWILL, BUSINESS REPUTATION, OR FINANCIAL OPPORTUNITIES;</li>
              <li>
                DAMAGES ARISING OUT OF OR IN CONNECTION WITH:
                <ul className="pl-6 space-y-1 pt-1 list-disc list-inside text-neutral-500 dark:text-neutral-400">
                  <li>Your use of or inability to use the Service;</li>
                  <li>Any inaccuracy, omission, or outdated information in the card catalog;</li>
                  <li>Any credit decision, application rejection, or fee imposed by a third-party card issuer;</li>
                  <li>Unauthorized access to or alteration of your device, transmissions, or data;</li>
                  <li>The timing, failure, or accuracy of any bill reminder notification;</li>
                  <li>Any third-party website, portal, or link accessed through the Service.</li>
                </ul>
              </li>
            </ol>
            <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200 pt-2 border-t border-black/5 dark:border-white/5">
              IN NO EVENT SHALL CREDVERT&apos;S AGGREGATE CUMULATIVE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE EXCEED THE GREATER OF: (A) THE TOTAL AMOUNT PAID BY YOU TO CREDVERT IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED UNITED STATES DOLLARS (USD 100) OR ITS EQUIVALENT IN LOCAL CURRENCY.
            </p>
          </div>
        </section>

        {/* 13. Indemnification */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            13. Indemnification
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            You agree to defend, indemnify, and hold harmless Credvert, its developers, affiliates, and licensors from and against any claims, liabilities, damages, losses, expenses, and reasonable attorneys&apos; fees arising out of or in any way connected with:
          </p>
          <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300 list-disc list-inside">
            <li>Your access to or use of the Service;</li>
            <li>Your violation of these Terms or any applicable statutory law;</li>
            <li>Your infringement or violation of any third-party right, including intellectual property or privacy rights;</li>
            <li>Any misrepresentation made by you in connection with your account or use of the application.</li>
          </ul>
        </section>

        {/* 14. Termination and Suspension */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            14. Termination and Suspension
          </h2>
          <ol className="space-y-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 list-decimal list-inside">
            <li>
              <strong className="text-neutral-900 dark:text-white">Termination by User:</strong> You may terminate these Terms at any time by deleting your account via <strong className="text-neutral-900 dark:text-white">Account → Delete Account</strong> and removing the application from your devices.
            </li>
            <li>
              <strong className="text-neutral-900 dark:text-white">Termination by Credvert:</strong> We reserve the right to suspend, restrict, or terminate your access to the Service at any time, with or without prior notice, if we determine in our sole discretion that you have violated these Terms, engaged in fraudulent or abusive conduct, or if necessary to protect the security and integrity of our systems.
            </li>
            <li>
              <strong className="text-neutral-900 dark:text-white">Survival:</strong> Upon termination, all provisions of these Terms which by their nature should survive will survive, including ownership provisions, warranty disclaimers, limitation of liability, indemnification, and dispute resolution clauses.
            </li>
          </ol>
        </section>

        {/* 15. Governing Law and Dispute Resolution */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            15. Governing Law and Dispute Resolution
          </h2>
          <ol className="space-y-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 list-decimal list-inside">
            <li>
              <strong className="text-neutral-900 dark:text-white">Governing Law:</strong> These Terms and any dispute or claim arising out of or related to them shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
            </li>
            <li>
              <strong className="text-neutral-900 dark:text-white">Informal Resolution:</strong> Before initiating formal legal proceedings, you and Credvert agree to first attempt to resolve any dispute, controversy, or claim amicably by contacting us at{' '}
              <a href="mailto:legal@credvert.tech" className="text-credvert-goldDark dark:text-credvert-gold font-mono hover:underline font-semibold">
                legal@credvert.tech
              </a>
              . Both parties agree to negotiate in good faith for at least thirty (30) days following receipt of written notice.
            </li>
            <li>
              <strong className="text-neutral-900 dark:text-white">Jurisdiction:</strong> If an informal resolution cannot be reached within thirty (30) days, the courts located in Ahmedabad, Gujarat, India shall have exclusive jurisdiction over any litigation or legal action arising out of or relating to these Terms or the Service.
            </li>
          </ol>
        </section>

        {/* 16. Miscellaneous */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">
            16. Miscellaneous
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            These Terms, together with the Privacy Policy and any other legal notices published by Credvert, constitute the entire agreement between you and Credvert regarding the Service. If any provision of these Terms is deemed unlawful or unenforceable, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
          </p>
        </section>

        {/* 17. Legal Contact Information */}
        <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-white/[0.02] border border-black/10 dark:border-white/10 shadow-sm">
          <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <Building className="w-6 h-6 text-credvert-gold shrink-0" />
            <span>17. Legal Contact &amp; Notices</span>
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            For inquiries, legal notices, or formal communications regarding these Terms, please contact:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] space-y-1 border border-black/5 dark:border-white/5">
              <span className="text-neutral-400 dark:text-neutral-500 font-mono">Developer &amp; Operator</span>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">Jay Chauhan</p>
              <p className="text-neutral-600 dark:text-neutral-400">Ahmedabad, Gujarat, India</p>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] space-y-1.5 border border-black/5 dark:border-white/5 font-mono">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-credvert-gold" />
                <span className="text-neutral-500">Legal:</span>
                <a href="mailto:legal@credvert.tech" className="text-credvert-goldDark dark:text-credvert-gold hover:underline">
                  legal@credvert.tech
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
