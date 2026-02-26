import Producto from './producto.js';

export default class Mobiliario extends Producto {
    constructor(n, p, d, i, material, usoInterior) {
        super(n, p, d, i, 'Mobiliario');
        this.material = material;
        this.usoInterior = usoInterior;
    }
}