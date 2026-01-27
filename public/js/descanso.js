import { Producto } from './producto.js';

export class Descanso extends Producto {
    #dimensiones;
    #lavable;

    constructor(n, p, d, i, dimensiones, lavable) {
        super(n, p, d, i);
        this.#dimensiones = dimensiones;
        this.#lavable = lavable;
    }

    get dimensiones() { return this.#dimensiones; }
    set dimensiones(v) { this.#dimensiones = v; }

    get lavable() { return this.#lavable; }
    set lavable(v) { this.#lavable = v; }
}