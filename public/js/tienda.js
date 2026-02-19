import { Juguete } from './juguete.js';
import { Alimentacion } from './alimentacion.js';
import { Merchandising } from './merchandising.js';
import { Cabello } from './cabello.js';
import { Mobiliario } from './mobiliario.js';
import { Accesorios } from './accesorios.js';

// INVENTARIO INICIAL
export const inventario = [
  // Juguetes
  new Juguete('Pelota de Goma', 10, 'Pelota de alta resistencia ideal para juegos de lanzar y recoger.', 'La clásica pelota que no muere nunca, aunque tu perro sí pierda la cabeza cada vez que la ve. Rebota, resiste mordiscos nivel trituradora y convierte cualquier paseo en unas Olimpiadas caninas no autorizadas. Si desaparece bajo el sofá, prepárate para miradas acusadoras durante horas.', 'imagenes/productos/pelotaGoma.png', 'Goma', 'Mediano', true),
  new Juguete('Ratón de Peluche', 8, 'Juguete suave con textura realista que estimula el instinto cazador de tu gato.','Básicamente un NPC diseñado para que tu gato se crea cazador profesional mientras vive a base de siestas. Suave, ligero y perfecto para ser secuestrado, pateado y abandonado en tu cama a las 3 a.m. Orgullo felino garantizado.', 'imagenes/productos/ratonPeluche.png', 'Tela', 'Pequeño', false),
  new Juguete('Hueso de Nylon', 12, 'Hueso ultra duradero diseñado para masticadores potentes.', 'El equivalente perruno a darle algo indestructible a una excavadora con dientes. Si tu perro destruye TODO en menos de 10 minutos, esto es su jefe final. Reduce ansiedad, salva muebles y le da algo legal que morder en vez de tus zapatillas favoritas.', 'imagenes/productos/huesoNylon.png', 'Nylon', 'Grande', true),
  new Juguete('Peluche con sonido', 15, 'Peluche que emite sonido al apretarlo.', 'Aprietas → CHILLIDO → felicidad absoluta. Tu mascota entra en modo psicópata adorable mientras sacude el peluche como si le debiera dinero. Perfecto para jugar… o para escuchar ese sonido 47 veces seguidas hasta cuestionar tus decisiones de compra.', 'imagenes/productos/pelucheSonido.png', 'Tela', 'Mediano', true),
  new Juguete('Cuerda de Algodón', 14, 'Cuerda trenzada ideal para juegos de tirar y aflojar.', 'El juguete ideal para decidir quién manda: tú o tu perro. Tirar, morder, sacudir… todo mientras sus dientes se limpian como si tuviera dentista incorporado. Bonus: fortalece el vínculo o tu orgullo, dependiendo de quién gane.', 'imagenes/productos/cuerdaAlgodon.png', 'Algodón', 'Grande', true),
  new Juguete('Láser Interactivo', 18, 'Puntero láser para estimular el ejercicio en gatos.', 'Un simple puntito rojo capaz de convertir a tu gato en atleta olímpico con zoomies ilegales. Corre, salta, derrapa y falla espectacularmente… para luego fingir que no pasó nada. Entretenimiento infinito con cero mantenimiento y muchísimo caos controlado.', 'imagenes/productos/laserGato.png', 'Plástico', 'Pequeño', false),
  //________________________________________________________________________
  //Alimentacion 
  new Alimentacion('Croquetas para Perros', 30, 'Alimento balanceado para perros adultos.', 'Las bolitas mágicas que hacen “crack crack” y convierten a tu perro en aspiradora con patas. Nutritivas, sabrosas y lo suficientemente buenas como para que te mire como si no le dieras de comer desde 1847.', 'imagenes/productos/croquetasPerro.png', 'Perro', 'Seco'),
  new Alimentacion('Comida Húmeda para Gatos', 20, 'Deliciosa comida húmeda para gatos.', 'Abres la lata y tu gato aparece teletransportado desde otra dimensión. Textura gourmet, olor potente y aprobación inmediata del CEO felino de la casa. Si no le gusta, fingirá que nunca te conoció.', 'imagenes/productos/comidaHumeda.png', 'Gato', 'Húmedo'),
  new Alimentacion('Snacks para Aves', 15, 'Snacks nutritivos para aves pequeñas.', 'Pequeños bocados que convierten a tu pájaro en DJ de semillas 24/7. Picotea, tira la mitad al suelo y te mira como si fuera parte del proceso creativo. Diversión, nutrición y caos diminuto garantizado.', 'imagenes/productos/snackAves.png', 'Ave', 'Snack'),
  new Alimentacion('Alimento para Peces', 25, 'Alimento completo para peces de acuario.', 'Comida premium para criaturas que te juzgan en silencio desde el agua. Caen las escamas y de repente todos suben como si fuera Black Friday submarino. Limpio, nutritivo y con cero opiniones en voz alta.', 'imagenes/productos/alimentoPeces.png', 'Pez', 'Seco'),
  new Alimentacion('Pienso hipoalergico para perros', 35, 'Pienso especial para perros con alergias.', 'Para lomitos delicados que se inflaman con solo mirar una croqueta sospechosa. Suave con la barriga, duro contra el drama digestivo. Básicamente comida premium para perros con sistema operativo sensible.', 'imagenes/productos/piensoHipoalergenico.png', 'Perro', 'Seco'),
  new Alimentacion('Comida orgánica para gatos', 28, 'Comida orgánica y saludable para gatos.', 'Tu gato viviendo mejor que tú sin pagar alquiler. Ingredientes naturales, vibes saludables y energía de “soy un depredador elegante pero también hago siesta 16 horas”. Si pudiera, pediría vino ecológico para acompañar.', 'imagenes/productos/comidaOrganica.png', 'Gato', 'Húmedo'),
  //________________________________________________________________________
  new Alimentacion('Snacks dentales para perros', 18, 'Snacks que ayudan a la salud dental.', 'Huelen a victoria contra el aliento nuclear. Mastica, limpia dientes y encima se cree que es premio, no higiene. Win-win: perro feliz, nariz humana a salvo.', 'imagenes/productos/snackDental.png', 'Perro', 'Snack'),
  new Alimentacion('Galletas para perros', 12, 'Galletas sabrosas para perros.', 'Crujientes, sabrosas y capaces de hacer que tu perro obedezca cosas que normalmente ignoraría. Ideal para entrenamiento… o para sobornarlo descaradamente porque sí.', 'imagenes/productos/galletasPerro.png', 'Perro', 'Snack'),
  new Alimentacion('Bocaditos para gatos', 14, 'Bocaditos deliciosos para gatos.', 'Mini snacks con poder absoluto sobre tu felino. Agita la bolsa y aparece corriendo como si acabara de oír la palabra “herencia”. Perfectos para manipulación emocional nivel experto.', 'imagenes/productos/bocaditosGatos.png', 'Gato', 'Snack'),
  new Alimentacion('Mezcla para Hámster', 10, 'Alimento variado para pequeños roedores.', 'Un buffet libre diminuto donde tu hámster selecciona solo lo que le da la gana y el resto lo usa como decoración. Energía infinita para correr en la rueda a las 3 a.m. como si entrenara para algo.', 'imagenes/productos/alimentoHamster.png', 'Roedor', 'Seco'),
  new Alimentacion('Heno de Alfalfa', 12, 'Heno premium para conejos y cobayas.', 'Básicamente spaghetti vegetal para conejos y cobayas. Lo comen, lo esparcen, se esconden dentro y luego actúan como si todo fuera parte del feng shui del hábitat.', 'imagenes/productos/henoAlfalfa.png', 'Roedor', 'Seco'),
  new Alimentacion('Paté de Salmón para Gatos', 18, 'Alimento gourmet de alta palatabilidad.', 'Textura suave, sabor top y nivel de obsesión felina preocupante. Tu gato lo devora y luego te mira como diciendo: “bien, humano, hoy has estado a la altura”. Gourmet aprobado por narices ultra exigentes.', 'imagenes/productos/pateGato.png', 'Gato', 'Húmedo'),
  //________________________________________________________________________  
  // Merchandising 
  new Merchandising('Chubasquero', 45, 'Chubasquero impermeable para perros, ideal para protegerlos de la lluvia y el viento durante paseos al aire libre.', 'Tu perro bajo la lluvia normalmente parece un trapo mojado con patas. Con esto puesto, parece protagonista de videoclip triste caminando en cámara lenta. Impermeable, ligero y transparente para que el mundo vea que incluso mojado sigue teniendo más flow que tú.', 'imagenes/productos/chubasqueroPerro.png', 'Perro', 'Pequeño', 'Transparente'),
  new Merchandising('Sueter', 35, 'Sueter de algodón, suave y estiloso.', 'Si tu perro tiembla más que móvil al 1% de batería, este suéter le activa el modo calentito y facherito al instante. Suave, cómodo y fácil de poner, perfecto para paseos, siestas o para que parezca que tiene más estilo que tú sin ningún esfuerzo. Abriga de verdad y deja claro que aquí no se pasa frío, solo se reparte flow.', 'imagenes/productos/sueterPerro.png', 'Perro', 'Mediano', 'Rosa'),
  new Merchandising('Zapatitos Nada Que Ver', 25, 'Zapatos absurdamente geniales para mascotas con mucha personalidad.', '¿Tienen sentido? No. ¿Se ven increíbles? Absolutamente. Estos zapatitos con colores neón y formas extrañas son el complemento ideal para la peluca "Nada Que Ver". Diseñados para proteger las patas del calor del asfalto mientras tu perro camina con el estilo de una estrella de otra galaxia.', 'imagenes/productos/zapatosNadaQueVer1.png', 'Perro', 'Pequeño', 'Multicolor'),
  new Merchandising('Calcetines', 10, 'Calcetines suaves con huellas de silicona para evitar resbalones.', 'Tu mascota antes: Bambi en hielo, derrapes ilegales por el pasillo y frenazos contra la pared a las 3 a.m.; tu mascota ahora: agarre nivel boss final, pisadas silenciosas de asesino doméstico y cero patinazos aunque haga zoomies con turbo, suaves, calentitos y con suela que básicamente dice “aquí no se resbala nadie, aquí se conquista la casa”, efectos secundarios incluyen caminar con seguridad sospechosa, robarte el sitio del sofá con precisión milimétrica y mirarte como si siempre hubiera pagado hipoteca.', 'imagenes/productos/calcetinesMascota.png', 'Gato', 'Pequeño', 'Azul'),
  new Merchandising('Mochila de Paseo', 55, 'Mochila ergonómica para llevar a tu mascota.', 'Básicamente Uber Premium para criaturas pequeñas con ego grande. Tu mascota dentro mirando al mundo como si estuviera en tour mundial. Cómoda, ventilada y perfecta para ese gato que no camina porque “no vibra con eso”.', 'imagenes/productos/mochilaMascota.png', 'Gato', 'Mediano', 'Gris'), 
  new Merchandising('Gorra Deportiva', 20, 'Gorra con protección solar para perros.', 'No es una gorra, es el DLC “Perro Monitor de Playa Ultra Pro Max”; protección solar para no freírle el cerebro peludo y +500 de aura de entrenador personal que te va a decir “otra repetición más”, con esto puesto no pasea, inspecciona, no jadea, respira motivación, y la gente no pregunta su nombre, pregunta si tiene canal de fitness, ideal para sol, postureo extremo y para que parezca que sabe más de la vida que tú aunque coma cosas del suelo.', 'imagenes/productos/gorraPerro.png', 'Perro', 'Mediano', 'Amarillo'),
  //________________________________________________________________________  
  // Accesorios
  new Accesorios('Plato de comida', 8, 'Plato de comida para mascotas', 'El artefacto donde ocurre el evento más importante del día según tu mascota: comer como si no hubiera probado alimento desde la Edad Media; base antideslizante porque sin ella tu perro empujaría el plato hasta Portugal, cerámica resistente al modo aspiradora y fácil de limpiar para que no evolucione una civilización bacteriana dentro, válido para agua, croquetas o para que tu gato lo ignore y pida lo que tú estás comiendo.', 'imagenes/productos/platoComida.png', 'Perro', 'Mediano', 'Blanco'),
  new Accesorios('Correa para perro', 12, 'Correa para perro', 'La única barrera legal entre tu perro y perseguir absolutamente TODO lo que se mueva, desde palomas hasta hojas sospechosas; nylon reforzado para cuando entra en modo tractor poseído, agarre cómodo para que no pierdas la dignidad en público y mosquetón seguro porque si se suelta, oficialmente ya no tienes perro, tienes leyenda urbana corriendo a 80 km/h.', 'imagenes/productos/correaPerro.png', 'Perro', 'Mediano', 'Rojo'),
  new Accesorios('Collar para gato', 10, 'Collar para gato', 'Elegante collar con cascabel integrado para que sepas por dónde anda el pequeño criminal de guerra doméstico; cierre de seguridad que se abre si decide hacer parkour ilegal por cortinas, ligero, cómodo y perfecto para escuchar ese “tin tin” que significa “está tramando algo” o “ya tiró algo de la mesa pero aún no lo has descubierto”.', 'imagenes/productos/collarGato.png', 'Gato', 'Pequeño', 'Negro'),
  new Accesorios('Cepillo para perros', 12, 'Cepillo para perros', 'No es un cepillo, es un extractor profesional de pelo infinito; quita nudos, pelo muerto y probablemente suficiente material para clonar otro perro, suave con la piel pero brutal con la pelusa, deja el pelaje brillante y tu casa con un 3% menos de alfombra biológica flotante.', 'imagenes/productos/cepillo.png', 'Perro', 'Mediano', 'Negro'),
  new Accesorios('Lazo Coquette', 6, 'Lazo elegante para el pelo.', 'Nivel de elegancia que hace que tu mascota parezca heredera de un imperio europeo ficticio; seda suave, cero tirones y máximo poder de “mírame pero con respeto”, perfecto para fotos, paseos o para que otras mascotas sientan que pertenecen a la plebe.', 'imagenes/productos/lazoCoquette.png', 'Perro', 'Pequeño', 'Rosa'),
  new Accesorios('Horquillas Cora Power', 8, 'Set de 4 horquillas con motivos florales.', 'Pack de flores diminutas con energía de protagonista de anime primaveral; se sujetan incluso cuando tu mascota decide correr como si debiera dinero. Ligeras, seguras y capaces de transformar instantáneamente a cualquier peludo en influencer de jardín botánico.', 'imagenes/productos/horquillas.png', 'Gato', 'Pequeño', 'Multicolor'),
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
  new Mobiliario('Mesa para mascotas', 80, 'Mesa resistente para mascotas.', 'Una mesa propia porque claramente tu mascota no es “una mascota”, es un ser importante con agenda ocupada (comer, dormir, juzgarte); madera resistente para soportar platos, juguetes o el peso simbólico de su superioridad moral, aporta decoración elegante y la vibra de “sí, este animal tiene más muebles que tú”.', 'imagenes/productos/mesaMascota.png', 'Madera', true),
  new Mobiliario('Silla para mascotas', 60, 'Silla cómoda para mascotas.', 'Porque sentarse en el suelo es para mortales sin pelo premium; cómoda, resistente y perfecta para que tu mascota adopte la pose de “estoy reflexionando sobre mis inversiones”, ligera, fácil de limpiar y ideal para interiores o terraza mientras observa el mundo como si pagara impuestos.', 'imagenes/productos/sillaMascota.png', 'Plástico', false),
  new Mobiliario('Caja de almacenamiento', 40, 'Caja para almacenar artículos.', 'El cofre del tesoro donde desaparecen pelotas babosas, correas enredadas y juguetes misteriosamente rotos; gran capacidad para contener el caos mascotil antes de que evolucione a desastre nuclear, mantiene todo ordenado y te permite fingir que tienes la vida bajo control.', 'imagenes/productos/cajaAlmacenamiento.png', 'Plástico', true),
  new Mobiliario('Cama perro', 50, 'Cama cómoda para perros.', 'Un colchón digno de rey medieval pero con más babas. Acolchada, cómoda y diseñada para que caiga en sueño profundo instantáneo con ronquidos incluidos, se adapta al cuerpo como si lo abrazara la propia comodidad universal. Advertencia: una vez la pruebe, tu sofá queda oficialmente expropiado de todos modos.', 'imagenes/productos/camaPerro.png', 'Textil', true),
  new Mobiliario('Cama gato', 40, 'Cama suave para gatos.', 'Refugio térmico secreto donde tu gato se convierte en croqueta viviente durante 16 horas seguidas; ultra suave, calentita y con bordes que dicen “nadie me moleste salvo para dar comida”, perfecta para desaparecer misteriosamente y luego reaparecer como si nunca se hubiera ido.', 'imagenes/productos/camaGato.png', 'Felpa', false),
  new Mobiliario('Alfombra mascotas', 30, 'Alfombra antideslizante.', 'La zona VIP del suelo donde se concentran siestas, juguetes y decisiones cuestionables. Suave para las patas, antideslizante para evitar derrapes estilo película de acción y útil para delimitar “aquí vive el caos pero con elegancia”. Bonus: reduce el sonido de pasos ninja nocturnos… un poco.', 'imagenes/productos/alfombrAntideslizante.png', 'Textil', true),
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
  { nombre: 'Clásico', imagen: 'imagenes/productos/huesoNylon.png' },
  { nombre: 'Grande', imagen: 'imagenes/productos/huesoNylon2.png' }
];

// MERCHANDISING
inventario.find(p => p.nombre === 'Plato de comida').variantes = [
  { nombre: 'Marrón', imagen: 'imagenes/productos/platoComida.png' },
  { nombre: 'Morado', imagen: 'imagenes/productos/platoComida2.png' }
];
inventario.find(p => p.nombre === 'Chubasquero').variantes = [
  { nombre: 'Gris', imagen: 'imagenes/productos/chubasqueroPerro.png' },
  { nombre: 'Azul', imagen: 'imagenes/productos/chubasqueroPerro2.png' }
];
inventario.find(p => p.nombre === 'Sueter').variantes = [
  { nombre: 'Corazones', imagen: 'imagenes/productos/sueterCorazón.png' },
  { nombre: 'Pingüs', imagen: 'imagenes/productos/sueterPingu.png' },
  { nombre: 'Osos', imagen: 'imagenes/productos/sueterOso.png' },
  { nombre: 'Osos Polares', imagen: 'imagenes/productos/sueterPolar.png' }
];
inventario.find(p => p.nombre === 'Zapatitos Nada Que Ver').variantes = [
  { nombre: 'Leopardo', imagen: 'imagenes/productos/zapatosNadaQueVer1.png' },
  { nombre: 'Rosa', imagen: 'imagenes/productos/zapatosNadaQueVer.png' },
  { nombre: 'Verde', imagen: 'imagenes/productos/zapatosNadaQueVer2.png' },
  { nombre: 'Amarillo', imagen: 'imagenes/productos/zapatosNadaQueVer3.png' }
];
inventario.find(p => p.nombre === 'Calcetines').variantes = [
  { nombre: 'Negro', imagen: 'imagenes/productos/calcetinesMascota.png' },
  { nombre: 'Morado', imagen: 'imagenes/productos/calcetinesMascota2.png' }
];
inventario.find(p => p.nombre === 'Mochila de Paseo').variantes = [
  { nombre: 'Negro', imagen: 'imagenes/productos/mochilaMascota.png' },
  { nombre: 'Azul', imagen: 'imagenes/productos/mochilaMascota1.png' }
];
inventario.find(p => p.nombre === 'Gorra Deportiva').variantes = [
  { nombre: 'Azul', imagen: 'imagenes/productos/gorraPerro.png' },
  { nombre: 'Leopardo', imagen: 'imagenes/productos/gorraPerro2.png' }
];

// ACCESORIOS
inventario.find(p => p.nombre === 'Correa para perro').variantes = [
  { nombre: 'Marrón', imagen: 'imagenes/productos/correaPerro.png' },
  { nombre: 'Morado', imagen: 'imagenes/productos/correaPerro2.png' }
];
inventario.find(p => p.nombre === 'Collar para gato').variantes = [
  { nombre: 'Marrón', imagen: 'imagenes/productos/collarGato.png' },
  { nombre: 'Morado', imagen: 'imagenes/productos/collarGato2.png' }
];
inventario.find(p => p.nombre === 'Lazo Coquette').variantes = [
  { nombre: 'Rojo', imagen: 'imagenes/productos/lazoCoquette.png' },
  { nombre: 'Azul', imagen: 'imagenes/productos/lazoCoquette2.png' }
];
inventario.find(p => p.nombre === 'Horquillas Cora Power').variantes = [
  { nombre: 'Morado', imagen: 'imagenes/productos/horquillas.png' },
  { nombre: 'Azul', imagen: 'imagenes/productos/horquillas2.png' },
  { nombre: 'Verde', imagen: 'imagenes/productos/horquillas3.png' }
];

// CABELLO
inventario.find(p => p.nombre === 'Peluca Azul').variantes = [
  { nombre: 'Claro', imagen: 'imagenes/productos/peluAzul.png' },
  { nombre: 'Oscuro', imagen: 'imagenes/productos/peluAzul2.png' }
];
inventario.find(p => p.nombre === 'Peluca Pelocho').variantes = [
  { nombre: 'Negra', imagen: 'imagenes/productos/pelucaPelocho.png' },
  { nombre: 'Azul', imagen: 'imagenes/productos/pelucaPelocho2.png' },
  { nombre: 'Payaso', imagen: 'imagenes/productos/pelucaPayaso.png' }
];
inventario.find(p => p.nombre === 'Peluca Nada Que Ver').variantes = [
  { nombre: 'Marrón', imagen: 'imagenes/productos/pelucaNadaQueVer.png' },
  { nombre: 'Rubia', imagen: 'imagenes/productos/pelucaNadaQueVer2.png' }
];
inventario.find(p => p.nombre === 'Peluca Coqueta').variantes = [
  { nombre: 'Castaña', imagen: 'imagenes/productos/peluCoqueta.png' },
  { nombre: 'Rosa', imagen: 'imagenes/productos/peluCoqueta2.png' }
];
inventario.find(p => p.nombre === 'Peluca Rasta').variantes = [
  { nombre: 'Marrón', imagen: 'imagenes/productos/peluRast.png' },
  { nombre: 'Amarillo', imagen: 'imagenes/productos/peluRast2.png' }
];
inventario.find(p => p.nombre === 'Peluca Gato').variantes = [
  { nombre: 'Gris', imagen: 'imagenes/productos/pelucaGato.png' },
  { nombre: 'Morado', imagen: 'imagenes/productos/pelucaGato2.png' }
];

// MOBILIARIO
inventario.find(p => p.nombre === 'Mesa para mascotas').variantes = [
  { nombre: 'Negro', imagen: 'imagenes/productos/mesaMascota.png' },
  { nombre: 'Naranja', imagen: 'imagenes/productos/mesaMascota2.png' }
];
inventario.find(p => p.nombre === 'Silla para mascotas').variantes = [
  { nombre: 'Marrón', imagen: 'imagenes/productos/sillaMascota.png' },
  { nombre: 'Gris', imagen: 'imagenes/productos/sillaMascota2.png' }
];
inventario.find(p => p.nombre === 'Caja de almacenamiento').variantes = [
  { nombre: 'Pequeña', imagen: 'imagenes/productos/cajaAlmacenamiento.png' },
  { nombre: 'Grande', imagen: 'imagenes/productos/cajaAlmacenamiento2.png' }
];
inventario.find(p => p.nombre === 'Cama perro').variantes = [
  { nombre: 'Gris oscuro', imagen: 'imagenes/productos/camaPerro.png' },
  { nombre: 'Rosa', imagen: 'imagenes/productos/camaPerro2.png' }
];
inventario.find(p => p.nombre === 'Cama gato').variantes = [
  { nombre: 'Rosa', imagen: 'imagenes/productos/camaGato.png' },
  { nombre: 'Morado', imagen: 'imagenes/productos/camaGato2.png' }
];
inventario.find(p => p.nombre === 'Alfombra mascotas').variantes = [
  { nombre: 'Beary Soft Nap', imagen: 'imagenes/productos/alfombrAntideslizante.png' },
  { nombre: 'Pawty Time', imagen: 'imagenes/productos/alfombrAntideslizante2.png' }
];

// LISTA VACÍA PARA EL CARRITO 
export const carrito = new Map();

// FUNCIONES RELATIVAS A PRODUCTOS 
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

    case 'accesorios':
      nuevoProducto = new Accesorios(
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

    default:
      return false;
  }

  inventario.push(nuevoProducto);
  return true;
}
