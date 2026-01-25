import { Producto } from './producto.js';

export class JuegoRol extends Producto {
    #ambientacion; // Ejemplo: "Diversión", "Terror"

    constructor(n, p, d, i, ambientacion) {
        super(n, p, d, i);
        this.#ambientacion = ambientacion;
    }

    get ambientacion() { return this.#ambientacion; }
    set ambientacion(v) { this.#ambientacion = v; }
}