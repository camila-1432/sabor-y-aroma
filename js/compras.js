// compras.js - Funcionalidad para la página de compras

document.addEventListener('DOMContentLoaded', function() {
    // Cargar productos del carrito desde localStorage (COMPATIBLE CON TU MENÚ)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productosLista = document.getElementById('productos-lista');
    const subtotalElement = document.getElementById('subtotal');
    const impuestosElement = document.getElementById('impuestos');
    const totalElement = document.getElementById('total');
    
    // Actualizar contadores del carrito (COMPATIBLE CON TU MENÚ)
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('.cart-count, .cart-badge').forEach(element => {
            element.textContent = totalItems;
        });
    }
    
    // Mostrar productos en el carrito
    function mostrarProductos() {
        productosLista.innerHTML = '';
        
        if (cart.length === 0) {
            productosLista.innerHTML = '<p class="carrito-vacio">No hay productos en tu carrito</p>';
            return;
        }
        
        cart.forEach(producto => {
            const productoElement = document.createElement('div');
            productoElement.classList.add('producto-item');
            productoElement.innerHTML = `
                <div class="producto-info">
                    <div class="producto-nombre">${producto.name}</div>
                    <div class="producto-cantidad">Cantidad: ${producto.quantity}</div>
                </div>
                <div class="producto-precio">$${(producto.price * producto.quantity).toFixed(2)}</div>
            `;
            productosLista.appendChild(productoElement);
        });
        
        calcularTotales();
    }
    
    // Calcular totales
    function calcularTotales() {
        const subtotal = cart.reduce((total, producto) => total + (producto.price * producto.quantity), 0);
        const impuestos = subtotal * 0.13; // 13% de impuestos
        const total = subtotal + impuestos;
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        impuestosElement.textContent = `$${impuestos.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Manejar envío del formulario
    const formularioCompra = document.getElementById('formulario-compra');
    
    formularioCompra.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (cart.length === 0) {
            alert('No hay productos en tu carrito. Agrega productos antes de completar la compra.');
            return;
        }
        
        // Recopilar datos del formulario
        const formData = new FormData(formularioCompra);
        const datosCompra = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            direccion: formData.get('direccion'),
            notas: formData.get('notas'),
            metodoPago: formData.get('metodo-pago'),
            productos: cart,
            subtotal: parseFloat(subtotalElement.textContent.replace('$', '')),
            impuestos: parseFloat(impuestosElement.textContent.replace('$', '')),
            total: parseFloat(totalElement.textContent.replace('$', ''))
        };
        
        // Aquí normalmente enviarías los datos a un servidor
        console.log('Datos de compra:', datosCompra);
        
        // Simular proceso de compra
        alert('¡Compra realizada con éxito! En breve recibirás un correo con los detalles de tu pedido.');
         // Limpiar carrito (COMPATIBLE CON TU MENÚ)
        localStorage.removeItem('cart');
        window.location.href = 'index.html'; // Redirigir a inicio
    });
    
    // Configurar menú móvil (COMPATIBLE CON TU MENÚ)
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
    
    // Inicializar página
    mostrarProductos();
    updateCartCount();
    setupMobileMenu();
});





























