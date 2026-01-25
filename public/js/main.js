import { inventario, JuegoEstrategia } from './tienda.js';

//SELECTORES
const contenedor = document.getElementById('lista-productos');
const carritoContenedor = document.getElementById('carrito');

//ESTADO 
const carrito = new Map();

//RENDER TIENDA
export function renderizarTienda(productos) {
    contenedor.innerHTML = ''; // Limpiamos lo que haya

    productos.forEach(juego => {
        const card = document.createElement('div');
        card.className = 'card m-2';
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

// RENDER CARRITO
function renderizarCarrito() {
    carritoContenedor.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;

        const div = document.createElement('div');
        div.innerHTML = `
            <p>
                ${item.nombre} 
                (${item.cantidad}) - 
                ${item.precio * item.cantidad}€
            </p>
        `;
        carritoContenedor.appendChild(div);
    });

    if (carrito.size === 0) {
        carritoContenedor.innerHTML = '<p>Carrito vacío</p>';
    } else {
        carritoContenedor.innerHTML += `<strong>Total: ${total}€</strong>`;
    }
}

// EVENTO AÑADIR AL CARRITO
contenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-agregar')) {
        const id = e.target.dataset.id;
        const juego = inventario.find(j => j.id === id);

        if (!carrito.has(id)) {
            carrito.set(id, { ...juego, cantidad: 1 });
        } else {
            carrito.get(id).cantidad++;
        }

        renderizarCarrito();
    }
});

// Creamos unos juegos de prueba para empezar
const catan = new JuegoEstrategia("Catan", 35, "Juego de estrategia.", "imagenes/default.png", "Media");
inventario.push(catan);

// Ejecutamos la función al cargar la página
renderizarTienda(inventario);
renderizarCarrito();