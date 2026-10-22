/**
 * Credvert Master Application Controller
 * Connects all interactive engines, 3D card physics, and UI workflows
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Engines
  const advisorEngine = new AdvisorEngine(CREDVERT_CARDS);
  const smsEngine = new SmsSpendEngine(CREDVERT_CARDS);
  const calcEngine = new AnnualSpendCalculator(CREDVERT_CARDS);

  // Global State
  let currentCardIndex = 0;
  let isCardFlipped = false;
  let isCardRevealed = false;
  let compareList = [];

  // 1. Theme Management (Luxury Obsidian <-> Warm Ivory)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('credvert_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('credvert_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Luxury Obsidian' : 'Warm Ivory'} mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    themeToggleBtn.innerHTML = theme === 'dark'
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }

  // Navbar Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.innerHTML = navMenu.classList.contains('open') ? '&times;' : '&#9776;';
    });
  }

  // 2. Interactive 3D Card Stage with Parallax Tilt & Holographic Shimmer
  const cardWrapper = document.getElementById('heroCardWrapper');
  const cardHologram = document.getElementById('cardHologram');

  if (cardWrapper) {
    const handleMove = (e) => {
      if (isCardFlipped) return;
      const rect = cardWrapper.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (!clientX || !clientY) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (-14 to +14 deg)
      const rotateX = -((y - centerY) / centerY) * 14;
      const rotateY = ((x - centerX) / centerX) * 16;

      cardWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      if (cardHologram) {
        const moveX = (x / rect.width) * 100;
        const moveY = (y / rect.height) * 100;
        cardHologram.style.transform = `translate(${moveX - 50}px, ${moveY - 50}px)`;
      }
    };

    const handleLeave = () => {
      if (!isCardFlipped) {
        cardWrapper.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      }
    };

    cardWrapper.addEventListener('mousemove', handleMove);
    cardWrapper.addEventListener('mouseleave', handleLeave);
    cardWrapper.addEventListener('touchmove', handleMove);
    cardWrapper.addEventListener('touchend', handleLeave);

    // Click to flip card
    cardWrapper.addEventListener('click', (e) => {
      // If clicking interactive buttons, avoid flip
      if (e.target.closest('button')) return;
      toggleCardFlip();
    });
  }

  // Flip Button
  const flipCardBtn = document.getElementById('flipCardBtn');
  if (flipCardBtn) {
    flipCardBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCardFlip();
    });
  }

  function toggleCardFlip() {
    isCardFlipped = !isCardFlipped;
    if (cardWrapper) {
      if (isCardFlipped) {
        cardWrapper.classList.add('flipped');
        cardWrapper.style.transform = 'rotateY(180deg)';
      } else {
        cardWrapper.classList.remove('flipped');
        cardWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
    }
  }

  // Reveal / Hide Card Number (Biometric Simulation)
  const revealNumberBtn = document.getElementById('revealNumberBtn');
  const heroCardPan = document.getElementById('heroCardPan');
  const heroCardCvv = document.getElementById('heroCardCvv');

  if (revealNumberBtn) {
    revealNumberBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isCardRevealed = !isCardRevealed;
      const currentCard = CREDVERT_CARDS[currentCardIndex];

      if (isCardRevealed) {
        heroCardPan.textContent = `4532 8901 2345 ${currentCard.last4}`;
        if (heroCardCvv) heroCardCvv.textContent = '782';
        revealNumberBtn.textContent = 'Hide Details';
        showToast('Authenticated via Biometric Hardware Enclave');
      } else {
        heroCardPan.textContent = `•••• •••• •••• ${currentCard.last4}`;
        if (heroCardCvv) heroCardCvv.textContent = '•••';
        revealNumberBtn.textContent = 'Reveal Details';
      }
    });
  }

  // Copy Card Number Button
  const copyCardBtn = document.getElementById('copyCardBtn');
  if (copyCardBtn) {
    copyCardBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentCard = CREDVERT_CARDS[currentCardIndex];
      const panToCopy = `453289012345${currentCard.last4}`;
      navigator.clipboard.writeText(panToCopy).then(() => {
        showToast(`Copied ${currentCard.displayName} number (Zero-knowledge clipboard)`);
      }).catch(() => {
        showToast(`Copied card ending in ${currentCard.last4}`);
      });
    });
  }

  // Card Switcher Dock
  const cardSwitchPills = document.querySelectorAll('.card-pill-btn');
  cardSwitchPills.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      cardSwitchPills.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectHeroCard(idx);
    });
  });

  function selectHeroCard(index) {
    currentCardIndex = index;
    const card = CREDVERT_CARDS[index];
    if (!card) return;

    // Reset flip
    if (isCardFlipped) toggleCardFlip();

    // Update Skin class
    const frontFace = document.querySelector('.card-face.front');
    if (frontFace) {
      frontFace.className = `card-face front skin-${card.skin}`;
    }

    // Update details
    const bankEl = document.getElementById('heroCardBank');
    if (bankEl) bankEl.textContent = card.bank.toUpperCase();

    const metalTag = document.getElementById('heroCardMetalTag');
    if (metalTag) metalTag.style.display = card.metal ? 'inline-block' : 'none';

    if (heroCardPan) {
      heroCardPan.textContent = isCardRevealed
        ? `4532 8901 2345 ${card.last4}`
        : `•••• •••• •••• ${card.last4}`;
    }

    const networkLogoImg = document.getElementById('heroCardNetworkLogo');
    if (networkLogoImg) networkLogoImg.src = card.networkLogo;

    // Update hero floating pills
    const floatingPillTitle = document.getElementById('heroPill1Title');
    const floatingPillSub = document.getElementById('heroPill1Sub');
    if (floatingPillTitle && floatingPillSub) {
      if (card.slug === 'hdfc-infinia-metal') {
        floatingPillTitle.textContent = 'SmartBuy 5X Multiplier';
        floatingPillSub.textContent = '+₹1,650 Cashback on this flight';
      } else if (card.slug === 'sbi-cashback-credit-card') {
        floatingPillTitle.textContent = 'Direct 5% Statement Credit';
        floatingPillSub.textContent = '₹750 auto-credited on Amazon spend';
      } else if (card.slug === 'axis-atlas-credit-card') {
        floatingPillTitle.textContent = '5 EDGE Miles Travel Rate';
        floatingPillSub.textContent = 'Converts 1:2 to Accor ALL / KrisFlyer';
      } else {
        floatingPillTitle.textContent = 'Optimal Card Selected';
        floatingPillSub.textContent = `${card.displayName} delivers best return`;
      }
    }
  }

  // 3. Interactive Advisor Simulator
  let activeAdvisorCategory = 'dining';
  let activeAdvisorAmount = 15000;
  let isAdvisorInternational = false;

  const categoryChips = document.querySelectorAll('.category-chip');
  const spendSlider = document.getElementById('advisorSpendSlider');
  const spendAmountDisplay = document.getElementById('advisorSpendDisplay');
  const internationalToggle = document.getElementById('advisorIntlToggle');
  const presetBtns = document.querySelectorAll('.preset-btn');

  // Category selection
  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeAdvisorCategory = chip.getAttribute('data-category');
      runAdvisorSimulation();
    });
  });

  // Amount slider
  if (spendSlider) {
    spendSlider.addEventListener('input', (e) => {
      activeAdvisorAmount = parseInt(e.target.value);
      if (spendAmountDisplay) {
        spendAmountDisplay.textContent = `₹${activeAdvisorAmount.toLocaleString('en-IN')}`;
      }
      runAdvisorSimulation();
    });
  }

  // Preset buttons
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const amt = parseInt(btn.getAttribute('data-amount'));
      activeAdvisorAmount = amt;
      if (spendSlider) spendSlider.value = amt;
      if (spendAmountDisplay) {
        spendAmountDisplay.textContent = `₹${amt.toLocaleString('en-IN')}`;
      }
      runAdvisorSimulation();
    });
  });

  // International Toggle
  if (internationalToggle) {
    internationalToggle.addEventListener('change', (e) => {
      isAdvisorInternational = e.target.checked;
      runAdvisorSimulation();
    });
  }

  function runAdvisorSimulation() {
    const rec = advisorEngine.recommend({
      category: activeAdvisorCategory,
      spendAmount: activeAdvisorAmount,
      isInternational: isAdvisorInternational
    });

    if (!rec || !rec.winner) return;

    // Update Winner Card DOM
    const winnerThumb = document.getElementById('advWinnerThumb');
    const winnerName = document.getElementById('advWinnerName');
    const winnerBank = document.getElementById('advWinnerBank');
    const earnVal = document.getElementById('advEarnVal');
    const earnRate = document.getElementById('advEarnRate');
    const whyItWins = document.getElementById('advWhyItWins');
    const runnerList = document.getElementById('advRunnersList');

    if (winnerThumb) {
      winnerThumb.className = `winner-thumb skin-${rec.winner.card.skin}`;
      winnerThumb.textContent = rec.winner.card.displayName.substring(0, 7);
    }
    if (winnerName) winnerName.textContent = rec.winner.card.displayName;
    if (winnerBank) winnerBank.textContent = `${rec.winner.card.bank} • ${rec.winner.card.network}`;

    if (earnVal) earnVal.textContent = `₹${rec.winner.netValueInr.toLocaleString('en-IN')}`;
    if (earnRate) earnRate.textContent = `${rec.winner.netReturnPercent}% Net Return`;

    if (whyItWins) whyItWins.textContent = rec.winner.whyItWins;

    // Update Runners Up
    if (runnerList) {
      runnerList.innerHTML = rec.runnersUp.map(r => `
        <div class="runner-row">
          <span class="runner-name">${r.card.displayName}</span>
          <span class="runner-val">₹${r.netValueInr.toLocaleString('en-IN')} (${r.netReturnPercent}%)</span>
        </div>
      `).join('');
    }
  }

  // 4. SMS Spend Intelligence Sandbox
  const smsTextarea = document.getElementById('smsInputText');
  const smsParseBtn = document.getElementById('smsParseBtn');
  const smsSampleBtns = document.querySelectorAll('.sms-sample-btn');

  smsSampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      smsSampleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sampleId = btn.getAttribute('data-sample');
      const sampleObj = smsEngine.sampleSmsList.find(s => s.id === sampleId);
      if (sampleObj && smsTextarea) {
        smsTextarea.value = sampleObj.rawText;
        runSmsParse(sampleObj.rawText, sampleObj.sender);
      }
    });
  });

  if (smsParseBtn && smsTextarea) {
    smsParseBtn.addEventListener('click', () => {
      runSmsParse(smsTextarea.value, 'SMS-INBOX');
    });
  }

  async function runSmsParse(text, sender) {
    const result = await smsEngine.parseOnDevice(text, sender);

    // Update Terminal
    const termBank = document.getElementById('termBank');
    const termCard = document.getElementById('termCard');
    const termAmount = document.getElementById('termAmount');
    const termMerchant = document.getElementById('termMerchant');
    const termCategory = document.getElementById('termCategory');
    const termRewards = document.getElementById('termRewards');
    const termHash = document.getElementById('termHash');
    const termDuration = document.getElementById('termDuration');

    if (termBank) termBank.textContent = result.bank;
    if (termCard) termCard.textContent = `Card ending in ${result.cardLast4}`;
    if (termAmount) termAmount.textContent = `₹${result.amount.toLocaleString('en-IN')}`;
    if (termMerchant) termMerchant.textContent = result.merchant;
    if (termCategory) termCategory.textContent = result.category.toUpperCase();
    if (termRewards) termRewards.textContent = `+₹${result.rewardEstimateInr.toLocaleString('en-IN')} (${result.ratePercent}%)`;
    if (termHash) termHash.textContent = result.fullHash;
    if (termDuration) termDuration.textContent = `${result.parseDurationMs} ms (Local RAM)`;

    showToast(`Parsed in ${result.parseDurationMs}ms • DPDP Compliant`);
  }

  // 5. Annual Rewards Calculator
  const calcInputs = {
    online_shopping: document.getElementById('calcShoppingSlider'),
    dining: document.getElementById('calcDiningSlider'),
    flights: document.getElementById('calcFlightsSlider'),
    groceries: document.getElementById('calcGroceriesSlider'),
    fuel: document.getElementById('calcFuelSlider'),
    utilities: document.getElementById('calcUtilitiesSlider')
  };

  Object.entries(calcInputs).forEach(([key, input]) => {
    if (input) {
      input.addEventListener('input', () => {
        const valEl = document.getElementById(`val_${key}`);
        if (valEl) valEl.textContent = `₹${parseInt(input.value).toLocaleString('en-IN')}`;
        runCalculator();
      });
    }
  });

  function runCalculator() {
    const monthlySpends = {
      online_shopping: parseInt(calcInputs.online_shopping?.value || 15000),
      dining: parseInt(calcInputs.dining?.value || 8000),
      flights: parseInt(calcInputs.flights?.value || 12000),
      groceries: parseInt(calcInputs.groceries?.value || 10000),
      fuel: parseInt(calcInputs.fuel?.value || 4000),
      utilities: parseInt(calcInputs.utilities?.value || 6000)
    };

    const calcResult = calcEngine.calculateAnnual(monthlySpends);
    const topPick = calcResult.topPick;

    const netGainVal = document.getElementById('calcNetGainVal');
    const topCardName = document.getElementById('calcTopCardName');
    const feeStatus = document.getElementById('calcFeeStatus');
    const perksListEl = document.getElementById('calcPerksList');

    if (netGainVal) netGainVal.textContent = `₹${topPick.totalNetGainInr.toLocaleString('en-IN')}`;
    if (topCardName) topCardName.textContent = topPick.card.name;

    if (feeStatus) {
      feeStatus.textContent = topPick.feeWaived
        ? `Annual Fee 100% Waived (Spent ₹${(calcResult.totalAnnualSpend / 100000).toFixed(1)}L vs ₹${(topPick.card.waiverSpend / 100000).toFixed(1)}L)`
        : `Fee: ₹${topPick.card.renewalFee.toLocaleString('en-IN')}/year`;
    }

    if (perksListEl) {
      perksListEl.innerHTML = topPick.milestonePerksUnlocked.map(p => `
        <li class="perk-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${p}</span>
        </li>
      `).join('');
    }
  }

  // 6. Card Catalog Filtering & Search
  const catalogContainer = document.getElementById('catalogCardsGrid');
  const catalogTabs = document.querySelectorAll('.catalog-tabs .tab-btn');
  const catalogSearch = document.getElementById('catalogSearchInput');

  let activeCatalogFilter = 'all';

  function renderCatalog() {
    if (!catalogContainer) return;

    let filtered = CREDVERT_CARDS;

    // Filter by tab
    if (activeCatalogFilter === 'cashback') {
      filtered = filtered.filter(c => c.categoryRates['online_shopping'].rate >= 5.0 || c.slug.includes('cashback'));
    } else if (activeCatalogFilter === 'travel') {
      filtered = filtered.filter(c => c.categoryRates['flights'].rate >= 10.0 || c.slug.includes('atlas') || c.slug.includes('travel'));
    } else if (activeCatalogFilter === 'metal') {
      filtered = filtered.filter(c => c.metal);
    } else if (activeCatalogFilter === 'free') {
      filtered = filtered.filter(c => c.joiningFee === 0 || c.waiverSpend <= 200000);
    } else if (activeCatalogFilter === 'fuel') {
      filtered = filtered.filter(c => c.categoryRates['fuel']);
    }

    // Filter by search query
    const query = catalogSearch?.value.toLowerCase().trim();
    if (query) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.bank.toLowerCase().includes(query) ||
        c.overview.toLowerCase().includes(query)
      );
    }

    if (filtered.length === 0) {
      catalogContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-tertiary);">No credit cards match your criteria. Try another filter.</div>`;
      return;
    }

    catalogContainer.innerHTML = filtered.map(card => {
      const isComparing = compareList.includes(card.id);
      return `
        <div class="catalog-card-item" data-id="${card.id}">
          <div class="catalog-card-top">
            <div class="card-title-group">
              <h3>${card.displayName}</h3>
              <span class="card-bank-subtitle">${card.bank} • ${card.network}</span>
            </div>
            <span class="card-return-badge">${card.returnMin}% - ${card.returnMax}%</span>
          </div>

          <div class="catalog-mini-card skin-${card.skin}">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:0.8rem; color:#fff;">${card.bank}</span>
              ${card.metal ? '<span class="card-metal-tag">METAL</span>' : ''}
            </div>
            <div style="font-family:var(--font-mono); font-size:1rem; letter-spacing:0.12em; color:#fff;">
              •••• •••• •••• ${card.last4}
            </div>
            <div style="display:flex; justify-content:space-between; align-items:flex-end;">
              <span style="font-size:0.65rem; color:rgba(255,255,255,0.7); text-transform:uppercase;">CREDVERT VAULT</span>
              <img src="${card.networkLogo}" style="height:20px; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="${card.network}">
            </div>
          </div>

          <div class="specs-table">
            <div class="spec-cell">
              <span class="spec-title">Joining / Renewal</span>
              <span class="spec-val">₹${card.renewalFee.toLocaleString('en-IN')}</span>
            </div>
            <div class="spec-cell">
              <span class="spec-title">Fee Waiver Spend</span>
              <span class="spec-val">${card.waiverSpend > 0 ? `₹${(card.waiverSpend / 100000).toFixed(1)}L` : 'Lifetime Free'}</span>
            </div>
            <div class="spec-cell">
              <span class="spec-title">Forex Markup</span>
              <span class="spec-val">${card.forexMarkup}% + GST</span>
            </div>
            <div class="spec-cell">
              <span class="spec-title">Domestic Lounges</span>
              <span class="spec-val">${card.lounges.domestic.includes('Unlimited') ? 'Unlimited' : (card.lounges.domestic.includes('8') ? '8 / year' : (card.lounges.domestic.includes('4') ? '4 / year' : 'None'))}</span>
            </div>
          </div>

          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.25rem; line-height:1.5;">
            ${card.overview}
          </p>

          <div class="card-actions-row">
            <button class="btn btn-secondary btn-sm compare-btn ${isComparing ? 'active' : ''}" data-id="${card.id}">
              ${isComparing ? '✓ Comparing' : '+ Compare'}
            </button>
            <a href="${card.applyUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
              Apply Now &rarr;
            </a>
          </div>
        </div>
      `;
    }).join('');

    // Attach Compare Click Listeners
    document.querySelectorAll('.compare-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        toggleCompare(id);
      });
    });
  }

  catalogTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catalogTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCatalogFilter = tab.getAttribute('data-filter');
      renderCatalog();
    });
  });

  if (catalogSearch) {
    catalogSearch.addEventListener('input', () => {
      renderCatalog();
    });
  }

  // 7. Side-by-Side Comparison Modal & Dock
  const compareDock = document.getElementById('compareDock');
  const dockCardsList = document.getElementById('dockCardsList');
  const launchCompareModalBtn = document.getElementById('launchCompareModalBtn');
  const compareModal = document.getElementById('compareModal');
  const closeCompareModalBtn = document.getElementById('closeCompareModalBtn');
  const modalComparisonContent = document.getElementById('modalComparisonContent');

  function toggleCompare(cardId) {
    if (compareList.includes(cardId)) {
      compareList = compareList.filter(id => id !== cardId);
      showToast('Card removed from comparison');
    } else {
      if (compareList.length >= 3) {
        showToast('You can compare up to 3 cards simultaneously');
        return;
      }
      compareList.push(cardId);
      showToast('Card added to comparison dock');
    }
    updateCompareDock();
    renderCatalog();
  }

  function updateCompareDock() {
    if (!compareDock) return;
    if (compareList.length > 0) {
      compareDock.classList.add('visible');
      if (dockCardsList) {
        dockCardsList.innerHTML = compareList.map(id => {
          const card = CREDVERT_CARDS.find(c => c.id === id);
          return `
            <div class="dock-card-chip">
              <span>${card.displayName}</span>
              <span class="dock-card-remove" data-id="${card.id}">&times;</span>
            </div>
          `;
        }).join('');

        document.querySelectorAll('.dock-card-remove').forEach(rm => {
          rm.addEventListener('click', () => {
            const id = parseInt(rm.getAttribute('data-id'));
            toggleCompare(id);
          });
        });
      }
    } else {
      compareDock.classList.remove('visible');
    }
  }

  if (launchCompareModalBtn) {
    launchCompareModalBtn.addEventListener('click', () => {
      openCompareModal();
    });
  }

  if (closeCompareModalBtn && compareModal) {
    closeCompareModalBtn.addEventListener('click', () => {
      compareModal.classList.remove('open');
    });
    compareModal.addEventListener('click', (e) => {
      if (e.target === compareModal) compareModal.classList.remove('open');
    });
  }

  function openCompareModal() {
    if (compareList.length < 2) {
      showToast('Select at least 2 cards to compare side-by-side');
      return;
    }

    const cardsToCompare = CREDVERT_CARDS.filter(c => compareList.includes(c.id));
    if (!modalComparisonContent) return;

    modalComparisonContent.innerHTML = `
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
          <thead>
            <tr style="border-bottom: 2px solid var(--border-gold);">
              <th style="padding: 1rem; color: var(--text-tertiary);">Feature</th>
              ${cardsToCompare.map(c => `
                <th style="padding: 1rem; min-width: 200px;">
                  <div style="font-size: 1.15rem; color: var(--text-primary);">${c.displayName}</div>
                  <div style="font-size: 0.78rem; color: var(--gold);">${c.bank}</div>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 1rem; font-weight: 600;">Annual Fee</td>
              ${cardsToCompare.map(c => `<td style="padding: 1rem; font-family: var(--font-mono);">₹${c.renewalFee.toLocaleString('en-IN')}</td>`).join('')}
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 1rem; font-weight: 600;">Fee Waiver Threshold</td>
              ${cardsToCompare.map(c => `<td style="padding: 1rem;">${c.waiverSpend > 0 ? `₹${(c.waiverSpend / 100000).toFixed(1)} Lakhs` : 'Lifetime Free'}</td>`).join('')}
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 1rem; font-weight: 600;">Reward Rate Range</td>
              ${cardsToCompare.map(c => `<td style="padding: 1rem; color: var(--emerald-light); font-weight: 700;">${c.returnMin}% - ${c.returnMax}%</td>`).join('')}
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 1rem; font-weight: 600;">Dining Multiplier</td>
              ${cardsToCompare.map(c => `<td style="padding: 1rem;">${c.categoryRates.dining.rate}% (${c.categoryRates.dining.note})</td>`).join('')}
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 1rem; font-weight: 600;">Flight / Travel Rate</td>
              ${cardsToCompare.map(c => `<td style="padding: 1rem;">${c.categoryRates.flights.rate}% (${c.categoryRates.flights.note})</td>`).join('')}
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 1rem; font-weight: 600;">Forex Markup</td>
              ${cardsToCompare.map(c => `<td style="padding: 1rem;">${c.forexMarkup}% + 18% GST</td>`).join('')}
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 1rem; font-weight: 600;">Airport Lounge Access</td>
              ${cardsToCompare.map(c => `<td style="padding: 1rem; font-size: 0.82rem;">${c.lounges.domestic}</td>`).join('')}
            </tr>
            <tr>
              <td style="padding: 1rem; font-weight: 600;">Key Milestone Perk</td>
              ${cardsToCompare.map(c => `<td style="padding: 1rem; font-size: 0.82rem; color: var(--text-secondary);">${c.milestones[0]}</td>`).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    `;

    compareModal.classList.add('open');
  }

  // 8. Offers & Vouchers Copy Logic
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-code');
      navigator.clipboard.writeText(code).then(() => {
        showToast(`Promo Code "${code}" copied to clipboard!`);
      });
    });
  });

  // 9. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // 10. App Download Modal with QR Code
  const downloadBtns = document.querySelectorAll('.download-trigger-btn');
  const downloadModal = document.getElementById('downloadModal');
  const closeDownloadModalBtn = document.getElementById('closeDownloadModalBtn');

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (downloadModal) downloadModal.classList.add('open');
    });
  });

  if (closeDownloadModalBtn && downloadModal) {
    closeDownloadModalBtn.addEventListener('click', () => {
      downloadModal.classList.remove('open');
    });
    downloadModal.addEventListener('click', (e) => {
      if (e.target === downloadModal) downloadModal.classList.remove('open');
    });
  }

  // Toast Notification System
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Initial Boot
  selectHeroCard(0);
  runAdvisorSimulation();
  runCalculator();
  renderCatalog();
  if (smsTextarea) {
    smsTextarea.value = smsEngine.sampleSmsList[0].rawText;
    runSmsParse(smsTextarea.value, smsEngine.sampleSmsList[0].sender);
  }
});
