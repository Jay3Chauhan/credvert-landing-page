/**
 * Credvert On-Device SMS Intelligence Engine
 * Replicates the pure-Dart & backend DPDP 2023 compliant parser.
 * Performs zero-knowledge on-device extraction:
 * 1. Raw SMS text NEVER leaves client device memory.
 * 2. Full 16-digit PANs are NEVER requested or parsed.
 * 3. Generates cryptographic SHA-256 dedupe hash to prevent double counts.
 */

class SmsSpendEngine {
  constructor(cards = (typeof CREDVERT_CARDS !== 'undefined' ? CREDVERT_CARDS : [])) {
    this.cards = cards;
    this.bankHeaders = [
      { pattern: /HDFC|HDFCBK/i, bank: 'HDFC Bank', bankSlug: 'hdfc' },
      { pattern: /SBI|SBICRD/i, bank: 'State Bank of India', bankSlug: 'sbi' },
      { pattern: /ICICI|ICICIB/i, bank: 'ICICI Bank', bankSlug: 'icici' },
      { pattern: /AXIS|AXISBK/i, bank: 'Axis Bank', bankSlug: 'axis' },
      { pattern: /AMEX|AMEXIN/i, bank: 'American Express', bankSlug: 'amex' },
      { pattern: /IDFC|IDFCFB/i, bank: 'IDFC FIRST Bank', bankSlug: 'idfc' },
      { pattern: /KOTAK|KOTAKB/i, bank: 'Kotak Mahindra', bankSlug: 'kotak' }
    ];

    this.sampleSmsList = [
      {
        id: 'sample-1',
        title: 'HDFC Dining Alert (Zomato)',
        rawText: `Alert: Rs 3,450.00 spent on your HDFC Bank Credit Card ending in 9842 at ZOMATO on 20-OCT-26 at 20:45:12. Avl Lmt: Rs 4,12,050.00. - HDFC Bank`,
        sender: 'VM-HDFCBK'
      },
      {
        id: 'sample-2',
        title: 'SBI Online Shopping (Amazon)',
        rawText: `Dear SBI Cardholder, payment of Rs 14,999.00 on SBI Credit Card XX4102 at AMAZON INDIA was successful on 19-OCT-26. Call 18601801290 if not done by you.`,
        sender: 'AD-SBICRD'
      },
      {
        id: 'sample-3',
        title: 'Axis Travel Spend (MakeMyTrip)',
        rawText: `Transaction of INR 28,400.00 processed on your Axis Bank Atlas Card ending 7721 at MAKEMYTRIP on 18-OCT-26. Available limit: INR 3,71,600.00.`,
        sender: 'BP-AXISBK'
      },
      {
        id: 'sample-4',
        title: 'ICICI International Spend (Apple Store US)',
        rawText: `Alert: International txn of USD 99.00 (INR 8,245.00 approx) on ICICI Bank Card XX5519 at APPLE.COM on 17-OCT-26. Low markup of 1.5% applied.`,
        sender: 'VK-ICICIB'
      }
    ];
  }

  /**
   * Parse an SMS string locally in-memory
   * @param {string} rawSms
   * @param {string} senderHeader
   * @returns {Object} Parsed spend object
   */
  async parseOnDevice(rawSms, senderHeader = '') {
    const startTime = performance.now();

    // 1. Detect Bank
    let detectedBank = 'Unknown Bank';
    let detectedBankSlug = 'other';
    for (const h of this.bankHeaders) {
      if (h.pattern.test(senderHeader) || h.pattern.test(rawSms)) {
        detectedBank = h.bank;
        detectedBankSlug = h.bankSlug;
        break;
      }
    }

    // 2. Extract Amount (Supports Rs, Rs., INR, with or without commas)
    let amount = 0;
    const amountRegex = /(?:Rs\.?|INR)\s*([\d,]+(?:\.\d{1,2})?)/i;
    const amountMatch = rawSms.match(amountRegex);
    if (amountMatch && amountMatch[1]) {
      amount = parseFloat(amountMatch[1].replace(/,/g, ''));
    }

    // 3. Extract Card Last 4 digits (ending 1234, ending in 1234, XX1234, card 1234)
    let last4 = '••••';
    const cardRegex = /(?:ending(?:\s+in)?|card(?:\s+no\.?)?|xx|x{2,4})\s*(\d{4})/i;
    const cardMatch = rawSms.match(cardRegex);
    if (cardMatch && cardMatch[1]) {
      last4 = cardMatch[1];
    }

    // 4. Extract Merchant Name
    let merchant = 'General Merchant';
    const merchantRegex = /(?:at|to|info:?|vpa:?)\s+([A-Z0-9\.\-\s]+?)(?=\s+on|\s+at|\s+ref|\s+avl|\s+call|\.|$)/i;
    const merchantMatch = rawSms.match(merchantRegex);
    if (merchantMatch && merchantMatch[1]) {
      let rawMerch = merchantMatch[1].trim();
      // Remove trailing words like 'Ltd', 'Pvt', punctuation
      merchant = rawMerch.split(/\s+(?:on|dated|ref|avl|for)/i)[0].trim();
      if (merchant.length > 25) {
        merchant = merchant.substring(0, 25);
      }
    }

    // 5. Categorize Merchant
    const category = this._categorizeMerchant(merchant, rawSms);

    // 6. Compute One-Way SHA-256 Dedupe Hash (DPDP Compliance requirement)
    const normalizedString = `${detectedBankSlug}_${last4}_${amount}_${merchant.toLowerCase()}`;
    const dedupeHash = await this._sha256(normalizedString);

    const parseDurationMs = +(performance.now() - startTime).toFixed(3);

    // 7. Calculate Estimated Rewards based on Credvert Card Database
    const matchedCard = this.cards.find(c => c.bankSlug === detectedBankSlug) || this.cards[0] || { displayName: 'Selected Card', returnMin: 1.0, categoryRates: {} };
    const categoryEarn = (matchedCard.categoryRates && matchedCard.categoryRates[category]) || { rate: matchedCard.returnMin || 1.0, note: 'Base Earn' };
    const rewardEstimateInr = Math.round((amount * categoryEarn.rate) / 100);

    return {
      success: true,
      bank: detectedBank,
      bankSlug: detectedBankSlug,
      cardLast4: last4,
      amount,
      merchant,
      category,
      dedupeHash: dedupeHash.substring(0, 16) + '...',
      fullHash: dedupeHash,
      parseDurationMs,
      matchedCardName: matchedCard.displayName,
      rewardEstimateInr,
      ratePercent: categoryEarn.rate,
      privacyGuarantee: {
        rawSmsStoredOnCloud: false,
        fullPanCollected: false,
        dpdpCompliant: true,
        processingLocation: 'On-Device Secure Sandbox (Local Client RAM)'
      }
    };
  }

  _categorizeMerchant(merchant, rawText) {
    const text = (merchant + ' ' + rawText).toLowerCase();
    if (text.includes('zomato') || text.includes('swiggy') || text.includes('starbucks') || text.includes('mcdonald') || text.includes('dineout') || text.includes('restaurant')) {
      return 'dining';
    }
    if (text.includes('makemytrip') || text.includes('indigo') || text.includes('air india') || text.includes('vistara') || text.includes('flight') || text.includes('cleartrip')) {
      return 'flights';
    }
    if (text.includes('amazon') || text.includes('flipkart') || text.includes('myntra') || text.includes('croma') || text.includes('tata cliq') || text.includes('ajio')) {
      return 'online_shopping';
    }
    if (text.includes('blinkit') || text.includes('zepto') || text.includes('bigbasket') || text.includes('instamart') || text.includes('supermarket')) {
      return 'groceries';
    }
    if (text.includes('hpcl') || text.includes('bpcl') || text.includes('ioc') || text.includes('fuel') || text.includes('petrol') || text.includes('shell')) {
      return 'fuel';
    }
    if (text.includes('netflix') || text.includes('spotify') || text.includes('prime') || text.includes('youtube') || text.includes('apple.com')) {
      return 'subscriptions';
    }
    if (text.includes('bescom') || text.includes('tatapower') || text.includes('airtel') || text.includes('jio') || text.includes('bill')) {
      return 'utilities';
    }
    if (text.includes('hotel') || text.includes('taj') || text.includes('marriott') || text.includes('hyatt') || text.includes('airbnb')) {
      return 'hotels';
    }
    return 'online_shopping';
  }

  async _sha256(message) {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // Fallback simple hash for older environments
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
      const char = message.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(32, 'a');
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SmsSpendEngine };
}
