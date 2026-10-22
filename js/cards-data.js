/**
 * Credvert Cards Database
 * Authentic data modeled from the Credvert backend & catalog service
 */
const CREDVERT_CARDS = [
  {
    id: 1,
    slug: 'hdfc-infinia-metal',
    name: 'HDFC Infinia Metal Edition',
    displayName: 'Infinia Metal',
    bank: 'HDFC Bank',
    bankSlug: 'hdfc',
    bankLogo: 'assets/banks/hdfc.png',
    network: 'Visa Infinite / Diners Club',
    networkLogo: 'assets/network-logo/visa.svg',
    skin: 'aurum',
    metal: true,
    last4: '9842',
    joiningFee: 12500,
    renewalFee: 12500,
    waiverSpend: 1000000, // 10 Lakhs
    pointValueInr: 1.0,
    forexMarkup: 2.0, // 2% + 18% GST = 2.36%
    returnMin: 3.3,
    returnMax: 33.3,
    basePointsPer150: 5, // 3.33%
    categoryRates: {
      'dining': { multiplier: 5, rate: 16.6, note: '5X SmartBuy Dining' },
      'flights': { multiplier: 5, rate: 16.6, note: '5X SmartBuy Flight Bookings' },
      'hotels': { multiplier: 10, rate: 33.3, note: '10X SmartBuy Hotels' },
      'online_shopping': { multiplier: 3, rate: 9.9, note: '3X SmartBuy Partner Gyftr' },
      'groceries': { multiplier: 1, rate: 3.33, note: 'Base 5 RPs / ₹150' },
      'fuel': { multiplier: 0, rate: 0, note: '1% Surcharge Waiver, No Points' },
      'rent': { multiplier: 0, rate: 0, note: 'Excluded from rewards' },
      'utilities': { multiplier: 1, rate: 3.33, note: 'Base 5 RPs / ₹150' },
      'travel': { multiplier: 5, rate: 16.6, note: '5X SmartBuy Travel' },
      'subscriptions': { multiplier: 1, rate: 3.33, note: 'Base 5 RPs / ₹150' },
      'international': { multiplier: 1, rate: 3.33, note: '2% Forex + 18% GST (Net +0.97%)' }
    },
    lounges: {
      domestic: 'Unlimited Domestic Lounge Access with Priority Pass',
      international: 'Unlimited International Lounge Access for Primary + Add-on + Guests',
      railway: 'Not applicable'
    },
    milestones: [
      '12,500 Reward Points on joining & renewal fee payment',
      'Fee waiver on spending ₹10,00,000 in an anniversary year',
      'Complimentary Club Marriott membership (up to 20% off dining & stays)',
      'Unlimited complimentary golf games worldwide'
    ],
    features: [
      'Super-premium metal card engineered from hardened duralumin',
      '1:1 Point conversion on flights and hotels through SmartBuy portal',
      'Lowest industry forex markup of 2.0% with zero international transaction cap',
      'Comprehensive ₹3 Crore air accident insurance coverage'
    ],
    overview: 'The gold standard of Indian credit cards. Offers up to 33.3% net return on hotel bookings and 16.6% on flights with 1:1 redemption ratio.',
    applyUrl: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/infinia-credit-card'
  },
  {
    id: 2,
    slug: 'sbi-cashback-credit-card',
    name: 'SBI Cashback Credit Card',
    displayName: 'Cashback SBI Card',
    bank: 'State Bank of India',
    bankSlug: 'sbi',
    bankLogo: 'assets/banks/sbi.png',
    network: 'Visa Signature',
    networkLogo: 'assets/network-logo/visa.svg',
    skin: 'emerald',
    metal: false,
    last4: '4102',
    joiningFee: 999,
    renewalFee: 999,
    waiverSpend: 200000, // 2 Lakhs
    pointValueInr: 1.0,
    forexMarkup: 3.5, // 3.5% + 18% GST = 4.13%
    returnMin: 1.0,
    returnMax: 5.0,
    basePointsPer100: 1, // 1%
    categoryRates: {
      'dining': { multiplier: 5, rate: 5.0, note: '5% Online (Swiggy/Zomato)' },
      'flights': { multiplier: 5, rate: 5.0, note: '5% Online Travel Portals' },
      'hotels': { multiplier: 5, rate: 5.0, note: '5% Online Bookings' },
      'online_shopping': { multiplier: 5, rate: 5.0, note: 'Direct 5% on Amazon, Flipkart, etc.' },
      'groceries': { multiplier: 5, rate: 5.0, note: '5% on Blinkit, Zepto, Instamart' },
      'fuel': { multiplier: 0, rate: 0, note: '1% Fuel Surcharge Waiver, No Cashback' },
      'rent': { multiplier: 0, rate: 0, note: 'Excluded from cashback' },
      'utilities': { multiplier: 1, rate: 1.0, note: '1% Statement Cashback' },
      'travel': { multiplier: 5, rate: 5.0, note: '5% Online Bookings' },
      'subscriptions': { multiplier: 5, rate: 5.0, note: '5% on Netflix, Spotify, Prime' },
      'international': { multiplier: 1, rate: 1.0, note: '1% Base (Forex fee of 4.13% exceeds return)' }
    },
    lounges: {
      domestic: 'None included (Optimized purely for cashback)',
      international: 'None',
      railway: 'None'
    },
    milestones: [
      'Direct monthly cashback credited automatically to card statement',
      'Annual fee of ₹999 waived on spending ₹2,00,000 annually',
      'Up to ₹5,000 cashback per billing cycle on online spends'
    ],
    features: [
      'Unrestricted 5% cashback on virtually every online merchant without brand lock-in',
      'Cashback auto-credits to statement within 2 days of bill generation',
      '1% cashback on offline retail spends with no maximum cap',
      '1% fuel surcharge waiver on transactions between ₹500 and ₹3,000'
    ],
    overview: 'The undisputed king of direct cashback. Delivers straight 5% savings on all online spends with zero coupon codes or complex point conversions.',
    applyUrl: 'https://www.sbicard.com/en/personal/credit-cards/rewards/cashback-sbi-card.page'
  },
  {
    id: 3,
    slug: 'axis-atlas-credit-card',
    name: 'Axis Bank Atlas Credit Card',
    displayName: 'Axis Atlas',
    bank: 'Axis Bank',
    bankSlug: 'axis',
    bankLogo: 'assets/banks/axis.png',
    network: 'Mastercard World',
    networkLogo: 'assets/network-logo/Mastercard.svg',
    skin: 'sapphire',
    metal: false,
    last4: '7721',
    joiningFee: 5000,
    renewalFee: 5000,
    waiverSpend: 1500000,
    pointValueInr: 2.0, // 1 EDGE Mile = 2 Partner Points (Accor/Singapore)
    forexMarkup: 3.5,
    returnMin: 4.0,
    returnMax: 10.0,
    basePointsPer100: 2,
    categoryRates: {
      'dining': { multiplier: 2, rate: 4.0, note: '2 EDGE Miles = 4 Partner Miles (4%)' },
      'flights': { multiplier: 5, rate: 10.0, note: '5 EDGE Miles direct airline/hotel (10%)' },
      'hotels': { multiplier: 5, rate: 10.0, note: '5 EDGE Miles direct airline/hotel (10%)' },
      'online_shopping': { multiplier: 2, rate: 4.0, note: '2 EDGE Miles per ₹100 (4%)' },
      'groceries': { multiplier: 2, rate: 4.0, note: '2 EDGE Miles per ₹100 (4%)' },
      'fuel': { multiplier: 0, rate: 0, note: 'Excluded from miles' },
      'rent': { multiplier: 0, rate: 0, note: 'Excluded from miles' },
      'utilities': { multiplier: 2, rate: 4.0, note: '2 EDGE Miles per ₹100 (4%)' },
      'travel': { multiplier: 5, rate: 10.0, note: '5 EDGE Miles = 10% Travel Value' },
      'subscriptions': { multiplier: 2, rate: 4.0, note: '2 EDGE Miles per ₹100 (4%)' },
      'international': { multiplier: 2, rate: 4.0, note: '4% travel value offset by 4.13% forex' }
    },
    lounges: {
      domestic: 'Up to 12 Domestic Lounge Visits based on Tier Status',
      international: 'Up to 6 International Lounge Visits via DreamFolks',
      railway: 'Not applicable'
    },
    milestones: [
      '5,000 Bonus EDGE Miles (₹10,000 travel value) on 1st transaction within 30 days',
      'Silver Tier upgrade at ₹3 Lakhs spend (2,500 bonus miles)',
      'Gold Tier upgrade at ₹7.5 Lakhs spend (5,000 bonus miles)',
      'Platinum Tier upgrade at ₹15 Lakhs spend (10,000 bonus miles)'
    ],
    features: [
      'Direct 1:2 transfer ratio to Accor ALL, Singapore Krisflyer, Qatar Airways, Turkish Airlines',
      '5 EDGE Miles on direct airline and hotel spends with no aggregator requirement',
      'Comprehensive milestone ladder yielding up to 22,500 bonus miles annually',
      'Complimentary airport concierge meet & greet services at tier milestones'
    ],
    overview: 'The undisputed travel enthusiast card. Earns transferrable EDGE Miles converting at 1:2 to Accor ALL Points (₹1.80/point) giving unmatched hotel value.',
    applyUrl: 'https://www.axisbank.com/retail/cards/credit-card/atlas-credit-card'
  },
  {
    id: 4,
    slug: 'amex-platinum-travel',
    name: 'American Express Platinum Travel',
    displayName: 'Amex Plat Travel',
    bank: 'American Express',
    bankSlug: 'amex',
    bankLogo: 'assets/network-logo/amex.svg',
    network: 'American Express',
    networkLogo: 'assets/network-logo/amex.svg',
    skin: 'titanium',
    metal: false,
    last4: '1008',
    joiningFee: 3500,
    renewalFee: 5000,
    waiverSpend: 0,
    pointValueInr: 0.5,
    forexMarkup: 3.5,
    returnMin: 2.0,
    returnMax: 8.5,
    categoryRates: {
      'dining': { multiplier: 1, rate: 2.0, note: 'Base Points + Milestone Acceleration' },
      'flights': { multiplier: 1, rate: 2.0, note: 'Milestone spends count 100%' },
      'hotels': { multiplier: 1, rate: 2.0, note: 'Milestone spends count 100%' },
      'online_shopping': { multiplier: 1, rate: 2.0, note: 'Milestone spends count 100%' },
      'groceries': { multiplier: 1, rate: 2.0, note: 'Milestone spends count 100%' },
      'fuel': { multiplier: 0, rate: 0, note: '0% Surcharge at HPCL outlets' },
      'rent': { multiplier: 0, rate: 0, note: 'Excluded from milestones' },
      'utilities': { multiplier: 1, rate: 2.0, note: 'Counts toward milestone spend' },
      'travel': { multiplier: 1, rate: 2.0, note: 'Counts toward milestone spend' },
      'subscriptions': { multiplier: 1, rate: 2.0, note: 'Counts toward milestone spend' },
      'international': { multiplier: 1, rate: 2.0, note: 'Base rewards' }
    },
    lounges: {
      domestic: '8 Complimentary Domestic Airport Lounge Visits per year (2/quarter)',
      international: 'Access via Priority Pass (charges apply)',
      railway: 'None'
    },
    milestones: [
      '15,000 Membership Rewards points on spending ₹1.9 Lakhs',
      '25,000 Membership Rewards points on reaching ₹4 Lakhs spend',
      'Complimentary ₹10,000 Taj Hotels Stay Voucher on ₹4 Lakhs annual spend',
      'Net reward value of ₹32,000+ on ₹4 Lakhs annual spend (~8% overall return)'
    ],
    features: [
      'World-class 24x7 American Express customer concierge service',
      'Instant dispute resolution and zero fraud liability guarantee',
      'Transfer Membership Rewards to Marriott Bonvoy, Hilton Honors, Emirates Skywards',
      'Complimentary Priority Pass membership'
    ],
    overview: 'The benchmark milestone card in India. Spend exactly ₹4,00,000 per year to unlock 48,000 MR points + ₹10,000 Taj Voucher for an outstanding 8% ROI.',
    applyUrl: 'https://www.americanexpress.com/in/credit-cards/platinum-travel-card/'
  },
  {
    id: 5,
    slug: 'icici-emeralde-private-metal',
    name: 'ICICI Emeralde Private Metal',
    displayName: 'Emeralde Private',
    bank: 'ICICI Bank',
    bankSlug: 'icici',
    bankLogo: 'assets/banks/icici.png',
    network: 'Mastercard World Elite / Visa Infinite',
    networkLogo: 'assets/network-logo/Mastercard.svg',
    skin: 'obsidian',
    metal: true,
    last4: '5519',
    joiningFee: 12499,
    renewalFee: 12499,
    waiverSpend: 1000000,
    pointValueInr: 1.0,
    forexMarkup: 1.5, // Ultra low 1.5%
    returnMin: 3.0,
    returnMax: 6.0,
    categoryRates: {
      'dining': { multiplier: 3, rate: 6.0, note: '6 RPs per ₹200 (3% - 6%)' },
      'flights': { multiplier: 3, rate: 6.0, note: '3% Air travel redemption' },
      'hotels': { multiplier: 3, rate: 6.0, note: '3% Hotel stay redemption' },
      'online_shopping': { multiplier: 3, rate: 6.0, note: '6 RPs per ₹200' },
      'groceries': { multiplier: 3, rate: 6.0, note: '6 RPs per ₹200' },
      'fuel': { multiplier: 0, rate: 0, note: '1% Fuel Surcharge Waiver' },
      'rent': { multiplier: 0, rate: 0, note: 'Excluded' },
      'utilities': { multiplier: 3, rate: 6.0, note: '6 RPs per ₹200' },
      'travel': { multiplier: 3, rate: 6.0, note: '6 RPs per ₹200' },
      'subscriptions': { multiplier: 3, rate: 6.0, note: '6 RPs per ₹200' },
      'international': { multiplier: 3, rate: 6.0, note: 'Lowest 1.5% Forex fee (Net +4.23%)' }
    },
    lounges: {
      domestic: 'Unlimited Domestic Lounge Access for Primary & Add-on cardholders',
      international: 'Unlimited International Lounge Access with Priority Pass + Guests',
      railway: 'Unlimited Railway Lounge Access'
    },
    milestones: [
      '12,500 Reward Points or Taj Epicure membership on renewal',
      'Complimentary EaseMyTrip flight vouchers on ₹8 Lakhs spend',
      'Buy 1 Get 1 Free on BookMyShow up to ₹750/ticket (up to 4 times a month)',
      'Unlimited complimentary golf games per month'
    ],
    features: [
      'Handcrafted heavy metal card with diamond-cut edge detailing',
      'Ultra-low 1.5% foreign currency markup with zero hidden transaction costs',
      'No point expiry across the lifetime of the credit card account',
      'Unlimited international airport lounge access with guest privileges'
    ],
    overview: 'ICICI Bank’s flagship ultra-luxury metal card. Best-in-class for international travel with its 1.5% low forex markup and unconstrained airport lounge perks.',
    applyUrl: 'https://www.icicibank.com/personal-banking/cards/credit-card/emeralde-private-metal-card'
  },
  {
    id: 6,
    slug: 'idfc-first-wealth',
    name: 'IDFC FIRST Wealth Credit Card',
    displayName: 'IDFC FIRST Wealth',
    bank: 'IDFC FIRST Bank',
    bankSlug: 'idfc',
    bankLogo: 'assets/banks/icici.png',
    network: 'Visa Infinite',
    networkLogo: 'assets/network-logo/visa.svg',
    skin: 'rosso',
    metal: false,
    last4: '3349',
    joiningFee: 0,
    renewalFee: 0,
    waiverSpend: 0, // Lifetime Free
    pointValueInr: 0.25,
    forexMarkup: 1.5,
    returnMin: 1.5,
    returnMax: 2.5,
    categoryRates: {
      'dining': { multiplier: 2, rate: 2.5, note: '10X points above ₹30k/month' },
      'flights': { multiplier: 2, rate: 2.5, note: '10X points above ₹30k/month' },
      'hotels': { multiplier: 2, rate: 2.5, note: '10X points above ₹30k/month' },
      'online_shopping': { multiplier: 2, rate: 2.5, note: '10X points above ₹30k/month' },
      'groceries': { multiplier: 1, rate: 1.5, note: '6X points on online spends' },
      'fuel': { multiplier: 0, rate: 0, note: 'Surcharge waiver at all stations' },
      'rent': { multiplier: 0, rate: 0, note: 'Excluded' },
      'utilities': { multiplier: 1, rate: 1.5, note: 'Base earn rate' },
      'travel': { multiplier: 2, rate: 2.5, note: '10X points above ₹30k' },
      'subscriptions': { multiplier: 1, rate: 1.5, note: 'Base earn rate' },
      'international': { multiplier: 1.5, rate: 2.5, note: 'Lowest 1.5% Forex fee' }
    },
    lounges: {
      domestic: '4 Complimentary Domestic Airport Lounge & Spa visits per quarter',
      international: '4 Complimentary International Lounge visits per quarter via DreamFolks',
      railway: '4 Complimentary Railway Lounge visits per quarter'
    },
    milestones: [
      '100% Lifetime Free with zero joining or annual maintenance fees ever',
      '10X reward points on all incremental spends above ₹30,000 every month',
      'Buy 1 Get 1 Free movie tickets up to ₹500 on Paytm Movies twice a month',
      'Free airport spa visits across major Indian metro terminals'
    ],
    features: [
      'Zero annual fee with premium Visa Infinite concierge and golf privileges',
      'Reward points that never expire and can be redeemed directly against statement balance',
      'Ultra-low dynamic interest APR starting at just 9% p.a.',
      'Roadside assistance (RSA) worth ₹1,399 complimentary across India'
    ],
    overview: 'The highest-tier Lifetime Free (LTF) credit card in India. Offers complimentary domestic/international lounges and free airport spa access with zero annual commitments.',
    applyUrl: 'https://www.idfcfirstbank.com/credit-card/wealth'
  },
  {
    id: 7,
    slug: 'tata-neu-infinity-hdfc',
    name: 'Tata Neu Infinity HDFC Card',
    displayName: 'Tata Neu Infinity',
    bank: 'HDFC Bank',
    bankSlug: 'hdfc',
    bankLogo: 'assets/banks/hdfc.png',
    network: 'RuPay / Visa',
    networkLogo: 'assets/network-logo/RuPay.svg',
    skin: 'amethyst',
    metal: false,
    last4: '8214',
    joiningFee: 1499,
    renewalFee: 1499,
    waiverSpend: 300000,
    pointValueInr: 1.0, // 1 NeuCoin = ₹1.00
    forexMarkup: 2.0,
    returnMin: 1.5,
    returnMax: 10.0,
    categoryRates: {
      'dining': { multiplier: 5, rate: 5.0, note: '5% NeuCoins on Tata Neu Dining' },
      'flights': { multiplier: 5, rate: 5.0, note: '5% on Air India / Air India Express' },
      'hotels': { multiplier: 10, rate: 10.0, note: '10% on Taj, Vivanta, SeleQtions stays' },
      'online_shopping': { multiplier: 10, rate: 10.0, note: '10% on BigBasket, 1mg, Croma' },
      'groceries': { multiplier: 10, rate: 10.0, note: '10% on BigBasket online grocery' },
      'fuel': { multiplier: 0, rate: 0, note: '1% Fuel Surcharge Waiver' },
      'rent': { multiplier: 0, rate: 0, note: 'Excluded' },
      'utilities': { multiplier: 5, rate: 5.0, note: '5% on Tata Neu BillPay' },
      'travel': { multiplier: 5, rate: 5.0, note: '5% on Tata Neu Flights & Hotels' },
      'subscriptions': { multiplier: 1.5, rate: 1.5, note: '1.5% Base NeuCoins' },
      'international': { multiplier: 1.5, rate: 1.5, note: '2% Forex Markup' }
    },
    lounges: {
      domestic: '8 Complimentary Domestic Airport Lounge Visits per year (2/quarter)',
      international: '4 Complimentary International Lounge Visits via Priority Pass',
      railway: 'None'
    },
    milestones: [
      '1,499 NeuCoins welcome bonus upon card activation',
      'Annual fee waiver upon spending ₹3 Lakhs in a card anniversary year',
      'UPI payment enabled on RuPay variant with 1.5% NeuCoins on UPI spends'
    ],
    features: [
      '10% direct value on Tata ecosystem brands (Croma, BigBasket, 1mg, Tata CLiQ)',
      '1 NeuCoin = ₹1 on Tata Neu app with 100% redemption liquidity',
      'Seamless RuPay UPI QR code scanning at any merchant in India',
      '2% low forex markup on international transactions'
    ],
    overview: 'The supreme card for Tata ecosystem power shoppers and UPI users. Delivers 10% value on BigBasket, Croma, and 1mg with 1 NeuCoin = ₹1 direct redemption.',
    applyUrl: 'https://www.tataneu.com/financial-services/credit-card'
  }
];

const CREDVERT_OFFERS = [
  {
    id: 1,
    merchant: 'Swiggy & Zomato',
    category: 'Dining',
    headline: 'Up to 20% Instant Discount on Gourmet Dining',
    badge: 'Exclusive Deal',
    cardSlug: 'hdfc-infinia-metal',
    cardName: 'HDFC Infinia Metal',
    code: 'INFINIADINE',
    expires: 'Valid till 31 Dec 2026',
    discount: '20% OFF',
    icon: 'utensils'
  },
  {
    id: 2,
    merchant: 'Amazon Great Indian Festival',
    category: 'Shopping',
    headline: 'Flat 5% Direct Statement Cashback + 10% Instant Bank Off',
    badge: 'Top Cashback',
    cardSlug: 'sbi-cashback-credit-card',
    cardName: 'SBI Cashback Card',
    code: 'AUTO-APPLY',
    expires: 'Valid Ongoing',
    discount: '5% STATEMENT CREDIT',
    icon: 'shopping-bag'
  },
  {
    id: 3,
    merchant: 'MakeMyTrip & Singapore Airlines',
    category: 'Travel',
    headline: 'Earn 5X EDGE Miles + 1:2 Transfer to KrisFlyer',
    badge: 'Travel Perk',
    cardSlug: 'axis-atlas-credit-card',
    cardName: 'Axis Atlas',
    code: 'ATLASTICKETS',
    expires: 'Valid till 15 Nov 2026',
    discount: '10% TRAVEL VALUE',
    icon: 'plane'
  },
  {
    id: 4,
    merchant: 'BookMyShow',
    category: 'Entertainment',
    headline: 'Buy 1 Get 1 Free Ticket up to ₹750/ticket twice monthly',
    badge: 'Weekend Special',
    cardSlug: 'icici-emeralde-private-metal',
    cardName: 'ICICI Emeralde Metal',
    code: 'ICICIBOGO',
    expires: 'Valid on Weekends',
    discount: 'BOGO ₹750',
    icon: 'film'
  },
  {
    id: 5,
    merchant: 'Taj, Vivanta & SeleQtions Hotels',
    category: 'Luxury Stays',
    headline: 'Complimentary ₹10,000 Stay Voucher on ₹4L Milestone',
    badge: 'Milestone Perk',
    cardSlug: 'amex-platinum-travel',
    cardName: 'Amex Plat Travel',
    code: 'TAJMILSTONE',
    expires: 'Annual Anniversary',
    discount: '₹10,000 VOUCHER',
    icon: 'sparkles'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CREDVERT_CARDS, CREDVERT_OFFERS };
}
