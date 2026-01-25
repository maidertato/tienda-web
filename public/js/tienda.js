import { Carta } from './cartas.js';
import { JuegoEstrategia } from './juegoDeEstrategia.js';
import { JuegoMesa } from './juegoDeMesa.js';
import { Merchandising } from './merchandising.js';
import { JuegoRol } from './rol.js';
import { Videojuego } from './videojuego.js';

// INVENTARIO INICIAL
export const inventario = [
    // Cartas
    new Carta('Black Lotus', 150, 'La carta más rara.', 'imagenes/default.png', 'Alpha'),
    new Carta('Charizard Holo', 500, 'Clásico de Pokémon.', 'imagenes/default.png', 'Base Set'),
    new Carta('Blue-Eyes White Dragon', 200, 'El favorito de Kaiba.', 'imagenes/default.png', 'Legendary'),

    // Juego Estrategia
    new JuegoEstrategia('Catan', 40, 'Coloniza la isla.', 'imagenes/default.png', 'Media'),
    new JuegoEstrategia('Age of Empires IV', 50, 'Estrategia histórica.', 'imagenes/default.png', 'Alta'),
    new JuegoEstrategia('Risk', 30, 'Conquista el mundo.', 'imagenes/default.png', 'Baja'),

    // Juego Mesa
    new JuegoMesa('Monopoly', 25, 'Arruina a tus amigos.', 'imagenes/default.png', '8+ años'),
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

export const agregarProductoAlInventario = (tipo, ...args) => {
    let nuevo;
    switch (tipo) {
        case 'juego_estrategia': nuevo = new JuegoEstrategia(...args); break;
        case 'videojuego': nuevo = new Videojuego(...args); break;
        case 'rol': nuevo = new JuegoRol(...args); break;
        case 'cartas': nuevo = new Carta(...args); break;
        case 'merch': nuevo = new Merchandising(...args); break;
        case 'juego_mesa': nuevo = new JuegoMesa(...args); break;
        default: nuevo = new JuegoEstrategia(...args); // Por defecto
    }
    inventario.push(nuevo);
    return nuevo;
};