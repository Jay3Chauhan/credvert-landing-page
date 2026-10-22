# Credvert — Product Website & Interactive Experience

> **"The right card, every checkout."**  
> An ultra-luxury product website and interactive intelligence portal for **Credvert** (CreditVance), engineered to showcase the smart credit card recommendation engine, zero-knowledge biometric hardware vault, and on-device DPDP-compliant SMS expense tracking.

---

## 🌟 Executive Overview & Architectural Highlights

This product website is built to reflect the full architectural capabilities of both the frontend Flutter application ([CreditVance](https://github.com/Jay3Chauhan/CreditVance)) and the FastAPI Python backend ([CreditVance-Backend](https://github.com/Jay3Chauhan/CreditVance-Backend)).

### 1. Luxury Design System & Aesthetic Language
- **Palette**: Dark Obsidian (`#09090C`, `#111217`, `#17191F`, `#1F222A`), Aurum Gold (`#D6B06A`, `#F1D9A3`, `#9C7430`), Emerald (`#10B981`), Sapphire (`#3B82F6`), and Titanium.
- **Warm Ivory Light Mode**: Seamless theme switching with persistent localStorage preferences.
- **Glassmorphism**: Frosted borders (`backdrop-filter: blur(20px)`), subtle ambient gradients, and reactive lighting.
- **Typography**: Google Fonts pairing `Plus Jakarta Sans` for crisp interfaces, `Outfit` for luxury display headings, and `JetBrains Mono` for code and hashes.

---

## 🚀 Key Interactive Features

### 1. 3D Credit Card Hero Showcase
- **Perspective Parallax Tilt**: Real-time 3D rotation (`rotateX`, `rotateY`) reacting to pointer and touch coordinates with specular lighting sheen.
- **Interactive Switcher**: Cycle between 7 authentic cards (HDFC Infinia Metal, SBI Cashback, Axis Atlas, Amex Platinum Travel, ICICI Emeralde Private Metal, IDFC FIRST Wealth, Tata Neu Infinity HDFC).
- **Dual-Sided Card Flip**: Inspect the front EMV microchip and contactless NFC icon, or flip to view the magnetic stripe, signature panel, and CVV.
- **Biometric Enclave Simulation**: Tap *Reveal Details* to simulate Touch ID / Face ID hardware unlock, or *Copy* to test zero-knowledge clipboard mechanics.

### 2. Live Advisor Recommendation Simulator
- **Exact Algorithm from Backend `advisor_service.py`**:
  - Evaluates 10 categories: Dining, Flights, Hotels, Online Shopping, Groceries, Fuel, Utilities, Rent, Streaming, and International.
  - Interactive spend slider from ₹500 to ₹2,50,000 with quick presets.
  - **Forex Markup & GST Penalty**: Accounts for bank forex markup (2.0% - 3.5%) plus 18% GST (`markup x 1.18`), revealing true net savings.
  - Dynamic output showing the winning card, net return %, calculated earnings in ₹, key rationale, and ranked runners-up.

### 3. On-Device SMS Spend Intelligence Sandbox
- **DPDP Act 2023 & Zero-Knowledge Architecture**:
  - Live simulator replicating Flutter on-device Dart NLP regex.
  - Test pre-loaded bank alert SMS samples (HDFC, SBI, Axis, ICICI) or type custom text.
  - Real-time client-side extraction in **0.018ms**: detects Bank Header, Card Last 4, Merchant Name, Spend Amount, and Category.
  - Computes one-way cryptographic **SHA-256 dedupe hash** demonstrating that raw SMS messages never touch cloud infrastructure.

### 4. Annual Rewards & Milestone ROI Calculator
- Granular monthly category distribution sliders (Shopping, Dining, Flights, Groceries, Fuel, Utilities).
- Simulates annual spend x 12, gross reward earnings, and fee waiver triggers (e.g. ₹10 Lakhs spend threshold for Infinia's ₹12,500 fee waiver).
- Computes milestone bonuses (e.g. ₹10,000 Taj luxury vouchers, airport lounge access savings).

### 5. Comprehensive Card Catalog & Side-by-Side Comparison Matrix
- 7+ fully populated cards with live specs: Joining & Renewal Fees, Waiver Spend, Return Rates, Forex Fees, and Lounge Access tiers.
- Category filters: *All*, *Cashback*, *Travel & Miles*, *Metal Editions*, *Lifetime Free (LTF)*, *Fuel*.
- Real-time search typeahead.
- **Floating Comparison Dock**: Select up to 3 cards simultaneously to open a side-by-side comparison modal.

### 6. Curated Offers & Perks Explorer
- Exclusive verified deals (Swiggy 20% off, Amazon 5% statement credit, MakeMyTrip 5X EDGE Miles, BookMyShow B1G1 up to ₹750) with one-click promo code copying.

### 7. App Download Modal with Live QR Code
- Scalable vector QR code for scanning on mobile smartphones.
- Direct links to GitHub repositories, releases, and documentation.

---

## 📂 Project Structure

```
Credvert/
├── index.html               # Master luxury product experience
├── server.js                # Built-in lightweight zero-dependency HTTP server
├── css/
│   ├── premium.css          # Master luxury design tokens, glassmorphism, 3D skins, parallax
│   ├── main.css             # Base styles (v1)
│   └── animations.css       # Core keyframe libraries
├── js/
│   ├── cards-data.js        # Catalog database modeled from Credvert backend
│   ├── advisor-engine.js    # Recommendation algorithm with forex GST & multipliers
│   ├── sms-engine.js        # DPDP on-device regex parser & SHA-256 dedupe hasher
│   ├── calculator-engine.js # Annual reward & milestone ROI calculations
│   ├── interactions.js      # Premium interactions: 3D tilt, parallax, reveals, counters, magnetic buttons
│   └── app-v2.js            # App orchestrator: advisor, SMS, calculator, catalog, compare, modals
├── assets/
│   ├── favicon.png          # High-resolution brand favicon
│   ├── network-logo/        # Vector SVGs (Visa, Mastercard, RuPay, Amex, Diners Club)
│   └── banks/               # Bank identity logos (HDFC, SBI, ICICI, Axis)
├── privacy.html             # India DPDP 2023 & GDPR Privacy Policy
├── terms.html               # Terms of Service & Security Guidelines
└── deletion.html            # DPDP Right to Erasure & Data Deletion Portal
```

---

## 🏃‍♂️ How to Run Locally

### Option 1: Built-in Node.js Server (Recommended)
Run with Node or `agy-node`:
```bash
node server.js
# Or with Antigravity Node:
agy-node server.js
```
Open your browser at:
```
http://localhost:3000
```

### Option 2: Direct Static Browser Launch
You can also directly open `index.html` in any modern web browser (Google Chrome, Apple Safari, Microsoft Edge, Mozilla Firefox). All styles, fonts, and scripts work out of the box.

---

## ⚖️ Legal & Compliance
- **Designated Grievance Redressal Officer**: Jay Chauhan (`grievance@credvert.app`)
- **Support**: `support@credvert.app`
- **Location**: Ahmedabad, Gujarat, India
- **Compliance**: DPDP Act 2023, RBI Digital Lending & Card Vault Guidelines.
