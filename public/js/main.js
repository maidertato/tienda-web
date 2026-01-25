import { inventario } from "./tienda.js";

console.log("Inventario en main:", inventario);

const contenedor = document.getElementById("lista-productos");

function renderizarTienda(productos) {
    contenedor.innerHTML = "";

    productos.forEach(juego => {
        const card = document.createElement("div");
        card.className = "card p-2";
        card.style.width = "12rem";

        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${juego.nombre}</h5>
                <p class="card-text">${juego.descripcion}</p>
                <p class="card-text"><strong>${juego.precio} €</strong></p>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

renderizarTienda(inventario);
