import { inventario, agregarProductoAlInventario, carrito, obtenerAtributoExtra } from './tienda.js';

const normalizarTexto = (texto) => {
    return texto ? texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
};


// --- SELECTORES ---
const buscador = document.getElementById('buscador');
const tituloTienda = document.getElementById('titulo-tienda');
const extraContainer = document.getElementById('campo-extra-container');
const contenedor = document.getElementById('lista-productos');
const carritoContenedor = document.getElementById('carrito-body');
const form = document.getElementById('form-producto');
const selectTipo = document.getElementById('tipo-producto');
const inputFile = document.getElementById('input-file');
const dropZone = document.getElementById('drop-zone');
const dropText = document.getElementById('drop-text');

inputFile.accept = "image/jpeg, image/png";

const varianteActualPorProducto = new Map();

// --- FILTRO POR CATEGORÍA ---
const categorias = ["Mobiliario", "Cabello", "Juguete", "Merchandising", "Alimentación", "Accesorios"];
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


// --- RENDER TIENDA ---
export function renderizarTienda() {
    if (!contenedor) return;
    contenedor.innerHTML = '';

    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productosFiltrados.slice(inicio, fin);

    if (productosPagina.length === 0) {
        contenedor.innerHTML = '<p class="text-center">No se encontraron productos.</p>';
        actualizarInterfazPaginacion()
        return;
    }

    productosPagina.forEach(producto => {
        const variantes = producto.variantes;

        let imagenMostrada = producto.imagen || "imagenes/productos/default.png";
        let nombreMostrado = producto.nombre || "Producto sin nombre";

        const index = varianteActualPorProducto.get(producto.id) || 0;
        const variante = producto.variantes?.[index];
        const claveCarrito = variante ? `${producto.id}_${variante.nombre}` : producto.id;
        const itemEnCarrito = carrito.get(claveCarrito);
        const alcanzadoMaximo = itemEnCarrito && itemEnCarrito.cantidad >= 20;

        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4';
        card.innerHTML = `
            <div class="card h-100 position-relative card-producto-tienda m-2">
                <button class="btn-agregar-flotante ${alcanzadoMaximo ? 'disabled' : ''}" 
                        data-id="${producto.id}" 
                        ${alcanzadoMaximo ? 'disabled' : ''}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" pointer-events="none">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </button>

                <div class="imagen-wrapper">
                    <img src="${imagenMostrada}" class="card-img-top imagen-producto" data-id=${producto.id}>

                    ${variantes && variantes.length > 1 ? `
                        <div class="flecha flecha-izq" data-id="${producto.id}" data-dir="-1"></div>
                        <div class="flecha flecha-der" data-id="${producto.id}" data-dir="1"></div>
                    ` : ''}
                </div>

                <div class="card-body d-flex flex-column">
                    <h5 class="card-title line-clamp-2">${nombreMostrado}</h5>
                    <p class="card-text fw-bold fs-5 mb-2">${producto.precio}€</p>
                    <p class="card-text extra-attr text-muted mt-2"><small><strong>${obtenerAtributoExtra(producto)}</strong></small></p>
                    <p class="card-text descripcion-producto line-clamp-3">${producto.descripcion}</p>
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });

    actualizarInterfazPaginacion();
}

// ==================================== BOTÓN FLOTANTE CARRITO ====================================
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
            // crear el globito
            const globo = document.createElement('div');
            globo.className = 'mensaje-exito-flotante';
            globo.textContent = '¡Añadido con éxito!';
            btn.parentElement.appendChild(globo);

            setTimeout(() => {
                globo.classList.add('fade-out');
                setTimeout(() => {
                    globo.remove();
                }, 300);
            }, 1500);

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

            // Si se llega al maximo ( 20 copias del producto) hay que desactivar el botón de esa card
            const itemEnCarrito = carrito.get(claveCarrito);
            if (itemEnCarrito.cantidad >= 20) { 
                btn.disabled = true;
                btn.classList.add('disabled');  
            } else {
                btn.disabled = false;
                btn.classList.remove('disabled');
            }
        }
    }
    //Click sobre la imagen
    if (e.target.classList.contains('imagen-producto')) {
        const id = e.target.dataset.id;
        abrirDetalleProducto(id);
    }
});

// ==================================== > y < para cambiar de producto ====================================
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
    // Buscar la card que buscamos para que no se actualice toda la tienda, sino solo esa card
    const card = flecha.closest('.card-producto-tienda');
    if (card) {
        const imgElement = card.querySelector('.imagen-producto');
        const tituloElement = card.querySelector('.card-title');
        const btnAgregar = card.querySelector('.btn-agregar-flotante');
        const nuevaVariante = producto.variantes[siguiente];

        const claveNuevaVariante = `${producto.id}_${nuevaVariante.nombre}`;
        const item = carrito.get(claveNuevaVariante);

        if (item?.cantidad >= 20) {
            btnAgregar.disabled = true;
            btnAgregar.classList.add('disabled');
        } else {
            btnAgregar.disabled = false;
            btnAgregar.classList.remove('disabled');
        }

        // Cambiamos solo lo necesario
        imgElement.src = nuevaVariante.imagen;
        tituloElement.textContent = `${producto.nombre} – ${nuevaVariante.nombre}`;
    }
});

// ====================================  FORMULARIO  ====================================
function mostrarMensaje(tipo, texto) {
    const formulario = document.getElementById("form-producto"); // Tu ID real
    if (!formulario) return;

    const alerta = document.createElement('div');
    
    const claseTipo = tipo === 'error' ? 'alert-danger' : 'alert-success';
    alerta.className = `alert ${claseTipo} mt-3 animate__animated animate__fadeIn`;
    alerta.style.fontSize = "0.9rem";
    alerta.textContent = texto;

    formulario.appendChild(alerta);

    setTimeout(() => {
        alerta.style.opacity = '0';
        alerta.style.transition = 'opacity 0.5s ease';
        setTimeout(() => alerta.remove(), 500);
    }, 2000);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombreInput = document.getElementById('productName') || form.querySelector('input[placeholder*="Nombre"]');
    const precioInput = document.getElementById('productPrice') || form.querySelector('input[type="number"]');
    const descInput = document.getElementById('productDescription') || form.querySelector('textarea');

    // Coger valores del formulario
    const nombre = nombreInput.value.trim();
    const precio = parseFloat(precioInput.value);
    const descripcion = descInput.value.trim();
    const tipo = selectTipo.value;
    const valorExtra = document.getElementById('campo-extra')?.value.trim() || "";

    const inputReal = document.getElementById('input-file');

    if (!tipo) {
        mostrarMensaje('error', 'Debes escoger un tipo de producto');
        return;
    }

    if (!nombre || isNaN(precio)) {
        mostrarMensaje("error", "Rellena nombre y precio");
        return;
    }

    const file = inputReal.files[0];
    const imagen = inputReal.files.length > 0
        ? URL.createObjectURL(inputReal.files[0])
        : 'imagenes/productos/default.png';

    
    const datosContenedor = { nombre, precio, descripcion, imagen };
    switch (tipo) {
        case 'mobiliario':
            datosContenedor.material = valorExtra;
            break;

        case 'juguete':
            datosContenedor.tipoJuguete = valorExtra;
            break;

        case 'alimentacion':
            datosContenedor.tipoAlimento = valorExtra;
            break;

        case 'accesorios':
            datosContenedor.tipoAccesorio = valorExtra;
            break;

        case 'merchandising':
            datosContenedor.categoria = valorExtra;
            break;

        case 'cabello':
            datosContenedor.estilo = valorExtra;
            break;

        default:
            console.warn("Tipo no reconocido");
    }

    const exito = agregarProductoAlInventario(tipo, datosContenedor);
    if (exito) {
        if (typeof inventario !== 'undefined') {
            productosFiltrados = [...inventario];
        }

        if (typeof paginaActual !== 'undefined') paginaActual = 1;

        renderizarTienda();
        limpiarTodoElFormulario();
        mostrarMensaje("success", "¡Producto añadido con éxito!");
    } else {
        mostrarMensaje("error", "Hubo un problema al guardar el producto");
    }
});

function limpiarTodoElFormulario() {
    form.reset();
    extraContainer.innerHTML = '';
    inputFile.value = "";
    dropText.textContent = "Arrastra tu imagen aquí";
    const imgPreview = dropZone.querySelector('img');
    if (imgPreview) imgPreview.remove();
}

selectTipo.addEventListener('change', () => {
    extraContainer.innerHTML = '';

    const placeholders = {
        mobiliario: "Material",
        alimentacion: "Tipo Alimento",
        cabello: "Estilo",
        juguete: "Tipo",
        merchandising: "Parte del cuerpo",
        accesorios: "Tipo mascota"    };

    const placeholder = placeholders[selectTipo.value];

    if (!placeholder) return;

    const inputExtra = document.createElement("input");
    inputExtra.className = "form-control";
    inputExtra.required = true;
    inputExtra.id = "campo-extra";
    inputExtra.placeholder = placeholder;

    extraContainer.appendChild(inputExtra);
});
    
    // ===================== VALIDAR IMAGEN PARA LE DRAG & DROP =====================
function validarArchivo(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    
    return validTypes.includes(file.type);
}
    // ===================== DRAG & DROP =====================

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.add("hover");
    dropText.textContent = "Suelta la imagen";
});

dropZone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove("hover");
    dropText.textContent = "Arrastra tu imagen aquí";
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove("hover");

    const files = e.dataTransfer.files;
    const inputReal = document.getElementById('input-file');
    const predefText = "Arrastra tu imagen aquí";

    if (files.length !== 1) {
        mostrarMensaje("error", "Solo puedes subir un archivo");
        return;
    }

    // Si ya hay imagen --> ERRORRR
    if (inputReal.files.length > 0) {
        mostrarMensaje("error", "Ya hay una imagen seleccionada");
        return;
    }

    const file = files[0];
    
    // validacion del tipo de archivo
    if (!validarArchivo(file)) {
        inputReal.value = '';
        dropText.textContent = predefText;

        mostrarMensaje("error", "El formato del archivo no es válido. Debe ser JPG/JPEG o PNG.");
        return;
    }

    // Asignar archivo al input
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    inputReal.files = dataTransfer.files;

    const mensajeAnterior = dropText.textContent;

    
    dropText.textContent = "¡Imagen añadida!";

    // Tiempo del mensaje definido
    setTimeout(() => {
        dropText.textContent = mensajeAnterior;
    }, 1500);

});
// ====================================  CARRITO  ====================================
function renderizarCarrito() {
    if (!carritoContenedor) return;
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
        actualizarIconoCarrito(0);

        // ============================ DE LA VISTA DEL CARRITO, AÑADIR EVENT LISTENER PARA IR DE LA VISTA DEL CARRITO AL INICIO  ============================
        const btnInicio = carritoContenedor.querySelector('.btn-inicio');

        btnInicio.addEventListener('click', () => {
            const offcanvasElement = document.getElementById('carrito');
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);

            if (offcanvasInstance) {
                offcanvasInstance.hide();
            }
        });

        return;
    }

    // ============================ RENDERIZAR LOS PRODUCTOS DEL CARRITO  ============================
    let cantidadTotal = 0;
    carrito.forEach((item, id) => {
        cantidadTotal += item.cantidad;
        totalCarrito += item.precio * item.cantidad;
        const div = document.createElement('div');
        div.className = 'carrito-item p-2 mb-2 border-bottom';
        div.innerHTML = ` 
            <div class="carrito-item-flex d-flex align-items-start gap-3 w-100">
                <img src="${item.imagen}"style="width: 60px; height: 60px; object-fit: cover;" class="rounded">
                <div class="flex-grow-1">
                    <div class="fw-bold small text-truncate" title="${item.nombre}">
                        ${item.nombre}
                    </div>
            
                    <div class="d-flex align-items-center gap-1 mt-1">
                        <span class="precio-unitario text-muted">${item.precio.toFixed(2)}€</span>
                        <span>x</span>
                        <input type="number" class="input-cantidad form-control form-control-sm text-center" data-id="${id}" value="${item.cantidad}" min="0" style="width: 50px;"> 
                        <span>=</span>
                        <span class="precio-total-producto fw-bold">${(item.precio * item.cantidad).toFixed(2)}€</span>
                    </div>
                </div>
                <button class="btn-papelera text-danger btn btn-sm" onclick="eliminarDelCarrito('${id}')" title="Eliminar producto">
                    <svg style="width: 18px;" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6h18M9 6v-2a1 1 0 011-1h4a1 1 0 011 1v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" 
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
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
        input.addEventListener('input', (e) => {
            const idCarrito = e.target.getAttribute('data-id');
            let nuevaCantidad = parseInt(e.target.value);

            const carritoItem = e.target.closest('.carrito-item');
            let aviso = carritoItem.querySelector('.aviso-maximo');            
            
            // Evitar errores al escribir manualemnte
            if (e.target.value === '') {
                return; 
            }

            // Si 0 --> Elimina el prducto
            if (nuevaCantidad <= 0) {
                eliminarDelCarrito(idCarrito);
                return; // Paramos la ejecución aquí
            }
            // MAXIMO 20
            if (nuevaCantidad > 20) {
                    nuevaCantidad = 20;
                    e.target.value = 20;
                
                if (!aviso) {
                    aviso = document.createElement('div');
                    aviso.className = 'aviso-maximo';
                    aviso.textContent = 'No se permiten más de 20 copias.';
                    carritoItem.appendChild(aviso);
                    
                    setTimeout(() => {
                        if (aviso && aviso.parentNode) {
                            aviso.remove();
                        }
                    }, 2500);
                }
            }else {
                    // Si baja de 20, borramos el aviso
                    if (aviso) aviso.remove();
            }

            // Actualizamos el producto en el Map
            if (carrito.has(idCarrito)) {
                const producto = carrito.get(idCarrito);
                producto.cantidad = nuevaCantidad;

                const precioLinea = carritoItem.querySelector('.precio-total-producto');
                if (precioLinea) {
                    precioLinea.textContent = `${(producto.precio * nuevaCantidad).toFixed(2)}€`;
                }
                let totalUnidades = 0;
                carrito.forEach(p => totalUnidades += p.cantidad);
                actualizarIconoCarrito(totalUnidades);

                let nuevoTotalEuros = 0;
                carrito.forEach(p => nuevoTotalEuros += p.precio * p.cantidad);

                const totalDisplay = carritoContenedor.querySelector('strong');
                if (totalDisplay) {
                    totalDisplay.textContent = `Total: ${nuevoTotalEuros.toFixed(2)}€`;
                }
                
                const [productoId, varianteNombre] = idCarrito.split('_');
        
                // Averiguamos qué variante se está mostrando en la tienda ahora mismo
                const indexActual = varianteActualPorProducto.get(productoId) || 0;
                const prodInventario = inventario.find(p => p.id === productoId);
                const varianteActual = prodInventario?.variantes?.[indexActual];
                const nombreVarianteActual = varianteActual ? varianteActual.nombre : undefined;

                const card = document.querySelector(`.card-producto-tienda [data-id="${productoId}"]`)?.closest('.card-producto-tienda');
                
                if (card) {
                    const btnAgregar = card.querySelector('.btn-agregar-flotante');
                    
                    // Clave: Solo bloqueamos el botón si la variante que vemos es la misma que llegó a 20 en el carrito
                    if (varianteNombre === nombreVarianteActual || (!varianteNombre && !nombreVarianteActual)) {
                        if (nuevaCantidad >= 20) {
                            btnAgregar.disabled = true;
                            btnAgregar.classList.add('disabled');
                        } else {
                            btnAgregar.disabled = false;
                            btnAgregar.classList.remove('disabled');
                        }
                    }
                }
            }
        });

        input.addEventListener('blur', (e) => {
            if (e.target.value === '' || parseInt(e.target.value) < 1) {
                const id = e.target.getAttribute('data-id');
                eliminarDelCarrito(id);
            }
        });
    });
}

// FUNCION ELIMINAR
window.eliminarDelCarrito = (id) => {
    // Eliminamos el producto del Map usando su ID
    if (carrito.has(id)) {
        carrito.delete(id);
        renderizarCarrito();

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


function actualizarInterfazPaginacion() {
    const total = productosFiltrados.length;
    const numPaginas = Math.ceil(total / productosPorPagina);
    const nav = document.getElementById('pagination-container');
    const info = document.getElementById('info-paginacion');
    
    if (!nav) return;

    nav.innerHTML = '';
    // =============================================================================================
    // TEXTO: Mostrando (numero de productos) de (numero de productos totales) productos
    // =============================================================================================
    if (total === 0) {
        info.textContent = 'Mostrando 0 de 0 productos';
        return;
    }

    const inicio = (paginaActual - 1) * productosPorPagina ;
    const fin = Math.min(inicio + productosPorPagina, total);
    const mostrado = total === 0 ? 0 : fin - inicio;

    info.textContent = `Mostrando ${mostrado} de ${total} productos`;


    // ===============================
    // BOTÓN ANTERIOR (si NO es la primera)
    // ===============================
    if (paginaActual > 1) {
        nav.innerHTML += `
            <li class="page-item ">
                <button class="page-link" onclick="cambiarPagina(${paginaActual - 1})">
                    Anterior
                </button>
            </li>
        `;
    }
    // ===============================
    // BOTONES NUMÉRICOS
    // ===============================
    for (let i = 1; i <= numPaginas; i++) {
        nav.innerHTML += `
            <li class="page-item ${i === paginaActual ? 'active' : ''}">
                <button class="page-link" onclick="cambiarPagina(${i})">
                    ${i}
                </button>
            </li>
        `;
    }

    // ===============================
    // BOTÓN SIGUIENTE (si NO es la última)
    // ===============================
    if (paginaActual < numPaginas) {
        nav.innerHTML += `
            <li class="page-item ${paginaActual === numPaginas ? 'disabled' : ''}">
                <button class="page-link" onclick="cambiarPagina(${paginaActual + 1})">
                    Siguiente
                </button>
            </li>
        `;
    }
}

const btnInicio = document.getElementById("btn-inicio");


window.cambiarPagina = (n) => {
    paginaActual = n;
    renderizarTienda();
};

// Función centralizada de filtrado
function aplicarFiltros() {
    const termino = buscador ? normalizarTexto(buscador.value) : "";
    const precioMax = filtroPrecio ? parseFloat(filtroPrecio.value) : Infinity;

    productosFiltrados = inventario.filter(p => {
        const nombreProd = normalizarTexto(p.nombre || "");
        const coincideTexto = nombreProd.includes(termino);
        const coincidePrecio = (p.precio || 0) <= precioMax;

        if (categoriaSeleccionada === "all") {
            return coincideTexto && coincidePrecio;
        }

        // Normalizamos ambos para evitar fallos por tildes o mayúsculas
        const catNormalizada = normalizarTexto(categoriaSeleccionada);
        const tipoProdNormalizado = normalizarTexto(p.tipo || "");

        // Verificamos si coincide el tipo principal (clase) 
        // o si es una instancia de Alimentacion/Merchandising
        const coincideCategoria = tipoProdNormalizado === catNormalizada;
        return coincideTexto && coincidePrecio && coincideCategoria;
    });
    if (tituloTienda) {
        if (termino !== "") {
            tituloTienda.textContent = `Buscando por: "${buscador.value}"`;
        } else if (categoriaSeleccionada !== "all") {
            tituloTienda.textContent = `Categoría: ${categoriaSeleccionada}`;
        } else if (precioMax < 100) {
            tituloTienda.textContent = `Productos hasta ${precioMax}€`;
        } else {
            tituloTienda.textContent = "Todos los productos";
        }
    }

    // RESET DE PAGINACIÓN Y RENDER
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

    document.querySelectorAll('.dropdown-item').forEach(el => el.classList.remove('active'));
    link.classList.add('active');

    aplicarFiltros();
});

const btnBorrar = document.getElementById('btn-borrar-filtros');

btnBorrar?.addEventListener('click', () => {
    // Limpiar Buscador
    if (buscador) buscador.value = "";

    // Resetear Precio (Volver al máximo)
    if (filtroPrecio) {
        filtroPrecio.value = 100;
        precioMaxValor.textContent = "100";
    }

    // Resetear Categoría
    categoriaSeleccionada = "all";

    //Limpiar estilos visuales de categorías
    document.querySelectorAll('.dropdown-item').forEach(el => el.classList.remove('active'));

    // Resetear el título
    if (tituloTienda) tituloTienda.textContent = "Todos los productos";
    // Reseteamos el array de filtrados al inventario completo
    productosFiltrados = [...inventario];
    paginaActual = 1;

    // Aplicar los cambios
    aplicarFiltros();
});

filtroPrecio.addEventListener('input', () => {
    precioMaxValor.textContent = filtroPrecio.value;
});



// ==================================== Modal para ver los detalles del producto ==================================== 
window.abrirDetalleProducto = (id) => {
    const p = inventario.find(prod => prod.id === id);
    const index = varianteActualPorProducto.get(id) || 0;
    const variante = p.variantes?.[index];

    if (!p)
        return;

    // Fondo con opacidad menor a 1 (Overlay)
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    // Caja con la info
    const detalle = document.createElement('div');
    detalle.className = 'modal-detalle';

    // Columna izquierda con la imagen
    const columnaImagen = document.createElement('div');
    columnaImagen.className = 'modal-columna-imagen';
    
    const img = document.createElement('img');
    img.src = variante ? variante.imagen : p.imagen;
    img.className = 'modal-imagen';
    columnaImagen.appendChild(img);

    // Columna derecha con la información del prooducto
    const columnaInfo = document.createElement('div');
    columnaInfo.className = 'modal-columna-info';


    columnaInfo.innerHTML = `
        <h3 class="modal-titulo">
            ${variante ? `${p.nombre} – ${variante.nombre}` : p.nombre}
        </h3>

        <div class="modal-bloque-precio">
            <span style="font-size:18px; font-weight:600; color:#7d3c98;">Precio:</span>
            <span style="font-size:24px; font-weight:700; color:#555; margin-left:8px;">
                ${p.precio}€
            </span>
        </div>

        <div class="modal-bloque-tipo">
            <span style="font-weight:600; color:#7d3c98;">Tipo:</span>
            <span style="color:#555; margin-left:8px;"> 
                ${p.tipo}
            </span>
        </div>

        <div class="modal-bloque-desc">
            <p style="font-weight:600; margin-bottom:10px; color:#7d3c98;">Descripción:</p>
            <p style="line-height:1.6; color:#555;">
                ${p.descripcion}
            </p>
        </div>
    `;

    // La x para cerrar
    const cerrar = document.createElement('button');
    cerrar.textContent = '✕';
    cerrar.className = 'modal-btn-cerrar';

    cerrar.addEventListener('click', () => {
        overlay.remove();
    });
    detalle.appendChild(cerrar);

    // Todo junto
    detalle.appendChild(columnaImagen);
    detalle.appendChild(columnaInfo);
    overlay.appendChild(detalle);
    document.body.appendChild(overlay);

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

document.addEventListener("DOMContentLoaded", () => {
    renderizarTienda();
    renderizarCarrito();

    const btnInicio = document.getElementById("btn-inicio");
    if (btnInicio) {
        btnInicio.addEventListener("click", (e) => {
            e.preventDefault();
            categoriaSeleccionada = "all";
            productosFiltrados = [...inventario];
            paginaActual = 1;
            if (tituloTienda) tituloTienda.textContent = "Todos los productos";
            renderizarTienda();
        });
    }
});