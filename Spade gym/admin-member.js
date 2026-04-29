// admin-members.js — Admin Feature 1: Member Management

document.addEventListener('DOMContentLoaded', function () {

  // ── DATA & STATE ────────────────────────────────────────────
  const seed = [
    { id:1,  name:'Hamza Bouzid',      email:'hamza@gmail.com',       phone:'0550001111', plan:'Gold',   date:'2026-03-11' },
    { id:2,  name:'Nadia Berrah',      email:'nadia@gmail.com',       phone:'0550002222', plan:'Silver', date:'2026-03-11' },
    { id:3,  name:'Riad Ouahmed',      email:'riad@gmail.com',        phone:'0550003333', plan:'Bronze', date:'2026-03-09' },
    { id:4,  name:'Yasmine Saadi',     email:'yasmine@gmail.com',     phone:'0550004444', plan:'Silver', date:'2026-03-08' },
    { id:5,  name:'Mourad Chali',      email:'mourad@gmail.com',      phone:'0550005555', plan:'Gold',   date:'2026-03-01' },
    { id:6,  name:'Lyes Amrani',       email:'lyes@gmail.com',        phone:'0550006666', plan:'Bronze', date:'2026-02-25' },
    { id:7,  name:'Souad Benmalek',    email:'souad@gmail.com',       phone:'0550007777', plan:'Silver', date:'2026-02-22' },
    { id:8,  name:'Karim Zidane',      email:'karimz@gmail.com',      phone:'0550008888', plan:'Gold',   date:'2026-02-20' },
    { id:9,  name:'Amina Touati',      email:'amina@gmail.com',       phone:'0550009999', plan:'Bronze', date:'2026-02-18' },
    { id:10, name:'Fares Boukhelif',   email:'fares@gmail.com',       phone:'0550010101', plan:'Silver', date:'2026-02-15' },
    { id:11, name:'Meriem Hadjadj',    email:'meriem@gmail.com',      phone:'0550011111', plan:'Gold',   date:'2026-02-10' },
    { id:12, name:'Walid Kaci',        email:'walid@gmail.com',       phone:'0550012121', plan:'Bronze', date:'2026-02-08' },
    { id:13, name:'Sara Messaoud',     email:'sara.m@gmail.com',      phone:'0550013131', plan:'Silver', date:'2026-02-05' },
    { id:14, name:'Billel Ferdi',      email:'billel@gmail.com',      phone:'0550014141', plan:'Bronze', date:'2026-02-01' },
    { id:15, name:'Houda Larbi',       email:'houda@gmail.com',       phone:'0550015151', plan:'Gold',   date:'2026-01-28' },
    { id:16, name:'Nassim Belhout',    email:'nassim@gmail.com',      phone:'0550016161', plan:'Silver', date:'2026-01-25' },
    { id:17, name:'Imane Redjimi',     email:'imane@gmail.com',       phone:'0550017171', plan:'Bronze', date:'2026-01-20' },
    { id:18, name:'Youssef Ghoul',     email:'youssef@gmail.com',     phone:'0550018181', plan:'Gold',   date:'2026-01-15' },
    { id:19, name:'Chaima Belaid',     email:'chaima@gmail.com',      phone:'0550019191', plan:'Silver', date:'2026-01-10' },
    { id:20, name:'Rachid Bensalem',   email:'rachid@gmail.com',      phone:'0550020202', plan:'Bronze', date:'2026-01-05' },
    { id:21, name:'Djamel Beloufa',    email:'djamel@gmail.com',      phone:'0550021212', plan:'Gold',   date:'2026-01-03' },
    { id:22, name:'Farida Azzoug',     email:'farida@gmail.com',      phone:'0550022222', plan:'Silver', date:'2025-12-28' },
    { id:23, name:'Sofiane Meddah',    email:'sofiane@gmail.com',     phone:'0550023232', plan:'Bronze', date:'2025-12-25' },
    { id:24, name:'Rania Bouri',       email:'rania@gmail.com',       phone:'0550024242', plan:'Silver', date:'2025-12-20' },
    { id:25, name:'Khaled Hamdi',      email:'khaled@gmail.com',      phone:'0550025252', plan:'Gold',   date:'2025-12-18' },
    { id:26, name:'Lynda Cherif',      email:'lynda@gmail.com',       phone:'0550026262', plan:'Bronze', date:'2025-12-15' },
    { id:27, name:'Amine Boudraa',     email:'amine@gmail.com',       phone:'0550027272', plan:'Silver', date:'2025-12-10' },
    { id:28, name:'Dalila Mansouri',   email:'dalila@gmail.com',      phone:'0550028282', plan:'Gold',   date:'2025-12-08' },
    { id:29, name:'Tarek Benaissa',    email:'tarek@gmail.com',       phone:'0550029292', plan:'Bronze', date:'2025-12-05' },
    { id:30, name:'Sabrina Oukaci',    email:'sabrina@gmail.com',     phone:'0550030303', plan:'Silver', date:'2025-12-01' },
    { id:31, name:'Hichem Belkacemi',  email:'hichem@gmail.com',      phone:'0550031313', plan:'Gold',   date:'2025-11-28' },
    { id:32, name:'Nawal Benali',      email:'nawal@gmail.com',       phone:'0550032323', plan:'Bronze', date:'2025-11-25' },
    { id:33, name:'Adel Tlemcani',     email:'adel@gmail.com',        phone:'0550033333', plan:'Silver', date:'2025-11-20' },
    { id:34, name:'Zineb Slimani',     email:'zineb@gmail.com',       phone:'0550034343', plan:'Bronze', date:'2025-11-18' },
    { id:35, name:'Omar Boucherit',    email:'omar@gmail.com',        phone:'0550035353', plan:'Gold',   date:'2025-11-15' },
    { id:36, name:'Asma Rahmani',      email:'asma@gmail.com',        phone:'0550036363', plan:'Silver', date:'2025-11-10' },
    { id:37, name:'Samy Bendjemaa',    email:'samy@gmail.com',        phone:'0550037373', plan:'Bronze', date:'2025-11-08' },
    { id:38, name:'Wafa Hadj Ali',     email:'wafa@gmail.com',        phone:'0550038383', plan:'Gold',   date:'2025-11-05' },
    { id:39, name:'Ryad Merabtine',    email:'ryad@gmail.com',        phone:'0550039393', plan:'Silver', date:'2025-11-01' },
    { id:40, name:'Lila Bouziane',     email:'lila@gmail.com',        phone:'0550040404', plan:'Bronze', date:'2025-10-28' },
    { id:41, name:'Mounir Laib',       email:'mounir@gmail.com',      phone:'0550041414', plan:'Gold',   date:'2025-10-25' },
    { id:42, name:'Samia Guendouz',    email:'samia@gmail.com',       phone:'0550042424', plan:'Silver', date:'2025-10-20' },
    { id:43, name:'Anis Benabdallah',  email:'anis@gmail.com',        phone:'0550043434', plan:'Bronze', date:'2025-10-18' },
    { id:44, name:'Kahina Idir',       email:'kahina@gmail.com',      phone:'0550044444', plan:'Silver', date:'2025-10-15' },
    { id:45, name:'Mehdi Bouaza',      email:'mehdi@gmail.com',       phone:'0550045454', plan:'Gold',   date:'2025-10-10' },
    { id:46, name:'Nawel Tabet',       email:'nawel@gmail.com',       phone:'0550046464', plan:'Bronze', date:'2025-10-08' },
    { id:47, name:'Islem Bouraiou',    email:'islem@gmail.com',       phone:'0550047474', plan:'Silver', date:'2025-10-05' },
    { id:48, name:'Ayoub Chabou',      email:'ayoub@gmail.com',       phone:'0550048484', plan:'Gold',   date:'2025-10-01' },
    { id:49, name:'Siham Meziane',     email:'siham@gmail.com',       phone:'0550049494', plan:'Bronze', date:'2025-09-28' },
    { id:50, name:'Lotfi Gherbi',      email:'lotfi@gmail.com',       phone:'0550050505', plan:'Silver', date:'2025-09-25' },
    { id:51, name:'Cylia Boussaha',    email:'cylia@gmail.com',       phone:'0550051515', plan:'Gold',   date:'2025-09-20' },
    { id:52, name:'Badreddine Khaldi', email:'badreddine@gmail.com',  phone:'0550052525', plan:'Bronze', date:'2025-09-18' },
    { id:53, name:'Lamia Ferhat',      email:'lamia@gmail.com',       phone:'0550053535', plan:'Silver', date:'2025-09-15' },
    { id:54, name:'Zakaria Benali',    email:'zakaria@gmail.com',     phone:'0550054545', plan:'Gold',   date:'2025-09-10' },
    { id:55, name:'Faiza Belarbi',     email:'faiza@gmail.com',       phone:'0550055555', plan:'Bronze', date:'2025-09-08' },
    { id:56, name:'Yacine Benmoussa',  email:'yacine.b@gmail.com',    phone:'0550056565', plan:'Silver', date:'2025-09-05' },
    { id:57, name:'Hafida Rekik',      email:'hafida@gmail.com',      phone:'0550057575', plan:'Gold',   date:'2025-09-01' },
    { id:58, name:'Samir Chikhi',      email:'samir@gmail.com',       phone:'0550058585', plan:'Bronze', date:'2025-08-28' },
    { id:59, name:'Nour El Houda Ait', email:'nour@gmail.com',        phone:'0550059595', plan:'Silver', date:'2025-08-25' },
  ];
  const load = () => JSON.parse(localStorage.getItem('gym_members') || 'null') || seed;
  const save = d  => localStorage.setItem('gym_members', JSON.stringify(d));

  let members = load();
  let search = '', planFilter = 'All';
  if (!localStorage.getItem('gym_members') || members.length < seed.length) { members = seed; save(members); }

  // ── INJECT SEARCH + FILTER BAR ──────────────────────────────
  const section = document.querySelector('.admin-section[aria-labelledby="recent-heading"]');
  const bar = document.createElement('div');
  bar.style.cssText = 'display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;margin-bottom:1rem;';
  bar.innerHTML = `
    <input id="m-search" type="text" placeholder="🔍 Search name or email..."
      style="padding:0.45rem 1rem;border:1px solid var(--admin-border);border-radius:8px;font-size:0.85rem;flex:1;min-width:180px;">
    <div id="m-btns" style="display:flex;gap:0.4rem;">
      ${['All','Bronze','Silver','Gold'].map((p,i)=>
        `<button class="btn btn-xs ${i===0?'btn-accent':'btn-outline-admin'}" data-plan="${p}">${p}</button>`
      ).join('')}
    </div>
    <span id="m-count" style="font-size:0.85rem;color:#7f8c8d;margin-left:auto;"></span>`;
  section.querySelector('.admin-card').prepend(bar);

  // ── INJECT ADD FORM ─────────────────────────────────────────
  const addSec = document.createElement('section');
  addSec.className = 'admin-section';
  addSec.innerHTML = `
    <h2 class="admin-section-title">Add New Member</h2>
    <div class="admin-card"><form id="add-form" class="admin-form" style="padding:1.5rem;" novalidate>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
        <div class="form-group"><label>Full Name</label><input id="m-name"  type="text"  placeholder="Full name" required></div>
        <div class="form-group"><label>Email</label>    <input id="m-email" type="email" placeholder="email@example.com" required></div>
        <div class="form-group"><label>Phone</label>    <input id="m-phone" type="text"  placeholder="+213 ..."></div>
        <div class="form-group"><label>Plan</label>
          <select id="m-plan"><option>Bronze</option><option>Silver</option><option>Gold</option></select></div>
        <div class="form-group"><label>Join Date</label><input id="m-date" type="date"></div>
      </div>
      <div style="margin-top:1rem;display:flex;gap:0.75rem;">
        <button type="submit" class="btn btn-accent btn-sm">➕ Add Member</button>
        <button type="reset"  class="btn btn-outline-admin btn-sm">Clear</button>
      </div>
    </form></div>`;
  section.after(addSec);

  // ── RENDER ──────────────────────────────────────────────────
  function render() {
    const q = search.toLowerCase();
    const rows = members.filter(m =>
      (planFilter === 'All' || m.plan === planFilter) &&
      (m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q))
    );
    document.getElementById('m-count').textContent = `Showing ${rows.length} of ${members.length} members`;
    document.querySelector('#recent-heading').closest('.admin-section').querySelector('tbody').innerHTML =
      rows.length ? rows.map((m,i) => `<tr>
        <td>${i + 1}</td><td>${m.name}</td><td>${m.email}</td>
        <td><span class="badge badge-${m.plan.toLowerCase()}">${m.plan}</span></td>
        <td>${m.date}</td>
        <td>
          <button class="btn btn-xs btn-edit"   onclick="editMember(${m.id})">✏️ Edit</button>
          <button class="btn btn-xs btn-delete" onclick="delMember(${m.id})">🗑️ Delete</button>
        </td></tr>`).join('')
      : `<tr><td colspan="6" style="text-align:center;padding:1.5rem;color:#7f8c8d;">No members found.</td></tr>`;
  }

  // ── EVENTS ──────────────────────────────────────────────────
  document.getElementById('m-search').addEventListener('input', e => { search = e.target.value; render(); });
  document.getElementById('m-btns').addEventListener('click', e => {
    if (!e.target.dataset.plan) return;
    planFilter = e.target.dataset.plan;
    document.querySelectorAll('#m-btns button').forEach(b =>
      b.className = `btn btn-xs ${b.dataset.plan === planFilter ? 'btn-accent' : 'btn-outline-admin'}`);
    render();
  });

  document.getElementById('add-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const n  = document.getElementById('m-name').value.trim();
    const em = document.getElementById('m-email').value.trim();
    const ph = document.getElementById('m-phone').value.trim();
    if (!n || !em) { alert('Name and Email required.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { alert('Please enter a valid email address.'); return; }
    if (ph && !/^[0-9+\s\-()]{7,15}$/.test(ph)) { alert('Please enter a valid phone number.'); return; }
    members.unshift({ id: Date.now(), name: n, email: em,
      phone: ph || '—',
      plan:  document.getElementById('m-plan').value,
      date:  document.getElementById('m-date').value || new Date().toISOString().split('T')[0] });
    save(members); this.reset(); render();
  });

  // ── DELETE ──────────────────────────────────────────────────
  window.delMember = id => {
    if (!confirm('Delete this member?')) return;
    members = members.filter(m => m.id !== id);
    save(members); render();
  };

  // ── EDIT MODAL ──────────────────────────────────────────────
  window.editMember = id => {
    const m = members.find(m => m.id === id);
    const ov = document.createElement('div');
    ov.id = 'edit-ov';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999;';
    ov.innerHTML = `
      <div style="background:#fff;border-radius:12px;padding:2rem;width:90%;max-width:440px;position:relative;">
        <button onclick="document.getElementById('edit-ov').remove()"
          style="position:absolute;top:0.75rem;right:1rem;background:none;border:none;font-size:1.3rem;cursor:pointer;">✕</button>
        <h3 style="margin-bottom:1rem;font-family:'Oswald',sans-serif;color:#2a2f45;">Edit Member</h3>
        <div style="display:grid;gap:0.6rem;">
          <input id="e-name"  value="${m.name}"  style="padding:0.5rem;border:1px solid #ddd;border-radius:6px;">
          <input id="e-email" value="${m.email}" style="padding:0.5rem;border:1px solid #ddd;border-radius:6px;">
          <input id="e-phone" value="${m.phone}" style="padding:0.5rem;border:1px solid #ddd;border-radius:6px;">
          <select id="e-plan" style="padding:0.5rem;border:1px solid #ddd;border-radius:6px;">
            ${['Bronze','Silver','Gold'].map(p=>`<option ${m.plan===p?'selected':''}>${p}</option>`).join('')}
          </select>
          <input id="e-date" type="date" value="${m.date}" style="padding:0.5rem;border:1px solid #ddd;border-radius:6px;">
        </div>
        <div style="margin-top:1rem;display:flex;gap:0.75rem;">
          <button onclick="saveMember(${id})" class="btn btn-accent btn-sm">💾 Save</button>
          <button onclick="document.getElementById('edit-ov').remove()" class="btn btn-outline-admin btn-sm">Cancel</button>
        </div>
      </div>`;
    document.body.appendChild(ov);
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { ov.remove(); document.removeEventListener('keydown', esc); }
    });
  };

  window.saveMember = id => {
    const i = members.findIndex(m => m.id === id);
    members[i] = { ...members[i],
      name:  document.getElementById('e-name').value.trim(),
      email: document.getElementById('e-email').value.trim(),
      phone: document.getElementById('e-phone').value.trim(),
      plan:  document.getElementById('e-plan').value,
      date:  document.getElementById('e-date').value };
    save(members);
    document.getElementById('edit-ov').remove();
    render();
  };

  render();
});