
document.addEventListener('DOMContentLoaded', function () {

  // ── ELEMENTS ────────────────────────────────────────────────
  const form    = document.querySelector('.contact-form');
  const name    = document.getElementById('contact-name');
  const email   = document.getElementById('contact-email');
  const subject = document.getElementById('contact-subject');
  const message = document.getElementById('contact-message');

  // ── CHARACTER COUNTER (message only) ────────────────────────
  const counter = document.createElement('small');
  counter.style.cssText = 'color:var(--text-muted);font-size:0.78rem;float:right;';
  message.parentNode.appendChild(counter);
  message.addEventListener('input', () => {
    const len = message.value.length;
    counter.textContent = `${len} / 20 min`;
    counter.style.color = len >= 20 ? '#22c55e' : 'var(--text-muted)';
  });

  // ── HELPERS ─────────────────────────────────────────────────
  function showError(el, msg) {
    removeError(el);
    el.style.border = '2px solid #e94560';
    const s = document.createElement('span');
    s.className = 'field-error';
    s.textContent = msg;
    s.style.cssText = 'color:#e94560;font-size:0.8rem;margin-top:4px;display:block;';
    el.parentNode.appendChild(s);
  }

  function showSuccess(el) {
    removeError(el);
    el.style.border = '2px solid #22c55e';
  }

  function removeError(el) {
    el.style.border = '';
    const old = el.parentNode.querySelector('.field-error');
    if (old) old.remove();
  }

  // ── VALIDATION ──────────────────────────────────────────────
  function checkName()    {
    const v = name.value.trim();
    if (v.length < 2) { showError(name, 'Name must be at least 2 characters.'); return false; }
    showSuccess(name); return true;
  }
  function checkEmail()   {
    const v = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { showError(email, 'Enter a valid email.'); return false; }
    showSuccess(email); return true;
  }
  function checkSubject() {
    const v = subject.value.trim();
    if (v.length < 5) { showError(subject, 'Subject must be at least 5 characters.'); return false; }
    showSuccess(subject); return true;
  }
  function checkMessage() {
    const v = message.value.trim();
    if (v.length < 20) { showError(message, 'Message must be at least 20 characters.'); return false; }
    showSuccess(message); return true;
  }

  // ── REAL-TIME (blur) ────────────────────────────────────────
  name.addEventListener('blur',    checkName);
  email.addEventListener('blur',   checkEmail);
  subject.addEventListener('blur', checkSubject);
  message.addEventListener('blur', checkMessage);

  // ── SUBMIT ──────────────────────────────────────────────────
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const ok = checkName() & checkEmail() & checkSubject() & checkMessage();
    if (!ok) return;

    // Save to localStorage (simulated backend)
    const msg = {
      id: Date.now(),
      name: name.value.trim(),
      email: email.value.trim(),
      subject: subject.value.trim(),
      message: message.value.trim(),
      date: new Date().toLocaleString()
    };
    const all = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    all.push(msg);
    localStorage.setItem('contact_messages', JSON.stringify(all));

    form.reset();
    [name, email, subject, message].forEach(removeError);
    counter.textContent = '';
    showToast('Message sent! We will get back to you soon.');
  });

  // ── TOAST ───────────────────────────────────────────────────
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = '✅ ' + msg;
    toast.style.cssText = `
      position:fixed; bottom:2rem; right:2rem;
      background:#22c55e; color:#fff;
      padding:0.9rem 1.5rem; border-radius:10px;
      font-family:'Oswald',sans-serif; font-size:1rem;
      box-shadow:0 4px 20px rgba(0,0,0,0.3);
      z-index:9999; opacity:1; transition:opacity 0.5s;
    `;
    document.body.appendChild(toast);
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }

});