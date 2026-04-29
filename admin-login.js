
document.addEventListener('DOMContentLoaded', function () {

  // ── HARDCODED ADMIN CREDENTIALS ─────────────────────────────
  const ADMIN_USER = 'admin';
  const ADMIN_PASS = 'admin123';

  // ── ELEMENTS ────────────────────────────────────────────────
  const form    = document.querySelector('.login-form');
  const errBox  = document.getElementById('login-error');
  const okBox   = document.getElementById('login-success');

  // ── AUTO-LOGIN if remembered ────────────────────────────────
  if (localStorage.getItem('admin_logged') === 'yes') {
    window.location.href = 'admin-dashboard.html';
    return;
  } 

  // ── HANDLE LOGIN SUBMIT ─────────────────────────────────────
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value;
    const remember = document.getElementById('remember').checked;

    // Hide both messages first
    errBox.hidden = true;
    okBox.hidden  = true;

    // Check credentials
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // ✅ SUCCESS
      okBox.hidden = false;

      // Save session
      sessionStorage.setItem('admin_logged', 'yes');
      if (remember) localStorage.setItem('admin_logged', 'yes');

      // Redirect after 1 second
      setTimeout(() => { window.location.href = 'admin-dashboard.html'; }, 1000);
    } else {
      // ❌ FAILURE
      errBox.hidden = false;
    }
  });

});