import { Juguete } from './juguete.js';
import { Alimentacion } from './alimentacion.js';
import { JuegoMesa } from './juegoDeMesa.js';
import { Merchandising } from './merchandising.js';
import { Descanso } from './descanso.js';
import { Mobiliario } from './mobiliario.js';

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

    // Merchandising (Hechos por IA)
    new Merchandising('Correa para perro', 12, 'Correa para perro', 'imagenes/default.png', 'Mediano', 'Perro', 'Rojo'),
    new Merchandising('Collar para gato', 10, 'Collar para gato', 'imagenes/default.png', 'Pequeño', 'Gato', 'Negro'),
    new Merchandising('Plato de comida', 8, 'Plato de comida para mascotas', 'imagenes/default.png', 'Mediano', 'Perro', 'Blanco'),

    // Descanso (Hechas por IA mirarr)
    new Descanso('Cama perro', 50, 'Cama cómoda para perros.', 'imagenes/default.png', '80x60 cm', true),
    new Descanso('Cama gato', 40, 'Cama suave para gatos.', 'imagenes/default.png', '60x40 cm', false),
    new Descanso('Alfombra mascotas', 30, 'Alfombra antideslizante.', 'imagenes/default.png', '100x70 cm', true),

    // Mobiliario (Hechos por IA)
    new Mobiliario('Mesa para mascotas', 80, 'Mesa resistente para mascotas.', 'imagenes/default.png', 'Madera', true),
    new Mobiliario('Silla para mascotas', 60, 'Silla cómoda para mascotas.', 'imagenes/default.png', 'Plástico', false),
    new Mobiliario('Caja de almacenamiento', 40, 'Caja para almacenar artículos.', 'imagenes/default.png', 'Plástico', true),
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
        case 'mobiliario': nuevo = new Mobiliario(nombre, precio, desc, imagen, ...extra); break;
        case 'descanso': nuevo = new Descanso(nombre, precio, desc, imagen, ...extra); break;
        case 'juguete': nuevo = new Juguete(nombre, precio, desc, imagen, ...extra); break;
        case 'merch': nuevo = new Merchandising(nombre, precio, desc, imagen, extra); break;
        case 'juego_mesa': nuevo = new JuegoMesa(nombre, precio, desc, imagen, extra); break;
        case 'alimentacion': nuevo = new Alimentacion(nombre, precio, desc, imagen, extra); break;
        default: nuevo = new JuegoEstrategia(nombre, precio, desc, imagen, extra); // Por defecto
    }
    inventario.push(nuevo);
};