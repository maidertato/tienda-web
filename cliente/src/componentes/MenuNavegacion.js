import React from 'react';

const MenuNavegacion = ({ setSeccion, cantidadCarrito, toggleCarrito, irAInicio, isOnline }) => {
  return (
    // Contenedor principal de la barra de navegación
    <nav className="nav-expand d-flex align-items-center justify-content-center position-relative" style={{ minHeight: '60px' }}>
      {/* Lista horizontal de botones, centrada y con separación */}
      <ul className="button-container d-flex list-unstyled justify-content-center m-0 p-2 gap-4">
        {/* BOTÓN DE INICIO */}
        <li>
          <button className="nav-btn" onClick={() => {irAInicio();
                                                      setSeccion("inicio");
                                                    }}>
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
          <button className="nav-btn" type="button"onClick={toggleCarrito}>
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

        {/* BOTÓN DEL MI CUENTA */}
        <li>
          <button className="nav-btn" type="button"onClick={() => setSeccion("cuenta")}>
            <div style={{ position: "relative", display: "inline-flex" }}>
              <svg className="icon" width="24"height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2"/>
                <path d="M6 18.5C7.5 15.5 10 14 12 14C14 14 16.5 15.5 18 18.5" stroke="white" strokeWidth="2" strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="nav-text">Mi cuenta</span>
          </button>
        </li>

        {/* BOTÓN DE AÑADIR UN PRODUCTO */}
        <li>
          <button className="nav-btn" type="button"onClick={() => setSeccion("add")}>
            <div style={{ position: "relative", display: "inline-flex" }}>
              <svg className="icon" width="26" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
              </svg>
            </div>
            <span className="nav-text">Add producto</span>
          </button>
        </li>
        {/* BOTÓN DE EDITAR/BORRAR PRODUCTO */}
        <li>
          <button className="nav-btn" type="button"onClick={() => setSeccion("editar")}>
            <div style={{ position: "relative", display: "inline-flex" }}>
              <svg className="icon" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
              </svg>
            </div>
            <span className="nav-text">Editar/Borrar producto</span>
          </button>
        </li>



      </ul>
      {isOnline && (
        <div className="badge-offline position-absolute end-0 me-3">
          Estás offline
        </div>
      )}
    </nav>
  );
};

export default MenuNavegacion;