import React from 'react';
import { DIVISA } from '../tienda/tienda';

const ListaDeseos = ({ listaDeseos, alEliminarDeseo, alAñadirAlCarrito }) => {
  return (
    <div className="container my-5 animate__animated animate__fadeIn">
      <h2 className="text-center mb-4" style={{ fontWeight: '700', color: '#6A1B9A' }}>
        Mi Lista de Deseos
      </h2>

      {listaDeseos.length === 0 ? (
        <div className="text-center p-5" style={{ backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 4px 15px rgba(106, 27, 154, 0.05)' }}>
          <span style={{ fontSize: '4rem' }}>💔</span>
          <h4 className="mt-3" style={{ fontWeight: '600', color: '#6A1B9A' }}>Tu lista está vacía</h4>
          <p className="text-muted">¡Explora la tienda y añade los productos que más te gusten!</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {listaDeseos.map((prod) => (
            <div className="col" key={prod._id}>
              <div className="card h-100 shadow-sm border-0 position-relative" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                
                <button 
                  className="btn position-absolute top-0 end-0 m-3"
                  onClick={() => alEliminarDeseo(prod._id)}
                  style={{ backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '50%', color: '#dc3545', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', zIndex: 2 }}
                  title="Eliminar de favoritos"
                >
                  ✕
                </button>

                {/* FOTO MAS TXIKITINA: Tu contenedor perfecto alineado */}
                <div className="d-flex justify-content-center align-items-center p-3" style={{ backgroundColor: '#f9f9f9', height: '180px' }}>
                  <img 
                    src={prod.imagen || 'imagenes/productos/default.png'} 
                    alt={prod.nombre} 
                    style={{ maxWidth: '140px', maxHeight: '140px', objectFit: 'contain' }}
                  />
                </div>
                
                <div className="card-body d-flex flex-column text-center">
                  {/* TÍTULO IGUAL QUE EL ESCAPARATE: Evita la etiqueta morada y controla que no se repita el nombre */}
                  <h5 className="card-title mb-3" style={{ fontWeight: '600', color: '#4A148C' }}>
                    {prod.nombre.includes('-') || !prod.varianteNombre || prod.varianteNombre === 'default'
                      ? prod.nombre
                      : `${prod.nombre} - ${prod.varianteNombre}`}
                  </h5>

                  <p className="text-muted flex-grow-1 mt-1" style={{ fontSize: '0.9rem' }}>
                    {prod.descripcion ? (prod.descripcion.substring(0, 60) + "...") : "Sin descripción disponible."}
                  </p>
                  
                  <span className="mb-3" style={{ fontSize: '1.25rem', fontWeight: '700', color: '#6A1B9A' }}>
                    {parseFloat(prod.precio).toFixed(2)}{DIVISA}
                  </span>

                  <button 
                    className="btn w-100 py-2"
                    onClick={() => {
                        // 1. Extraemos el ID limpio original de MongoDB
                        const idLimpio = prod._id.includes('_') ? prod._id.split('_')[0] : prod._id;
                        
                        // 2. Enviamos el formato exacto que espera tu App.js para procesar variantes
                        alAñadirAlCarrito({
                          ...prod,
                          _id: idLimpio,
                          // Le pasamos la variante de forma limpia para que App.js sepa gestionarla
                          varianteNombre: prod.varianteNombre !== "default" ? prod.varianteNombre : ""
                        });
                        
                        // 3. Lo quitamos de deseos
                        alEliminarDeseo(prod._id);
                    }}
                    style={{ backgroundColor: '#6A1B9A', color: 'white', fontWeight: '600', borderRadius: '12px', border: 'none' }}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaDeseos;