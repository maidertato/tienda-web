import { Producto } from './producto.js';

export class Merchandising extends Producto {
    #parteDelCuerpo;
    #talla;
    #color;
    
    constructor(n, p, d, i, parteDelCuerpo, talla, color) {
        super(n, p, d, i, 'Merchandising');

        this.#parteDelCuerpo = parteDelCuerpo;
        this.#talla = talla;
        this.#color = color;
    }

    get parteDelCuerpo() { return this.#parteDelCuerpo; }
    set parteDelCuerpo(v) { this.#parteDelCuerpo = v; }

    get talla() { return this.#talla; }
    set talla(v) { this.#talla = v; }

    get color() { return this.#color; }
    set color(v) { this.#color = v; }
}