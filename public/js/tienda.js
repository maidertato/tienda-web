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
  new Merchandising('Correa para perro', 12, 'Correa para perro', 'imagenes/productos/correaPerro.png', 'Perro', 'Mediano', 'Rojo'),
  new Merchandising('Collar para gato', 10, 'Collar para gato', 'imagenes/productos/collarGato.png', 'Gato', 'Pequeño', 'Negro'),
  new Merchandising('Plato de comida', 8, 'Plato de comida para mascotas', 'imagenes/productos/platoComida.png', 'Perro', 'Mediano', 'Blanco'),
  new Merchandising('Chubasquero', 45, 'Chubasquero impermeable para perros, ideal para protegerlos de la lluvia y el viento durante paseos al aire libre.', 'imagenes/productos/chubasqueroPerro.png', 'Perro', 'Pequeño', 'Transparente'),
  new Merchandising('Cepillo para perros', 12, 'Cepillo para perros', 'imagenes/productos/cepillo.png', 'Perro', 'Mediano', 'Negro'),
  //________________________________________________________________________
  // Pelucas 
  new Cabello('Peluca Azul', 30, 'Peluca divertida de color azul brillante para darle un estilo único a tu perrito.', 'imagenes/productos/peluAzul.png', 'Pequeño', 'Perro', 'Azul'),
  new Cabello('Peluca Pelocho', 35, 'Peluca elegante de color negro con estilo afro para un look moderno y llamativo.', 'imagenes/productos/pelucaPelocho.png', 'Pequeño', 'Perro', 'Negro'),
  new Cabello('Peluca Nada Que Ver', 28, 'Peluca graciosa y alocada para perros con mucho estilo y personalidad.', 'imagenes/productos/pelucaNadaQueVer.png', 'Pequeño', 'Perro', 'Marrón'),
  new Cabello('Peluca Coqueta', 32, 'Peluca blanca con moñito ideal para perritos tiernos y coquetos.', 'imagenes/productos/peluCoqueta.png', 'Pequeño', 'Perro', 'Blanco'),
  new Cabello('Peluca Rasta', 40, 'Peluca estilo rasta para un look salvaje, divertido y lleno de actitud.', 'imagenes/productos/peluRast.png', 'Pequeño', 'Perro', 'Marrón'),
  new Cabello('Peluca Gato', 40, 'Peluca para gatos.', 'imagenes/productos/pelucaGato.png', 'Pequeño', 'Gato', 'Marrón'),

  //________________________________________________________________________
  // Mobiliario (Hechos por IA)
  new Mobiliario('Mesa para mascotas', 80, 'Mesa resistente para mascotas.', 'imagenes/productos/mesaMascota.png', 'Madera', true),
  new Mobiliario('Silla para mascotas', 60, 'Silla cómoda para mascotas.', 'imagenes/productos/sillaMascota.png', 'Plástico', false),
  new Mobiliario('Caja de almacenamiento', 40, 'Caja para almacenar artículos.', 'imagenes/productos/cajaAlmacenamiento.png', 'Plástico', true),
  new Mobiliario('Cama perro', 50, 'Cama cómoda para perros.', 'imagenes/productos/camaPerro.png', 'Textil', true),
  new Mobiliario('Cama gato', 40, 'Cama suave para gatos.', 'imagenes/productos/camaGato.png', 'Felpa', false),
  new Mobiliario('Alfombra mascotas', 30, 'Alfombra antideslizante.', 'imagenes/productos/alfombrAntideslizante.png', 'Textil', true),

];
inventario.forEach(p => {
  if (p instanceof Juguete) p.tipo = 'juguete';
  else if (p instanceof Alimentacion) p.tipo = 'alimentacion';
  else if (p instanceof Merchandising) p.tipo = 'merch';
  else if (p instanceof Cabello) p.tipo = 'cabello';
  else if (p instanceof Mobiliario) p.tipo = 'mobiliario';
});

// ================= IMÁGENES EXTRA POR PRODUCTO =================

// JUGUETES
inventario.find(p => p.nombre === 'Pelota de Goma').variantes = [
  { nombre: 'Modelo 1', imagen: 'imagenes/productos/pelotaGoma.png' },
  { nombre: 'Modelo 2', imagen: 'imagenes/productos/pelotaGoma2.png' },
  { nombre: 'Modelo 3', imagen: 'imagenes/productos/pelotaGoma3.png' }
];

inventario.find(p => p.nombre === 'Ratón de Peluche').variantes = [
  { nombre: 'Rosa', imagen: 'imagenes/productos/ratonPeluche.png' },
  { nombre: 'Gris', imagen: 'imagenes/productos/ratonPeluche2.png' },
  { nombre: 'Azul', imagen: 'imagenes/productos/ratonPeluche3.png' }
];

inventario.find(p => p.nombre === 'Hueso de Nylon').variantes = [
  { nombre: 'Clásico', imagen: 'imagenes/productos/huesoNylon.png' },
  { nombre: 'Grande', imagen: 'imagenes/productos/huesoNylon2.png' }
];


// MERCHANDISING
inventario.find(p => p.nombre === 'Correa para perro').variantes = [
  { nombre: 'Roja', imagen: 'imagenes/productos/correaPerro.png' },
  { nombre: 'Azul', imagen: 'imagenes/productos/correaPerro2.png' }
];

inventario.find(p => p.nombre === 'Collar para gato').variantes = [
  { nombre: 'Negro', imagen: 'imagenes/productos/collarGato.png' },
  { nombre: 'Rosa', imagen: 'imagenes/productos/collarGato2.png' }
];

inventario.find(p => p.nombre === 'Plato de comida').variantes = [
  { nombre: 'Blanco', imagen: 'imagenes/productos/platoComida.png' },
  { nombre: 'Verde', imagen: 'imagenes/productos/platoComida2.png' }
];

inventario.find(p => p.nombre === 'Chubasquero').variantes = [
  { nombre: 'Transparente', imagen: 'imagenes/productos/chubasqueroPerro.png' },
  { nombre: 'Azul', imagen: 'imagenes/productos/chubasqueroPerro2.png' }
];



// CABELLO
inventario.find(p => p.nombre === 'Peluca Azul').variantes = [
  { nombre: 'Azul claro', imagen: 'imagenes/productos/peluAzul.png' },
  { nombre: 'Azul oscuro', imagen: 'imagenes/productos/peluAzul2.png' }
];

inventario.find(p => p.nombre === 'Peluca Pelocho').variantes = [
  { nombre: 'Negra', imagen: 'imagenes/productos/pelucaPelocho.png' },
  { nombre: 'Negra afro', imagen: 'imagenes/productos/pelucaPelocho2.png' }
];

inventario.find(p => p.nombre === 'Peluca Nada Que Ver').variantes = [
  { nombre: 'Azul claro', imagen: 'imagenes/productos/pelucaNadaQueVer.png' },
  { nombre: 'Azul oscuro', imagen: 'imagenes/productos/pelucaNadaQueVer2.png' }
];

inventario.find(p => p.nombre === 'Peluca Coqueta').variantes = [
  { nombre: 'Negra lisa', imagen: 'imagenes/productos/peluCoqueta.png' },
  { nombre: 'Negra afro', imagen: 'imagenes/productos/peluCoqueta2.png' }
];

inventario.find(p => p.nombre === 'Peluca Rasta').variantes = [
  { nombre: 'Modelo 1', imagen: 'imagenes/productos/peluRast.png' },
  { nombre: 'Modelo 2', imagen: 'imagenes/productos/peluRast2.png' }
];

inventario.find(p => p.nombre === 'Peluca Gato').variantes = [
  { nombre: 'Marrón claro', imagen: 'imagenes/productos/pelucaGato.png' },
  { nombre: 'Marrón oscuro', imagen: 'imagenes/productos/pelucaGato2.png' }
];


// MOBILIARIO
inventario.find(p => p.nombre === 'Mesa para mascotas').variantes = [
  { nombre: 'Modelo pequeño', imagen: 'imagenes/productos/mesaMascota.png' },
  { nombre: 'Modelo grande', imagen: 'imagenes/productos/mesaMascota2.png' }
];

inventario.find(p => p.nombre === 'Silla para mascotas').variantes = [
  { nombre: 'Plástico', imagen: 'imagenes/productos/sillaMascota.png' },
  { nombre: 'Acolchada', imagen: 'imagenes/productos/sillaMascota2.png' }
];

inventario.find(p => p.nombre === 'Caja de almacenamiento').variantes = [
  { nombre: 'Pequeña', imagen: 'imagenes/productos/cajaAlmacenamiento.png' },
  { nombre: 'Grande', imagen: 'imagenes/productos/cajaAlmacenamiento2.png' }
];

inventario.find(p => p.nombre === 'Cama perro').variantes = [
  { nombre: '80x60 cm', imagen: 'imagenes/productos/camaPerro.png' },
  { nombre: '100x70 cm', imagen: 'imagenes/productos/camaPerro2.png' }
];

inventario.find(p => p.nombre === 'Cama gato').variantes = [
  { nombre: '60x40 cm', imagen: 'imagenes/productos/camaGato.png' },
  { nombre: '70x50 cm', imagen: 'imagenes/productos/camaGato2.png' }
];

inventario.find(p => p.nombre === 'Alfombra mascotas').variantes = [
  { nombre: '100x70 cm', imagen: 'imagenes/productos/alfombrAntideslizante.png' },
  { nombre: '120x90 cm', imagen: 'imagenes/productos/alfombrAntideslizante2.png' }
];

// LISTA VACÍA PARA EL CARRITO (Requisito 4.3)
export const carrito = new Map();

// FUNCIONES RELATIVAS A PRODUCTOS (Ejemplo: buscar por nombre)
export const buscarProductoPorNombre = (nombre) => {
  return inventario.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
};

// ==================================== Agregar productos al inventario --> Con el formulario! ====================================
export function agregarProductoAlInventario(tipo, datos) {
  let nuevoProducto;
  const idUnico = Date.now().toString();

  switch (tipo) {

    case 'mobiliario':
      nuevoProducto = new Mobiliario(
        datos.nombre,
        datos.precio,
        datos.descripcion,
        datos.imagen,
        datos.extra || "Material genérico",
        false
      );
      break;

    case 'cabello':
      nuevoProducto = new Cabello(
        datos.nombre,
        datos.precio,
        datos.descripcion,
        datos.imagen,
        datos.extra || "Tamaño estándar",
        "General",
        "Sin color"
      );
      break;

    case 'juguete':
      nuevoProducto = new Juguete(
        datos.nombre,
        datos.precio,
        datos.descripcion,
        datos.imagen,
        datos.extra || "Plástico",
        "Mediano",
        true
      );
      break;

    case 'merchandising':
      nuevoProducto = new Merchandising(
        datos.nombre,
        datos.precio,
        datos.descripcion,
        datos.imagen,
        datos.extra || "Estándar",
        "General",
        "Negro"
      );
      break;

    case 'alimentacion':
      nuevoProducto = new Alimentacion(
        datos.nombre,
        datos.precio,
        datos.descripcion,
        datos.imagen,
        "General",
        datos.extra || "Seco"
      );
      break;

    default:
      return false;
  }

  if (nuevoProducto) {
    // ASIGNACIÓN DEL ID (Vital para que no salga undefined en el carrito)
    nuevoProducto.id = Date.now().toString();
    nuevoProducto.tipo = tipo;

    inventario.push(nuevoProducto);
    return true;
  }
  return false;
}