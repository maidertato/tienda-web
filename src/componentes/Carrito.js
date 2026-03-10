import React from 'react';
import { DIVISA } from '../tienda/tienda';

// Fíjate en los parámetros de la función: hemos añadido 'show' y 'alCerrar'
const Carrito = ({ productosCarrito = [], alEliminar, alVaciar, show, alCerrar }) => {

  const total = productosCarrito.reduce((acc, prod) => acc + prod.precio, 0);

  return (
    <>
      {/* 1. Fondo oscurecido (backdrop) que aparece solo si show es true */}
      {show && <div className="offcanvas-backdrop fade show" onClick={alCerrar}></div>}
      
      {/* 2. El contenedor del carrito */}
      <div
        className={`offcanvas offcanvas-start ${show ? 'show' : ''}`} 
        tabIndex="-1"
        style={{ 
          visibility: show ? 'visible' : 'hidden',
          display: 'block' // Forzamos bloque para que la clase 'show' de Bootstrap funcione
        }}
        id="carrito"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">🛒 Carrito</h5>
          <button
            type="button"
            className="btn-close"
            onClick={alCerrar} // Usamos la prop alCerrar
          ></button>
        </div>

        <div className="offcanvas-body">
          {productosCarrito.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <>
              {productosCarrito.map(prod => (
                <div key={prod.id} className="d-flex justify-content-between mb-2">
                  <span>{prod.nombre}</span>
                  <span>{prod.precio}{DIVISA}</span>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => alEliminar(prod.id)}
                  >
                    🗑
                  </button>
                </div>
              ))}
              <hr />
              <p><strong>Total:</strong> {total.toFixed(2)}{DIVISA}</p>
              <button
                className="btn btn-warning w-100"
                onClick={alVaciar}
              >
                Vaciar Carrito
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Carrito;

