import { Producto } from './producto.js';

export class Merchandising extends Producto {
    #tipoMaterial;

    constructor(n, p, d, i, material) {
        super(n, p, d, i);
        this.#tipoMaterial = material;
    }

    get tipoMaterial() { return this.#tipoMaterial; }
    set tipoMaterial(v) { this.#tipoMaterial = v; }
}