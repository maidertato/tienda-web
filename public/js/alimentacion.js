import { Producto } from './producto.js';

export class Alimentacion extends Producto {
    #tipoMascota;
    #tipoAlimento; 

    constructor(n, p, d, i, tipoMascota, tipoAlimento) {
        super(n, p, d, i);
        this.#tipoMascota = tipoMascota;
        this.#tipoAlimento = tipoAlimento;

        this.tipo = 'alimentacion';

    }

    get tipoMascota() { return this.#tipoMascota; }
    set tipoMascota(v) { this.#tipoMascota = v; }

    get tipoAlimento() { return this.#tipoAlimento; }
    set tipoAlimento(v) { this.#tipoAlimento = v; }
}