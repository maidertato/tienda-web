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
export const inventario = [];
export const carrito = {}; // Objeto clave-valor (requisito PDF)

/* =========================
   4. DATOS INICIALES
   (IDEA DEL SEGUNDO)
   ========================= */
inventario.push(
    new JuegoEstrategia('Catan', 35, 'Estrategia pura.', 'imagenes/default.png', 'Media'),
    new JuegoRol('Zelda', 60, 'Aventura épica.', 'imagenes/default.png', 'Fantasy'),
    new Puzzle('Paisaje', 15, '1000 piezas.', 'imagenes/default.png', 1000)
);

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
