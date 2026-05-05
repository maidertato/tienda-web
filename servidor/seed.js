require('dotenv').config();
const { MongoClient } = require('mongodb');

const productos = [
  // ── JUGUETES ──────────────────────────────────────────────────────────────
  {
    tipo: 'Juguete', nombre: 'Pelota de Goma', precio: 10,
    descripcion: 'La clásica pelota que no muere nunca, aunque tu perro sí pierda la cabeza cada vez que la ve. Rebota, resiste mordiscos nivel trituradora y convierte cualquier paseo en unas Olimpiadas caninas no autorizadas. Si desaparece bajo el sofá, prepárate para miradas acusadoras durante horas.',
    imagen: 'imagenes/productos/pelotaGoma.png', categoriajuguete: 'Pelota', tamano: 'Mediano', esInteractivo: true,
    variantes: [
      { nombre: 'Modelo 1', imagen: 'imagenes/productos/pelotaGoma.png' },
      { nombre: 'Modelo 2', imagen: 'imagenes/productos/pelotaGoma2.png' },
      { nombre: 'Modelo 3', imagen: 'imagenes/productos/pelotaGoma3.png' }
    ]
  },
  {
    tipo: 'Juguete', nombre: 'Ratón de Peluche', precio: 8,
    descripcion: 'Básicamente un NPC diseñado para que tu gato se crea cazador profesional mientras vive a base de siestas. Suave, ligero y perfecto para ser secuestrado, pateado y abandonado en tu cama a las 3 a.m. Orgullo felino garantizado.',
    imagen: 'imagenes/productos/ratonPeluche.png', categoriajuguete: 'Peluche', tamano: 'Pequeño', esInteractivo: false,
    variantes: [
      { nombre: 'Rosa', imagen: 'imagenes/productos/ratonPeluche.png' },
      { nombre: 'Verde', imagen: 'imagenes/productos/ratonPeluche2.png' },
      { nombre: 'Azul', imagen: 'imagenes/productos/ratonPeluche3.png' }
    ]
  },
  {
    tipo: 'Juguete', nombre: 'Hueso de Nylon', precio: 12,
    descripcion: 'El equivalente perruno a darle algo indestructible a una excavadora con dientes. Si tu perro destruye TODO en menos de 10 minutos, esto es su jefe final. Reduce ansiedad, salva muebles y le da algo legal que morder en vez de tus zapatillas favoritas.',
    imagen: 'imagenes/productos/huesoNylon.png', categoriajuguete: 'Pelota', tamano: 'Grande', esInteractivo: true,
    variantes: [
      { nombre: 'Clásico', imagen: 'imagenes/productos/huesoNylon.png' },
      { nombre: 'Grande', imagen: 'imagenes/productos/huesoNylon2.png' }
    ]
  },
  {
    tipo: 'Juguete', nombre: 'Peluche con sonido', precio: 15,
    descripcion: 'Aprietas → CHILLIDO → felicidad absoluta. Tu mascota entra en modo psicópata adorable mientras sacude el peluche como si le debiera dinero. Perfecto para jugar… o para escuchar ese sonido 47 veces seguidas hasta cuestionar tus decisiones de compra.',
    imagen: 'imagenes/productos/pelucheSonido.png', categoriajuguete: 'Peluche', tamano: 'Mediano', esInteractivo: true,
    variantes: []
  },
  {
    tipo: 'Juguete', nombre: 'Cuerda de Algodón', precio: 14,
    descripcion: 'El juguete ideal para decidir quién manda: tú o tu perro. Tirar, morder, sacudir… todo mientras sus dientes se limpian como si tuviera dentista incorporado. Bonus: fortalece el vínculo o tu orgullo, dependiendo de quién gane.',
    imagen: 'imagenes/productos/cuerdaAlgodon.png', categoriajuguete: 'Cuerda', tamano: 'Grande', esInteractivo: true,
    variantes: []
  },
  {
    tipo: 'Juguete', nombre: 'Láser Interactivo', precio: 18,
    descripcion: 'Un simple puntito rojo capaz de convertir a tu gato en atleta olímpico con zoomies ilegales. Corre, salta, derrapa y falla espectacularmente… para luego fingir que no pasó nada. Entretenimiento infinito con cero mantenimiento y muchísimo caos controlado.',
    imagen: 'imagenes/productos/laserGato.png', categoriajuguete: 'Laser', tamano: 'Pequeño', esInteractivo: false,
    variantes: []
  },

  // ── ALIMENTACIÓN ──────────────────────────────────────────────────────────
  {
    tipo: 'Alimentacion', nombre: 'Croquetas para Perros', precio: 30,
    descripcion: 'Las bolitas mágicas que hacen "crack crack" y convierten a tu perro en aspiradora con patas. Nutritivas, sabrosas y lo suficientemente buenas como para que te mire como si no le dieras de comer desde 1847.',
    imagen: 'imagenes/productos/croquetasPerro.png', tipoAlimento: 'Seco', tipoMascota: 'Perro', variantes: []
  },
  {
    tipo: 'Alimentacion', nombre: 'Comida Húmeda para Gatos', precio: 20,
    descripcion: 'Abres la lata y tu gato aparece teletransportado desde otra dimensión. Textura gourmet, olor potente y aprobación inmediata del CEO felino de la casa. Si no le gusta, fingirá que nunca te conoció.',
    imagen: 'imagenes/productos/comidaHumeda.png', tipoAlimento: 'Húmedo', tipoMascota: 'Gato', variantes: []
  },
  {
    tipo: 'Alimentacion', nombre: 'Snacks para Aves', precio: 15,
    descripcion: 'Pequeños bocados que convierten a tu pájaro en DJ de semillas 24/7. Picotea, tira la mitad al suelo y te mira como si fuera parte del proceso creativo. Diversión, nutrición y caos diminuto garantizado.',
    imagen: 'imagenes/productos/snackAves.png', tipoAlimento: 'Snack', tipoMascota: 'Ave', variantes: []
  },
  {
    tipo: 'Alimentacion', nombre: 'Alimento para Peces', precio: 25,
    descripcion: 'Comida premium para criaturas que te juzgan en silencio desde el agua. Caen las escamas y de repente todos suben como si fuera Black Friday submarino. Limpio, nutritivo y con cero opiniones en voz alta.',
    imagen: 'imagenes/productos/alimentoPeces.png', tipoAlimento: 'Seco', tipoMascota: 'Pez', variantes: []
  },
  {
    tipo: 'Alimentacion', nombre: 'Pienso hipoalergico para perros', precio: 35,
    descripcion: 'Para lomitos delicados que se inflaman con solo mirar una croqueta sospechosa. Suave con la barriga, duro contra el drama digestivo. Básicamente comida premium para perros con sistema operativo sensible.',
    imagen: 'imagenes/productos/piensoHipoalergenico.png', tipoAlimento: 'Seco', tipoMascota: 'Perro', variantes: []
  },
  {
    tipo: 'Alimentacion', nombre: 'Comida orgánica para gatos', precio: 28,
    descripcion: 'Tu gato viviendo mejor que tú sin pagar alquiler. Ingredientes naturales, vibes saludables y energía de "soy un depredador elegante pero también hago siesta 16 horas". Si pudiera, pediría vino ecológico para acompañar.',
    imagen: 'imagenes/productos/comidaOrganica.png', tipoAlimento: 'Húmedo', tipoMascota: 'Gato', variantes: []
  },
  {
    tipo: 'Alimentacion', nombre: 'Snacks dentales para perros', precio: 18,
    descripcion: 'Huelen a victoria contra el aliento nuclear. Mastica, limpia dientes y encima se cree que es premio, no higiene. Win-win: perro feliz, nariz humana a salvo.',
    imagen: 'imagenes/productos/snackDental.png', tipoAlimento: 'Snack', tipoMascota: 'Perro', variantes: []
  },
  {
    tipo: 'Alimentacion', nombre: 'Galletas para perros', precio: 12,
    descripcion: 'Crujientes, sabrosas y capaces de hacer que tu perro obedezca cosas que normalmente ignoraría. Ideal para entrenamiento… o para sobornarlo descaradamente porque sí.',
    imagen: 'imagenes/productos/galletasPerro.png', tipoAlimento: 'Snack', tipoMascota: 'Perro', variantes: []
  },
  {
    tipo: 'Alimentacion', nombre: 'Bocaditos para gatos', precio: 14,
    descripcion: 'Mini snacks con poder absoluto sobre tu felino. Agita la bolsa y aparece corriendo como si acabara de oír la palabra "herencia". Perfectos para manipulación emocional nivel experto.',
    imagen: 'imagenes/productos/bocaditosGatos.png', tipoAlimento: 'Snack', tipoMascota: 'Gato', variantes: []
  },
  {
    tipo: 'Alimentacion', nombre: 'Mezcla para Hámster', precio: 10,
    descripcion: 'Un buffet libre diminuto donde tu hámster selecciona solo lo que le da la gana y el resto lo usa como decoración. Energía infinita para correr en la rueda a las 3 a.m. como si entrenara para algo.',
    imagen: 'imagenes/productos/alimentoHamster.png', tipoAlimento: 'Seco', tipoMascota: 'Roedor', variantes: []
  },
  {
    tipo: 'Alimentacion', nombre: 'Heno de Alfalfa', precio: 12,
    descripcion: 'Básicamente spaghetti vegetal para conejos y cobayas. Lo comen, lo esparcen, se esconden dentro y luego actúan como si todo fuera parte del feng shui del hábitat.',
    imagen: 'imagenes/productos/henoAlfalfa.png', tipoAlimento: 'Seco', tipoMascota: 'Roedor', variantes: []
  },
  {
    tipo: 'Alimentacion', nombre: 'Paté de Salmón para Gatos', precio: 18,
    descripcion: 'Textura suave, sabor top y nivel de obsesión felina preocupante. Tu gato lo devora y luego te mira como diciendo: "bien, humano, hoy has estado a la altura". Gourmet aprobado por narices ultra exigentes.',
    imagen: 'imagenes/productos/pateGato.png', tipoAlimento: 'Húmedo', tipoMascota: 'Gato', variantes: []
  },

  // ── MERCHANDISING ─────────────────────────────────────────────────────────
  {
    tipo: 'Merchandising', nombre: 'Chubasquero', precio: 45,
    descripcion: 'Tu perro bajo la lluvia normalmente parece un trapo mojado con patas. Con esto puesto, parece protagonista de videoclip triste caminando en cámara lenta. Impermeable, ligero y transparente para que el mundo vea que incluso mojado sigue teniendo más flow que tú.',
    imagen: 'imagenes/productos/chubasqueroPerro.png', parteDelCuerpo: 'Cuerpo', talla: 'Pequeño', color: 'Transparente',
    variantes: [
      { nombre: 'Gris', imagen: 'imagenes/productos/chubasqueroPerro.png' },
      { nombre: 'Azul', imagen: 'imagenes/productos/chubasqueroPerro2.png' }
    ]
  },
  {
    tipo: 'Merchandising', nombre: 'Sueter', precio: 35,
    descripcion: 'Si tu perro tiembla más que móvil al 1% de batería, este suéter le activa el modo calentito y facherito al instante. Suave, cómodo y fácil de poner, perfecto para paseos, siestas o para que parezca que tiene más estilo que tú sin ningún esfuerzo. Abriga de verdad y deja claro que aquí no se pasa frío, solo se reparte flow.',
    imagen: 'imagenes/productos/sueterCorazón.png', parteDelCuerpo: 'Cuerpo', talla: 'Mediano', color: 'Rosa',
    variantes: [
      { nombre: 'Corazones', imagen: 'imagenes/productos/sueterCorazón.png' },
      { nombre: 'Pingüs', imagen: 'imagenes/productos/sueterPingu.png' },
      { nombre: 'Osos', imagen: 'imagenes/productos/sueterOso.png' },
      { nombre: 'Osos Polares', imagen: 'imagenes/productos/sueterPolar.png' }
    ]
  },
  {
    tipo: 'Merchandising', nombre: 'Zapatitos Nada Que Ver', precio: 25,
    descripcion: '¿Tienen sentido? No. ¿Se ven increíbles? Absolutamente. Estos zapatitos con colores neón y formas extrañas son el complemento ideal para la peluca "Nada Que Ver". Diseñados para proteger las patas del calor del asfalto mientras tu perro camina con el estilo de una estrella de otra galaxia.',
    imagen: 'imagenes/productos/zapatosNadaQueVer1.png', parteDelCuerpo: 'Patas', talla: 'Pequeño', color: 'Multicolor',
    variantes: [
      { nombre: 'Leopardo', imagen: 'imagenes/productos/zapatosNadaQueVer1.png' },
      { nombre: 'Rosa', imagen: 'imagenes/productos/zapatosNadaQueVer.png' },
      { nombre: 'Verde', imagen: 'imagenes/productos/zapatosNadaQueVer2.png' },
      { nombre: 'Amarillo', imagen: 'imagenes/productos/zapatosNadaQueVer3.png' }
    ]
  },
  {
    tipo: 'Merchandising', nombre: 'Calcetines', precio: 10,
    descripcion: 'Tu mascota antes: Bambi en hielo, derrapes ilegales por el pasillo y frenazos contra la pared a las 3 a.m.; tu mascota ahora: agarre nivel boss final, pisadas silenciosas de asesino doméstico y cero patinazos aunque haga zoomies con turbo.',
    imagen: 'imagenes/productos/calcetinesMascota.png', parteDelCuerpo: 'Patas', talla: 'Pequeño', color: 'Azul',
    variantes: [
      { nombre: 'Negro', imagen: 'imagenes/productos/calcetinesMascota.png' },
      { nombre: 'Morado', imagen: 'imagenes/productos/calcetinesMascota2.png' }
    ]
  },
  {
    tipo: 'Merchandising', nombre: 'Mochila de Paseo', precio: 55,
    descripcion: 'Básicamente Uber Premium para criaturas pequeñas con ego grande. Tu mascota dentro mirando al mundo como si estuviera en tour mundial. Cómoda, ventilada y perfecta para ese gato que no camina porque "no vibra con eso".',
    imagen: 'imagenes/productos/mochilaMascota.png', parteDelCuerpo: 'Cuerpo', talla: 'Mediano', color: 'Gris',
    variantes: [
      { nombre: 'Negro', imagen: 'imagenes/productos/mochilaMascota.png' },
      { nombre: 'Azul', imagen: 'imagenes/productos/mochilaMascota1.png' }
    ]
  },
  {
    tipo: 'Merchandising', nombre: 'Gorra Deportiva', precio: 20,
    descripcion: 'No es una gorra, es el DLC "Perro Monitor de Playa Ultra Pro Max"; protección solar para no freírle el cerebro peludo y +500 de aura de entrenador personal.',
    imagen: 'imagenes/productos/gorraPerro.png', parteDelCuerpo: 'Cabeza', talla: 'Mediano', color: 'Amarillo',
    variantes: [
      { nombre: 'Azul', imagen: 'imagenes/productos/gorraPerro.png' },
      { nombre: 'Leopardo', imagen: 'imagenes/productos/gorraPerro2.png' }
    ]
  },

  // ── ACCESORIOS ────────────────────────────────────────────────────────────
  {
    tipo: 'Accesorios', nombre: 'Plato de comida', precio: 8,
    descripcion: 'El artefacto donde ocurre el evento más importante del día según tu mascota: comer como si no hubiera probado alimento desde la Edad Media; base antideslizante, cerámica resistente al modo aspiradora y fácil de limpiar.',
    imagen: 'imagenes/productos/platoComida.png', tipoMascota: 'Perro y gato', talla: 'Mediano', color: 'Blanco',
    variantes: [
      { nombre: 'Marrón', imagen: 'imagenes/productos/platoComida.png' },
      { nombre: 'Morado', imagen: 'imagenes/productos/platoComida2.png' }
    ]
  },
  {
    tipo: 'Accesorios', nombre: 'Correa para perro', precio: 12,
    descripcion: 'La única barrera legal entre tu perro y perseguir absolutamente TODO lo que se mueva, desde palomas hasta hojas sospechosas; nylon reforzado, agarre cómodo y mosquetón seguro.',
    imagen: 'imagenes/productos/correaPerro.png', tipoMascota: 'Perro', talla: 'Mediano', color: 'Rojo',
    variantes: [
      { nombre: 'Marrón', imagen: 'imagenes/productos/correaPerro.png' },
      { nombre: 'Morado', imagen: 'imagenes/productos/correaPerro2.png' }
    ]
  },
  {
    tipo: 'Accesorios', nombre: 'Collar para gato', precio: 10,
    descripcion: 'Elegante collar con cascabel integrado para que sepas por dónde anda el pequeño criminal de guerra doméstico; cierre de seguridad que se abre si decide hacer parkour ilegal por cortinas.',
    imagen: 'imagenes/productos/collarGato.png', tipoMascota: 'Gato', talla: 'Pequeño', color: 'Negro',
    variantes: [
      { nombre: 'Marrón', imagen: 'imagenes/productos/collarGato.png' },
      { nombre: 'Morado', imagen: 'imagenes/productos/collarGato2.png' }
    ]
  },
  {
    tipo: 'Accesorios', nombre: 'Cepillo para perros', precio: 12,
    descripcion: 'No es un cepillo, es un extractor profesional de pelo infinito; quita nudos, pelo muerto y probablemente suficiente material para clonar otro perro.',
    imagen: 'imagenes/productos/cepillo.png', tipoMascota: 'Perro y gato', talla: 'Mediano', color: 'Negro',
    variantes: []
  },
  {
    tipo: 'Accesorios', nombre: 'Lazo Coquette', precio: 6,
    descripcion: 'Nivel de elegancia que hace que tu mascota parezca heredera de un imperio europeo ficticio; seda suave, cero tirones y máximo poder de "mírame pero con respeto".',
    imagen: 'imagenes/productos/lazoCoquette.png', tipoMascota: 'Perro y gato', talla: 'Pequeño', color: 'Rosa',
    variantes: [
      { nombre: 'Rojo', imagen: 'imagenes/productos/lazoCoquette.png' },
      { nombre: 'Azul', imagen: 'imagenes/productos/lazoCoquette2.png' }
    ]
  },
  {
    tipo: 'Accesorios', nombre: 'Horquillas Cora Power', precio: 8,
    descripcion: 'Pack de flores diminutas con energía de protagonista de anime primaveral; se sujetan incluso cuando tu mascota decide correr como si debiera dinero.',
    imagen: 'imagenes/productos/horquillas.png', tipoMascota: 'Perro y gato', talla: 'Pequeño', color: 'Multicolor',
    variantes: [
      { nombre: 'Morado', imagen: 'imagenes/productos/horquillas.png' },
      { nombre: 'Azul', imagen: 'imagenes/productos/horquillas2.png' },
      { nombre: 'Verde', imagen: 'imagenes/productos/horquillas3.png' }
    ]
  },

  // ── CABELLO (PELUCAS) ─────────────────────────────────────────────────────
  {
    tipo: 'Cabello', nombre: 'Peluca Azul', precio: 30,
    descripcion: 'La peluca azul más escandalosamente divertida del planeta perruno. Su color eléctrico convierte a tu mascota en una estrella pop instantánea capaz de robar miradas, aplausos y carcajadas en segundos.',
    imagen: 'imagenes/productos/peluAzul.png', estilo: 'Pop', tamaño: 'Pequeño', tipoMascota: 'Perro', color: 'Azul',
    variantes: [
      { nombre: 'Claro', imagen: 'imagenes/productos/peluAzul.png' },
      { nombre: 'Oscuro', imagen: 'imagenes/productos/peluAzul2.png' }
    ]
  },
  {
    tipo: 'Cabello', nombre: 'Peluca Pelocho', precio: 35,
    descripcion: 'Volumen, actitud y puro flow canino. Esta peluca afro transforma a tu perrito en una leyenda del estilo con presencia imponente y carisma imparable.',
    imagen: 'imagenes/productos/pelucaPelocho.png', estilo: 'Disco', tamaño: 'Pequeño', tipoMascota: 'Perro', color: 'Negro',
    variantes: [
      { nombre: 'Negra', imagen: 'imagenes/productos/pelucaPelocho.png' },
      { nombre: 'Azul', imagen: 'imagenes/productos/pelucaPelocho2.png' },
      { nombre: 'Payaso', imagen: 'imagenes/productos/PelucaPayaso.png' }
    ]
  },
  {
    tipo: 'Cabello', nombre: 'Peluca Nada Que Ver', precio: 28,
    descripcion: 'El accesorio oficial del caos adorable. Esta peluca parece decir: "no sé qué está pasando, pero me encanta". Su diseño alocado rompe toda lógica estética y convierte a tu perrito en una obra de arte incomprendida pero hilarante.',
    imagen: 'imagenes/productos/pelucaNadaQueVer.png', estilo: 'English teacher', tamaño: 'Pequeño', tipoMascota: 'Perro', color: 'Marrón',
    variantes: [
      { nombre: 'Marrón', imagen: 'imagenes/productos/pelucaNadaQueVer.png' },
      { nombre: 'Rubia', imagen: 'imagenes/productos/pelucaNadaQueVer2.png' }
    ]
  },
  {
    tipo: 'Cabello', nombre: 'Peluca Coqueta', precio: 32,
    descripcion: 'Elegancia, ternura y drama romántico en versión miniatura. Esta peluca blanca con moñito convierte a tu perrito en la definición de "demasiado adorable para este mundo".',
    imagen: 'imagenes/productos/peluCoqueta.png', estilo: 'Kawaii', tamaño: 'Pequeño', tipoMascota: 'Perro', color: 'Blanco',
    variantes: [
      { nombre: 'Castaña', imagen: 'imagenes/productos/peluCoqueta.png' },
      { nombre: 'Rosa', imagen: 'imagenes/productos/peluCoqueta2.png' }
    ]
  },
  {
    tipo: 'Cabello', nombre: 'Peluca Rasta', precio: 40,
    descripcion: 'Espíritu libre, vibra relajada y energía de fiesta eterna. Esta peluca rasta convierte a tu perrito en el alma del carnaval perruno.',
    imagen: 'imagenes/productos/peluRast.png', estilo: 'Reagge', tamaño: 'Pequeño', tipoMascota: 'Perro', color: 'Marrón',
    variantes: [
      { nombre: 'Marrón', imagen: 'imagenes/productos/peluRast.png' },
      { nombre: 'Amarillo', imagen: 'imagenes/productos/peluRast2.png' }
    ]
  },
  {
    tipo: 'Cabello', nombre: 'Peluca Gato', precio: 40,
    descripcion: 'Tu gato no pidió esto. Tu gato no lo aprueba. Tu gato te juzga… pero se ve increíble. Esta peluca convierte a cualquier felino en una mezcla de diva dramática y meme histórico.',
    imagen: 'imagenes/productos/pelucaGato.png', estilo: 'Casual', tamaño: 'Pequeño', tipoMascota: 'Gato', color: 'Marrón',
    variantes: [
      { nombre: 'Gris', imagen: 'imagenes/productos/pelucaGato.png' },
      { nombre: 'Morado', imagen: 'imagenes/productos/pelucaGato2.png' }
    ]
  },

  // ── MOBILIARIO ────────────────────────────────────────────────────────────
  {
    tipo: 'Mobiliario', nombre: 'Mesa para mascotas', precio: 80,
    descripcion: 'Una mesa propia porque claramente tu mascota no es "una mascota", es un ser importante con agenda ocupada (comer, dormir, juzgarte); madera resistente y decoración elegante.',
    imagen: 'imagenes/productos/mesaMascota.png', material: 'Madera', usoInterior: true,
    variantes: [
      { nombre: 'Negro', imagen: 'imagenes/productos/mesaMascota.png' },
      { nombre: 'Naranja', imagen: 'imagenes/productos/mesaMascota2.png' }
    ]
  },
  {
    tipo: 'Mobiliario', nombre: 'Silla para mascotas', precio: 60,
    descripcion: 'Porque sentarse en el suelo es para mortales sin pelo premium; cómoda, resistente y perfecta para que tu mascota adopte la pose de "estoy reflexionando sobre mis inversiones".',
    imagen: 'imagenes/productos/sillaMascota.png', material: 'Plástico', usoInterior: false,
    variantes: [
      { nombre: 'Marrón', imagen: 'imagenes/productos/sillaMascota.png' },
      { nombre: 'Gris', imagen: 'imagenes/productos/sillaMascota2.png' }
    ]
  },
  {
    tipo: 'Mobiliario', nombre: 'Caja de almacenamiento', precio: 40,
    descripcion: 'El cofre del tesoro donde desaparecen pelotas babosas, correas enredadas y juguetes misteriosamente rotos; gran capacidad para contener el caos mascotil.',
    imagen: 'imagenes/productos/cajaAlmacenamiento.png', material: 'Plástico', usoInterior: true,
    variantes: [
      { nombre: 'Pequeña', imagen: 'imagenes/productos/cajaAlmacenamiento.png' },
      { nombre: 'Grande', imagen: 'imagenes/productos/cajaAlmacenamiento2.png' }
    ]
  },
  {
    tipo: 'Mobiliario', nombre: 'Cama perro', precio: 50,
    descripcion: 'Un colchón digno de rey medieval pero con más babas. Acolchada, cómoda y diseñada para que caiga en sueño profundo instantáneo con ronquidos incluidos.',
    imagen: 'imagenes/productos/camaPerro.png', material: 'Textil', usoInterior: true,
    variantes: [
      { nombre: 'Gris oscuro', imagen: 'imagenes/productos/camaPerro.png' },
      { nombre: 'Rosa', imagen: 'imagenes/productos/camaPerro2.png' }
    ]
  },
  {
    tipo: 'Mobiliario', nombre: 'Cama gato', precio: 40,
    descripcion: 'Refugio térmico secreto donde tu gato se convierte en croqueta viviente durante 16 horas seguidas; ultra suave, calentita y con bordes que dicen "nadie me moleste salvo para dar comida".',
    imagen: 'imagenes/productos/camaGato.png', material: 'Felpa', usoInterior: false,
    variantes: [
      { nombre: 'Rosa', imagen: 'imagenes/productos/camaGato.png' },
      { nombre: 'Morado', imagen: 'imagenes/productos/camaGato2.png' }
    ]
  },
  {
    tipo: 'Mobiliario', nombre: 'Alfombra mascotas', precio: 30,
    descripcion: 'La zona VIP del suelo donde se concentran siestas, juguetes y decisiones cuestionables. Suave para las patas, antideslizante para evitar derrapes estilo película de acción.',
    imagen: 'imagenes/productos/alfombrAntideslizante.png', material: 'Textil', usoInterior: true,
    variantes: [
      { nombre: 'Beary Soft Nap', imagen: 'imagenes/productos/alfombrAntideslizante.png' },
      { nombre: 'Pawty Time', imagen: 'imagenes/productos/alfombrAntideslizante2.png' }
    ]
  }
];

async function seed() {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    console.log('Conectado a MongoDB');

    const db = client.db();
    const col = db.collection('productos');

    await col.deleteMany({});
    console.log('Colección productos vaciada');

    const resultado = await col.insertMany(productos);
    console.log(`✓ ${resultado.insertedCount} productos insertados correctamente`);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.close();
  }
}

seed();
