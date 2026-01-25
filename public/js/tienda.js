/* =========================
   1. SUPERCLASE PRODUCTO
   ========================= */
export class Producto {
    #id;

    constructor(nombre, precio, descripcion, imagen = "imagenes/default.png") {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.#id = btoa(nombre + Math.random()).substring(0, 10);
    }

    get id() {
        return this.#id;
    }
}

/* =========================
   2. CLASES HIJAS (VERSIÓN 1)
   ========================= */
export class JuegoEstrategia extends Producto {
    constructor(nombre, precio, descripcion, imagen, complejidad) {
        super(nombre, precio, descripcion, imagen);
        this.complejidad = complejidad;
    }
}

export class JuegoFamiliar extends Producto {
    constructor(nombre, precio, descripcion, imagen, edadMinima) {
        super(nombre, precio, descripcion, imagen);
        this.edadMinima = edadMinima;
    }
}

export class JuegoCartas extends Producto {
    constructor(nombre, precio, descripcion, imagen, numCartas) {
        super(nombre, precio, descripcion, imagen);
        this.numCartas = numCartas;
    }
}

export class JuegoRol extends Producto {
    constructor(nombre, precio, descripcion, imagen, sistema) {
        super(nombre, precio, descripcion, imagen);
        this.sistema = sistema;
    }
}

export class Puzzle extends Producto {
    constructor(nombre, precio, descripcion, imagen, numPiezas) {
        super(nombre, precio, descripcion, imagen);
        this.numPiezas = numPiezas;
    }
}

/* =========================
   3. ESTRUCTURAS ORIGINALES
   (NO SE TOCAN)
   ========================= */

export const carrito = {}; // Objeto clave-valor (requisito PDF)

/* =========================
   4. DATOS INICIALES
   (IDEA DEL SEGUNDO)
   ========================= */
export const inventario = [];
inventario.push(
    new JuegoEstrategia('Catan', 35, 'Estrategia pura.', 'imagenes/default.png', 'Media'),
    new JuegoRol('Zelda', 60, 'Aventura épica.', 'imagenes/default.png', 'Fantasy'),
    new Puzzle('Paisaje', 15, '1000 piezas.', 'imagenes/default.png', 1000)
);
// Función para mostrar los productos en el HTML
export function renderizarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    
    // Limpiamos el contenedor por si acaso
    contenedor.innerHTML = "";

    inventario.forEach(producto => {
        // Creamos la estructura de la tarjeta
        const card = document.createElement('div');
        card.classList.add('producto-card');

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <span>Precio: $${producto.precio}</span>
            <button id="btn-${producto.id}">Añadir al carrito</button>
        `;

        contenedor.appendChild(card);

        // Escuchador para el botón
        const boton = card.querySelector(`#btn-${producto.id}`);
        boton.addEventListener('click', () => {
            agregarAlCarrito(producto);
            console.log(`Añadido: ${producto.nombre}`);
        });
    });
}


document.addEventListener('DOMContentLoaded', renderizarProductos);

/* =========================
   5. CARRITO MODERNO (MAP)
   ========================= */
export const carritoMap = new Map();

/* =========================
   6. FUNCIÓN AÑADIR AL CARRITO
   (COMPATIBLE CON LAS CLASES)
   ========================= */
export function agregarAlCarrito(producto) {
    if (carritoMap.has(producto.id)) {
        const item = carritoMap.get(producto.id);
        if (item.cantidad < 20) item.cantidad++;
    } else {
        carritoMap.set(producto.id, {
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    }
}

