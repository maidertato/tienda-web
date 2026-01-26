import { Juguete } from './juguete.js';
import { Alimentacion } from './alimentacion.js';
import { JuegoMesa } from './juegoDeMesa.js';
import { Merchandising } from './merchandising.js';
import { JuegoRol } from './rol.js';
import { Videojuego } from './videojuego.js';

// INVENTARIO INICIAL
export const inventario = [
    // Juguetes (No se si existen los ha hecho la IA)
    new Juguete('Pelota de Goma', 10, 'Pelota resistente para perros.', 'imagenes/default.png', 'Goma', 'Mediano', true),
    new Juguete('Ratón de Peluche', 8, 'Juguete suave para gatos.', 'imagenes/default.png', 'Tela', 'Pequeño', false),
    new Juguete('Hueso de Nylon', 12, 'Hueso duradero para masticar.', 'imagenes/default.png', 'Nylon', 'Grande', true),

    //Alimentacion (No se si existen los ha hecho la IA)
    new Alimentacion('Croquetas para Perros', 30, 'Alimento balanceado para perros adultos.', 'imagenes/default.png', 'Perro', 'Seco'),
    new Alimentacion('Comida Húmeda para Gatos', 20, 'Deliciosa comida húmeda para gatos.', 'imagenes/default.png', 'Gato', 'Húmedo'),
    new Alimentacion('Snacks para Aves', 15, 'Snacks nutritivos para aves pequeñas.', 'imagenes/default.png', 'Ave', 'Snack'),

    // Juego Mesa
    new JuegoMesa('Monopoly', 25, 'Arruina a tus amigos.', 'imagenes/productos/Monopoly.jpg', '8+ años'),
    new JuegoMesa('Dixit', 30, 'Juego de imaginación.', 'imagenes/default.png', '10+ años'),
    new JuegoMesa('Cluedo', 20, 'Resuelve el misterio.', 'imagenes/default.png', '12+ años'),

    // Merchandising
    new Merchandising('Figura Geralt', 120, 'Estatua de resina.', 'imagenes/default.png', 'Resina'),
    new Merchandising('Camiseta Zelda', 20, 'Algodón 100%.', 'imagenes/default.png', 'Algodón'),
    new Merchandising('Taza Pac-Man', 12, 'Taza térmica.', 'imagenes/default.png', 'Cerámica'),

    // Juego Rol
    new JuegoRol('D&D Manual', 45, 'Reglas básicas 5.0.', 'imagenes/default.png', 'Fantasía'),
    new JuegoRol('Cyberpunk RED', 50, 'Futuro distópico.', 'imagenes/default.png', 'Ciencia Ficción'),
    new JuegoRol('Call of Cthulhu', 40, 'Terror cósmico.', 'imagenes/default.png', 'Terror'),

    // Videojuego
    new Videojuego('Elden Ring', 60, 'Desafío extremo.', 'imagenes/default.png', 'PS5/PC'),
    new Videojuego('Mario Odyssey', 55, 'Aventuras en 3D.', 'imagenes/default.png', 'Switch'),
    new Videojuego('Halo Infinite', 60, 'Shooter legendario.', 'imagenes/default.png', 'Xbox/PC')
];

// LISTA VACÍA PARA EL CARRITO (Requisito 4.3)
export const carrito = new Map();

// FUNCIONES RELATIVAS A PRODUCTOS (Ejemplo: buscar por nombre)
export const buscarProductoPorNombre = (nombre) => {
    return inventario.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
};

export function agregarProductoAlInventario(tipo, nombre, precio, desc, imagen, extra) {
    let nuevo;
    switch (tipo) {
        case 'videojuego': nuevo = new Videojuego(nombre, precio, desc, imagen, extra); break;
        case 'rol': nuevo = new JuegoRol(nombre, precio, desc, imagen, extra); break;
        case 'juguete': nuevo = new Juguete(nombre, precio, desc, imagen, ...extra); break;
        case 'merch': nuevo = new Merchandising(nombre, precio, desc, imagen, extra); break;
        case 'juego_mesa': nuevo = new JuegoMesa(nombre, precio, desc, imagen, extra); break;
        case 'alimentacion': nuevo = new Alimentacion(nombre, precio, desc, imagen, extra); break;
        default: nuevo = new JuegoEstrategia(nombre, precio, desc, imagen, extra); // Por defecto
    }
    inventario.push(nuevo);
};