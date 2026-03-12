import React from 'react';

// El componente recibe 3 cosas: 
// 1. cantidadCarrito: para mostrar el numerito en el icono
// 2. toggleCarrito: para abrir el panel lateral
// 3. irAInicio: para limpiar filtros y volver al principio

const MenuNavegacion = ({ cantidadCarrito, toggleCarrito, irAInicio }) => {
  return (
    // Contenedor principal de la barra de navegación
    <nav className="nav-expand">
      {/* Lista horizontal de botones, centrada y con separación */}
      <ul className="button-container d-flex list-unstyled justify-content-center m-0 p-2 gap-4">

        {/* BOTÓN DE INICIO */}
        <li>
          <button className="nav-btn" onClick={irAInicio}>
            {/* SVG del icono de inicio */}
            <svg className="icon" width="24" height="24" viewBox="0 0 1024 1024">
              <path fill="currentColor"
                d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2z" />
            </svg>
            <span className="nav-text">Inicio</span>
          </button>
        </li>

        {/* BOTÓN DEL CARRITO */}
        <li>
          {/* El botón usa toggleCarrito y atributos de Bootstrap para abrir el Offcanvas */}
          <button className="nav-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#carrito" onClick={toggleCarrito}>
            {/* Contenedor relativo para que el globo con el numerito se posicione sobre el icono */}
            <div style={{ position: "relative", display: "inline-flex" }}>
              {/* SVG del icono del carrito de compra */}
              <svg className="icon" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
              </svg>
              {/* Globo rojo que muestra cuántos productos hay en total */}
              <span className="cart-badge badge rounded-pill">
                {cantidadCarrito}
              </span>

            </div>
            <span className="nav-text">Carrito</span>
          </button>
        </li>

      </ul>
    </nav>
  );
};

export default MenuNavegacion;