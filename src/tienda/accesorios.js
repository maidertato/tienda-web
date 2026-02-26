import Producto from './producto.js';

export default class Accesorios extends Producto {
    constructor(n, p, d, i, tipoMascota, talla, color) {
        super(n, p, d, i, 'Accesorios');
        this.tipoMascota = tipoMascota;
        this.talla = talla;
        this.color = color;
    }
}