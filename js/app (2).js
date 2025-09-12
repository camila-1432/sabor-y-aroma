

// ==========================
// MENÚ MÓVIL
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      menuToggle.innerHTML = navLinksContainer.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Cerrar menú al dar clic en un enlace
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
});

// ==========================
// NAVBAR - SMOOTH SCROLL + ACTIVE LINK
// ==========================
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    // Solo aplicar scroll suave para enlaces internos en la misma página
    if (link.getAttribute('href').startsWith('#')) {
      e.preventDefault();

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ==========================
// SCROLL INTERNO SUAVE (para #id) - CORREGIDO
// ==========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    
    // Solo procesar si es un hash que existe en la página actual
    if (targetId === '#' || targetId === '#!') return;
    
    // Verificar si el elemento objetivo existe en esta página
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    // Si no existe, permitir que el navegador maneje el enlace normalmente
  });
});

// ==========================
// EFECTOS DE ANIMACIÓN AL SCROLL (secciones .feature)
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  const features = document.querySelectorAll('.feature');
  const featureObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  features.forEach(feature => {
    feature.style.opacity = 0;
    feature.style.transform = 'translateY(20px)';
    feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    featureObserver.observe(feature);
  });

  // VIDEO DE FONDO (asegurar autoplay en móviles)
  const video = document.querySelector('.bg-video');
  if (video) {
    video.playsInline = true;
    video.muted = true;
    video.play().catch(err => console.log('Autoplay falló:', err));
  }
});

// ==========================
// VIDEO FALLBACK (imagen si falla)
// ==========================
window.addEventListener('load', () => {
  const video = document.querySelector('.bg-video');
  if (video && video.readyState === 4 && video.error) {
    const hero = document.querySelector('.hero');
    hero.style.backgroundImage = 'url("imagenes/hero-background.jpg")';
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundPosition = 'center';
  }
});

// ==========================
// ANIMACIÓN DE PRODUCTOS
// ==========================
const productRows = document.querySelectorAll('.product-row');
function revealProducts() {
  const windowHeight = window.innerHeight;
  productRows.forEach(row => {
    const elementTop = row.getBoundingClientRect().top;
    if (elementTop < windowHeight - 150) {
      row.classList.add('show');
    }
  });
}
window.addEventListener('scroll', revealProducts);
window.addEventListener('load', revealProducts);

// ==========================
// ANIMACIÓN DE CARDS
// ==========================
const cards = document.querySelectorAll(".card");
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.2 });
cards.forEach(card => cardObserver.observe(card));

// ==========================
// PARTÍCULAS EN HERO
// ==========================
const particlesContainer = document.createElement("div");
particlesContainer.classList.add("particles");
document.querySelector(".hero").appendChild(particlesContainer);

for (let i = 0; i < 30; i++) {
  const particle = document.createElement("span");
  particle.style.position = "absolute";
  particle.style.width = "8px";
  particle.style.height = "8px";
  particle.style.borderRadius = "50%";
  particle.style.background = "rgba(212,175,55,0.8)";
  particle.style.left = Math.random() * 100 + "vw";
  particle.style.top = Math.random() * 100 + "vh";
  particle.style.animation = `float ${3 + Math.random() * 5}s linear infinite`;
  particlesContainer.appendChild(particle);
}

// ==========================
// ANIMACIÓN FLOAT CSS (partículas)
// ==========================
const style = document.createElement("style");
style.textContent = `
@keyframes float {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-120vh); opacity: 0; }
}
.particles span {
  pointer-events: none;
}
`;
document.head.appendChild(style);



















