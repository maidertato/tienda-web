import { inventario, agregarProductoAlInventario} from './tienda.js';

// SELECTORES
const contenedor = document.getElementById('lista-productos');
const carritoContenedor = document.getElementById('carrito-body'); 
const form = document.querySelector('aside form');
const buscador = document.getElementById('buscador');
const tituloTienda = document.getElementById('titulo-tienda');

const extraAtributo = document.getElementById('campo-extra-container');
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
                <img src="${juego.imagen}" class="card-img-top imagen-producto" data-id="${juego.id}" alt="${juego.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${juego.nombre}</h5>
                    
                    <p class="card-text descripcion-juego">${juego.descripcion}</p>

                    <p class="card-text extra-attr text-muted mt-2">
                        <small><strong>${obtenerAtributoExtra(juego)}</strong></small>
                    </p>

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
function actualizarIconoCarrito() {
  const cartIcon = document.getElementById("cart-icon");
  if (!cartIcon) return;

  let total = 0;

  carrito.forEach(item => {
    total += item.cantidad;
  });

  cartIcon.setAttribute("data-quantity", total);
}

function renderizarCarrito() {
    carritoContenedor.innerHTML = '';
    let totalCarrito = 0;

    if (carrito.size === 0) {
        carritoContenedor.innerHTML = `
            <div class="carrito-vacio-vista animate__animated animate__fadeIn">

            <svg class="vacio-icono-cart" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor"
                d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
            </svg>

            <h4>No hay productos en tu carrito</h4>
            <p>¡Vuelve al inicio y empieza a comprar!</p>

            <button class="btn-inicio">
                <svg class="vacio-icono-home" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor"
                    d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2z"/>
                </svg>
                Inicio
            </button>

            </div>
        `;
        actualizarIconoCarrito();
        return;
    }

    carrito.forEach((item, id) => {
        const precioTotalProducto = item.precio * item.cantidad;
        totalCarrito += precioTotalProducto;

        // Dentro de tu carrito.forEach en main.js
        const div = document.createElement('div');
        div.className = 'carrito-item p-2 mb-3 shadow-sm d-flex align-items-center justify-content-between';

        div.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <img src="${item.imagen}" class="rounded" style="width: 50px; height: 50px; object-fit: cover;">
                <div>
                    <h6 class="mb-0 fw-bold">${item.nombre}</h6>
                    <div class="d-flex align-items-center gap-2">
                        <input type="number" class="form-control form-control-sm input-cantidad" 
                            data-id="${id}" value="${item.cantidad}" min="0" max="21" style="width: 50px;">
                        <span class="small text-muted">x ${item.precio}€</span>
                    </div>
                    <span id="aviso-${id}" class="aviso-maximo-texto"></span>
                </div>
            </div>

            <button class="btn-papelera" data-id="${id}" title="Eliminar">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0617 20.1427 17.2262 21 16.223 21H7.777C6.77382 21 5.93827 20.1427 5.867 19.142L5 7H19ZM9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7H9Z" 
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        `;
        carritoContenedor.appendChild(div);
    });
    actualizarIconoCarrito();
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

// Evento Click para Añadir
contenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-agregar')) {
        const id = e.target.dataset.id;
        const mascotas = inventario.find(j => j.id === id);

        if (mascotas) {
            const feedback = document.createElement('div');
            feedback.className = 'mensaje-exito';
            feedback.textContent = '¡Añadido con éxito!';
            e.target.parentElement.appendChild(feedback);
            setTimeout(() => feedback.remove(), 1500);

            if (carrito.has(id)) {
                const item = carrito.get(id);
                if (item.cantidad < 20) item.cantidad++;
            } else {
                carrito.set(id, { 
                    id: mascotas.id,
                    nombre: mascotas.nombre,
                    imagen: mascotas.imagen,
                    precio: parseFloat(mascotas.precio), 
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

// Evento para el detalle del producto
contenedor.addEventListener('click', (e) => {
    const img = e.target.closest('.imagen-producto');
    if (!img) return;

    const id = img.dataset.id;
    const producto = inventario.find(p => p.id === id);
    if (!producto) return;

    // Rellenar modal
    document.getElementById('modal-img').src = producto.imagen;
    document.getElementById('modal-titulo').textContent = producto.nombre;
    document.getElementById('modal-descripcion').textContent = producto.descripcion;
    document.getElementById('modal-precio').innerHTML = `<strong>Precio:</strong> ${producto.precio}€`;
    document.getElementById('modal-extra').innerHTML =
        `<strong>${obtenerAtributoExtra(producto)}</strong>`;

    // Mostrar modal
    const modal = new bootstrap.Modal(
        document.getElementById('modalDesripcion')
    );
    modal.show();
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
    
    const infoPag = document.getElementById('info-paginacion');
    if(infoPag) infoPag.textContent = `Mostrando ${mostrados > 0 ? mostrados : 0} productos de un total de ${total}`;

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

// --- 4. FORMULARIO Y EVENTOS DE CARRITO ---

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const tipo = document.getElementById('tipo-producto').value;
    const nombre = form.querySelector('input[type="text"]').value;
    const precio = parseFloat(form.querySelector('input[type="number"]').value);
    const desc = form.querySelector('textarea').value;
    
    // 1. CAPTURAMOS EL VALOR EXTRA (Compañía, Edad, etc.)
    const inputExtra = document.getElementById('valor-extra');
    const valorAdicional = inputExtra ? inputExtra.value : "General";

    const inputFoto = document.getElementById('input-file');
    let urlImagen = "imagenes/default.png";
    if (inputFoto.files && inputFoto.files[0]) {
        urlImagen = URL.createObjectURL(inputFoto.files[0]);
    }

    if (nombre && !isNaN(precio) && tipo) {
        // 2. PASAMOS EL VALOR REAL EN VEZ DE "General"
        agregarProductoAlInventario(tipo, nombre, precio, desc, urlImagen, valorAdicional);
        
        // 3. MANTENEMOS EL FILTRO DEL BUSCADOR
        const termino = buscador.value.toLowerCase(); 
        productosFiltrados = inventario.filter(p => p.nombre.toLowerCase().includes(termino));
        
        renderizarTienda();
        form.reset();
        
        // 4. LIMPIAMOS EL CAMPO EXTRA DESPUÉS DE AÑADIR
        extraContainer.innerHTML = ''; 
    }
});

carritoContenedor.addEventListener('input', (e) => {
    if (e.target.classList.contains('input-cantidad')) {
        const id = e.target.dataset.id;
        let nuevaCantidad = parseInt(e.target.value);
        const item = carrito.get(id);

        if (nuevaCantidad > 20) {
            nuevaCantidad = 20;
            // Para que nunca llegue a aparecer el número 21
            e.target.value = 20; 
            // Primero renderizamos para asegurar que el HTML existe
            renderizarCarrito();
            renderizarTienda();

            // Ahora buscamos el aviso en el nuevo HTML renderizado
            const aviso = document.getElementById(`aviso-${id}`);
            if (aviso) {
                aviso.textContent = '⚠️ Máximo 20 copias permitidas';
                // Lo borramos a los 2 segundos
                setTimeout(() => {
                    const avisoActualizado = document.getElementById(`aviso-${id}`);
                    if (avisoActualizado) avisoActualizado.textContent = '';
                }, 2000);
            }
            return; // Salimos para evitar que siga la lógica normal
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
//VACIAR CARRITO
carritoContenedor.addEventListener('click', (e) => {
    if (e.target.id === 'vaciar-carrito') {
        if (confirm("¿Vaciar todo el carrito?")) {
            carrito.clear();
            renderizarCarrito();
            renderizarTienda();
        }
    }
});
//QUITAR UN SOLO PRODUCTO
carritoContenedor.addEventListener('click', (e) => {
    // Buscamos el botón o el SVG de la papelera
    const btn = e.target.closest('.btn-papelera');
    if (btn) {
        const id = btn.dataset.id;
        carrito.delete(id); // Borramos el producto del Map
        renderizarCarrito(); // Refrescamos la vista
    }
});
carritoContenedor.addEventListener("click", (e) => {
  if (e.target.closest(".btn-inicio")) {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const elCarrito = document.getElementById("carrito");
    bootstrap.Offcanvas.getOrCreateInstance(elCarrito).hide();
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

// --- LÓGICA PARA EL CAMPO DINÁMICO ---
const selectTipo = document.getElementById('tipo-producto');
const extraContainer = document.getElementById('campo-extra-container');

if (selectTipo && extraContainer) {
    selectTipo.addEventListener('change', () => {
        const tipo = selectTipo.value;
        let etiqueta = "";
        let placeholder = "";

        switch (tipo) {
            case 'mobiliario':
                etiqueta = "Material";
                placeholder = "Ej: Madera, Plástico...";
                break;
            case 'cabello':
                etiqueta = "Dimensiones";
                placeholder = "Ej: 80x60 cm...";
                break;
            case 'juguete':
                etiqueta = "Material";
                placeholder = "Ej: Goma, Tela...";
                break;
            case 'alimentacion':
                etiqueta = "Tipo de Alimentación";
                placeholder = "Ej: Seco, Húmedo...";
                break;
            case 'merch':
                etiqueta = "Material";
                placeholder = "Ej: Resina, Algodón...";
                break;
            default:
                extraContainer.innerHTML = '';
                return;
        }

        extraContainer.innerHTML = `
            <div class="mb-3 animate__animated animate__fadeIn">
                <label class="form-label text-white fw-bold">${etiqueta}</label>
                <input type="text" id="valor-extra" class="form-control" placeholder="${placeholder}" required>
            </div>
        `;
    });
}

function obtenerAtributoExtra(p) {
    // 1. Juguete
    if (p.material) return `Material: ${p.material}`;
    
    // 2. Alimentación
    if (p.tipoAlimentacion) return `Tipo de Alimentación: ${p.tipoAlimentacion}`;
        
    // 3. Merchandising
    if (p.tipoMaterial) return `Material: ${p.tipoMaterial}`;
    
    // 4. Descanso
    // 5. Cabello
    if (p.dimensiones) return `Dimensiones: ${p.dimensiones}`;
    
    // 5. Mobiliario
    if (p.materialMobiliario) return `Material: ${p.materialMobiliario}`;

    return "Categoría: General";
}


// --- INICIO ---
document.addEventListener('DOMContentLoaded', () => {
    renderizarTienda();
    renderizarCarrito();

    // --- LÓGICA PARA EL CAMPO DINÁMICO (MOVIDO AQUÍ DENTRO) ---
    const selectTipo = document.getElementById('tipo-producto');
    if (selectTipo && extraAtributo) {
        selectTipo.addEventListener('change', () => {
            const tipo = selectTipo.value;
            let etiqueta = "";
            let placeholder = "";

            switch (tipo) {
                case 'mobiliario':
                    etiqueta = "Material";
                    placeholder = "Ej: Madera, Plástico...";
                    break;
                case 'cabello':
                    etiqueta = "Dimensiones";
                    placeholder = "Ej: 80x60 cm...";
                    break;
                case 'juguete':
                    etiqueta = "Material";
                    placeholder = "Ej: Goma, Tela...";
                    break;
                case 'alimentacion':
                    etiqueta = "Tipo de Alimentación";
                    placeholder = "Ej: Seco, Húmedo...";
                    break;
                case 'merch':
                    etiqueta = "Material";
                    placeholder = "Ej: Resina, Algodón...";
                    break;
                default:
                    extraContainer.innerHTML = '';
                    return;
            }

            extraContainer.innerHTML = `
                <div class="mb-3 mt-3 animate__animated animate__fadeIn">
                    <label class="form-label text-white fw-bold">${etiqueta}</label>
                    <input type="text" id="valor-extra" class="form-control" placeholder="${placeholder}" required>
                </div>
            `;
        });
    }
});