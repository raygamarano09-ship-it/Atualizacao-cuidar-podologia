
    function openMenu() {
      document.getElementById('mobileMenu').classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      document.getElementById('mobileMenu').classList.remove('open');
      document.body.style.overflow = '';
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeMenu();
    });
