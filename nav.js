
document.addEventListener('DOMContentLoaded', function () {

  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');   // show/hide the menu
    const isOpen = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen); // accessibility
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

});