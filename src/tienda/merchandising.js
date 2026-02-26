import Producto from './producto.js';

export default class Merchandising extends Producto {
    constructor(n, p, d, i, parteDelCuerpo, talla, color) {
        super(n, p, d, i, 'Merchandising');
        this.parteDelCuerpo = parteDelCuerpo;
        this.talla = talla;
        this.color = color;
    }
}