import Producto from './producto.js';

export default class Mobiliario extends Producto {
    constructor(n, p, d, i, material, usoInterior) {
        super(n, p, d, i, 'mobiliario');
        this.material = material;
        this.usoInterior = usoInterior;
    }

    obtenerInformacion() {
        return this.material;
    }
}