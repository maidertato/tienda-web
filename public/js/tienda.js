import { Juguete } from './juguete.js';
import { Alimentacion } from './alimentacion.js';
import { Merchandising } from './merchandising.js';
import { Cabello } from './cabello.js';
import { Mobiliario } from './mobiliario.js';

// INVENTARIO INICIAL
export const inventario = [
    // Juguetes (Hechos por IA)
    new Juguete('Pelota de Goma', 10, 'Pelota resistente para perros.', 'imagenes/productos/pelotaGoma.png', 'Goma', 'Mediano', true),
    new Juguete('Ratón de Peluche', 8, 'Juguete suave para gatos.', 'imagenes/productos/ratonPeluche.png', 'Tela', 'Pequeño', false),
    new Juguete('Hueso de Nylon', 12, 'Hueso duradero para masticar.', 'imagenes/productos/huesoNylon.png', 'Nylon', 'Grande', true),
    new Juguete('Peluche con sonido', 15, 'Peluche que emite sonido al apretarlo.', 'imagenes/productos/pelucheSonido.png', 'Tela', 'Mediano', true),
    //Alimentacion 
    new Alimentacion('Croquetas para Perros', 30, 'Alimento balanceado para perros adultos.', 'imagenes/productos/croquetasPerro.png', 'Perro', 'Seco'),
    new Alimentacion('Comida Húmeda para Gatos', 20, 'Deliciosa comida húmeda para gatos.', 'imagenes/productos/comidaHumeda.png', 'Gato', 'Húmedo'),
    //________________________________________________________________________
    new Alimentacion('Snacks para Aves', 15, 'Snacks nutritivos para aves pequeñas.', 'imagenes/productos/snackAves.png', 'Ave', 'Snack'),
    new Alimentacion('Alimento para Peces', 25, 'Alimento completo para peces de acuario.', 'imagenes/productos/alimentoPeces.png', 'Pez', 'Seco'),
    new Alimentacion('Pienso hipoalergico para perros', 35, 'Pienso especial para perros con alergias.', 'imagenes/productos/piensoHipoalergenico.png', 'Perro', 'Seco'),
    new Alimentacion('Comida orgánica para gatos', 28, 'Comida orgánica y saludable para gatos.', 'imagenes/productos/comidaOrganica.png', 'Gato', 'Húmedo'),
    //Premios y chuches
    new Alimentacion('Snacks dentales para perros', 18, 'Snacks que ayudan a la salud dental.', 'imagenes/productos/snackDental.png', 'Perro', 'Snack'),
    new Alimentacion('Galletas para perros', 12, 'Galletas sabrosas para perros.', 'imagenes/productos/galletasPerro.png', 'Perro', 'Snack'),
    //________________________________________________________________________
    new Alimentacion('Bocaditos para gatos', 14, 'Bocaditos deliciosos para gatos.', 'imagenes/productos/bocaditosGatos.png', 'Gato', 'Snack'),
    // Merchandising (Hechos por IA)
    new Merchandising('Correa para perro', 12, 'Correa para perro', 'imagenes/productos/correaPerro.png', 'Mediano', 'Perro', 'Rojo'),
    new Merchandising('Collar para gato', 10, 'Collar para gato', 'imagenes/productos/collarGato.png', 'Pequeño', 'Gato', 'Negro'),
    new Merchandising('Plato de comida', 8, 'Plato de comida para mascotas', 'imagenes/productos/platoComida.png', 'Mediano', 'Perro', 'Blanco'),
    new Merchandising('Chubasquero', 45, 'Chubasquero impermeable para perros, ideal para protegerlos de la lluvia y el viento durante paseos al aire libre.', 'imagenes/productos/chubasqueroPerro.png', 'Pequeño', 'Perro', 'Transparente'),
    new Merchandising('Cepillo para perros', 12, 'Cepillo para perros', 'imagenes/productos/cepillo.png', 'Mediano', 'Perro', 'Negro'),
    //________________________________________________________________________
    // Pelucas 
    new Cabello('Peluca Azul', 30, 'Peluca divertida de color azul brillante para darle un estilo único a tu perrito.', 'imagenes/productos/peluAzul.png', 'Pequeño', 'Perro', 'Azul'),
    new Cabello('Peluca Black', 35, 'Peluca elegante de color negro con estilo afro para un look moderno y llamativo.', 'imagenes/productos/peluBlack.png', 'Pequeño', 'Perro', 'Negro'),
    new Cabello('Peluca Nada Que Ver', 28, 'Peluca graciosa y alocada para perros con mucho estilo y personalidad.', 'imagenes/productos/pelucaNadaQueVer.png', 'Pequeño', 'Perro', 'Marrón'),
    new Cabello('Peluca Coqueta', 32, 'Peluca blanca con moñito ideal para perritos tiernos y coquetos.', 'imagenes/productos/peluCoqueta.png', 'Pequeño', 'Perro', 'Blanco'),
    new Cabello('Peluca Rasta', 40, 'Peluca estilo rasta para un look salvaje, divertido y lleno de actitud.', 'imagenes/productos/peluRast.png', 'Pequeño', 'Perro', 'Marrón'),
    new Cabello('Peluca Gato', 40, 'Peluca para gatos.', 'imagenes/productos/pelucaGato.png', 'Pequeño', 'Gato', 'Marrón'),

    //________________________________________________________________________
    // Mobiliario (Hechos por IA)
    new Mobiliario('Mesa para mascotas', 80, 'Mesa resistente para mascotas.', 'imagenes/productos/mesaMascota.png', 'Madera', true),
    new Mobiliario('Silla para mascotas', 60, 'Silla cómoda para mascotas.', 'imagenes/productos/sillaMascota.png', 'Plástico', false),
    new Mobiliario('Caja de almacenamiento', 40, 'Caja para almacenar artículos.', 'imagenes/productos/cajaAlmacenamiento.png', 'Plástico', true),
    new Mobiliario('Cama perro', 50, 'Cama cómoda para perros.', 'imagenes/productos/camaPerro.png', '80x60 cm', true),
    new Mobiliario('Cama gato', 40, 'Cama suave para gatos.', 'imagenes/productos/camaGato.png', '60x40 cm', false),
    new Mobiliario('Alfombra mascotas', 30, 'Alfombra antideslizante.', 'imagenes/productos/alfombrAntideslizante.png', '100x70 cm', true),

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
        case 'cabello': nuevo = new Cabello(nombre, precio, desc, imagen, ...extra); break;
        case 'juguete': nuevo = new Juguete(nombre, precio, desc, imagen, ...extra); break;
        case 'merch': nuevo = new Merchandising(nombre, precio, desc, imagen, extra); break;
        case 'alimentacion': nuevo = new Alimentacion(nombre, precio, desc, imagen, extra); break;
    }
    inventario.push(nuevo);
};