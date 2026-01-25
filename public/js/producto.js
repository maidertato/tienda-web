export class Producto {
    #id;
    #nombre;
    #precio;
    #descripcion;
    #imagen;

    constructor(nombre, precio, descripcion, imagen) {
        // Generar ID único automáticamente (Requisito 4.1.1)
        this.#id = btoa(nombre + Math.random()).substring(0, 10);
        this.#nombre = nombre;
        this.#precio = precio;
        this.#descripcion = descripcion;
        this.#imagen = imagen || 'default.png';
    }

    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get precio() { return this.#precio; }
    get descripcion() { return this.#descripcion; }
    get imagen() { return this.#imagen; }

    set nombre(v) { this.#nombre = v; }
    set precio(v) { this.#precio = v; }
    set descripcion(v) { this.#descripcion = v; }
}

export class Videojuego extends Producto {
    #compania;
    constructor(n, p, d, i, compania) { super(n, p, d, i); this.#compania = compania; }
    get extra() { return `Compañía: ${this.#compania}`; }
}

export class JuegoMesa extends Producto {
    #jugadores;
    constructor(n, p, d, i, jugadores) { super(n, p, d, i); this.#jugadores = jugadores; }
    get extra() { return `Jugadores: ${this.#jugadores}`; }
}

export class Puzzle extends Producto {
    #piezas;
    constructor(n, p, d, i, piezas) { super(n, p, d, i); this.#piezas = piezas; }
    get extra() { return `Piezas: ${this.#piezas}`; }
}

export class Merchandising extends Producto {
    #material;
    constructor(n, p, d, i, material) { super(n, p, d, i); this.#material = material; }
    get extra() { return `Material: ${this.#material}`; }
}

export class Accesorio extends Producto {
    #compatibilidad;
    constructor(n, p, d, i, compatibilidad) { super(n, p, d, i); this.#compatibilidad = compatibilidad; }
    get extra() { return `Para: ${this.#compatibilidad}`; }
}
