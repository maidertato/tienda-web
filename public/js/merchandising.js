import { Producto } from './producto.js';

export class Merchandising extends Producto {
    #talla;
    #tipoMascota;
    #color;

    constructor(n, p, d, i, talla, tipoMascota, color) {
        super(n, p, d, i);
        this.#talla = talla;
        this.#tipoMascota = tipoMascota;
        this.#color = color;
    }

    get talla() { return this.#talla; }
    set talla(v) { this.#talla = v; }

    get tipoMascota() { return this.#tipoMascota; }
    set tipoMascota(v) { this.#tipoMascota = v; }

    get color() { return this.#color; }
    set color(v) { this.#color = v; }
}