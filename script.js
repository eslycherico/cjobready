/*
 * Interactividad básica para Cjobready.
 * 1. Menú responsive: muestra/oculta la navegación en móviles.
 * 2. Scroll reveal: revela secciones cuando aparecen en la pantalla.
 */

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
    });
    // Cierra el menú al hacer clic en un enlace (modo móvil)
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          navToggle.classList.remove('active');
        }
      });
    });
  }

  // Scroll reveal: aplica animación a los elementos con atributo data-reveal
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  }
  // Divide el texto del encabezado principal en palabras y aplica una
  // animación escalonada a cada una. Utiliza la clase .word-animate
  // definida en CSS para generar un efecto fade-in ascendente.
  const heroHeading = document.querySelector('.hero-text h1');
  if (heroHeading) {
    const original = heroHeading.textContent.trim();
    const words = original.split(/\s+/);
    heroHeading.innerHTML = '';
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word + (index < words.length - 1 ? ' ' : '');
      span.classList.add('word-animate');
      // Incremental delay to create a slower, more dramatic cascading effect
      span.style.animationDelay = `${index * 0.3}s`;
      heroHeading.appendChild(span);
    });
  }
});