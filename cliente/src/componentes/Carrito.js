import React, { useState } from 'react';
import { DIVISA } from '../tienda/tienda';

// CARRITO --> Panel lateral que muestra los productos elegidos
const Carrito = ({ productosCarrito = [], alEliminar, alVaciar, show, alCerrar, onCambiarCantidad, onAbrirCupones, descuentoGlobal = 0 }) => {
  
  // Función de ayuda para sacar los datos aunque sean privados
  const obtenerDatos = (p) => ({
    id: p.id,
    nombre: p.nombre || "Producto",
    precio: parseFloat(p.precio) || 0,
    imagen: p.imagen || 'imagenes/productos/default.png',
    cantidad: p.cantidad || 1,
    varianteNombre: p.varianteNombre || (p.variante ? p.variante.nombre : "")
  });

  const total = productosCarrito.reduce((acc, p) => {
    const datos = obtenerDatos(p);
    return acc + (datos.precio * datos.cantidad);
  }, 0);

  const [errorMaxId, setErrorMaxId] = useState(null);

  return (
    <>
      {show && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={alCerrar}
          style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(106, 27, 154, 0.1)' }}
        ></div>
      )}

      {/* Contenedor principal del carrito lateral */}
      <div
        className={`offcanvas offcanvas-start carrito-panel ${show ? 'show' : ''}`}
        tabIndex="-1"
        style={{
          visibility: show ? 'visible' : 'hidden',
          transform: show ? 'translateX(0)' : 'translateX(-100%)'
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
            <div className="carrito-vacio-vista animate_animated animate_fadeIn">
              <svg className="vacio-icono-cart" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor"
                  d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
              </svg>
              <h4>No hay productos en tu carrito</h4>
              <p>¡Vuelve al inicio y empieza a comprar!</p>
              
              <button className="btn-inicio" onClick={alCerrar}>
                  <svg className="vacio-icono-home" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
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
                {productosCarrito.map((prod) => {
                  const datos = obtenerDatos(prod);
                  return (  
                    <div key={datos.id}  
                      className="d-flex justify-content-between align-items-center mb-3 p-3"
                      style={{ backgroundColor: 'white', borderRadius: '15px', border: '1px solid #f0f0f0' }}>
                      
                      {/* FOTO DEL PRODUCTO */}
                      <img
                        src={datos.imagen}
                        alt={datos.nombre}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                          marginRight: '15px',
                          backgroundColor: '#f9f9f9'
                        }} />

                      {/* Información del producto (nombre y subtotal) */}
                      <div style={{ flex: 1}}>
                        <h6 className="m-0" style={{ fontWeight: '600' }}>{datos.nombre}</h6>
                        {/* Contenedor de precio, input y resultado*/}
                        <div className='d-flex flex-column'>
                          <div className="d-flex align-items-center gap-2">
                            <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                              {datos.precio.toFixed(2)}{DIVISA} x
                            </span>

                            <input
                              type="number"
                              key={`input-${datos.id}-${datos.cantidad}`}
                              defaultValue={datos.cantidad}
                              min="0"
                              max="20"
                              className="form-control form-control-sm px-1"
                              style={{ 
                                width: '60px', 
                                textAlign: 'center' }}
                              onClick={()=> {
                                if (datos.cantidad >= 20) {
                                  setErrorMaxId(datos.id);
                                  setTimeout(() => setErrorMaxId(null), 2000);
                                }
                              }}
                              onChange={(e) => {
                                const valorS = e.target.value;

                                if (valorS === "") return;

                                const valorN = parseInt(valorS);

                                if (valorN === 0) {
                                  alEliminar(datos.id);
                                  return;
                                }

                                if (valorN > 0 && valorN <= 20) {
                                  setErrorMaxId(null); // Quitamos error si es válido
                                  const diferencia = valorN - datos.cantidad;
                                  onCambiarCantidad(datos.id, diferencia);
                                } else if (valorN > 20) {
                                  // Si intenta pasarse de 20
                                  setErrorMaxId(datos.id);
                                  e.target.value = 20;
                                  setTimeout(() => setErrorMaxId(null), 2000);
                                }
                              }}
                              onBlur={(e) => {
                                if (e.target.value === "" || e.target.value === "0") {
                                  alEliminar(datos.id);
                                }
                              }}
                            />
                            <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#6A1B9A', margin: 0.5 }}>
                              = {(datos.precio * datos.cantidad).toFixed(2)}{DIVISA}
                            </span>
                          </div>
                          {/* Mensaje de error si se supera el máximo permitido */}
                          {/* Lo colocamos debajo del producto y su cantidad*/}
                          {errorMaxId === datos.id && (
                            <div className="animate__animated animate__fadeIn mensaje-error-carrito" >
                              No se permiten más de 20 copias.
                            </div>
                          )}  
                        </div>
                      </div>
                      
                      {/* Papelera: Elimina el producto por completo del carrito */}
                      <button  
                        className="btn-eliminar-coquette"  
                        onClick={() => alEliminar(datos.id)}
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
                  );
                })}
              </div>
              
              {/* Sección de Total y Botones inferior */}
              <div className="mt-auto pt-4" style={{ borderTop: '2px dashed #E6D5F7' }}>
                <div className="d-flex flex-column gap-1 mb-4">
                  {descuentoGlobal > 0 ? (
                    <>
                      {/* Total original tachado */}
                      <div className="d-flex justify-content-between align-items-center" style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.1rem' }}>
                        <span style={{ fontWeight: '500' }}>Total:</span>
                        <span style={{ textDecoration: 'line-through', fontWeight: '600' }}>
                          {total.toFixed(2)}{DIVISA}
                        </span>
                      </div>
                      {/* Total final con el cupón aplicado */}
                      <div className="d-flex justify-content-between align-items-center">
                        <span style={{ fontSize: '1.2rem', fontWeight: '600', color: 'white' }}>Total con descuento:</span>
                        <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'white' }}>
                          {(total * (1 - descuentoGlobal)).toFixed(2)}{DIVISA}
                        </span>
                      </div>
                    </>
                  ) : (
                    /* Diseño normal si no hay ningún descuento */
                    <div className="d-flex justify-content-between align-items-center">
                      <span style={{ fontSize: '1.2rem', fontWeight: '600', color: 'white' }}>Total:</span>
                      <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'white' }}>
                        {total.toFixed(2)}{DIVISA}
                      </span>
                    </div>
                  )}
                </div>

                {/* Botón de vaciar todo */}
                <button className="btn w-100 mb-3 btn-vaciar-carrito" onClick={alVaciar} >
                  Vaciar todo
                </button>

                {/* Botón para aplicar cupones */}
                <button 
                  type="button" 
                  className="btn btn-sm w-100 py-1" 
                  onClick={onAbrirCupones}
                  style={{ 
                    backgroundColor: 'rgba(230, 213, 247, 0.2)', 
                    color: '#E6D5F7', 
                    border: '1px dashed #E6D5F7',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}
                >
                  🏷️ ¿Tienes un código de descuento?
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