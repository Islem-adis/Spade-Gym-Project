
document.addEventListener('DOMContentLoaded', function () {

  // ── GRAB ELEMENTS ──────────────────────────────────────────
  const form       = document.querySelector('.membership-form');
  const fullName   = document.getElementById('full-name');
  const email      = document.getElementById('email');
  const phone      = document.getElementById('phone');
  const dob        = document.getElementById('dob');
  const planRadios = document.querySelectorAll('input[type="radio"]');
  const termsBox   = document.getElementById('terms');

  // ── HELPERS ────────────────────────────────────────────────
  function showError(input, msg) {
    removeError(input);
    input.style.border = '2px solid #e94560';
    const span = document.createElement('span');
    span.className = 'field-error';
    span.textContent = msg;
    span.style.cssText = 'color:#e94560; font-size:0.8rem; margin-top:4px; display:block;';
    input.parentNode.appendChild(span);
  }

  function showSuccess(input) {
    removeError(input);
    input.style.border = '2px solid #22c55e';
  }

  function removeError(input) {
    input.style.border = '';
    const old = input.parentNode.querySelector('.field-error');
    if (old) old.remove();
  }

  // ── VALIDATION ─────────────────────────────────────────────
  function checkName() {
    const val = fullName.value.trim();
    if (!val || !/^[A-Za-z\u00C0-\u017E\s]{3,}$/.test(val)) {
      showError(fullName, 'Full name required — letters only, min 3 characters.');
      return false;
    }
    showSuccess(fullName);
    return true;
  }

  function checkEmail() {
    const val = email.value.trim();
    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      showError(email, 'Please enter a valid email address.');
      return false;
    }
    showSuccess(email);
    return true;
  }

  function checkPhone() {
    const val = phone.value.trim();
    if (!val || !/^\+?[0-9\s\-]{8,15}$/.test(val)) {
      showError(phone, 'Phone must be 8-15 digits.');
      return false;
    }
    showSuccess(phone);
    return true;
  }

  function checkDOB() {
    const val = dob.value;
    if (!val) { showError(dob, 'Date of birth is required.'); return false; }
    const today = new Date(), birth = new Date(val);
    let age = today.getFullYear() - birth.getFullYear();
    if (today.getMonth() < birth.getMonth() ||
       (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age--;
    if (age < 16) { showError(dob, 'You must be at least 16 years old.'); return false; }
    showSuccess(dob);
    return true;
  }

  function checkPlan() {
    const group = document.querySelector('.radio-group');
    const old   = group.querySelector('.field-error');
    if ([...planRadios].some(r => r.checked)) { if (old) old.remove(); return true; }
    if (!old) {
      const span = document.createElement('span');
      span.className = 'field-error';
      span.textContent = 'Please select a membership plan.';
      span.style.cssText = 'color:#e94560; font-size:0.8rem; margin-top:4px; display:block;';
      group.appendChild(span);
    }
    return false;
  }

  function checkTerms() {
    const group = termsBox.parentNode.parentNode;
    const old   = group.querySelector('.field-error');
    if (termsBox.checked) { if (old) old.remove(); return true; }
    if (!old) {
      const span = document.createElement('span');
      span.className = 'field-error';
      span.textContent = 'You must accept the Terms & Conditions.';
      span.style.cssText = 'color:#e94560; font-size:0.8rem; margin-top:4px; display:block;';
      group.appendChild(span);
    }
    return false;
  }

  // ── SUBMIT ─────────────────────────────────────────────────
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const ok = checkName() & checkEmail() & checkPhone() & checkDOB() & checkPlan() & checkTerms();
    if (ok) showModal();
  });

  // ── SUCCESS MODAL ──────────────────────────────────────────
  function showModal() {
    const overlay = document.createElement('div');
    overlay.id = 'success-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;';

    overlay.innerHTML = `
      <div style="background: #141238; border:2px solid #22c55e;border-radius:16px;padding:2.5rem;max-width:420px;width:90%;text-align:center;">
        
        <h2 style="color:#22c55e;font-family:'Oswald',sans-serif;margin-bottom:0.5rem;">Registration Successful!</h2>
        <p style="color:#a4a6d3; margin-bottom:1.5rem;">Welcome to Spade GYM! Our team will contact you within 24 hours.</p>
        <button id="close-modal" style="background:#e0083a;color:#fff;border:none;padding:0.7rem 2rem;border-radius:999px;font-family:'Oswald',sans-serif;font-size:1rem;cursor:pointer;text-transform:uppercase;">Close</button>
      </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('close-modal').addEventListener('click', function () {
      document.getElementById('success-overlay').remove(); // removes the dark overlay completely
      form.reset();                                         // clears all form fields
      [fullName, email, phone, dob].forEach(removeError);  // removes green borders
    });
  }

});