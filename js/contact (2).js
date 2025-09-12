
// ==========================
// Sistema de Carrito
// ==========================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count, .cart-badge');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        if (element) element.textContent = totalItems;
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

// ==========================
// Menú móvil
// ==========================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
});

// ==========================
// Formulario de Contacto
// ==========================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulario
            if (validateForm()) {
                // Simular envío exitoso
                showNotification('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
                contactForm.reset();
            }
        });
    }
    
    // Validación en tiempo real
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
});

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    let isValid = true;
    let errorMessage = '';
    
    if (field.required && !value) {
        isValid = false;
        errorMessage = 'Este campo es obligatorio';
    } else if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Ingresa un email válido';
        }
    } else if (fieldName === 'phone' && value) {
        const phoneRegex = /^[0-9+\s()-]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Ingresa un teléfono válido';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

// Validar formulario completo
function validateForm() {
    const fields = document.querySelectorAll('#contactForm input[required], #contactForm textarea[required]');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Mostrar error en campo
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 0.8rem;
        margin-top: 5px;
    `;
    errorDiv.textContent = message;
    
    field.style.borderColor = '#dc3545';
    field.parentNode.appendChild(errorDiv);
}

// Limpiar error de campo
function clearFieldError(field) {
    field.style.borderColor = '';
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// ==========================
// Preguntas Frecuentes (Acordeón)
// ==========================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        
        question.addEventListener('click', function() {
            // Cerrar otros items abiertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar item actual
            item.classList.toggle('active');
        });
    });
    
    // Abrir primer item por defecto
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
});

// ==========================
// Notificaciones
// ==========================
function showNotification(message, type = 'info') {
    // Crear elemento de notificación si no existe
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            opacity: 0;
            transform: translateX(100px);
            transition: opacity 0.3s, transform 0.3s;
            max-width: 300px;
            font-weight: 500;
        `;
        document.body.appendChild(notification);
    }
    
    // Establecer color según tipo
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.style.color = 'white';
    notification.textContent = message;
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
    }, 5000);
}

// ==========================
// Interactividad del Mapa
// ==========================
document.addEventListener('DOMContentLoaded', function() {
    const map = document.querySelector('.map iframe');
    
    if (map) {
        // Agregar efecto de carga al mapa
        map.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.5s ease';
        });
        
        // Estilo inicial
        map.style.opacity = '0';
    }
});

// ==========================
// Efectos de Animación al Scroll
// ==========================
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.contact-card, .contact-form, .map-container, .faq-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Aplicar estilos iniciales para la animación
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
});

// ==========================
// Redirección al hacer clic en el carrito flotante
// ==========================
document.addEventListener('DOMContentLoaded', function() {
    const floatingCart = document.querySelector('.floating-cart');
    if (floatingCart) {
        floatingCart.addEventListener('click', function(e) {
            e.preventDefault();
            if (cart.length > 0) {
                window.location.href = 'compras.html';
            } else {
                showNotification('Tu carrito está vacío. ¡Añade algunos productos primero!', 'info');
            }
        });
    }
});

// ==========================
// Validación de Formulario en Tiempo Real
// ==========================
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.querySelector('input[type="tel"]');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Formatear número de teléfono
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '+503 ' + value;
            }
            
            e.target.value = value;
        });
    }
});

// Función para el menú móvil
    document.querySelector('.menu-toggle').addEventListener('click', function() {
      document.querySelector('.nav-links').classList.toggle('nav-active');
    });
    
    // Asegurar que los enlaces funcionen
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function(e) {
        // Si el enlace no tiene href o está vacío, prevenir comportamiento por defecto
        if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
          e.preventDefault();
        }
      });
    });

// ==========================
// Inicialización
// ==========================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de contacto inicializada');
    
    // Actualizar contador de carrito
    updateCartCount();
});












