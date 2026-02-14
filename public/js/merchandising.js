import { Producto } from './producto.js';

export class Merchandising extends Producto {
    #tipoMascota;
    #talla;
    #color;

    constructor(n, p, d, i,dL, tipoMascota, talla, color) {
        super(n, p, d, i,dL);
        this.#tipoMascota = tipoMascota;
        this.#talla = talla;
        this.#color = color;
    }

    get tipoMascota() { return this.#tipoMascota; }
    set tipoMascota(v) { this.#tipoMascota = v; }

    get talla() { return this.#talla; }
    set talla(v) { this.#talla = v; }

    get color() { return this.#color; }
    set color(v) { this.#color = v; }
}