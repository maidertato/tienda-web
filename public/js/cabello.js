import { Producto } from './producto.js';

export class Cabello extends Producto {
    #estilo;
    #tamaño;
    #tipoMascota;
    #color;

    constructor(n, p, d, dL, i, estilo, tamaño, tipoMascota, color) {
        super(n, p, d, dL, i, 'Cabello');

        this.#estilo = estilo;
        this.#tamaño = tamaño;
        this.#tipoMascota = tipoMascota;
        this.#color = color;
    }


    get estilo() { return this.#estilo; }
    set estilo(v) { this.#estilo = v; }

    get tamaño() { return this.#tamaño; }
    set tamaño(v) { this.#tamaño = v; }

    get tipoMascota() { return this.#tipoMascota; }
    set tipoMascota(v) { this.#tipoMascota = v; }

    get color() { return this.#color; }
    set color(v) { this.#color = v; }
}