import React, { useState, useEffect } from 'react';
import DetallesProducto from './DetallesProducto';
import BuscadorProductos from './BuscadorProductos';
import Paginacion from './Paginacion';
import { obtenerAtributoExtra } from '../tienda/tienda.js';

const EscaparateProductos = ({ productos, onAnadirAlCarrito, busqueda, setBusqueda }) => {
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productosPerPage] = useState(6);

    const [idAnadido, setIdAnadido] = useState(null);
    useEffect(() => {
        setCurrentPage(1);
    }, [busqueda]);

    const handleAnadirConTooltip = (prod) => {
        onAnadirAlCarrito(prod);
        setIdAnadido(prod.id);
        setTimeout(() => {
            setIdAnadido(null);
        }, 2000);
    };

    const indexOfLastProduct = currentPage * productosPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productosPerPage;
    const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="container-fluid">
            {/* Buscador integrado en la parte superior del escaparate */}
            <div className="d-flex justify-content-between align-items-center px-3 mb-2" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h2 className="h4 text-secondary m-0">Todos los productos</h2>
                <div style={{ width: '300px' }}>
                    <BuscadorProductos
                        titulo=""
                        terminoBusqueda={busqueda}
                        onCambio={setBusqueda}
                    />
                </div>
            </div>

            <div className="row row-cols-1 row-cols-xl-2 row-cols-xxl-3 g-4 p-3 justify-content-center" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {currentProducts.map((prod) => {
                    const info = obtenerAtributoExtra(prod);

                    return (
                        <div key={prod.id} className="col d-flex justify-content-center">
                            <div className="card shadow-sm border-0 card-producto-tienda" style={{ width: '320px', minHeight: '480px' }}>
                                <div className="position-relative">
                                    <img
                                        src={prod.imagen}
                                        className="card-img-top p-3"
                                        alt={prod.nombre}
                                        style={{ height: '220px', objectFit: 'contain', cursor: 'pointer' }}
                                        onClick={() => setProductoSeleccionado(prod)}
                                    />
                                    <div className="btn-carrito-container">
                                        {idAnadido === prod.id && (
                                            <div className="mensaje-exito-flotante">
                                                ¡Añadido con éxito!
                                            </div>
                                        )}
                                        <button
                                            className="btn-carrito-circular"
                                            onClick={() => handleAnadirConTooltip(prod)}
                                        >
                                            🛒
                                        </button>
                                    </div>
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