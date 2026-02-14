export class Producto {
    id;
    nombre;
    precio;
    descripcion;
    imagen;
    tipo; 

    constructor(nombre, precio, descripcion, imagen, tipo = 'general') {
        // Generamos el ID automáticamente
        this.id = btoa(nombre + Date.now() + Math.random()).substring(0, 12);
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen || 'imagenes/productos/default.png';
        this.tipo = tipo;
    }
}