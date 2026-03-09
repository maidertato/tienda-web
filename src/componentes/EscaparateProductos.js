import React, { useState } from 'react';
import DetallesProducto from './DetallesProducto';
import BuscadorProductos from './BuscadorProductos';
import Paginacion from './Paginacion';
import { obtenerAtributoExtra } from '../tienda/tienda.js';

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
                {currentProducts.map((prod, i) => {
                    const info = obtenerAtributoExtra(prod);

                    return (
                        <div key={prod.id || i} className="col-md-4">
                            <div className="card h-100 shadow-sm border-0 card-producto-tienda">
                                <div className="position-relative">
                                    <img
                                        src={prod.imagen}
                                        className="card-img-top p-3"
                                        alt={prod.nombre}
                                        style={{ height: '220px', objectFit: 'contain', cursor: 'pointer' }}
                                        onClick={() => setProductoSeleccionado(prod)}
                                    />
                                    <button
                                        className="btn-carrito-circular"
                                        onClick={() => onAnadirAlCarrito(prod)}
                                    >
                                        🛒
                                    </button>
                                </div>

                                <div className="card-body d-flex flex-column text-start">
                                    <h4 className="card-title-escaparate">{prod.nombre}</h4>
                                    <p className="card-precio-escaparate">{prod.precio}€</p>

                                    <div className="mt-2">
                                        <p className="mb-1 text-secondary" style={{ fontSize: '0.9rem' }}>
                                            <strong>{info.etiqueta}:</strong> {info.valor}
                                        </p>

                                        <p className="description-text-card">
                                            {prod.descripcion}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Paginacion
                totalProductos={productos.length}
                productosPorPagina={productosPerPage}
                paginaActual={currentPage}
                onCambiarPagina={paginate}
            />

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