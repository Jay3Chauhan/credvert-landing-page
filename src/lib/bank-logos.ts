/**
 * Indian Banks Vector Asset Service
 * Sourced directly from official vectors via:
 * https://github.com/praveenpuglia/indian-banks
 *
 * Provides CDN URLs for bank symbols (square emblem) and logos (wordmark).
 */

export const INDIAN_BANKS_CDN_BASE =
  'https://cdn.jsdelivr.net/gh/praveenpuglia/indian-banks/assets/logos';

/**
 * Mapping of common bank names, informal abbreviations, and slugs
 * to the official repository slug (lowercase IFSC prefix).
 */
export const BANK_SLUG_MAP: Record<string, string> = {
  // Top Private & Public Banks
  hdfc: 'hdfc',
  'hdfc bank': 'hdfc',
  sbi: 'sbin',
  'sbi card': 'sbin',
  'state bank of india': 'sbin',
  sbin: 'sbin',
  axis: 'utib',
  'axis bank': 'utib',
  utib: 'utib',
  icici: 'icic',
  'icici bank': 'icic',
  icic: 'icic',
  idfc: 'idfb',
  'idfc first': 'idfb',
  'idfc first bank': 'idfb',
  idfb: 'idfb',
  kotak: 'kkbk',
  'kotak mahindra': 'kkbk',
  'kotak mahindra bank': 'kkbk',
  kkbk: 'kkbk',
  indusind: 'indb',
  'indusind bank': 'indb',
  indb: 'indb',
  baroda: 'barb',
  'bank of baroda': 'barb',
  bob: 'barb',
  barb: 'barb',
  rbl: 'ratn',
  'rbl bank': 'ratn',
  ratn: 'ratn',
  yes: 'yesb',
  'yes bank': 'yesb',
  yesb: 'yesb',
  federal: 'fdrl',
  'federal bank': 'fdrl',
  fdrl: 'fdrl',
  au: 'aubl',
  'au small finance bank': 'aubl',
  'au bank': 'aubl',
  aubl: 'aubl',
  sc: 'scbl',
  'standard chartered': 'scbl',
  'standard chartered bank': 'scbl',
  scbl: 'scbl',
  hsbc: 'hsbc',
  'hsbc bank': 'hsbc',
  'hsbc india': 'hsbc',
  canara: 'cnrb',
  'canara bank': 'cnrb',
  cnrb: 'cnrb',
  pnb: 'punb',
  'punjab national bank': 'punb',
  punb: 'punb',
  airtel: 'airp',
  'airtel payments bank': 'airp',
  airp: 'airp',
  dbs: 'dbss',
  'dbs bank': 'dbss',
  dbss: 'dbss',
  bandhan: 'bdbl',
  'bandhan bank': 'bdbl',
  bdbl: 'bdbl',
};

/**
 * Normalizes any bank name, alias, or slug into its official repo slug.
 */
export function normalizeBankSlug(input: string): string {
  if (!input) return 'hdfc';
  const clean = input.trim().toLowerCase();
  if (BANK_SLUG_MAP[clean]) {
    return BANK_SLUG_MAP[clean];
  }
  // Remove special characters, spaces, punctuation
  const stripped = clean.replace(/[^a-z0-9]/g, '');
  if (BANK_SLUG_MAP[stripped]) {
    return BANK_SLUG_MAP[stripped];
  }
  return stripped;
}

/**
 * Returns the CDN URL for the bank's square symbol (emblem).
 * Example: https://cdn.jsdelivr.net/gh/praveenpuglia/indian-banks/assets/logos/hdfc/symbol.svg
 */
export function getBankSymbolUrl(bankOrSlug: string, fallback = '/assets/banks/hdfc.svg'): string {
  if (!bankOrSlug) return fallback;
  const clean = bankOrSlug.trim().toLowerCase();

  // American Express is an international network/issuer not in Indian IFSC list
  if (clean.includes('amex') || clean.includes('american express')) {
    return '/assets/banks/amex.svg';
  }

  const slug = normalizeBankSlug(clean);
  return `${INDIAN_BANKS_CDN_BASE}/${slug}/symbol.svg`;
}

/**
 * Returns the CDN URL for the bank's full wordmark/logo.
 * Example: https://cdn.jsdelivr.net/gh/praveenpuglia/indian-banks/assets/logos/hdfc/logo.svg
 */
export function getBankLogoUrl(bankOrSlug: string, fallback = '/assets/banks/hdfc.svg'): string {
  if (!bankOrSlug) return fallback;
  const clean = bankOrSlug.trim().toLowerCase();

  if (clean.includes('amex') || clean.includes('american express')) {
    return '/assets/banks/amex.svg';
  }

  const slug = normalizeBankSlug(clean);
  return `${INDIAN_BANKS_CDN_BASE}/${slug}/logo.svg`;
}

export interface BankMetadata {
  name: string;
  slug: string;
  ifscPrefix: string;
  symbolUrl: string;
  logoUrl: string;
}

/**
 * Curated list of popular Indian credit card issuing banks with CDN vector assets.
 */
export const POPULAR_INDIAN_BANKS: BankMetadata[] = [
  {
    name: 'HDFC Bank',
    slug: 'hdfc',
    ifscPrefix: 'HDFC',
    symbolUrl: `${INDIAN_BANKS_CDN_BASE}/hdfc/symbol.svg`,
    logoUrl: `${INDIAN_BANKS_CDN_BASE}/hdfc/logo.svg`,
  },
  {
    name: 'State Bank of India',
    slug: 'sbi',
    ifscPrefix: 'SBIN',
    symbolUrl: `${INDIAN_BANKS_CDN_BASE}/sbin/symbol.svg`,
    logoUrl: `${INDIAN_BANKS_CDN_BASE}/sbin/logo.svg`,
  },
  {
    name: 'ICICI Bank',
    slug: 'icici',
    ifscPrefix: 'ICIC',
    symbolUrl: `${INDIAN_BANKS_CDN_BASE}/icic/symbol.svg`,
    logoUrl: `${INDIAN_BANKS_CDN_BASE}/icic/logo.svg`,
  },
  {
    name: 'Axis Bank',
    slug: 'axis',
    ifscPrefix: 'UTIB',
    symbolUrl: `${INDIAN_BANKS_CDN_BASE}/utib/symbol.svg`,
    logoUrl: `${INDIAN_BANKS_CDN_BASE}/utib/logo.svg`,
  },
  {
    name: 'Kotak Mahindra Bank',
    slug: 'kotak',
    ifscPrefix: 'KKBK',
    symbolUrl: `${INDIAN_BANKS_CDN_BASE}/kkbk/symbol.svg`,
    logoUrl: `${INDIAN_BANKS_CDN_BASE}/kkbk/logo.svg`,
  },
  {
    name: 'IDFC FIRST Bank',
    slug: 'idfc',
    ifscPrefix: 'IDFB',
    symbolUrl: `${INDIAN_BANKS_CDN_BASE}/idfb/symbol.svg`,
    logoUrl: `${INDIAN_BANKS_CDN_BASE}/idfb/logo.svg`,
  },
  {
    name: 'IndusInd Bank',
    slug: 'indusind',
    ifscPrefix: 'INDB',
    symbolUrl: `${INDIAN_BANKS_CDN_BASE}/indb/symbol.svg`,
    logoUrl: `${INDIAN_BANKS_CDN_BASE}/indb/logo.svg`,
  },
  {
    name: 'Bank of Baroda',
    slug: 'baroda',
    ifscPrefix: 'BARB',
    symbolUrl: `${INDIAN_BANKS_CDN_BASE}/barb/symbol.svg`,
    logoUrl: `${INDIAN_BANKS_CDN_BASE}/barb/logo.svg`,
  },
  {
    name: 'RBL Bank',
    slug: 'rbl',
    ifscPrefix: 'RATN',
    symbolUrl: `${INDIAN_BANKS_CDN_BASE}/ratn/symbol.svg`,
    logoUrl: `${INDIAN_BANKS_CDN_BASE}/ratn/logo.svg`,
  },
  {
    name: 'Yes Bank',
    slug: 'yes',
    ifscPrefix: 'YESB',
    symbolUrl: `${INDIAN_BANKS_CDN_BASE}/yesb/symbol.svg`,
    logoUrl: `${INDIAN_BANKS_CDN_BASE}/yesb/logo.svg`,
  },
  {
    name: 'Federal Bank',
    slug: 'federal',
    ifscPrefix: 'FDRL',
    symbolUrl: `${INDIAN_BANKS_CDN_BASE}/fdrl/symbol.svg`,
    logoUrl: `${INDIAN_BANKS_CDN_BASE}/fdrl/logo.svg`,
  },
  {
    name: 'AU Small Finance Bank',
    slug: 'au',
    ifscPrefix: 'AUBL',
    symbolUrl: `${INDIAN_BANKS_CDN_BASE}/aubl/symbol.svg`,
    logoUrl: `${INDIAN_BANKS_CDN_BASE}/aubl/logo.svg`,
  },
  {
    name: 'Standard Chartered',
    slug: 'sc',
    ifscPrefix: 'SCBL',
    symbolUrl: `${INDIAN_BANKS_CDN_BASE}/scbl/symbol.svg`,
    logoUrl: `${INDIAN_BANKS_CDN_BASE}/scbl/logo.svg`,
  },
  {
    name: 'HSBC India',
    slug: 'hsbc',
    ifscPrefix: 'HSBC',
    symbolUrl: `${INDIAN_BANKS_CDN_BASE}/hsbc/symbol.svg`,
    logoUrl: `${INDIAN_BANKS_CDN_BASE}/hsbc/logo.svg`,
  },
];
