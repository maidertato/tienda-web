import React from 'react';
import BuscadorProductos from './BuscadorProductos';
import Paginacion from './Paginacion';

const EscaparateProductos = ({ 
  productos, 
  totalProductos, 
  paginaActual, 
  productosPorPagina, 
  onBuscar, 
  onCambiarPagina, 
  onAnadirCarrito 
}) => {
  return (
    <main className="col">
      {/* 5.1.3: Buscador */}
      <BuscadorProductos 
        tituloBuscador="Todos los productos" 
        onBuscar={onBuscar} 
      />
      
      <div className="row g-4 px-3">
        {/* Mapeamos los productos y dibujamos el HTML aquí mismo */}
        {productos.map((prod, index) => (
          <div className="col-md-4" key={prod.id || index}>
            <div className="card h-100 shadow-sm">
              <img 
                src={prod.imagen} 
                className="card-img-top p-2" 
                alt={prod.nombre} 
                style={{ height: '150px', objectFit: 'contain' }} 
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text text-muted small">{prod.descripcion}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="fw-bold">{prod.precio}€</span>
                  <button 
                    className="btn btn-primary btn-sm" 
                    onClick={() => onAnadirCarrito(prod)}
                  >
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5.1.4: Paginación */}
      <Paginacion 
        paginaActual={paginaActual}
        totalProductos={totalProductos}
        productosPorPagina={productosPorPagina}
        alCambiarPagina={onCambiarPagina}
      />
    </main>
  );
};

export default EscaparateProductos;