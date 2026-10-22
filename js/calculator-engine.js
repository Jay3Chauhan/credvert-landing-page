/**
 * Credvert Annual Rewards & Milestone ROI Calculator
 * Mirrors Credvert Backend's calculator_service.py
 * Takes granular category spends and simulates annual return,
 * fee waiver triggers, and milestone voucher unlocks.
 */

class AnnualSpendCalculator {
  constructor(cards = CREDVERT_CARDS) {
    this.cards = cards;
  }

  /**
   * Calculate annual earnings for all cards based on monthly spend distribution
   * @param {Object} monthlySpends - { dining: number, flights: number, online_shopping: number, groceries: number, fuel: number, utilities: number, rent: number }
   */
  calculateAnnual(monthlySpends) {
    const totalMonthlySpend = Object.values(monthlySpends).reduce((sum, val) => sum + (Number(val) || 0), 0);
    const totalAnnualSpend = totalMonthlySpend * 12;

    const results = this.cards.map(card => {
      let annualGrossRewardInr = 0;

      // Calculate category by category
      for (const [cat, monthlyAmt] of Object.entries(monthlySpends)) {
        const annualCatSpend = (Number(monthlyAmt) || 0) * 12;
        const rateObj = card.categoryRates[cat] || { rate: card.returnMin || 1.0 };
        const catRewardInr = Math.round((annualCatSpend * rateObj.rate) / 100);
        annualGrossRewardInr += catRewardInr;
      }

      // Check fee waiver qualification
      const feeWaived = card.waiverSpend > 0 && totalAnnualSpend >= card.waiverSpend;
      const actualFeePaid = feeWaived ? 0 : card.renewalFee;

      // Estimate milestone bonuses
      let milestoneBonusInr = 0;
      let milestonePerksUnlocked = [];

      if (card.slug === 'hdfc-infinia-metal') {
        if (totalAnnualSpend >= 1000000) {
          milestonePerksUnlocked.push('₹12,500 Renewal Fee 100% WAIVED');
          milestonePerksUnlocked.push('Club Marriott Dining & Stay Tier Retained');
        }
        milestonePerksUnlocked.push('Unlimited Airport Lounge Visits Unlocked');
      } else if (card.slug === 'sbi-cashback-credit-card') {
        if (totalAnnualSpend >= 200000) {
          milestonePerksUnlocked.push('₹999 Annual Fee 100% WAIVED');
        }
        milestonePerksUnlocked.push('Direct Statement Cash Credit Every Month');
      } else if (card.slug === 'axis-atlas-credit-card') {
        if (totalAnnualSpend >= 1500000) {
          milestoneBonusInr += 20000; // 10,000 bonus EDGE Miles = ₹20,000 value
          milestonePerksUnlocked.push('Platinum Tier Achieved (10,000 Bonus Miles = ₹20,000)');
          milestonePerksUnlocked.push('12 International + 18 Domestic Lounges Unlocked');
        } else if (totalAnnualSpend >= 750000) {
          milestoneBonusInr += 10000;
          milestonePerksUnlocked.push('Gold Tier Achieved (5,000 Bonus Miles = ₹10,000)');
        } else if (totalAnnualSpend >= 300000) {
          milestoneBonusInr += 5000;
          milestonePerksUnlocked.push('Silver Tier Achieved (2,500 Bonus Miles = ₹5,000)');
        }
      } else if (card.slug === 'amex-platinum-travel') {
        if (totalAnnualSpend >= 400000) {
          milestoneBonusInr += 22500; // 25,000 MR points + ₹10,000 Taj voucher
          milestonePerksUnlocked.push('₹10,000 Taj Luxury Hotels Stay Voucher');
          milestonePerksUnlocked.push('40,000 Bonus Membership Rewards Points (₹12,500 value)');
        } else if (totalAnnualSpend >= 190000) {
          milestoneBonusInr += 7500;
          milestonePerksUnlocked.push('15,000 Bonus MR Points (₹7,500 value)');
        }
      } else if (card.slug === 'idfc-first-wealth') {
        milestonePerksUnlocked.push('100% Lifetime Free Card (Zero Fee Forever)');
        milestonePerksUnlocked.push('Free Domestic & International Lounge + Airport Spa Visits');
      }

      // Estimate lounge access value (conservatively ₹1,500 per visit saved)
      let estimatedLoungeSavings = 0;
      if (card.lounges.domestic.includes('Unlimited')) {
        estimatedLoungeSavings = 12000; // e.g. 8 visits @ ₹1,500
      } else if (card.lounges.domestic.includes('8')) {
        estimatedLoungeSavings = 9000;
      } else if (card.lounges.domestic.includes('4')) {
        estimatedLoungeSavings = 6000;
      }

      // Net total financial value
      const totalNetGainInr = (annualGrossRewardInr + milestoneBonusInr + estimatedLoungeSavings) - actualFeePaid;
      const netEffectiveRoiPercent = totalAnnualSpend > 0 ? +((totalNetGainInr / totalAnnualSpend) * 100).toFixed(2) : 0;

      return {
        card,
        totalAnnualSpend,
        annualGrossRewardInr,
        milestoneBonusInr,
        estimatedLoungeSavings,
        actualFeePaid,
        feeWaived,
        totalNetGainInr,
        netEffectiveRoiPercent,
        milestonePerksUnlocked
      };
    });

    // Rank from highest net gain to lowest
    results.sort((a, b) => b.totalNetGainInr - a.totalNetGainInr);

    return {
      totalMonthlySpend,
      totalAnnualSpend,
      rankedResults: results,
      topPick: results[0]
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AnnualSpendCalculator };
}
