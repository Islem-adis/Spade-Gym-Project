// admin-nav.js — Toggle sidebar on tablet/mobile

document.addEventListener('DOMContentLoaded', function () {
  const toggle  = document.querySelector('.admin-menu-toggle');
  const sidebar = document.querySelector('.admin-sidebar');
  if (!toggle || !sidebar) return;

  // Open/close sidebar
  toggle.addEventListener('click', e => {
    e.stopPropagation();
    sidebar.classList.toggle('open');
  });

  // Close when clicking outside the sidebar
  document.addEventListener('click', e => {
    if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });

  // Close when clicking a sidebar link
  sidebar.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => sidebar.classList.remove('open'));
  });
});