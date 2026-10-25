import { AdvisorResult, CreditCard, SpendCategory } from '@/types';
import { CREDVERT_CARDS } from './cards-data';

export function evaluateSpend(
  category: SpendCategory,
  amount: number,
  isInternational: boolean = false
): AdvisorResult {
  const scored = CREDVERT_CARDS.map((card) => {
    const rateInfo = card.categoryRates[category] || {
      multiplier: 1,
      rate: card.returnMin,
      note: 'Base reward rate',
    };

    let effectiveEarnRate = rateInfo.rate;
    let forexCost = 0;

    if (isInternational) {
      forexCost = card.forexMarkup * 1.18; // 18% GST on bank markup
    }

    const netReturnPercent = effectiveEarnRate - forexCost;
    const netValueInr = (amount * netReturnPercent) / 100;
    const pointsEarned = Math.round((amount * effectiveEarnRate) / 100 / card.pointValueInr);

    let whyItWins = rateInfo.note;
    if (isInternational && card.forexMarkup <= 1.5) {
      whyItWins = `Lowest in-class ${card.forexMarkup}% forex markup keeps net return positive abroad.`;
    }

    return {
      card,
      effectiveEarnRatePercent: effectiveEarnRate,
      netReturnPercent,
      netValueInr,
      pointsEarned,
      forexCostPercent: forexCost,
      whyItWins,
    };
  });

  scored.sort((a, b) => b.netReturnPercent - a.netReturnPercent);

  const winner = scored[0];
  const ranked = scored.slice(1);

  return {
    winner,
    ranked,
  };
}
