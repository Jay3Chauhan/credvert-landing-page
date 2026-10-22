/**
 * Credvert Smart Advisor Engine
 * Mirrors Credvert Backend's advisor_service.py & schemas/advisor.py
 * Accurately models category earn rates, multiplier caps, exclusions,
 * and 18% GST on foreign exchange markups (forex_markup x 1.18).
 */

class AdvisorEngine {
  constructor(cards = CREDVERT_CARDS) {
    this.cards = cards;
  }

  /**
   * Recommend the best credit card for a given payment scenario
   * @param {Object} params
   * @param {string} params.category - 'dining' | 'flights' | 'hotels' | 'online_shopping' | 'groceries' | 'fuel' | 'rent' | 'utilities' | 'travel' | 'subscriptions' | 'international'
   * @param {number} params.spendAmount - Amount in INR (e.g. 15000)
   * @param {boolean} params.isInternational - Whether paying abroad (applies forex markup + 18% GST)
   * @param {Array<number>} [params.cardIds] - Optional subset of card IDs (e.g. user's held cards)
   */
  recommend({ category, spendAmount, isInternational = false, cardIds = null }) {
    const activeCards = (cardIds && cardIds.length > 0)
      ? this.cards.filter(c => cardIds.includes(c.id))
      : this.cards;

    if (!activeCards || activeCards.length === 0) {
      return null;
    }

    const evaluatedCards = activeCards.map(card => {
      return this._evaluateCard(card, category, spendAmount, isInternational);
    });

    // Sort by highest net return value in INR
    evaluatedCards.sort((a, b) => b.netValueInr - a.netValueInr);

    const winner = evaluatedCards[0];
    const runnersUp = evaluatedCards.slice(1, 4);

    // Also find absolute market benchmark if user selected a subset of cards
    let benchmarkWinner = null;
    if (cardIds && cardIds.length > 0) {
      const allEvaluated = this.cards.map(c => this._evaluateCard(c, category, spendAmount, isInternational));
      allEvaluated.sort((a, b) => b.netValueInr - a.netValueInr);
      if (allEvaluated[0].card.id !== winner.card.id) {
        benchmarkWinner = allEvaluated[0];
      }
    }

    return {
      winner,
      runnersUp,
      benchmarkWinner,
      category,
      spendAmount,
      isInternational,
      insights: this._generateInsights(winner, category, spendAmount, isInternational)
    };
  }

  _evaluateCard(card, category, spend, isInternational) {
    let rateData = card.categoryRates[category] || {
      multiplier: 1,
      rate: card.returnMin || 1.0,
      note: 'Base Rewards Rate'
    };

    // If international is toggled on, check if category is specifically international or standard
    let effectiveEarnRatePercent = rateData.rate;

    // Calculate Forex markup penalty with 18% GST: (forex_markup * 1.18)%
    let forexMarkupApplied = 0;
    let forexFeeInr = 0;
    if (isInternational) {
      forexMarkupApplied = +(card.forexMarkup * 1.18).toFixed(3);
      forexFeeInr = Math.round((spend * forexMarkupApplied) / 100);
    }

    // Gross rewards in INR
    let grossValueInr = Math.round((spend * effectiveEarnRatePercent) / 100);

    // Net value after forex deduction
    let netValueInr = grossValueInr - forexFeeInr;
    let netReturnPercent = +((netValueInr / spend) * 100).toFixed(2);

    // Approximate reward points earned
    let pointsEarned = 0;
    if (card.pointValueInr > 0) {
      pointsEarned = Math.round(grossValueInr / card.pointValueInr);
    }

    // Specific exclusion check
    const isExcluded = (category === 'fuel' || category === 'rent') && rateData.rate === 0;

    return {
      card,
      rateData,
      effectiveEarnRatePercent,
      forexMarkupApplied,
      forexFeeInr,
      grossValueInr,
      netValueInr,
      netReturnPercent,
      pointsEarned,
      isExcluded,
      whyItWins: this._buildWhyItWins(card, category, netValueInr, netReturnPercent, isInternational)
    };
  }

  _buildWhyItWins(card, category, netValue, netPercent, isInternational) {
    if (isInternational) {
      return `${card.displayName} delivers ${netPercent}% net return even after deducting ${card.forexMarkup}% forex markup and 18% GST!`;
    }
    if (card.slug === 'hdfc-infinia-metal') {
      if (category === 'dining' || category === 'flights') {
        return `5X SmartBuy accelerated rate yields 16.6% value in 1:1 reward points for flights & hotels.`;
      }
      if (category === 'hotels') {
        return `10X SmartBuy hotel multiplier gives an unbeatable 33.3% net return on booking.`;
      }
    }
    if (card.slug === 'sbi-cashback-credit-card') {
      return `Direct 5% statement credit without brand restrictions, auto-credited to your account.`;
    }
    if (card.slug === 'axis-atlas-credit-card') {
      return `5 EDGE Miles per ₹100 converting 1:2 to Accor ALL / Singapore KrisFlyer giving 10% travel value.`;
    }
    if (card.slug === 'tata-neu-infinity-hdfc') {
      return `10% NeuCoins on Tata ecosystem with 1 NeuCoin = ₹1 direct redemption liquidity.`;
    }
    return `Delivers optimal ${netPercent}% return (₹${netValue.toLocaleString('en-IN')}) for ${category}.`;
  }

  _generateInsights(winner, category, spend, isInternational) {
    const tips = [];

    if (isInternational) {
      tips.push({
        type: 'alert',
        title: 'Forex Fee & GST Reality',
        body: `Most Indian banks charge 3.5% + 18% GST (4.13% total fee) on foreign payments. ${winner.card.displayName}'s lower fee saves you money directly.`
      });
    }

    if (category === 'fuel') {
      tips.push({
        type: 'warning',
        title: 'Fuel Surcharge Exemption Rule',
        body: 'Almost all credit cards exclude fuel from reward points to prevent arbitrage, but provide a 1% surcharge waiver on ₹500 - ₹3,000 transactions.'
      });
    } else if (category === 'rent') {
      tips.push({
        type: 'warning',
        title: 'Rent Payment Charges',
        body: 'Banks now apply a 1% processing fee + 18% GST on third-party rent portals (CRED, Paytm). Use debit or UPI if rewards do not offset fees.'
      });
    } else if (winner.card.slug === 'hdfc-infinia-metal' && (category === 'dining' || category === 'flights')) {
      tips.push({
        type: 'tip',
        title: 'SmartBuy 5X Multiplier',
        body: 'Ensure you route flight and dining vouchers through the HDFC SmartBuy portal to unlock the full 5X reward points.'
      });
    } else {
      tips.push({
        type: 'tip',
        title: 'Maximize Billing Grace Period',
        body: `Swipe right after your statement date to enjoy up to 50 days of interest-free credit while earning full rewards.`
      });
    }

    return tips;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AdvisorEngine };
}
