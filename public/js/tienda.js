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
    get id() { return this.#id; }
}

/* =========================
   2. CLASES HIJAS
   ========================= */
export class JuegoEstrategia extends Producto {
    constructor(nombre, precio, descripcion, imagen, complejidad) {
        super(nombre, precio, descripcion, imagen);
        this.complejidad = complejidad;
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
   3. INVENTARIO INICIAL
   ========================= */
export const inventario = [
    new JuegoEstrategia('Catan', 35, 'Estrategia pura.', 'imagenes/default.png', 'Media'),
    new JuegoRol('Zelda', 60, 'Aventura épica.', 'imagenes/default.png', 'Fantasy'),
    new Puzzle('Paisaje', 15, '1000 piezas.', 'imagenes/default.png', 1000)
];
