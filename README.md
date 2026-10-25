# credVert. — Intelligent Credit Card Advisor & Hardware Vault

> **"The right card, every checkout."**  
> Modern, ultra-luxury Next.js + Tailwind CSS product experience and interactive fintech portal for **Credvert**, engineered with Apple-grade fluid interface physics, zero-knowledge on-device DPDP spend intelligence, and Claude 3.5 Sonnet tool-calling AI Copilot.
>
> 🌐 **Live Production Domain:** [https://credvert.tech](https://credvert.tech)  
> 📱 **Client App Repository:** [CreditVance Flutter Client](https://github.com/Jay3Chauhan/CreditVance.git)  
> ⚡ **Cloud Engine Repository:** [CreditVance FastAPI Backend](https://github.com/Jay3Chauhan/CreditVance-Backend.git)

---

## 💎 Architectural Highlights & Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components, TypeScript)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with custom luxury color tokens, typography, and range slider controls
- **Physics & Motion**: [Framer Motion 11](https://www.framer.com/motion/) tuned to Apple WWDC *Designing Fluid Interfaces* specs (critically damped springs $\zeta \approx 0.85 - 1.0$, interruptible 3D perspective tilt)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Brand Typography**: Google Fonts (`Outfit` for luxury display, `Plus Jakarta Sans` for body, `JetBrains Mono` for cryptographic hashes and execution telemetry)
- **Sound Design**: Pure Web Audio API synthesized haptic feedback (clicks, chimes, card flips) with mobile vibration integration (`navigator.vibrate`)
- **Deployment**: [Vercel](https://vercel.com/) with automated edge caching, security headers, and instant Git deployments

---

## 🚀 Interactive Features

### 1. 3D Credit Card Hero with Apple Spring Physics
- Real-time 3D perspective tilt tracking cursor and touch coordinates (`perspective: 1200px`, `rotateX`, `rotateY`, specular lighting gloss).
- Dual-sided card flip revealing EMV chip, contactless NFC antenna, magnetic stripe, and signature panel.
- Biometric scan line simulation with Touch ID / Face ID hardware unlock.
- Segmented glider dock cycling between 7 authentic cards (HDFC Infinia Metal, SBI Cashback, Axis Atlas, Amex Platinum Travel, ICICI Emeralde Metal, IDFC FIRST Wealth, Tata Neu Infinity HDFC).

### 2. Live Claude 3.5 Sonnet AI Copilot Simulation
- Demonstrates advanced Anthropic tool-calling architecture:
  - `catalog.evaluate_category({ category, spend, portal })`
  - `partner_miles.simulate_transfer({ card, ratio })`
  - `forex.calculate_net_markup({ fee, gst })`
- 4 interactive real-world fintech scenarios (Singapore Airlines flights, MacBook Pro purchase, Bali dining with forex, NeuCoins UPI payment).

### 3. On-Device SMS Spend Intelligence Sandbox
- Replicates the on-device regex parsing pipeline compliant with India's **Digital Personal Data Protection (DPDP) Act 2023 §6**.
- Processes incoming bank transaction alerts in **< 0.02ms** directly in device RAM.
- Generates idempotent one-way SHA-256 dedupe fingerprints with zero OTP reading and zero cloud leakage.

### 4. Annual Rewards & Milestone ROI Calculator
- 6 granular lifestyle spend sliders (Online Shopping, Flights & Hotels, Dining, Groceries, Fuel, Utilities).
- Computes annual spend run-rates, gross reward earnings, milestone unlocks (e.g. ₹10,000 Taj vouchers), and fee waivers.

### 5. Curated Card Catalog & Floating Comparison Dock
- 7 audited cards with fee structures, GST-inclusive forex markups, and lounge privileges.
- Filter tabs (*All*, *Metal*, *Travel*, *Cashback*, *Low Fee*) and search typeahead.
- Select up to 3 cards simultaneously to activate the floating dock and trigger a side-by-side comparison matrix.

### 6. Curated Cardholder Perks & Verified Coupons
- Live discount codes (Swiggy, Amazon India, MakeMyTrip, BookMyShow) with click-to-copy haptics and toast alerts.

### 7. Zero-Knowledge Hardware Enclave Security
- Apple Secure Enclave & Android Keystore hardware HSM integration.
- Dedicated statutory DPDP compliance documentation and one-tap **Right to Erasure** portal (`/deletion`).

---

## 🎨 Official Brand Identity (`credVert.`)

Extracted from `/Users/jay/Downloads/credvert` into pure scalable vector SVGs:
- **`public/assets/brand/credvert-gold.svg`**: Master gold vector wordmark (`#C5A880`, `#E5C79E`)
- **`public/assets/brand/credvert-white.svg`**: Clean white vector wordmark for dark headers
- **`public/assets/brand/credvert-dark.svg`**: Deep obsidian vector wordmark for light containers
- **`public/assets/brand/credvert-mark.svg`**: Continuous squircle monogram brandmark
- **`public/favicon.png`**: High-resolution icon rendered from vector geometry

---

## 🤖 AI Startup Programs Integration Guide

If you are applying for startup programs (such as **Anthropic Claude for Startups**, **Google for Startups Cloud Program**, **AWS Activate**, or **Microsoft for Startups**):

### 1. The Value Proposition for LLMs
Credvert utilizes a **Hybrid Edge-Cloud Architecture**:
- **Edge Layer (Client)**: Local on-device regex tokenizes and scrubs all Personally Identifiable Information (PII), OTPs, and account numbers inside device memory.
- **LLM Reasoning Layer (Cloud)**: Sanitized transaction tuples (`{ merchant: "Singapore Airlines", amount: 85000, currency: "INR" }`) are passed to **Claude 3.5 Sonnet** using structured JSON tool-calling to evaluate optimal airline partner transfer ratios and milestone accelerators in real time.

### 2. Recommended Tech Stack for AI Integration
- **Model**: `claude-3-5-sonnet-20241022` via Anthropic API or Amazon Bedrock
- **Framework**: Vercel AI SDK (`ai` npm package) with streaming UI (`useChat` or `streamText`)
- **Tool Calling**: Define Zod schemas for `getCardCatalog`, `calculateForex`, `simulateMilesTransfer`
- **Privacy Assurance**: Emphasize to evaluators that Credvert adheres to DPDP Act 2023 §6 consent architecture and Google Play Financial Services policies.

---

## 🚢 Local Development & Vercel Deployment

### 1. Local Development
```bash
# Install dependencies
npm install

# Start local Next.js development server
npm run dev

# Open in browser: http://localhost:3000
```

### 2. Production Build
```bash
# Build optimized static and dynamic Next.js routes
npm run build

# Start production server
npm run start
```

### 3. Vercel Deployment
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete Next.js + Tailwind rewrite with Apple design and brand assets"
   git push origin main
   ```
2. In the [Vercel Dashboard](https://vercel.com/new):
   - Import `Jay3Chauhan/credvert-landing-page`
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `next build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
3. Set your Custom Domain to **`credvert.tech`** with DNS records pointing to Vercel CNAME `cname.vercel-dns.com`.

---

## ⚖️ Legal & Contact

- **Founder & Architect**: Jay Chauhan
- **Official Domain**: [https://credvert.tech](https://credvert.tech)
- **Support**: [support@credvert.tech](mailto:support@credvert.tech)
- **DPDP Grievance Officer**: [grievance@credvert.tech](mailto:grievance@credvert.tech)
- **Legal Counsel**: [legal@credvert.tech](mailto:legal@credvert.tech)
- **Headquarters**: Ahmedabad, Gujarat, India
- **Compliance**: Digital Personal Data Protection Act 2023, GDPR Article 17, Google Play Financial Services Policy
