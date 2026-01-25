import { inventario, JuegoEstrategia } from './tienda.js';

// SELECTORES
const contenedor = document.getElementById('lista-productos');
const carritoContenedor = document.getElementById('carrito-body'); 
const form = document.querySelector('aside form');

// ESTADO
const carrito = new Map();

// RENDER TIENDA
export function renderizarTienda(productos) {
    contenedor.innerHTML = ''; 

    productos.forEach(juego => {
        const itemEnCarrito = carrito.get(juego.id);
        const alcanzadoMaximo = itemEnCarrito && itemEnCarrito.cantidad >= 20;

        const card = document.createElement('div');
        card.className = 'card m-2 card-producto-tienda'; // Clase personalizada
        card.innerHTML = `
            <img src="${juego.imagen}" class="card-img-top" alt="${juego.nombre}">
            <div class="card-body">
                <h5 class="card-title">${juego.nombre}</h5>
                <p class="card-text descripcion-juego">${juego.descripcion}</p>
                <p class="card-text"><strong>${juego.precio}€</strong></p>
                <button class="btn btn-primary w-100 btn-agregar" 
                        data-id="${juego.id}" 
                        ${alcanzadoMaximo ? 'disabled' : ''}>
                    ${alcanzadoMaximo ? 'Máximo alcanzado' : 'Añadir al carrito'}
                </button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// RENDER CARRITO
function renderizarCarrito() {
    carritoContenedor.innerHTML = '';
    let totalCarrito = 0;

    if (carrito.size === 0) {
        carritoContenedor.innerHTML = '<p class="carrito-vacio-msg">El carrito está vacío</p>';
        return;
    }

    carrito.forEach((item, id) => {
        const precioTotalProducto = item.precio * item.cantidad;
        totalCarrito += precioTotalProducto;

        const div = document.createElement('div');
        div.className = 'carrito-item mb-4 animate__animated animate__fadeIn';
        div.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <img src="${item.imagen}" class="img-carrito-thumb">
                <div class="flex-grow-1">
                    <h6 class="mb-1 fw-bold">${item.nombre}</h6>
                    <div class="d-flex align-items-center gap-2">
                        <span>${item.precio}€ x</span>
                        <input type="number" class="form-control form-control-sm input-cantidad" 
                               data-id="${id}" value="${item.cantidad}" 
                               min="0" max="21">
                        <span>= <strong>${precioTotalProducto.toFixed(2)}€</strong></span>
                    </div>
                    <div id="aviso-${id}" class="aviso-maximo-texto fw-bold"></div>
                </div>
            </div>
            <hr class="my-2 text-muted">
        `;
        carritoContenedor.appendChild(div);
    });

    // Barra de total
    const totalDiv = document.createElement('div');
    totalDiv.className = 'p-3 mt-3 rounded carrito-total-barra';
    totalDiv.innerHTML = `Total: ${totalCarrito.toFixed(2)}€`;
    carritoContenedor.appendChild(totalDiv);

    // Botón vaciar
    const btnVaciar = document.createElement('button');
    btnVaciar.id = 'vaciar-carrito';
    btnVaciar.className = 'btn-vaciar-estilo'; 
    btnVaciar.textContent = 'Vaciar Carrito';
    carritoContenedor.appendChild(btnVaciar);
}

// GESTIÓN DE CANTIDADES
carritoContenedor.addEventListener('change', (e) => {
    if (e.target.classList.contains('input-cantidad')) {
        const id = e.target.dataset.id;
        const nuevaCantidad = parseInt(e.target.value);
        const item = carrito.get(id);

        if (nuevaCantidad > 20) {
            const aviso = document.getElementById(`aviso-${id}`);
            if (aviso) {
                aviso.textContent = 'No se permiten más de 20 copias'; 
            }
            e.target.value = 20;
            item.cantidad = 20;

            setTimeout(() => {
                const avisoActualizado = document.getElementById(`aviso-${id}`);
                if (avisoActualizado) avisoActualizado.textContent = '';
            }, 2000);
        } 
        else if (nuevaCantidad <= 0) {
            carrito.delete(id);
            renderizarCarrito();
        } 
        else {
            item.cantidad = nuevaCantidad;
            renderizarCarrito();
        }
        renderizarTienda(inventario); 
    }
});

// EVENTO AÑADIR
contenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-agregar')) {
        const id = e.target.dataset.id;
        const juego = inventario.find(j => j.id === id);

        if (juego) {
            if (carrito.has(id)) {
                const item = carrito.get(id);
                if (item.cantidad < 20) {
                    item.cantidad++;
                }
            } else {
                carrito.set(id, { 
                    nombre: juego.nombre, 
                    precio: juego.precio, 
                    imagen: juego.imagen,
                    cantidad: 1 
                });
            }
            renderizarCarrito();
            renderizarTienda(inventario);
            
            const elCarrito = document.getElementById('carrito');
            bootstrap.Offcanvas.getOrCreateInstance(elCarrito).show();
        }
    }
});

// EVENTO VACIAR
carritoContenedor.addEventListener('click', (e) => {
    if (e.target.id === 'vaciar-carrito') {
        if (confirm("¿Vaciar todo el carrito?")) {
            carrito.clear();
            renderizarCarrito();
            renderizarTienda(inventario);
        }
    }
});

// FORMULARIO
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input, textarea');
    const inputFoto = form.querySelector('input[type="file"]');
    const nombre = inputs[0].value;
    const precio = parseFloat(inputs[1].value);
    const desc = inputs[2].value;
    
    let urlImagen = "imagenes/default.png";
    if (inputFoto.files && inputFoto.files[0]) {
        urlImagen = URL.createObjectURL(inputFoto.files[0]);
    }

    if (nombre && !isNaN(precio)) {
        const nuevo = new JuegoEstrategia(nombre, precio, desc, urlImagen, "Media");
        inventario.push(nuevo);
        renderizarTienda(inventario);
        form.reset();
    }
});

// INICIO
renderizarTienda(inventario);
renderizarCarrito();
