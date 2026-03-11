import React from 'react';
import { DIVISA } from '../tienda/tienda';

const Carrito = ({ productosCarrito = [], alEliminar, alVaciar, show, alCerrar, onCambiarCantidad }) => {
  // Calculamos el total multiplicando precio por cantidad
  const total = productosCarrito.reduce((acc, prod) => acc + (prod.precio * (prod.cantidad || 1)), 0);

  return (
    <>
      {/* Fondo oscurecido con desenfoque suave */}
      {show && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={alCerrar}
          style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(106, 27, 154, 0.1)' }}
        ></div>
      )}

      <div
        className={`offcanvas offcanvas-start ${show ? 'show' : ''}`}
        tabIndex="-1"
        style={{
          visibility: show ? 'visible' : 'hidden',
          display: 'block',
          width: '400px',
          borderRight: 'none',
          backgroundColor: '#FDF8FF', // Fondo lila muy clarito
          boxShadow: '10px 0 30px rgba(0,0,0,0.1)',
          borderRadius: '0 20px 20px 0' // Bordes redondeados a la derecha
        }}
      >
        {/* Cabecera personalizada */}
        <div className="offcanvas-header" style={{ borderBottom: '1px solid #eee', padding: '20px' }}>
          <h5 className="offcanvas-title" style={{ fontWeight: '700', color: '#6A1B9A', fontSize: '1.5rem' }}>
            🛒 Mi Carrito
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={alCerrar}
            style={{ backgroundColor: '#E6D5F7', opacity: 1, borderRadius: '50%', padding: '10px' }}
          ></button>
        </div>

        <div className="offcanvas-body" style={{ padding: '20px' }}>
          {productosCarrito.length === 0 ? (
            <div className="text-center mt-5">
              <p style={{ color: '#999', fontSize: '1.1rem' }}>No hay productos aún... 🐾</p>
            </div>
          ) : (
            <div className="d-flex flex-column h-100">
              <div className="flex-grow-1">
                {productosCarrito.map((prod) => (
                  <div key={prod.id} className="d-flex justify-content-between align-items-center mb-3 p-3"
                    style={{ backgroundColor: 'white', borderRadius: '15px', border: '1px solid #f0f0f0' }}>
                    {/* FOTO DEL PRODUCTO */}
                    <img
                      src={prod.imagen}
                      alt={prod.nombre}
                      style = {{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        marginRight: '15px',
                        backgroundColor: '#f9f9f9'
                      }}/>
                    
                    <div style={{ flex: 1 }}>
                      <h6 className="m-0" style={{ fontWeight: '600' }}>{prod.nombre}</h6>
                      <span style={{ color: '#6A1B9A', fontWeight: '700' }}>
                        {(prod.precio * (prod.cantidad || 1)).toFixed(2)}{DIVISA}
                      </span>
                    </div>

                    {/* Selector de cantidad: Ajusta unidad a unidad */}
                    {/* Maximo 20 unidades */}
                    <input 
                      type="number"
                      value={prod.cantidad}
                      min="1"
                      max="20"
                      onChange={(e)=> {
                        const valor = parseInt(e.target.value);
                        if (isNaN(valor)) return; // Evita valores no numéricos
                        const cantidadActual = prod.cantidad;
                        const diferencia = valor - cantidadActual;
                        if (valor<=20 && valor >= 1) {
                          onCambiarCantidad(prod.id, diferencia);
                        } else if (valor > 20) {
                          alert('No puedes añadir más de 20 unidades de este producto.');
                        }
                      }}
                    />
                      

                    {/* Papelera: Elimina el producto por completo del carrito */}
                    <button
                      className="btn ms-2"
                      style={{ color: '#ff6b6b', fontSize: '1.2rem' }}
                      onClick={() => alEliminar(prod.id)} // Llama a la función que hace el filter
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
              {/* Sección de Total y Botones inferior */}
              <div className="mt-auto pt-4" style={{ borderTop: '2px dashed #E6D5F7' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span style={{ fontSize: '1.2rem', fontWeight: '600', color: '#666' }}>Total:</span>
                  <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#6A1B9A' }}>
                    {total.toFixed(2)}{DIVISA}
                  </span>
                </div>

                <button
                  className="btn w-100 mb-3"
                  style={{
                    backgroundColor: '#6A1B9A',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 15px rgba(106, 27, 154, 0.3)'
                  }}
                >
                  Confirmar Pedido
                </button>

                <button
                  className="btn btn-link w-100 text-muted"
                  style={{ textDecoration: 'none', fontSize: '0.9rem' }}
                  onClick={alVaciar}
                >
                  Vaciar todo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Carrito;

