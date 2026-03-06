import React, { useState } from 'react';
import BuscadorProductos from './BuscadorProductos';
import Paginacion from './Paginacion';
import DetallesProducto from './DetallesProducto';

const EscaparateProductos = ({ productos, onAnadirAlCarrito }) => {
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const productosFiltrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );

    const porPagina = 6; 
    const totalPaginas = Math.ceil(productosFiltrados.length / porPagina);
    const productosPagina = productosFiltrados.slice(
        (paginaActual - 1) * porPagina, 
        paginaActual * porPagina
    );
    return (
        <div className="container-fluid">
            <BuscadorProductos
                titulo="Buscar Productos"
                terminoBusqueda={terminoBusqueda}
                onCambio={valor => { setTerminoBusqueda(valor); setPaginaActual(1); }}
            />
            <div className="row g-4 p-3">
                {productosPagina.map((prod, i) => (
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
            <div className="d-flex justify-content-center mt-4">
                <Paginacion
                    paginaActual={paginaActual}
                    totalPaginas={totalPaginas}
                    onAnterior={() => setPaginaActual(Math.max(1, paginaActual - 1))}
                    onSiguiente={() => setPaginaActual(Math.min(totalPaginas, paginaActual + 1))}
                />
            </div>
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