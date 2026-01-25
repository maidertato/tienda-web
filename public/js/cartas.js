import { Producto } from './producto.js';

export class Carta extends Producto {
    #coleccion;

    constructor(n, p, d, i, coleccion) {
        super(n, p, d, i);
        this.#coleccion = coleccion;
    }

    get coleccion() { return this.#coleccion; }
    set coleccion(v) { this.#coleccion = v; }
}