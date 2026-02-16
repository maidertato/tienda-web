import { Producto } from './producto.js';

export class Alimentacion extends Producto {
    #tipoMascota;
    #tipoAlimento;

    constructor(n, p, d, dL, i, tipoMascota, tipoAlimento) {
        super(n, p, d, dL, i, 'Alimentación'); 
        
        this.#tipoMascota = tipoMascota;
        this.#tipoAlimento = tipoAlimento;
    }

    get tipoMascota() { return this.#tipoMascota; }
    set tipoMascota(v) { this.#tipoMascota = v; }

    get tipoAlimento() { return this.#tipoAlimento; }
    set tipoAlimento(v) { this.#tipoAlimento = v; }
}