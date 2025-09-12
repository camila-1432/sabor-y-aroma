// ==========================
// Navbar Smooth Scroll
// ==========================
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        // Eliminar clase activa de todos
        navLinks.forEach(l => l.classList.remove('active'));

        // Agregar clase activa al seleccionado
        link.classList.add('active');

        // Scroll suave al target
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ==========================
// Animación de aparición de productos
// ==========================
const productRows = document.querySelectorAll('.product-row');

function revealProducts() {
    const windowHeight = window.innerHeight;

    productRows.forEach(row => {
        const elementTop = row.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            row.classList.add('show');
        }
    });
}

window.addEventListener('scroll', revealProducts);
window.addEventListener('load', revealProducts);

// ==========================
// Animación de aparición de cards (opcional si usas cards separadas)
// ==========================
const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));

// ==========================
// Partículas flotando en Hero
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
// Animación de flotación CSS
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
