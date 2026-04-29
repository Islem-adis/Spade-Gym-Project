
document.addEventListener('DOMContentLoaded', function () {

  // ── DATA ────────────────────────────────────────────────────
  const classes = [
    { name: 'HIIT Blast',              trainer: 'Karim Mansouri', day: 'Monday',    time: '18:00', duration: 45, difficulty: 'Advanced'    },
    { name: 'Pilates Core',            trainer: 'Sara Benali',    day: 'Tuesday',   time: '10:00', duration: 55, difficulty: 'Beginner'     },
    { name: 'Boxing Fundamentals',     trainer: 'Yacine Ferhat',  day: 'Wednesday', time: '17:00', duration: 60, difficulty: 'Intermediate' },
    { name: 'CrossFit WOD',            trainer: 'Karim Mansouri', day: 'Thursday',  time: '06:30', duration: 60, difficulty: 'Advanced'     },
    { name: 'Strength & Conditioning', trainer: 'Yacine Ferhat',  day: 'Friday',    time: '17:30', duration: 75, difficulty: 'Advanced'     },
    { name: 'Kickboxing',              trainer: 'Yacine Ferhat',  day: 'Saturday',  time: '11:00', duration: 60, difficulty: 'Intermediate' },
    { name: 'Sunday Stretch',          trainer: 'Lina Chouiref',  day: 'Sunday',    time: '10:00', duration: 45, difficulty: 'Beginner'     },
  ];

  // ── STATE ───────────────────────────────────────────────────
  let filterTrainer    = 'All';
  let filterDay        = 'All';
  let filterDifficulty = 'All';
  let sortCol          = null;
  let sortAsc          = true;

  // ── BUILD FILTER UI ─────────────────────────────────────────
  const filterContainer = document.querySelector('.filter-section .container');
  filterContainer.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;">

      <select id="f-trainer" style="background:var(--card);color:var(--text);border:1px solid var(--border);border-radius:8px;padding:0.4rem 0.8rem;">
        <option value="All">All Trainers</option>
        ${[...new Set(classes.map(c => c.trainer))].map(t => `<option>${t}</option>`).join('')}
      </select>

      <select id="f-day" style="background:var(--card);color:var(--text);border:1px solid var(--border);border-radius:8px;padding:0.4rem 0.8rem;">
        <option value="All">All Days</option>
        ${['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => `<option>${d}</option>`).join('')}
      </select>

      <div id="f-diff" style="display:flex;gap:0.4rem;">
        ${['All','Beginner','Intermediate','Advanced'].map((d,i) =>
          `<button class="btn btn-sm ${i===0?'btn-accent':'btn-outline'}" data-diff="${d}">${d}</button>`
        ).join('')}
      </div>

      <button id="f-reset" class="btn btn-sm btn-outline">✕ Reset</button>
    </div>
    <p id="f-count" style="margin-top:0.6rem;font-size:0.85rem;color:var(--text-muted);"></p>
  `;

  // ── ELEMENTS ────────────────────────────────────────────────
  const tbody      = document.querySelector('#classes-table tbody');
  const ths        = document.querySelectorAll('#classes-table thead th');
  const diffBtns   = document.querySelectorAll('#f-diff button');
  const countLabel = document.getElementById('f-count');

  // ── SORTABLE COLUMNS (index → data key) ─────────────────────
  const sortMap = { 0: 'name', 1: 'trainer', 2: 'day', 5: 'difficulty' };
  ths.forEach((th, i) => {
    if (!sortMap[i]) return;
    th.style.cursor = 'pointer';
    th.dataset.col  = sortMap[i];
    th.innerHTML   += ' <span style="font-size:0.7rem;opacity:0.5;">▲▼</span>';
    th.addEventListener('click', () => {
      sortAsc = sortCol === sortMap[i] ? !sortAsc : true;
      sortCol = sortMap[i];
      // update arrows
      ths.forEach(t => { if (t.querySelector('span')) t.querySelector('span').textContent = ' ▲▼'; });
      th.querySelector('span').textContent = sortAsc ? ' ▲' : ' ▼'; 
      render();
    });
  });

  // ── FILTER EVENTS ───────────────────────────────────────────
  document.getElementById('f-trainer').addEventListener('change', e => { filterTrainer = e.target.value; render(); });
  document.getElementById('f-day').addEventListener('change',     e => { filterDay     = e.target.value; render(); });

  diffBtns.forEach(btn => btn.addEventListener('click', () => {
    filterDifficulty = btn.dataset.diff;
    diffBtns.forEach(b => { b.classList.replace('btn-accent','btn-outline'); });
    btn.classList.replace('btn-outline','btn-accent');
    render();
  }));

  document.getElementById('f-reset').addEventListener('click', () => {
    filterTrainer = filterDay = filterDifficulty = 'All';
    sortCol = null; sortAsc = true;
    document.getElementById('f-trainer').value = 'All';
    document.getElementById('f-day').value     = 'All';
    diffBtns.forEach((b,i) => { b.className = `btn btn-sm ${i===0?'btn-accent':'btn-outline'}`; });
    ths.forEach(t => { if (t.querySelector('span')) t.querySelector('span').textContent = ' ▲▼'; });
    render();
  });

  // ── RENDER ──────────────────────────────────────────────────
  function render() {
    // 1. Filter
    let rows = classes.filter(c =>
      (filterTrainer    === 'All' || c.trainer    === filterTrainer)    &&
      (filterDay        === 'All' || c.day        === filterDay)        &&
      (filterDifficulty === 'All' || c.difficulty === filterDifficulty)
    );

    // 2. Sort
    if (sortCol) rows.sort((a, b) => {
      let A = a[sortCol], B = b[sortCol];
      if (typeof A === 'number') return sortAsc ? A - B : B - A;
      return sortAsc ? A.localeCompare(B) : B.localeCompare(A);
    });

    // 3. Draw rows
    tbody.innerHTML = rows.length
      ? rows.map(c => `
          <tr>
            <td>${c.name}</td>
            <td>${c.trainer}</td>
            <td>${c.day}</td>
            <td>${c.time}</td>
            <td>${c.duration} min</td>
            <td><span class="badge badge-${c.difficulty.toLowerCase()}">${c.difficulty}</span></td>
            <td><a href="#" class="btn btn-xs btn-outline">View</a></td>
          </tr>`).join('')
      : `<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--text-muted);">No classes found.</td></tr>`;

    countLabel.textContent = `Showing ${rows.length} of ${classes.length} classes`;
  }

  render(); // first load

});