import Producto from './producto.js';

export default class Alimentacion extends Producto {
    #tipoAlimento;
    #tipoMascota;

    constructor(n, p, d, i, tipoAlimento, tipoMascota ) {
        super(n, p, d, i, 'Alimentación'); 
        
        this.#tipoMascota = tipoMascota;
        this.#tipoAlimento = tipoAlimento;
    }

    get tipoAlimento() { return this.#tipoAlimento; }
    set tipoAlimento(v) { this.#tipoAlimento = v; }

    get tipoMascota() { return this.#tipoMascota; }
    set tipoMascota(v) { this.#tipoMascota = v; }

}