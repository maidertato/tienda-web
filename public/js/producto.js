export class Producto {
    #id;
    #nombre;
    #precio;
    #descripcion;
    #descripcionLarga;
    #imagen;
    #tipo;

    constructor(nombre, precio, descripcion, descripcionLarga, imagen, tipo = 'general') {
        this.#id = btoa(nombre + Date.now() + Math.random()).substring(0, 12);

        this.#nombre = nombre;
        this.#precio = precio;
        this.#descripcion = descripcion;
        this.#descripcionLarga = descripcionLarga;
        this.#imagen = imagen || 'imagenes/productos/default.png';
        this.#tipo = tipo;
    }

    get id() { return this.#id; }

    get nombre() { return this.#nombre; }
    set nombre(v) { this.#nombre = v; }

    get precio() { return this.#precio; }
    set precio(v) { this.#precio = v; }

    get descripcion() { return this.#descripcion; }
    set descripcion(v) { this.#descripcion = v; }

    get descripcionLarga() { return this.#descripcionLarga; }
    set descripcionLarga(v) { this.#descripcionLarga = v; }

    get imagen() { return this.#imagen; }
    set imagen(v) { this.#imagen = v; }

    get tipo() { return this.#tipo; }
    set tipo(v) { this.#tipo = v; }
}