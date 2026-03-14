import React from 'react';
import { DIVISA } from '../tienda/tienda';

// cARRITO --> Panel lateral que muestra los productos elegidos
const Carrito = ({ productosCarrito = [], alEliminar, alVaciar, show, alCerrar, onCambiarCantidad }) => {
  
  // Función de ayuda para sacar los datos aunque sean privados
  const obtenerDatos = (p) => ({
    id: p.id || p.id,
    nombre: p.nombre || "Producto",
    precio: parseFloat(p.precio) || 0,
    imagen: p.imagen || 'imagenes/productos/default.png',
    cantidad: p.cantidad || 1
  });
  const total = productosCarrito.reduce((acc, p) => {
    const datos = obtenerDatos(p);
    return acc + (datos.precio * datos.cantidad);
  }, 0);

  return (
    <>
      {/* Fondo oscurecido con desenfoque suave, solo se muestra cuando el estado 'show' es verdadero */}
      {show && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={alCerrar}
          style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(106, 27, 154, 0.1)' }}
        ></div>
      )}

      {/* Contenedor principal del carrito lateral */}
      <div
        className={`offcanvas offcanvas-start ${show ? 'show' : ''}`}
        tabIndex="-1"
        style={{
          visibility: show ? 'visible' : 'hidden',
          display: 'block',
          width: '400px',
          borderRight: 'none',
          backgroundColor: '#9c61d6', 
          boxShadow: '10px 0 30px rgba(0,0,0,0.1)',
          borderRadius: '0 20px 20px 0' // Bordes redondeados a la derecha
        }}
      >
        {/* Cabecera personalizada */}
        <div className="offcanvas-header" style={{ borderBottom: '1px solid #d1a7eb', padding: '20px' }}>
          <h5 className="offcanvas-title" style={{ fontWeight: '700', color: '#6A1B9A', fontSize: '1.5rem' }}>
            Carrito de la compra
          </h5>
          {/* Botón para cerrar el panel lateral */}
          <button
            type="button"
            className="btn-close"
            onClick={alCerrar}
            style={{ backgroundColor: '#E6D5F7', opacity: 1, borderRadius: '50%', padding: '10px' }}
          ></button>
        </div>

        {/* Cuerpo del carrito donde se listan los productos */}
        <div className="offcanvas-body" style={{ padding: '20px' }}>
          {/* Si el carrito está vacío, mostramos un mensaje */}
          {productosCarrito.length === 0 ? (
            <div class="carrito-vacio-vista animate__animated animate__fadeIn">
              <svg class="vacio-icono-cart" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor"
                  d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
              </svg>
              <h4>No hay productos en tu carrito</h4>
              <p>¡Vuelve al inicio y empieza a comprar!</p>
              
              <button class="btn-inicio" onClick={alCerrar}>
                  <svg class="vacio-icono-home" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor"
                      d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2z"/>
                  </svg>
                  Inicio
              </button>

            </div>
          ) : (
            <div className="d-flex flex-column h-100">
              <div className="flex-grow-1">
                {/* Mapeamos el array de productos para crear una fila por cada uno */}
                {productosCarrito.map((prod) => (
                  <div key={prod.id} className="d-flex justify-content-between align-items-center mb-3 p-3"
                    style={{ backgroundColor: 'white', borderRadius: '15px', border: '1px solid #f0f0f0' }}>
                    
                    {/* FOTO DEL PRODUCTO */}
                    <img
                      src={prod.imagen}
                      alt={prod.nombre}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        marginRight: '15px',
                        backgroundColor: '#f9f9f9'
                      }} />

                    {/* Información del producto (nombre y subtotal) */}
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
                      onChange={(e) => {
                        const valor = parseInt(e.target.value);
                        if (isNaN(valor)) return; // Evita valores no numéricos
                        const cantidadActual = prod.cantidad;
                        const diferencia = valor - cantidadActual;
                        if (valor <= 20 && valor >= 1) {
                          onCambiarCantidad(prod.id, diferencia);
                        } else if (valor > 20) {
                          alert('No puedes añadir más de 20 unidades de este producto.');
                        }
                      }}
                    />


                    {/* Papelera: Elimina el producto por completo del carrito */}
                    <button 
                      className="btn-eliminar-coquette" 
                      onClick={() => alEliminar(prod.id)}
                      title="Eliminar con amor"
                    >
                      <svg 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              {/* Sección de Total y Botones inferior */}
              <div className="mt-auto pt-4" style={{ borderTop: '2px dashed #E6D5F7' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span style={{ fontSize: '1.2rem', fontWeight: '600', color: 'white' }}>Total:</span>
                  <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'white' }}>
                    {total.toFixed(2)}{DIVISA}
                  </span>
                </div>

                {/* Botón para borrar todos los elementos del carrito de golpe */}
                <button
                  className="btn w-100 mb-3"
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '12px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 15px rgba(106, 27, 154, 0.3)'
                  }}
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

