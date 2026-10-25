export type SpendCategory =
  | 'dining'
  | 'flights'
  | 'hotels'
  | 'online_shopping'
  | 'groceries'
  | 'fuel'
  | 'utilities'
  | 'subscriptions'
  | 'rent'
  | 'travel'
  | 'international';

export type CardSkin =
  | 'aurum'
  | 'emerald'
  | 'sapphire'
  | 'titanium'
  | 'obsidian'
  | 'rosso'
  | 'amethyst';

export interface CategoryRate {
  multiplier: number;
  rate: number;
  note: string;
}

export interface CardLounges {
  domestic: string;
  international: string;
  railway?: string;
}

export interface CreditCard {
  id: number;
  slug: string;
  name: string;
  displayName: string;
  bank: string;
  bankSlug: string;
  bankLogo: string;
  network: string;
  networkLogo: string;
  skin: CardSkin;
  metal: boolean;
  last4: string;
  joiningFee: number;
  renewalFee: number;
  waiverSpend: number | null;
  pointValueInr: number;
  forexMarkup: number;
  returnMin: number;
  returnMax: number;
  basePointsPer150?: number;
  categoryRates: Partial<Record<SpendCategory, CategoryRate>>;
  lounges: CardLounges;
  milestones: string[];
  features?: string[];
  overview: string;
  applyUrl: string;
}

export interface AdvisorResult {
  winner: {
    card: CreditCard;
    effectiveEarnRatePercent: number;
    netReturnPercent: number;
    netValueInr: number;
    pointsEarned: number;
    forexCostPercent: number;
    whyItWins: string;
  };
  ranked: Array<{
    card: CreditCard;
    effectiveEarnRatePercent: number;
    netReturnPercent: number;
    netValueInr: number;
  }>;
}

export interface SMSParseResult {
  bank: string;
  cardLast4: string;
  amount: number;
  merchant: string;
  category: SpendCategory;
  categoryDisplay: string;
  confidence: number;
  parsedInMs: number;
  sha256Hash: string;
}

export interface CalculatorSpendState {
  shopping: number;
  dining: number;
  flights: number;
  groceries: number;
  fuel: number;
  utilities: number;
}
