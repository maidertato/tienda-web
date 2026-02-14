export class Producto {
    id;
    nombre;
    precio;
    descripcion;
    descripcionLarga;
    imagen;
    tipo;

    constructor(nombre, precio, descripcion, descripcionLarga, imagen, tipo = 'general',) {
        // Generamos el ID automáticamente
        this.id = btoa(nombre + Date.now() + Math.random()).substring(0, 12);
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.descripcionLarga = descripcionLarga;
        this.imagen = imagen || 'imagenes/productos/default.png';
        this.tipo = tipo;
        
    }
}