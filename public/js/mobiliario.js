import { Producto } from './producto.js';

export class Mobiliario extends Producto {
    #material;
    #usoInterior;

    constructor(n, p, d,dL, i, material, usoInterior) {
        super(n, p, d, dL,i);
        this.#material = material;
        this.#usoInterior = usoInterior;
    }

    // Getter y Setter específicos (Requisito 4.1.2)
    get material() { return this.#material; }
    set material(v) { this.#material = v; }

    get usoInterior() { return this.#usoInterior; }
    set usoInterior(v) { this.#usoInterior = v; }
}