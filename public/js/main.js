import { inventario, agregarProductoAlInventario, carrito } from './tienda.js';

// --- SELECTORES ---
const contenedor = document.getElementById('lista-productos');
const carritoContenedor = document.getElementById('carrito-body'); 
const form = document.querySelector('aside form');
const buscador = document.getElementById('buscador');
const tituloTienda = document.getElementById('titulo-tienda');
const extraContainer = document.getElementById('campo-extra-container');
const varianteActualPorProducto = new Map();

// --- FILTRO POR CATEGORÍA ---
const categorias = ["mobiliario", "descanso", "cabello", "juguete", "merch", "alimentacion"];
const listaCategorias = document.getElementById("lista-categorias");
const filtroPrecio = document.getElementById('filtro-precio');
const precioMaxValor = document.getElementById('precio-max-valor');



// Llenamos el dropdown con las categorías
categorias.forEach(cat => {
    const li = document.createElement('li');
    li.innerHTML = `<a class="dropdown-item" href="#" data-categoria="${cat}">${cat}</a>`;
    listaCategorias.appendChild(li);
});
//Evitar que el dropdown se cierre al interactuar con el slider
document.querySelector('.dropdown-menu').addEventListener('click', function (e) {
    e.stopPropagation();
});

// Filtrar al hacer click en la categoría
listaCategorias.addEventListener('click', (e) => {
    e.preventDefault();
    const categoria = e.target.dataset.categoria;
    if (!categoria) return;

    productosFiltrados = inventario.filter(p => {
        // Filtra por tipo o por campo extra (como material o tipoAlimentacion)
        if (p.tipo === categoria) return true;
        if (p.tipoAlimentacion && p.tipoAlimentacion === categoria) return true;
        return false;
    });

    paginaActual = 1;
    tituloTienda.textContent = `Categoría: ${categoria}`;
    renderizarTienda();
});


// --- ESTADO ---
let paginaActual = 1;
const productosPorPagina = 6;
let productosFiltrados = [...inventario];
let categoriaSeleccionada = "all";


// --- 1. RENDER TIENDA (CON EL BOTÓN FLOTANTE RESTAURADO) ---
export function renderizarTienda() {
    if (!contenedor) return;
    contenedor.innerHTML = ''; 

    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productosFiltrados.slice(inicio, fin);

    productosPagina.forEach(juego => {
        const variantes = juego.variantes;

        let imagenMostrada = juego.imagen;
        let nombreMostrado = juego.nombre;

        if (variantes && variantes.length > 0) {
            const index = varianteActualPorProducto.get(juego.id) || 0;
            imagenMostrada = variantes[index].imagen;
            nombreMostrado = `${juego.nombre} – ${variantes[index].nombre}`;
        }


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

                <div class="imagen-wrapper">
                    <img src="${imagenMostrada}" class="card-img-top imagen-producto" data-id=${juego.id}>

                    ${variantes && variantes.length > 1 ? `
                        <div class="flecha flecha-izq" data-id="${juego.id}" data-dir="-1"></div>
                        <div class="flecha flecha-der" data-id="${juego.id}" data-dir="1"></div>
                    ` : ''}
                </div>

                <div class="card-body d-flex flex-column">
                    <h5 class="card-title line-clamp-2">${nombreMostrado}</h5>
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
        const index = varianteActualPorProducto.get(id) || 0;
        const variante = producto.variantes?.[index];
        const nombreFinal = variante
            ? `${producto.nombre} – ${variante.nombre}`
            : producto.nombre;

        const imagenFinal = variante
            ? variante.imagen
            : producto.imagen;


        if (producto) {
            // 1. CREAR EL GLOBITO (Aparecerá al lado del carro)
            const globo = document.createElement('div');
            globo.className = 'mensaje-exito-flotante';
            globo.textContent = '¡Añadido con éxito!';
            btn.parentElement.appendChild(globo);

            setTimeout(() => {
                globo.classList.add('fade-out');
                setTimeout(() => {
                    globo.remove();
                    renderizarTienda(); 
                }, 300);
            }, 1500);

            // 2. LÓGICA DE CARRITO
            // Creamos una clave ÚNICA por variante
            const claveCarrito = variante
                ? `${id}_${variante.nombre}`
                : id;
                
            if (carrito.has(claveCarrito)) {
                const item = carrito.get(claveCarrito);
                if (item.cantidad < 20) item.cantidad++;
            } else {
                carrito.set(claveCarrito, {
                    id: claveCarrito,
                    nombre: nombreFinal,
                    imagen: imagenFinal,
                    precio: parseFloat(producto.precio) || 0,
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
    //Click sobre la imagen
    if (e.target.classList.contains('imagen-producto')) {
                const id = e.target.dataset.id;
                abrirDetalleProducto(id);
    }
});

// EVENTO CLICK PARA CAMBIAR IMAGEN
contenedor.addEventListener('click', (e) => {
    const flecha = e.target.closest('.flecha');
    if (!flecha) return;

    const id = flecha.dataset.id;
    const dir = parseInt(flecha.dataset.dir);
    const producto = inventario.find(p => p.id === id);

    if (!producto?.variantes) return;

    const total = producto.variantes.length;
    const actual = varianteActualPorProducto.get(id) || 0;
    const siguiente = (actual + dir + total) % total;

    varianteActualPorProducto.set(id, siguiente);
    renderizarTienda();
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
            <button class="btn-papelera" onclick="eliminarDelCarrito('${id}')" title="Eliminar producto">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6h18M9 6v-2a1 1 0 011-1h4a1 1 0 011 1v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" 
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        `;
        carritoContenedor.appendChild(div);
    });

    actualizarIconoCarrito(cantidadTotal);
    
    const footer = document.createElement('div');
    footer.className = 'mt-3 p-2 bg-dark text-white rounded';
    footer.innerHTML = `<strong>Total: ${totalCarrito.toFixed(2)}€</strong>`;
    carritoContenedor.appendChild(footer);

    // Logica para actualizar el carrito al darle a flecha o borrar cantidad
    const inputsCantidad = carritoContenedor.querySelectorAll('.input-cantidad');

    inputsCantidad.forEach(input => {
        // Usamos 'input' en lugar de 'change' para detección instantánea
        input.addEventListener('input', (e) => {
            const id = e.target.getAttribute('data-id');
            let nuevaCantidad = parseInt(e.target.value);

            let aviso = e.target.parentElement.querySelector('.aviso-maximo-texto');
            if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
                nuevaCantidad = 1; // Forzamos que el valor interno sea 1
                e.target.value = 1; // Forzamos que el dibujo del input muestre 1
            }

            // 2. Si quieres poner un límite máximo (ejemplo 20)
            if (nuevaCantidad > 20) {
                if (nuevaCantidad > 20) {
                    nuevaCantidad = 20;
                    e.target.value = 20;
                }
                
                // Si no existe el mensaje de aviso, lo creamos
                if (!aviso) {
                    aviso = document.createElement('div');
                    aviso.className = 'aviso-maximo-texto text-danger fw-bold';
                    aviso.style.fontSize = '11px';
                    aviso.textContent = '¡Solo se permiten 20 copias!';
                    e.target.parentElement.appendChild(aviso);
                }
            } else {
                // Si baja de 20, borramos el aviso si existe
                if (aviso) aviso.remove();
            }


            // 1. Actualizamos el producto en el Map
            if (carrito.has(id)) {
                const producto = carrito.get(id);
                producto.cantidad = nuevaCantidad;

                // 2. Recalculamos el total de unidades para el globo rojo
                let totalUnidades = 0;
                carrito.forEach(p => totalUnidades += p.cantidad);
                actualizarIconoCarrito(totalUnidades);

                // 3. Actualizamos el precio total del carrito (el texto de abajo)
                let nuevoTotalEuros = 0;
                carrito.forEach(p => nuevoTotalEuros += p.precio * p.cantidad);
                
                const totalDisplay = carritoContenedor.querySelector('strong');
                if (totalDisplay) {
                    totalDisplay.textContent = `Total: ${nuevoTotalEuros.toFixed(2)}€`;
                }
            }
        });

        // Evento extra por si el usuario deja el campo vacío y pincha fuera
        input.addEventListener('blur', (e) => {
            if (e.target.value === '' || parseInt(e.target.value) < 1) {
                const id = e.target.getAttribute('data-id');
                eliminarDelCarrito(id);
            }
        });
    });
 };

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
    if (!nav) return;

    nav.innerHTML = '';

    // ANTERIOR
    nav.innerHTML += `
        <li class="page-item ${paginaActual === 1 ? 'disabled' : ''}">
            <button class="page-link" onclick="cambiarPagina(${paginaActual - 1})">
                Anterior
            </button>
        </li>
    `;

    // NÚMEROS
    for (let i = 1; i <= numPaginas; i++) {
        nav.innerHTML += `
            <li class="page-item ${i === paginaActual ? 'active' : ''}">
                <button class="page-link" onclick="cambiarPagina(${i})">${i}</button>
            </li>
        `;
    }

    // SIGUIENTE
    nav.innerHTML += `
        <li class="page-item ${paginaActual === numPaginas ? 'disabled' : ''}">
            <button class="page-link" onclick="cambiarPagina(${paginaActual + 1})">
                Siguiente
            </button>
        </li>
    `;
}


window.cambiarPagina = (n) => {
    paginaActual = n;
    renderizarTienda();
};

// Función centralizada de filtrado
function aplicarFiltros() {
    const termino = buscador.value.toLowerCase();
    const precioMax = parseFloat(document.getElementById('filtro-precio').value);

    productosFiltrados = inventario.filter(p => {
        const coincideTexto = p.nombre.toLowerCase().includes(termino);
        const coincidePrecio = p.precio <= precioMax;
        
        // Comprobamos la categoría (He visto que usas p.tipo en tu producto.js)
        const coincideCategoria = (categoriaSeleccionada === "all" || p.tipo === categoriaSeleccionada);

        return coincideTexto && coincidePrecio && coincideCategoria;
        
    });

    paginaActual = 1;
    renderizarTienda();
}

// Eventos para el filtrado en tiempo real
buscador?.addEventListener('input', aplicarFiltros);
filtroPrecio?.addEventListener('input', aplicarFiltros);

// Modifica tu lógica actual de categorías para que use 'aplicarFiltros'
listaCategorias.addEventListener('click', (e) => {
    e.preventDefault();
    const link = e.target.closest('.dropdown-item');
    if (!link) return;

    categoriaSeleccionada = link.dataset.categoria;
    
    // Opcional: Marcar visualmente la categoría seleccionada
    document.querySelectorAll('.dropdown-item').forEach(el => el.classList.remove('active'));
    link.classList.add('active');

    aplicarFiltros(); 
});



// Buscador
/* buscador?.addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase();
    productosFiltrados = inventario.filter(p => p.nombre.toLowerCase().includes(termino));
    paginaActual = 1; 
    renderizarTienda();
}); */

buscador?.addEventListener('input', aplicarFiltros)

// Borrar filtro
const btnBorrar = document.getElementById('btn-borrar-filtros');

btnBorrar?.addEventListener('click', () => {
    // 1. Limpiar Buscador
    buscador.value = "";
    
    // 2. Resetear Precio (Volver al máximo)
    filtroPrecio.value = 200;
    precioMaxValor.textContent = 200;
    
    // 3. Resetear Categoría
    categoriaSeleccionada = "all";
    
    // Quitar la clase 'active' de los botones de categoría si los tienes
    document.querySelectorAll('.dropdown-item').forEach(el => el.classList.remove('active'));

    // Resetear el título
    tituloTienda.textContent = "Todos los productos"

    // 4. Aplicar los cambios (Volverá a mostrar todo)
    aplicarFiltros();
});

filtroPrecio.addEventListener('input', () => {
    precioMaxValor.textContent = filtroPrecio.value;
});




// Modal para ver los detalles del producto
window.abrirDetalleProducto = (id) => {
    // 1. Buscar el producto por ID
    const p = inventario.find(prod => prod.id === id);
    const index = varianteActualPorProducto.get(id) || 0;
    const variante = p.variantes?.[index];


    if(!p)
        return;

    // Fondo con opacidad menor a 1 (Overlay)
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.6)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';

    // Caja con la info
    const detalle = document.createElement('div');
    detalle.style.backgroundColor = '#ffffff';
    detalle.style.borderRadius = '20px';
    detalle.style.width = '60%';
    detalle.style.maxWidth = '900px';
    detalle.style.maxHeight = '75vh';
    detalle.style.display = 'flex';
    detalle.style.borderRadius = '12px';
    detalle.style.overflow = 'hidden';
    detalle.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    
    // Columna izquierda con la imagen
    const columnaImagen = document.createElement('div');
    columnaImagen.style.flex = '1';
    columnaImagen.style.display = 'flex';
    columnaImagen.style.alignItems = 'center';
    columnaImagen.style.justifyContent = 'center';
    columnaImagen.style.backgroundColor = '#f5f5f5';
    columnaImagen.style.borderRight = '1px solid #ddd';

    const img = document.createElement('img');
    img.src = variante ? variante.imagen : p.imagen;
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.objectFit = 'contain';

    columnaImagen.appendChild(img);

    // Columna derecha con la información del prooducto
    const columnaInfo = document.createElement('div');
    columnaInfo.style.flex = '1';
    columnaInfo.style.display = 'flex';
    columnaInfo.style.flexDirection = 'column';
    columnaInfo.style.justifyContent = 'flex-start';
    columnaInfo.style.overflowY = 'auto';
    columnaInfo.style.padding = '30px';


    columnaInfo.innerHTML = `
        <h3 style="background:#9b59b6; color:white; padding:18px 22px; border-radius:10px; font-size:24px; font-weight:700; margin-bottom:30px; display:inline-block; margin-right: 40px;">
            ${variante ? `${p.nombre} – ${variante.nombre}` : p.nombre}
        </h3>

        <div style="background:#f3e9fb; padding:12px 16px; border-radius:12px; margin-top:15px; margin-bottom:30px; display:inline-block;margin-right: 40px;">
            <span style="font-size:18px; font-weight:600; color:#7d3c98;">Precio:</span>
            <span style="font-size:24px; font-weight:700; color:#555; margin-left:8px;">
                ${p.precio}€
            </span>
        </div>


        <div style=" background:#f9f6fc; padding:10px 15px; border-radius:10px; margin-bottom:20px; display:inline-block; margin-right: 40px;">
            <span style="font-weight:600; color:#7d3c98;">Tipo:</span>
            <span style="color:#555; margin-left:8px;"> 
                ${p.tipo}</span>
        </div>


        <div style=" margin-top:20px; padding-top:20px; border-top:1px solid #eee; margin-right: 40px; margin-left: 10px;">
            <p style=" font-weight:600; margin-bottom:10px; color:#7d3c98; ">Descripción:</p>
            <p style=" line-height:1.6; color:#555;">
                ${p.descripcion}
            </p>
        </div>
    `;

    // La x para cerrar
    const cerrar = document.createElement('button');
    cerrar.textContent = '✕';
    cerrar.style.position = 'absolute';
    cerrar.style.top = '15px';
    cerrar.style.right = '20px';
    cerrar.style.border = 'none';
    cerrar.style.background = 'transparent';
    cerrar.style.fontSize = '20px';
    cerrar.style.cursor = 'pointer';
    cerrar.style.color = '#333';
    cerrar.style.fontWeight = 'bold';


    cerrar.addEventListener('click', () => {
        overlay.remove();
    });

    detalle.style.position = 'relative';
    detalle.appendChild(cerrar);

    // Todo junto
    detalle.appendChild(columnaImagen);
    detalle.appendChild(columnaInfo);
    overlay.appendChild(detalle);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden'; // Para que lo de detrás no se pueda scrollear

    // Efecto al modal para que cuando se abra mole mas jeje
    detalle.style.opacity = '0';
    detalle.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
        detalle.style.opacity = '1';
    }, 10);

    // Al clickar fuera --> Se cierra
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
            document.body.style.overflow = ''; // Para que no se mueva el fondo
        }
    });
};


// Inicio
document.addEventListener('DOMContentLoaded', () => {
    renderizarTienda();
    renderizarCarrito();
});