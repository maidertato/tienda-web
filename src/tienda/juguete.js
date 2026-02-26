import Producto from './producto.js';

export default class Juguete extends Producto {
    constructor(n, p, d, i, tipo, tamano, interactivo) {
        super(n, p, d, i, 'Juguete');
        this.subtipo = tipo; // Usamos subtipo para no chocar con this.tipo ('Juguete')
        this.tamano = tamano;
        this.esInteractivo = interactivo;
    }
}