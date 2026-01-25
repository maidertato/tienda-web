// 1. Superclase Producto
export class Producto {
    #id; 

    constructor(nombre, precio, descripcion, imagen = "imagenes/default.png") {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.descripcion = descripcion;
        this.imagen = imagen;
        // Genera ID único (solo lectura)
        this.#id = btoa(nombre + Math.random()).substring(0, 10);
    }

    get id() { return this.#id; }
}

// Las 5 Clases Hijas 
export class JuegoEstrategia extends Producto {
    constructor(nombre, precio, descripcion, imagen, complejidad) {
        super(nombre, precio, descripcion, imagen);
        this.complejidad = complejidad; // Atributo extra
    }
}
// JUEGO FAMILIAR
export class JuegoFamiliar extends Producto {
    constructor(nombre, precio, descripcion, imagen, edadMinima) {
        super(nombre, precio, descripcion, imagen);
        this.edadMinima = edadMinima;
    }
}
// JUEGO DE CARTAS
export class JuegoCartas extends Producto {
    constructor(nombre, precio, descripcion, imagen, numCartas) {
        super(nombre, precio, descripcion, imagen);
        this.numCartas = numCartas;
    }
}
// JUEGO DE ROL
export class JuegoRol extends Producto {
    constructor(nombre, precio, descripcion, imagen, sistema) {
        super(nombre, precio, descripcion, imagen);
        this.sistema = sistema;
    }
}
// PUZZLE
export class Puzzle extends Producto {
    constructor(nombre, precio, descripcion, imagen, numPiezas) {
        super(nombre, precio, descripcion, imagen);
        this.numPiezas = numPiezas;
    }
}

//Estructuras de datos globales
export const inventario = [];
export const carrito = {}; 

// PRODUCTOS DE LA TIENDA

inventario.push(
    new JuegoEstrategia(
        "Catan",
        39.99,
        "Juego de comercio y estrategia.",
        "",
        3
    )
);

inventario.push(
    new JuegoFamiliar(
        "Dixit",
        29.99,
        "Juego creativo de imaginación.",
        "",
        8
    )
);
