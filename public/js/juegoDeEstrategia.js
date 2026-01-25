import { Producto } from './producto.js';

export class JuegoEstrategia extends Producto {
    #dificultad; // Escala del 1 al 5 o "Baja/Media/Alta"

    constructor(n, p, d, i, dificultad) {
        super(n, p, d, i);
        this.#dificultad = dificultad;
    }

    get dificultad() { return this.#dificultad; }
    set dificultad(v) { this.#dificultad = v; }
}