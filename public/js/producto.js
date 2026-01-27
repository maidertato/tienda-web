export class Producto {
    // Atributos privados (ES2022)
    #id;
    #nombre;
    #precio;
    #descripcion;
    #imagen;

    constructor(nombre, precio, descripcion, imagen) {
        // ID único generado automáticamente (Solo getter)
        this.#id = btoa(nombre + Date.now() + Math.random()).substring(0, 12);
        this.#nombre = nombre;
        this.#precio = precio;
        this.#descripcion = descripcion;
        // Imagen por defecto si es null/undefined
        this.#imagen = imagen || 'imagenes/productos/default.png';
    }

    get id() { return this.#id; }

    get nombre() { return this.#nombre; }
    set nombre(v) { this.#nombre = v; }

    get precio() { return this.#precio; }
    set precio(v) { this.#precio = v; }

    get descripcion() { return this.#descripcion; }
    set descripcion(v) { this.#descripcion = v; }

    get imagen() { return this.#imagen; }
    set imagen(v) { this.#imagen = v || 'imagenes/sin-imagen.png'; }
}