
document.addEventListener('DOMContentLoaded', function () {

  // ── TRAINER DATA ────────────────────────────────────────────
  const trainers = [
    {
      id: 'sb', name: 'Sara Benali', specialty: 'Yoga & Pilates',
      exp: '8 Years', email: 'sara@spadegym.dz',
      photo: 'https://placehold.co/200x200/1a1a2e/e94560?text=SB',
      bio: 'Sara is a certified yoga and Pilates instructor passionate about mindful movement. She holds certifications from the International Yoga Alliance and has helped over 300 members improve their mobility.',
      classes: ['Pilates Core — Tuesday 10:00', 'Sunday Stretch — Sunday 10:00']
    },
    {
      id: 'km', name: 'Karim Mansouri', specialty: 'CrossFit & HIIT',
      exp: '10 Years', email: 'karim@spadegym.dz',
      photo: 'https://placehold.co/200x200/1a1a2e/e94560?text=KM',
      bio: 'Karim is a Level 3 CrossFit coach and HIIT specialist. Former national-level athlete, he combines intense functional training with personalized programming.',
      classes: ['HIIT Blast — Monday 18:00', 'CrossFit WOD — Thursday 06:30']
    },
    {
      id: 'lc', name: 'Lina Chouiref', specialty: 'Zumba & Spin',
      exp: '6 Years', email: 'lina@spadegym.dz',
      photo: 'https://placehold.co/200x200/1a1a2e/e94560?text=LC',
      bio: 'Lina brings energy and fun to every session. Certified Zumba instructor and indoor cycling coach, she creates high-energy routines that make cardio feel like a celebration.',
      classes: ['Zumba — Wednesday 09:00', 'Spin Class — Friday 18:00']
    },
    {
      id: 'yf', name: 'Yacine Ferhat', specialty: 'Boxing & Strength',
      exp: '12 Years', email: 'yacine@spadegym.dz',
      photo: 'https://placehold.co/200x200/1a1a2e/e94560?text=YF',
      bio: 'Yacine is a former professional boxer turned strength and conditioning specialist. He designs programs that build explosive power, coordination, and functional strength.',
      classes: ['Boxing Fundamentals — Wednesday 17:00', 'Strength & Conditioning — Friday 17:30', 'Kickboxing — Saturday 11:00']
    },
    {
      id: 'ak', name: 'Amira Khelifi', specialty: 'Nutrition & Wellness',
      exp: '5 Years', email: 'amira@spadegym.dz',
      photo: 'https://placehold.co/200x200/1a1a2e/e94560?text=AK',
      bio: 'Amira holds a degree in Sports Nutrition and is a certified wellness coach. She works with Gold members to design personalized nutrition plans that complement their training.',
      classes: ['Nutrition Workshop — Monday 11:00']
    },
    {
      id: 'bt', name: 'Bilal Tabet', specialty: 'Aqua Fitness',
      exp: '7 Years', email: 'bilal@spadegym.dz',
      photo: 'https://placehold.co/200x200/1a1a2e/e94560?text=BT',
      bio: 'Bilal is a certified swim coach and aqua aerobics instructor. Specializing in low-impact exercise, his water-based sessions are ideal for rehabilitation and seniors.',
      classes: ['Aqua Aerobics — Tuesday 09:00', 'Lap Swimming — Thursday 08:00']
    },
  ];

  // ── SEARCH BAR ──────────────────────────────────────────────
  const grid = document.querySelector('.trainers-grid');

  // Inject search bar above the grid
  const searchWrap = document.createElement('div');
  searchWrap.style.cssText = 'margin-bottom:2rem;text-align:center;';
  searchWrap.innerHTML = `
    <input id="trainer-search" type="text" placeholder="🔍 Search by name or specialty..."
      style="width:100%;max-width:480px;padding:0.7rem 1.2rem;border-radius:999px;
      border:1px solid var(--border);background:var(--card);color:var(--text);font-size:1rem;">
  `;
  grid.parentNode.insertBefore(searchWrap, grid);

  // ── SEARCH LOGIC ────────────────────────────────────────────
  document.getElementById('trainer-search').addEventListener('input', function () {
    const q = this.value.toLowerCase().trim();
    const cards = grid.querySelectorAll('.trainer-card');
    let found = 0;

    cards.forEach((card, i) => {
      const t = trainers[i];
      const match = t.name.toLowerCase().includes(q) || t.specialty.toLowerCase().includes(q);
      card.style.display = match ? '' : 'none';
      if (match) found++;
    });

    // Show/hide "no results" message
    let noMsg = document.getElementById('no-trainers');
    if (found === 0) {
      if (!noMsg) {
        noMsg = document.createElement('p');
        noMsg.id = 'no-trainers';
        noMsg.textContent = 'No trainers found.';
        noMsg.style.cssText = 'text-align:center;color:var(--text-muted);padding:2rem;width:100%;';
        grid.appendChild(noMsg);
      }
    } else {
      if (noMsg) noMsg.remove();
    }
  });

  // ── CLICK CARD → OPEN MODAL ─────────────────────────────────
  grid.querySelectorAll('.trainer-card').forEach((card, i) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => openModal(trainers[i]));
  });

  // ── MODAL ───────────────────────────────────────────────────
  function openModal(t) {
    const overlay = document.createElement('div');
    overlay.id = 'trainer-modal';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999;padding:1rem;';

    overlay.innerHTML = `
      <div style="background:var(--card);border:1px solid var(--border);border-radius:16px;padding:2rem;max-width:500px;width:100%;position:relative;max-height:90vh;overflow-y:auto;">
        <button id="modal-close" style="position:absolute;top:1rem;right:1rem;background:none;border:none;color:var(--text);font-size:1.5rem;cursor:pointer;">✕</button>
        <div style="text-align:center;margin-bottom:1.5rem;">
          <img src="${t.photo}" alt="${t.name}" style="border-radius:50%;width:100px;height:100px;margin-bottom:1rem;">
          <h2 style="font-family:'Oswald',sans-serif;color:var(--white);">${t.name}</h2>
          <p style="color:var(--accent);">${t.specialty} · ${t.exp} Experience</p>
        </div>
        <p style="color:var(--text-muted);margin-bottom:1.5rem;">${t.bio}</p>
        <h4 style="font-family:'Oswald',sans-serif;color:var(--white);margin-bottom:0.5rem;">📅 Classes</h4>
        <ul style="list-style:none;padding:0;margin-bottom:1.5rem;">
          ${t.classes.map(c => `<li style="color:var(--text-muted);padding:0.3rem 0;border-bottom:1px solid var(--border);">• ${c}</li>`).join('')}
        </ul>
        <p style="color:var(--text-muted);">✉️ <a href="mailto:${t.email}" style="color:var(--accent);">${t.email}</a></p>
      </div>
    `;

    document.body.appendChild(overlay);

    // Close on ✕ button
    document.getElementById('modal-close').addEventListener('click', closeModal);
    // Close on Escape key
    document.addEventListener('keydown', onEsc);
  }

  function closeModal() {
    const modal = document.getElementById('trainer-modal');
    if (modal) modal.remove();
    document.removeEventListener('keydown', onEsc);
  }

  function onEsc(e) { if (e.key === 'Escape') closeModal(); }

});