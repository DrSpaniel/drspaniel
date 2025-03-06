document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.sidebar a[data-content]');
  const sections = document.querySelectorAll('.content-section');
  const submenuToggles = document.querySelectorAll('.submenu-toggle');

  links.forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault();
          sections.forEach(section => section.style.display = 'none');
          document.getElementById(link.dataset.content).style.display = 'block';
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
      });
  });

  submenuToggles.forEach(toggle => {
      toggle.addEventListener('click', function(event) {
          event.preventDefault();
          const submenu = toggle.nextElementSibling;
          submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
      });
  });

  // Show the "Who Am I" section by default
  document.getElementById('who-am-i').style.display = 'block';
});
