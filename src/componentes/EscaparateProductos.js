import React, { useState } from 'react';

import BuscadorProductos from './BuscadorProductos';
import DetallesProducto from './DetallesProducto';

const EscaparateProductos = ({ productos, onAnadirAlCarrito }) => {
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    return (
        <div className="container-fluid">
            <div className="row g-4 p-3">
                {productos.map((prod, i) => (
                    <div key={prod.id || i} className="col-md-4">
                        <div className="card h-100 shadow-sm border-0">
                            <img 
                                src={prod.imagen} 
                                className="card-img-top p-3" 
                                alt={prod.nombre}
                                style={{ height: '180px', objectFit: 'contain', cursor: 'pointer' }}
                                onClick={() => setProductoSeleccionado(prod)} 
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-bold">{prod.nombre}</h5>
                                <p className="text-primary fs-5 fw-bold">{prod.precio}€</p>
                                
                                <button 
                                    className="btn btn-dark mt-auto w-100"
                                    onClick={() => onAnadirAlCarrito(prod)}
                                >
                                    🛒 Añadir al Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-4"></div>
            {productoSeleccionado && (
            <DetallesProducto
                producto={productoSeleccionado}
                onCerrar={() => setProductoSeleccionado(null)}
            />
            )}
        </div>
    );
};

export default EscaparateProductos;