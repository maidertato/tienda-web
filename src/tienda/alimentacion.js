import Producto from './producto.js';

export default class Alimentacion extends Producto {
    constructor(n, p, d, i, tipoAlimento, tipoMascota) {
        super(n, p, d, i, 'Alimentación');
        this.tipoAlimento = tipoAlimento;
        this.tipoMascota = tipoMascota;
    }
}