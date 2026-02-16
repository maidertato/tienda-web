import { Juguete } from './juguete.js';
import { Alimentacion } from './alimentacion.js';
import { Merchandising } from './merchandising.js';
import { Cabello } from './cabello.js';
import { Mobiliario } from './mobiliario.js';

// INVENTARIO INICIAL
export const inventario = [
  // Juguetes
  new Juguete('Pelota de Goma', 10, 'Pelota de alta resistencia ideal para juegos de lanzar y recoger.', 'Diseñada para los perros más activos y enérgicos. Esta pelota de goma de alta resistencia es perfecta para sesiones intensas de juego de lanzar y recoger. Su material duradero soporta mordidas fuertes, ayudando a masajear las encías y mantener la salud dental de tu mejor amigo mientras se divierte.', 'imagenes/productos/pelotaGoma.png', 'Goma', 'Mediano', true),
  new Juguete('Ratón de Peluche', 8, 'Juguete suave con textura realista que estimula el instinto cazador de tu gato.', 'El instinto cazador de tu gato se despertará con este suave ratón de peluche. Con una textura irresistible y un tamaño perfecto para ser capturado entre las patas, este juguete fomenta el ejercicio físico y mental, proporcionando horas de entretenimiento seguro y reconfortante para felinos de todas las edades.', 'imagenes/productos/ratonPeluche.png', 'Tela', 'Pequeño', false),
  new Juguete('Hueso de Nylon', 12, 'Hueso ultra duradero diseñado para masticadores potentes.', 'La solución definitiva para los masticadores potentes. Este hueso de nylon macizo está fabricado para durar semanas de uso constante. A diferencia de los huesos naturales, no se astilla, lo que lo convierte en una opción segura para reducir la ansiedad y el aburrimiento en perros grandes que necesitan descargar energía.', 'imagenes/productos/huesoNylon.png', 'Nylon', 'Grande', true),
  new Juguete('Peluche con sonido', 15, 'Peluche que emite sonido al apretarlo.', '¡Diversión interactiva en cada apretón! Este peluche combina la suavidad de la tela de alta calidad con un emisor de sonido interno que mantiene la atención de tu mascota por más tiempo. Es el compañero ideal tanto para el juego activo como para los momentos de descanso y apego.', 'imagenes/productos/pelucheSonido.png', 'Tela', 'Mediano', true),
  //Alimentacion 
  new Alimentacion('Croquetas para Perros', 30, 'Alimento balanceado para perros adultos.', 'Alimento balanceado de alta digestibilidad para perros adultos. Su fórmula reforzada con Omega 3 y 6 garantiza una piel sana y un pelaje brillante, proporcionando la energía necesaria para su rutina diaria.', 'imagenes/productos/croquetasPerro.png', 'Perro', 'Seco'),
  new Alimentacion('Comida Húmeda para Gatos', 20, 'Deliciosa comida húmeda para gatos.', 'Exquisita receta de textura suave y jugosa que deleita hasta a los paladares más exigentes. Su alto contenido de humedad ayuda a mantener una hidratación óptima, previniendo problemas del tracto urinario.', 'imagenes/productos/comidaHumeda.png', 'Gato', 'Húmedo'),
  //________________________________________________________________________
  new Alimentacion('Snacks para Aves', 15, 'Snacks nutritivos para aves pequeñas.', 'Deliciosos bocados enriquecidos con semillas seleccionadas y vitaminas esenciales. Ideales para fomentar el comportamiento natural de búsqueda de alimento y fortalecer el vínculo entre tú y tu pequeña ave.', 'imagenes/productos/snackAves.png', 'Ave', 'Snack'),
  new Alimentacion('Alimento para Peces', 25, 'Alimento completo para peces de acuario.', 'Mezcla premium en escamas que aporta una nutrición completa para peces tropicales y de agua fría. Gracias a su fórmula de alta absorción, ayuda a resaltar los colores naturales y mantiene el agua del acuario limpia por más tiempo.', 'imagenes/productos/alimentoPeces.png', 'Pez', 'Seco'),
  new Alimentacion('Pienso hipoalergico para perros', 35, 'Pienso especial para perros con alergias.', 'Fórmula especializada para mascotas con sensibilidad digestiva o cutánea. Elaborado con fuentes de proteína seleccionadas para reducir el riesgo de alergias, mejorando notablemente la calidad de vida de tu perro.', 'imagenes/productos/piensoHipoalergenico.png', 'Perro', 'Seco'),
  new Alimentacion('Comida orgánica para gatos', 28, 'Comida orgánica y saludable para gatos.', 'Nutrición natural de grado humano, libre de granos, conservantes artificiales y pesticidas. Elaborada con ingredientes frescos y sostenibles que respetan el instinto carnívoro y la salud a largo plazo de tu gato.', 'imagenes/productos/comidaOrganica.png', 'Gato', 'Húmedo'),
  //Premios y chuches
  new Alimentacion('Snacks dentales para perros', 18, 'Snacks que ayudan a la salud dental.', 'La solución perfecta para mantener el aliento fresco de tu mascota. Estos snacks de textura firme ayudan a reducir la acumulación de sarro y placa bacteriana mediante la masticación mecánica, fortaleciendo las encías y convirtiendo la higiene dental en un momento de placer.', 'imagenes/productos/snackDental.png', 'Perro', 'Snack'),
  new Alimentacion('Galletas para perros', 12, 'Galletas sabrosas para perros.', 'Crujientes galletas horneadas artesanalmente con ingredientes seleccionados. Son la recompensa ideal para el entrenamiento o simplemente para consentir a tu perro entre comidas, ofreciendo un sabor casero irresistible sin descuidar su equilibrio nutricional.', 'imagenes/productos/galletasPerro.png', 'Perro', 'Snack'),
  //________________________________________________________________________
  new Alimentacion('Bocaditos para gatos', 14, 'Bocaditos deliciosos para gatos.', 'Pequeños bocados de sabor intenso diseñados para los felinos más caprichosos. Su centro tierno y su aroma natural estimulan el apetito de tu gato, proporcionándole una experiencia sensorial única y un aporte extra de energía en cada porción.', 'imagenes/productos/bocaditosGatos.png', 'Gato', 'Snack'),
  // Merchandising 
  new Merchandising('Correa para perro', 12, 'Correa para perro', 'Correa de nylon reforzado con agarre ergonómico para un control total y cómodo durante los paseos. Su mosquetón de alta seguridad evita aperturas accidentales, garantizando la tranquilidad de ambos en cada aventura.', 'imagenes/productos/correaPerro.png', 'Perro', 'Mediano', 'Rojo'),
  new Merchandising('Collar para gato', 10, 'Collar para gato', 'Elegante collar ajustable con cierre de seguridad "breakaway" que se libera ante tirones fuertes, evitando accidentes. Incluye un pequeño cascabel para localizar fácilmente a tu gato dentro de casa sin restarle comodidad.', 'imagenes/productos/collarGato.png', 'Gato', 'Pequeño', 'Negro'),
  new Merchandising('Plato de comida', 8, 'Plato de comida para mascotas', 'Recipiente de cerámica de alta calidad con base antideslizante para evitar derrames indeseados. Su diseño higiénico y fácil de lavar previene la acumulación de bacterias, siendo ideal para agua o alimento seco.', 'imagenes/productos/platoComida.png', 'Perro', 'Mediano', 'Blanco'),
  new Merchandising('Chubasquero', 45, 'Chubasquero impermeable para perros, ideal para protegerlos de la lluvia y el viento durante paseos al aire libre.', 'Protección total contra la lluvia y el viento en un diseño moderno y ligero. Este chubasquero transparente permite lucir el pelaje de tu mascota mientras la mantiene seca, facilitando paseos cómodos en días grises.', 'imagenes/productos/chubasqueroPerro.png', 'Perro', 'Pequeño', 'Transparente'),
  new Merchandising('Cepillo para perros', 12, 'Cepillo para perros', 'Herramienta esencial para el cuidado del pelaje. Sus cerdas suaves pero efectivas eliminan el pelo muerto y desenredan nudos sin irritar la piel, estimulando la circulación y dejando un acabado brillante y sedoso.', 'imagenes/productos/cepillo.png', 'Perro', 'Mediano', 'Negro'),
  //________________________________________________________________________
  // Pelucas 
  new Cabello('Peluca Azul', 30, 'Peluca divertida de color azul brillante para darle un estilo único a tu perrito.', 'La peluca azul más escandalosamente divertida del planeta perruno. Su color eléctrico convierte a tu mascota en una estrella pop instantánea capaz de robar miradas, aplausos y carcajadas en segundos. Es ligera, cómoda y tan suave que tu perrito olvidará que la lleva puesta… pero nadie más lo hará. Perfecta para fotos épicas, fiestas y paseos donde tu mascota quiera anunciarle al mundo: “sí, soy fabuloso”. No es una peluca… es un espectáculo ambulante', 'imagenes/productos/peluAzul.png', 'Pop', 'Pequeño', 'Perro', 'Azul'),
  new Cabello('Peluca Pelocho', 35, 'Peluca elegante de color negro con estilo afro para un look moderno y llamativo.', 'Volumen, actitud y puro flow canino. Esta peluca afro transforma a tu perrito en una leyenda del estilo con presencia imponente y carisma imparable. Su diseño es tan llamativo que convierte cualquier paseo en una alfombra roja improvisada. Suave, cómoda y estable, permite saltos, carreras y poses dramáticas sin perder el glamour. Ideal para mascotas que nacieron para brillar y dueños que aman el drama… pero del bueno.', 'imagenes/productos/pelucaPelocho.png', 'Disco', 'Pequeño', 'Perro', 'Negro'),
  new Cabello('Peluca Nada Que Ver', 28, 'Peluca graciosa y alocada para perros con mucho estilo y personalidad.', 'El accesorio oficial del caos adorable. Esta peluca parece decir: “no sé qué está pasando, pero me encanta”. Su diseño alocado rompe toda lógica estética y convierte a tu perrito en una obra de arte incomprendida pero hilarante. Perfecta para dueños con sentido del humor peligroso y mascotas que disfrutan ser el centro del universo. Cada vez que alguien la vea, una risa está garantizada. ⚠️Advertencia: puede causar exceso de fotos.⚠️', 'imagenes/productos/pelucaNadaQueVer.png', 'Elegante', 'Pequeño', 'Perro', 'Marrón'),
  new Cabello('Peluca Coqueta', 32, 'Peluca blanca con moñito ideal para perritos tiernos y coquetos.', 'Elegancia, ternura y drama romántico en versión miniatura. Esta peluca blanca con moñito convierte a tu perrito en la definición de “demasiado adorable para este mundo”. Es suave, ligera y diseñada para desatar suspiros colectivos donde sea que aparezca. Ideal para cumpleaños, citas importantes en el parque o sesiones de fotos donde tu mascota quiera demostrar que el glamour también puede ser esponjoso.', 'imagenes/productos/peluCoqueta.png', 'Kawaii', 'Pequeño', 'Perro', 'Blanco'),
  new Cabello('Peluca Rasta', 40, 'Peluca estilo rasta para un look salvaje, divertido y lleno de actitud.', 'Espíritu libre, vibra relajada y energía de fiesta eterna. Esta peluca rasta convierte a tu perrito en el alma del carnaval perruno. Su estilo despreocupado transmite diversión pura, como si cada día fuera vacaciones. Cómoda, ligera y resistente a movimientos salvajes, es perfecta para mascotas con actitud rebelde y dueños que saben que la vida es mejor cuando se toma con humor.', 'imagenes/productos/peluRast.png', 'Reagge', 'Pequeño', 'Perro', 'Marrón'),
  new Cabello('Peluca Gato', 40, 'Peluca para gatos.', 'Tu gato no pidió esto. Tu gato no lo aprueba. Tu gato te juzga… pero se ve increíble. Esta peluca convierte a cualquier felino en una mezcla de diva dramática y meme histórico. Diseñada para ser ligera y cómoda, aunque emocionalmente el gato jamás te perdonará. Ideal para dueños valientes que aceptan vivir bajo amenaza felina por una foto legendaria.', 'imagenes/productos/pelucaGato.png', 'Casual', 'Pequeño', 'Gato', 'Marrón'),

  //________________________________________________________________________
  // Mobiliario 
  new Mobiliario('Mesa para mascotas', 80, 'Mesa resistente para mascotas.', 'Elegante mesa de madera maciza diseñada para crear un espacio propio para tu mascota. Su superficie resistente es ideal para colocar cuencos o juguetes, aportando un toque decorativo y funcional a cualquier rincón de tu casa.', 'imagenes/productos/mesaMascota.png', 'Madera', true),
  new Mobiliario('Silla para mascotas', 60, 'Silla cómoda para mascotas.', 'Asiento ergonómico de alta resistencia pensado para el descanso relajado. Su fabricación en plástico ligero pero robusto permite una limpieza inmediata, siendo perfecta tanto para interiores como para terrazas protegidas.', 'imagenes/productos/sillaMascota.png', 'Plástico', false),
  new Mobiliario('Caja de almacenamiento', 40, 'Caja para almacenar artículos.', 'La solución definitiva para mantener el orden. Esta caja de gran capacidad es perfecta para guardar correas, juguetes y accesorios, protegiéndolos del polvo y manteniendo los artículos de tu mascota siempre a mano.', 'imagenes/productos/cajaAlmacenamiento.png', 'Plástico', true),
  new Mobiliario('Cama perro', 50, 'Cama cómoda para perros.', 'Cuna premium con relleno acolchado que se adapta a la forma del cuerpo, aliviando la presión en las articulaciones. Su tejido transpirable garantiza una temperatura agradable durante todo el año para un sueño profundo y reparador.', 'imagenes/productos/camaPerro.png', 'Textil', true),
  new Mobiliario('Cama gato', 40, 'Cama suave para gatos.', 'Refugio ultra suave de felpa que retiene el calor corporal, ideal para los gatos que buscan seguridad y calidez. Sus bordes elevados proporcionan una sensación de protección que reduce el estrés y fomenta el descanso.', 'imagenes/productos/camaGato.png', 'Felpa', false),
  new Mobiliario('Alfombra mascotas', 30, 'Alfombra antideslizante.', 'Superficie textil de alta densidad con base antideslizante de seguridad. Ideal para delimitar la zona de descanso o proteger el suelo de arañazos, ofreciendo un tacto suave y confortable para las patas más sensibles.', 'imagenes/productos/alfombrAntideslizante.png', 'Textil', true),

];

// ================= IMÁGENES EXTRA POR PRODUCTO =================

// JUGUETES
inventario.find(p => p.nombre === 'Pelota de Goma').variantes = [
  { nombre: 'Modelo 1', imagen: 'imagenes/productos/pelotaGoma.png' },
  { nombre: 'Modelo 2', imagen: 'imagenes/productos/pelotaGoma2.png' },
  { nombre: 'Modelo 3', imagen: 'imagenes/productos/pelotaGoma3.png' }
];

inventario.find(p => p.nombre === 'Ratón de Peluche').variantes = [
  { nombre: 'Rosa', imagen: 'imagenes/productos/ratonPeluche.png' },
  { nombre: 'Verde', imagen: 'imagenes/productos/ratonPeluche2.png' },
  { nombre: 'Azul', imagen: 'imagenes/productos/ratonPeluche3.png' }
];

inventario.find(p => p.nombre === 'Hueso de Nylon').variantes = [
  { nombre: 'Clasico', imagen: 'imagenes/productos/huesoNylon.png' },
  { nombre: 'Grande', imagen: 'imagenes/productos/huesoNylon2.png' }
];


// MERCHANDISING
inventario.find(p => p.nombre === 'Correa para perro').variantes = [
  { nombre: 'Marrón', imagen: 'imagenes/productos/correaPerro.png' },
  { nombre: 'Morado', imagen: 'imagenes/productos/correaPerro2.png' }
];

inventario.find(p => p.nombre === 'Collar para gato').variantes = [
  { nombre: 'Marrón', imagen: 'imagenes/productos/collarGato.png' },
  { nombre: 'Morado', imagen: 'imagenes/productos/collarGato2.png' }
];

inventario.find(p => p.nombre === 'Plato de comida').variantes = [
  { nombre: 'Marrón', imagen: 'imagenes/productos/platoComida.png' },
  { nombre: 'Morado', imagen: 'imagenes/productos/platoComida2.png' }
];

inventario.find(p => p.nombre === 'Chubasquero').variantes = [
  { nombre: 'Gris', imagen: 'imagenes/productos/chubasqueroPerro.png' },
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

  switch (tipo) {

    case 'mobiliario':
      nuevoProducto = new Mobiliario(
        datos.nombre,
        datos.precio,
        datos.descripcion,
        datos.descripcionLarga || datos.descripcion,
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
        datos.descripcionLarga || datos.descripcion,
        datos.imagen,
        datos.extra || "Estilo genérico",
        "Pequeño",
        "General",
        "Sin color"
      );
      break;

    case 'juguete':
      nuevoProducto = new Juguete(
        datos.nombre,
        datos.precio,
        datos.descripcion,
        datos.descripcionLarga || datos.descripcion,
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
        datos.descripcionLarga || datos.descripcion,
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
        datos.descripcionLarga || datos.descripcion,
        datos.imagen,
        "General",
        datos.extra || "Seco"
      );
      break;

    default:
      return false;
  }

  inventario.push(nuevoProducto);
  return true;
}