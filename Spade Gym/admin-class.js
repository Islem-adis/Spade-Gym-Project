
document.addEventListener('DOMContentLoaded', function () {

  // ── DATA ────────────────────────────────────────────────────
  const seed = [
    { id:1, name:'HIIT Blast',              trainer:'Karim Mansouri', day:'Monday',    time:'18:00', duration:45, difficulty:'Advanced',    capacity:20 },
    { id:2, name:'Pilates Core',            trainer:'Sara Benali',    day:'Tuesday',   time:'10:00', duration:55, difficulty:'Beginner',     capacity:15 },
    { id:3, name:'Boxing Fundamentals',     trainer:'Yacine Ferhat',  day:'Wednesday', time:'17:00', duration:60, difficulty:'Intermediate', capacity:18 },
    { id:4, name:'CrossFit WOD',            trainer:'Karim Mansouri', day:'Thursday',  time:'06:30', duration:60, difficulty:'Advanced',    capacity:20 },
    { id:5, name:'Strength & Conditioning', trainer:'Yacine Ferhat',  day:'Friday',    time:'17:30', duration:75, difficulty:'Advanced',    capacity:15 },
    { id:6, name:'Kickboxing',              trainer:'Yacine Ferhat',  day:'Saturday',  time:'11:00', duration:60, difficulty:'Intermediate', capacity:18 },
    { id:7, name:'Sunday Stretch',          trainer:'Lina Chouiref',  day:'Sunday',    time:'10:00', duration:45, difficulty:'Beginner',     capacity:25 },
  ];
  const load = () => JSON.parse(localStorage.getItem('gym_classes') || 'null') || seed;
  const save = d  => localStorage.setItem('gym_classes', JSON.stringify(d));

  let classes = load();
  if (!localStorage.getItem('gym_classes')) save(classes);


  // ── RENDER ──────────────────────────────────────────────────
  function render() {
    document.getElementById('classes-tbody').innerHTML = classes.map(c => `
      <tr>
        <td>${c.name}</td><td>${c.trainer}</td><td>${c.day}</td><td>${c.time}</td>
        <td>${c.duration} min</td>
        <td><span class="badge badge-${c.difficulty.toLowerCase()}">${c.difficulty}</span></td>
        <td>${c.capacity}</td>
        <td>
          <button class="btn btn-xs btn-edit"   onclick="editClass(${c.id})">✏️ Edit</button>
          <button class="btn btn-xs btn-delete" onclick="delClass(${c.id})">🗑️ Delete</button>
        </td>
      </tr>`).join('');
  }

  // ── ADD ─────────────────────────────────────────────────────
  document.getElementById('add-class-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name    = document.getElementById('c-name').value.trim();
    const trainer = document.getElementById('c-trainer').value;
    const day     = document.getElementById('c-day').value;
    const time    = document.getElementById('c-time').value;
    if (!name || !time) { alert('Name and Time are required.'); return; }

    // Duplicate check: same trainer + day + time
    if (classes.some(c => c.trainer === trainer && c.day === day && c.time === time)) {
      alert('Duplicate! This trainer already has a class on that day and time.'); return;
    }

    classes.unshift({ id: Date.now(), name, trainer, day, time,
      duration:   parseInt(document.getElementById('c-duration').value)  || 60,
      difficulty: document.getElementById('c-diff').value,
      capacity:   parseInt(document.getElementById('c-capacity').value)  || 20 });
    save(classes); this.reset(); render();
  });

  // ── DELETE ──────────────────────────────────────────────────
  window.delClass = id => {
    if (!confirm('Delete this class?')) return;
    classes = classes.filter(c => c.id !== id);
    save(classes); render();
  };

  // ── EDIT MODAL ──────────────────────────────────────────────
  window.editClass = id => {
    const c = classes.find(c => c.id === id);
    const ov = document.createElement('div');
    ov.id = 'class-ov';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999;overflow-y:auto;';
    const days      = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const diffs     = ['Beginner','Intermediate','Advanced'];
    const trainers  = ['Karim Mansouri','Sara Benali','Yacine Ferhat','Lina Chouiref','Amira Khelifi','Bilal Tabet'];
    const sel = (opts, val) => opts.map(o=>`<option ${o===val?'selected':''}>${o}</option>`).join('');
    ov.innerHTML = `
      <div style="background:#fff;border-radius:12px;padding:2rem;width:90%;max-width:460px;position:relative;margin:2rem auto;">
        <button onclick="document.getElementById('class-ov').remove()"
          style="position:absolute;top:0.75rem;right:1rem;background:none;border:none;font-size:1.3rem;cursor:pointer;">✕</button>
        <h3 style="margin-bottom:1rem;font-family:'Oswald',sans-serif;color:#2a2f45;">Edit Class</h3>
        <div style="display:grid;gap:0.6rem;">
          <input  id="ec-name"     value="${c.name}"     style="padding:0.5rem;border:1px solid #ddd;border-radius:6px;">
          <select id="ec-trainer"  style="padding:0.5rem;border:1px solid #ddd;border-radius:6px;">${sel(trainers,c.trainer)}</select>
          <select id="ec-day"      style="padding:0.5rem;border:1px solid #ddd;border-radius:6px;">${sel(days,c.day)}</select>
          <input  id="ec-time"     type="time" value="${c.time}"     style="padding:0.5rem;border:1px solid #ddd;border-radius:6px;">
          <input  id="ec-duration" type="number" value="${c.duration}" style="padding:0.5rem;border:1px solid #ddd;border-radius:6px;">
          <select id="ec-diff"     style="padding:0.5rem;border:1px solid #ddd;border-radius:6px;">${sel(diffs,c.difficulty)}</select>
          <input  id="ec-capacity" type="number" value="${c.capacity}" style="padding:0.5rem;border:1px solid #ddd;border-radius:6px;">
        </div>
        <div style="margin-top:1rem;display:flex;gap:0.75rem;">
          <button onclick="saveClass(${id})" class="btn btn-accent btn-sm">💾 Save</button>
          <button onclick="document.getElementById('class-ov').remove()" class="btn btn-outline-admin btn-sm">Cancel</button>
        </div>
      </div>`;
    document.body.appendChild(ov);
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { ov.remove(); document.removeEventListener('keydown', esc); }
    });
  };

  window.saveClass = id => {
    const i = classes.findIndex(c => c.id === id);
    classes[i] = { ...classes[i],
      name:       document.getElementById('ec-name').value.trim(),
      trainer:    document.getElementById('ec-trainer').value,
      day:        document.getElementById('ec-day').value,
      time:       document.getElementById('ec-time').value,
      duration:   parseInt(document.getElementById('ec-duration').value) || 60,
      difficulty: document.getElementById('ec-diff').value,
      capacity:   parseInt(document.getElementById('ec-capacity').value) || 20 };
    save(classes);
    document.getElementById('class-ov').remove();
    render();
  };

  render();
});
