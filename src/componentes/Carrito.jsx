import React from 'react';

const Carrito = ({ productosCarrito, alEliminar, alVaciar, total }) => {
  return (
    /* 5.1.9: Contenedor del carrito (Offcanvas) */
    <div className="offcanvas offcanvas-start" tabIndex="-1" id="carrito">
      <div className="offcanvas-header custom-header">
        <div className="carrito-header-custom">
           <h5 className="offcanvas-title">Carrito de la compra 🛒</h5>
        </div>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>
      
      <div className="offcanvas-body" id="carrito-body">
        {productosCarrito.length === 0 ? (
          <div className="carrito-vacio-vista text-center">
            <p>¡El carrito está triste y vacío!</p>
          </div>
        ) : (
          /* Renderizado dinámico sin usar el DOM directo */
          productosCarrito.map((item, idx) => (
            <div key={idx} className="carrito-item d-flex align-items-center mb-3 p-2 border-bottom">
              <img 
                src={item.imagen} 
                alt={item.nombre} 
                style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                className="rounded"
              />
              <div className="ms-3 flex-grow-1">
                <h6 className="mb-0">{item.nombre}</h6>
                <small className="text-muted">{item.precio}€</small>
              </div>
              <button 
                className="btn btn-sm btn-outline-danger" 
                onClick={() => alEliminar(item.id)}
                title="Eliminar producto"
              >
                🗑️
              </button>
            </div>
          ))
        )}

        {/* Resumen del total y botón de vaciado */}
        {productosCarrito.length > 0 && (
          <div className="mt-4 border-top pt-3">
            <div className="d-flex justify-content-between fw-bold mb-3">
              <span>Total:</span>
              <span>{total}€</span>
            </div>
            <button 
              className="btn btn-danger w-100" 
              onClick={alVaciar}
            >
              Vaciar Carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;