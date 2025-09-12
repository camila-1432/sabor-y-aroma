// ==========================
// Sistema de Carrito
// ==========================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count, .cart-badge');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        if (element) element.textContent = totalItems;
    });
    
    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para mostrar notificación
function showNotification(message) {
    // Crear elemento de notificación si no existe
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #6E473B;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            opacity: 0;
            transform: translateX(100px);
            transition: opacity 0.3s, transform 0.3s;
            max-width: 300px;
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
    }, 3000);
}

// ==========================
// Configuración de botones "Añadir al Carrito"
// ==========================
function setupCartButtons() {
    const cartButtons = document.querySelectorAll('.btn-add-cart');
    
    if (cartButtons.length === 0) {
        console.log('No se encontraron botones "Añadir al Carrito"');
        return;
    }
    
    cartButtons.forEach(btn => {
        // Eliminar event listeners previos para evitar duplicados
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });
    
    // Volver a seleccionar los botones después de clonarlos
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = parseFloat(this.getAttribute('data-price'));
            const quantity = 1;
            
            console.log(`Añadiendo producto: ${product}, Precio: ${price}`);
            
            // Buscar si el producto ya está en el carrito
            const existingItem = cart.find(item => item.name === product);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    name: product,
                    price: price,
                    quantity: quantity
                });
            }
            
            updateCartCount();
            
            // Mostrar mensaje de confirmación
            showNotification(`¡${quantity} ${product}(s) añadido(s) al carrito!`);
            
            // Efecto visual en el botón
            const originalHTML = this.innerHTML;
            const originalBg = this.style.background;
            this.innerHTML = '<i class="fas fa-check"></i> Añadido';
            this.style.background = '#BE85A9';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.background = originalBg;
                this.disabled = false;
            }, 1500);
        });
    });
    
    console.log(`Configurados ${cartButtons.length} botones de carrito`);
}

// ==========================
// Menú móvil
// ==========================
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
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
    }
}

// ==========================
// Carrusel de Postres
// ==========================
function setupCarousel() {
    const carrusel = document.querySelector(".carrusel");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    if (carrusel && prevBtn && nextBtn) {
        let currentPosition = 0;
        const itemWidth = 270;
        const totalItems = document.querySelectorAll('.carrusel-item').length;
        
        // Calcular elementos visibles basado en el ancho del contenedor
        const getVisibleItems = () => Math.floor(carrusel.parentElement.clientWidth / itemWidth);
        let visibleItems = getVisibleItems();
        
        nextBtn.addEventListener("click", () => {
            if (currentPosition < totalItems - visibleItems) {
                currentPosition++;
                carrusel.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
            }
        });

        prevBtn.addEventListener("click", () => {
            if (currentPosition > 0) {
                currentPosition--;
                carrusel.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
            }
        });

        // Ajustar en redimensionamiento de ventana
        window.addEventListener('resize', () => {
            visibleItems = getVisibleItems();
            if (currentPosition > totalItems - visibleItems) {
                currentPosition = Math.max(0, totalItems - visibleItems);
                carrusel.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
            }
        });
        
        // Inicializar cursor
        carrusel.style.cursor = 'grab';
    }
}

// ==========================
// Carrusel táctil para móviles
// ==========================
function setupTouchCarousel() {
    const carrusel = document.querySelector(".carrusel");
    
    if (carrusel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        carrusel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carrusel.offsetLeft;
            scrollLeft = carrusel.scrollLeft;
            carrusel.style.cursor = 'grabbing';
        });

        carrusel.addEventListener('mouseleave', () => {
            isDown = false;
            carrusel.style.cursor = 'grab';
        });

        carrusel.addEventListener('mouseup', () => {
            isDown = false;
            carrusel.style.cursor = 'grab';
        });

        carrusel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carrusel.offsetLeft;
            const walk = (x - startX) * 2;
            carrusel.scrollLeft = scrollLeft - walk;
        });

        // Soporte para touch
        carrusel.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - carrusel.offsetLeft;
            scrollLeft = carrusel.scrollLeft;
        });

        carrusel.addEventListener('touchend', () => {
            isDown = false;
        });

        carrusel.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - carrusel.offsetLeft;
            const walk = (x - startX) * 2;
            carrusel.scrollLeft = scrollLeft - walk;
        });
    }
}

// ==========================
// Redirección al hacer clic en el carrito flotante - CORREGIDO
// ==========================
function setupFloatingCart() {
    const floatingCart = document.querySelector('.floating-cart');
    if (floatingCart) {
        floatingCart.addEventListener('click', function(e) {
            e.preventDefault();
            if (cart.length > 0) {
                // Cambiado a "compras (2).html" para que coincida con tu archivo
                window.location.href = 'compras (2).html';
            } else {
                showNotification('Tu carrito está vacío. ¡Añade algunos productos primero!');
            }
        });
    }
}

// ==========================
// Inicialización completa
// ==========================
function initApp() {
    console.log('Inicializando aplicación...');
    
    // Actualizar contador de carrito
    updateCartCount();
    
    // Configurar todas las funcionalidades
    setupMobileMenu();
    setupCarousel();
    setupTouchCarousel();
    setupFloatingCart();
    setupCartButtons();
    
    console.log('Aplicación inicializada correctamente');
}

// ==========================
// Ejecutar cuando el DOM esté completamente cargado
// ==========================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
















