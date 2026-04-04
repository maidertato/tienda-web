import Producto from './producto.js';

export default class Juguete extends Producto {
    #categoriajuguete;
    #tamano;
    #esInteractivo;

    constructor(n, p, d, i, tipo, tamano, interactivo) {
        super(n, p, d, i, 'Juguete');

        this.#categoriajuguete = tipo;
        this.#tamano = tamano;
        this.#esInteractivo = interactivo;
    }

    get categoriajuguete() { 
        return this.#categoriajuguete; 
    }

    set categoriajuguete(v) { 
        this.#categoriajuguete = v; 
    }

    get tamano() { 
        return this.#tamano; 
    }

    set tamano(v) { 
        this.#tamano = v; 
    }

    get esInteractivo() { 
        return this.#esInteractivo; 
    }

    set esInteractivo(v) { 
        this.#esInteractivo = v; 
    }
}