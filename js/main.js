document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('mainNavbar');
  
  // Función para manejar el scroll del navbar
  function handleNavbarScroll() {
    if (window.scrollY > 100) {
      navbar.classList.add('navbar-scrolled');
      navbar.classList.remove('navbar-transparent');
    } else {
      navbar.classList.remove('navbar-scrolled');
      navbar.classList.add('navbar-transparent');
    }
  }

  // Escuchar el evento scroll
  window.addEventListener('scroll', handleNavbarScroll);

  // Cerrar el menú móvil al hacer clic en un enlace
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.getElementById('navbarContent');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: true
        });
      }
    });
  });

  // Smooth scroll para los enlaces de navegación
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Solo aplicar smooth scroll a enlaces internos
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const navbarHeight = navbar.offsetHeight;
          const targetPosition = targetSection.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Actualizar enlace activo según la sección visible
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - navbar.offsetHeight - 50;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
}); v 