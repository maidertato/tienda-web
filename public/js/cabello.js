import { Producto } from './producto.js';

export class Cabello extends Producto {
    #tamaño;
    #tipoMascota;
    #color;

    constructor(n, p, d, i,dL, tamaño, tipoMascota, color) {
        super(n, p, d, i,dL);
        this.#tamaño = tamaño;
        this.#tipoMascota = tipoMascota;
        this.#color = color;
    }

    get tamaño() {
        return this.#tamaño;
    }
    set tamaño(v) {
        this.#tamaño = v;
    }

    get tipoMascota() {
        return this.#tipoMascota;

    }
    set tipoMascota(v) {
        this.#tipoMascota = v;
    }

    get color() {
        return this.#color;
    }

    set color(v) {
        this.#color = v;
    }
}