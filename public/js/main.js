import { inventario, JuegoEstrategia } from './tienda.js';

const contenedor = document.getElementById('lista-productos');

// Función para pintar los juegos en el HTML
export function renderizarTienda(productos) {
    contenedor.innerHTML = ''; // Limpiamos lo que haya

    productos.forEach(juego => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.width = '12rem';
        card.innerHTML = `
            <img src="${juego.imagen}" class="card-img-top" alt="${juego.nombre}">
            <div class="card-body">
                <h5 class="card-title">${juego.nombre}</h5>
                <p class="card-text">${juego.descripcion}</p>
                <p class="card-text"><strong>${juego.precio}€</strong></p>
                <button class="btn btn-primary w-100 btn-agregar" data-id="${juego.id}">
                    Añadir al carrito
                </button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// Creamos unos juegos de prueba para empezar
const catan = new JuegoEstrategia("Catan", 35, "Juego de estrategia.", "imagenes/default.png", "Media");
inventario.push(catan);

// Ejecutamos la función al cargar la página
renderizarTienda(inventario);