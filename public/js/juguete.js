import { Producto } from './producto.js';

export class Juguete extends Producto {
    #material;
    #tamano;
    #esInteractivo;

    constructor(n, p, d, i, material, tamano, interactivo) {
        super(n, p, d, i);
        this.#material = material;
        this.#tamano = tamano;
        this.#esInteractivo = interactivo;
    }

    get material() { return this.#material; }
    set material(v) { this.#material = v; }

    get tamano() { return this.#tamano; }
    set tamano(v) { this.#tamano = v; }

    get esInteractivo() { return this.#esInteractivo; }
    set esInteractivo(v) { this.#esInteractivo = v; }
}