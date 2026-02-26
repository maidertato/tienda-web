import Producto from './producto.js';

export default class Cabello extends Producto {
    constructor(n, p, d, i, estilo, tamaño, tipoMascota, color) {
        super(n, p, d, i, 'Cabello');
        this.estilo = estilo;
        this.tamaño = tamaño;
        this.tipoMascota = tipoMascota;
        this.color = color;
    }
}