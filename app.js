/* =========================================
   MONEY TRACKER APP - STEP 5 (REVIEWED + PRIORITY RULES)
   ========================================= */

const CATEGORIES = ["Income", "Groceries", "Dining", "Bills and Utilities", "Subscriptions", "Transfers", "Transportation", "Shopping", "Health", "Entertainment", "Fees and Interest", "Miscellaneous"];

const CATEGORY_FLOW_MAP = {
  "Income": "Income", "Bills and Utilities": "Fixed Bill", "Subscriptions": "Fixed Bill", "Transfers": "Internal Transfer",
  "Groceries": "Flexible Spending", "Dining": "Flexible Spending", "Transportation": "Flexible Spending",
  "Shopping": "Flexible Spending", "Health": "Flexible Spending", "Entertainment": "Flexible Spending",
  "Fees and Interest": "Flexible Spending", "Miscellaneous": "Flexible Spending"
};

const CATEGORY_COLORS = {
  "Bills and Utilities": { bg: "rgba(0, 229, 255, 0.15)", color: "#00e5ff", border: "rgba(0, 229, 255, 0.4)", glow: "rgba(0, 229, 255, 0.25)" },
  "Groceries": { bg: "rgba(54, 240, 151, 0.15)", color: "#36f097", border: "rgba(54, 240, 151, 0.4)", glow: "rgba(54, 240, 151, 0.25)" },
  "Dining": { bg: "rgba(255, 170, 0, 0.15)", color: "#ffaa00", border: "rgba(255, 170, 0, 0.4)", glow: "rgba(255, 170, 0, 0.25)" },
  "Shopping": { bg: "rgba(255, 0, 85, 0.15)", color: "#ff0055", border: "rgba(255, 0, 85, 0.4)", glow: "rgba(255, 0, 85, 0.25)" },
  "Subscriptions": { bg: "rgba(157, 78, 221, 0.15)", color: "#9d4edd", border: "rgba(157, 78, 221, 0.4)", glow: "rgba(157, 78, 221, 0.25)" },
  "Transportation": { bg: "rgba(0, 119, 255, 0.15)", color: "#0077ff", border: "rgba(0, 119, 255, 0.4)", glow: "rgba(0, 119, 255, 0.25)" },
  "Health": { bg: "rgba(255, 107, 107, 0.15)", color: "#ff6b6b", border: "rgba(255, 107, 107, 0.4)", glow: "rgba(255, 107, 107, 0.25)" },
  "Entertainment": { bg: "rgba(247, 37, 133, 0.15)", color: "#f72585", border: "rgba(247, 37, 133, 0.4)", glow: "rgba(247, 37, 133, 0.25)" },
  "Transfers": { bg: "rgba(114, 9, 183, 0.15)", color: "#7209b7", border: "rgba(114, 9, 183, 0.4)", glow: "rgba(114, 9, 183, 0.25)" },
  "Fees and Interest": { bg: "rgba(255, 84, 0, 0.15)", color: "#ff5400", border: "rgba(255, 84, 0, 0.4)", glow: "rgba(255, 84, 0, 0.25)" },
  "Income": { bg: "rgba(0, 255, 136, 0.15)", color: "#00ff88", border: "rgba(0, 255, 136, 0.4)", glow: "rgba(0, 255, 136, 0.25)" },
  "Miscellaneous": { bg: "rgba(138, 143, 158, 0.15)", color: "#8a8f9e", border: "rgba(138, 143, 158, 0.4)", glow: "rgba(138, 143, 158, 0.2)" },
  "Other": { bg: "rgba(255, 255, 255, 0.1)", color: "#f0f2f8", border: "rgba(255, 255, 255, 0.2)", glow: "rgba(255, 255, 255, 0.1)" }
};

const CATEGORY_RULES = [
  { contains: "ROUNDUP", category: "Transfers", flow: "Internal Transfer" },
  { contains: "VAULT", category: "Transfers", flow: "Internal Transfer" },
  { contains: "INTEREST", category: "Income", flow: "Income" },
  { contains: "WAL-MART", category: "Groceries", flow: "Flexible Spending" },
  { contains: "WALMART", category: "Groceries", flow: "Flexible Spending" },
  { contains: "SUPERMARKET", category: "Groceries", flow: "Flexible Spending" },
  { contains: "MCDONALD", category: "Dining", flow: "Flexible Spending" },
  { contains: "SONIC", category: "Dining", flow: "Flexible Spending" },
  { contains: "DONUT", category: "Dining", flow: "Flexible Spending" },
  { contains: "PIZZA", category: "Dining", flow: "Flexible Spending" },
  { contains: "TACO", category: "Dining", flow: "Flexible Spending" },
  { contains: "BURGER", category: "Dining", flow: "Flexible Spending" },
  { contains: "RESTAURANT", category: "Dining", flow: "Flexible Spending" },
  { contains: "T-MOBILE", category: "Bills and Utilities", flow: "Fixed Bill" },
  { contains: "TMOBILE", category: "Bills and Utilities", flow: "Fixed Bill" },
  { contains: "MORTGAGE", category: "Bills and Utilities", flow: "Fixed Bill" },
  { contains: "SPOTIFY", category: "Subscriptions", flow: "Fixed Bill" },
  { contains: "PARAMOUNT", category: "Subscriptions", flow: "Fixed Bill" },
  { contains: "APPLE", category: "Subscriptions", flow: "Fixed Bill" },
  { contains: "PEACOCK", category: "Subscriptions", flow: "Fixed Bill" },
  { contains: "LOWES", category: "Shopping", flow: "Flexible Spending" },
  { contains: "SAM'S CLUB", category: "Shopping", flow: "Flexible Spending" }
];

const MAX_BRACKET = 999999999;
const DEFAULT_TAX_STATES = [
  {
    code: 'OK', name: 'Oklahoma',
    brackets: [
      { min: 0, max: 1000, rate: 0.25 },
      { min: 1000, max: 2500, rate: 0.75 },
      { min: 2500, max: 3750, rate: 1.75 },
      { min: 3750, max: 4900, rate: 2.75 },
      { min: 4900, max: 7200, rate: 3.75 },
      { min: 7200, max: MAX_BRACKET, rate: 4.75 }
    ]
  },
  {
    code: 'KS', name: 'Kansas',
    brackets: [
      { min: 0, max: 15000, rate: 3.10 },
      { min: 15000, max: 30000, rate: 5.25 },
      { min: 30000, max: MAX_BRACKET, rate: 5.70 }
    ]
  },
  { code: 'CO', name: 'Colorado', brackets: [{ min: 0, max: MAX_BRACKET, rate: 4.40 }] },
  { code: 'TX', name: 'Texas', brackets: [{ min: 0, max: MAX_BRACKET, rate: 0 }] },
  { code: 'FL', name: 'Florida', brackets: [{ min: 0, max: MAX_BRACKET, rate: 0 }] }
];

const INITIAL_EMPTY_STATE = {
  version: 3,
  accounts: {
    CHECKING: { id: "CHECKING", name: "Joint Checking", verifiedBalance: 0.00 },
    SAVINGS: { id: "SAVINGS", name: "Joint Savings", verifiedBalance: 0.00 }
  },
  vaults: [], pendingItems: [], transactions: [],
  scenarios: [{ id: "sc_honda", type: "custom", name: "Increase Honda Payment", amount: -100.00, active: true }],
  suggestedVaults: [], nicknameRules: [], customRules: [], loans: [],
  taxStates: JSON.parse(JSON.stringify(DEFAULT_TAX_STATES)),
  selectedState: 'OK'
};

/* ============ THEME PRESETS ============ */
const THEME_PRESETS = {
  dark: {
    accentPrimary: '#00e5ff',
    accentSecondary: '#b26bff',
    accentPositive: '#00ff9d',
    accentNegative: '#ff3d71',
    accentPending: '#ffb020',
    bgBase: '#0a0a0f',
    bgSurface: '#12121a',
    bgElevated: '#1a1a26',
    bgHover: '#222233',
    textMain: '#f0f2f8',
    textMuted: '#8a8f9e',
    textDim: '#5a5e6b',
    borderSubtle: 'rgba(255, 255, 255, 0.07)',
    borderGlow: 'rgba(0, 229, 255, 0.15)',
    shadowCard: '0 4px 20px rgba(0, 0, 0, 0.5)',
    shadowGlow: '0 0 15px rgba(0, 229, 255, 0.12)',
    cardHairline: 'rgba(255, 255, 255, 0.15)',
    headerBg: 'rgba(10, 10, 15, 0.85)',     // ADDED
    thBg: 'rgba(26, 26, 38, 0.94)',
    chartGrid: 'rgba(255, 255, 255, 0.08)',
    chartGridSoft: 'rgba(255, 255, 255, 0.06)',
  },
  light: {
    accentPrimary: '#0099bb',
    accentSecondary: '#7c3aed',
    accentPositive: '#059669',
    accentNegative: '#dc2626',
    accentPending: '#d97706',
    bgBase: '#f7f8fb',
    bgSurface: '#ffffff',
    bgElevated: '#f0f2f7',
    bgHover: '#e6e9f0',
    textMain: '#0f172a',
    textMuted: '#526078',
    textDim: '#8f97a8',
    borderSubtle: 'rgba(15, 23, 42, 0.09)',
    borderGlow: 'rgba(0, 153, 187, 0.20)',
    shadowCard: '0 2px 8px rgba(15, 23, 42, 0.08)',
    shadowGlow: '0 0 15px rgba(0, 153, 187, 0.12)',
    cardHairline: 'rgba(0, 0, 0, 0.06)',
    headerBg: 'rgba(255, 255, 255, 0.85)',  // ADDED
    thBg: 'rgba(240, 242, 247, 0.94)',
    chartGrid: 'rgba(0, 0, 0, 0.08)',
    chartGridSoft: 'rgba(0, 0, 0, 0.06)',
  }
};

/* Backward-compat alias — used by the picker's iteration list */
const DEFAULT_THEME = THEME_PRESETS.dark;

/* Keys that the user can override via the Appearance picker (matches the picker UI) */
const THEME_OVERRIDE_KEYS = [
  'accentPrimary', 'accentSecondary', 'accentPositive', 'accentNegative', 'accentPending',
  'bgBase', 'bgSurface', 'bgElevated', 'bgHover',
  'textMain', 'textMuted', 'textDim',
];

class MoneyTrackerApp {
  constructor() {
    this.state = this.loadStateSafe();
    this.activeProfile = this._bootstrapActive || 'Default';
    this.theme = this.loadTheme();
    this.themePreset = this.loadThemePreset();
    this.currentTab = 'checking';
    this.chartRanges = { checking: 'week', networth: 'year', forecaster: 'year' };
    this.selectedRows = new Set();
    this.calendarMonth = new Date();
    this.currentDrawerDate = null;
    this.resizeTimeout = null;
    this.saveTimeout = null;
    this.searchTimeout = null;
    this.sortState = { col: 'date', asc: false };
    this.compactDensity = false;
    this.searchQuery = '';
    this.stagedFiles = [];
    this.editingStateCode = null;
    this._piManual = false;
    this._settingsTab = 'profiles';
    this.editingRuleIndex = null;
    this._eventsBound = false;
    this.showLockedOnly = false;
    this.spendingRange = 'last_month';
    this.spendingCustom = 30;
  }

    flashBtnSuccess(btn) {
    if (!btn) return;
    const originalText = btn.innerHTML;
    btn.classList.add('btn-success-pop');
    btn.innerHTML = '✓';
    setTimeout(() => {
      btn.classList.remove('btn-success-pop');
      btn.innerHTML = originalText;
    }, 600);
  }

  /* ============ STORAGE HEALTH / TRIM ============ */
  checkStorageHealth() {
    const banner = document.getElementById('storageWarningBanner');
    const used = this.calculateStorageBytes();
    const limit = this.getStorageLimitBytes();
    const pct = (used / limit) * 100;

    document.body.classList.toggle('storage-warn-active', pct >= 85 && !this._bannerDismissed);

    if (!banner) return pct;

    if (pct >= 85 && !this._bannerDismissed) {
      banner.style.display = 'flex';
      banner.classList.toggle('warn', pct < 95);
      banner.classList.toggle('danger', pct >= 95);
      const pctEl = banner.querySelector('.storage-pct');
      const usedEl = banner.querySelector('.storage-used');
      if (pctEl) pctEl.innerText = pct.toFixed(1) + '%';
      if (usedEl) usedEl.innerText = (used / 1024 / 1024).toFixed(2) + ' MB';
    } else {
      banner.style.display = 'none';
    }

    if (pct >= 95 && !this._storageModalShown) {
      this._storageModalShown = true;
      this.openStorageFullModal();
    } else if (pct < 85) {
      this._storageModalShown = false;
    }

    return pct;
  }

  dismissStorageBanner() {
    this._bannerDismissed = true;
    document.body.classList.remove('storage-warn-active');
    const b = document.getElementById('storageWarningBanner');
    if (b) b.style.display = 'none';
  }

  openStorageFullModal() {
    const used = this.calculateStorageBytes();
    const limit = this.getStorageLimitBytes();
    const pct = (used / limit) * 100;
    const templates = this.collapseRecurringForStorage().filter(t => t.isTemplate);
    const curMonths = templates.length
      ? Math.max(...templates.map(t => t.ruleConfig?.maxMonths || 32))
      : 32;

    this.openModal(`
      <div class="modal-overlay active">
        <div class="modal modal-md">
          <div class="modal-header">
            <h2 class="modal-title">⚠ Storage Almost Full</h2>
            <button class="modal-close" data-action="closeModal" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">
            <p style="color:var(--text-muted); font-size:0.9rem; line-height:1.5; margin-bottom:0.9rem;">
              Your browser storage is <strong style="color:var(--accent-negative);">${pct.toFixed(1)}%</strong> full
              (${(used / 1024 / 1024).toFixed(2)} MB of ${(limit / 1024 / 1024).toFixed(0)} MB). New saves may fail soon.
            </p>
            <div style="background:var(--bg-base); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:0.9rem 1rem; font-size:0.82rem; line-height:1.5;">
              <div style="font-weight:600; color:var(--accent-primary); margin-bottom:0.4rem;">💡 Suggested fix</div>
              Trim the projection window of recurring items (Spotify, Mortgage, Gas Bill, etc.)
              from the current <strong>${curMonths} months</strong> down to a shorter window.
              <div style="color:var(--text-dim); margin-top:0.5rem;">
                ✓ Your posted / real transactions are never touched<br>
                ✓ Recurring rules (interval, category, amount) are preserved<br>
                ✓ You can re-extend the window anytime by editing a recurring item
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn" data-action="closeModal">Not Now</button>
            <button class="btn btn-primary" data-action="trimRecurringAndClose">Trim Recurring Now</button>
          </div>
        </div>
      </div>
    `);
  }

  trimRecurringAndClose() {
    const ok = this.trimRecurringToFit();
    this.closeModal();
    this.renderTabContent(this.currentTab);
    this.showToast(ok
      ? '✓ Trimmed — storage is now safe'
      : 'Could not free enough space. Try exporting and deleting unused profiles.');
  }

  trimRecurringToFit() {
    for (let pass = 0; pass < 20; pass++) {
      const pct = this.calculateStorageBytes() / this.getStorageLimitBytes();
      if (pct < 0.70) return true;

      const templates = this.collapseRecurringForStorage().filter(t => t.isTemplate);
      let changed = false;
      templates.forEach(tmpl => {
        if (!tmpl.ruleConfig) tmpl.ruleConfig = {};
        const cur = tmpl.ruleConfig.maxMonths || 32;
        if (cur > 1) {
          tmpl.ruleConfig.maxMonths = Math.max(1, Math.floor(cur * 0.7));
          changed = true;
        }
      });
      if (!changed) return false;

      const nonRec = this.state.transactions.filter(
        t => !(t.status === 'estimated' && t.groupId)
      );
      this.state.transactions = [...nonRec, ...templates];
      this.expandRecurringTemplates();
      if (!this._flushState()) return false;
    }
    return this.calculateStorageBytes() / this.getStorageLimitBytes() < 0.85;
  }

  /* ============================================================
     PROFILES, BACKUP, THEME
     ============================================================ */

  loadTheme() {
    try { return JSON.parse(localStorage.getItem('MONEY_TRACKER_THEME')) || {}; }
    catch (e) { return {}; }
  }
  saveTheme(theme) {
    this.theme = theme;
    localStorage.setItem('MONEY_TRACKER_THEME', JSON.stringify(theme));
  }
  loadThemePreset() {
    try {
      const p = localStorage.getItem('MONEY_TRACKER_THEME_PRESET');
      return (p && THEME_PRESETS[p]) ? p : 'dark';
    } catch (e) { return 'dark'; }
  }
  applyTheme() {
    const preset = THEME_PRESETS[this.themePreset] || THEME_PRESETS.dark;
    const merged = { ...preset, ...this.theme };
    const map = {
      accentPrimary: '--accent-primary',
      accentSecondary: '--accent-secondary',
      accentPositive: '--accent-positive',
      accentNegative: '--accent-negative',
      accentPending: '--accent-pending',
      bgBase: '--bg-base',
      bgSurface: '--bg-surface',
      bgElevated: '--bg-elevated',
      bgHover: '--bg-hover',
      textMain: '--text-main',
      textMuted: '--text-muted',
      textDim: '--text-dim',
      borderSubtle: '--border-subtle',
      borderGlow: '--border-glow',
      shadowCard: '--shadow-card',
      shadowGlow: '--shadow-glow',
      cardHairline: '--card-hairline',
      headerBg: '--header-bg',   // ADDED
      thBg: '--th-bg',
      chartGrid: '--chart-grid',
      chartGridSoft: '--chart-grid-soft',
    };
    Object.keys(map).forEach(k => {
      if (merged[k]) document.documentElement.style.setProperty(map[k], merged[k]);
    });
    document.documentElement.setAttribute('data-theme', this.themePreset);
  }

    _chartColors() {
    const s = getComputedStyle(document.documentElement);
    const v = (k, fallback) => s.getPropertyValue(k).trim() || fallback;
    return {
      accentPrimary: v('--accent-primary', '#00e5ff'),
      accentSecondary: v('--accent-secondary', '#b26bff'),
      accentPositive: v('--accent-positive', '#00ff9d'),
      accentNegative: v('--accent-negative', '#ff3d71'),
      textMuted: v('--text-muted', '#8a8f9e'),
      textDim: v('--text-dim', '#5a5e6b'),
      bgBase: v('--bg-base', '#0a0a0f'),
      chartGrid: v('--chart-grid', 'rgba(255, 255, 255, 0.08)'),
      chartGridSoft: v('--chart-grid-soft', 'rgba(255, 255, 255, 0.06)'),
    };
  }

  switchProfile(nameOrBtn) {
    const name = typeof nameOrBtn === 'string' ? nameOrBtn : nameOrBtn?.dataset?.profile;
    if (!name || name === this.activeProfile) return;
    const profiles = this.loadProfiles();
    if (!profiles[name]) { this.showToast(`Profile "${name}" not found`); return; }

    this._flushState();

    const target = profiles[name];
    this.activeProfile = name;
    this.state = target.state;
    localStorage.setItem('MONEY_TRACKER_ACTIVE_PROFILE', name);

    this.expandRecurringTemplates();
    this.recalculateBalances();
    this.applyCustomRules();
    this.cleanSpotify();
    this.recalculateLoanBalances();
    this.renderTabContent(this.currentTab);
    this.closeModal();
    this.showToast(`Switched to "${name}"`);
  }

  saveProfileAs(name) {
    name = (name || '').trim();
    if (!name) { this.showToast('Enter a profile name'); return; }
    if (/[\\\/:*?"<>|]/.test(name)) {
      this.showToast('Profile name contains invalid characters');
      return;
    }

    const profiles = this.loadProfiles();
    if (profiles[name] && name !== this.activeProfile) {
      if (!confirm(`Profile "${name}" already exists. Overwrite it with the current data?`)) return;
    }

    this._flushState();

    const fresh = this.loadProfiles();
    fresh[name] = {
      state: JSON.parse(JSON.stringify(this.state)),
      savedAt: new Date().toISOString()
    };

    if (!this.saveProfiles(fresh)) return;

    this.activeProfile = name;
    localStorage.setItem('MONEY_TRACKER_ACTIVE_PROFILE', name);
    this.showToast(`Saved as "${name}"`);
    this.openSettingsModal('home');
  }

  deleteProfile(nameOrBtn) {
    const name = typeof nameOrBtn === 'string' ? nameOrBtn : nameOrBtn?.dataset?.profile;
    if (name === this.activeProfile) {
      this.showToast('Cannot delete the active profile. Switch to another first.');
      return;
    }
    if (!confirm(`Are you sure you want to delete the profile "${name}"?`)) return;
    if (!confirm(`DOUBLE CONFIRMATION:\nThis will permanently erase all data, transactions, and settings in the profile "${name}".\n\nAre you absolutely sure?`)) return;

    const profiles = this.loadProfiles();
    delete profiles[name];

    if (this.saveProfiles(profiles)) {
      this.showToast(`Deleted "${name}"`);
    }
    this.openSettingsModal('home');
  }

  exportProfile(name) {
    const profiles = this.loadProfiles();
    const p = profiles[name];
    if (!p) { this.showToast(`Profile "${name}" not found`); return; }

    const blob = new Blob([JSON.stringify(p.state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 500);
    this.showToast(`Exported "${name}"`);
  }

  exportCurrentProfile() {
    this._flushState();
    const blob = new Blob([JSON.stringify(this.state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.activeProfile}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 500);
    this.showToast(`Exported "${this.activeProfile}"`);
  }

  triggerImportProfile() {
    const input = document.getElementById('jsonInput');
    input.value = '';
    input.onchange = (e) => this.importProfile(e);
    input.click();
  }

  importProfile(evt) {
    const file = evt.target.files[0];
    if (!file) return;
    const rawName = file.name.replace(/\.json$/i, '').trim() || 'Imported';

    const reader = new FileReader();
    reader.onload = (e) => {
      let parsed;
      try { parsed = JSON.parse(e.target.result); }
      catch (err) { alert('Invalid JSON file'); return; }

      if (!parsed.taxStates || !parsed.taxStates.length) {
        parsed.taxStates = JSON.parse(JSON.stringify(DEFAULT_TAX_STATES));
      }
      parsed.scenarios = parsed.scenarios || [];
      parsed.scenarios.forEach(s => { if (!s.type) s.type = 'custom'; });
      parsed.vaults = parsed.vaults || [];
      parsed.pendingItems = parsed.pendingItems || [];
      parsed.transactions = parsed.transactions || [];
      parsed.loans = parsed.loans || [];
      parsed.customRules = parsed.customRules || parsed.nicknameRules || [];
      parsed.customRules.forEach(r => {
        if (!r.category) r.category = '';
        if (r.doesNotContain == null) r.doesNotContain = '';
      });

      const profiles = this.loadProfiles();
      let finalName = rawName;
      if (profiles[finalName]) {
        const overwrite = confirm(`A profile named "${finalName}" already exists.\n\nOK = Overwrite it\nCancel = Save as a copy with a new name`);
        if (!overwrite) {
          finalName = prompt('Enter a new profile name:', `${finalName} (copy)`);
          if (!finalName) return;
          finalName = finalName.trim();
          if (!finalName) return;
        }
      }

      profiles[finalName] = {
        state: parsed,
        savedAt: new Date().toISOString()
      };
      if (!this.saveProfiles(profiles)) return;

      if (finalName === this.activeProfile) {
        this.state = parsed;
        this.expandRecurringTemplates();
        this.recalculateBalances();
        this.applyCustomRules();
        this.renderTabContent(this.currentTab);
        this.closeModal();
        this.showToast(`Imported "${finalName}" (Refreshed)`);
      } else {
        this.switchProfile(finalName);
        this.showToast(`Imported "${finalName}"`);
      }
    };
    reader.readAsText(file);
  }

  clearCurrentProfileData() {
    if (!confirm(`Clear ALL data in profile "${this.activeProfile}"? This cannot be undone.`)) return;
    if (!confirm('DOUBLE CONFIRMATION: This will permanently reset the current profile.')) return;

    this.state = JSON.parse(JSON.stringify(INITIAL_EMPTY_STATE));
    this.selectedRows.clear();
    this._flushState();
    this.init();
    this.closeModal();
    this.showToast('Current profile data cleared');
  }

  openSettingsModal(screen = 'home') {
    if (screen instanceof HTMLElement) screen = 'home';

    this._settingsScreen = screen;
    const profiles = this.loadProfiles();
    const activeData = profiles[this.activeProfile];
    const savedAt = activeData ? new Date(activeData.savedAt).toLocaleString() : 'Never';
    const preset = THEME_PRESETS[this.themePreset] || THEME_PRESETS.dark;
    const theme = { ...preset, ...this.theme };

    let body = '';

    if (screen === 'home') {
      const profileNames = Object.keys(profiles).sort();

      body = `
        <div style="background:linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-base) 100%); border:1px solid var(--border-glow); border-radius:var(--radius-lg); padding:1.5rem; margin-bottom:1.5rem; box-shadow:var(--shadow-glow);">
          <div class="stat-label" style="font-size:0.75rem; letter-spacing:0.1em; margin-bottom:0.25rem;">ACTIVE PROFILE</div>
          <div style="font-size:1.8rem; font-weight:800; color:var(--accent-primary); line-height:1.1; text-shadow:0 0 20px rgba(0,229,255,0.2);">${this.escapeHtml(this.activeProfile)}</div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">Last saved: ${savedAt}</div>

          <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
            <div class="stat-label" style="font-size:0.65rem; margin-bottom:0.5rem;">MANAGE PROFILES</div>
            <div style="display:flex; flex-direction:column; gap:0.5rem; max-height: 250px; overflow-y:auto; padding-right:4px;">
              ${profileNames.map(p => `
                <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-base); padding:0.6rem 0.75rem; border-radius:var(--radius-sm); border:1px solid ${p === this.activeProfile ? 'var(--accent-primary)' : 'var(--border-subtle)'};">
                  <span style="font-weight:600; font-size:0.85rem; color:${p === this.activeProfile ? 'var(--accent-primary)' : 'var(--text-main)'}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:50%;">${this.escapeHtml(p)}</span>
                  ${p === this.activeProfile
          ? `<span class="badge badge-posted" style="background:rgba(0,229,255,0.1); color:var(--accent-primary);">ACTIVE</span>`
          : `<div style="display:flex; gap:0.4rem;">
                         <button class="btn btn-sm" data-action="switchProfile" data-profile="${this.escapeHtml(p)}">Switch</button>
                         <button class="btn btn-sm btn-danger" data-action="deleteProfile" data-profile="${this.escapeHtml(p)}" title="Delete Profile">🗑</button>
                       </div>`
        }
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          <button class="btn" onclick="app.openSettingsModal('storage')" style="justify-content:flex-start; padding:1rem; text-align:left; height:auto;">
            <div style="font-size:1.2rem; margin-right:12px;">💾</div>
            <div>
              <div style="font-weight:700; font-size:0.95rem;">Storage</div>
              <div style="font-size:0.75rem; color:var(--text-muted); font-weight:400;">View database usage & limits</div>
            </div>
          </button>

          <button class="btn" onclick="app.openSettingsModal('backup')" style="justify-content:flex-start; padding:1rem; text-align:left; height:auto;">
            <div style="font-size:1.2rem; margin-right:12px;">📦</div>
            <div>
              <div style="font-weight:700; font-size:0.95rem;">Backups</div>
              <div style="font-size:0.75rem; color:var(--text-muted); font-weight:400;">Export, import, or clear profile</div>
            </div>
          </button>

          <button class="btn" onclick="app.openSettingsModal('appearance')" style="justify-content:flex-start; padding:1rem; text-align:left; height:auto;">
            <div style="font-size:1.2rem; margin-right:12px;">🎨</div>
            <div>
              <div style="font-weight:700; font-size:0.95rem;">Appearance</div>
              <div style="font-size:0.75rem; color:var(--text-muted); font-weight:400;">Theme, colors, and dark mode</div>
            </div>
          </button>
        </div>
      `;
    }

    if (screen !== 'home') {
      const backBtn = `
        <button onclick="app.openSettingsModal('home')" style="background:transparent; border:none; color:var(--accent-primary); font-weight:600; font-size:0.85rem; cursor:pointer; padding:0; margin-bottom:1rem; display:flex; align-items:center; gap:6px;">
          ← Back to Profile
        </button>
      `;

      if (screen === 'backup') {
        body = backBtn + `
          <div style="background:var(--bg-base); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:1rem; margin-bottom:1rem;">
            <div class="stat-label" style="font-size:0.65rem; margin-bottom:0.5rem;">BACKUP & RESTORE</div>
            <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
              Export the current profile as a JSON file, or import a JSON file as a new profile.
            </div>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.6rem;">
            <button class="btn btn-primary" onclick="app.exportCurrentProfile()" style="justify-content:flex-start; padding:0.75rem 1rem;">
              📥 <div style="text-align:left;"><div style="font-weight:600;">Export Current Profile</div><div style="font-size:0.7rem; color:var(--text-dim); font-weight:400;">Download "${this.escapeHtml(this.activeProfile)}.json"</div></div>
            </button>
            <button class="btn" onclick="app.triggerImportProfile()" style="justify-content:flex-start; padding:0.75rem 1rem;">
              📤 <div style="text-align:left;"><div style="font-weight:600;">Import JSON as New Profile</div><div style="font-size:0.7rem; color:var(--text-dim); font-weight:400;">Filename becomes the profile name</div></div>
            </button>
            <div style="border-top:1px solid var(--border-subtle); margin-top:0.5rem; padding-top:0.75rem;">
              <button class="btn btn-danger" onclick="app.clearCurrentProfileData()" style="justify-content:flex-start; padding:0.75rem 1rem; width:100%;">
                🗑 <div style="text-align:left;"><div style="font-weight:600;">Clear Current Profile Data</div><div style="font-size:0.7rem; color:var(--text-dim); font-weight:400;">Wipes "${this.escapeHtml(this.activeProfile)}" — cannot be undone</div></div>
              </button>
            </div>
          </div>
        `;
      }

      if (screen === 'appearance') {
        const picker = (key, label, hint) => `
          <div style="display:flex; align-items:center; gap:0.75rem; padding:0.5rem 0; border-bottom:1px solid var(--border-subtle);">
            <input type="color" id="theme_${key}" value="${theme[key]}"
                   oninput="app.previewThemeColor('${key}', this.value)"
                   style="width:44px; height:32px; padding:0; border:1px solid var(--border-subtle); border-radius:6px; cursor:pointer; background:transparent;">
            <div style="flex:1; min-width:0;">
              <div style="font-weight:600; font-size:0.85rem;">${label}</div>
              <div style="font-size:0.7rem; color:var(--text-dim);">${hint}</div>
            </div>
            <span class="mono" style="font-size:0.75rem; color:var(--text-muted);">${theme[key]}</span>
          </div>
        `;

        body = backBtn + `
          <div style="margin-bottom:1.25rem;">
            <div class="stat-label" style="font-size:0.65rem; margin-bottom:0.5rem;">PRESET</div>
            <div class="segmented" style="width:100%;">
              <button class="btn ${this.themePreset === 'dark' ? 'active-mode' : ''}" data-action="setThemePreset" data-preset="dark" style="flex:1;">🌙 Dark</button>
              <button class="btn ${this.themePreset === 'light' ? 'active-mode' : ''}" data-action="setThemePreset" data-preset="light" style="flex:1;">☀ Light</button>
            </div>
            <div class="field-hint" style="margin-top:6px;">Switching presets updates the base palette. Any overrides below still apply on top.</div>
          </div>
          <div style="margin-bottom:1rem;">
            <div class="stat-label" style="font-size:0.65rem; margin-bottom:0.5rem;">ACCENTS</div>
            ${picker('accentPrimary', 'Primary Accent', 'Buttons, active tabs, highlights')}
            ${picker('accentSecondary', 'Secondary Accent', 'Vaults, charts, projections')}
            ${picker('accentPositive', 'Positive / Income', 'Green values, gains')}
            ${picker('accentNegative', 'Negative / Expense', 'Red values, losses')}
            ${picker('accentPending', 'Pending', 'Amber badges')}
          </div>
          <div style="margin-bottom:1rem;">
            <div class="stat-label" style="font-size:0.65rem; margin-bottom:0.5rem;">SURFACES</div>
            ${picker('bgBase', 'Background', 'App background')}
            ${picker('bgSurface', 'Surface', 'Cards, panels')}
            ${picker('bgElevated', 'Elevated Surface', 'Dropdowns, buttons')}
            ${picker('bgHover', 'Hover', 'Row hover background')}
          </div>
          <div style="margin-bottom:1rem;">
            <div class="stat-label" style="font-size:0.65rem; margin-bottom:0.5rem;">TEXT</div>
            ${picker('textMain', 'Primary Text', 'Headings, body')}
            ${picker('textMuted', 'Muted Text', 'Labels, secondary')}
            ${picker('textDim', 'Dim Text', 'Tertiary')}
          </div>
          <div style="display:flex; gap:0.5rem; justify-content:flex-end; border-top:1px solid var(--border-subtle); padding-top:1rem;">
            <button class="btn btn-sm" onclick="app.resetTheme()">↺ Reset Overrides</button>
          </div>
        `;
      }

      if (screen === 'storage') {
        const usedBytes = this.calculateStorageBytes();
        const limitBytes = this.getStorageLimitBytes();
        const pct = Math.min(100, (usedBytes / limitBytes) * 100);
        const displayUsed = (usedBytes / 1024 / 1024).toFixed(2);
        const displayLimit = (limitBytes / 1024 / 1024).toFixed(0);

        let barColor = 'var(--accent-positive)';
        if (pct > 90) barColor = 'var(--accent-negative)';
        else if (pct > 70) barColor = 'var(--accent-pending)';

        body = backBtn + `
          <div style="background:var(--bg-base); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:1.5rem 1rem; margin-bottom:1rem;">
            <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:0.5rem;">
              <div>
                <div class="stat-label" style="font-size:0.65rem;">DATABASE USAGE</div>
                <div style="font-size:1.4rem; font-weight:700; color:var(--text-main); line-height:1;">
                  ${displayUsed} <span style="font-size:0.8rem; font-weight:400; color:var(--text-muted);">MB / ${displayLimit} MB</span>
                </div>
              </div>
              <div style="font-size:0.8rem; font-weight:600; color:${barColor};">
                ${pct.toFixed(1)}%
              </div>
            </div>
            <div style="height:12px; background:var(--bg-elevated); border-radius:6px; overflow:hidden; border:1px solid var(--border-subtle); margin-top:0.75rem;">
              <div style="height:100%; width:${pct}%; background:${barColor}; box-shadow:0 0 10px ${barColor}; transition:width 0.5s ease;"></div>
            </div>
          </div>
          <div style="background:rgba(0,229,255,0.05); border:1px solid rgba(0,229,255,0.2); border-radius:var(--radius-sm); padding:1rem; font-size:0.85rem; line-height:1.5; color:var(--text-muted);">
            <div style="font-weight:600; color:var(--accent-primary); margin-bottom:0.25rem;">💡 Pro Tip: Switch Browsers for More Space</div>
            Chrome and Safari typically cap local storage at <strong>5 MB</strong>. Firefox currently allows up to <strong>10 MB</strong>. If you are running low on space, try exporting your profiles and opening this app in Firefox to import them.
          </div>
        `;
      }
    }

    this.openModal(`
      <div class="modal-overlay active">
        <div class="modal modal-lg">
          <div class="modal-header">
            <h2 class="modal-title">⚙ Settings</h2>
            <button class="modal-close" data-action="closeModal" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">${body}</div>
        </div>
      </div>
    `);
  }

  previewThemeColor(key, value) {
    const map = {
      accentPrimary: '--accent-primary',
      accentSecondary: '--accent-secondary',
      accentPositive: '--accent-positive',
      accentNegative: '--accent-negative',
      accentPending: '--accent-pending',
      bgBase: '--bg-base',
      bgSurface: '--bg-surface',
      bgElevated: '--bg-elevated',
      bgHover: '--bg-hover',
      textMain: '--text-main',
      textMuted: '--text-muted',
      textDim: '--text-dim',
    };
    if (map[key]) document.documentElement.style.setProperty(map[key], value);

    if (this._themeSaveT) clearTimeout(this._themeSaveT);
    this._themeSaveT = setTimeout(() => {
      const overrides = {};
      THEME_OVERRIDE_KEYS.forEach(k => {
        const el = document.getElementById('theme_' + k);
        if (el) overrides[k] = el.value;
      });
      this.saveTheme(overrides);
    }, 200);
  }

  resetTheme() {
    if (!confirm('Clear all custom color overrides?\n\nThe preset colors will be restored.')) return;
    this.saveTheme({});
    this.applyTheme();
    this.openSettingsModal('appearance');
    this.showToast('Overrides cleared — preset restored');
    setTimeout(() => this.renderCharts(), 60);
  }

    setThemePreset(presetOrBtn) {
    const preset = typeof presetOrBtn === 'string'
      ? presetOrBtn
      : presetOrBtn?.dataset?.preset;
    if (!preset || !THEME_PRESETS[preset]) return;
    if (preset === this.themePreset) return;

    const wasInAppearance = this._settingsScreen === 'appearance';

    this.themePreset = preset;
    localStorage.setItem('MONEY_TRACKER_THEME_PRESET', preset);
    this.applyTheme();

    if (wasInAppearance) this.openSettingsModal('appearance');
    this.renderTabContent(this.currentTab);

    const hb = document.getElementById('themeToggleBtn');
    if (hb) {
      hb.textContent = preset === 'light' ? '🌙' : '☀';
      hb.title = preset === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
    }

    this.showToast(preset === 'light' ? '☀ Light theme' : '🌙 Dark theme');
    setTimeout(() => this.renderCharts(), 60);
  }

  toggleThemePreset() {
    this.setThemePreset(this.themePreset === 'light' ? 'dark' : 'light');
  }

  calculateStorageBytes() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const val = localStorage.getItem(key);
      if (val) {
        total += new Blob([val]).size;
      }
    }
    return total;
  }
  getStorageLimitBytes() {
    const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
    return isFirefox ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
  }

  loadStateSafe() {
    let profiles = {};
    try { profiles = JSON.parse(localStorage.getItem('MONEY_TRACKER_PROFILES')) || {}; }
    catch (e) { profiles = {}; }

    let activeName = localStorage.getItem('MONEY_TRACKER_ACTIVE_PROFILE');
    if (!activeName || !profiles[activeName]) {
      const keys = Object.keys(profiles);
      activeName = keys.length ? keys[0] : 'Default';
    }

    const legacy = localStorage.getItem('MONEY_TRACKER_STATE_V3');
    if (legacy && !profiles[activeName]?.state) {
      try {
        const parsedLegacy = JSON.parse(legacy);
        profiles[activeName] = {
          state: parsedLegacy,
          savedAt: new Date().toISOString()
        };
        localStorage.setItem('MONEY_TRACKER_PROFILES', JSON.stringify(profiles));
        localStorage.removeItem('MONEY_TRACKER_STATE_V3');
      } catch (e) { console.error('Legacy migration failed:', e); }
    }

    if (!profiles[activeName]) {
      profiles[activeName] = {
        state: JSON.parse(JSON.stringify(INITIAL_EMPTY_STATE)),
        savedAt: new Date().toISOString()
      };
    }
    if (!profiles[activeName].state) {
      profiles[activeName].state = JSON.parse(JSON.stringify(INITIAL_EMPTY_STATE));
    }

    const s = profiles[activeName].state;
    s.vaults = s.vaults || [];
    s.vaults.forEach(v => {
      if (v.startingBalance === undefined) {
        v.startingBalance = parseFloat(v.balance) || 0;
      }
    });
    s.pendingItems = s.pendingItems || [];
    s.transactions = s.transactions || [];
    s.scenarios = s.scenarios || [];
    s.scenarios.forEach(x => { if (!x.type) x.type = 'custom'; });
    s.suggestedVaults = s.suggestedVaults || [];

    s.customRules = s.customRules || s.nicknameRules || [];
    s.customRules.forEach(r => {
      if (!r.category) r.category = '';
      if (r.doesNotContain == null) r.doesNotContain = '';
    });
    delete s.nicknameRules;

    s.loans = s.loans || [];
    s.accounts = s.accounts || JSON.parse(JSON.stringify(INITIAL_EMPTY_STATE.accounts));
    if (s.accounts.CHECKING) s.accounts.CHECKING.name = s.accounts.CHECKING.name.replace(/\s+\d{4}$/, '');
    if (s.accounts.SAVINGS) s.accounts.SAVINGS.name = s.accounts.SAVINGS.name.replace(/\s+\d{4}$/, '');
    if (!s.taxStates || !Array.isArray(s.taxStates) || !s.taxStates.length) {
      s.taxStates = JSON.parse(JSON.stringify(DEFAULT_TAX_STATES));
    }
    if (!s.selectedState) s.selectedState = s.taxStates[0]?.code || 'OK';

    this._bootstrapProfiles = profiles;
    this._bootstrapActive = activeName;
    try {
      localStorage.setItem('MONEY_TRACKER_PROFILES', JSON.stringify(profiles));
      localStorage.setItem('MONEY_TRACKER_ACTIVE_PROFILE', activeName);
    } catch (e) {
      console.error('Boot save failed:', e);
      setTimeout(() => alert('Storage is full. Your data may not save. Please export and remove unused profiles.'), 100);
    }

    return s;
  }

  expandRecurringTemplates() {
    const templates = this.state.transactions.filter(
      t => t.status === 'estimated' && t.isTemplate
    );
    if (!templates.length) return;

    const nonTemplates = this.state.transactions.filter(
      t => !(t.status === 'estimated' && t.isTemplate)
    );
    const out = [...nonTemplates];

    templates.forEach(tmpl => {
      const cfg = tmpl.ruleConfig || { interval: 1, freq: 'months' };
      const interval = Math.max(1, cfg.interval || 1);
      const freq = cfg.freq || 'months';
      const endType = cfg.endType || (cfg.count != null ? 'count' : 'forever');
      const endVal = cfg.endVal != null ? cfg.endVal : cfg.count;
      const maxMonths = Math.max(1, Math.min(cfg.maxMonths || 32, 32));

      const startDate = new Date(tmpl.date + 'T00:00:00');
      const capDate = new Date(startDate);
      capDate.setMonth(capDate.getMonth() + maxMonths);

      let cur = new Date(startDate);
      let i = 0;
      while (cur <= capDate && i < 200) {
        if (endType === 'until' && endVal && cur > new Date(endVal + 'T00:00:00')) break;
        if (endType === 'count' && endVal && i >= endVal) break;

        const dateStr = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}-${String(cur.getDate()).padStart(2, '0')}`;
        out.push({ ...tmpl, id: `${tmpl.groupId}_${i}`, date: dateStr, isTemplate: false });

        if (freq === 'days') cur.setDate(cur.getDate() + interval);
        else if (freq === 'weeks') cur.setDate(cur.getDate() + 7 * interval);
        else if (freq === 'months') cur.setMonth(cur.getMonth() + interval);
        else if (freq === 'years') cur.setFullYear(cur.getFullYear() + interval);
        i++;
      }
    });

    this.state.transactions = out;
  }

  collapseRecurringForStorage() {
    const seen = new Set();
    const out = [];
    for (const t of this.state.transactions) {
      if (t.status === 'estimated' && t.groupId) {
        if (seen.has(t.groupId)) continue;
        seen.add(t.groupId);
        out.push({ ...t, id: `${t.groupId}_template`, isTemplate: true });
      } else {
        const c = { ...t };
        delete c.isTemplate;
        out.push(c);
      }
    }
    return out;
  }

  saveState() {
    if (this.saveTimeout) clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => this._flushState(), 1200);
  }

  _flushState() {
    if (this.saveTimeout) { clearTimeout(this.saveTimeout); this.saveTimeout = null; }
    try {
      const profiles = JSON.parse(localStorage.getItem('MONEY_TRACKER_PROFILES')) || {};
      const compactState = { ...this.state, transactions: this.collapseRecurringForStorage() };
      profiles[this.activeProfile] = {
        state: compactState,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('MONEY_TRACKER_PROFILES', JSON.stringify(profiles));
      localStorage.setItem('MONEY_TRACKER_ACTIVE_PROFILE', this.activeProfile);
      this.checkStorageHealth();
      return true;
    } catch (e) {
      console.error('Save failed:', e);
      if (String(e).includes('Quota') || String(e).includes('quota')) {
        this.showToast('⚠ Storage full — see banner for options');
        this.checkStorageHealth();
      } else {
        this.showToast('Save failed: ' + e.message);
      }
      return false;
    }
  }

  loadProfiles() {
    try { return JSON.parse(localStorage.getItem('MONEY_TRACKER_PROFILES')) || {}; }
    catch (e) { return {}; }
  }
  saveProfiles(profiles) {
    try {
      localStorage.setItem('MONEY_TRACKER_PROFILES', JSON.stringify(profiles));
      return true;
    } catch (e) {
      console.error('saveProfiles failed:', e);
      this.showToast('⚠ Storage full — could not save profile');
      return false;
    }
  }

  init() {
    this.expandRecurringTemplates();
    this.applyTheme();
    this.recalculateBalances();
    this.applyCustomRules();
    this.cleanSpotify();
    this.recalculateLoanBalances();
    this.renderTabContent(this.currentTab);
    
    // 👇 ENSURE THIS LINE IS HERE 👇
    this.injectMobileNav();         
    
    this.bindGlobalEvents();
    this.checkStorageHealth();
    setTimeout(() => this._flushState(), 100);
  }

    injectMobileNav() {
    if (document.getElementById('mobileBottomNav')) return;
    
    const nav = document.createElement('nav');
    nav.id = 'mobileBottomNav';
    nav.className = 'mobile-bottom-nav';
    nav.innerHTML = `
      <button class="mbn-item active" data-tab="checking">
        <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
        <span>Checking</span>
      </button>
      <button class="mbn-item" data-tab="savings">
        <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V10l7-5 7 5v11" />
          <path d="M9 21v-6h6v6" />
        </svg>
        <span>Savings</span>
      </button>
      <button class="mbn-item" data-tab="networth">
        <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="16" />
        </svg>
        <span>Net Worth</span>
      </button>
      <button class="mbn-item" data-tab="calendar">
        <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>Calendar</span>
      </button>
      <button class="mbn-item" data-action="openSettingsModal">
        <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
        <span>Settings</span>
      </button>
    `;
    document.body.appendChild(nav);

    nav.addEventListener('click', (e) => {
      const btn = e.target.closest('.mbn-item');
      if (!btn) return;
      
      if (btn.dataset.tab) {
        this.switchTab(btn.dataset.tab);
      } else if (btn.dataset.action) {
        this[btn.dataset.action](btn);
      }
    });
  }

  bindGlobalEvents() {
    if (this._eventsBound) return;
    this._eventsBound = true;

    document.getElementById('tabStrip').addEventListener('click', (e) => {
      const btn = e.target.closest('.nav-item');
      if (btn) {
        this.switchTab(btn.dataset.tab);
        this.closeSidebar();
      }
    });

    document.getElementById('mobileMenuBtn')?.addEventListener('click', () => this.toggleSidebar());
    document.getElementById('sidebarBackdrop')?.addEventListener('click', () => this.closeSidebar());

    document.body.addEventListener('click', (e) => {
      const actionEl = e.target.closest('[data-action]');
      if (actionEl) {
        const action = actionEl.dataset.action;
        if (typeof this[action] === 'function') {
          e.preventDefault();
          this[action](actionEl);
        }
        return;
      }
      const sortEl = e.target.closest('th[data-sort]');
      if (sortEl) { this.sortTable(sortEl.dataset.sort); return; }
      const lockEl = e.target.closest('[data-toggle-lock]');
      if (lockEl) { this.toggleLock(lockEl.dataset.toggleLock); return; }
      const rangeEl = e.target.closest('[data-chart-range]');
      if (rangeEl) { this.setChartRange(rangeEl.dataset.chartRange); return; }
      const nwEl = e.target.closest('[data-networth-range]');
      if (nwEl) {
        this.chartRanges.networth = nwEl.dataset.networthRange;
        document.querySelectorAll('[data-networth-range]').forEach(b => b.classList.remove('active-mode'));
        nwEl.classList.add('active-mode');
        this.renderCharts(); return;
      }
      const fcEl = e.target.closest('[data-forecaster-range]');
      if (fcEl) {
        this.chartRanges.forecaster = fcEl.dataset.forecasterRange;
        document.querySelectorAll('[data-forecaster-range]').forEach(b => b.classList.remove('active-mode'));
        fcEl.classList.add('active-mode');
        this.renderCharts(); return;
      }
    });

    document.body.addEventListener('change', (e) => {
      const t = e.target;
      if (t.matches('.cat-select')) this.updateRowCategory(t.dataset.txId, t.value);
      else if (t.matches('[data-row-checkbox]')) this.toggleRowSelect(t.dataset.rowCheckbox, t.checked);
      else if (t.matches('#checkingHeaderSelect')) this.selectAllRows('checking', t.checked);
      else if (t.matches('#payState')) {
        this.state.selectedState = t.value;
        this.saveState();
        this.calculatePaycheck();
      }
    });

    document.body.addEventListener('input', (e) => {
      if (e.target.matches('#checkingSearch')) {
        if (this.searchTimeout) clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
          this.searchQuery = e.target.value.toLowerCase();
          this.renderCheckingTable();
        }, 300);
      }
      if (e.target.matches('#loanPI') || e.target.matches('#loanEscrow')) {
        this.updateLoanEditorTotal();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) this.closeSidebar();
      if (this.resizeTimeout) cancelAnimationFrame(this.resizeTimeout);
      this.resizeTimeout = requestAnimationFrame(() => this.renderCharts());
    });

    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
      }
    });

        // Global dragend cleanup to prevent stuck gray rows
    document.addEventListener('dragend', () => {
      if (this._draggedRowId) this.endRowDrag();
    });

        // ---- Command palette global shortcuts ----
    document.addEventListener('keydown', (e) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (document.getElementById('cmdPaletteOverlay')) this.closeCommandPalette();
        else this.openCommandPalette();
        return;
      }

      if (e.key === 'Escape' && document.getElementById('cmdPaletteOverlay')) {
        e.preventDefault();
        this.closeCommandPalette();
        return;
      }

      if (e.key === '/' && !mod && !e.altKey && !e.shiftKey) {
        const tag = document.activeElement?.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
          e.preventDefault();
          this.openCommandPalette();
        }
      }
    });

    // ---- Inject ⌘K trigger into header actions ----
    const headerActions = document.querySelector('.main-header-actions');
    if (headerActions && !headerActions.querySelector('.cmd-trigger')) {
      const trigger = document.createElement('button');
      trigger.className = 'btn btn-sm cmd-trigger';
      trigger.dataset.action = 'openCommandPalette';
      trigger.title = 'Open command palette (Ctrl+K / ⌘K)';
      trigger.innerHTML = '<span style="font-size:0.85rem;">⌘</span>K <span class="cmd-trigger-label">Commands</span>';
      headerActions.insertBefore(trigger, headerActions.querySelector('[data-action="openSettingsModal"]'));
    }
        // ---- Inject theme preset toggle into header ----
    if (headerActions && !document.getElementById('themeToggleBtn')) {
      const tbtn = document.createElement('button');
      tbtn.id = 'themeToggleBtn';
      tbtn.className = 'btn btn-sm';
      tbtn.dataset.action = 'toggleThemePreset';
      tbtn.textContent = this.themePreset === 'light' ? '🌙' : '☀';
      tbtn.title = this.themePreset === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
      const anchor = headerActions.querySelector('[data-action="openCommandPalette"]') ||
                     headerActions.querySelector('[data-action="openSettingsModal"]');
      headerActions.insertBefore(tbtn, anchor);
    }
  }

    /* ============ SIDEBAR (mobile drawer) ============ */
  toggleSidebar() {
    const sb = document.getElementById('appSidebar');
    const bd = document.getElementById('sidebarBackdrop');
    if (!sb) return;
    const isOpen = sb.classList.toggle('open');
    if (bd) bd.classList.toggle('open', isOpen);
  }

  closeSidebar() {
    document.getElementById('appSidebar')?.classList.remove('open');
    document.getElementById('sidebarBackdrop')?.classList.remove('open');
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    
    // Update Desktop Sidebar
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelector(`.nav-item[data-tab="${tabId}"]`)?.classList.add('active');
    
    // Update Mobile Bottom Nav
    document.querySelectorAll('.mbn-item').forEach(b => b.classList.remove('active'));
    document.querySelector(`.mbn-item[data-tab="${tabId}"]`)?.classList.add('active');
    
    this.renderTabContent(tabId);
    this.closeSidebar();
  }

  renderTabContent(tabId) {
    const main = document.getElementById('mainContent');
    const t = {
      checking: () => this.tplChecking(),
      savings: () => this.tplSavings(),
      networth: () => this.tplNetworth(),
      debts: () => this.tplDebts(),
      paycheck: () => this.tplPaycheck(),
      calendar: () => this.tplCalendar(),
      forecaster: () => this.tplForecaster(),
      apy: () => this.tplApy()
    };
    main.innerHTML = (t[tabId] || t.checking)();

    try {
      if (tabId === 'checking') this.renderCheckingView();
      if (tabId === 'savings') this.renderSavingsView();
      if (tabId === 'networth') this.renderNetWorthView();
      if (tabId === 'debts') this.renderDebtsView();
      if (tabId === 'paycheck') this.calculatePaycheck();
      if (tabId === 'calendar') this.renderCalendarView();
      if (tabId === 'forecaster') this.renderForecaster();
      if (tabId === 'apy') this.updateApySource();
    } catch (e) {
      console.error("Tab render error:", e);
      this.showToast("Render error. Check console.");
    }

    // --- NEW: inject data freshness indicator ---
    this.injectFreshnessBadge(tabId);

    setTimeout(() => { try { this.renderCharts(); } catch (e) { console.error(e); } }, 50);
  }

  tplChecking() {
    const lockedCount = (this.state.transactions || []).filter(t => t.locked).length;

    return `
    <section class="view-container active">
      <div class="stat-header" id="checkingStats"></div>
      <div class="card" style="margin-bottom:1.5rem;">
        <div class="card-header">
          <h3 class="card-title">Checking Balance History</h3>
          <div class="toolbar-group">
            <button class="btn btn-sm" data-action="renderCharts" title="Refresh charts">🔄</button>
            <div class="segmented">
              <button class="btn chart-mode-btn active-mode" data-chart-range="week">week</button>
              <button class="btn chart-mode-btn" data-chart-range="month">month</button>
              <button class="btn chart-mode-btn" data-chart-range="year">year</button>
            </div>
          </div>
        </div>
        <canvas id="checkingChart" height="260" style="width:100%; display:block;"></canvas>
      </div>
      
      <div class="table-toolbar" style="position: relative;">
        <div class="search-box">
          <input type="text" id="checkingSearch" placeholder="Search transactions..." value="${this.escapeHtml(this.searchQuery)}" title="Search by description, nickname, or category">
        </div>
        <div class="toolbar-group">
          <button class="btn btn-sm ${this.showLockedOnly ? 'btn-primary' : ''}" data-action="toggleLockedFilter" title="${this.showLockedOnly ? 'Show all transactions' : 'Show only locked transactions'}">🔒 Locked${lockedCount ? ` (${lockedCount})` : ''}</button>
          <button class="btn btn-sm" data-action="toggleDensity" title="Toggle table row height">Toggle Density</button>
          <button class="btn btn-sm" data-action="openRulesModal" title="Manage auto-categorization and nicknaming rules">⚙️ Rules</button>
          <button class="btn btn-sm" data-action="openMassEditModal" title="Bulk update categories or nicknames">Mass Edit</button>
          <button class="btn btn-sm" data-action="openImportWizard" data-account="CHECKING" title="Import bank CSV file">📥 Import CSV</button>
          <button class="btn btn-sm btn-primary" data-action="openAddPendingModal" title="Manually add a pending transaction">+ Add Pending</button>
        </div>
        
        <!-- Drag and Drop Tray -->
        <div id="categoryDropTray" class="category-drop-tray" style="position: absolute; top: 100%; left: 0; right: 0; z-index: 50; margin-top: 0.5rem;"></div>
      </div>

      <div class="table-container card ${this.compactDensity ? 'compact-density' : ''}" style="padding:0;" id="checkingTableContainer">
        <table id="checkingTable">
          <thead><tr>
            <th style="width:30px;"><input type="checkbox" id="checkingHeaderSelect" title="Select all"></th>
            <th data-sort="date">Date ${this.sortArrow('date')}</th>
            <th data-sort="description">Description ${this.sortArrow('description')}</th>
            <th data-sort="category">Category ${this.sortArrow('category')}</th>
            <th>Flow</th>
            <th data-sort="amount">Amount ${this.sortArrow('amount')}</th>
            <th data-sort="balance">Balance ${this.sortArrow('balance')}</th>
            <th>Status</th><th title="Lock prevents auto-rules from overwriting">Lock</th>
          </tr></thead>
          <tbody id="checkingTableBody"></tbody>
        </table>
      </div>

      <!-- Bulk action bar (slides up when rows are selected) -->
      <div class="bulk-bar" id="bulkBar">
        <span id="bulkBarCount" style="font-weight:700; font-size:0.8rem; color:var(--accent-primary); margin-right:0.5rem;">0 selected</span>
        <button class="btn btn-sm" data-action="bulkLockSelected" title="Lock all selected transactions">🔒 Lock</button>
        <button class="btn btn-sm" data-action="bulkUnlockSelected" title="Unlock all selected transactions">🔓 Unlock</button>
        <button class="btn btn-sm" data-action="bulkToggleLockSelected" title="Toggle lock state for each selected transaction">↻ Toggle</button>
        <button class="btn btn-sm" data-action="clearSelection" title="Deselect all">✕ Clear</button>
      </div>
    </section>`;
  }

    tplSavings() {
    return `
      <section class="view-container active">
        <div class="stat-header" id="savingsStats"></div>
        <div class="card" style="margin-bottom:1.25rem;">
          <div class="card-header">
            <h3 class="card-title">Vault Balances</h3>
            <div class="toolbar-group">
              <button class="btn btn-sm" data-action="recalculateVaultsAndSync" title="Scan history and fix vault balances based on imported transactions">🔄 Sync Vaults</button>
              <button class="btn btn-sm btn-primary" data-action="openVaultModal">+ New Vault</button>
            </div>
          </div>
          <div id="vaultList"></div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Savings Ledger</h3>
            <button class="btn btn-sm" data-action="openImportWizard" data-account="SAVINGS" title="Import bank CSV file">📥 Import CSV</button>
          </div>
          <div class="table-container" style="border:none;">
            <table><thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody id="savingsTableBody"></tbody></table>
          </div>
        </div>
      </section>`;
  }

  tplNetworth() {
  return `
    <section class="view-container active">
      <div class="stat-header" id="networthStats"></div>
      <div class="card" style="margin-bottom:1.5rem;">
        <div class="card-header">
          <h3 class="card-title">Total Household Position Trend</h3>
          <div class="toolbar-group">
            <button class="btn btn-sm" data-action="renderCharts" title="Refresh charts">🔄</button>
            <div class="segmented">
              <button class="btn chart-mode-btn active-mode" data-networth-range="week">week</button>
              <button class="btn chart-mode-btn" data-networth-range="month">month</button>
              <button class="btn chart-mode-btn" data-networth-range="year">year</button>
            </div>
          </div>
        </div>
        <canvas id="networthChart" height="260" style="width:100%; display:block;"></canvas>
      </div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1.5rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Spending by Category</h3>
            <div class="toolbar-group">
              <select id="spendingRangeSelect" onchange="app.onSpendingRangeChange(this.value)" style="width:auto; min-width:150px;">
                <option value="week_avg" ${this.spendingRange === 'week_avg' ? 'selected' : ''}>Weekly Average</option>
                <option value="month_avg" ${this.spendingRange === 'month_avg' ? 'selected' : ''}>Monthly Average</option>
                <option value="last_week" ${this.spendingRange === 'last_week' ? 'selected' : ''}>Last Week</option>
                <option value="last_month" ${this.spendingRange === 'last_month' ? 'selected' : ''}>Last Month</option>
                <option value="last_custom_days" ${this.spendingRange === 'last_custom_days' ? 'selected' : ''}>Last # Days</option>
                <option value="last_custom_weeks" ${this.spendingRange === 'last_custom_weeks' ? 'selected' : ''}>Last # Weeks</option>
                <option value="last_custom_months" ${this.spendingRange === 'last_custom_months' ? 'selected' : ''}>Last # Months</option>
              </select>
              <input type="number" id="spendingCustomVal" min="1" max="365" value="${this.spendingCustom}"
                     oninput="app.onSpendingCustomInput(this.value)"
                     style="width:70px; display:${this.spendingRange.startsWith('last_custom') ? 'block' : 'none'};">
            </div>
          </div>
          <canvas id="categoryDonut" height="240" style="width:100%; display:block;"></canvas>
          <div id="categoryLegend" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap:0.5rem; margin-top:1rem;"></div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Roundup Sweeps Summary</h3>
          </div>
          <div id="roundupsSummary"></div>
        </div>
      </div>
    </section>`;
  }

  tplDebts() {
    return `
      <section class="view-container active">
        <div class="stat-header" id="debtStats"></div>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:1.5rem;">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Your Debts</h3>
              <button class="btn btn-sm btn-primary" data-action="openAddLoanModal">+ Add Loan</button>
            </div>
            <div id="loanList"></div>
          </div>
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">What-If Payoff Simulator</h3>
              <button class="btn btn-sm" data-action="renderCharts" title="Refresh charts">🔄</button>
            </div>
            <div id="loanSimControls"></div>
            <div id="loanSimResults"></div>
            <canvas id="debtChart" height="220" style="width:100%; display:block; margin-top:1rem;"></canvas>
          </div>
        </div>
      </section>`;
  }

    tplPaycheck() {
    const stateOpts = this.state.taxStates.map(s =>
      `<option value="${s.code}" ${s.code === this.state.selectedState ? 'selected' : ''}>${this.escapeHtml(s.name)} (${s.code})</option>`
    ).join('');
    return `
    <section class="view-container active">
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1.5rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Income Details</h3>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            <div><label class="stat-label">Hourly Rate ($)</label><input type="number" id="payHourlyRate" value="17" oninput="app.debouncedPaycheck()"></div>
            <div><label class="stat-label">Hours per Week</label><input type="number" id="payHours" value="40" oninput="app.debouncedPaycheck()"></div>
            <div><label class="stat-label">Days per Week</label><input type="number" id="payDays" value="5" oninput="app.debouncedPaycheck()"></div>
            <div><label class="stat-label">Weeks per Year</label><input type="number" id="payWeeks" value="52" oninput="app.debouncedPaycheck()"></div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Deductions &amp; Taxes</h3>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            <div>
              <label class="stat-label">State</label>
              <div style="display:flex; gap:0.5rem; align-items:center;">
                <select id="payState" style="flex:1;">${stateOpts}</select>
                <button class="btn btn-sm" data-action="openTaxBracketModal" title="Manage state tax brackets">⚙️</button>
              </div>
            </div>
            <div><label class="stat-label">Federal Tax Rate (%)</label><input type="number" id="payFederalRate" value="12" oninput="app.debouncedPaycheck()"></div>
            <div><label class="stat-label">Monthly Benefits Cost ($)</label><input type="number" id="payBenefits" value="0" oninput="app.debouncedPaycheck()"></div>
          </div>
        </div>
      </div>
      <div class="card" style="margin-top:1.5rem;">
        <div class="card-header">
          <h3 class="card-title">Paycheck Summary</h3>
          <div class="toolbar-group">
            <label class="stat-label" style="margin:0;">Period</label>
            <select id="payPeriod" onchange="app.calculatePaycheck()" style="width:auto; min-width:130px;">
              <option value="weekly">Weekly</option>
              <option value="biweekly" selected>Bi-Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
        <div id="paycheckResults"></div>
      </div>
    </section>`;
  }

  tplCalendar() {
    return `
      <section class="view-container active">
        <div id="calendarMonthSummary" style="margin-bottom:1.25rem;"></div>
        <div class="card" style="padding:1.25rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem; flex-wrap:wrap; gap:0.5rem;">
            <div class="calendar-nav">
              <button class="btn btn-sm" data-action="changeMonth" data-offset="-1" aria-label="Previous month">←</button>
              <h2 id="calendarMonthTitle" class="calendar-month-title"></h2>
              <button class="btn btn-sm" data-action="changeMonth" data-offset="1" aria-label="Next month">→</button>
              <button class="btn btn-sm calendar-today-btn" data-action="calendarGoToday" title="Jump to current month">Today</button>
            </div>
            <button class="btn btn-sm btn-primary" data-action="openRecurringModal">+ Add Recurring</button>
          </div>
          <div class="calendar-desktop-view">
            <div class="calendar-grid">
              <div class="calendar-day-header">Sun</div><div class="calendar-day-header">Mon</div>
              <div class="calendar-day-header">Tue</div><div class="calendar-day-header">Wed</div>
              <div class="calendar-day-header">Thu</div><div class="calendar-day-header">Fri</div>
              <div class="calendar-day-header">Sat</div>
            </div>
            <div class="calendar-grid" id="calendarGrid" style="margin-top:6px;"></div>
          </div>
          <div class="calendar-mobile-view" id="calendarMobileList"></div>
        </div>
      </section>`;
  }

  tplForecaster() {
    return `
      <section class="view-container active">
        <div class="card" style="margin-bottom:1.5rem;">
          <div class="card-header">
            <h3 class="card-title">Monthly Baseline</h3>
            <button class="btn btn-sm" data-action="syncForecaster">🔄 Auto-Sync</button>
          </div>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap:0.85rem;">
            <div><label class="stat-label">AVG INCOME</label>
              <div class="input-currency-wrapper"><span>$</span><input type="number" id="fcAvgIncome" value="0.00" step="0.01" oninput="app.debouncedForecaster()"></div>
            </div>
            <div><label class="stat-label">FIXED EXPENSES</label>
              <div class="input-currency-wrapper"><span>$</span><input type="number" id="fcAvgFixed" value="0.00" step="0.01" oninput="app.debouncedForecaster()"></div>
            </div>
            <div><label class="stat-label">FLEXIBLE SPENDING</label>
              <div class="input-currency-wrapper"><span>$</span><input type="number" id="fcAvgVariable" value="0.00" step="0.01" oninput="app.debouncedForecaster()"></div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="forecast-split-grid" id="forecastOutputCards"></div>
          <div class="card-header">
            <h3 class="card-title">What-If Scenarios</h3>
            <button class="btn btn-sm btn-primary" data-action="openAddScenarioModal">+ Add Scenario</button>
          </div>
          <div id="scenarioList" style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:1rem;"></div>
          <div class="card-header" style="margin-top:1rem;">
            <h4 class="card-title" style="font-size:0.85rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.08em;">Projection</h4>
            <div class="toolbar-group">
              <button class="btn btn-sm" data-action="renderCharts" title="Refresh charts">🔄</button>
              <div class="segmented">
                <button class="btn chart-mode-btn active-mode" data-forecaster-range="week">week</button>
                <button class="btn chart-mode-btn" data-forecaster-range="month">month</button>
                <button class="btn chart-mode-btn" data-forecaster-range="year">year</button>
              </div>
            </div>
          </div>
          <canvas id="forecasterChart" height="220" style="width:100%; display:block; margin-top:0.5rem;"></canvas>
        </div>
      </section>`;
  }

  tplApy() {
    return `
      <section class="view-container active">
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1.5rem;">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Simulation Parameters</h3>
            </div>
            <div style="display:flex; flex-direction:column; gap:0.75rem;">
              <div><label class="stat-label">Starting Balance Source</label>
                <select id="apySource" onchange="app.updateApySource()">
                  <option value="VAULTS">Vault Total</option>
                  <option value="CHECKING">Checking Available</option>
                  <option value="CUSTOM">Custom Amount</option>
                </select>
              </div>
              <div><label class="stat-label">Principal Amount ($)</label><input type="number" id="apyPrincipal" value="1119.74" oninput="app.debouncedAPY()"></div>
              <div><label class="stat-label">Annual Percentage Yield (APY %)</label><input type="number" step="0.01" id="apyRate" value="3.30" oninput="app.debouncedAPY()"></div>
              <div><label class="stat-label">Monthly Deposit ($)</label><input type="number" id="apyMonthly" value="200" oninput="app.debouncedAPY()"></div>
              <div><label class="stat-label">Monthly Withdrawal ($)</label><input type="number" id="apyWithdrawal" value="0" oninput="app.debouncedAPY()"></div>
              <div><label class="stat-label">Time Horizon (Years)</label><input type="number" id="apyYears" value="5" min="1" max="30" oninput="app.debouncedAPY()"></div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Compound Interest Projection</h3>
              <button class="btn btn-sm" data-action="renderCharts" title="Refresh charts">🔄</button>
            </div>
            <canvas id="apyChart" height="220" style="width:100%; display:block;"></canvas>
            <div id="apySummary" style="margin-top:1rem; font-size:0.9rem;"></div>
          </div>
        </div>
      </section>`;
  }

  sortArrow(col) {
    if (this.sortState.col !== col) return '';
    return this.sortState.asc ? '↑' : '↓';
  }

  debouncedPaycheck() {
    if (this._paycheckT) clearTimeout(this._paycheckT);
    this._paycheckT = setTimeout(() => this.calculatePaycheck(), 250);
  }
  debouncedForecaster() {
    if (this._fcT) clearTimeout(this._fcT);
    this._fcT = setTimeout(() => this.renderForecaster(), 250);
  }
  debouncedAPY() {
    if (this._apyT) clearTimeout(this._apyT);
    this._apyT = setTimeout(() => this.renderAPY(), 250);
  }
  debouncedDebtSim() {
    if (this._dsT) clearTimeout(this._dsT);
    this._dsT = setTimeout(() => this.renderDebtSimulation(), 250);
  }

  money(v, opts) {
    const n = parseFloat(v) || 0;
    return '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  getPayoffDate(monthsFromNow) {
    const d = new Date();
    d.setMonth(d.getMonth() + (parseInt(monthsFromNow) || 0));
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  getLoanMonths(loan) {
    if (!loan) return 360;
    const t = parseFloat(loan.term || loan.termYears) || 30;
    const u = loan.termUnit || 'years';
    return u === 'years' ? t * 12 : t;
  }

  getLoanPI(loan) {
    if (!loan) return 0;
    const total = parseFloat(loan.minPayment) || 0;
    const escrow = parseFloat(loan.escrow) || 0;
    const derived = Math.max(0, total - escrow);
    if (derived > 0) return derived;

    const totalMonths = this.getLoanMonths(loan);
    return this.calculatePI(parseFloat(loan.balance) || 0, parseFloat(loan.rate) || 0, totalMonths);
  }

  calculatePI(balance, annualRate, totalMonths) {
    const r = (annualRate / 100) / 12;
    const n = totalMonths;
    if (balance <= 0 || n <= 0) return 0;
    if (r === 0) return balance / n;
    const factor = Math.pow(1 + r, n);
    return balance * r * factor / (factor - 1);
  }

  calculateProgressiveTax(income, brackets) {
    if (!brackets || !brackets.length || income <= 0) return 0;
    let tax = 0;
    for (const b of brackets) {
      if (income <= b.min) break;
      const taxable = Math.min(income, b.max) - b.min;
      if (taxable > 0) tax += taxable * (b.rate / 100);
    }
    return tax;
  }

  renderCheckingView() {
    const bal = this.getBalances('CHECKING');
    const stats = document.getElementById('checkingStats');
    if (stats) stats.innerHTML = `
      <div class="stat-card" style="--stat-accent: var(--accent-primary);">
        <div class="stat-label">Available Balance</div>
        <div class="stat-value mono" style="color:var(--accent-primary)">$${bal.available.toFixed(2)}</div>
        <div class="stat-subtext">Spendable funds</div>
      </div>
      <div class="stat-card" style="--stat-accent: var(--text-muted);">
        <div class="stat-label">Ledger Balance</div>
        <div class="stat-value mono">$${bal.ledger.toFixed(2)}</div>
        <div class="stat-subtext">$${bal.pending.toFixed(2)} · ${this.state.pendingItems.filter(p => p.account === 'CHECKING').length} pending</div>
      </div>`;
    this.renderCheckingTable();
  }

  renderCheckingTable() {
    const tbody = document.getElementById('checkingTableBody');
    if (!tbody) return;

    let items;
    if (this.showLockedOnly) {
      // Locked-only view: hide pending items and unlocked rows
      items = this.getFilteredTransactions('CHECKING').filter(t => t.locked);
    } else {
      items = [
        ...this.state.pendingItems.filter(p => p.account === 'CHECKING'),
        ...this.getFilteredTransactions('CHECKING')
      ];
    }

    if (this.searchQuery) {
      const q = this.searchQuery;
      items = items.filter(t =>
        (t.nickname && t.nickname.toLowerCase().includes(q)) ||
        (t.description && t.description.toLowerCase().includes(q)) ||
        (t.category && t.category.toLowerCase().includes(q))
      );
    }

    items.sort((a, b) => {
      let va, vb;
      if (this.sortState.col === 'description') {
        va = a.nickname || a.description || '';
        vb = b.nickname || b.description || '';
      } else {
        va = a[this.sortState.col];
        vb = b[this.sortState.col];
      }
      if (this.sortState.col === 'amount' || this.sortState.col === 'balance') {
        va = parseFloat(va) || 0; vb = parseFloat(vb) || 0;
      }
      if (va < vb) return this.sortState.asc ? -1 : 1;
      if (va > vb) return this.sortState.asc ? 1 : -1;
      return 0;
    });

    const selectable = items.filter(t => t.status !== 'pending');
    const header = document.getElementById('checkingHeaderSelect');
    if (header) header.checked = selectable.length > 0 && selectable.every(i => this.selectedRows.has(i.id));

    const limit = 500;
    const display = items.slice(0, limit);
    let html = display.map(t => this.buildCheckingRow(t)).join('');
    if (items.length === 0 && this.showLockedOnly) {
      html = `<tr><td colspan="9" style="text-align:center; padding:2rem; color:var(--text-muted); font-size:0.85rem;">🔒 No locked transactions yet.<br><span style="font-size:0.75rem;">Click the 🔓 icon on any row to lock it, then use the 🔒 Locked filter to view them here.</span></td></tr>`;
    } else if (items.length > limit) {
      html += `<tr><td colspan="9" style="text-align:center; padding:1rem; color:var(--text-muted); font-size:0.8rem;">Showing first ${limit} of ${items.length}. Use search to narrow.</td></tr>`;
    }
    tbody.innerHTML = html;

    // Sync bulk bar with selection state after every render
    this.updateBulkBar();
  }

  buildCheckingRow(t) {
    const isPending = t.status === 'pending';
    const colors = CATEGORY_COLORS[t.category] || CATEGORY_COLORS['Miscellaneous'];
    const flow = CATEGORY_FLOW_MAP[t.category] || 'Flexible Spending';
    const dn = t.nickname
      ? `<div style="font-weight:700; color:var(--accent-primary);">${this.escapeHtml(t.nickname)}</div><div style="font-size:0.75rem; color:var(--text-dim);">${this.escapeHtml(t.description)}</div>`
      : `<div style="font-weight:600;">${this.escapeHtml(t.description)}</div>`;

    if (isPending) {
      return `<tr data-tx-row="${t.id}">
        <!-- REMOVED EMPTY TD HERE -->
        <td></td>
        <td class="mono">${t.date}</td>
        <td>${dn}</td>
        <td><span style="font-size:0.75rem; color:var(--text-muted)">${this.escapeHtml(t.category || '—')}</span></td>
        <td><span style="font-size:0.75rem; color:var(--text-muted)">${flow}</span></td>
        <td class="mono" style="color:${t.amount < 0 ? 'var(--accent-negative)' : 'var(--accent-positive)'}">$${(parseFloat(t.amount) || 0).toFixed(2)}</td>
        <td class="mono" style="color:var(--text-muted)" title="Pending items don't have a posted balance">—</td>
        <td><span class="badge badge-pending" title="This transaction has not cleared the bank yet.">PENDING</span></td>
        <td></td>
      </tr>`;
    }

    const catOpts = CATEGORIES.map(c => `<option value="${c}" ${t.category === c ? 'selected' : ''}>${c}</option>`).join('');
    
    return `<tr draggable="true" data-tx-row="${t.id}" ondragstart="app.startRowDrag(event, '${t.id}')" ondragend="app.endRowDrag(event)">
      <!-- REMOVED DRAG HANDLE TD HERE -->
      <td><input type="checkbox" data-row-checkbox="${t.id}" ${this.selectedRows.has(t.id) ? 'checked' : ''}></td>
      <td class="mono">${t.date}</td>
      <td>${dn}</td>
      <td title="Manually changing this will lock the row from auto-rules."><div class="cat-select-wrapper" style="--cat-bg:${colors.bg}; --cat-color:${colors.color}; --cat-border:${colors.border}; --cat-glow:${colors.glow};">
        <select class="cat-select" data-tx-id="${t.id}">${catOpts}</select>
      </div></td>
      <td><span style="font-size:0.75rem; color:var(--text-muted)">${flow}</span></td>
      <td class="mono" style="color:${t.amount < 0 ? 'var(--accent-negative)' : 'var(--accent-positive)'}">$${(parseFloat(t.amount) || 0).toFixed(2)}</td>
      <td class="mono">$${(parseFloat(t.balance) || 0).toFixed(2)}</td>
      <td><span class="badge badge-posted" title="Transaction has cleared.">${t.status || 'POSTED'}</span></td>
      <td style="cursor:pointer;" data-toggle-lock="${t.id}" title="${t.locked ? 'Unlock to allow auto-rules to update this row' : 'Lock to prevent auto-rules from overwriting your manual changes'}">${t.locked ? '🔒' : '🔓'}</td>
    </tr>`;
  }

  renderSavingsView() {
    const bal = this.getBalances('SAVINGS');
    const stats = document.getElementById('savingsStats');
    const vaultCount = (this.state.vaults || []).length;
    if (stats) stats.innerHTML = `
      <div class="stat-card" style="--stat-accent: var(--accent-primary);">
        <div class="stat-label">Savings Account Ledger</div>
        <div class="stat-value mono">$${bal.ledger.toFixed(2)}</div>
        <div class="stat-subtext">Total saved</div>
      </div>
      <div class="stat-card" style="--stat-accent: var(--accent-secondary);">
        <div class="stat-label">Total Vault Earmarks</div>
        <div class="stat-value mono" style="color:var(--accent-secondary)">$${bal.vaults.toFixed(2)}</div>
        <div class="stat-subtext">${vaultCount} vault${vaultCount !== 1 ? 's' : ''}</div>
      </div>`;

    const vc = document.getElementById('vaultList');
    if (vc) {
      if (vaultCount === 0) {
        vc.innerHTML = `<div class="empty-state">
          <div class="empty-state-icon">🏦</div>
          <div class="empty-state-title">No vaults yet</div>
          <div class="empty-state-hint">Click "+ New Vault" to earmark savings toward a goal.</div>
        </div>`;
      } else {
        vc.innerHTML = this.state.vaults.map(v => `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem 0; border-bottom:1px solid var(--border-subtle); gap:0.5rem;">
            <div style="min-width:0;">
              <div style="font-weight:600;">${this.escapeHtml(v.name)}</div>
              <div style="font-size:0.75rem; color:var(--text-dim)">Earmarked sub-balance</div>
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem; flex-shrink:0;">
              <span class="mono" style="font-size:1rem; font-weight:700; background:var(--bg-base); padding:0.3rem 0.75rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); min-width:90px; text-align:right;">$${(parseFloat(v.balance) || 0).toFixed(2)}</span>
              <button class="btn btn-sm" data-action="openVaultTransferModal" data-vault-id="${v.id}" title="Transfer money into this vault">💸</button>
              <button class="btn btn-sm" data-action="openEditVaultModal" data-vault-id="${v.id}" title="Edit vault name or balance">⚙️</button>
            </div>
          </div>`).join('');
      }
    }
    this.renderSavingsTable();
  }

  renderSavingsTable() {
    const tbody = document.getElementById('savingsTableBody');
    if (!tbody) return;
    const items = this.getFilteredTransactions('SAVINGS').slice(0, 200);
    tbody.innerHTML = items.map(t => `
      <tr>
        <td class="mono">${t.date}</td>
        <td>${this.escapeHtml(t.nickname || t.description)}</td>
        <td>${this.escapeHtml(t.category)}</td>
        <td class="mono" style="color:${t.amount < 0 ? 'var(--accent-negative)' : 'var(--accent-positive)'}">$${(parseFloat(t.amount) || 0).toFixed(2)}</td>
        <td><span class="badge badge-posted">${t.status || 'POSTED'}</span></td>
      </tr>`).join('');
  }

  renderNetWorthView() {
    const chk = this.getBalances('CHECKING');
    const sav = this.getBalances('SAVINGS');
    const nw = chk.available + sav.available + chk.vaults;
    const stats = document.getElementById('networthStats');
    if (stats) stats.innerHTML = `
      <div class="stat-card" style="--stat-accent: var(--accent-positive);">
        <div class="stat-label">Total Household Net Worth</div>
        <div class="stat-value mono" style="color:var(--accent-positive)">$${nw.toFixed(2)}</div>
        <div class="stat-subtext">Checking + Savings + Vaults</div>
      </div>`;

    const roundups = this.state.transactions.filter(t => t.status !== 'estimated' && t.description && t.description.toLowerCase().includes('roundup'));
    const rt = roundups.reduce((s, t) => s + Math.abs(parseFloat(t.amount) || 0), 0);
    const rs = document.getElementById('roundupsSummary');
    if (rs) rs.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:0.5rem;">
        <div style="font-size:1.5rem;" class="mono">$${rt.toFixed(2)}</div>
        <div style="color:var(--text-muted); font-size:0.85rem;">Total swept from ${roundups.length} roundup transaction${roundups.length !== 1 ? 's' : ''}</div>
      </div>`;
  }

  getBalances(accountKey) {
    const posted = this.state.transactions.filter(t => t.account === accountKey && t.status !== 'estimated');
    let ending = 0;
    if (posted.length > 0) {
      const sorted = [...posted].sort((a, b) => new Date(b.date) - new Date(a.date));
      ending = sorted[0].balance !== undefined ? (parseFloat(sorted[0].balance) || 0) : (parseFloat(sorted[0].amount) || 0);
    } else {
      ending = parseFloat(this.state.accounts[accountKey]?.verifiedBalance) || 0;
    }
    const pendingSum = this.state.pendingItems
      .filter(p => p.account === accountKey && p.status === 'pending')
      .reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
    const vaultTotal = (this.state.vaults || []).reduce((s, v) => s + (parseFloat(v.balance) || 0), 0);
    return { ledger: ending, pending: pendingSum, available: ending + pendingSum, vaults: vaultTotal };
  }

  getFilteredTransactions(accountKey) {
    return this.state.transactions.filter(t => t.account === accountKey && t.status !== 'estimated');
  }

  getRecurringGroups(categoryFilter) {
    const groups = new Map();
    (this.state.transactions || []).forEach(t => {
      if (t.status !== 'estimated' || !t.groupId) return;
      if (categoryFilter && !categoryFilter.includes(t.category)) return;
      if (!groups.has(t.groupId)) {
        const cfg = t.ruleConfig || { interval: 1, freq: 'weeks' };
        const int = Math.max(1, cfg.interval || 1);
        const abs = Math.abs(parseFloat(t.amount) || 0);
        let monthly = 0;
        if (cfg.freq === 'days') monthly = (abs / int) * (365 / 12);
        else if (cfg.freq === 'weeks') monthly = (abs / int) * (52 / 12);
        else if (cfg.freq === 'months') monthly = abs / int;
        else if (cfg.freq === 'years') monthly = abs / (12 * int);
        groups.set(t.groupId, {
          groupId: t.groupId,
          description: t.description,
          category: t.category,
          amount: parseFloat(t.amount) || 0,
          monthly: t.amount >= 0 ? monthly : -monthly,
          ruleConfig: cfg,
          count: 0
        });
      }
      groups.get(t.groupId).count++;
    });
    return Array.from(groups.values());
  }

  getRecurringGroupInfo(groupId) {
    if (!groupId) return null;
    return this.getRecurringGroups(null).find(g => g.groupId === groupId) || null;
  }

  computeScenarioImpact(scenario) {
    if (!scenario || !scenario.active) return 0;
    const type = scenario.type || 'custom';

    if (type === 'custom' || type === 'recurring') {
      return parseFloat(scenario.amount) || 0;
    }

    if (type === 'paycheck' || type === 'bill') {
      const info = this.getRecurringGroupInfo(scenario.groupId);
      if (!info) return 0;
      const cfg = info.ruleConfig || { interval: 1, freq: 'weeks' };
      const int = Math.max(1, cfg.interval || 1);
      const absNew = Math.abs(parseFloat(scenario.amount) || 0);
      let monthlyNew = 0;
      if (cfg.freq === 'days') monthlyNew = (absNew / int) * (365 / 12);
      else if (cfg.freq === 'weeks') monthlyNew = (absNew / int) * (52 / 12);
      else if (cfg.freq === 'months') monthlyNew = absNew / int;
      else if (cfg.freq === 'years') monthlyNew = absNew / (12 * int);
      const monthlyOld = Math.abs(info.monthly);
      const delta = monthlyNew - monthlyOld;
      return type === 'paycheck' ? delta : -delta;
    }

    if (type === 'loan') {
      const loan = (this.state.loans || []).find(l => l.id === scenario.loanId);
      if (!loan) return 0;
      const ov = scenario.loanOverrides || {};
      const bal = parseFloat(ov.balance != null ? ov.balance : loan.balance) || 0;
      const rate = parseFloat(ov.rate != null ? ov.rate : loan.rate) || 0;
      const t = parseFloat(ov.term != null ? ov.term : (loan.term || loan.termYears)) || 30;
      const u = ov.termUnit != null ? ov.termUnit : (loan.termUnit || 'years');
      const totalMonths = u === 'years' ? t * 12 : t;
      return -this.calculatePI(bal, rate, totalMonths);
    }

    return 0;
  }

  updateRowCategory(id, newCat) {
    const tx = this.state.transactions.find(t => t.id === id);
    if (!tx) return;
    tx.category = newCat; tx.locked = true;
    this.saveState();
    
    const row = document.querySelector(`tr[data-tx-row="${id}"]`);
    if (row) {
      row.classList.add('flash-update');
      setTimeout(() => row.classList.remove('flash-update'), 1000);

      const cells = row.querySelectorAll('td');
      if (cells[4]) cells[4].innerHTML = `<span style="font-size:0.75rem; color:var(--text-muted)">${CATEGORY_FLOW_MAP[newCat] || 'Flexible Spending'}</span>`;
      if (cells[8]) cells[8].innerHTML = tx.locked ? '🔒' : '🔓';
      const sw = row.querySelector('.cat-select-wrapper');
      if (sw) {
        const c = CATEGORY_COLORS[newCat] || CATEGORY_COLORS['Miscellaneous'];
        sw.style.setProperty('--cat-bg', c.bg);
        sw.style.setProperty('--cat-color', c.color);
        sw.style.setProperty('--cat-border', c.border);
        sw.style.setProperty('--cat-glow', c.glow);
      }
    }
    this.showToast(`Updated to ${newCat}`);
  }

  toggleLock(id) {
    const tx = this.state.transactions.find(t => t.id === id);
    if (!tx) return;
    tx.locked = !tx.locked;
    this.saveState();

    // In locked-only view, unlocking a row should make it disappear
    if (this.showLockedOnly) {
      this.renderCheckingTable();
      return;
    }

    const row = document.querySelector(`tr[data-tx-row="${id}"]`);
    if (row) {
      const lc = row.querySelector('[data-toggle-lock]');
      if (lc) {
        lc.innerText = tx.locked ? '🔒' : '🔓';
        lc.title = tx.locked
          ? 'Unlock to allow auto-rules to update this row'
          : 'Lock to prevent auto-rules from overwriting your manual changes';
      }
    }
  }

  toggleRowSelect(id, checked) {
    if (checked) this.selectedRows.add(id); else this.selectedRows.delete(id);
    this.updateBulkBar();
  }

  selectAllRows(accountKey, checked) {
    const tb = document.getElementById('checkingTableBody');
    if (!tb) return;
    tb.querySelectorAll('[data-row-checkbox]').forEach(cb => {
      cb.checked = checked;
      if (checked) this.selectedRows.add(cb.dataset.rowCheckbox);
      else this.selectedRows.delete(cb.dataset.rowCheckbox);
    });
    this.updateBulkBar();
  }

  /* ============================================================
   BULK SELECTION + LOCK ACTIONS
   ============================================================ */

  updateBulkBar() {
    const bar = document.getElementById('bulkBar');
    if (!bar) return;
    const n = this.selectedRows.size;
    const countEl = document.getElementById('bulkBarCount');
    if (countEl) countEl.textContent = `${n} selected`;
    bar.classList.toggle('active', n > 0);
  }

  toggleLockedFilter() {
    this.showLockedOnly = !this.showLockedOnly;
    this.selectedRows.clear(); // selection resets when the visible set changes
    this.renderTabContent('checking');
    this.showToast(this.showLockedOnly ? '🔒 Showing locked only' : 'Showing all transactions');
  }

  bulkLockSelected() {
    if (!this.selectedRows.size) return;
    let count = 0;
    this.selectedRows.forEach(id => {
      const tx = this.state.transactions.find(t => t.id === id);
      if (tx && !tx.locked) { tx.locked = true; count++; }
    });
    this.saveState();
    // Keep selection so user can chain (e.g. lock → set category)
    this.renderTabContent('checking');
    this.showToast(`🔒 Locked ${count} transaction${count !== 1 ? 's' : ''}`);
  }

  bulkUnlockSelected() {
    if (!this.selectedRows.size) return;
    let count = 0;
    this.selectedRows.forEach(id => {
      const tx = this.state.transactions.find(t => t.id === id);
      if (tx && tx.locked) { tx.locked = false; count++; }
    });
    this.selectedRows.clear(); // Unlocked rows vanish in locked-only view
    this.saveState();
    this.renderTabContent('checking');
    this.showToast(`🔓 Unlocked ${count} transaction${count !== 1 ? 's' : ''}`);
  }

  bulkToggleLockSelected() {
    if (!this.selectedRows.size) return;
    let locked = 0, unlocked = 0;
    this.selectedRows.forEach(id => {
      const tx = this.state.transactions.find(t => t.id === id);
      if (tx) {
        tx.locked = !tx.locked;
        if (tx.locked) locked++; else unlocked++;
      }
    });
    this.selectedRows.clear();
    this.saveState();
    this.renderTabContent('checking');
    this.showToast(`Toggled — 🔒 ${locked} locked, 🔓 ${unlocked} unlocked`);
  }

  clearSelection() {
    this.selectedRows.clear();
    document.querySelectorAll('[data-row-checkbox]').forEach(cb => { cb.checked = false; });
    const header = document.getElementById('checkingHeaderSelect');
    if (header) header.checked = false;
    this.updateBulkBar();
  }

  sortTable(col) {
    if (this.sortState.col === col) this.sortState.asc = !this.sortState.asc;
    else { this.sortState.col = col; this.sortState.asc = true; }
    this.renderTabContent(this.currentTab);
  }

  toggleDensity() {
    this.compactDensity = !this.compactDensity;
    document.getElementById('checkingTableContainer')?.classList.toggle('compact-density', this.compactDensity);
  }

    /* ============================================================
     LEDGER DRAG-AND-DROP
     ============================================================ */

  startRowDrag(e, txId) {
    this._draggedRowId = txId;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', txId);
    
    const row = e.currentTarget;
    if (row) {
      setTimeout(() => {
        // Only apply the gray state if the drag hasn't already ended
        if (this._draggedRowId === txId) {
          row.classList.add('drag-source');
        }
      }, 0);
    }
    
    this.showCategoryDropTray();
  }

  endRowDrag(e) {
    this._draggedRowId = null;
    this.hideCategoryDropTray();
    document.querySelectorAll('tr.drag-source').forEach(r => r.classList.remove('drag-source'));
  }

  showCategoryDropTray() {
    const tray = document.getElementById('categoryDropTray');
    if (!tray) return;
    tray.classList.add('active');
    
    // Make the empty space between pills a valid drop zone
    tray.ondragover = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; };
    
    tray.innerHTML = `<div style="width:100%; font-size:0.75rem; color:var(--accent-primary); margin-bottom:0.25rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; pointer-events: none;">Drop row here to instantly categorize & lock:</div>` +
      CATEGORIES.map(c => {
        const cfg = CATEGORY_COLORS[c] || CATEGORY_COLORS['Miscellaneous'];
        return `<div class="category-drop-pill" 
                     style="--cat-bg:${cfg.bg}; --cat-color:${cfg.color}; --cat-border:${cfg.border};" 
                     data-category="${c}" 
                     ondragover="event.preventDefault(); event.stopPropagation(); this.classList.add('drag-over')" 
                     ondragleave="this.classList.remove('drag-over')" 
                     ondrop="app.dropRowCategory(event, '${c}')">${c}</div>`;
      }).join('');
  }

  hideCategoryDropTray() {
    const tray = document.getElementById('categoryDropTray');
    if (tray) {
      tray.classList.remove('active');
      tray.innerHTML = '';
    }
  }

  dropRowCategory(e, newCat) {
    e.preventDefault();
    e.stopPropagation();
    const txId = this._draggedRowId || e.dataTransfer.getData('text/plain');
    if (!txId) return;
    
    const tx = this.state.transactions.find(t => t.id === txId);
    if (tx) {
      const oldCat = tx.category;
      const oldLocked = tx.locked;
      
      if (oldCat === newCat) {
        this.endRowDrag();
        return;
      }

      tx.category = newCat;
      tx.locked = true;
      this.saveState();
      
      // Flash the row after re-render
      this.renderTabContent('checking');
      const row = document.querySelector(`tr[data-tx-row="${txId}"]`);
      if (row) {
        row.classList.add('flash-update');
        setTimeout(() => row.classList.remove('flash-update'), 1000);
      }

      this.showToast(`Categorized as ${newCat}`, {
        actionLabel: 'Undo',
        onAction: () => {
          tx.category = oldCat;
          tx.locked = oldLocked;
          this.saveState();
          this.renderTabContent('checking');
        }
      });
    }
    
    this.endRowDrag();
  }

  setChartRange(range) {
    this.chartRanges.checking = range;
    document.querySelectorAll('[data-chart-range]').forEach(b => b.classList.remove('active-mode'));
    document.querySelector(`[data-chart-range="${range}"]`)?.classList.add('active-mode');
    this.renderCharts();
  }

  recalculateVaultBalances() {
    if (!this.state.vaults) return;

    this.state.vaults.forEach(v => {
      if (v.startingBalance === undefined) {
        v.startingBalance = parseFloat(v.balance) || 0;
      }
      v.balance = parseFloat(v.startingBalance);
    });

    const norm = (s) => (s || '').replace(/[^a-z0-9]/gi, '').toLowerCase();

    this.state.transactions.filter(t => t.status !== 'estimated').forEach(t => {
      const desc = t.description || '';
      let vaultName = null;
      let amt = 0;

      const match = desc.match(/^(To|From)\s+(.+?)\s+Vault/i);
      if (match) {
        vaultName = match[2].trim();
        amt = match[1].toUpperCase() === 'TO' ? Math.abs(t.amount) : -Math.abs(t.amount);
      }
      else if (desc.startsWith('Transfer to Vault: ')) {
        vaultName = desc.replace('Transfer to Vault: ', '').trim();
        amt = Math.abs(t.amount);
      }
      else if (desc.startsWith('Transfer from Vault: ')) {
        vaultName = desc.replace('Transfer from Vault: ', '').trim();
        amt = -Math.abs(t.amount);
      }

      if (vaultName && amt !== 0) {
        const v = this.state.vaults.find(v => norm(v.name) === norm(vaultName));
        if (v) {
          v.balance += amt;
        }
      }
    });

    this.state.vaults.forEach(v => {
      if (v.balance < 0) v.balance = 0;
    });
  }

  recalculateVaultsAndSync() {
    this.recalculateBalances();
    this.saveState();
    this.renderTabContent('savings');
    this.showToast('✓ Vaults synced with transaction history');
  }

  recalculateBalances() {
    this.recalculateVaultBalances();
    ['CHECKING', 'SAVINGS'].forEach(acc => {
      let running = 0;
      const txs = this.state.transactions.filter(t => t.account === acc && t.status !== 'estimated')
        .sort((a, b) => { const dA = new Date(a.date).getTime(), dB = new Date(b.date).getTime(); return dA !== dB ? dA - dB : (a.id || '').localeCompare(b.id || ''); });
      txs.forEach(tx => {
        running += (parseFloat(tx.amount) || 0);
        if (tx.balance !== undefined && tx.balance !== 0) running = parseFloat(tx.balance) || 0;
        else tx.balance = running;
      });
    });
  }

  /* ============================================================
     RULE ENGINE (priority-aware + "does not contain")
     ============================================================ */

  _ruleMatches(rule, desc, nickname) {
    if (!rule || !rule.searchPattern) return false;
    const mt = rule.matchType || 'contains';
    const check = (text) => {
      if (!text) return false;
      const t = String(text).toLowerCase();
      const p = String(rule.searchPattern).toLowerCase();
      if (mt === 'exact') return t === p;
      if (mt === 'begins') return t.startsWith(p);
      if (mt === 'ends') return t.endsWith(p);
      return t.includes(p);
    };
    const matched = check(desc) || check(nickname);
    if (!matched) return false;

    // Exclusion — skip rule when either text contains the "does not contain" phrase
    if (rule.doesNotContain) {
      const ex = String(rule.doesNotContain).toLowerCase().trim();
      if (ex) {
        if ((desc || '').toLowerCase().includes(ex)) return false;
        if ((nickname || '').toLowerCase().includes(ex)) return false;
      }
    }
    return true;
  }

  _findMatchingRule(desc, nickname) {
    const rules = this.state.customRules || [];
    for (let i = 0; i < rules.length; i++) {
      if (this._ruleMatches(rules[i], desc, nickname)) return rules[i];
    }
    return null;
  }

  applyCustomRules() {
    if (!(this.state.customRules || []).length) return;
    this.state.transactions.forEach(t => {
      if (t.locked) return;
      if (!t.description) return;
      const rule = this._findMatchingRule(t.description, t.nickname);
      if (rule) {
        if (rule.nickname) t.nickname = rule.nickname;
        if (rule.category) t.category = rule.category;
      }
    });
  }

  cleanSpotify() {
    this.state.transactions.forEach(t => {
      if (t.description && t.description.toUpperCase().startsWith('SPOTIFY')) t.description = 'Spotify';
    });
  }

  getMatchingNickname(desc) {
    if (!desc) return null;
    const rule = this._findMatchingRule(desc, null);
    return rule && rule.nickname ? rule.nickname : null;
  }

  renderCalendarView() {
    try {
      const title = document.getElementById('calendarMonthTitle');
      const grid = document.getElementById('calendarGrid');
      const mobile = document.getElementById('calendarMobileList');
      if (!title || !grid || !mobile) return;

      const year = this.calendarMonth.getFullYear();
      const month = this.calendarMonth.getMonth();
      const mn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const mnShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      title.innerText = `${mn[month]} ${year}`;

      const now = new Date();
      const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

      const firstOfMonth = new Date(year, month, 1);
      const firstDay = firstOfMonth.getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const prevMonthDays = new Date(year, month, 0).getDate();

      // Build day-map lazily for any month
      const monthDayMapCache = {};
      const getMonthDayMap = (yr, mo) => {
        const key = `${yr}-${mo}`;
        if (monthDayMapCache[key]) return monthDayMapCache[key];
        const prefix = `${yr}-${String(mo + 1).padStart(2, '0')}`;
        const map = new Map();
        const add = (t) => {
          if (t.date && t.date.startsWith(prefix)) {
            if (!map.has(t.date)) map.set(t.date, []);
            map.get(t.date).push(t);
          }
        };
        this.state.transactions.forEach(add);
        this.state.pendingItems.forEach(add);
        monthDayMapCache[key] = map;
        return map;
      };

      const classify = (t) => {
        const flow = t.flow || CATEGORY_FLOW_MAP[t.category] || '';
        if (flow === 'Internal Transfer' || t.category === 'Transfers') return 'transfer';
        const amt = parseFloat(t.amount) || 0;
        if (amt > 0) return 'income';
        if (amt < 0) return 'expense';
        return 'other';
      };

      const aggregate = (dayTxs) => {
        let inc = 0, exp = 0, tr = 0;
        dayTxs.forEach(t => {
          const amt = parseFloat(t.amount) || 0;
          const kind = classify(t);
          if (kind === 'income') inc += amt;
          else if (kind === 'expense') exp += Math.abs(amt);
          else if (kind === 'transfer') tr += amt;
        });
        return { inc, exp, tr, count: dayTxs.length };
      };

      // Build cell spec — minimum 5 rows for visual stability
      const rows = Math.max(5, Math.ceil((firstDay + daysInMonth) / 7));
      const totalCells = rows * 7;
      const leadingCount = firstDay;
      const trailingCount = totalCells - leadingCount - daysInMonth;

      const cells = [];

      // Previous-month trailing days
      const prevMo = month === 0 ? 11 : month - 1;
      const prevYr = month === 0 ? year - 1 : year;
      for (let i = leadingCount - 1; i >= 0; i--) {
        cells.push({ day: prevMonthDays - i, month: prevMo, year: prevYr, otherMonth: true });
      }
      // Current month
      for (let d = 1; d <= daysInMonth; d++) {
        cells.push({ day: d, month, year, otherMonth: false });
      }
      // Next-month leading days
      const nextMo = month === 11 ? 0 : month + 1;
      const nextYr = month === 11 ? year + 1 : year;
      for (let d = 1; d <= trailingCount; d++) {
        cells.push({ day: d, month: nextMo, year: nextYr, otherMonth: true });
      }

      const gridFrag = document.createDocumentFragment();
      const mobileFrag = document.createDocumentFragment();

      let totalIncome = 0, totalExpense = 0, totalTransfer = 0, hasActivity = false;

      cells.forEach(spec => {
        const dateStr = `${spec.year}-${String(spec.month + 1).padStart(2, '0')}-${String(spec.day).padStart(2, '0')}`;
        const dayTxs = getMonthDayMap(spec.year, spec.month).get(dateStr) || [];
        const agg = aggregate(dayTxs);
        const dowIdx = new Date(spec.year, spec.month, spec.day).getDay();
        const isWeekend = dowIdx === 0 || dowIdx === 6;
        const isToday = dateStr === todayStr;

        if (!spec.otherMonth) {
          totalIncome += agg.inc;
          totalExpense += agg.exp;
          totalTransfer += agg.tr;
          if (dayTxs.length > 0) hasActivity = true;
        }

        // --- Desktop cell ---
        const cell = document.createElement('div');
        cell.className = 'calendar-cell'
          + (spec.otherMonth ? ' other-month' : '')
          + (isWeekend ? ' weekend' : '')
          + (isToday ? ' today' : '');
        cell.addEventListener('click', () => this.openDayDrawer(dateStr));

        // --- Drag & drop support ---
        const postedInCell = dayTxs.filter(t => t.status !== 'estimated' && t.status !== 'pending');
        const pendingInCell = dayTxs.filter(t => t.status === 'pending');
        const estimatedInCell = dayTxs.filter(t => t.status === 'estimated');
        const hasDraggable = pendingInCell.length > 0 || estimatedInCell.length > 0;

        if (hasDraggable && postedInCell.length === 0) {
          cell.setAttribute('draggable', 'true');
          cell.addEventListener('dragstart', (e) => this._calendarDragStart(e, dateStr, dayTxs));
          cell.addEventListener('dragend', (e) => this._calendarDragEnd(e));
          const ind = document.createElement('span');
          ind.className = 'drag-indicator';
          ind.textContent = '⠿';
          ind.title = 'Drag to reschedule';
          cell.appendChild(ind);
        } else if (postedInCell.length > 0) {
          cell.classList.add('locked');
          cell.title = 'Contains posted transactions — open the day to reschedule pending items';
        }

        cell.addEventListener('dragover', (e) => this._calendarDragOver(e, dateStr, cell));
        cell.addEventListener('dragleave', (e) => this._calendarDragLeave(e, cell));
        cell.addEventListener('drop', (e) => this._calendarDrop(e, dateStr, cell));

        const header = document.createElement('div');
        header.className = 'calendar-cell-header';

        const num = document.createElement('div');
        num.className = 'day-num';
        num.textContent = spec.day;
        header.appendChild(num);

        if (dayTxs.length > 0) {
          const pill = document.createElement('span');
          pill.className = 'item-pill';
          pill.textContent = dayTxs.length;
          pill.title = `${dayTxs.length} transaction${dayTxs.length !== 1 ? 's' : ''}`;
          header.appendChild(pill);
        }
        cell.appendChild(header);

        if (dayTxs.length > 0) {
          const act = document.createElement('div');
          act.className = 'calendar-activity';
          if (agg.inc > 0) {
            const l = document.createElement('div');
            l.className = 'act-line';
            l.innerHTML = `<span class="act-label">↗</span><span class="act-income">+$${agg.inc.toFixed(2)}</span>`;
            act.appendChild(l);
          }
          if (agg.exp > 0) {
            const l = document.createElement('div');
            l.className = 'act-line';
            l.innerHTML = `<span class="act-label">↘</span><span class="act-expense">-$${agg.exp.toFixed(2)}</span>`;
            act.appendChild(l);
          }
          if (Math.abs(agg.tr) >= 0.005) {
            const l = document.createElement('div');
            l.className = 'act-line';
            l.innerHTML = `<span class="act-label">↔</span><span class="act-transfer">${agg.tr >= 0 ? '+' : '-'}$${Math.abs(agg.tr).toFixed(2)}</span>`;
            act.appendChild(l);
          }
          cell.appendChild(act);
        }

        gridFrag.appendChild(cell);

        // --- Mobile card (only current-month days with activity) ---
        if (!spec.otherMonth && dayTxs.length > 0) {
          const mc = document.createElement('div');
          mc.className = 'calendar-mobile-card has-activity' + (isToday ? ' today' : '');
          mc.addEventListener('click', () => this.openDayDrawer(dateStr));

          const total = agg.inc + agg.exp + Math.abs(agg.tr) || 1;
          const pIn = (agg.inc / total) * 100;
          const pOut = (agg.exp / total) * 100;
          const pTr = (Math.abs(agg.tr) / total) * 100;

          mc.innerHTML = `
            <div class="mob-day-badge">
              <div class="mob-day-num">${spec.day}</div>
              <div class="mob-day-dow">${dow[dowIdx]}</div>
            </div>
            <div style="flex:1; min-width:0; display:flex; flex-direction:column; justify-content:center;">
              <div style="display:flex; justify-content:space-between; align-items:baseline; gap:8px;">
                <div style="font-weight:700; font-size:0.9rem;">${mnShort[spec.month]} ${spec.day}</div>
                <div style="font-size:0.7rem; color:var(--text-muted);">${dayTxs.length} item${dayTxs.length !== 1 ? 's' : ''}</div>
              </div>
              <div class="mob-timeline">
                ${agg.inc > 0 ? `<div class="tl-income" style="width:${pIn}%"></div>` : ''}
                ${agg.exp > 0 ? `<div class="tl-expense" style="width:${pOut}%"></div>` : ''}
                ${Math.abs(agg.tr) > 0 ? `<div class="tl-transfer" style="width:${pTr}%"></div>` : ''}
              </div>
              <div style="display:flex; flex-wrap:wrap; gap:8px; font-size:0.72rem; font-family:var(--font-mono); margin-top:6px;">
                ${agg.inc > 0 ? `<span class="act-income">+$${agg.inc.toFixed(2)}</span>` : ''}
                ${agg.exp > 0 ? `<span class="act-expense">-$${agg.exp.toFixed(2)}</span>` : ''}
                ${Math.abs(agg.tr) >= 0.005 ? `<span class="act-transfer">↔ ${agg.tr >= 0 ? '+' : '-'}$${Math.abs(agg.tr).toFixed(2)}</span>` : ''}
              </div>
            </div>`;
          mobileFrag.appendChild(mc);
        }
      });

      grid.innerHTML = '';
      mobile.innerHTML = '';
      grid.appendChild(gridFrag);

      if (!hasActivity) {
        const noAct = document.createElement('div');
        noAct.className = 'calendar-empty';
        noAct.innerHTML = `
          <div class="empty-state-icon">📅</div>
          <div class="empty-state-title">No transactions this month</div>
          <div class="empty-state-hint">Nothing posted here yet.</div>`;
        mobileFrag.appendChild(noAct);
      }
      mobile.appendChild(mobileFrag);

      // Month summary (current month only)
      const summary = document.getElementById('calendarMonthSummary');
      if (summary) {
        const net = totalIncome - totalExpense;
        summary.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap:0.75rem;">
          <div class="stat-card" style="--stat-accent: var(--accent-positive);"><div class="stat-label">Income</div><div class="stat-value mono" style="color:var(--accent-positive); font-size:1.15rem;">$${totalIncome.toFixed(2)}</div></div>
          <div class="stat-card" style="--stat-accent: var(--accent-negative);"><div class="stat-label">Expenses</div><div class="stat-value mono" style="color:var(--accent-negative); font-size:1.15rem;">$${totalExpense.toFixed(2)}</div></div>
          <div class="stat-card" style="--stat-accent: var(--text-muted);"><div class="stat-label">Transfers</div><div class="stat-value mono" style="color:var(--text-muted); font-size:1.15rem;">${totalTransfer >= 0 ? '+' : '-'}$${Math.abs(totalTransfer).toFixed(2)}</div></div>
          <div class="stat-card" style="--stat-accent: var(--accent-primary);"><div class="stat-label">Net</div><div class="stat-value mono" style="color:${net >= 0 ? 'var(--accent-positive)' : 'var(--accent-negative)'}; font-size:1.15rem;">$${net.toFixed(2)}</div></div>
        </div>`;
      }
    } catch (e) { console.error("Calendar error:", e); }
  }

  changeMonth(btn) {
    const offset = parseInt(btn.dataset.offset) || 0;
    this.calendarMonth.setMonth(this.calendarMonth.getMonth() + offset);
    this.renderCalendarView();
  }

  calendarGoToday() {
    this.calendarMonth = new Date();
    this.renderCalendarView();
    this.showToast('Jumped to current month');
  }

  openDayDrawer(dateStr) {
    this.currentDrawerDate = dateStr;
    let drawer = document.getElementById('dayDrawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'dayDrawer';
      drawer.className = 'drawer';
      document.body.appendChild(drawer);
    }
    const dayTxs = this.state.transactions.filter(t => t.date === dateStr)
      .concat(this.state.pendingItems.filter(t => t.date === dateStr));

    const classify = (t) => {
      const flow = t.flow || CATEGORY_FLOW_MAP[t.category] || '';
      if (flow === 'Internal Transfer' || t.category === 'Transfers') return 'transfer';
      const amt = parseFloat(t.amount) || 0;
      if (amt > 0) return 'income';
      if (amt < 0) return 'expense';
      return 'other';
    };

    const income = dayTxs.filter(t => classify(t) === 'income');
    const expenses = dayTxs.filter(t => classify(t) === 'expense');
    const transfers = dayTxs.filter(t => classify(t) === 'transfer');
    const other = dayTxs.filter(t => classify(t) === 'other');

    const renderGroup = (label, txs, color) => {
      if (!txs.length) return '';
      const total = txs.reduce((s, t) => s + (parseFloat(t.amount) || 0), 0);
      return `
      <div style="margin-bottom:1.1rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid var(--border-subtle); margin-bottom:0.5rem;">
          <span class="stat-label" style="font-size:0.68rem; color:${color};">${label} · ${txs.length}</span>
          <span class="mono" style="font-size:0.85rem; font-weight:600; color:${color};">${total >= 0 ? '+' : ''}$${total.toFixed(2)}</span>
        </div>
        ${txs.map(t => `
          <div style="background:var(--bg-base); padding:0.7rem 0.85rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); margin-bottom:0.5rem;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem; margin-bottom:0.35rem;">
              <div style="min-width:0; flex:1;">
                <div style="font-weight:700; font-size:0.9rem;">${this.escapeHtml(t.nickname || t.description)}</div>
                <div style="font-size:0.7rem; color:var(--text-dim);">${this.escapeHtml(t.description)}</div>
              </div>
              ${t.status === 'pending' ? `<button class="reschedule-btn" data-action="openRescheduleItemModal" data-item-id="${t.id}" title="Reschedule this item">↔</button>` : ''}
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="mono" style="font-weight:700; color:${t.amount < 0 ? 'var(--accent-negative)' : 'var(--accent-positive)'}">$${(parseFloat(t.amount) || 0).toFixed(2)}</span>
              <span class="badge badge-posted">${this.escapeHtml(t.category || '—')}</span>
            </div>
          </div>`).join('')}
      </div>`;
    };

    const dIncome = income.reduce((s, t) => s + (parseFloat(t.amount) || 0), 0);
    const dExpense = expenses.reduce((s, t) => s + Math.abs(parseFloat(t.amount) || 0), 0);
    const dTransfer = transfers.reduce((s, t) => s + (parseFloat(t.amount) || 0), 0);

    drawer.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
      <h3 style="font-size:1.1rem; font-weight:700;">Details for ${dateStr}</h3>
      <button class="btn btn-sm" data-action="closeDrawer">Close</button>
    </div>
    <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:0.5rem; margin-bottom:1rem;">
      <div style="background:var(--bg-base); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:0.5rem;">
        <div class="stat-label" style="font-size:0.58rem;">Income</div>
        <div class="mono" style="font-size:0.85rem; font-weight:700; color:var(--accent-positive);">+$${dIncome.toFixed(2)}</div>
      </div>
      <div style="background:var(--bg-base); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:0.5rem;">
        <div class="stat-label" style="font-size:0.58rem;">Expenses</div>
        <div class="mono" style="font-size:0.85rem; font-weight:700; color:var(--accent-negative);">-$${dExpense.toFixed(2)}</div>
      </div>
      <div style="background:var(--bg-base); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:0.5rem;">
        <div class="stat-label" style="font-size:0.58rem;">Transfers</div>
        <div class="mono" style="font-size:0.85rem; font-weight:700; color:var(--text-muted);">${dTransfer >= 0 ? '+' : '-'}$${Math.abs(dTransfer).toFixed(2)}</div>
      </div>
    </div>
    ${dayTxs.length === 0 ? '<div style="color:var(--text-muted);">No transactions.</div>' :
        renderGroup('Income', income, 'var(--accent-positive)') +
        renderGroup('Expenses', expenses, 'var(--accent-negative)') +
        renderGroup('Transfers', transfers, 'var(--text-muted)') +
        renderGroup('Other', other, 'var(--text-muted)')}
  `;
    drawer.classList.add('active');
  }

  closeDrawer() {
    document.getElementById('dayDrawer')?.classList.remove('active');
  }

    /* ============================================================
     CALENDAR DRAG-AND-DROP
     ============================================================ */

  _dateDiffDays(a, b) {
    const da = new Date(a + 'T00:00:00');
    const db = new Date(b + 'T00:00:00');
    return Math.round((db - da) / 86400000);
  }

  _addDaysStr(dateStr, n) {
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + n);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  _calendarDragStart(e, sourceDate, dayTxs) {
    const pendingIds = dayTxs.filter(t => t.status === 'pending').map(t => t.id);
    const groupIds = [...new Set(
      dayTxs.filter(t => t.status === 'estimated' && t.groupId).map(t => t.groupId)
    )];
    if (!pendingIds.length && !groupIds.length) {
      e.preventDefault();
      return;
    }
    this._calDrag = { sourceDate, pendingIds, groupIds };
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', sourceDate);
    if (e.currentTarget?.classList) e.currentTarget.classList.add('drag-source');
  }

  _calendarDragEnd(e) {
    if (e?.currentTarget?.classList) e.currentTarget.classList.remove('drag-source');
    document.querySelectorAll('.calendar-cell.drop-target, .calendar-cell.drop-target-invalid')
      .forEach(c => c.classList.remove('drop-target', 'drop-target-invalid'));
    this._calDrag = null;
  }

  _calendarDragOver(e, targetDate, cell) {
    if (!this._calDrag) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const isSame = targetDate === this._calDrag.sourceDate;
    cell.classList.toggle('drop-target', !isSame);
    cell.classList.toggle('drop-target-invalid', isSame);
  }

  _calendarDragLeave(e, cell) {
    if (e.relatedTarget && cell.contains(e.relatedTarget)) return;
    cell.classList.remove('drop-target', 'drop-target-invalid');
  }

  _calendarDrop(e, targetDate, cell) {
    e.preventDefault();
    cell.classList.remove('drop-target', 'drop-target-invalid');

    const drag = this._calDrag;
    if (!drag) return;
    if (targetDate === drag.sourceDate) { this._calDrag = null; return; }

    const delta = this._dateDiffDays(drag.sourceDate, targetDate);
    if (!delta) { this._calDrag = null; return; }

    // Estimate the group-shift scope up front for the confirm
    const totalInstances = drag.groupIds.reduce((sum, gid) =>
      sum + this.state.transactions.filter(t => t.status === 'estimated' && t.groupId === gid).length, 0
    );
    if (totalInstances > 1) {
      const arrow = delta > 0 ? `+${delta}` : `${delta}`;
      if (!confirm(
        `Dragging a recurring item will shift all ${totalInstances} projected instance(s) in the series by ${arrow} day${Math.abs(delta) !== 1 ? 's' : ''}.\n\n` +
        `The recurring schedule itself is preserved.\n\nContinue?`
      )) {
        this._calDrag = null;
        return;
      }
    }

    let movedPending = 0;
    let shiftedGroups = 0;
    let shiftedInstances = 0;

    // 1) Re-date pending items
    drag.pendingIds.forEach(id => {
      const p = this.state.pendingItems.find(x => x.id === id);
      if (p) { p.date = targetDate; movedPending++; }
    });

    // 2) Shift recurring groups
    drag.groupIds.forEach(gid => {
      const group = this.state.transactions.filter(t => t.status === 'estimated' && t.groupId === gid);
      if (group.length) {
        group.forEach(t => { t.date = this._addDaysStr(t.date, delta); });
        shiftedGroups++;
        shiftedInstances += group.length;
      }
    });

    // 3) Persist + re-render everything on this tab
    this.recalculateBalances();
    this.saveState();
    this.renderTabContent('calendar');
    this._calDrag = null;

    // Toast summary
    const parts = [];
    if (movedPending) parts.push(`${movedPending} pending item${movedPending !== 1 ? 's' : ''}`);
    if (shiftedGroups) parts.push(`${shiftedGroups} recurring group${shiftedGroups !== 1 ? 's' : ''} (${shiftedInstances} instance${shiftedInstances !== 1 ? 's' : ''})`);
    const summary = parts.length ? parts.join(' + ') : 'Nothing moved';
    const arrow = delta > 0 ? `+${delta}d` : `${delta}d`;
    this.showToast(`↔ Moved ${summary} (${arrow})`);
  }

  /* ---- Drawer reschedule (keyboard + touch fallback) ---- */

  openRescheduleItemModal(btn) {
    const itemId = typeof btn === 'string' ? btn : btn.dataset.itemId;
    const item = this.state.pendingItems.find(p => p.id === itemId);
    if (!item) return;
    this.openModal(`
      <div class="modal-overlay active">
        <div class="modal modal-sm">
          <div class="modal-header">
            <h2 class="modal-title">↔ Reschedule Item</h2>
            <button class="modal-close" data-action="closeModal" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-field">
              <label class="stat-label">Item</label>
              <div style="font-weight:600;">${this.escapeHtml(item.nickname || item.description)}</div>
              <div class="field-hint">${this.escapeHtml(item.description)}</div>
            </div>
            <div class="form-field">
              <label class="stat-label">Current date</label>
              <div class="mono">${this.escapeHtml(item.date)}</div>
            </div>
            <div class="form-field">
              <label class="stat-label">New date</label>
              <input type="date" id="rescheduleDate" value="${item.date}">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn" data-action="closeModal">Cancel</button>
            <button class="btn btn-primary" data-action="saveRescheduleItem" data-item-id="${itemId}">Save</button>
          </div>
        </div>
      </div>`);
  }

  saveRescheduleItem(btn) {
    const itemId = btn.dataset.itemId;
    const newDate = document.getElementById('rescheduleDate')?.value;
    if (!newDate) return;
    const item = this.state.pendingItems.find(p => p.id === itemId);
    if (!item) return;
    if (item.date === newDate) { this.closeModal(); return; }
    const oldDate = item.date;
    item.date = newDate;
    this.saveState();
    this.closeModal();
    this.closeDrawer();
    this.renderTabContent('calendar');
    this.showToast(`↔ Moved from ${oldDate} to ${newDate}`);
  }

  renderDebtsView() {
    const loans = this.state.loans || [];
    const total = loans.reduce((s, l) => s + (parseFloat(l.balance) || 0), 0);
    const stats = document.getElementById('debtStats');
    if (stats) stats.innerHTML = `
      <div class="stat-card" style="--stat-accent: var(--accent-negative);">
        <div class="stat-label">Total Outstanding Debt</div>
        <div class="stat-value mono" style="color:var(--accent-negative)">$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        <div class="stat-subtext">${loans.length} active loan${loans.length !== 1 ? 's' : ''}</div>
      </div>`;

    const list = document.getElementById('loanList');
    if (list) {
      if (!loans.length) {
        list.innerHTML = `<div class="empty-state">
          <div class="empty-state-icon">💳</div>
          <div class="empty-state-title">No loans yet</div>
          <div class="empty-state-hint">Click "+ Add Loan" to track a debt payoff plan.</div>
        </div>`;
      } else {
        list.innerHTML = loans.map(l => {
          const bal = parseFloat(l.balance) || 0;
          const rate = parseFloat(l.rate) || 0;
          const term = parseFloat(l.term || l.termYears) || 30;
          const unit = l.termUnit || 'years';
          const termLabel = unit === 'years' ? `${term} yr` : `${term} mo`;
          const totalPmt = parseFloat(l.minPayment) || 0;
          const escrow = parseFloat(l.escrow) || 0;
          const pi = Math.max(0, totalPmt - escrow);

          const totalMonths = this.getLoanMonths(l);
          const autoPI = this.calculatePI(bal, rate, totalMonths);
          const piDisplay = pi > 0 ? pi : autoPI;

          const filterDisplay = Array.isArray(l.paymentFilter) ? l.paymentFilter.join(', ') : (l.paymentFilter || '—');

          return `
            <div style="padding:1rem 0; border-bottom:1px solid var(--border-subtle);">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem; margin-bottom:0.75rem;">
                <div style="min-width:0;">
                  <div style="font-weight:700; font-size:1rem;">${this.escapeHtml(l.name)}</div>
                  <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">
                    ${rate}% APR · ${termLabel} · Filter: ${this.escapeHtml(filterDisplay)}
                  </div>
                </div>
                <div style="display:flex; align-items:center; gap:0.5rem; flex-shrink:0;">
                  <span class="mono" style="font-weight:700; font-size:1.05rem; color:var(--accent-negative);">
                    $${bal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <button class="btn btn-sm" data-action="openEditLoanModal" data-loan-id="${l.id}">⚙️</button>
                </div>
              </div>
              <div style="background:var(--bg-base); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:0.6rem 0.75rem; font-size:0.8rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:0.35rem;">
                  <span style="color:var(--text-muted); font-size:0.75rem; letter-spacing:0.04em; text-transform:uppercase;">Monthly Payment</span>
                  <span class="mono" style="font-weight:700; font-size:0.9rem;">$${totalPmt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding-left:0.75rem; font-size:0.75rem; margin-bottom:0.2rem;">
                  <span style="color:var(--text-dim);">├─ Principal &amp; Interest</span>
                  <span class="mono" style="color:var(--accent-primary); font-weight:600;">$${piDisplay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding-left:0.75rem; font-size:0.75rem;">
                  <span style="color:var(--text-dim);">└─ Escrow (taxes + insurance)</span>
                  <span class="mono" style="color:var(--text-muted);">$${escrow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>`;
        }).join('');
      }
    }

    const simControls = document.getElementById('loanSimControls');
    if (simControls) {
      if (loans.length > 0) {
        simControls.innerHTML = this.buildSimControlsHTML(loans);
        this.onSimLoanChange();
      } else {
        simControls.innerHTML = '';
      }
    }
  }

  buildSimControlsHTML(loans) {
    return `
      <div style="margin-bottom:1rem;">
        <label class="stat-label">Loan</label>
        <select id="simLoanSelect" onchange="app.onSimLoanChange()">
          ${loans.map(l => `<option value="${l.id}">${this.escapeHtml(l.name)} — $${(parseFloat(l.balance) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</option>`).join('')}
        </select>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
        <div>
          <label class="stat-label" style="display:flex; justify-content:space-between; align-items:center; gap:6px;">
            <span>P&amp;I Payment ($)</span>
            <button type="button" class="btn btn-sm"
                    style="padding:2px 8px; font-size:10px; line-height:1;"
                    onclick="app.autoCalcPI()"
                    title="Recalculate from balance, rate & term">Auto</button>
          </label>
          <input type="number" id="simMinPayment" value="0" oninput="app.markPIManual()">
        </div>
        <div>
          <label class="stat-label">Extra Payment ($)</label>
          <input type="number" id="simExtraPayment" value="0" oninput="app.debouncedDebtSim()">
        </div>
      </div>
      <div style="font-size:0.7rem; color:var(--text-dim); margin-top:0.5rem; line-height:1.4;">
        <strong style="color:var(--text-muted);">P&amp;I</strong> is the part of your payment that pays down the loan.
        Escrow (taxes &amp; insurance) is separate and doesn't affect payoff.
      </div>`;
  }

  updateLoanEditorTotal() {
    const pi = parseFloat(document.getElementById('loanPI')?.value) || 0;
    const esc = parseFloat(document.getElementById('loanEscrow')?.value) || 0;
    const el = document.getElementById('loanTotalDisplay');
    if (el) el.innerText = '$' + (pi + esc).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  renderDebtSimulation() {
    const loans = this.state.loans || [];
    if (!loans.length) return;
    const sel = document.getElementById('simLoanSelect');
    if (!sel) return;
    const loan = loans.find(l => l.id === sel.value);
    if (!loan) return;

    const bal = parseFloat(loan.balance) || 0;
    const rate = parseFloat(loan.rate) || 0;
    const escrow = parseFloat(loan.escrow) || 0;

    const totalMonths = this.getLoanMonths(loan);

    const monthlyInterest = bal * (rate / 100 / 12);
    const autoPI = this.calculatePI(bal, rate, totalMonths);
    const storedPI = this.getLoanPI(loan);

    let pi;
    if (this._piManual) {
      pi = parseFloat(document.getElementById('simMinPayment')?.value) || 0;
    } else if (storedPI > 0 && storedPI > monthlyInterest) {
      pi = storedPI;
    } else {
      pi = autoPI;
    }

    const piEl = document.getElementById('simMinPayment');
    if (piEl && !this._piManual) piEl.value = pi.toFixed(2);

    const extra = parseFloat(document.getElementById('simExtraPayment')?.value) || 0;
    const totalMonthly = pi + extra;

    const resEl = document.getElementById('loanSimResults');
    if (!resEl) return;

    if (totalMonthly <= monthlyInterest || pi <= 0) {
      resEl.innerHTML = `
        <div style="background:rgba(255,61,113,0.08); border:1px solid rgba(255,61,113,0.3); padding:1rem; border-radius:var(--radius-sm); margin-top:1rem;">
          <div class="stat-label" style="color:var(--red);">⚠ Payment too low to cover interest</div>
          <div style="font-size:0.85rem; color:var(--text); margin-top:0.4rem;">
            Your P&amp;I of <span class="mono">$${pi.toFixed(2)}</span> is less than the monthly interest
            of <span class="mono">$${monthlyInterest.toFixed(2)}</span>, so the loan would never pay off.
          </div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.5rem;">
            The P&amp;I should be about
            <span class="mono" style="color:var(--accent-primary); font-weight:600;">$${autoPI.toFixed(2)}</span>.
            Click <strong>Auto</strong> above to use that value.
          </div>
        </div>`;
      this.renderDebtChart([], []);
      return;
    }

    const result = this.calculatePayoff(bal, rate, pi, extra);
    const baseline = this.calculatePayoff(bal, rate, pi, 0);
    const interestSaved = Math.max(0, baseline.totalInterest - result.totalInterest);
    const monthsSaved = Math.max(0, baseline.months - result.months);

    const yr = Math.floor(result.months / 12);
    const mo = result.months % 12;
    const monthsLabel = yr > 0 ? `${yr} yr${yr !== 1 ? 's' : ''}, ${mo} mo` : `${mo} mo`;
    const payoffDate = this.getPayoffDate(result.months);

    const yrBaseline = Math.floor(baseline.months / 12);
    const moBaseline = baseline.months % 12;
    const baselinePayoffDate = this.getPayoffDate(baseline.months);

    const interestMonth1 = monthlyInterest;
    const principalMonth1 = Math.max(0, pi - interestMonth1);

    const totalPaid = bal + result.totalInterest;
    const interestRatio = bal > 0 ? (result.totalInterest / bal) * 100 : 0;

    const hasExtra = extra > 0;

    resEl.innerHTML = `
      <div style="margin-top:1rem; background:linear-gradient(180deg, rgba(0,229,255,0.06) 0%, rgba(0,229,255,0) 100%); border:1px solid rgba(0,229,255,0.2); border-radius:var(--radius-md); padding:1rem 1.1rem;">
        <div class="stat-label" style="font-size:0.7rem;">PAYOFF DATE</div>
        <div class="mono" style="font-size:1.6rem; font-weight:700; color:var(--accent-primary); line-height:1.1; margin-top:2px;">${payoffDate}</div>
        <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">In ${monthsLabel} from now</div>
      </div>

      <div style="margin-top:1rem; background:var(--bg-base); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:0.9rem 1rem;">
        <div class="stat-label" style="font-size:0.65rem; margin-bottom:0.6rem;">MONTH 1 BREAKDOWN</div>
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; padding:0.15rem 0;">
          <span style="color:var(--text-muted);">Your payment</span>
          <span class="mono" style="font-weight:600;">$${(pi + extra).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; padding:0.15rem 0;">
          <span style="color:var(--text-muted);">├─ Goes to interest</span>
          <span class="mono" style="color:var(--accent-negative);">$${interestMonth1.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; padding:0.15rem 0;">
          <span style="color:var(--text-muted);">└─ Goes to principal</span>
          <span class="mono" style="color:var(--accent-positive);">$${(principalMonth1 + extra).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>

      <div style="margin-top:0.75rem; background:var(--bg-base); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:0.9rem 1rem;">
        <div class="stat-label" style="font-size:0.65rem; margin-bottom:0.6rem;">LIFETIME TOTALS</div>
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; padding:0.15rem 0;">
          <span style="color:var(--text-muted);">Total you'll pay</span>
          <span class="mono" style="font-weight:600;">$${totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; padding:0.15rem 0;">
          <span style="color:var(--text-muted);">Total interest</span>
          <span class="mono" style="color:var(--accent-negative); font-weight:600;">$${result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.8rem; padding:0.15rem 0; border-top:1px solid var(--border-subtle); margin-top:0.4rem; padding-top:0.5rem;">
          <span style="color:var(--text-dim);">Interest as % of loan</span>
          <span class="mono" style="color:var(--text-muted);">${interestRatio.toFixed(1)}%</span>
        </div>
      </div>

      ${hasExtra ? `
      <div style="margin-top:0.75rem; background:rgba(0,255,157,0.06); border:1px solid rgba(0,255,157,0.25); border-radius:var(--radius-sm); padding:0.9rem 1rem;">
        <div class="stat-label" style="font-size:0.65rem; margin-bottom:0.6rem; color:var(--accent-positive);">✓ WITH $${extra.toFixed(2)} EXTRA / MO</div>
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; padding:0.15rem 0;">
          <span style="color:var(--text-muted);">Payoff instead of</span>
          <span class="mono" style="color:var(--text-muted); text-decoration:line-through;">${baselinePayoffDate}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; padding:0.15rem 0;">
          <span style="color:var(--text-muted);">Payoff sooner by</span>
          <span class="mono" style="color:var(--accent-positive); font-weight:700;">${monthsSaved} mo (${(monthsSaved / 12).toFixed(1)} yr)</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; padding:0.15rem 0;">
          <span style="color:var(--text-muted);">Interest saved</span>
          <span class="mono" style="color:var(--accent-positive); font-weight:700;">$${interestSaved.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>` : `
      <div style="margin-top:0.75rem; background:var(--bg-base); border:1px dashed var(--border-subtle); border-radius:var(--radius-sm); padding:0.75rem 1rem; font-size:0.8rem; color:var(--text-muted); text-align:center;">
        💡 Try entering an <strong>Extra Payment</strong> above to see how much time and interest you can save.
      </div>`}
    `;

    this.renderDebtChart(result.schedule, baseline.schedule);
  }

  onSimLoanChange() {
    this._piManual = false;
    const sel = document.getElementById('simLoanSelect');
    const extraEl = document.getElementById('simExtraPayment');

    if (sel && extraEl) {
      const loan = this.state.loans.find(l => l.id === sel.value);
      if (loan && loan.currentPayment) {
        const pi = this.getLoanPI(loan);
        const escrow = parseFloat(loan.escrow) || 0;
        const required = pi + escrow;
        const extra = Math.max(0, loan.currentPayment - required);
        extraEl.value = extra.toFixed(2);
      } else {
        extraEl.value = '0';
      }
    }
    this.renderDebtSimulation();
  }

  autoCalcPI() {
    this._piManual = false;
    this.renderDebtSimulation();
    this.showToast('P&I recalculated from loan terms');
  }

  markPIManual() {
    this._piManual = true;
    this.debouncedDebtSim();
  }

  calculatePayoff(principal, annualRate, minPayment, extraPayment) {
    let balance = principal;
    const monthlyRate = (annualRate / 100) / 12;
    const totalPay = minPayment + extraPayment;
    let totalInterest = 0, months = 0;
    const schedule = [{ month: 0, balance: principal }];
    if (totalPay <= 0 || totalPay <= balance * monthlyRate) {
      return { months: 999, totalInterest: 999999, schedule: [] };
    }
    while (balance > 0 && months < 1200) {
      const interest = balance * monthlyRate;
      let principalPaid = totalPay - interest;
      if (principalPaid > balance) principalPaid = balance;
      balance -= principalPaid;
      totalInterest += interest;
      months++;
      schedule.push({ month: months, balance: Math.max(0, balance) });
    }
    return { months, totalInterest, schedule };
  }

  renderDebtChart(schedule, baselineSchedule) {
    const canvas = document.getElementById('debtChart');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const ctx = canvas.getContext('2d');
    const H = 240;
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.clearRect(0, 0, rect.width, H);

    if (!schedule || schedule.length === 0) {
      ctx.fillStyle = cc.textMuted; ctx.font = '12px Inter'; ctx.textAlign = 'center';
      ctx.fillText('Adjust P&I to see the payoff projection.', rect.width / 2, H / 2);
      return;
    }

    const baseline = baselineSchedule && baselineSchedule.length ? baselineSchedule : schedule;
    const maxM = Math.max(schedule.length, baseline.length);
    const maxB = schedule[0].balance;
    const padL = 55, padR = 20, padT = 30, padB = 34;
    const chartW = rect.width - padL - padR;
    const chartH = H - padT - padB;
    const getX = m => padL + (m / maxM) * chartW;
    const getY = b => padT + (1 - b / maxB) * chartH;

    const legendY = 14;
    ctx.font = '600 10px Inter';
    ctx.textAlign = 'left';
    ctx.fillStyle = cc.accentSecondary;
    ctx.fillRect(padL, legendY - 6, 10, 3);
    ctx.fillStyle = cc.textMuted;
    ctx.fillText('Minimum', padL + 15, legendY);
    ctx.fillStyle = cc.accentPrimary;
    ctx.fillRect(padL + 90, legendY - 6, 10, 3);
    ctx.fillStyle = cc.textMuted;
    ctx.fillText('Your plan', padL + 105, legendY);

    ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1;
    ctx.fillStyle = '#5a5e6b'; ctx.font = '10px JetBrains Mono'; ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const y = padT + (chartH / 4) * i;
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(rect.width - padR, y); ctx.stroke();
      const val = maxB - (maxB / 4) * i;
      ctx.fillText(this.fmt(val), padL - 6, y + 3);
    }

    ctx.textAlign = 'center';
    const totalY = Math.ceil(maxM / 12);
    const yStep = Math.max(1, Math.ceil(totalY / 5));
    for (let y = 0; y <= totalY; y += yStep) {
      ctx.fillText(`Yr ${y}`, getX(y * 12), H - padB + 16);
    }

    ctx.beginPath(); ctx.strokeStyle = cc.accentSecondary; ctx.lineWidth = 2;
    ctx.setLineDash([5, 4]);
    baseline.forEach((d, i) => { const x = getX(d.month), y = getY(d.balance); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    schedule.forEach((d, i) => { const x = getX(d.month), y = getY(d.balance); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
    ctx.lineTo(getX(schedule[schedule.length - 1].month), padT + chartH);
    ctx.lineTo(getX(0), padT + chartH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
    grad.addColorStop(0, 'rgba(0,229,255,0.25)');
    grad.addColorStop(1, 'rgba(0,229,255,0)');
    ctx.fillStyle = grad; ctx.fill();

    ctx.beginPath(); ctx.strokeStyle = cc.accentPrimary; ctx.lineWidth = 2.5;
    schedule.forEach((d, i) => { const x = getX(d.month), y = getY(d.balance); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
    ctx.stroke();
  }

  openAddLoanModal() {
    this._openLoanEditor(null);
  }

  openEditLoanModal(btn) {
    const loan = this.state.loans.find(l => l.id === btn.dataset.loanId);
    if (!loan) return;
    this._openLoanEditor(loan);
  }

  filterLoanBills() {
    const q = (document.getElementById('loanFilterSearch')?.value || '').toLowerCase();
    const labels = document.querySelectorAll('#loanBillList label');
    labels.forEach(lbl => {
      const text = lbl.innerText.toLowerCase();
      lbl.style.display = text.includes(q) ? 'flex' : 'none';
    });
  }

  _openLoanEditor(loan) {
    const isEdit = !!loan;
    const l = loan || {
      id: '',
      name: '',
      balance: 0,
      rate: 5,
      term: 30,
      termUnit: 'years',
      minPayment: 0,
      escrow: 0,
      currentPayment: 0,
      paymentFilter: ''
    };

    if (l.term === undefined && l.termYears !== undefined) {
      l.term = l.termYears;
      l.termUnit = 'years';
    }
    if (!l.balanceAsOf) {
      l.balanceAsOf = new Date().toISOString().split('T')[0];
    }

    const bal = parseFloat(l.initialBalance || l.balance) || 0;
    const rate = parseFloat(l.rate) || 0;
    const escrow = parseFloat(l.escrow) || 0;
    const totalPmt = parseFloat(l.minPayment) || 0;
    const term = parseFloat(l.term) || 30;
    const termUnit = l.termUnit || 'years';
    const currentPayment = parseFloat(l.currentPayment) || 0;

    let pi = Math.max(0, totalPmt - escrow);
    if (pi <= 0) {
      const months = termUnit === 'years' ? term * 12 : term;
      pi = this.calculatePI(bal, rate, months);
    }
    const totalDisplay = pi + escrow;

    let uniqueDescs = [...new Set(this.state.transactions
      .filter(t => t.status !== 'estimated' && t.category === 'Bills and Utilities' && t.amount < 0)
      .map(t => t.description)
    )].sort();

    let currentFilters = Array.isArray(l.paymentFilter) ? l.paymentFilter : (l.paymentFilter || '').split(',').map(s => s.trim()).filter(Boolean);

    currentFilters.forEach(f => {
      if (!uniqueDescs.some(d => d.toUpperCase().includes(f.toUpperCase()) || f.toUpperCase().includes(d.toUpperCase()))) {
        uniqueDescs.push(f);
      }
    });
    uniqueDescs.sort();

    const billCheckboxes = uniqueDescs.map(desc => {
      const isChecked = currentFilters.some(f => desc.toUpperCase().includes(f.toUpperCase()) || f.toUpperCase().includes(desc.toUpperCase()));
      return `
        <label style="display:flex; align-items:center; gap:0.5rem; padding:0.4rem 0.25rem; cursor:pointer; font-size:0.8rem; border-bottom: 1px solid var(--border-subtle);">
          <input type="checkbox" class="loan-bill-checkbox" value="${this.escapeHtml(desc)}" ${isChecked ? 'checked' : ''}>
          <span style="flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${this.escapeHtml(desc)}</span>
        </label>
      `;
    }).join('');

    this.openModal(`
      <div class="modal-overlay active">
        <div class="modal modal-md">
          <div class="modal-header">
            <h2 class="modal-title">${isEdit ? 'Edit Loan' : 'Add New Loan'}</h2>
            <button class="modal-close" data-action="closeModal" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="editLoanId" value="${l.id}">

            <div class="form-field">
              <label class="stat-label">Loan Name</label>
              <input type="text" id="loanName" value="${this.escapeHtml(l.name)}" placeholder="e.g. Mortgage, Car Loan">
            </div>

            <div class="form-grid-2 form-field">
              <div>
                <label class="stat-label">Balance ($)</label>
                <input type="number" step="0.01" id="loanBalance" value="${bal.toFixed(2)}">
              </div>
              <div>
                <label class="stat-label">Balance As Of</label>
                <input type="date" id="loanBalanceDate" value="${l.balanceAsOf}">
              </div>
            </div>
            <div class="field-hint" style="margin-top:-0.5rem; margin-bottom:1rem;">
              Enter your current balance and leave the date as today to only track future payments. Or enter your original loan amount and change the date to the loan's start date to calculate the current balance from your history.
            </div>

            <div class="form-grid-2 form-field">
              <div>
                <label class="stat-label">Interest Rate (%)</label>
                <input type="number" step="0.01" id="loanRate" value="${rate}">
              </div>
              <div>
                <label class="stat-label">Term</label>
                <div style="display:flex; gap:0.5rem;">
                  <input type="number" id="loanTerm" value="${term}" style="flex:1;">
                  <select id="loanTermUnit" style="width:90px;">
                    <option value="years" ${termUnit === 'years' ? 'selected' : ''}>Years</option>
                    <option value="months" ${termUnit === 'months' ? 'selected' : ''}>Months</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-field" style="background:var(--bg-base); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:0.9rem 1rem;">
              <div class="stat-label" style="font-size:0.65rem; margin-bottom:0.6rem;">MONTHLY PAYMENT</div>
              <div class="form-grid-2">
                <div>
                  <label class="stat-label">Principal &amp; Interest ($)</label>
                  <input type="number" step="0.01" id="loanPI" value="${pi.toFixed(2)}">
                </div>
                <div>
                  <label class="stat-label">Escrow ($)</label>
                  <input type="number" step="0.01" id="loanEscrow" value="${escrow.toFixed(2)}">
                </div>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.75rem; padding-top:0.6rem; border-top:1px solid var(--border-subtle);">
                <span style="font-size:0.8rem; color:var(--text-muted);">Total Required Payment</span>
                <span id="loanTotalDisplay" class="mono" style="font-size:1rem; font-weight:700; color:var(--accent-primary);">
                  $${totalDisplay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div class="form-field">
              <label class="stat-label">Currently Paying ($)</label>
              <input type="number" step="0.01" id="loanCurrentPayment" value="${currentPayment.toFixed(2)}">
              <div class="field-hint">
                What you actually pay each month. Used to calculate your extra payment automatically.
              </div>
            </div>

            <div class="form-field">
              <label class="stat-label">Payment Filters (Matches Transactions)</label>
              <div style="position: relative; margin-bottom: 0.5rem;">
                <input type="text" id="loanFilterSearch" placeholder="Search bills..." oninput="app.filterLoanBills()" style="padding-left: 2.2rem; border-color: var(--border-glow);">
                <span style="position: absolute; left: 0.8rem; top: 50%; transform: translateY(-50%); opacity: 0.5; font-size: 0.8rem;">🔍</span>
              </div>
              <div id="loanBillList" style="max-height: 160px; overflow-y: auto; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.25rem 0.5rem;">
                ${billCheckboxes || '<div style="color:var(--text-muted); font-size:0.8rem; padding:0.5rem;">No "Bills and Utilities" transactions found.</div>'}
              </div>
            </div>
          </div>
          <div class="modal-footer ${isEdit ? 'spread' : ''}">
            ${isEdit ? `<div class="left-actions"><button class="btn btn-danger btn-sm" data-action="deleteLoan">Delete</button></div>` : ''}
            <div class="right-actions">
              <button class="btn" data-action="closeModal">Cancel</button>
              <button class="btn btn-primary" data-action="${isEdit ? 'saveEditedLoan' : 'saveLoan'}">${isEdit ? 'Save' : 'Add Loan'}</button>
            </div>
          </div>
        </div>
      </div>`);
  }

  saveLoan() {
    const name = document.getElementById('loanName').value.trim();
    const bal = parseFloat(document.getElementById('loanBalance').value) || 0;
    const balDate = document.getElementById('loanBalanceDate').value;
    const rate = parseFloat(document.getElementById('loanRate').value);
    const term = parseInt(document.getElementById('loanTerm').value) || 30;
    const termUnit = document.getElementById('loanTermUnit').value;
    const pi = parseFloat(document.getElementById('loanPI').value) || 0;
    const esc = parseFloat(document.getElementById('loanEscrow').value) || 0;
    const currentPmt = parseFloat(document.getElementById('loanCurrentPayment').value) || 0;

    const checkedBoxes = Array.from(document.querySelectorAll('.loan-bill-checkbox:checked')).map(cb => cb.value);

    if (!name || isNaN(rate)) { alert('Please fill in name and rate.'); return; }
    const minPayment = pi + esc;
    this.state.loans.push({
      id: `loan_${Date.now()}`,
      name, balance: bal, initialBalance: bal, balanceAsOf: balDate,
      rate, minPayment, escrow: esc, term, termUnit, currentPayment: currentPmt, paymentFilter: checkedBoxes
    });
    this.recalculateLoanBalances();
    this.saveState();
    this.flashBtnSuccess(document.querySelector('.modal-footer .btn-primary'));
    setTimeout(() => this.closeModal(), 400);
    this.renderTabContent('debts');
    this.showToast(`Loan "${name}" added`);
  }

  saveEditedLoan() {
    const id = document.getElementById('editLoanId').value;
    const l = this.state.loans.find(x => x.id === id);
    if (!l) return;
    l.name = document.getElementById('loanName').value.trim();
    l.initialBalance = parseFloat(document.getElementById('loanBalance').value) || 0;
    l.balanceAsOf = document.getElementById('loanBalanceDate').value;
    l.rate = parseFloat(document.getElementById('loanRate').value) || 0;
    l.term = parseInt(document.getElementById('loanTerm').value) || 30;
    l.termUnit = document.getElementById('loanTermUnit').value;
    const pi = parseFloat(document.getElementById('loanPI').value) || 0;
    const esc = parseFloat(document.getElementById('loanEscrow').value) || 0;
    l.minPayment = pi + esc;
    l.escrow = esc;
    l.currentPayment = parseFloat(document.getElementById('loanCurrentPayment').value) || 0;

    l.paymentFilter = Array.from(document.querySelectorAll('.loan-bill-checkbox:checked')).map(cb => cb.value);

    this._piManual = false;
    this.recalculateLoanBalances();
    this.saveState();
    this.flashBtnSuccess(document.querySelector('.modal-footer .btn-primary'));
    setTimeout(() => this.closeModal(), 400);
    this.renderTabContent('debts');
    this.showToast('Loan updated');
  }

  deleteLoan() {
    const id = document.getElementById('editLoanId').value;
    const loan = this.state.loans.find(l => l.id === id);
    if (!loan) return;
    if (!confirm('Delete this loan?')) return;
    
    this.state.loans = this.state.loans.filter(l => l.id !== id);
    this.saveState();
    this.flashBtnSuccess(document.querySelector('.modal-footer .btn-primary'));
    setTimeout(() => this.closeModal(), 400);
    this.renderTabContent('debts');
    
    this.showToast('Loan deleted', {
      actionLabel: 'Undo',
      onAction: () => {
        this.state.loans.push(loan);
        this.saveState();
        this.renderTabContent('debts');
      }
    });
  }

  recalculateLoanBalances() {
    if (!this.state.loans || !this.state.loans.length) return;
    this.state.loans.forEach(loan => {
      let filters = loan.paymentFilter;
      if (typeof filters === 'string') filters = filters.split(',').map(f => f.trim()).filter(Boolean);
      if (Array.isArray(filters)) filters = filters.map(f => f.trim()).filter(Boolean);
      if (!filters || !filters.length) {
        loan.balance = parseFloat(loan.initialBalance) || 0;
        return;
      }

      const asOf = loan.balanceAsOf || new Date().toISOString().split('T')[0];
      const payments = this.state.transactions.filter(t => {
        if (t.status === 'estimated' || t.amount >= 0 || !t.description) return false;
        if (t.date <= asOf) return false;
        const desc = t.description.toUpperCase();
        return filters.some(f => desc.includes(f.toUpperCase()));
      });

      let bal = parseFloat(loan.initialBalance) || 0;

      if (payments.length > 0) {
        payments.sort((a, b) => new Date(a.date) - new Date(b.date));
        const mr = ((parseFloat(loan.rate) || 0) / 100) / 12;
        payments.forEach(p => {
          const amt = Math.abs(parseFloat(p.amount) || 0);
          const interest = bal * mr;
          let principal = amt - interest;
          if (principal < 0) principal = 0;
          bal -= principal;
          if (bal < 0) bal = 0;
        });
      }
      loan.balance = bal;
    });
    this.saveState();
  }

  calculatePaycheck() {
    const get = (id, def) => {
      const raw = document.getElementById(id)?.value;
      const v = parseFloat(raw);
      return isNaN(v) ? def : v;
    };

    const hourly = get('payHourlyRate', 17);
    const hours = get('payHours', 40);
    const weeks = get('payWeeks', 52);
    const benefits = get('payBenefits', 0);
    const fedRate = get('payFederalRate', 12);
    const stateCode = document.getElementById('payState')?.value || this.state.selectedState;
    const period = document.getElementById('payPeriod')?.value || 'yearly';

    const weeklyGross = hourly * hours;
    const annualGross = weeklyGross * weeks;

    const stateData = (this.state.taxStates || []).find(s => s.code === stateCode);
    let stateTax = 0;
    let effectiveStateRate = 0;
    if (stateData) {
      stateTax = this.calculateProgressiveTax(annualGross, stateData.brackets);
      effectiveStateRate = annualGross > 0 ? (stateTax / annualGross) * 100 : 0;
    }

    const fedTax = annualGross * (fedRate / 100);
    const ss = annualGross * 0.062;
    const med = annualGross * 0.0145;
    const totalTax = fedTax + stateTax + ss + med;
    const annualBenefits = benefits * 12;
    const annualNet = annualGross - totalTax - annualBenefits;

    const divisors = { weekly: 52, biweekly: 26, monthly: 12, yearly: 1 };
    const div = divisors[period] || 1;
    const periodLabel = { weekly: 'Weekly', biweekly: 'Bi-Weekly', monthly: 'Monthly', yearly: 'Yearly' }[period];

    const pGross = annualGross / div;
    const pNet = annualNet / div;
    const pFed = fedTax / div;
    const pState = stateTax / div;
    const pSS = ss / div;
    const pMed = med / div;
    const pBenefits = annualBenefits / div;

    let bracketBreakdown = '';
    if (stateData && stateData.brackets.length > 1 && annualGross > 0) {
      const rows = [];
      for (const b of stateData.brackets) {
        if (annualGross <= b.min) break;
        const taxable = Math.min(annualGross, b.max) - b.min;
        if (taxable <= 0) continue;
        const taxAtBracket = taxable * (b.rate / 100);
        const maxLabel = b.max >= MAX_BRACKET ? '+' : `$${b.max.toLocaleString()}`;
        rows.push(`<div style="display:flex; justify-content:space-between; font-size:0.75rem; padding:0.15rem 0;">
          <span style="color:var(--text-muted);">$${b.min.toLocaleString()} - ${maxLabel} @ ${b.rate}%</span>
          <span class="mono" style="color:var(--accent-negative);">$${(taxAtBracket / div).toFixed(2)}</span>
        </div>`);
      }
      if (rows.length > 0) {
        bracketBreakdown = `<div style="margin-top:0.75rem; padding-top:0.6rem; border-top:1px solid var(--border-subtle);">
          <div class="stat-label" style="font-size:0.65rem; margin-bottom:0.4rem;">${this.escapeHtml(stateData.name)} Brackets (${periodLabel})</div>
          ${rows.join('')}
        </div>`;
      }
    }

    const el = document.getElementById('paycheckResults');
    if (!el) return;
    el.innerHTML = `
      <div style="text-align:center; padding:1.5rem 1rem; background:linear-gradient(180deg, rgba(0,255,157,0.08) 0%, rgba(0,255,157,0) 100%); border-radius:var(--radius-md); border:1px solid rgba(0,255,157,0.2);">
        <div class="stat-label" style="justify-content:center;">NET TAKE HOME (${periodLabel.toUpperCase()})</div>
        <div class="mono" style="font-size:2.5rem; font-weight:700; color:var(--accent-positive); line-height:1.1;">$${pNet.toFixed(2)}</div>
      </div>
      <div style="text-align:center; padding:0.75rem 1rem 0.5rem;">
        <div class="stat-label" style="justify-content:center;">GROSS (${periodLabel.toUpperCase()})</div>
        <div class="mono" style="font-size:1.2rem; font-weight:600; color:var(--text-main);">$${pGross.toFixed(2)}</div>
      </div>
      <details style="background:var(--bg-base); border-radius:var(--radius-sm); border:1px solid var(--border-subtle); padding:0.5rem 1rem; margin-top:0.5rem;">
        <summary style="cursor:pointer; font-weight:600; font-size:0.85rem; color:var(--text-muted); padding:0.4rem 0; user-select:none;">Deductions Breakdown</summary>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; font-size:0.85rem; padding-top:0.5rem;">
          <div>Federal (${fedRate}%): <span class="mono" style="color:var(--accent-negative);">$${pFed.toFixed(2)}</span></div>
          <div>${stateData ? this.escapeHtml(stateData.name) : 'State'} (${effectiveStateRate.toFixed(2)}%): <span class="mono" style="color:var(--accent-negative);">$${pState.toFixed(2)}</span></div>
          <div>Social Security: <span class="mono" style="color:var(--accent-negative);">$${pSS.toFixed(2)}</span></div>
          <div>Medicare: <span class="mono" style="color:var(--accent-negative);">$${pMed.toFixed(2)}</span></div>
          <div>Benefits: <span class="mono" style="color:var(--accent-negative);">$${pBenefits.toFixed(2)}</span></div>
        </div>
        ${bracketBreakdown}
      </details>`;
  }

  openTaxBracketModal() {
    const states = this.state.taxStates || [];
    const selected = this.state.selectedState || states[0]?.code;
    const current = states.find(s => s.code === selected) || states[0];

    this.openModal(`
      <div class="modal-overlay active">
        <div class="modal modal-lg">
          <div class="modal-header">
            <h2 class="modal-title">⚙ State Tax Brackets</h2>
            <button class="modal-close" data-action="closeModal" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">
            <div style="display:grid; grid-template-columns: 1fr auto; gap:0.5rem; margin-bottom:1rem;">
              <div class="form-field" style="margin:0;">
                <label class="stat-label">Select State</label>
                <select id="tbStateSelect" onchange="app.loadBracketEditor(this.value)">
                  ${states.map(s => `<option value="${s.code}" ${s.code === selected ? 'selected' : ''}>${this.escapeHtml(s.name)} (${s.code})</option>`).join('')}
                </select>
              </div>
              <div style="display:flex; align-items:flex-end;">
                <button class="btn btn-sm btn-primary" data-action="newTaxState">+ New State</button>
              </div>
            </div>

            <div id="tbEditor"></div>
          </div>
          <div class="modal-footer spread">
            <div class="left-actions">
              <button class="btn btn-danger btn-sm" data-action="deleteTaxState">Delete State</button>
              <button class="btn btn-sm" data-action="resetTaxBrackets" title="Restore all default state brackets">↺ Reset</button>
            </div>
            <div class="right-actions">
              <button class="btn" data-action="closeModal">Cancel</button>
              <button class="btn btn-primary" data-action="saveTaxBrackets">Save Brackets</button>
            </div>
          </div>
        </div>
      </div>`);
    if (current) this.loadBracketEditor(current.code);
  }

  loadBracketEditor(code) {
    const state = (this.state.taxStates || []).find(s => s.code === code);
    const editor = document.getElementById('tbEditor');
    if (!editor) return;
    if (!state) { editor.innerHTML = ''; return; }

    this.editingStateCode = code;

    const rowsHtml = state.brackets.map((b, i) => `
      <div style="display:grid; grid-template-columns: 1fr 1fr 1fr auto; gap:0.5rem; align-items:center; margin-bottom:0.4rem;" data-bracket-row="${i}">
        <input type="number" step="0.01" placeholder="Min $" value="${b.min}" data-bracket-min="${i}">
        <input type="number" step="0.01" placeholder="Max $" value="${b.max >= MAX_BRACKET ? '' : b.max}" data-bracket-max="${i}" title="Leave empty for top bracket">
        <input type="number" step="0.01" placeholder="Rate %" value="${b.rate}" data-bracket-rate="${i}">
        <button class="btn btn-sm btn-danger" data-action="removeBracketRow" data-index="${i}">✕</button>
      </div>`).join('');

    editor.innerHTML = `
      <div style="background:var(--bg-base); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-glow);">
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem; margin-bottom:1rem;">
          <div><label class="stat-label">State Code</label><input type="text" id="tbStateCode" value="${this.escapeHtml(state.code)}" maxlength="4"></div>
          <div><label class="stat-label">State Name</label><input type="text" id="tbStateName" value="${this.escapeHtml(state.name)}"></div>
        </div>
        <div class="stat-label" style="margin-bottom:0.5rem;">Brackets (Min $ | Max $ | Rate %)</div>
        <div style="font-size:0.7rem; color:var(--text-dim); margin-bottom:0.5rem;">Leave Max empty for the top bracket (no upper limit).</div>
        <div id="tbBracketRows">${rowsHtml}</div>
        <button class="btn btn-sm" data-action="addBracketRow" style="margin-top:0.5rem;">+ Add Bracket</button>
      </div>`;
  }

  addBracketRow() {
    const rows = document.getElementById('tbBracketRows');
    if (!rows) return;
    const i = rows.querySelectorAll('[data-bracket-row]').length;
    const row = document.createElement('div');
    row.style.cssText = 'display:grid; grid-template-columns: 1fr 1fr 1fr auto; gap:0.5rem; align-items:center; margin-bottom:0.4rem;';
    row.setAttribute('data-bracket-row', i);
    row.innerHTML = `
      <input type="number" step="0.01" placeholder="Min $" data-bracket-min="${i}">
      <input type="number" step="0.01" placeholder="Max $" data-bracket-max="${i}">
      <input type="number" step="0.01" placeholder="Rate %" data-bracket-rate="${i}">
      <button class="btn btn-sm btn-danger" data-action="removeBracketRow" data-index="${i}">✕</button>`;
    rows.appendChild(row);
  }

  removeBracketRow(btn) {
    const row = btn.closest('[data-bracket-row]');
    if (row) row.remove();
  }

  saveTaxBrackets() {
    const code = document.getElementById('tbStateCode')?.value.trim().toUpperCase();
    const name = document.getElementById('tbStateName')?.value.trim();
    if (!code || !name) { alert('Enter a state code and name.'); return; }

    const brackets = [];
    const rows = document.querySelectorAll('#tbBracketRows [data-bracket-row]');
    rows.forEach(row => {
      const min = parseFloat(row.querySelector('[data-bracket-min]')?.value) || 0;
      const maxInput = row.querySelector('[data-bracket-max]')?.value;
      const max = maxInput === '' ? MAX_BRACKET : (parseFloat(maxInput) || MAX_BRACKET);
      const rate = parseFloat(row.querySelector('[data-bracket-rate]')?.value) || 0;
      brackets.push({ min, max, rate });
    });
    brackets.sort((a, b) => a.min - b.min);

    if (brackets.length === 0) { alert('Add at least one bracket.'); return; }

    const idx = (this.state.taxStates || []).findIndex(s => s.code === this.editingStateCode);
    const entry = { code, name, brackets };
    if (idx >= 0) this.state.taxStates[idx] = entry;
    else this.state.taxStates.push(entry);

    this.state.selectedState = code;
    this.saveState();
    this.closeModal();
    this.renderTabContent('paycheck');
    this.showToast(`Saved ${name} brackets`);
  }

  deleteTaxState() {
    const code = document.getElementById('tbStateCode')?.value.trim().toUpperCase();
    if (!code) return;
    if (!confirm(`Delete tax brackets for ${code}?`)) return;
    this.state.taxStates = (this.state.taxStates || []).filter(s => s.code !== code);
    if (this.state.selectedState === code) {
      this.state.selectedState = this.state.taxStates[0]?.code || null;
    }
    this.saveState();
    this.closeModal();
    this.renderTabContent('paycheck');
    this.showToast(`Deleted ${code}`);
  }

  resetTaxBrackets() {
    if (!confirm(
      'Reset to default state brackets?\n\n' +
      'This will restore Oklahoma, Kansas, Colorado, Texas, and Florida. ' +
      'Any custom states you have added will be removed.'
    )) return;
    this.state.taxStates = JSON.parse(JSON.stringify(DEFAULT_TAX_STATES));
    this.state.selectedState = 'OK';
    this.saveState();
    this.closeModal();
    this.renderTabContent('paycheck');
    this.showToast('Reset to default state brackets');
  }

  newTaxState() {
    this.editingStateCode = null;
    const editor = document.getElementById('tbEditor');
    if (!editor) return;
    editor.innerHTML = `
      <div style="background:var(--bg-base); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-glow);">
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem; margin-bottom:1rem;">
          <div><label class="stat-label">State Code</label><input type="text" id="tbStateCode" placeholder="e.g. KS" maxlength="4"></div>
          <div><label class="stat-label">State Name</label><input type="text" id="tbStateName" placeholder="e.g. Kansas"></div>
        </div>
        <div class="stat-label" style="margin-bottom:0.5rem;">Brackets (Min $ | Max $ | Rate %)</div>
        <div style="font-size:0.7rem; color:var(--text-dim); margin-bottom:0.5rem;">Leave Max empty for the top bracket (no upper limit).</div>
        <div id="tbBracketRows">
          <div style="display:grid; grid-template-columns: 1fr 1fr 1fr auto; gap:0.5rem; align-items:center; margin-bottom:0.4rem;" data-bracket-row="0">
            <input type="number" step="0.01" placeholder="Min $" value="0" data-bracket-min="0">
            <input type="number" step="0.01" placeholder="Max $" data-bracket-max="0">
            <input type="number" step="0.01" placeholder="Rate %" data-bracket-rate="0">
            <button class="btn btn-sm btn-danger" data-action="removeBracketRow" data-index="0">✕</button>
          </div>
        </div>
        <button class="btn btn-sm" data-action="addBracketRow" style="margin-top:0.5rem;">+ Add Bracket</button>
      </div>`;
  }

  syncForecaster() {
    const estimated = this.state.transactions.filter(t => t.status === 'estimated');

    const groups = new Map();
    estimated.forEach(t => {
      const gid = t.groupId || ('solo_' + t.id);
      if (!groups.has(gid)) groups.set(gid, t);
    });

    let inc = 0, fix = 0;
    groups.forEach(t => {
      const abs = Math.abs(parseFloat(t.amount) || 0);
      const cfg = t.ruleConfig || { interval: 1, freq: 'months' };
      const int = Math.max(1, cfg.interval || 1);
      let monthly = 0;
      if (cfg.freq === 'days') monthly = (abs / int) * (365 / 12);
      else if (cfg.freq === 'weeks') monthly = (abs / int) * (52 / 12);
      else if (cfg.freq === 'months') monthly = abs / int;
      else if (cfg.freq === 'years') monthly = abs / (12 * int);
      else monthly = abs;

      const isIncome = t.amount > 0 || t.category === 'Income' || t.flow === 'Income';
      if (isIncome) inc += monthly;
      else fix += monthly;
    });

    const incEl = document.getElementById('fcAvgIncome');
    const fixEl = document.getElementById('fcAvgFixed');
    if (incEl) incEl.value = inc.toFixed(2);
    if (fixEl) fixEl.value = fix.toFixed(2);

    this.renderForecaster();
    this.showToast(`Synced ${groups.size} recurring group${groups.size !== 1 ? 's' : ''}`);
  }

  renderForecaster() {
    const gi = id => parseFloat(document.getElementById(id)?.value) || 0;
    const avgInc = gi('fcAvgIncome');
    const avgFix = gi('fcAvgFixed');
    const avgVar = gi('fcAvgVariable');

    let scenSum = 0;
    (this.state.scenarios || []).forEach(s => {
      scenSum += this.computeScenarioImpact(s);
    });

    const netFull = avgInc - avgFix - avgVar + scenSum;
    const netBills = avgInc - avgFix + scenSum;

    const cards = document.getElementById('forecastOutputCards');
    if (cards) cards.innerHTML = `
      <div class="forecast-col-card">
        <div class="stat-label">NET MONTHLY SURPLUS (FULL)</div>
        <div class="stat-value mono" style="color:${netFull >= 0 ? 'var(--accent-positive)' : 'var(--accent-negative)'}">$${netFull.toFixed(2)}</div>
        <div class="stat-subtext">Includes Income, Bills, Flex & Scenarios</div>
      </div>
      <div class="forecast-col-card">
        <div class="stat-label">NET SURPLUS (BILLS ONLY)</div>
        <div class="stat-value mono" style="color:${netBills >= 0 ? 'var(--accent-primary)' : 'var(--accent-negative)'}">$${netBills.toFixed(2)}</div>
        <div class="stat-subtext">Income minus Fixed Bills & Scenarios</div>
      </div>`;

    const sList = document.getElementById('scenarioList');
    if (sList) {
      const typeIcons = { paycheck: '💰', bill: '📄', loan: '🏦', recurring: '🔁', custom: '⚙️' };
      const typeLabels = { paycheck: 'Paycheck', bill: 'Bill', loan: 'Loan', recurring: 'Recurring', custom: 'Custom' };

      sList.innerHTML = (this.state.scenarios || []).map(s => {
        const type = s.type || 'custom';
        const icon = typeIcons[type] || '⚙️';
        const typeLabel = typeLabels[type] || 'Scenario';

        const impact = this.computeScenarioImpact({ ...s, active: true });
        const impactColor = impact >= 0 ? 'var(--accent-positive)' : 'var(--accent-negative)';
        const impactStr = `${impact >= 0 ? '+' : '-'}$${Math.abs(impact).toFixed(2)}/mo`;

        let subtitle = '';
        if (type === 'paycheck' || type === 'bill') {
          const g = this.getRecurringGroupInfo(s.groupId);
          if (g) subtitle = `${g.description} → $${Math.abs(parseFloat(s.amount) || 0).toFixed(2)}`;
          else subtitle = 'Missing recurring item';
        } else if (type === 'loan') {
          const l = (this.state.loans || []).find(x => x.id === s.loanId);
          const ov = s.loanOverrides || {};
          const bal = ov.balance != null ? ov.balance : (l ? l.balance : 0);
          const rt = ov.rate != null ? ov.rate : (l ? l.rate : 0);
          const trm = ov.term != null ? ov.term : (l ? (l.term || l.termYears) : 30);
          const trmU = ov.termUnit != null ? ov.termUnit : (l ? (l.termUnit || 'years') : 'years');
          subtitle = `${l ? l.name : 'Loan'} · $${(parseFloat(bal) || 0).toFixed(0)} @ ${rt}% × ${trm} ${trmU}`;
        } else if (type === 'recurring') {
          subtitle = 'New recurring item';
        } else {
          subtitle = 'Freeform adjustment';
        }

        return `
        <div class="scenario-item ${s.active ? '' : 'disabled'}">
          <div style="min-width:0; flex:1;">
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-size:0.9rem;">${icon}</span>
              <span class="badge" style="background:var(--bg-base); color:var(--text-muted); border:1px solid var(--border-subtle); font-size:0.6rem;">${typeLabel}</span>
            </div>
            <div style="font-weight:600; font-size:0.85rem; margin-top:4px;">${this.escapeHtml(s.name)}</div>
            <div style="font-size:0.7rem; color:var(--text-dim); margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${this.escapeHtml(subtitle)}</div>
            <div class="mono" style="font-size:0.8rem; color:${impactColor}; margin-top:4px;">${impactStr}</div>
          </div>
          <div style="display:flex; gap:0.35rem; align-items:center; flex-shrink:0;">
            <button class="scenario-toggle-btn ${s.active ? 'active' : ''}" data-action="toggleScenario" data-scenario-id="${s.id}">${s.active ? 'ON' : 'OFF'}</button>
            <button class="btn btn-sm" data-action="openEditScenarioModal" data-scenario-id="${s.id}">⚙️</button>
          </div>
        </div>`;
      }).join('');
    }
  }

  toggleScenario(btn) {
    const id = btn.dataset.scenarioId;
    const sc = this.state.scenarios.find(s => s.id === id);
    if (sc) { sc.active = !sc.active; this.saveState(); this.renderForecaster(); }
  }

  renderAPY() {
    const gv = id => parseFloat(document.getElementById(id)?.value) || 0;
    const principal = gv('apyPrincipal');
    const rate = gv('apyRate') / 100;
    const monthly = gv('apyMonthly');
    const withdrawal = gv('apyWithdrawal');
    const years = parseInt(document.getElementById('apyYears')?.value) || 5;
    const cc = this._chartColors();

    let total = principal;
    const months = years * 12;
    const mr = rate / 12;
    const balances = [total];
    for (let i = 0; i < months; i++) {
      total = (total + monthly - withdrawal) * (1 + mr);
      if (total < 0) total = 0;
      balances.push(total);
    }
    const deposits = principal + (monthly * months);
    const withdrawals = withdrawal * months;
    const interest = total - deposits + withdrawals;

    const sum = document.getElementById('apySummary');
    if (sum) sum.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; background:var(--bg-base); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle);">
        <div><div class="stat-label">PROJECTED END BALANCE</div>
          <div class="stat-value mono" style="color:var(--accent-positive); font-size:1.3rem;">$${total.toFixed(2)}</div></div>
        <div><div class="stat-label">TOTAL INTEREST EARNED</div>
          <div class="stat-value mono" style="color:var(--accent-primary); font-size:1.3rem;">$${interest.toFixed(2)}</div></div>
      </div>`;

    const canvas = document.getElementById('apyChart');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const ctx = canvas.getContext('2d');
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = 220 * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.clearRect(0, 0, rect.width, 220);

    const minV = Math.min(...balances);
    const maxV = Math.max(...balances);
    const pad = (maxV - minV) * 0.1 || 10;
    const startY = 30, endY = 180, ch = endY - startY;
    const getX = i => 50 + (i / months) * (rect.width - 70);
    const getY = v => endY - ((v - (minV - pad)) / ((maxV + pad) - (minV - pad))) * ch;

    ctx.strokeStyle = cc.chartGrid; ctx.fillStyle = cc.textDim;
    ctx.font = '10px JetBrains Mono'; ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const y = startY + (ch / 4) * i;
      ctx.beginPath(); ctx.moveTo(50, y); ctx.lineTo(rect.width - 20, y); ctx.stroke();
      ctx.fillText(this.fmt(maxV + pad - ((maxV + pad - (minV - pad)) / 4) * i), 45, y + 3);
    }
    ctx.textAlign = 'center';
    const yStep = Math.max(1, Math.ceil(years / 6));
    for (let i = 0; i <= years; i += yStep) {
      ctx.fillText(`Yr ${i}`, getX(i * 12), endY + 18);
    }
    ctx.beginPath(); ctx.strokeStyle = cc.accentPrimary; ctx.lineWidth = 2.5;
    balances.forEach((v, i) => { const x = getX(i), y = getY(v); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
    ctx.stroke();
  }

  updateApySource() {
    const src = document.getElementById('apySource')?.value;
    const input = document.getElementById('apyPrincipal');
    if (!input) return;
    if (src === 'VAULTS') input.value = this.getBalances('SAVINGS').vaults.toFixed(2);
    else if (src === 'CHECKING') input.value = this.getBalances('CHECKING').available.toFixed(2);
    this.renderAPY();
  }

  renderCharts() {
    try {
      if (this.currentTab === 'checking') this.renderCheckingChart();
      else if (this.currentTab === 'networth') { this.renderNetWorthChart(); this.renderDonutChart(); }
      else if (this.currentTab === 'debts') this.renderDebtSimulation();
      else if (this.currentTab === 'forecaster') this.renderForecasterChart();
      else if (this.currentTab === 'apy') this.renderAPY();
    } catch (e) { console.error("Chart error:", e); }
  }

  renderCheckingChart() {
    const canvas = document.getElementById('checkingChart');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const ctx = canvas.getContext('2d');
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = 260 * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.clearRect(0, 0, rect.width, 260);
    const cc = this._chartColors();

    const txs = this.state.transactions.filter(t => t.account === 'CHECKING' && t.status !== 'estimated')
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    if (txs.length === 0) {
      ctx.fillStyle = cc.textMuted; ctx.font = '14px Inter'; ctx.textAlign = 'center';
      ctx.fillText('No data', rect.width / 2, 130); return;
    }
    const range = this.chartRanges.checking || 'week';
    const latest = new Date(txs[txs.length - 1].date);
    let start = new Date(latest);
    if (range === 'week') start.setDate(start.getDate() - 7);
    else if (range === 'month') start.setMonth(start.getMonth() - 1);
    else start.setFullYear(start.getFullYear() - 1);

    const timeline = [];
    const iter = new Date(start);
    if (range === 'year') {
      iter.setDate(1);
      while (iter <= latest) { timeline.push(new Date(iter)); iter.setMonth(iter.getMonth() + 1); }
    } else {
      while (iter <= latest) { timeline.push(new Date(iter)); iter.setDate(iter.getDate() + 1); }
    }
    const data = [];
    let idx = 0, bal = 0;
    while (idx < txs.length && new Date(txs[idx].date) < start) { bal = parseFloat(txs[idx].balance) || 0; idx++; }
    timeline.forEach(date => {
      while (idx < txs.length && new Date(txs[idx].date) <= date) { bal = parseFloat(txs[idx].balance) || 0; idx++; }
      data.push({ date, balance: bal });
    });
    const vals = data.map(d => d.balance);
    const minV = Math.min(...vals), maxV = Math.max(...vals);
    const pad = (maxV - minV) * 0.1 || 10;
    const startY = 30, endY = 220, ch = endY - startY;
    const pts = data.map((d, i) => {
      const x = 50 + (i / Math.max(1, data.length - 1)) * (rect.width - 70);
      const n = (d.balance - (minV - pad)) / ((maxV + pad) - (minV - pad));
      return { x, y: endY - n * ch, date: d.date };
    });
    ctx.strokeStyle = cc.chartGrid; ctx.fillStyle = cc.textDim;
    ctx.font = '10px JetBrains Mono'; ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const y = startY + (ch / 4) * i;
      ctx.beginPath(); ctx.moveTo(50, y); ctx.lineTo(rect.width - 20, y); ctx.stroke();
      ctx.fillText(this.fmt(maxV + pad - ((maxV + pad - (minV - pad)) / 4) * i), 45, y + 3);
    }
    ctx.beginPath(); ctx.strokeStyle = cc.accentPrimary; ctx.lineWidth = 2.5;
    pts.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
    ctx.stroke();
    const grad = ctx.createLinearGradient(0, startY, 0, endY);
    grad.addColorStop(0, cc.accentPrimary + '40'); grad.addColorStop(1, cc.accentPrimary + '00');
    ctx.lineTo(pts[pts.length - 1].x, endY); ctx.lineTo(pts[0].x, endY); ctx.closePath();
    ctx.fillStyle = grad; ctx.fill();

    ctx.fillStyle = cc.textDim; ctx.font = '10px JetBrains Mono'; ctx.textAlign = 'center';
    const maxL = Math.floor((rect.width - 70) / 60);
    const step = Math.max(1, Math.ceil(pts.length / maxL));
    const mn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (let i = 0; i < pts.length; i += step) {
      const d = new Date(pts[i].date);
      const lbl = range === 'year' ? mn[d.getMonth()] : `${d.getMonth() + 1}/${d.getDate()}`;
      ctx.fillText(lbl, pts[i].x, endY + 18);
    }
  }

  renderNetWorthChart() {
    const canvas = document.getElementById('networthChart');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const ctx = canvas.getContext('2d');
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = 260 * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.clearRect(0, 0, rect.width, 260);

    const allTxs = this.state.transactions.filter(t => t.status !== 'estimated')
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    const vaultTotal = this.getBalances('SAVINGS').vaults;
    if (allTxs.length === 0) {
      ctx.fillStyle = cc.textMuted; ctx.font = '14px Inter'; ctx.textAlign = 'center';
      ctx.fillText('No data', rect.width / 2, 130); return;
    }
    const range = this.chartRanges.networth || 'year';
    const latest = new Date(allTxs[allTxs.length - 1].date);
    let start = new Date(latest);
    if (range === 'week') start.setDate(start.getDate() - 7);
    else if (range === 'month') start.setMonth(start.getMonth() - 1);
    else start.setFullYear(start.getFullYear() - 1);

    const timeline = [];
    const iter = new Date(start);
    if (range === 'year') {
      iter.setDate(1);
      while (iter <= latest) { timeline.push(new Date(iter)); iter.setMonth(iter.getMonth() + 1); }
    } else {
      while (iter <= latest) { timeline.push(new Date(iter)); iter.setDate(iter.getDate() + 1); }
    }
    let curC = 0, curS = 0, idx = 0;
    while (idx < allTxs.length && new Date(allTxs[idx].date) < start) {
      const tx = allTxs[idx];
      if (tx.account === 'CHECKING') curC = tx.balance || 0;
      if (tx.account === 'SAVINGS') curS = tx.balance || 0;
      idx++;
    }
    const data = timeline.map(date => {
      while (idx < allTxs.length && new Date(allTxs[idx].date) <= date) {
        const tx = allTxs[idx];
        if (tx.account === 'CHECKING') curC = tx.balance || 0;
        if (tx.account === 'SAVINGS') curS = tx.balance || 0;
        idx++;
      }
      return { date, balance: curC + curS + vaultTotal };
    });
    const vals = data.map(d => d.balance);
    const minV = Math.min(...vals), maxV = Math.max(...vals);
    const pad = (maxV - minV) * 0.1 || 10;
    const startY = 30, endY = 220, ch = endY - startY;
    const pts = data.map((d, i) => {
      const x = 50 + (i / Math.max(1, data.length - 1)) * (rect.width - 70);
      const n = (d.balance - (minV - pad)) / ((maxV + pad) - (minV - pad));
      return { x, y: endY - n * ch, date: d.date };
    });
    ctx.strokeStyle = cc.chartGrid; ctx.fillStyle = cc.textDim;
    ctx.font = '10px JetBrains Mono'; ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const y = startY + (ch / 4) * i;
      ctx.beginPath(); ctx.moveTo(50, y); ctx.lineTo(rect.width - 20, y); ctx.stroke();
      ctx.fillText(this.fmt(maxV + pad - ((maxV + pad - (minV - pad)) / 4) * i), 45, y + 3);
    }
    ctx.beginPath(); ctx.strokeStyle = cc.accentSecondary; ctx.lineWidth = 2.5;
    pts.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
    ctx.stroke();
    const grad = ctx.createLinearGradient(0, startY, 0, endY);
    grad.addColorStop(0, cc.accentSecondary + '40'); grad.addColorStop(1, cc.accentSecondary + '00');
    ctx.lineTo(pts[pts.length - 1].x, endY); ctx.lineTo(pts[0].x, endY); ctx.closePath();
    ctx.fillStyle = grad; ctx.fill();
    ctx.fillStyle = cc.textDim; ctx.font = '10px JetBrains Mono'; ctx.textAlign = 'center';
    const maxL = Math.floor((rect.width - 70) / 60);
    const step = Math.max(1, Math.ceil(pts.length / maxL));
    const mn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (let i = 0; i < pts.length; i += step) {
      const d = new Date(pts[i].date);
      const lbl = range === 'year' ? mn[d.getMonth()] : `${d.getMonth() + 1}/${d.getDate()}`;
      ctx.fillText(lbl, pts[i].x, endY + 18);
    }
  }

  onSpendingRangeChange(val) {
  this.spendingRange = val;
  const input = document.getElementById('spendingCustomVal');
  if (input) input.style.display = val.startsWith('last_custom') ? 'block' : 'none';
  this.renderDonutChart();
}

onSpendingCustomInput(val) {
  this.spendingCustom = parseInt(val) || 1;
  this.renderDonutChart();
}

  renderDonutChart() {
  const canvas = document.getElementById('categoryDonut');
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;
  const ctx = canvas.getContext('2d');
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = 240 * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  ctx.clearRect(0, 0, rect.width, 240);

  // --- NEW DATE FILTERING LOGIC ---
  const now = new Date();
  now.setHours(23, 59, 59, 999);
  let start = new Date(now);
  let divisor = 1; // Used for averaging

  const range = this.spendingRange;
  if (range === 'week_avg') {
    start.setDate(now.getDate() - 90);
    divisor = 90 / 7; // ~12.85 weeks in 90 days
  } else if (range === 'month_avg') {
    start.setFullYear(now.getFullYear() - 1);
    divisor = 12;
  } else if (range === 'last_week') {
    start.setDate(now.getDate() - 7);
  } else if (range === 'last_month') {
    start.setDate(now.getDate() - 30);
  } else if (range === 'last_custom_days') {
    start.setDate(now.getDate() - (this.spendingCustom || 30));
  } else if (range === 'last_custom_weeks') {
    start.setDate(now.getDate() - ((this.spendingCustom || 4) * 7));
  } else if (range === 'last_custom_months') {
    start.setMonth(now.getMonth() - (this.spendingCustom || 3));
  }

  // Filter only posted, negative (spending) transactions in date range
  const txs = this.state.transactions.filter(t => {
    if (t.status === 'estimated' || parseFloat(t.amount) >= 0) return false;
    const txDate = new Date(t.date + 'T00:00:00');
    return txDate >= start && txDate <= now;
  });

  const totals = {};
  let grand = 0;
  
  txs.forEach(t => {
    const c = t.category || 'Miscellaneous';
    // Apply divisor here to get average per week/month
    const amt = Math.abs(parseFloat(t.amount) || 0) / divisor;
    totals[c] = (totals[c] || 0) + amt;
    grand += amt;
  });

  const legend = document.getElementById('categoryLegend');
  if (grand === 0) {
    ctx.fillStyle = cc.textMuted; ctx.font = '12px Inter'; ctx.textAlign = 'center';
    ctx.fillText('No spending data for this period', rect.width / 2, 120);
    if (legend) legend.innerHTML = '';
    return;
  }

  const cx = rect.width / 2, cy = 120, radius = 85;
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const threshold = grand * 0.03;
  let otherVal = 0;
  const display = [];
  
  entries.forEach(([cat, val]) => {
    if (val < threshold) otherVal += val;
    else display.push([cat, val]);
  });
  if (otherVal > 0) display.push(["Other", otherVal]);

  let startA = -Math.PI / 2;
  display.forEach(([cat, val]) => {
    const sliceA = (val / grand) * Math.PI * 2;
    const endA = startA + sliceA;
    const cfg = CATEGORY_COLORS[cat] || CATEGORY_COLORS['Other'];
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startA, endA);
    ctx.arc(cx, cy, radius - 30, endA, startA, true);
    ctx.closePath();
    ctx.fillStyle = cfg.color; ctx.fill();
    ctx.strokeStyle = cc.bgBase; ctx.lineWidth = 2; ctx.stroke();
    startA = endA;
  });

  // --- NEW LEGEND RENDER WITH % ---
  if (legend) legend.innerHTML = display.map(([cat, val]) => {
    const cfg = CATEGORY_COLORS[cat] || CATEGORY_COLORS['Other'];
    const pct = grand > 0 ? ((val / grand) * 100).toFixed(1) : '0.0';
    return `<div style="display:flex; align-items:center; gap:0.4rem; font-size:0.75rem; background:var(--bg-base); padding:0.3rem 0.5rem; border-radius:6px; border:1px solid var(--border-subtle);">
      <span style="width:8px; height:8px; border-radius:50%; background:${cfg.color}; flex-shrink:0;"></span>
      <span style="font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${cat}</span>
      <span style="color:var(--text-muted); margin-left:auto; white-space:nowrap;">
        $${val.toFixed(0)} <span style="font-size:0.65rem; color:var(--text-dim);">(${pct}%)</span>
      </span>
    </div>`;
  }).join('');
  }

  renderForecasterChart() {
    const canvas = document.getElementById('forecasterChart');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const ctx = canvas.getContext('2d');
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = 220 * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.clearRect(0, 0, rect.width, 220);

    const gv = id => parseFloat(document.getElementById(id)?.value) || 0;
    const avgInc = gv('fcAvgIncome'), avgFix = gv('fcAvgFixed'), avgVar = gv('fcAvgVariable');
    let scenSum = 0;
    (this.state.scenarios || []).forEach(s => {
      scenSum += this.computeScenarioImpact(s);
    });
    const netFull = avgInc - avgFix - avgVar + scenSum;
    const netBills = avgInc - avgFix + scenSum;
    const start = this.getBalances('CHECKING').available + this.getBalances('SAVINGS').available + this.getBalances('SAVINGS').vaults;

    const range = this.chartRanges.forecaster || 'year';
    let num = 12, stepF = netFull, stepB = netBills, lblFn = i => `M${i}`;
    if (range === 'week') { num = 7; stepF = netFull / 30.4375; stepB = netBills / 30.4375; lblFn = i => `D${i}`; }
    else if (range === 'month') { num = 30; stepF = netFull / 30.4375; stepB = netBills / 30.4375; lblFn = i => `D${i}`; }

    const dataF = [], dataB = [];
    let bf = start, bb = start;
    for (let i = 0; i <= num; i++) {
      dataF.push({ x: i, y: bf }); dataB.push({ x: i, y: bb });
      bf += stepF; bb += stepB;
    }
    const allV = [...dataF.map(d => d.y), ...dataB.map(d => d.y)];
    const minV = Math.min(...allV), maxV = Math.max(...allV);
    const pad = (maxV - minV) * 0.1 || 10;
    const startY = 30, endY = 180, ch = endY - startY;
    const getX = i => 50 + (i / num) * (rect.width - 70);
    const getY = v => endY - ((v - (minV - pad)) / ((maxV + pad) - (minV - pad))) * ch;

    ctx.strokeStyle = cc.chartGrid; ctx.fillStyle = cc.textDim;
    ctx.font = '10px JetBrains Mono'; ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const y = startY + (ch / 4) * i;
      ctx.beginPath(); ctx.moveTo(50, y); ctx.lineTo(rect.width - 20, y); ctx.stroke();
      ctx.fillText(this.fmt(maxV + pad - ((maxV + pad - (minV - pad)) / 4) * i), 45, y + 3);
    }
    ctx.textAlign = 'center';
    const st = Math.max(1, Math.ceil(num / 6));
    for (let i = 0; i <= num; i += st) ctx.fillText(lblFn(i), getX(i), endY + 18);
    ctx.beginPath(); ctx.strokeStyle = cc.accentPrimary; ctx.lineWidth = 2.5;
    dataF.forEach((d, i) => { if (i === 0) ctx.moveTo(getX(i), getY(d.y)); else ctx.lineTo(getX(i), getY(d.y)); });
    ctx.stroke();
    ctx.beginPath(); ctx.strokeStyle = cc.accentSecondary; ctx.lineWidth = 2.5;
    dataB.forEach((d, i) => { if (i === 0) ctx.moveTo(getX(i), getY(d.y)); else ctx.lineTo(getX(i), getY(d.y)); });
    ctx.stroke();
  }

  openModal(html) {
    document.getElementById('modalContainer').innerHTML = html;
  }

  closeModal() {
    document.querySelectorAll('.modal-overlay').forEach(o => o.classList.remove('active'));
  }

  /* ============================================================
     RULES MODAL — priority + exclude UI
     ============================================================ */
  openRulesModal() {
    const rules = this.state.customRules || [];
    const editingIndex = this.editingRuleIndex;
    const editRule = (editingIndex != null && rules[editingIndex]) ? rules[editingIndex] : null;
    this.editingRuleIndex = null;

    const catOpts = `<option value="">-- Leave Category Unchanged --</option>` +
      CATEGORIES.map(c => `<option value="${c}" ${editRule?.category === c ? 'selected' : ''}>${c}</option>`).join('');
    const matchLabels = { contains: 'Contains', exact: 'Exact', begins: 'Begins With', ends: 'Ends With' };
    const matchType = editRule?.matchType || 'contains';

    const ruleRow = (r, i) => `
      <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-base); padding:0.5rem 0.75rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); margin-bottom:0.5rem; gap:0.5rem;">
        <div style="display:flex; align-items:flex-start; gap:0.5rem; min-width:0; flex:1;">
          <span class="mono" style="font-size:0.7rem; color:var(--text-muted); background:var(--bg-elevated); padding:2px 6px; border-radius:4px; flex-shrink:0;">#${i + 1}</span>
          <div style="min-width:0;">
            <span class="badge badge-posted" style="font-size:0.6rem;">${matchLabels[r.matchType] || 'Contains'}</span>
            <strong style="font-family:var(--font-mono); font-size:0.8rem;">${this.escapeHtml(r.searchPattern)}</strong>
            ${r.doesNotContain ? `<span class="badge" style="background:rgba(255,61,113,0.15); color:var(--accent-negative); border:1px solid rgba(255,61,113,0.4); margin-left:4px; font-size:0.6rem;">≠ ${this.escapeHtml(r.doesNotContain)}</span>` : ''}
            ${r.nickname ? ` → <span style="color:var(--accent-primary); font-weight:600;">"${this.escapeHtml(r.nickname)}"</span>` : ''}
            ${r.category ? ` <span class="badge badge-posted" style="margin-left:4px;">${this.escapeHtml(r.category)}</span>` : ''}
          </div>
        </div>
        <div style="display:flex; gap:2px; flex-shrink:0;">
          <button class="btn btn-sm" data-action="moveRuleUp" data-index="${i}" ${i === 0 ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''} title="Move up (higher priority)">↑</button>
          <button class="btn btn-sm" data-action="moveRuleDown" data-index="${i}" ${i === rules.length - 1 ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''} title="Move down (lower priority)">↓</button>
          <button class="btn btn-sm" data-action="editRule" data-index="${i}" title="Edit rule">✏️</button>
          <button class="btn btn-sm btn-danger" data-action="deleteRule" data-index="${i}" title="Delete rule">🗑️</button>
        </div>
      </div>
    `;

    this.openModal(`
      <div class="modal-overlay active">
        <div class="modal modal-lg">
          <div class="modal-header">
            <h2 class="modal-title">⚙ Active Rules</h2>
            <button class="modal-close" data-action="closeModal" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">
            <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:1rem; padding:0.6rem 0.85rem; background:rgba(0,229,255,0.05); border:1px solid rgba(0,229,255,0.2); border-radius:var(--radius-sm); line-height:1.5;">
              <strong style="color:var(--accent-primary);">Priority order — first match wins.</strong>
              Rules are checked top-to-bottom. Use <strong>↑ / ↓</strong> to reorder.
              Use <strong>Does Not Contain</strong> to skip a rule when the description has an unwanted phrase
              (e.g. "Contains DONUT, Does Not Contain ROUNDUP").
            </div>

            <div style="background:var(--bg-base); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-glow); margin-bottom:1.5rem;">
              <div style="font-weight:600; font-size:0.85rem; color:var(--accent-primary); margin-bottom:0.75rem;">${editRule ? '✏️ EDIT RULE' : '+ ADD NEW RULE'}</div>
              <input type="hidden" id="editingRuleIndex" value="${editingIndex != null ? editingIndex : ''}">
              <div class="form-grid-2 form-field">
                <div><label class="stat-label">Search Text</label><input type="text" id="newRuleSearch" value="${editRule ? this.escapeHtml(editRule.searchPattern) : ''}" placeholder="e.g. DONUT"></div>
                <div>
                  <label class="stat-label">Match Type</label>
                  <select id="newRuleMatchType">
                    ${['contains', 'exact', 'begins', 'ends'].map(v =>
      `<option value="${v}" ${matchType === v ? 'selected' : ''}>${matchLabels[v]}</option>`
    ).join('')}
                  </select>
                </div>
              </div>
              <div class="form-field">
                <label class="stat-label">Does Not Contain (Optional)</label>
                <input type="text" id="newRuleExclude" value="${editRule ? this.escapeHtml(editRule.doesNotContain || '') : ''}" placeholder="e.g. ROUNDUP — blocks this rule if the description contains this phrase">
                <div class="field-hint">
                  Skip this rule whenever the description (or nickname) contains this phrase.
                </div>
              </div>
              <div class="form-grid-2 form-field">
                <div><label class="stat-label">Nickname (Optional)</label><input type="text" id="newRuleNickname" value="${editRule ? this.escapeHtml(editRule.nickname || '') : ''}"></div>
                <div><label class="stat-label">Category (Optional)</label><select id="newRuleCategory">${catOpts}</select></div>
              </div>
              <div style="display:flex; justify-content:flex-end; gap:0.5rem;">
                ${editRule ? `<button class="btn btn-sm" data-action="cancelRuleEdit">Cancel</button>` : ''}
                <button class="btn btn-primary btn-sm" data-action="addNewRule">${editRule ? 'Update Rule' : 'Add Rule'}</button>
              </div>
            </div>

            <div>
              <h3 style="font-size:0.9rem; font-weight:600; color:var(--accent-primary); margin-bottom:0.5rem;">
                Saved Rules
                <span style="font-size:0.7rem; font-weight:400; color:var(--text-muted);">(priority order — first match wins)</span>
              </h3>
              ${rules.length === 0
        ? '<div style="color:var(--text-muted); font-size:0.85rem;">No custom rules yet.</div>'
        : rules.map(ruleRow).join('')}
            </div>
          </div>
        </div>
      </div>`);
  }

  addNewRule() {
    const pattern = document.getElementById('newRuleSearch').value.trim();
    const matchType = document.getElementById('newRuleMatchType')?.value || 'contains';
    const doesNotContain = (document.getElementById('newRuleExclude')?.value || '').trim();
    const nickname = document.getElementById('newRuleNickname').value.trim();
    const category = document.getElementById('newRuleCategory').value;
    const editingIndexRaw = document.getElementById('editingRuleIndex')?.value;
    const editingIndex = editingIndexRaw !== '' ? parseInt(editingIndexRaw) : null;

    if (!pattern) { alert('Enter a search phrase.'); return; }
    if (!nickname && !category) { alert('Enter a nickname or category.'); return; }

    if (!this.state.customRules) this.state.customRules = [];

    if (editingIndex != null && this.state.customRules[editingIndex]) {
      const r = this.state.customRules[editingIndex];
      r.searchPattern = pattern;
      r.matchType = matchType;
      r.doesNotContain = doesNotContain;
      r.nickname = nickname;
      r.category = category;
    } else {
      this.state.customRules = this.state.customRules.filter(
        r => !(r.searchPattern.toLowerCase() === pattern.toLowerCase() &&
          (r.matchType || 'contains') === matchType)
      );
      this.state.customRules.push({ searchPattern: pattern, nickname, category, matchType, doesNotContain });
    }

    this.applyCustomRules();
    this.saveState();
    this.openRulesModal();
    this.showToast(editingIndex != null ? 'Rule updated' : 'Rule saved');
    this.renderTabContent(this.currentTab);
  }

  editRule(btn) {
    this.editingRuleIndex = parseInt(btn.dataset.index);
    this.openRulesModal();
  }

  cancelRuleEdit() {
    this.editingRuleIndex = null;
    this.openRulesModal();
  }

  deleteRule(btn) {
    const i = parseInt(btn.dataset.index);
    const rules = this.state.customRules || [];
    if (isNaN(i) || !rules[i]) return;
    
    const deletedRule = rules[i];
    rules.splice(i, 1);
    
    this.applyCustomRules();
    this.saveState();
    this.editingRuleIndex = null;
    this.openRulesModal();
    this.renderTabContent(this.currentTab);
    
    this.showToast('Rule deleted', {
      actionLabel: 'Undo',
      onAction: () => {
        this.state.customRules.splice(i, 0, deletedRule);
        this.applyCustomRules();
        this.saveState();
        if (this._settingsScreen === 'rules') this.openRulesModal();
        this.renderTabContent(this.currentTab);
      }
    });
  }

  moveRuleUp(btn) {
    const i = parseInt(btn.dataset.index);
    const rules = this.state.customRules;
    if (isNaN(i) || i <= 0 || !rules || !rules[i]) return;
    [rules[i - 1], rules[i]] = [rules[i], rules[i - 1]];
    this.saveState();
    this.openRulesModal();
    this.renderTabContent(this.currentTab);
  }

  moveRuleDown(btn) {
    const i = parseInt(btn.dataset.index);
    const rules = this.state.customRules;
    if (isNaN(i) || !rules || i >= rules.length - 1) return;
    [rules[i + 1], rules[i]] = [rules[i], rules[i + 1]];
    this.saveState();
    this.openRulesModal();
    this.renderTabContent(this.currentTab);
  }

  /* Fix #8: normalize dates from various bank formats */
  normalizeDateToISO(s) {
    if (!s) return '';
    let str = String(s).trim().replace(/"/g, '');
    if (/^\d{4}-\d{2}-\d{2}/.test(str)) return str.slice(0, 10);
    let m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (m) return `${m[3]}-${m[1].padStart(2, '0')}-${m[2].padStart(2, '0')}`;
    m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
    if (m) {
      const yy = parseInt(m[3]);
      const year = yy >= 70 ? 1900 + yy : 2000 + yy;
      return `${year}-${m[1].padStart(2, '0')}-${m[2].padStart(2, '0')}`;
    }
    const d = new Date(str);
    if (!isNaN(d.getTime())) {
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }
    return str;
  }

  openImportWizard(btn) {
    this.stagedFiles = [];
    this.openModal(`
      <div class="modal-overlay active">
        <div class="modal modal-md">
          <div class="modal-header">
            <h2 class="modal-title">Import Bank CSV</h2>
            <button class="modal-close" data-action="closeModal" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">
            <div style="border:2px dashed var(--border-glow); padding:2rem; text-align:center; border-radius:var(--radius-md); cursor:pointer; transition: var(--transition);" data-action="triggerCsvUpload">
              <p style="font-weight:600;">Click to browse CSV files</p>
              <p style="font-size:0.75rem; color:var(--text-dim); margin-top:0.5rem;">Standard and SOFI formats supported.</p>
            </div>
            <input type="file" id="csvInput" multiple accept=".csv" style="display:none">
            <div style="margin-top:1rem; background:var(--bg-base); padding:0.85rem 1rem; border-radius:var(--radius-sm); font-size:0.8rem; color:var(--text-muted); line-height:1.5;">
              <strong style="color:var(--text-main);">🤖 Smart Import:</strong> The app will automatically route files to Checking or Savings based on the filename (e.g., <em>"checking.csv"</em> or <em>"savings.csv"</em>).
            </div>
            <div id="importPreview" style="margin-top:1rem;"></div>
          </div>
          <div class="modal-footer">
            <button class="btn" data-action="closeModal">Cancel</button>
            <button class="btn btn-primary" id="commitImportBtn" data-action="commitImport" disabled>Commit</button>
          </div>
        </div>
      </div>`);
    document.getElementById('csvInput').addEventListener('change', (e) => this.handleCSVSelect(e));
  }

  triggerCsvUpload() {
    document.getElementById('csvInput')?.click();
  }

  handleCSVSelect(evt) {
    const files = Array.from(evt.target.files);
    if (files.length) {
      this.stagedFiles = files;
      const prev = document.getElementById('importPreview');
      if (prev) prev.innerText = `${files.length} file(s) ready`;
      const btn = document.getElementById('commitImportBtn');
      if (btn) btn.disabled = false;
    }
  }

  commitImport() {
    if (!this.stagedFiles.length) return;
    let count = 0, pending = this.stagedFiles.length;

    this.stagedFiles.forEach(file => {
      const fileName = file.name.toLowerCase();
      let target = 'CHECKING';
      if (fileName.includes('saving')) target = 'SAVINGS';

      const reader = new FileReader();
      reader.onload = (e) => {
        const lines = e.target.result.split('\n');

        lines.forEach((line, idx) => {
          if (idx === 0 || !line.trim()) return;

          const parts = [];
          let current = '';
          let inQuotes = false;
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') inQuotes = !inQuotes;
            else if (char === ',' && !inQuotes) { parts.push(current); current = ''; }
            else current += char;
          }
          parts.push(current);

          if (parts.length >= 3) {
            const date = this.normalizeDateToISO(parts[0]);
            let desc = parts[1].replace(/"/g, '').trim();
            let amt = NaN;
            let bal = 0;

            let testAmt = parseFloat(parts[2].replace(/"/g, '').trim());

            if (!isNaN(testAmt)) {
              amt = testAmt;
              if (parts.length >= 4) bal = parseFloat(parts[3].replace(/"/g, '').trim()) || 0;
            }
            else if (parts.length >= 4) {
              amt = parseFloat(parts[3].replace(/"/g, '').trim());
              if (parts.length >= 5) bal = parseFloat(parts[4].replace(/"/g, '').trim()) || 0;
            }

            if (!isNaN(amt) && date) {
              const exists = this.state.transactions.some(t =>
                t.account === target &&
                t.date === date &&
                Math.abs(t.amount - amt) < 0.01 &&
                t.description === desc
              );
              if (exists) return;

              if (desc.toUpperCase().startsWith('SPOTIFY')) desc = 'Spotify';

              // Priority-aware rule lookup (respects doesNotContain + first-match-wins)
              let cat = 'Miscellaneous', flow = 'Flexible Spending', nick = null;
              const rule = this._findMatchingRule(desc, null);
              if (rule) {
                if (rule.nickname) nick = rule.nickname;
                if (rule.category) cat = rule.category;
              }

              // Built-in fallback only if no custom category was assigned
              if (cat === 'Miscellaneous') {
                const fallback = CATEGORY_RULES.find(r => desc.toUpperCase().includes(r.contains));
                if (fallback) cat = fallback.category;
              }
              flow = CATEGORY_FLOW_MAP[cat] || flow;

              this.state.transactions.push({
                id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
                account: target, date, description: desc,
                nickname: nick,
                category: cat, flow, amount: amt, balance: bal, status: 'POSTED'
              });
              count++;
            }
          }
        });

        pending--;
        if (pending === 0) {
          this.recalculateBalances();
          this.applyCustomRules();
          this.saveState();
          this.closeModal();
          this.showToast(`Imported ${count} new transactions`);
          this.renderTabContent(this.currentTab);
        }
      };
      reader.readAsText(file);
    });
  }

  openAddPendingModal() {
    this.openModal(`
      <div class="modal-overlay active">
        <div class="modal modal-md">
          <div class="modal-header">
            <h2 class="modal-title">Add Pending Item</h2>
            <button class="modal-close" data-action="closeModal" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-field">
              <label class="stat-label">Account</label>
              <select id="pendingAccount">
                <option value="CHECKING">Checking</option>
                <option value="SAVINGS">Savings</option>
              </select>
            </div>
            <div class="form-field">
              <label class="stat-label">Date</label>
              <input type="date" id="pendingDate" value="${new Date().toISOString().split('T')[0]}">
            </div>
            <div class="form-field">
              <label class="stat-label">Description</label>
              <input type="text" id="pendingDesc">
            </div>
            <div class="form-field">
              <label class="stat-label">Amount ($)</label>
              <input type="number" step="0.01" id="pendingAmount">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn" data-action="closeModal">Cancel</button>
            <button class="btn btn-primary" data-action="savePendingItem">Save</button>
          </div>
        </div>
      </div>`);
  }

  savePendingItem() {
    const acc = document.getElementById('pendingAccount').value;
    const date = document.getElementById('pendingDate').value;
    const desc = document.getElementById('pendingDesc').value;
    const amt = parseFloat(document.getElementById('pendingAmount').value);
    if (!desc || isNaN(amt)) return;
    this.state.pendingItems.push({
      id: `p_${Date.now()}`, account: acc, date, description: desc,
      nickname: this.getMatchingNickname(desc), amount: amt, status: 'pending'
    });
    this.saveState();
    this.closeModal();
    this.renderTabContent(this.currentTab);
    this.showToast('Pending item added');
  }

  openVaultModal() {
    this.openModal(`
      <div class="modal-overlay active">
        <div class="modal modal-sm">
          <div class="modal-header">
            <h2 class="modal-title">Create New Vault</h2>
            <button class="modal-close" data-action="closeModal" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-field">
              <label class="stat-label">Vault Name</label>
              <input type="text" id="vaultName">
            </div>
            <div class="form-field">
              <label class="stat-label">Initial Balance ($)</label>
              <input type="number" step="0.01" id="vaultInitialBalance" value="0">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn" data-action="closeModal">Cancel</button>
            <button class="btn btn-primary" data-action="saveVault">Create Vault</button>
          </div>
        </div>
      </div>`);
  }

  saveVault() {
    const name = document.getElementById('vaultName').value.trim();
    const bal = Math.max(0, parseFloat(document.getElementById('vaultInitialBalance').value) || 0);
    if (!name) return;
    this.state.vaults.push({ id: `v_${Date.now()}`, name, balance: bal, startingBalance: bal });
    this.saveState();
    this.closeModal();
    this.renderTabContent(this.currentTab);
    this.showToast(`Vault "${name}" created`);
  }

  openVaultTransferModal(btn) {
    const vaultId = btn.dataset.vaultId;
    const vault = this.state.vaults.find(v => v.id === vaultId);
    if (!vault) return;
    this.openModal(`
      <div class="modal-overlay active">
        <div class="modal modal-sm">
          <div class="modal-header">
            <h2 class="modal-title">Transfer to ${this.escapeHtml(vault.name)}</h2>
            <button class="modal-close" data-action="closeModal" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="transferVaultId" value="${vaultId}">
            <div class="form-field">
              <label class="stat-label">From Account</label>
              <select id="transferFromAccount">
                <option value="CHECKING">Checking</option>
                <option value="SAVINGS">Savings</option>
              </select>
            </div>
            <div class="form-field">
              <label class="stat-label">Amount ($)</label>
              <input type="number" step="0.01" id="transferAmount">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn" data-action="closeModal">Cancel</button>
            <button class="btn btn-primary" data-action="saveVaultTransfer">Confirm</button>
          </div>
        </div>
      </div>`);
  }

  saveVaultTransfer() {
    const vaultId = document.getElementById('transferVaultId').value;
    const from = document.getElementById('transferFromAccount').value;
    const amount = parseFloat(document.getElementById('transferAmount').value);
    if (isNaN(amount) || amount <= 0) { alert('Enter valid amount'); return; }
    const vault = this.state.vaults.find(v => v.id === vaultId);
    if (!vault) return;
    if (this.getBalances(from).available < amount) { alert('Insufficient funds'); return; }
    this.state.transactions.push({
      id: `tx_${Date.now()}_out`, account: from,
      date: new Date().toISOString().split('T')[0],
      description: `Transfer to Vault: ${vault.name}`,
      category: 'Transfers', flow: 'Internal Transfer',
      amount: -amount, balance: 0, status: 'POSTED'
    });
    this.recalculateBalances();
    this.saveState();
    this.closeModal();
    this.renderTabContent(this.currentTab);
    this.showToast(`Transferred $${amount.toFixed(2)}`);
  }

  openEditVaultModal(btn) {
    const vault = this.state.vaults.find(v => v.id === btn.dataset.vaultId);
    if (!vault) return;
    this.openModal(`
      <div class="modal-overlay active">
        <div class="modal modal-sm">
          <div class="modal-header">
            <h2 class="modal-title">Edit Vault</h2>
            <button class="modal-close" data-action="closeModal" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="editVaultId" value="${vault.id}">
            <div class="form-field">
              <label class="stat-label">Name</label>
              <input type="text" id="editVaultName" value="${this.escapeHtml(vault.name)}">
            </div>
            <div class="form-field">
              <label class="stat-label">Balance ($)</label>
              <input type="number" step="0.01" id="editVaultBalance" value="${(parseFloat(vault.balance) || 0).toFixed(2)}">
            </div>
          </div>
          <div class="modal-footer spread">
            <div class="left-actions">
              <button class="btn btn-danger btn-sm" data-action="deleteVault">Delete</button>
            </div>
            <div class="right-actions">
              <button class="btn" data-action="closeModal">Cancel</button>
              <button class="btn btn-primary" data-action="saveEditedVault">Save</button>
            </div>
          </div>
        </div>
      </div>`);
  }

  saveEditedVault() {
    const id = document.getElementById('editVaultId').value;
    const name = document.getElementById('editVaultName').value.trim();
    const bal = Math.max(0, parseFloat(document.getElementById('editVaultBalance').value) || 0);
    const v = this.state.vaults.find(x => x.id === id);

    if (v) {
      const oldName = v.name;
      if (name !== oldName) {
        const oldNorm = (oldName || '').toLowerCase();
        const hasHistory = this.state.transactions.some(t =>
          t.status !== 'estimated' &&
          t.description &&
          t.description.toLowerCase().includes(oldNorm) &&
          /vault/i.test(t.description)
        );
        if (hasHistory && !confirm(
          `Rename vault from "${oldName}" to "${name}"?\n\n` +
          `Historical "Transfer to/from Vault: ${oldName}" transactions will no longer count toward this vault's balance. ` +
          `The balance you entered above will be preserved as the new baseline.`
        )) return;
      }

      let txSum = 0;
      const norm = (s) => (s || '').replace(/[^a-z0-9]/gi, '').toLowerCase();
      const vNorm = norm(name);

      this.state.transactions.filter(t => t.status !== 'estimated').forEach(t => {
        const desc = t.description || '';
        let matchedName = null;
        let amt = 0;
        const match = desc.match(/^(To|From)\s+(.+?)\s+Vault/i);
        if (match) {
          matchedName = match[2].trim();
          amt = match[1].toUpperCase() === 'TO' ? Math.abs(t.amount) : -Math.abs(t.amount);
        } else if (desc.startsWith('Transfer to Vault: ')) {
          matchedName = desc.replace('Transfer to Vault: ', '').trim();
          amt = Math.abs(t.amount);
        } else if (desc.startsWith('Transfer from Vault: ')) {
          matchedName = desc.replace('Transfer from Vault: ', '').trim();
          amt = -Math.abs(t.amount);
        }

        if (matchedName && norm(matchedName) === vNorm) {
          txSum += amt;
        }
      });

      v.startingBalance = bal - txSum;
      v.name = name;
      v.balance = bal;
    }
    this.saveState();
    this.closeModal();
    this.renderTabContent(this.currentTab);
  }

  deleteVault() {
    const id = document.getElementById('editVaultId').value;
    const vault = this.state.vaults.find(v => v.id === id);
    if (!vault) return;
    if (!confirm('Delete this vault?')) return;
    
    this.state.vaults = this.state.vaults.filter(v => v.id !== id);
    this.saveState();
    this.closeModal();
    this.renderTabContent(this.currentTab);
    
    this.showToast(`Vault "${vault.name}" deleted`, {
      actionLabel: 'Undo',
      onAction: () => {
        this.state.vaults.push(vault);
        this.saveState();
        this.renderTabContent(this.currentTab);
      }
    });
  }

  openMassEditModal() {
    const catOpts = `<option value="">-- Leave Unchanged --</option>` +
      CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('');
    this.openModal(`
      <div class="modal-overlay active">
        <div class="modal modal-md">
          <div class="modal-header">
            <h2 class="modal-title">Mass Edit</h2>
            <button class="modal-close" data-action="closeModal" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-field">
              <label class="stat-label">Search Text</label>
              <input type="text" id="massSearch" placeholder="e.g. WALMART or WAL-MART">
            </div>
            <div class="form-field">
              <label class="stat-label">Match Type</label>
              <select id="massMatchType">
                <option value="contains">Contains (partial match)</option>
                <option value="exact">Exact Match (must be identical)</option>
                <option value="begins">Begins With</option>
                <option value="ends">Ends With</option>
              </select>
              <div class="field-hint">Matches against <strong>both</strong> the raw bank description and the nickname.</div>
            </div>
            <div class="form-field">
              <label class="stat-label">Assign Nickname</label>
              <input type="text" id="massNickname">
            </div>
            <div class="form-field">
              <label class="stat-label">Set Category</label>
              <select id="massCategory">${catOpts}</select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn" data-action="closeModal">Cancel</button>
            <button class="btn btn-primary" data-action="applyMassEdit">Apply</button>
          </div>
        </div>
      </div>`);
  }

  applyMassEdit() {
    const q = document.getElementById('massSearch').value.trim().toLowerCase();
    const matchType = document.getElementById('massMatchType').value;
    const nick = document.getElementById('massNickname').value.trim();
    const cat = document.getElementById('massCategory').value;
    if (!q) { alert('Enter search phrase'); return; }

    const matches = (text) => {
      if (!text) return false;
      const t = text.toLowerCase();
      if (matchType === 'exact') return t === q;
      if (matchType === 'begins') return t.startsWith(q);
      if (matchType === 'ends') return t.endsWith(q);
      return t.includes(q);
    };

    let count = 0;
    this.state.transactions.forEach(t => {
      if (matches(t.description) || matches(t.nickname)) {
        if (nick) t.nickname = nick;
        if (cat) { t.category = cat; t.locked = true; }
        count++;
      }
    });
    this.saveState();
    this.closeModal();
    this.renderTabContent(this.currentTab);
    this.showToast(`Updated ${count} transactions`);
  }

  openAddScenarioModal() {
    const typeOpts = `
      <option value="custom">Custom — freeform monthly amount</option>
      <option value="paycheck">Paycheck — adjust a recurring income</option>
      <option value="bill">Bill — adjust a recurring bill</option>
      <option value="loan">Loan — add/modify a debt payment</option>
      <option value="recurring">Recurring — add a new recurring item</option>
    `;
    this.openModal(`
      <div class="modal-overlay active">
        <div class="modal modal-md">
          <div class="modal-header">
            <h2 class="modal-title">+ Add Scenario</h2>
            <button class="modal-close" data-action="closeModal" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-field">
              <label class="stat-label">Scenario Type</label>
              <select id="scenarioTypeInput" onchange="app.onScenarioTypeChange()">${typeOpts}</select>
            </div>
            <div class="form-field">
              <label class="stat-label">Name</label>
              <input type="text" id="scenarioNameInput" placeholder="e.g. Raise, Cancel Netflix, New car">
            </div>
            <div id="scenarioTypeFields"></div>
          </div>
          <div class="modal-footer">
            <button class="btn" data-action="closeModal">Cancel</button>
            <button class="btn btn-primary" data-action="saveScenario">Save</button>
          </div>
        </div>
      </div>`);
    this.onScenarioTypeChange();
  }

  onScenarioTypeChange() {
    const type = document.getElementById('scenarioTypeInput')?.value || 'custom';
    const el = document.getElementById('scenarioTypeFields');
    if (!el) return;

    if (type === 'custom' || type === 'recurring') {
      el.innerHTML = `
        <label class="stat-label">Monthly Impact ($) — positive for income, negative for expense</label>
        <input type="number" step="0.01" id="scenarioAmountInput" value="0">
        <div style="font-size:0.7rem; color:var(--text-dim); margin-top:0.4rem;">
          ${type === 'recurring' ? 'Adds a new recurring line to the projection.' : 'Freely adds or subtracts from monthly net.'}
        </div>`;
      return;
    }

    if (type === 'paycheck') {
      const groups = this.getRecurringGroups(['Income']);
      if (!groups.length) {
        el.innerHTML = `<div style="color:var(--text-muted); font-size:0.85rem; padding:0.5rem 0;">
          No recurring income items found. Add one on the Calendar tab first.
        </div>`;
        return;
      }
      el.innerHTML = `
        <div>
          <label class="stat-label">Recurring Income</label>
          <select id="scenarioGroupInput">
            ${groups.map(g => `<option value="${g.groupId}">${this.escapeHtml(g.description)} — $${Math.abs(g.amount).toFixed(2)}</option>`).join('')}
          </select>
        </div>
        <div style="margin-top:0.5rem;">
          <label class="stat-label">New Amount ($)</label>
          <input type="number" step="0.01" id="scenarioNewAmountInput" value="${Math.abs(groups[0].amount).toFixed(2)}">
        </div>
        <div style="font-size:0.7rem; color:var(--text-dim); margin-top:0.4rem;">
          The projection will use the new amount instead of the original for this income.
        </div>`;
      return;
    }

    if (type === 'bill') {
      const groups = this.getRecurringGroups(['Bills and Utilities', 'Subscriptions']);
      if (!groups.length) {
        el.innerHTML = `<div style="color:var(--text-muted); font-size:0.85rem; padding:0.5rem 0;">
          No recurring bills found. Add one on the Calendar tab first.
        </div>`;
        return;
      }
      el.innerHTML = `
        <div>
          <label class="stat-label">Recurring Bill</label>
          <select id="scenarioGroupInput">
            ${groups.map(g => `<option value="${g.groupId}">${this.escapeHtml(g.description)} — $${Math.abs(g.amount).toFixed(2)} (${this.escapeHtml(g.category)})</option>`).join('')}
          </select>
        </div>
        <div style="margin-top:0.5rem;">
          <label class="stat-label">New Amount ($)</label>
          <input type="number" step="0.01" id="scenarioNewAmountInput" value="${Math.abs(groups[0].amount).toFixed(2)}">
        </div>
        <div style="font-size:0.7rem; color:var(--text-dim); margin-top:0.4rem;">
          Only the projection changes — the original bill on the Calendar stays the same.
        </div>`;
      return;
    }

    if (type === 'loan') {
      const loans = this.state.loans || [];
      if (!loans.length) {
        el.innerHTML = `<div style="color:var(--text-muted); font-size:0.85rem; padding:0.5rem 0;">
          No loans found. Add one on the Debts tab first.
        </div>`;
        return;
      }
      const l = loans[0];
      const term = l.term || l.termYears || 30;
      const termUnit = l.termUnit || 'years';
      el.innerHTML = `
        <div>
          <label class="stat-label">Loan</label>
          <select id="scenarioLoanInput" onchange="app.onScenarioLoanChange()">
            ${loans.map(x => `<option value="${x.id}">${this.escapeHtml(x.name)} — $${(parseFloat(x.balance) || 0).toFixed(2)}</option>`).join('')}
          </select>
        </div>
        <div style="margin-top:0.5rem;">
          <label class="stat-label">Balance ($)</label>
          <input type="number" step="0.01" id="scenarioLoanBalance" value="${(parseFloat(l.balance) || 0).toFixed(2)}">
        </div>
        <div style="display:grid; grid-template-columns:2fr 1fr; gap:0.5rem; margin-top:0.5rem;">
          <div>
            <label class="stat-label">Term</label>
            <input type="number" id="scenarioLoanTerm" value="${term}">
          </div>
          <div>
            <label class="stat-label">Unit</label>
            <select id="scenarioLoanTermUnit">
              <option value="years" ${termUnit === 'years' ? 'selected' : ''}>Years</option>
              <option value="months" ${termUnit === 'months' ? 'selected' : ''}>Months</option>
            </select>
          </div>
        </div>
        <div style="margin-top:0.5rem;">
          <label class="stat-label">Rate (%)</label>
          <input type="number" step="0.01" id="scenarioLoanRate" value="${l.rate}">
        </div>
        <div style="font-size:0.7rem; color:var(--text-dim); margin-top:0.4rem;">
          The monthly principal &amp; interest payment is subtracted as an expense in the projection.
        </div>`;
      return;
    }
  }

  onScenarioLoanChange() {
    const id = document.getElementById('scenarioLoanInput')?.value;
    const l = (this.state.loans || []).find(x => x.id === id);
    if (!l) return;
    const balEl = document.getElementById('scenarioLoanBalance');
    const rateEl = document.getElementById('scenarioLoanRate');
    const termEl = document.getElementById('scenarioLoanTerm');
    const termUnitEl = document.getElementById('scenarioLoanTermUnit');

    if (balEl) balEl.value = (parseFloat(l.balance) || 0).toFixed(2);
    if (rateEl) rateEl.value = l.rate;
    if (termEl) termEl.value = l.term || l.termYears || 30;
    if (termUnitEl) termUnitEl.value = l.termUnit || 'years';
  }

  saveScenario() {
    const type = document.getElementById('scenarioTypeInput').value;
    const rawName = document.getElementById('scenarioNameInput').value.trim();
    const scenario = {
      id: `sc_${Date.now()}`,
      type,
      name: rawName || 'Unnamed Scenario',
      active: true,
      amount: 0,
      groupId: null,
      loanId: null,
      loanOverrides: null
    };

    if (type === 'custom' || type === 'recurring') {
      const amt = parseFloat(document.getElementById('scenarioAmountInput')?.value);
      if (isNaN(amt)) { alert('Enter a valid amount.'); return; }
      scenario.amount = amt;
      if (!rawName) scenario.name = type === 'recurring' ? 'New recurring item' : 'Custom scenario';
    } else if (type === 'paycheck' || type === 'bill') {
      const groupId = document.getElementById('scenarioGroupInput')?.value;
      if (!groupId) { alert('Select a recurring item.'); return; }
      const amt = parseFloat(document.getElementById('scenarioNewAmountInput')?.value);
      if (isNaN(amt)) { alert('Enter a new amount.'); return; }
      const info = this.getRecurringGroupInfo(groupId);
      scenario.groupId = groupId;
      scenario.amount = Math.abs(amt);
      if (!rawName) {
        scenario.name = `${type === 'paycheck' ? 'Paycheck' : 'Bill'}: ${info ? info.description : 'adjustment'}`;
      }
    } else if (type === 'loan') {
      const loanId = document.getElementById('scenarioLoanInput')?.value;
      if (!loanId) { alert('Select a loan.'); return; }
      const loan = (this.state.loans || []).find(l => l.id === loanId);
      scenario.loanId = loanId;
      scenario.loanOverrides = {
        balance: parseFloat(document.getElementById('scenarioLoanBalance').value) || 0,
        rate: parseFloat(document.getElementById('scenarioLoanRate').value) || 0,
        term: parseFloat(document.getElementById('scenarioLoanTerm').value) || 30,
        termUnit: document.getElementById('scenarioLoanTermUnit').value
      };
      const months = scenario.loanOverrides.termUnit === 'years' ? scenario.loanOverrides.term * 12 : scenario.loanOverrides.term;
      const pi = this.calculatePI(scenario.loanOverrides.balance, scenario.loanOverrides.rate, months);
      scenario.amount = -pi;
      if (!rawName) scenario.name = `Loan: ${loan ? loan.name : 'Hypothetical'}`;
    }

    this.state.scenarios.push(scenario);
    this.saveState();
    this.closeModal();
    this.renderForecaster();
    this.showToast('Scenario added');
  }

  openEditScenarioModal(btn) {
    const s = this.state.scenarios.find(x => x.id === btn.dataset.scenarioId);
    if (!s) return;
    const type = s.type || 'custom';
    const typeOpts = `
      <option value="custom" ${type === 'custom' ? 'selected' : ''}>Custom — freeform monthly amount</option>
      <option value="paycheck" ${type === 'paycheck' ? 'selected' : ''}>Paycheck — adjust a recurring income</option>
      <option value="bill" ${type === 'bill' ? 'selected' : ''}>Bill — adjust a recurring bill</option>
      <option value="loan" ${type === 'loan' ? 'selected' : ''}>Loan — add/modify a debt payment</option>
      <option value="recurring" ${type === 'recurring' ? 'selected' : ''}>Recurring — add a new recurring item</option>
    `;
    this.openModal(`
      <div class="modal-overlay active">
        <div class="modal modal-md">
          <div class="modal-header">
            <h2 class="modal-title">Edit Scenario</h2>
            <button class="modal-close" data-action="closeModal" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="editScenarioId" value="${s.id}">
            <div class="form-field">
              <label class="stat-label">Scenario Type</label>
              <select id="scenarioTypeInput" onchange="app.onScenarioTypeChange()">${typeOpts}</select>
            </div>
            <div class="form-field">
              <label class="stat-label">Name</label>
              <input type="text" id="scenarioNameInput" value="${this.escapeHtml(s.name)}">
            </div>
            <div id="scenarioTypeFields"></div>
          </div>
          <div class="modal-footer spread">
            <div class="left-actions">
              <button class="btn btn-danger btn-sm" data-action="deleteScenario">Delete</button>
            </div>
            <div class="right-actions">
              <button class="btn" data-action="closeModal">Cancel</button>
              <button class="btn btn-primary" data-action="saveEditedScenario">Save</button>
            </div>
          </div>
        </div>
      </div>`);
    this.onScenarioTypeChange();
    setTimeout(() => this.prefillScenarioEdit(s), 0);
  }

  prefillScenarioEdit(s) {
    const type = s.type || 'custom';
    if (type === 'custom' || type === 'recurring') {
      const el = document.getElementById('scenarioAmountInput');
      if (el) el.value = (parseFloat(s.amount) || 0).toFixed(2);
      return;
    }
    if (type === 'paycheck' || type === 'bill') {
      const sel = document.getElementById('scenarioGroupInput');
      if (sel && s.groupId) sel.value = s.groupId;
      const amtEl = document.getElementById('scenarioNewAmountInput');
      if (amtEl) amtEl.value = Math.abs(parseFloat(s.amount) || 0).toFixed(2);
      return;
    }
    if (type === 'loan') {
      const sel = document.getElementById('scenarioLoanInput');
      if (sel && s.loanId) {
        sel.value = s.loanId;
        this.onScenarioLoanChange();
      }
      const ov = s.loanOverrides || {};
      if (ov.balance != null) {
        const el = document.getElementById('scenarioLoanBalance');
        if (el) el.value = parseFloat(ov.balance).toFixed(2);
      }
      if (ov.rate != null) {
        const el = document.getElementById('scenarioLoanRate');
        if (el) el.value = ov.rate;
      }
      if (ov.term != null) {
        const el = document.getElementById('scenarioLoanTerm');
        if (el) el.value = ov.term;
      }
      if (ov.termUnit != null) {
        const el = document.getElementById('scenarioLoanTermUnit');
        if (el) el.value = ov.termUnit;
      }
    }
  }

  saveEditedScenario() {
    const id = document.getElementById('editScenarioId').value;
    const sc = this.state.scenarios.find(s => s.id === id);
    if (!sc) return;

    const type = document.getElementById('scenarioTypeInput').value;
    const rawName = document.getElementById('scenarioNameInput').value.trim();

    sc.type = type;
    sc.groupId = null;
    sc.loanId = null;
    sc.loanOverrides = null;

    if (type === 'custom' || type === 'recurring') {
      const amt = parseFloat(document.getElementById('scenarioAmountInput')?.value);
      if (isNaN(amt)) { alert('Enter a valid amount.'); return; }
      sc.amount = amt;
    } else if (type === 'paycheck' || type === 'bill') {
      const groupId = document.getElementById('scenarioGroupInput')?.value;
      if (!groupId) { alert('Select a recurring item.'); return; }
      const amt = parseFloat(document.getElementById('scenarioNewAmountInput')?.value);
      if (isNaN(amt)) { alert('Enter a new amount.'); return; }
      sc.groupId = groupId;
      sc.amount = Math.abs(amt);
    } else if (type === 'loan') {
      const loanId = document.getElementById('scenarioLoanInput')?.value;
      if (!loanId) { alert('Select a loan.'); return; }
      sc.loanId = loanId;
      sc.loanOverrides = {
        balance: parseFloat(document.getElementById('scenarioLoanBalance').value) || 0,
        rate: parseFloat(document.getElementById('scenarioLoanRate').value) || 0,
        term: parseFloat(document.getElementById('scenarioLoanTerm').value) || 30,
        termUnit: document.getElementById('scenarioLoanTermUnit').value
      };
      const months = sc.loanOverrides.termUnit === 'years' ? sc.loanOverrides.term * 12 : sc.loanOverrides.term;
      sc.amount = -this.calculatePI(sc.loanOverrides.balance, sc.loanOverrides.rate, months);
    }

    if (rawName) sc.name = rawName;
    this.saveState();
    this.closeModal();
    this.renderForecaster();
    this.showToast('Scenario updated');
  }

  deleteScenario() {
    const id = document.getElementById('editScenarioId').value;
    const scenario = this.state.scenarios.find(s => s.id === id);
    if (!scenario) return;
    if (!confirm('Delete this scenario?')) return;
    
    this.state.scenarios = this.state.scenarios.filter(s => s.id !== id);
    this.saveState();
    this.closeModal();
    this.renderForecaster();
    
    this.showToast('Scenario deleted', {
      actionLabel: 'Undo',
      onAction: () => {
        this.state.scenarios.push(scenario);
        this.saveState();
        this.renderForecaster();
      }
    });
  }

  openRecurringModal() {
    this.openModal(`
      <div class="modal-overlay active">
        <div class="modal modal-md">
          <div class="modal-header">
            <h2 class="modal-title">Add Recurring Item</h2>
            <button class="modal-close" data-action="closeModal" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-field">
              <label class="stat-label">Description</label>
              <input type="text" id="recDesc">
            </div>
            <div class="form-field">
              <label class="stat-label">Account</label>
              <select id="recAccount">
                <option value="CHECKING">Checking</option>
                <option value="SAVINGS">Savings</option>
              </select>
            </div>
            <div class="form-field">
              <label class="stat-label">Category</label>
              <select id="recCategory">
                ${CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>
            <div class="form-field">
              <label class="stat-label">Amount ($)</label>
              <input type="number" step="0.01" id="recAmount">
            </div>
            <div class="form-field">
              <label class="stat-label">Start Date</label>
              <input type="date" id="recStart" value="${new Date().toISOString().split('T')[0]}">
            </div>
            <div class="form-grid-2 form-field">
              <div>
                <label class="stat-label">Interval</label>
                <input type="number" id="recInterval" value="1" min="1">
              </div>
              <div>
                <label class="stat-label">Frequency</label>
                <select id="recFreq">
                  <option value="days">Days</option>
                  <option value="weeks" selected>Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>
            <div class="form-field">
              <label class="stat-label">End After (occurrences)</label>
              <input type="number" id="recCount" value="12" min="1">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn" data-action="closeModal">Cancel</button>
            <button class="btn btn-primary" data-action="saveRecurring">Save</button>
          </div>
        </div>
      </div>`);
  }

  saveRecurring() {
    const desc = document.getElementById('recDesc').value.trim();
    const acc = document.getElementById('recAccount').value;
    const cat = document.getElementById('recCategory').value;
    const amt = parseFloat(document.getElementById('recAmount').value);
    const start = document.getElementById('recStart').value;
    const interval = parseInt(document.getElementById('recInterval').value) || 1;
    const freq = document.getElementById('recFreq').value;
    const rawCount = parseInt(document.getElementById('recCount').value) || 12;
    const count = Math.min(rawCount, 24);

    if (!desc || isNaN(amt) || !start) { alert('Fill required fields'); return; }
    const groupId = `rec_${Date.now()}`;
    let curDate = new Date(start + 'T00:00:00');
    for (let i = 0; i < count; i++) {
      const dateStr = `${curDate.getFullYear()}-${String(curDate.getMonth() + 1).padStart(2, '0')}-${String(curDate.getDate()).padStart(2, '0')}`;
      this.state.transactions.push({
        id: `est_${Date.now()}_${i}`, groupId, account: acc, date: dateStr,
        description: desc, category: cat, flow: CATEGORY_FLOW_MAP[cat] || 'Flexible Spending',
        amount: amt, status: 'estimated',
        ruleConfig: { interval, freq, endType: 'count', endVal: count, count }
      });
      if (freq === 'days') curDate.setDate(curDate.getDate() + interval);
      else if (freq === 'weeks') curDate.setDate(curDate.getDate() + (7 * interval));
      else if (freq === 'months') curDate.setMonth(curDate.getMonth() + interval);
      else curDate.setFullYear(curDate.getFullYear() + interval);
    }
    this.saveState();
    this.closeModal();
    this.renderTabContent('calendar');
    this.showToast(`Added ${count} recurring items`);
  }

  fmt(v) {
    if (isNaN(v) || v === null || v === undefined) return '$0';
    if (v >= 1000000) return '$' + (v / 1000000).toFixed(1) + 'M';
    if (v >= 1000) return '$' + (v / 1000).toFixed(1) + 'K';
    return '$' + v.toFixed(0);
  }

  escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

    showToast(msg, options = {}) {
    const c = document.getElementById('toastContainer');
    if (!c) return;

    const t = document.createElement('div');
    t.className = 'toast';

    const icon = options.icon || '✓';
    const actionHtml = options.actionLabel
      ? `<button class="toast-action">${options.actionLabel}</button>`
      : '';

    t.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${icon}</span>
        <span>${this.escapeHtml(msg)}</span>
      </div>
      ${actionHtml}
      ${options.actionLabel ? '<div class="toast-progress"></div>' : ''}
    `;

    c.appendChild(t);

    let dismissTimeout;
    let isDismissed = false;

    const dismiss = () => {
      if (isDismissed) return;
      isDismissed = true;
      t.classList.add('dismissing');
      setTimeout(() => t.remove(), 250);
      if (dismissTimeout) clearTimeout(dismissTimeout);
    };

    const resetTimer = () => {
      if (dismissTimeout) clearTimeout(dismissTimeout);
      const bar = t.querySelector('.toast-progress');
      if (bar) {
        bar.style.animation = 'none';
        void bar.offsetWidth; // trigger reflow
        bar.style.animation = 'toastProgress 5s linear forwards';
      }
      dismissTimeout = setTimeout(dismiss, 5000);
    };

    t.addEventListener('mouseenter', () => {
      if (dismissTimeout) clearTimeout(dismissTimeout);
      const bar = t.querySelector('.toast-progress');
      if (bar) bar.style.animationPlayState = 'paused';
    });

    t.addEventListener('mouseleave', () => {
      const bar = t.querySelector('.toast-progress');
      if (bar) bar.style.animationPlayState = 'running';
      dismissTimeout = setTimeout(dismiss, 2000); // give less time after hover
    });

    if (options.actionLabel && options.onAction) {
      const btn = t.querySelector('.toast-action');
      btn.addEventListener('click', () => {
        dismiss();
        options.onAction();
      });
    }

    resetTimer();
  }

    /* ============================================================
     DATA FRESHNESS INDICATORS
     ============================================================ */

  computeFreshness(tabId) {
    const now = Date.now();
    const dayMs = 86400000;

    const latestOf = (list) => {
      if (!list.length) return { date: null, tx: null };
      let best = null;
      list.forEach(t => {
        if (!t.date) return;
        if (!best || t.date > best.date) best = t;
      });
      return { date: best ? best.date : null, tx: best };
    };

    const postedFor = (acc) => this.state.transactions.filter(t =>
      t.status !== 'estimated' && (!acc || t.account === acc)
    );

    let result = { date: null, count: 0 };
    let scope = 'Ledger';

    switch (tabId) {
      case 'checking': {
        const list = postedFor('CHECKING');
        const latest = latestOf(list);
        result = { date: latest.date, count: list.length, tx: latest.tx };
        scope = 'Checking';
        break;
      }
      case 'savings':
      case 'apy': {
        const list = postedFor('SAVINGS');
        const latest = latestOf(list);
        result = { date: latest.date, count: list.length, tx: latest.tx };
        scope = 'Savings';
        break;
      }
      case 'networth': {
        const list = postedFor(null);
        const latest = latestOf(list);
        result = { date: latest.date, count: list.length, tx: latest.tx };
        scope = 'All accounts';
        break;
      }
      case 'debts': {
        const loans = this.state.loans || [];
        if (!loans.length) {
          result = { date: null, count: 0 };
        } else {
          const dates = loans.map(l => l.balanceAsOf).filter(Boolean).sort();
          result = { date: dates[dates.length - 1] || null, count: loans.length };
        }
        scope = 'Loans';
        break;
      }
      case 'paycheck': {
        const incomes = this.state.transactions.filter(t =>
          t.status !== 'estimated' &&
          (t.category === 'Income' || t.flow === 'Income')
        );
        const latest = latestOf(incomes);
        result = { date: latest.date, count: incomes.length, tx: latest.tx };
        scope = 'Income';
        break;
      }
      case 'calendar':
      case 'forecaster':
      default: {
        const list = postedFor(null);
        const latest = latestOf(list);
        result = { date: latest.date, count: list.length, tx: latest.tx };
        scope = 'Full ledger';
        break;
      }
    }

    if (!result.date) {
      return {
        tone: 'empty',
        label: 'No data yet',
        meta: '',
        date: null,
        count: 0,
        scope,
        tooltip: `No ${scope.toLowerCase()} data yet. Import a CSV to start tracking.`,
      };
    }

    const then = new Date(result.date + 'T00:00:00').getTime();
    const diffMs = now - then;
    const diffDays = Math.floor(diffMs / dayMs);
    const diffHours = diffMs / 3600000;

    let tone = 'fresh';
    if (diffDays >= 7) tone = 'stale';
    else if (diffDays >= 2) tone = 'aging';

    let label;
    if (diffMs < 0) {
      label = 'Future-dated entry';
    } else if (diffHours < 1) {
      label = 'Updated just now';
    } else if (diffHours < 24) {
      label = `Updated ${Math.floor(diffHours)}h ago`;
    } else if (diffDays === 1) {
      label = 'Updated yesterday';
    } else if (diffDays < 30) {
      label = `Updated ${diffDays}d ago`;
    } else {
      const d = new Date(result.date + 'T00:00:00');
      label = `Last activity ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }

    const meta = result.count === 1 ? '1 entry' : `${result.count} entries`;
    const tooltip = `Latest: ${result.date}\nEntries: ${result.count}\nScope: ${scope}`;

    return { tone, label, meta, date: result.date, count: result.count, scope, tooltip, tx: result.tx };
  }

  injectFreshnessBadge(tabId) {
    const vc = document.querySelector('.view-container.active');
    if (!vc) return;

    const existing = vc.querySelector('.freshness-strip');
    if (existing) existing.remove();

    const info = this.computeFreshness(tabId);
    const strip = document.createElement('div');
    strip.className = 'freshness-strip';
    strip.innerHTML = `
      <button type="button" class="freshness-pill ${info.tone}" title="${this.escapeHtml(info.tooltip)}">
        <span class="freshness-dot"></span>
        <span class="freshness-label">${this.escapeHtml(info.label)}</span>
        ${info.meta ? `<span class="freshness-meta">${this.escapeHtml(info.meta)}</span>` : ''}
      </button>`;
    vc.insertBefore(strip, vc.firstChild);

    strip.querySelector('.freshness-pill').addEventListener('click', () => this.openFreshnessDetail(tabId));
  }

  openFreshnessDetail(tabId) {
    const info = this.computeFreshness(tabId);
    let detail = '';

    if (info.tone === 'empty') {
      detail = `
        <div class="empty-state">
          <div class="empty-state-icon">📭</div>
          <div class="empty-state-title">No data yet</div>
          <div class="empty-state-hint">Import a CSV from the ${info.scope.toLowerCase()} view to start tracking.</div>
        </div>`;
    } else {
      const d = new Date(info.date + 'T00:00:00');
      const dateStr = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      const toneColor = info.tone === 'fresh' ? 'var(--accent-positive)'
        : info.tone === 'aging' ? 'var(--accent-pending)'
        : 'var(--accent-negative)';
      const toneIcon = info.tone === 'fresh' ? '✓' : info.tone === 'aging' ? '⚠' : '⚠';
      const toneMsg = info.tone === 'fresh' ? 'Fresh — data is up to date'
        : info.tone === 'aging' ? 'Aging — consider importing a new CSV'
        : 'Stale — no new data in over a week';

      detail = `
        <div class="form-field">
          <label class="stat-label">Latest entry</label>
          <div style="font-size:1rem; font-weight:600; color:var(--accent-primary);">${this.escapeHtml(dateStr)}</div>
          ${info.tx ? `<div class="field-hint" style="margin-top:4px;">${this.escapeHtml(info.tx.nickname || info.tx.description || '')}</div>` : ''}
        </div>
        <div class="form-grid-2">
          <div class="form-field">
            <label class="stat-label">Source</label>
            <div style="font-weight:600;">${this.escapeHtml(info.scope)}</div>
          </div>
          <div class="form-field">
            <label class="stat-label">Total entries</label>
            <div class="mono" style="font-weight:600;">${info.count}</div>
          </div>
        </div>
        <div class="form-field">
          <label class="stat-label">Status</label>
          <div style="font-size:0.85rem; color:${toneColor}; font-weight:600;">${toneIcon} ${toneMsg}</div>
        </div>`;
    }

    this.openModal(`
      <div class="modal-overlay active">
        <div class="modal modal-sm">
          <div class="modal-header">
            <h2 class="modal-title">📡 Data Freshness</h2>
            <button class="modal-close" data-action="closeModal" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">${detail}</div>
          <div class="modal-footer">
            <button class="btn" data-action="closeModal">Close</button>
            <button class="btn btn-primary" data-action="freshnessImport" data-freshness-tab="${tabId}">Import CSV</button>
          </div>
        </div>
      </div>`);
  }

  freshnessImport(btn) {
    const tabId = btn.dataset.freshnessTab;
    this.closeModal();
    setTimeout(() => {
      if (tabId === 'savings' || tabId === 'apy') this.switchTab('savings');
      else this.switchTab('checking');
      setTimeout(() => this.openImportWizard(), 80);
    }, 80);
  }

    /* ============================================================
     COMMAND PALETTE
     ============================================================ */

  openCommandPalette() {
    if (document.getElementById('cmdPaletteOverlay')) return;

    this._cmdSelected = 0;
    this._cmdFiltered = this._getCommands();

    const overlay = document.createElement('div');
    overlay.id = 'cmdPaletteOverlay';
    overlay.className = 'cmd-overlay';
    overlay.innerHTML = `
      <div class="cmd-panel" role="dialog" aria-modal="true" aria-label="Command palette">
        <div class="cmd-search-row">
          <span class="cmd-search-icon">⌘</span>
          <input type="text" class="cmd-input" id="cmdInput" placeholder="Type a command…" autocomplete="off" spellcheck="false">
          <kbd class="cmd-kbd">ESC</kbd>
        </div>
        <div class="cmd-list" id="cmdList"></div>
        <div class="cmd-footer">
          <span><kbd class="cmd-kbd">↑</kbd><kbd class="cmd-kbd">↓</kbd> navigate</span>
          <span><kbd class="cmd-kbd">↵</kbd> run</span>
          <span><kbd class="cmd-kbd">ESC</kbd> close</span>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const input = overlay.querySelector('#cmdInput');
    input.addEventListener('input', () => {
      this._cmdSelected = 0;
      this._filterCommands(input.value);
    });
    input.addEventListener('keydown', (e) => this._cmdKeydown(e));

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.closeCommandPalette();
    });
    overlay.addEventListener('wheel', (e) => {
      if (e.target === overlay) e.preventDefault();
    }, { passive: false });

    this._renderCommandList();
    setTimeout(() => input.focus(), 20);
  }

  closeCommandPalette() {
    const el = document.getElementById('cmdPaletteOverlay');
    if (el) el.remove();
    this._cmdFiltered = [];
    this._cmdSelected = 0;
  }

  _getCommands() {
    const nav = (tab, name, icon) => ({
      id: `nav-${tab}`,
      title: `Go to ${name}`,
      group: 'Navigate',
      icon,
      keywords: `tab ${name} ${tab}`,
      action: () => this.switchTab(tab)
    });

    return [
      // --- Navigate ---
      nav('checking', 'Checking', '💳'),
      nav('savings', 'Savings', '🏦'),
      nav('networth', 'Net Worth', '📊'),
      nav('debts', 'Debt Payoff', '💸'),
      nav('paycheck', 'Paycheck Calc', '🧾'),
      nav('calendar', 'Calendar', '📅'),
      nav('forecaster', 'Forecaster', '📈'),
      nav('apy', 'APY Simulator', '🎯'),

      // --- Create ---
      { id: 'add-pending', title: 'Add Pending Transaction', group: 'Create', icon: '➕', keywords: 'new transaction pending', action: () => { this.switchTab('checking'); this.openAddPendingModal(); } },
      { id: 'import-csv-chk', title: 'Import CSV into Checking', group: 'Create', icon: '📥', keywords: 'upload csv import bank checking', action: () => { this.switchTab('checking'); this.openImportWizard(); } },
      { id: 'import-csv-sav', title: 'Import CSV into Savings', group: 'Create', icon: '📥', keywords: 'upload csv import bank savings', action: () => { this.switchTab('savings'); this.openImportWizard(); } },
      { id: 'add-vault', title: 'Create New Vault', group: 'Create', icon: '🏦', keywords: 'new vault savings goal earmark', action: () => { this.switchTab('savings'); this.openVaultModal(); } },
      { id: 'add-loan', title: 'Add Loan', group: 'Create', icon: '💳', keywords: 'new loan debt mortgage car', action: () => { this.switchTab('debts'); this.openAddLoanModal(); } },
      { id: 'add-recurring', title: 'Add Recurring Item', group: 'Create', icon: '🔁', keywords: 'new recurring bill income schedule', action: () => { this.switchTab('calendar'); this.openRecurringModal(); } },
      { id: 'add-scenario', title: 'Add What-If Scenario', group: 'Create', icon: '⚙️', keywords: 'new scenario forecast whatif projection', action: () => { this.switchTab('forecaster'); this.openAddScenarioModal(); } },

      // --- Manage ---
      { id: 'rules', title: 'Manage Auto-Rules', group: 'Manage', icon: '⚙️', keywords: 'rules categorization nickname priority', action: () => { this.switchTab('checking'); this.openRulesModal(); } },
      { id: 'mass-edit', title: 'Mass Edit Transactions', group: 'Manage', icon: '✏️', keywords: 'bulk update category nickname mass', action: () => { this.switchTab('checking'); this.openMassEditModal(); } },
      { id: 'tax-brackets', title: 'Manage Tax Brackets', group: 'Manage', icon: '🧾', keywords: 'state tax paycheck brackets', action: () => { this.switchTab('paycheck'); this.openTaxBracketModal(); } },
      { id: 'sync-vaults', title: 'Sync Vaults With History', group: 'Manage', icon: '🔄', keywords: 'recalculate vault balance fix', action: () => { this.switchTab('savings'); this.recalculateVaultsAndSync(); } },
      { id: 'recalc-balances', title: 'Recalculate All Balances', group: 'Manage', icon: '🔢', keywords: 'rebuild running balance recalc', action: () => { this.recalculateBalances(); this.saveState(); this.renderTabContent(this.currentTab); this.showToast('Balances recalculated'); } },

      // --- View ---
      { id: 'toggle-density', title: 'Toggle Table Density', group: 'View', icon: '↕️', keywords: 'compact rows table density', action: () => { if (this.currentTab !== 'checking') this.switchTab('checking'); this.toggleDensity(); } },
      { id: 'toggle-locked', title: 'Filter Locked Transactions', group: 'View', icon: '🔒', keywords: 'locked filter show only', action: () => { if (this.currentTab !== 'checking') this.switchTab('checking'); this.toggleLockedFilter(); } },
      { id: 'refresh-charts', title: 'Refresh Charts', group: 'View', icon: '🔄', keywords: 'redraw canvas chart refresh', action: () => { this.renderCharts(); this.showToast('Charts refreshed'); } },
      { id: 'calendar-today', title: 'Jump Calendar to Today', group: 'View', icon: '📅', keywords: 'today current month calendar', action: () => { this.switchTab('calendar'); this.calendarGoToday(); } },
      { id: 'toggle-theme', title: 'Toggle Light/Dark Theme', group: 'View', icon: '☀', keywords: 'theme dark light preset toggle appearance', action: () => this.toggleThemePreset() },

      // --- Data ---
      { id: 'export', title: 'Export Current Profile', group: 'Data', icon: '📤', keywords: 'download backup json export save', action: () => this.exportCurrentProfile() },
      { id: 'import-json', title: 'Import JSON Backup', group: 'Data', icon: '📥', keywords: 'restore upload profile json', action: () => this.triggerImportProfile() },

      // --- Settings ---
      { id: 'settings', title: 'Open Settings', group: 'Settings', icon: '⚙️', keywords: 'preferences profile manage', action: () => this.openSettingsModal('home') },
      { id: 'settings-storage', title: 'Storage Usage', group: 'Settings', icon: '💾', keywords: 'quota limit size storage', action: () => this.openSettingsModal('storage') },
      { id: 'settings-appearance', title: 'Appearance & Theme', group: 'Settings', icon: '🎨', keywords: 'colors theme dark light appearance', action: () => this.openSettingsModal('appearance') },
      { id: 'settings-backup', title: 'Backups & Restore', group: 'Settings', icon: '📦', keywords: 'export import clear backup', action: () => this.openSettingsModal('backup') },
    ];
  }

  _filterCommands(query) {
    const q = query.trim().toLowerCase();
    const all = this._getCommands();
    if (!q) {
      this._cmdFiltered = all;
    } else {
      const tokens = q.split(/\s+/).filter(Boolean);
      this._cmdFiltered = all.filter(c => {
        const hay = (c.title + ' ' + (c.keywords || '') + ' ' + (c.group || '')).toLowerCase();
        return tokens.every(t => hay.includes(t));
      });
    }
    this._cmdSelected = 0;
    this._renderCommandList();
  }

  _renderCommandList() {
    const list = document.getElementById('cmdList');
    if (!list) return;

    const items = this._cmdFiltered;
    if (items.length === 0) {
      list.innerHTML = `<div class="cmd-empty">
        No commands match.
        <span class="cmd-empty-hint">Try "checking", "loan", "settings"…</span>
      </div>`;
      return;
    }

    const groups = {};
    const groupOrder = [];
    items.forEach((c, i) => {
      if (!groups[c.group]) { groups[c.group] = []; groupOrder.push(c.group); }
      groups[c.group].push({ cmd: c, idx: i });
    });

    let html = '';
    groupOrder.forEach(g => {
      html += `<div class="cmd-group-label">${g}</div>`;
      groups[g].forEach(({ cmd, idx }) => {
        const sel = idx === this._cmdSelected ? ' selected' : '';
        html += `<div class="cmd-item${sel}" data-cmd-index="${idx}">
          <span class="cmd-item-icon">${cmd.icon || '•'}</span>
          <span class="cmd-item-title">${this.escapeHtml(cmd.title)}</span>
        </div>`;
      });
    });
    list.innerHTML = html;

    list.querySelectorAll('[data-cmd-index]').forEach(el => {
      const idx = parseInt(el.dataset.cmdIndex);
      el.addEventListener('click', () => {
        this._cmdSelected = idx;
        this._executeSelected();
      });
      el.addEventListener('mouseenter', () => {
        if (idx !== this._cmdSelected) {
          this._cmdSelected = idx;
          this._updateCmdSelection();
        }
      });
    });

    const sel = list.querySelector('.cmd-item.selected');
    if (sel) sel.scrollIntoView({ block: 'nearest' });
  }

  _updateCmdSelection() {
    const list = document.getElementById('cmdList');
    if (!list) return;
    list.querySelectorAll('.cmd-item').forEach(el => {
      const idx = parseInt(el.dataset.cmdIndex);
      const on = idx === this._cmdSelected;
      el.classList.toggle('selected', on);
      if (on) el.scrollIntoView({ block: 'nearest' });
    });
  }

  _cmdKeydown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this._cmdSelected < this._cmdFiltered.length - 1) {
        this._cmdSelected++;
        this._updateCmdSelection();
      }
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this._cmdSelected > 0) {
        this._cmdSelected--;
        this._updateCmdSelection();
      }
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      this._executeSelected();
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      this.closeCommandPalette();
    }
  }

  _executeSelected() {
    const cmd = this._cmdFiltered[this._cmdSelected];
    if (!cmd) return;
    this.closeCommandPalette();
    setTimeout(() => {
      try {
        cmd.action();
      } catch (err) {
        console.error('Command failed:', err);
        this.showToast('Command failed: ' + err.message);
      }
    }, 60);
  }
}

const app = new MoneyTrackerApp();
window.onload = () => app.init();