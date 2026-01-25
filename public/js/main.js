import { inventario, JuegoEstrategia } from './tienda.js';

//SELECTORES
const contenedor = document.getElementById('lista-productos');
const carritoContenedor = document.getElementById('carrito');
const form = document.querySelector('aside form');

//ESTADO 
const carrito = new Map();

//RENDER TIENDA
export function renderizarTienda(productos) {
    contenedor.innerHTML = ''; // Limpiamos lo que haya

    productos.forEach(juego => {
        const card = document.createElement('div');
        card.className = 'card m-2';
        card.style.width = '12rem';
        card.innerHTML = `
            <img src="${juego.imagen}" class="card-img-top" alt="${juego.nombre}">
            <div class="card-body">
                <h5 class="card-title">${juego.nombre}</h5>
                <p class="card-text">${juego.descripcion}</p>
                <p class="card-text"><strong>${juego.precio}€</strong></p>
                <button class="btn btn-primary w-100 btn-agregar" data-id="${juego.id}">
                    Añadir al carrito
                </button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// RENDER CARRITO
function renderizarCarrito() {
    carritoContenedor.innerHTML = '';
    let total = 0;

    // Recorremos el Map
    carrito.forEach((item, id) => {
        total += item.precio * item.cantidad;
        
        const div = document.createElement('div');
        // Añadimos 'mb-3' para separación entre items y 'p-3' para que el texto no toque el borde del div
        div.className = 'carrito-item d-flex justify-content-between align-items-center mb-3 p-3 shadow-sm'; 
        
        div.innerHTML = `
            <div class="d-flex flex-column">
                <strong class="item-nombre" style="color: #4b2e83; font-size: 1.1rem;">${item.nombre}</strong>
                <span class="item-info text-muted">
                    ${item.cantidad} unidades x ${item.precio.toFixed(2)}€
                </span>
            </div>
            <button class="btn-eliminar" data-id="${id}" title="Eliminar producto">✕</button>
        `;
        carritoContenedor.appendChild(div);
    });

    // Si el carrito está vacío
    if (carrito.size === 0) {
        carritoContenedor.innerHTML = `
            <div class="text-center mt-5 py-5">
                <p style="font-size: 4rem; opacity: 0.6;">🛒</p>
                <p class="text-muted fw-bold">¡Tu carrito está vacío!</p>
                <p class="small text-muted">Añade algún juego para empezar.</p>
            </div>`;
    } else {
        // Sección de total y vaciar
        const footer = document.createElement('div');
        // 'mt-4' separa el total de la lista de productos; 'p-3' le da margen interno
        footer.className = 'total-seccion mt-4 p-3 bg-white rounded shadow-sm';
        footer.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <span style="font-weight:700; font-size: 1.1rem; color: #555;">Subtotal:</span>
                <span style="font-weight:700; font-size: 1.4rem; color: #9a50cc;">${total.toFixed(2)}€</span>
            </div>
            <button id="vaciar-carrito" class="btn btn-outline-danger w-100 py-2 fw-bold">
                🗑️ Vaciar Carrito
            </button>
        `;
        carritoContenedor.appendChild(footer);
    }
}

// EVENTO AÑADIR AL CARRITO
contenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-agregar')) {
        const id = e.target.dataset.id;
        const juego = inventario.find(j => j.id === id);

        if (juego) {
            if (carrito.has(id)) {
                carrito.get(id).cantidad++;
            } else {
                carrito.set(id, { 
                    nombre: juego.nombre, 
                    precio: juego.precio, 
                    cantidad: 1 
                });
            }
            renderizarCarrito();
            // Abrir el carrito automáticamente (opcional)
            const elCarrito = document.getElementById('carrito');
            const instance = bootstrap.Offcanvas.getOrCreateInstance(elCarrito);
            instance.show();
        }
    }
});

// EVENTOS DENTRO DEL CARRITO (ELIMINAR Y VACIAR)
carritoContenedor.addEventListener('click', (e) => {
    
    // Si pulsamos el botón de eliminar un producto
    if (e.target.classList.contains('btn-eliminar')) {
        const id = e.target.dataset.id;
        
        // Si hay más de uno, restamos cantidad. Si solo hay uno, borramos la entrada.
        if (carrito.get(id).cantidad > 1) {
            carrito.get(id).cantidad--;
        } else {
            carrito.delete(id);
        }
        
        renderizarCarrito();
    }

    // Si pulsamos el botón de vaciar todo
    if (e.target.id === 'vaciar-carrito') {
        if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
            carrito.clear(); // Borra todo el contenido del Map
            renderizarCarrito();
        }
    }
});

// EVENTO FORMULARIO (AÑADIR PRODUCTO NUEVO)
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input, textarea');
    const inputFoto = form.querySelector('input[type="file"]'); // Seleccionamos el input de archivo

    const nombre = inputs[0].value;
    const precio = parseFloat(inputs[1].value);
    const desc = inputs[2].value;
    
    // --- LÓGICA PARA LA FOTO ---
    let urlImagen = "imagenes/default.png"; // Imagen por defecto
    
    if (inputFoto.files && inputFoto.files[0]) {
        // Creamos una URL temporal que el navegador puede leer
        urlImagen = URL.createObjectURL(inputFoto.files[0]);
    }
    // ---------------------------

    if (nombre && !isNaN(precio)) {
        // Ahora pasamos 'urlImagen' en lugar de la ruta fija
        const nuevo = new JuegoEstrategia(nombre, precio, desc, urlImagen, "Media");
        
        inventario.push(nuevo);
        renderizarTienda(inventario);
        form.reset();
    } else {
        alert("Por favor, introduce un nombre y un precio válido.");
    }
});

// INICIO AL CARGAR
renderizarTienda(inventario);
renderizarCarrito();
