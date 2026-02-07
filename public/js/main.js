import { inventario, agregarProductoAlInventario } from './tienda.js';

// --- SELECTORES ---
const contenedor = document.getElementById('lista-productos');
const carritoContenedor = document.getElementById('carrito-body'); 
const form = document.querySelector('aside form');
const buscador = document.getElementById('buscador');
const tituloTienda = document.getElementById('titulo-tienda');
const extraContainer = document.getElementById('campo-extra-container');

// --- ESTADO ---
const carrito = new Map();
let paginaActual = 1;
const productosPorPagina = 6;
let productosFiltrados = [...inventario];

// --- 1. RENDER TIENDA (CON EL BOTÓN FLOTANTE RESTAURADO) ---
export function renderizarTienda() {
    if (!contenedor) return;
    contenedor.innerHTML = ''; 

    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productosFiltrados.slice(inicio, fin);

    productosPagina.forEach(juego => {
        const itemEnCarrito = carrito.get(juego.id);
        const alcanzadoMaximo = itemEnCarrito && itemEnCarrito.cantidad >= 20;

        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4';        
        card.innerHTML = `
            <div class="card h-100 position-relative card-producto-tienda m-2">
                <button class="btn-agregar-flotante ${alcanzadoMaximo ? 'disabled' : ''}" 
                        data-id="${juego.id}" 
                        ${alcanzadoMaximo ? 'disabled' : ''}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" pointer-events="none">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </button>

                <img src="${juego.imagen}" class="card-img-top imagen-producto" data-id="${juego.id}" alt="${juego.nombre}">
                
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title line-clamp-2">${juego.nombre}</h5>
                    <p class="card-text descripcion-juego line-clamp-3">${juego.descripcion}</p>
                    <p class="card-text extra-attr text-muted mt-2">
                        <small><strong>${obtenerAtributoExtra(juego)}</strong></small>
                    </p>
                    <p class="card-text mt-auto fw-bold fs-5">${juego.precio}€</p>
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });

    actualizarInterfazPaginacion();
}

// --- 2. EVENTO CLICK PARA EL BOTÓN FLOTANTE ---
contenedor.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-agregar-flotante');
    
    if (btn) {
        const id = btn.dataset.id;
        const producto = inventario.find(j => j.id === id);

        if (producto) {
            // 1. CREAR EL GLOBITO (Aparecerá al lado del carro)
            const globo = document.createElement('div');
            globo.className = 'mensaje-exito-flotante';
            globo.textContent = '¡Añadido con éxito!';
            btn.parentElement.appendChild(globo);

            setTimeout(() => {
                mensaje.classList.add('fade-out');
                setTimeout(() => {
                    mensaje.remove();
                    renderizarTienda(); 
                }, 300);
            }, 1500);

            // 2. LÓGICA DE CARRITO
            if (carrito.has(id)) {
                const item = carrito.get(id);
                if (item.cantidad < 20) item.cantidad++;
            } else {
                // ASEGÚRATE DE QUE ESTOS NOMBRES COINCIDAN CON TU OBJETO
                carrito.set(id, { 
                    id: producto.id,
                    nombre: producto.nombre, // Si en tu inventario es 'name', cámbialo aquí
                    imagen: producto.imagen, // Si es 'img', cámbialo aquí
                    precio: parseFloat(producto.precio) || 0, // Evita el NaN convirtiendo a número
                    cantidad: 1 
                });
            }
            renderizarCarrito();

            // 3. DESVANECER Y LUEGO ACTUALIZAR TIENDA
            setTimeout(() => {
                globo.classList.add('fade-out');
                setTimeout(() => {
                    globo.remove();
                    renderizarTienda(); // Actualiza el botón (por si llega a 20)
                }, 300);
            }, 1500); 
        }
    }
});

// --- 3. RESTO DE FUNCIONES (CARRITO Y AUXILIARES) ---

function renderizarCarrito() {
    if (!carritoContenedor) return;
    carritoContenedor.innerHTML = '';
    let totalCarrito = 0;

    if (carrito.size === 0) {
        carritoContenedor.innerHTML = '<p class="text-center p-3">Carrito vacío</p>';
        actualizarIconoCarrito(0);
        return;
    }

    let cantidadTotal = 0;
    carrito.forEach((item, id) => {
        cantidadTotal += item.cantidad;
        totalCarrito += item.precio * item.cantidad;
        const div = document.createElement('div');
        div.className = 'carrito-item d-flex align-items-center justify-content-between p-2 mb-2 border-bottom';
        div.innerHTML = `
            <div class="d-flex align-items-center gap-2">
                <img src="${item.imagen}" style="width: 40px; height: 40px; object-fit: cover;" class="rounded">
                <div>
                    <div class="fw-bold small">${item.nombre}</div>
                    <input type="number" class="input-cantidad form-control form-control-sm" data-id="${id}" value="${item.cantidad}" style="width: 50px;">
                </div>
            </div>
            <button class="btn-papelera btn btn-sm text-danger" onclick="eliminarDelCarrito('${id}')">🗑️</button>
        `;
        carritoContenedor.appendChild(div);
    });

    actualizarIconoCarrito(cantidadTotal);
    
    const footer = document.createElement('div');
    footer.className = 'mt-3 p-2 bg-dark text-white rounded';
    footer.innerHTML = `<strong>Total: ${totalCarrito.toFixed(2)}€</strong>`;
    carritoContenedor.appendChild(footer);
}
    // FUNCION ELIMINAR
window.eliminarDelCarrito = (id) => {
    // 1. Eliminamos el producto del Map usando su ID
    if (carrito.has(id)) {
        carrito.delete(id);
        
        // 2. Volvemos a dibujar el carrito para que desaparezca visualmente
        renderizarCarrito();
        
        // 3. Opcional: Si quieres que la tienda se actualice (por si cambian estados de botones)
        if (typeof renderizarTienda === 'function') {
            renderizarTienda();
        }
        
        console.log(`Producto ${id} eliminado`);
    }
};


function actualizarIconoCarrito(total) {
    const counter = document.getElementById("cart-counter");
    const cartIcon = document.getElementById("cart-icon");
    if (cartIcon) cartIcon.setAttribute("data-quantity", total);
    if (counter) {
        if (total > 0) {
            counter.textContent = total;
            counter.style.display = 'flex'; // Muestra el círculo
        } else {
            counter.style.display = 'none'; // Lo oculta si es 0
        }
    }
}

function obtenerAtributoExtra(p) {
    if (p.material) return `Material: ${p.material}`;
    if (p.tipoAlimentacion) return `Alimentación: ${p.tipoAlimentacion}`;
    if (p.dimensiones) return `Dimensiones: ${p.dimensiones}`;
    return "Categoría: General";
}

function actualizarInterfazPaginacion() {
    const total = productosFiltrados.length;
    const numPaginas = Math.ceil(total / productosPorPagina);
    const nav = document.getElementById('pagination-container');
    if (nav) {
        nav.innerHTML = '';
        for (let i = 1; i <= numPaginas; i++) {
            nav.innerHTML += `<li class="page-item ${i === paginaActual ? 'active' : ''}">
                <button class="page-link" onclick="cambiarPagina(${i})">${i}</button></li>`;
        }
    }
}

window.cambiarPagina = (n) => {
    paginaActual = n;
    renderizarTienda();
};

// Buscador
buscador?.addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase();
    productosFiltrados = inventario.filter(p => p.nombre.toLowerCase().includes(termino));
    paginaActual = 1; 
    renderizarTienda();
});

// Inicio
document.addEventListener('DOMContentLoaded', () => {
    renderizarTienda();
    renderizarCarrito();
});