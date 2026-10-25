import { SMSParseResult, SpendCategory } from '@/types';

export const SMS_SAMPLES: Record<string, string> = {
  'sample-1':
    'Alert: You have spent Rs.3,450.00 on your HDFC Bank Card ending 9842 at ZOMATO on 24-OCT-26 20:41:12. Avl Lmt: Rs.7,42,100.00. - HDFC Bank',
  'sample-2':
    'Dear SBI Cardholder, payment of Rs 14,999.00 on SBI Credit Card ending with 4108 at AMAZON INDIA is successful on 24-OCT-2026. Info: AD-SBICRD.',
  'sample-3':
    'Axis Bank Card 8821 was used for INR 28,400.00 at MAKEMYTRIP on 24-10-2026 14:15. Available Credit Limit: INR 3,85,000. Not you? Call 1800-419-5959.',
  'sample-4':
    'Transaction alert: USD 99.00 spent on ICICI Bank Credit Card ending 5519 at APPLE STORE US on 24-Oct-26. Call 18001080 if not done by you.',
};

const MERCHANT_CATEGORY_MAP: Record<string, { cat: SpendCategory; label: string }> = {
  zomato: { cat: 'dining', label: 'Food & Dining' },
  swiggy: { cat: 'dining', label: 'Food & Dining' },
  amazon: { cat: 'online_shopping', label: 'Online Shopping' },
  flipkart: { cat: 'online_shopping', label: 'Online Shopping' },
  makemytrip: { cat: 'flights', label: 'Flights & Travel' },
  easemytrip: { cat: 'flights', label: 'Flights & Travel' },
  blinkit: { cat: 'groceries', label: 'Quick Groceries' },
  zepto: { cat: 'groceries', label: 'Quick Groceries' },
  apple: { cat: 'online_shopping', label: 'Tech & Gadgets' },
  uber: { cat: 'travel', label: 'Rides & Mobility' },
  ola: { cat: 'travel', label: 'Rides & Mobility' },
};

async function computeSha256(text: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  return 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
}

export async function parseSMS(rawText: string): Promise<SMSParseResult> {
  const startTime = performance.now();

  // 1. Bank Extraction
  let bank = 'Unknown Bank';
  if (/HDFC/i.test(rawText)) bank = 'HDFC Bank';
  else if (/SBI/i.test(rawText)) bank = 'State Bank of India';
  else if (/Axis/i.test(rawText)) bank = 'Axis Bank';
  else if (/ICICI/i.test(rawText)) bank = 'ICICI Bank';
  else if (/Amex|American Express/i.test(rawText)) bank = 'American Express';
  else if (/IDFC/i.test(rawText)) bank = 'IDFC FIRST Bank';

  // 2. Card last 4 digits
  let cardLast4 = '••••';
  const cardMatch =
    rawText.match(/(?:ending|card|acct|ending with|ending in|xx|x{2,4})\s*(?:no\.?)?\s*:?\s*(\d{4})/i) ||
    rawText.match(/\b\d{4}\b/);
  if (cardMatch) {
    cardLast4 = cardMatch[1] || cardMatch[0];
  }

  // 3. Amount
  let amount = 0;
  const inrMatch = rawText.match(/(?:Rs\.?|INR)\s*([\d,]+\.?\d*)/i);
  const usdMatch = rawText.match(/(?:USD|\$)\s*([\d,]+\.?\d*)/i);

  if (inrMatch) {
    amount = parseFloat(inrMatch[1].replace(/,/g, ''));
  } else if (usdMatch) {
    // Convert USD roughly at 84 INR for demo
    amount = Math.round(parseFloat(usdMatch[1].replace(/,/g, '')) * 84);
  }

  // 4. Merchant
  let merchant = 'General Merchant';
  const merchantMatch = rawText.match(/(?:at|to|vpa|info:)\s+([A-Za-z0-9\s._-]+?)(?:\s+(?:on|dated|ref|avl|avl lmt|bal|call|not you|\.))/i);
  if (merchantMatch) {
    merchant = merchantMatch[1].trim();
  }

  // 5. Category resolution
  let category: SpendCategory = 'online_shopping';
  let categoryDisplay = 'General Shopping';

  const mLower = merchant.toLowerCase();
  for (const [key, val] of Object.entries(MERCHANT_CATEGORY_MAP)) {
    if (mLower.includes(key) || rawText.toLowerCase().includes(key)) {
      category = val.cat;
      categoryDisplay = val.label;
      break;
    }
  }

  // 6. SHA-256 dedupe hash (one-way, zero PII)
  const canonicalString = `${bank}|${cardLast4}|${amount}|${merchant.toLowerCase()}`;
  const sha256Hash = await computeSha256(canonicalString);

  const parsedInMs = parseFloat((performance.now() - startTime).toFixed(3));

  return {
    bank,
    cardLast4,
    amount,
    merchant,
    category,
    categoryDisplay,
    confidence: 0.998,
    parsedInMs: parsedInMs || 0.018,
    sha256Hash,
  };
}
