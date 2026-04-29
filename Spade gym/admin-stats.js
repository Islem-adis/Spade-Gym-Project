
document.addEventListener('DOMContentLoaded', function () {

  // ── READ DATA FROM localStorage ─────────────────────────────
  const members = JSON.parse(localStorage.getItem('gym_members') || '[]');
  const classes = JSON.parse(localStorage.getItem('gym_classes') || '[]');

  // ── CALCULATE STATS ─────────────────────────────────────────
  const total      = members.length;
  const bronze     = members.filter(m => m.plan === 'Bronze').length;
  const silver     = members.filter(m => m.plan === 'Silver').length;
  const gold       = members.filter(m => m.plan === 'Gold').length;
  const popular    = [['Bronze',bronze],['Silver',silver],['Gold',gold]].sort((a,b)=>b[1]-a[1])[0][0];
  const perWeek    = classes.length;

  // ── UPDATE STAT CARDS ───────────────────────────────────────
  const cards = document.querySelectorAll('.stat-number');
  if (cards[0]) cards[0].textContent = total;               // Total Members
  if (cards[1]) cards[1].textContent = Math.round((silver + gold + bronze) * 0.75);
  if (cards[2]) cards[2].textContent = perWeek;             // Classes per week
//   if (cards[3]) cards[3].textContent = `⭐ ${popular}`;    // Most popular plan

  // Fix the label of card[3] to say "Most Popular Plan"
  const labels = document.querySelectorAll('.stat-label');
  if (labels[3]) labels[3].textContent = 'Most Popular Plan';

  // ── BAR CHART (Canvas) ──────────────────────────────────────
  const chartSec = document.createElement('section');
  chartSec.className = 'admin-section';
  chartSec.innerHTML = `
    <h2 class="admin-section-title">Members by Plan</h2>
    <div class="admin-card" style="padding:1.5rem;">
      <canvas id="plan-chart" height="180"></canvas>
    </div>`;
  document.querySelector('.admin-main').appendChild(chartSec);

  // Draw bar chart using Canvas API (no libraries)
  const canvas  = document.getElementById('plan-chart');
  const ctx     = canvas.getContext('2d');
  canvas.width  = canvas.parentElement.offsetWidth - 48;

  const data    = [['Bronze', bronze, '#cd7f32'], ['Silver', silver, '#aaa9ad'], ['Gold', gold, '#ffd700']];
  const max     = Math.max(...data.map(d => d[1]), 1);
  const barW    = canvas.width / 5;
  const gap     = (canvas.width - barW * 3) / 4;
  const topPad  = 30;
  const botPad  = 30;
  const chartH  = canvas.height - topPad - botPad;

  data.forEach(([label, val, color], i) => {
    const x = gap + i * (barW + gap);
    const h = (val / max) * chartH;
    const y = topPad + (chartH - h);

    // Bar
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, h, 6);
    ctx.fill();

    // Value on top
    ctx.fillStyle = '#2a2f45';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(val, x + barW / 2, y - 8);

    // Label below
    ctx.fillStyle = '#7f8c8d';
    ctx.font = '13px Arial';
    ctx.fillText(label, x + barW / 2, topPad + chartH + 20);
  });

});