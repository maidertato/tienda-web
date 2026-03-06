import React from 'react';

const DetallesProducto = ({ producto, alCerrar, alAnadirAlCarrito }) => {
  // Si no hay producto seleccionado, no renderizamos nada
  if (!producto) return null;

  return (
    /* Capa para ocultar la aplicación (Overlay) */
    <div className="modal-overlay" style={styles.overlay}>
      {/* Recuadro con todos los detalles */}
      <div className="modal-content-custom" style={styles.modal}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="m-0">{producto.nombre}</h2>
          <button className="btn-close" onClick={alCerrar}></button>
        </div>
        
        <div className="row">
          <div className="col-md-6 text-center">
            <img 
              src={producto.imagen} 
              alt={producto.nombre} 
              className="img-fluid rounded shadow-sm" 
              style={{ maxHeight: '300px', objectFit: 'contain' }}
            />
          </div>
          <div className="col-md-6">
            <h4 className="text-primary">{producto.precio}€</h4>
            <p className="badge bg-secondary text-capitalize">{producto.tipo}</p>
            <hr />
            <h5>Descripción</h5>
            <p className="text-muted">{producto.descripcion}</p>
            
            {/* Atributo extra dinámico según el tipo de producto */}
            {producto.extra && (
              <p className="mt-2"><strong>Dato específico:</strong> {producto.extra}</p>
            )}

            <button 
              className="btn btn-primary w-100 mt-3"
              style={{ backgroundColor: '#8e29b6', border: 'none' }}
              onClick={() => {
                alAnadirAlCarrito(producto);
                alCerrar();
              }}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3000 // Aseguramos que esté por encima de todo
  },
  modal: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '15px',
    maxWidth: '750px',
    width: '90%',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    position: 'relative'
  }
};

export default DetallesProducto;