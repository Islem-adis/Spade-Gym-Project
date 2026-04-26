
document.addEventListener('DOMContentLoaded', function () {

  // ── PLAN DATA ───────────────────────────────────────────────
  const plans = {
    bronze: { name: '🥉 Bronze', price: '2,500 DZD/month' },
    silver: { name: '🥈 Silver', price: '5,500 DZD/quarter' },
    gold:   { name: '🥇 Gold',   price: '20,000 DZD/year' },
  };

  // ── STICKY CART BAR (injected into page) ────────────────────
  const bar = document.createElement('div');
  bar.id = 'cart-bar';
  bar.style.cssText = `
    position: fixed; bottom: 0; left: 0; right: 0;
    background: #232063; border-top: 2px solid var(--accent);
    display: none; align-items: center; justify-content: space-between;
    padding: 0.8rem 2rem; z-index: 999; gap: 1rem; flex-wrap: wrap;
  `;
  bar.innerHTML = `
    <span id="cart-info" style="color:var(--text);font-family:'Oswald',sans-serif;font-size:1rem;"></span>
    <div style="display:flex;gap:0.75rem;align-items:center;">
      <a id="cart-proceed" href="#register-form" class="btn btn-accent btn-sm">Proceed to Register →</a>
      <button id="cart-clear" class="btn btn-sm btn-outline" style="font-size:0.75rem;">✕ Clear</button>
    </div>
  `;
  document.body.appendChild(bar);

  // ── SELECT PLAN BUTTONS ─────────────────────────────────────
  // Add a "Select Plan" button to each plan card
  document.querySelectorAll('.plan-card').forEach(card => {
    // Detect which plan this card is by its id or class
    const key = ['bronze','silver','gold'].find(k => card.id === `plan-${k}` || card.classList.contains(`plan-${k}`));
    if (!key) return;

    const btn = document.createElement('button');
    btn.className   = 'btn btn-sm btn-outline select-plan-btn';
    btn.dataset.plan = key;
    btn.textContent  = 'Select Plan';
    btn.style.marginTop = '0.5rem';
    card.appendChild(btn);

    btn.addEventListener('click', () => selectPlan(key));
  });

  // ── SELECT PLAN ─────────────────────────────────────────────
  function selectPlan(key) {
    sessionStorage.setItem('selectedPlan', key);  // save to session
    updateUI(key);
  }

  // ── UPDATE UI ───────────────────────────────────────────────
  function updateUI(key) {
    const plan = plans[key];

    // Show cart bar
    bar.style.display = 'flex';
    document.getElementById('cart-info').innerHTML =
      `🛒 Selected: <strong style="color:var(--accent);">${plan.name}</strong> — ${plan.price}`;

    // Highlight selected card, dim others
    document.querySelectorAll('.plan-card').forEach(card => {
      const isSelected = card.id === `plan-${key}` || card.classList.contains(`plan-${key}`);
      card.style.outline = isSelected ? '3px solid var(--accent)' : '';
      card.style.opacity = isSelected ? '1' : '0.6';
    });

    // Update all "Select Plan" buttons
    document.querySelectorAll('.select-plan-btn').forEach(btn => {
      const isSelected = btn.dataset.plan === key;
      btn.textContent  = isSelected ? '✅ Selected' : 'Select Plan';
      btn.className    = `btn btn-sm select-plan-btn ${isSelected ? 'btn-accent' : 'btn-outline'}`;
    });

    // Pre-select the matching radio in the registration form
    const radio = document.querySelector(`input[type="radio"][value="${key}"]`);
    if (radio) radio.checked = true;
  }

  // ── CLEAR ───────────────────────────────────────────────────
  function clearPlan() {
    sessionStorage.removeItem('selectedPlan');
    bar.style.display = 'none';
    document.querySelectorAll('.plan-card').forEach(c => { c.style.outline = ''; c.style.opacity = '1'; });
    document.querySelectorAll('.select-plan-btn').forEach(b => { b.textContent = 'Select Plan'; b.className = 'btn btn-sm btn-outline select-plan-btn'; });
    document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
  }

  document.getElementById('cart-clear').addEventListener('click', clearPlan);

  // Clear on form submit
  const form = document.querySelector('.membership-form');
  if (form) form.addEventListener('submit', () => sessionStorage.removeItem('selectedPlan'));

  // ── RESTORE FROM SESSION ────────────────────────────────────
  const saved = sessionStorage.getItem('selectedPlan');
  if (saved) updateUI(saved);

});