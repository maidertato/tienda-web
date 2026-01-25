import { Producto } from './producto.js';

export class Videojuego extends Producto {
    #plataforma; // Ejemplo: "PS5", "PC", "Switch", "Xbox"

    constructor(n, p, d, i, plataforma) {
        super(n, p, d, i);
        this.#plataforma = plataforma;
    }

    // Getter y Setter específicos (Requisito 4.1.2)
    get plataforma() { return this.#plataforma; }
    set plataforma(v) { this.#plataforma = v; }
}