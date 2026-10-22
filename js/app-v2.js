/**
 * Credvert App Orchestrator v2.0
 * Wires all interactive UI sections to the data engines.
 * interactions.js owns: theme, FAQ, smooth scroll, mobile menu, 3D tilt, flip, scroll reveals, counters, toast
 * This file owns: card switcher, advisor, SMS, calculator, catalog, compare, modals, coupons
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
   *  ENGINES
   * ───────────────────────────────────────────── */
  const advisorEngine   = new AdvisorEngine(CREDVERT_CARDS);
  const smsEngine       = new SmsSpendEngine(CREDVERT_CARDS);
  const calcEngine      = new AnnualSpendCalculator(CREDVERT_CARDS);

  /* ─────────────────────────────────────────────
   *  SKIN → NETWORK MAP
   * ───────────────────────────────────────────── */
  const SKIN_MAP = {
    aurum:     'assets/network-logo/visa.svg',
    emerald:   'assets/network-logo/visa.svg',
    sapphire:  'assets/network-logo/visa.svg',
    titanium:  'assets/network-logo/amex.svg',
    obsidian:  'assets/network-logo/visa.svg',
    rosso:     'assets/network-logo/RuPay.svg',
    amethyst:  'assets/network-logo/Mastercard.svg'
  };

  /* ─────────────────────────────────────────────
   *  HERO CARD SWITCHER
   * ───────────────────────────────────────────── */
  const heroCardFront   = document.getElementById('heroCardFront');
  const heroCardBack    = document.querySelector('.card-face.back');
  const heroCardBank    = document.getElementById('heroCardBank');
  const heroCardMetalTag= document.getElementById('heroCardMetalTag');
  const heroCardPan     = document.getElementById('heroCardPan');
  const heroCardNetwork = document.getElementById('heroCardNetworkLogo');
  const heroPill1Title  = document.getElementById('heroPill1Title');
  const heroPill1Sub    = document.getElementById('heroPill1Sub');
  const revealBtn       = document.getElementById('revealNumberBtn');
  const copyCardBtn     = document.getElementById('copyCardBtn');

  let currentCardIndex  = 0;
  let panRevealed       = false;

  const PILL_DATA = [
    { title: '5X SmartBuy Reward',        sub: '+₹1,650 on this booking' },
    { title: '5% Direct Cashback',         sub: '+₹750 auto-credited' },
    { title: '5X EDGE Miles',              sub: '+2,840 miles credited' },
    { title: 'Airport Lounge Access',      sub: 'Priority Pass · Global' },
    { title: 'BookMyShow BOGO',            sub: 'Save ₹750 tonight' },
    { title: 'Unlimited Railway Lounges',  sub: '+500 reward points' },
    { title: 'NeuCoins 5% on Tata',        sub: '+₹5,000 Neu points' }
  ];

  const ALL_SKINS = ['aurum','emerald','sapphire','titanium','obsidian','rosso','amethyst'];

  function selectHeroCard(idx) {
    if (!CREDVERT_CARDS[idx]) return;
    currentCardIndex = idx;
    panRevealed = false;

    const card = CREDVERT_CARDS[idx];
    const skin = card.skin;

    // Update skin on both faces
    ALL_SKINS.forEach(s => {
      heroCardFront.classList.remove('skin-' + s);
      if (heroCardBack) heroCardBack.classList.remove('skin-' + s);
    });
    heroCardFront.classList.add('skin-' + skin);
    if (heroCardBack) heroCardBack.classList.add('skin-' + skin);

    // Update content
    heroCardBank.textContent = card.bank.toUpperCase();
    heroCardMetalTag.style.display = card.metal ? '' : 'none';
    heroCardPan.textContent = `•••• •••• •••• ${card.last4}`;
    heroCardNetwork.src = card.networkLogo || SKIN_MAP[skin] || 'assets/network-logo/visa.svg';
    heroCardNetwork.alt = card.network || 'Network';

    // Update floating pill
    const p = PILL_DATA[idx] || PILL_DATA[0];
    if (heroPill1Title) heroPill1Title.textContent = p.title;
    if (heroPill1Sub)   heroPill1Sub.textContent   = p.sub;

    // Reset reveal button label
    if (revealBtn) {
      revealBtn.innerHTML = `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Reveal`;
    }

    // Highlight active pill button
    document.querySelectorAll('.card-pill-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.index) === idx);
    });

    // Pulse animation
    heroCardFront.style.transform = 'scale(1.03)';
    setTimeout(() => { heroCardFront.style.transform = ''; }, 200);
  }

  // Wire switcher buttons
  document.querySelectorAll('.card-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => selectHeroCard(parseInt(btn.dataset.index)));
  });

  // Reveal / Hide card number
  if (revealBtn) {
    revealBtn.addEventListener('click', () => {
      panRevealed = !panRevealed;
      const card = CREDVERT_CARDS[currentCardIndex];
      if (panRevealed) {
        heroCardPan.textContent = `4532 1894 7623 ${card.last4}`;
        revealBtn.innerHTML = `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg> Hide`;
        window.showToast && window.showToast('Biometric verified — card number revealed (demo)', 'success');
      } else {
        heroCardPan.textContent = `•••• •••• •••• ${card.last4}`;
        revealBtn.innerHTML = `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Reveal`;
      }
    });
  }

  // Copy card number
  if (copyCardBtn) {
    copyCardBtn.addEventListener('click', () => {
      const card = CREDVERT_CARDS[currentCardIndex];
      const pan = panRevealed ? `4532 1894 7623 ${card.last4}` : `•••• •••• •••• ${card.last4}`;
      navigator.clipboard && navigator.clipboard.writeText(pan).catch(() => {});
      window.showToast && window.showToast('Card number copied to clipboard', 'success');
    });
  }

  /* ─────────────────────────────────────────────
   *  ADVISOR SIMULATOR
   * ───────────────────────────────────────────── */
  let advisorState = {
    category: 'dining',
    spend: 15000,
    international: false
  };

  const spendDisplay    = document.getElementById('advisorSpendDisplay');
  const spendSlider     = document.getElementById('advisorSpendSlider');
  const intlToggle      = document.getElementById('advisorIntlToggle');
  const advWinnerThumb  = document.getElementById('advWinnerThumb');
  const advWinnerName   = document.getElementById('advWinnerName');
  const advWinnerBank   = document.getElementById('advWinnerBank');
  const advEarnVal      = document.getElementById('advEarnVal');
  const advEarnRate     = document.getElementById('advEarnRate');
  const advWhyItWins    = document.getElementById('advWhyItWins');
  const advRunnersList  = document.getElementById('advRunnersList');

  function fmt(n) {
    if (n >= 100000) return '₹' + (n / 100000).toFixed(1) + 'L';
    if (n >= 1000)   return '₹' + n.toLocaleString('en-IN');
    return '₹' + n;
  }

  function runAdvisorSimulation() {
    let result;
    try {
      result = advisorEngine.recommend({
        category:        advisorState.category,
        spendAmount:     advisorState.spend,
        isInternational: advisorState.international
      });
    } catch(e) { result = null; }
    if (!result || !result.winner) return;

    const top  = result.winner;
    const card = top.card || CREDVERT_CARDS[0];

    // Winner
    ALL_SKINS.forEach(s => advWinnerThumb && advWinnerThumb.classList.remove('skin-' + s));
    if (advWinnerThumb) {
      advWinnerThumb.classList.add('skin-' + card.skin);
      advWinnerThumb.textContent = card.displayName.split(' ')[0];
    }
    if (advWinnerName) advWinnerName.textContent = card.name || card.displayName;
    if (advWinnerBank) advWinnerBank.textContent  = `${card.bank} · ${card.network}`;
    if (advEarnVal)    advEarnVal.textContent      = fmt(Math.round(top.netValueInr || 0));
    if (advEarnRate)   advEarnRate.textContent     = (top.netReturnPercent || top.effectiveEarnRatePercent || 0).toFixed(1) + '%';
    if (advWhyItWins)  advWhyItWins.textContent    = top.whyItWins || result.insights?.[0]?.body || 'Highest effective return rate for this category.';

    // Runners
    if (advRunnersList && result.runnersUp) {
      advRunnersList.innerHTML = result.runnersUp.slice(0, 4).map(r => {
        const rc   = r.card || {};
        const rate = (r.netReturnPercent || r.effectiveEarnRatePercent || 0).toFixed(1);
        const val  = fmt(Math.round(r.netValueInr || 0));
        return `
          <div class="runner-row">
            <div class="runner-thumb skin-${rc.skin || 'obsidian'}">${(rc.displayName || 'Card').split(' ')[0]}</div>
            <div class="runner-info">
              <span class="runner-name">${rc.name || rc.displayName || 'Card'}</span>
              <span class="runner-bank">${rc.bank || ''}</span>
            </div>
            <div class="runner-rate">
              <span class="runner-rate-pct">${rate}%</span>
              <span class="runner-rate-val">${val}</span>
            </div>
          </div>`;
      }).join('');
    }
  }

  // Category chips
  document.querySelectorAll('.category-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      advisorState.category = chip.dataset.category;
      runAdvisorSimulation();
    });
  });

  // Spend slider
  if (spendSlider) {
    spendSlider.addEventListener('input', () => {
      advisorState.spend = parseInt(spendSlider.value);
      if (spendDisplay) spendDisplay.textContent = fmt(advisorState.spend);
      runAdvisorSimulation();
    });
  }

  // Preset buttons
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const amount = parseInt(btn.dataset.amount);
      advisorState.spend = amount;
      if (spendSlider) spendSlider.value = amount;
      if (spendDisplay) spendDisplay.textContent = fmt(amount);
      document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      runAdvisorSimulation();
    });
  });

  // International toggle
  if (intlToggle) {
    intlToggle.addEventListener('change', () => {
      advisorState.international = intlToggle.checked;
      runAdvisorSimulation();
    });
  }

  /* ─────────────────────────────────────────────
   *  SMS INTELLIGENCE SANDBOX
   * ───────────────────────────────────────────── */
  const SMS_SAMPLES = {
    'sample-1': `Dear Customer, Rs.3,450.00 has been debited from your HDFC Bank Credit Card XX9842 at ZOMATO on 21-10-2026. Available Credit Limit: Rs.4,11,000. If not done by you call 1800 202 6161. -HDFCBK`,
    'sample-2': `Your SBI Card XX4102 has been used for a transaction of Rs.14,999.00 at AMAZON on 21/10/2026 15:44:22. To dispute call 1860-180-1290. -SBICRD`,
    'sample-3': `Axis Bank Credit Card XX7281 used for Rs.28,400.00 at MAKEMYTRIP on 21-Oct-26. Available Limit: Rs.3,72,000. Dispute? Call 1860-419-5555. -AXISBK`,
    'sample-4': `ICICI Bank Credit Card XX3891 used for USD 99.00 (Rs.8,267.00 approx including forex markup) at APPLE STORE on 21/10/2026. If not you, call 1800-102-4242. -ICICIB`
  };

  const smsInputText = document.getElementById('smsInputText');
  const smsParseBtn  = document.getElementById('smsParseBtn');
  const termBank     = document.getElementById('termBank');
  const termCard     = document.getElementById('termCard');
  const termAmount   = document.getElementById('termAmount');
  const termMerchant = document.getElementById('termMerchant');
  const termCategory = document.getElementById('termCategory');
  const termRewards  = document.getElementById('termRewards');
  const termDuration = document.getElementById('termDuration');
  const termHash     = document.getElementById('termHash');

  async function runSMSParse() {
    if (!smsInputText || !smsInputText.value.trim()) return;
    const t0 = performance.now();
    let result;
    try {
      result = await smsEngine.parseOnDevice(smsInputText.value);
    } catch(e) {
      console.error('SMS parse error:', e);
      result = null;
    }
    if (!result) return;

    const dt = result.parseDurationMs || (performance.now() - t0).toFixed(3);

    if (termBank)     termBank.textContent     = result.bank      || 'Unknown';
    if (termCard)     termCard.textContent     = result.cardLast4 ? `ending in ${result.cardLast4}` : '—';
    if (termAmount)   termAmount.textContent   = result.amount    ? `₹${Number(result.amount).toLocaleString('en-IN', {minimumFractionDigits:2})}` : '—';
    if (termMerchant) termMerchant.textContent = (result.merchant || '—').toUpperCase();
    if (termCategory) termCategory.textContent = (result.category || '—').toUpperCase().replace(/_/g,' ');

    // Use pre-computed reward from engine
    let rewardStr = '—';
    if (result.rewardEstimateInr !== undefined && result.ratePercent !== undefined) {
      rewardStr = `+₹${result.rewardEstimateInr.toLocaleString('en-IN')} (${result.ratePercent}%)`;
    }
    if (termRewards)  termRewards.textContent  = rewardStr;
    if (termDuration) termDuration.textContent = `${dt} ms · Local RAM`;
    if (termHash)     termHash.textContent     = result.dedupeHash || 'sha256:' + Math.random().toString(16).slice(2,18) + '...';
  }

  // Sample buttons
  document.querySelectorAll('.sms-sample-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sms-sample-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sampleKey = btn.dataset.sample;
      if (smsInputText) smsInputText.value = SMS_SAMPLES[sampleKey] || '';
      runSMSParse();
    });
  });

  // Parse button
  if (smsParseBtn) smsParseBtn.addEventListener('click', runSMSParse);

  /* ─────────────────────────────────────────────
   *  ROI CALCULATOR
   * ───────────────────────────────────────────── */
  const SLIDERS = [
    { id: 'calcShoppingSlider',  valId: 'val_online_shopping', key: 'online_shopping' },
    { id: 'calcDiningSlider',    valId: 'val_dining',          key: 'dining'          },
    { id: 'calcFlightsSlider',   valId: 'val_flights',         key: 'flights'         },
    { id: 'calcGroceriesSlider', valId: 'val_groceries',       key: 'groceries'       },
    { id: 'calcFuelSlider',      valId: 'val_fuel',            key: 'fuel'            },
    { id: 'calcUtilitiesSlider', valId: 'val_utilities',       key: 'utilities'       }
  ];

  const calcSpends = {};

  function runCalculator() {
    // Build spends object
    SLIDERS.forEach(s => {
      const el = document.getElementById(s.id);
      calcSpends[s.key] = el ? parseInt(el.value) : 0;
    });

    let result;
    try {
      result = calcEngine.calculateAnnual(calcSpends);
    } catch(e) {
      result = null;
    }

    if (!result || !result.topPick) return;

    const top     = result.topPick;
    const topCard = top.card || CREDVERT_CARDS[0];

    const ngEl = document.getElementById('calcNetGainVal');
    const tcEl = document.getElementById('calcTopCardName');
    const fsEl = document.getElementById('calcFeeStatus');
    const plEl = document.getElementById('calcPerksList');

    if (ngEl) ngEl.textContent = '₹' + Math.round(top.totalNetGainInr || 0).toLocaleString('en-IN');
    if (tcEl) tcEl.textContent = topCard.name || topCard.displayName;
    if (fsEl) {
      fsEl.textContent = top.feeWaived ? 'Annual fee 100% waived' : `Annual fee: ₹${(topCard.renewalFee || 0).toLocaleString('en-IN')}`;
      fsEl.style.color = top.feeWaived ? 'var(--emerald-light)' : 'var(--txt-70)';
    }
    if (plEl) {
      const perks = top.milestonePerksUnlocked || topCard.milestones || [];
      plEl.innerHTML = perks.slice(0, 5).map(p =>
        `<li><svg width="14" height="14" fill="none" stroke="var(--gold)" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>${p}</li>`
      ).join('');
    }
  }

  // Wire sliders
  SLIDERS.forEach(s => {
    const slider = document.getElementById(s.id);
    const valEl  = document.getElementById(s.valId);
    if (slider) {
      slider.addEventListener('input', () => {
        if (valEl) valEl.textContent = fmt(parseInt(slider.value));
        runCalculator();
      });
    }
  });

  /* ─────────────────────────────────────────────
   *  CARD CATALOG
   * ───────────────────────────────────────────── */
  const catalogGrid   = document.getElementById('catalogCardsGrid');
  const searchInput   = document.getElementById('catalogSearchInput');
  let   activeFilter  = 'all';
  let   compareList   = [];

  function cardMatchesFilter(card, filter) {
    switch (filter) {
      case 'cashback': return (card.returnMax || 0) >= 2 && !card.metal && card.categoryRates?.online_shopping?.rate >= 2;
      case 'travel':   return (card.categoryRates?.flights?.multiplier || 0) >= 3 || (card.categoryRates?.travel?.multiplier || 0) >= 3;
      case 'metal':    return !!card.metal;
      case 'free':     return (card.renewalFee || 0) === 0 || (card.waiverSpend || 0) <= 200000;
      default:         return true;
    }
  }

  function buildCatalogCard(card) {
    const inCompare = compareList.includes(card.id);
    return `
      <div class="catalog-card-item" data-id="${card.id}">
        <div class="catalog-card-top">
          <div class="card-title-group">
            <h3>${card.name}</h3>
            <div class="card-bank-subtitle">${card.bank} · ${card.network}</div>
          </div>
          <div class="return-badge">${card.returnMin}–${card.returnMax}%</div>
        </div>

        <div class="catalog-mini-card skin-${card.skin}">
          <div class="catalog-mini-top">
            <span class="catalog-mini-bank">${card.bank.toUpperCase()}</span>
            ${card.metal ? '<span class="card-metal-tag">METAL</span>' : ''}
          </div>
          <div class="catalog-mini-bottom">
            <span class="catalog-mini-pan">•••• ${card.last4}</span>
            <img class="catalog-mini-network" src="${card.networkLogo}" alt="${card.network}">
          </div>
        </div>

        <div class="specs-table">
          <div class="spec-cell">
            <div class="spec-lbl">Joining Fee</div>
            <div class="spec-val">₹${(card.joiningFee||0).toLocaleString('en-IN')}</div>
          </div>
          <div class="spec-cell">
            <div class="spec-lbl">Renewal Fee</div>
            <div class="spec-val">₹${(card.renewalFee||0).toLocaleString('en-IN')}</div>
          </div>
          <div class="spec-cell">
            <div class="spec-lbl">Forex Markup</div>
            <div class="spec-val">${card.forexMarkup}%</div>
          </div>
          <div class="spec-cell">
            <div class="spec-lbl">Fee Waiver</div>
            <div class="spec-val">${card.waiverSpend ? '₹' + (card.waiverSpend/100000).toFixed(1) + 'L' : '—'}</div>
          </div>
        </div>

        <p class="card-overview">${card.overview || ''}</p>

        <div class="card-actions-row">
          <a href="${card.applyUrl || '#'}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Apply Now</a>
          <button class="btn btn-secondary btn-sm compare-toggle-btn ${inCompare ? 'compare-active' : ''}" data-id="${card.id}">
            ${inCompare ? '✓ Selected' : '+ Compare'}
          </button>
        </div>
      </div>`;
  }

  function renderCatalog(filter, query) {
    if (!catalogGrid) return;
    filter = filter || activeFilter;
    query  = query  !== undefined ? query : (searchInput ? searchInput.value : '');

    const q = query.toLowerCase().trim();
    const filtered = CREDVERT_CARDS.filter(card => {
      if (!cardMatchesFilter(card, filter)) return false;
      if (q && !card.name.toLowerCase().includes(q) && !card.bank.toLowerCase().includes(q)) return false;
      return true;
    });

    catalogGrid.innerHTML = filtered.length
      ? filtered.map(buildCatalogCard).join('')
      : '<p style="text-align:center; color:var(--txt-50); padding:3rem;">No cards match your filters.</p>';

    // Wire compare buttons
    catalogGrid.querySelectorAll('.compare-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => toggleCompare(parseInt(btn.dataset.id)));
    });

    // Wire subtle interactive mouse tilt/sheen on catalog cards
    catalogGrid.querySelectorAll('.catalog-card-item').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width)  * 100;
        const y = ((e.clientY - rect.top)  / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    });
  }

  // Filter tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderCatalog(activeFilter);
    });
  });

  // Search
  if (searchInput) {
    searchInput.addEventListener('input', () => renderCatalog(activeFilter, searchInput.value));
  }

  /* ─────────────────────────────────────────────
   *  COMPARE DOCK & MODAL
   * ───────────────────────────────────────────── */
  const compareDock        = document.getElementById('compareDock');
  const dockCardsList      = document.getElementById('dockCardsList');
  const launchCompareBtn   = document.getElementById('launchCompareModalBtn');
  const compareModal       = document.getElementById('compareModal');
  const closeCompareModal  = document.getElementById('closeCompareModalBtn');
  const modalContent       = document.getElementById('modalComparisonContent');

  function toggleCompare(cardId) {
    const idx = compareList.indexOf(cardId);
    if (idx > -1) {
      compareList.splice(idx, 1);
    } else {
      if (compareList.length >= 3) {
        window.showToast && window.showToast('Select up to 3 cards to compare', 'warning');
        return;
      }
      compareList.push(cardId);
    }
    updateCompareDock();
    renderCatalog(); // re-render to update button states
  }

  function updateCompareDock() {
    if (!compareDock) return;
    if (compareList.length === 0) {
      compareDock.classList.remove('visible');
      return;
    }
    compareDock.classList.add('visible');
    if (dockCardsList) {
      dockCardsList.innerHTML = compareList.map(id => {
        const card = CREDVERT_CARDS.find(c => c.id === id);
        return card ? `
          <div class="dock-card-chip skin-${card.skin}">
            ${card.displayName}
            <button class="dock-remove" data-id="${card.id}" title="Remove">✕</button>
          </div>` : '';
      }).join('');
      dockCardsList.querySelectorAll('.dock-remove').forEach(btn => {
        btn.addEventListener('click', () => toggleCompare(parseInt(btn.dataset.id)));
      });
    }
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open', 'active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open', 'active');
    document.body.style.overflow = '';
  }

  if (launchCompareBtn) {
    launchCompareBtn.addEventListener('click', () => {
      if (compareList.length < 2) {
        window.showToast && window.showToast('Select at least 2 cards to compare', 'warning');
        return;
      }
      buildCompareModal();
      openModal(compareModal);
    });
  }

  if (closeCompareModal) {
    closeCompareModal.addEventListener('click', () => closeModal(compareModal));
  }

  if (compareModal) {
    compareModal.addEventListener('click', e => {
      if (e.target === compareModal) closeModal(compareModal);
    });
  }

  function buildCompareModal() {
    if (!modalContent) return;
    const cards  = compareList.map(id => CREDVERT_CARDS.find(c => c.id === id)).filter(Boolean);
    const fields = [
      { label: 'Bank',         get: c => c.bank },
      { label: 'Network',      get: c => c.network },
      { label: 'Joining Fee',  get: c => `₹${(c.joiningFee||0).toLocaleString('en-IN')}` },
      { label: 'Annual Fee',   get: c => `₹${(c.renewalFee||0).toLocaleString('en-IN')}` },
      { label: 'Fee Waiver',   get: c => c.waiverSpend ? `₹${(c.waiverSpend/100000).toFixed(1)}L spend` : '—' },
      { label: 'Forex Markup', get: c => `${c.forexMarkup}% (+18% GST)` },
      { label: 'Return Range', get: c => `${c.returnMin}–${c.returnMax}%` },
      { label: 'Dining Rate',  get: c => c.categoryRates?.dining ? `${c.categoryRates.dining.rate}% (${c.categoryRates.dining.note})` : '—' },
      { label: 'Travel Rate',  get: c => c.categoryRates?.flights ? `${c.categoryRates.flights.rate}% (${c.categoryRates.flights.note})` : '—' },
      { label: 'Shopping Rate',get: c => c.categoryRates?.online_shopping ? `${c.categoryRates.online_shopping.rate}%` : '—' },
      { label: 'Lounge Dom.',  get: c => c.lounges?.domestic || '—' },
      { label: 'Lounge Intl.', get: c => c.lounges?.international || '—' },
      { label: 'Metal Card',   get: c => c.metal ? '✓ Yes' : '✗ No' }
    ];

    modalContent.innerHTML = `
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
          <thead>
            <tr>
              <th style="padding:0.75rem 1rem; text-align:left; color:var(--txt-50); font-weight:600; border-bottom:1px solid var(--glass-border);">Feature</th>
              ${cards.map(c => `<th style="padding:0.75rem 1rem; text-align:center; border-bottom:1px solid var(--glass-border);">
                <div class="winner-thumb skin-${c.skin}" style="margin:0 auto 0.4rem;">${c.displayName.split(' ')[0]}</div>
                <div style="font-weight:700; font-size:0.82rem;">${c.displayName}</div>
                <div style="font-size:0.72rem; color:var(--txt-50);">${c.bank}</div>
              </th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${fields.map((f, i) => `
              <tr style="background:${i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'};">
                <td style="padding:0.65rem 1rem; color:var(--txt-70); font-weight:600;">${f.label}</td>
                ${cards.map(c => `<td style="padding:0.65rem 1rem; text-align:center;">${f.get(c)}</td>`).join('')}
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  }

  /* ─────────────────────────────────────────────
   *  DOWNLOAD MODAL
   * ───────────────────────────────────────────── */
  const downloadModal     = document.getElementById('downloadModal');
  const closeDownloadBtn  = document.getElementById('closeDownloadModalBtn');

  document.querySelectorAll('.download-trigger-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(downloadModal));
  });

  if (closeDownloadBtn) {
    closeDownloadBtn.addEventListener('click', () => closeModal(downloadModal));
  }

  if (downloadModal) {
    downloadModal.addEventListener('click', e => {
      if (e.target === downloadModal) closeModal(downloadModal);
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(compareModal);
      closeModal(downloadModal);
    }
  });

  /* ─────────────────────────────────────────────
   *  COUPON COPY BUTTONS
   * ───────────────────────────────────────────── */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.code;
      if (code && navigator.clipboard) {
        navigator.clipboard.writeText(code).catch(() => {});
      }
      const original = btn.textContent;
      btn.textContent = 'COPIED!';
      btn.style.background = 'var(--emerald)';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.color = '';
      }, 2000);
      window.showToast && window.showToast(`Coupon "${code}" copied!`, 'success');
    });
  });

  /* ─────────────────────────────────────────────
   *  BOOT SEQUENCE
   * ───────────────────────────────────────────── */
  function boot() {
    selectHeroCard(0);
    runAdvisorSimulation();
    runCalculator();
    renderCatalog('all', '');

    // Pre-populate SMS with first sample
    if (smsInputText) {
      smsInputText.value = SMS_SAMPLES['sample-1'];
    }
    // Auto-parse after a short delay (so interactions.js scroll reveals can fire first)
    setTimeout(runSMSParse, 400);

    // Auto-rotate hero card every 4s
    let heroAutoIdx = 0;
    setInterval(() => {
      heroAutoIdx = (heroAutoIdx + 1) % CREDVERT_CARDS.length;
      selectHeroCard(heroAutoIdx);
    }, 4000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
