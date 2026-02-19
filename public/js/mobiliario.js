import { Producto } from './producto.js';

export class Mobiliario extends Producto {
    #material;
    #usoInterior;

    constructor(n, p, d, i, material, usoInterior) {
        super(n, p, d, i, 'Mobiliario');

        this.#material = material;
        this.#usoInterior = usoInterior;
    }

    get material() { return this.#material; }
    set material(v) { this.#material = v; }

    get usoInterior() { return this.#usoInterior; }
    set usoInterior(v) { this.#usoInterior = v; }
}