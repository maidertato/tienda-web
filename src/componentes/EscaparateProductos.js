import React, { useState } from 'react';
import DetallesProducto from './DetallesProducto';
import BuscadorProductos from './BuscadorProductos';
import Paginacion from './Paginacion';

const EscaparateProductos = ({ productos, onAnadirAlCarrito }) => {
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productosPerPage] = useState(6);

    const indexOfLastProduct = currentPage * productosPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productosPerPage;
    const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);
    
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="container-fluid">
            <div className="row g-4 p-3">
                {currentProducts.map((prod, i) => (
                    <div key={prod.id || i} className="col-md-4">
                        {/* Mantenemos la estructura de la card pero aplicamos clase de estilo personalizada */}
                        <div className="card h-100 shadow-sm border-0 card-producto-tienda">
                            <div className="position-relative">
                                <img 
                                    src={prod.imagen} 
                                    className="card-img-top p-3" 
                                    alt={prod.nombre}
                                    style={{ height: '220px', objectFit: 'contain', cursor: 'pointer' }}
                                    onClick={() => setProductoSeleccionado(prod)} 
                                />
                                {/* El botón ahora es circular y flotante sobre la imagen como en tu foto */}
                                <button 
                                    className="btn-carrito-circular"
                                    onClick={() => onAnadirAlCarrito(prod)}
                                >
                                    🛒
                                </button>
                            </div>

                            <div className="card-body d-flex flex-column text-start">
                                {/* Título y Precio con el nuevo estilo visual */}
                                <h4 className="card-title-escaparate">{prod.nombre}</h4>
                                <p className="card-precio-escaparate">{prod.precio}€</p>
                                
                                <div className="mt-2">
                                    {/* Nueva info: Tipo de producto */}
                                    <p className="mb-1 text-secondary" style={{ fontSize: '0.9rem' }}>
                                        <strong>Tipo:</strong> {prod.tipo || 'Accesorio'}
                                    </p>
                                    {/* Descripción con límite de líneas para que no se deforme la tarjeta */}
                                    <p className="description-text-card">
                                        {prod.descripcion}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Paginacion 
                totalProductos={productos.length}
                productosPorPagina={productosPerPage}
                paginaActual={currentPage}
                onCambiarPagina={paginate} 
            />

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