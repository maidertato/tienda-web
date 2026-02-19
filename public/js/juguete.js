import { Producto } from './producto.js';

export class Juguete extends Producto {
    #tipo;
    #tamano;
    #esInteractivo;

    constructor(n, p, d, i, tipo, tamano, interactivo) {
        super(n, p, d, i, 'Juguete');

        this.#tipo = tipo;
        this.#tamano = tamano;
        this.#esInteractivo = interactivo;
    }

    get tipo() { return this.#tipo; }
    set tipo(v) { this.#tipo = v; }

    get tamano() { return this.#tamano; }
    set tamano(v) { this.#tamano = v; }

    get esInteractivo() { return this.#esInteractivo; }
    set esInteractivo(v) { this.#esInteractivo = v; }
}