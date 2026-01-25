import { inventario, agregarProductoAlInventario} from './tienda.js';

// SELECTORES
const contenedor = document.getElementById('lista-productos');
const carritoContenedor = document.getElementById('carrito-body'); 
const form = document.querySelector('aside form');
const buscador = document.getElementById('buscador');
const tituloTienda = document.getElementById('titulo-tienda');

// ESTADO
const carrito = new Map();
let paginaActual = 1;
const productosPorPagina = 6;
let productosFiltrados = [...inventario];

// --- 1. RENDER TIENDA (CON PAGINACIÓN Y FILTRO) ---
export function renderizarTienda() {
    if (!contenedor) return;
    contenedor.innerHTML = ''; 

    // Cálculos de paginación
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productosFiltrados.slice(inicio, fin);

    productosPagina.forEach(juego => {
        const itemEnCarrito = carrito.get(juego.id);
        const alcanzadoMaximo = itemEnCarrito && itemEnCarrito.cantidad >= 20;

        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4';        
        card.innerHTML = `
            <div class="card h-100 position-relative m-2 card-producto-tienda" style="width: 100%;">
                <img src="${juego.imagen}" class="card-img-top" alt="${juego.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${juego.nombre}</h5>
                    <p class="card-text extra-attr text-muted"><small>${obtenerAtributoExtra(juego)}</small></p>
                    <p class="card-text descripcion-juego">${juego.descripcion}</p>
                    <p class="card-text mt-auto"><strong>${juego.precio}€</strong></p>
                    
                    <button class="btn btn-primary w-100 btn-agregar mt-2" 
                            data-id="${juego.id}"
                            ${alcanzadoMaximo ? 'disabled' : ''}>
                        ${alcanzadoMaximo ? 'Máximo alcanzado' : 'Añadir al carrito'}
                    </button>
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });

    actualizarInterfazPaginacion();
}

// --- 2. GESTIÓN DEL CARRITO (RENDER Y LÓGICA) ---

function renderizarCarrito() {
    carritoContenedor.innerHTML = '';
    let totalCarrito = 0;

    if (carrito.size === 0) {
        carritoContenedor.innerHTML = '<p class="carrito-vacio-msg">El carrito está vacío</p>';
        return;
    }

    carrito.forEach((item, id) => {
        const precioNumerico = parseFloat(item.precio);
        const precioTotalProducto = item.precio * item.cantidad;
        totalCarrito += precioTotalProducto;

        const div = document.createElement('div');
        div.className = 'carrito-item mb-4 animate__animated animate__fadeIn';
        div.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <img src="${item.imagen}" class="img-carrito-thumb" style="width: 50px;">
                <div class="flex-grow-1">
                    <h6 class="mb-1 fw-bold">${item.nombre}</h6>
                    <div class="d-flex align-items-center gap-2">
                        <span>${item.precio}€ x</span>
                        <input type="number" class="form-control form-control-sm input-cantidad" 
                               data-id="${id}" value="${item.cantidad}" min="0" max="21" style="width: 60px;">
                        <span>= <strong>${precioTotalProducto.toFixed(2)}€</strong></span>
                    </div>
                    <div id="aviso-${id}" class="aviso-maximo-texto fw-bold text-danger"></div>
                </div>
            </div>
            <hr class="my-2 text-muted">
        `;
        carritoContenedor.appendChild(div);
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'p-3 mt-3 rounded carrito-total-barra';
    totalDiv.innerHTML = `Total: ${totalCarrito.toFixed(2)}€`;
    carritoContenedor.appendChild(totalDiv);

    const btnVaciar = document.createElement('button');
    btnVaciar.id = 'vaciar-carrito';
    btnVaciar.className = 'btn-vaciar-estilo'; 
    btnVaciar.textContent = 'Vaciar Carrito';
    carritoContenedor.appendChild(btnVaciar);
}

// Evento Click para Añadir (Delegado)
contenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-agregar')) {
        const id = e.target.dataset.id;
        const juego = inventario.find(j => j.id === id);

        if (juego) {
            const feedback = document.createElement('div');
            feedback.className = 'mensaje-exito';
            feedback.textContent = '¡Añadido con éxito!';
            e.target.parentElement.appendChild(feedback);
            setTimeout(() => feedback.remove(), 1500);

            if (carrito.has(id)) {
                const item = carrito.get(id);
                if (item.cantidad < 20) item.cantidad++;
            } else {
                // FORZAMOS parseFloat aquí para que la suma del carrito funcione
                carrito.set(id, { 
                    ...juego, 
                    precio: parseFloat(juego.precio), 
                    cantidad: 1 
                });
            }

            renderizarCarrito();
            renderizarTienda();
            
            const elCarrito = document.getElementById('carrito');
            bootstrap.Offcanvas.getOrCreateInstance(elCarrito).show();
        }
    }
});

// --- 3. BUSCADOR Y PAGINACIÓN ---

buscador.addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase();
    tituloTienda.textContent = termino ? `Buscando por: ${e.target.value}` : "Todos los productos";
    
    productosFiltrados = inventario.filter(p => p.nombre.toLowerCase().includes(termino));
    paginaActual = 1; 
    renderizarTienda();
});

function actualizarInterfazPaginacion() {
    const total = productosFiltrados.length;
    const numPaginas = Math.ceil(total / productosPorPagina);
    const mostrados = Math.min(paginaActual * productosPorPagina, total) - ((paginaActual - 1) * productosPorPagina);
    
    document.getElementById('info-paginacion').textContent = 
        `Mostrando ${mostrados > 0 ? mostrados : 0} productos de un total de ${total}`;

    const nav = document.getElementById('pagination-container');
    if (!nav) return;
    nav.innerHTML = '';

    if (paginaActual > 1) {
        nav.innerHTML += `<li class="page-item"><button class="page-link" onclick="cambiarPagina(${paginaActual - 1})">Anterior</button></li>`;
    }

    for (let i = 1; i <= numPaginas; i++) {
        nav.innerHTML += `<li class="page-item ${i === paginaActual ? 'active' : ''}">
            <button class="page-link" onclick="cambiarPagina(${i})">${i}</button></li>`;
    }

    if (paginaActual < numPaginas) {
        nav.innerHTML += `<li class="page-item"><button class="page-link" onclick="cambiarPagina(${paginaActual + 1})">Siguiente</button></li>`;
    }
}

window.cambiarPagina = (n) => {
    paginaActual = n;
    renderizarTienda();
};

// --- 4. FORMULARIO Y EVENTOS DE CARRITO (CANTIDADES/VACIAR) ---

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const tipo = document.getElementById('tipo-producto').value;
    const nombre = form.querySelector('input[placeholder="Ej: Super Mario Bros"]').value;
    const precio = parseFloat(form.querySelector('input[placeholder="0.00"]').value);
    const desc = form.querySelector('textarea').value;
    const inputFoto = document.getElementById('input-file');
    
    let urlImagen = "imagenes/default.png";
    if (inputFoto.files && inputFoto.files[0]) {
        urlImagen = URL.createObjectURL(inputFoto.files[0]);
    }

    if (nombre && !isNaN(precio) && tipo) {
        agregarProductoAlInventario(tipo, nombre, precio, desc, urlImagen, "General");
        productosFiltrados = [...inventario]; // Actualizamos lista para que aparezca el nuevo
        renderizarTienda();
        form.reset();
    }
});

carritoContenedor.addEventListener('change', (e) => {
    if (e.target.classList.contains('input-cantidad')) {
        const id = e.target.dataset.id;
        let nuevaCantidad = parseInt(e.target.value);
        const item = carrito.get(id);

        if (nuevaCantidad > 20) {
            const aviso = document.getElementById(`aviso-${id}`);
            if (aviso) aviso.textContent = 'Máximo 20 copias'; 
            nuevaCantidad = 20;
            setTimeout(() => { if(document.getElementById(`aviso-${id}`)) document.getElementById(`aviso-${id}`).textContent = ''; }, 2000);
        } 

        if (nuevaCantidad <= 0) {
            carrito.delete(id);
        } else {
            item.cantidad = nuevaCantidad;
        }
        renderizarCarrito();
        renderizarTienda();
    }
});

carritoContenedor.addEventListener('click', (e) => {
    if (e.target.id === 'vaciar-carrito') {
        if (confirm("¿Vaciar todo el carrito?")) {
            carrito.clear();
            renderizarCarrito();
            renderizarTienda();
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
  const dropZone = document.getElementById("drop-zone");
  const inputFile = document.getElementById("input-file");
  const dropText = document.getElementById("drop-text");

  if (!dropZone || !inputFile || !dropText) return;

  ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropZone.addEventListener(eventName, e => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  dropZone.addEventListener("dragenter", () => {
    dropZone.classList.add("drop-zone-active");
    dropText.textContent = "Suelta la imagen aquí";
  });

  dropZone.addEventListener("dragover", () => {
    dropZone.classList.add("drop-zone-active");
  });

  dropZone.addEventListener("dragleave", e => {
    if (!dropZone.contains(e.relatedTarget)) {
      dropZone.classList.remove("drop-zone-active");
      dropText.textContent = "Suelta tu archivo";
    }
  });

  dropZone.addEventListener("drop", e => {
    dropZone.classList.remove("drop-zone-active");

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      inputFile.files = files;
      dropText.textContent = "Imagen cargada ✔";
    }
  });
});

function obtenerAtributoExtra(p) {
    if (p.plataforma) return `Plataforma: ${p.plataforma}`;
    if (p.dificultad) return `Dificultad: ${p.dificultad}`;
    return "Categoría: General";
}

// --- INICIO ---
document.addEventListener('DOMContentLoaded', () => {
    renderizarTienda();
    renderizarCarrito();
});