import { CalculatorSpendState, CreditCard } from '@/types';
import { CREDVERT_CARDS } from './cards-data';

export interface CalculatedCardROI {
  card: CreditCard;
  annualSpend: number;
  grossRewardsInr: number;
  milestoneBonusInr: number;
  feeWaived: boolean;
  netAnnualBenefitInr: number;
  roiPercentage: number;
  unlockedPerks: string[];
}

export function calculateAnnualROI(monthlySpends: CalculatorSpendState): CalculatedCardROI[] {
  const annualShopping = monthlySpends.shopping * 12;
  const annualDining = monthlySpends.dining * 12;
  const annualFlights = monthlySpends.flights * 12;
  const annualGroceries = monthlySpends.groceries * 12;
  const annualFuel = monthlySpends.fuel * 12;
  const annualUtilities = monthlySpends.utilities * 12;

  const totalAnnualSpend =
    annualShopping + annualDining + annualFlights + annualGroceries + annualFuel + annualUtilities;

  return CREDVERT_CARDS.map((card) => {
    let grossRewards = 0;
    let milestoneBonus = 0;
    const unlockedPerks: string[] = [];

    // Rate calculations per category
    const getRate = (cat: keyof typeof card.categoryRates) => card.categoryRates[cat]?.rate || card.returnMin;

    grossRewards += (annualShopping * getRate('online_shopping')) / 100;
    grossRewards += (annualDining * getRate('dining')) / 100;
    grossRewards += (annualFlights * getRate('flights')) / 100;
    grossRewards += (annualGroceries * getRate('groceries')) / 100;
    grossRewards += (annualFuel * getRate('fuel')) / 100;
    grossRewards += (annualUtilities * getRate('utilities')) / 100;

    // Fee waiver check
    const feeWaived =
      card.renewalFee === 0 ||
      (card.waiverSpend !== null && totalAnnualSpend >= card.waiverSpend);

    if (feeWaived && card.waiverSpend !== null) {
      unlockedPerks.push(`₹${card.renewalFee.toLocaleString('en-IN')} annual renewal fee 100% waived`);
    }

    // Milestones
    if (card.slug === 'hdfc-infinia-metal') {
      if (totalAnnualSpend >= 1000000) {
        milestoneBonus += 12500;
        unlockedPerks.push('12,500 renewal reward points credited');
        unlockedPerks.push('Complimentary Club Marriott luxury tier renewal');
      }
      unlockedPerks.push('Unlimited Priority Pass international lounge visits');
    } else if (card.slug === 'amex-plat-travel') {
      if (totalAnnualSpend >= 400000) {
        milestoneBonus += 24000; // 40k MR points + ₹10,000 Taj voucher
        unlockedPerks.push('₹10,000 Taj luxury hotel stay voucher unlocked');
        unlockedPerks.push('40,000 bonus Membership Rewards points credited');
      } else if (totalAnnualSpend >= 190000) {
        milestoneBonus += 7500;
        unlockedPerks.push('15,000 bonus Membership Rewards milestone points');
      }
    } else if (card.slug === 'axis-atlas') {
      if (totalAnnualSpend >= 1500000) {
        milestoneBonus += 20000;
        unlockedPerks.push('10,000 EDGE Miles tier milestone bonus (Platinum Tier)');
      } else if (totalAnnualSpend >= 750000) {
        milestoneBonus += 10000;
        unlockedPerks.push('5,000 EDGE Miles tier milestone bonus (Gold Tier)');
      } else if (totalAnnualSpend >= 300000) {
        milestoneBonus += 5000;
        unlockedPerks.push('2,500 EDGE Miles milestone bonus (Silver Tier)');
      }
    } else if (card.slug === 'sbi-cashback') {
      if (totalAnnualSpend >= 200000) {
        unlockedPerks.push('₹999 annual fee 100% reversed');
      }
      unlockedPerks.push('Direct statement credit on every monthly billing cycle');
    }

    const effectiveFee = feeWaived ? 0 : card.renewalFee;
    const netAnnualBenefit = grossRewards + milestoneBonus - effectiveFee;
    const roiPercentage = totalAnnualSpend > 0 ? (netAnnualBenefit / totalAnnualSpend) * 100 : 0;

    return {
      card,
      annualSpend: totalAnnualSpend,
      grossRewardsInr: Math.round(grossRewards),
      milestoneBonusInr: Math.round(milestoneBonus),
      feeWaived,
      netAnnualBenefitInr: Math.round(netAnnualBenefit),
      roiPercentage: parseFloat(roiPercentage.toFixed(2)),
      unlockedPerks,
    };
  }).sort((a, b) => b.netAnnualBenefitInr - a.netAnnualBenefitInr);
}
