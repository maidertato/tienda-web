import React from 'react';

const MenuNavegacion = ({ setSeccion, cantidadCarrito, cantidadDeseos=0, toggleCarrito, irAInicio, isOnline, rolUsuario, usuario }) => {
  return (
    // Contenedor principal de la barra de navegación
    <nav className="nav-expand d-flex align-items-center justify-content-center position-relative" style={{ minHeight: '80px' }}>
      {/* Lista horizontal de botones, centrada y con separación */}
      <ul className={`button-container d-flex list-unstyled justify-content-center m-0 p-2 gap-4 ${
    !usuario
      ? "guest"
      : rolUsuario === "admin"
      ? "admin"
      : "user"
  }`} style={{ width: 'max-content' }}>
        {/* BOTÓN DE INICIO */}
        <li>
          <button className="nav-btn" onClick={() => {
            irAInicio();
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
          <button className="nav-btn" type="button" onClick={toggleCarrito}>
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

        {/* BOTÓN DE LISTA DE DESEOS */}
        <li>
          <button className="nav-btn" type="button" onClick={() => setSeccion("deseos")} title="Lista de deseos">
            <div style={{ position: "relative", display: "inline-flex" }}>
              {/* SVG de Corazón */}
              <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {/* Globo con el numerito de deseos usando tu clase cart-badge para que sea idéntico */}
              {cantidadDeseos > 0 && (
                <span className="cart-badge badge rounded-pill" style={{ backgroundColor: '#9C66D4' }}>
                  {cantidadDeseos}
                </span>
              )}
            </div>
            <span className="nav-text">Favoritos</span>
          </button>
        </li>

        {/* BOTÓN DEL MI CUENTA */}
        {usuario && (
          <li>
            <button className="nav-btn" type="button" onClick={() => setSeccion("cuenta")}>
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="nav-text">Mi cuenta</span>
            </button>
          </li>
        )}

        {rolUsuario === 'admin' && (
          <>
            <li>
              <button className="nav-btn" type="button" onClick={() => setSeccion("add")}>
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                <span className="nav-text">Añadir</span>
              </button>
            </li>
            <li>
              <button className="nav-btn" type="button" onClick={() => setSeccion("editar/borrar")}>
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span className="nav-text">Edita/borra</span>
              </button>
            </li>
          </>
        )}
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
