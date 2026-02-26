export default class Producto {
    constructor(nombre, precio, descripcion, imagen, tipo = 'general') {
        this.id = btoa(nombre + Date.now() + Math.random()).substring(0, 12);
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.descripcion = descripcion;
        this.imagen = imagen || '/imagenes/productos/default.png';
        this.tipo = tipo;
        this.variantes = []; 
    }
}