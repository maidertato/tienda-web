import { Producto } from './producto.js';

export class JuegoMesa extends Producto {
    #edadRecomendada;

    constructor(n, p, d, i, edad) {
        super(n, p, d, i);
        this.#edadRecomendada = edad;
    }

    get edadRecomendada() { return this.#edadRecomendada; }
    set edadRecomendada(v) { this.#edadRecomendada = v; }
}