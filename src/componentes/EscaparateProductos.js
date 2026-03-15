import React, { useState, useEffect, useMemo } from 'react';
import DetallesProducto from './DetallesProducto';
import BuscadorProductos from './BuscadorProductos';
import Paginacion from './Paginacion';
import { obtenerAtributoExtra } from '../tienda/tienda.js';
import FiltroCategorias from './FiltroCategorias';

//////////////////////////////////
// COMPONENTE PARA GESTIONAR LAS IMÁGENES Y VARIANTES
//////////////////////////////////
const CarruselImagen = ({ prod, setProductoSeleccionado, onVarianteChange }) => {
    const imagenes = useMemo(() => {
        return prod.variantes && prod.variantes.length > 0
            ? prod.variantes
            : [{ nombre: '', imagen: prod.imagen }];
    }, [prod.variantes, prod.imagen]);

    const [idx, setIdx] = useState(0);

    useEffect(() => {
        if (onVarianteChange && imagenes[idx]) {
            onVarianteChange(imagenes[idx].nombre || "");
        }
    }, [idx, imagenes, onVarianteChange]);

    const cambiarImagen = (e, direccion) => {
        e.stopPropagation();
        if (direccion === 'next') {
            setIdx((prev) => (prev + 1) % imagenes.length);
        } else {
            setIdx((prev) => (prev - 1 + imagenes.length) % imagenes.length);
        }
    };

    return (
        <div className="card-img-container position-relative imagen-wrapper">
            {imagenes.length > 1 && (
                <>
                    <div className="flecha flecha-izq" onClick={(e) => cambiarImagen(e, 'prev')}></div>
                    <div className="flecha flecha-der" onClick={(e) => cambiarImagen(e, 'next')}></div>
                </>
            )}

            <img
                src={imagenes[idx]?.imagen || prod.imagen}
                className="card-img-top p-3"
                alt={prod.nombre}
                style={{ height: '100%', width: '100%', objectFit: 'contain', cursor: 'pointer' }}
                onClick={() => setProductoSeleccionado({ producto: prod, variante: imagenes[idx] })}
            />
        </div>
    );
};

//////////////////////////////////////
// COMPONENTE PRINCIPAL: ESCAPARATE COMPLETO
//////////////////////////////////////
const EscaparateProductos = ({ productos, onAnadirAlCarrito, busqueda, setBusqueda, categoria, setCategoria, paginaActual, setPaginaActual, carrito = [] }) => {
    
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [productosPerPage] = useState(6);
    const [idAnadido, setIdAnadido] = useState(null);
    const [variantesSeleccionadas, setVariantesSeleccionadas] = useState({});

    // 1. LÓGICA DE FILTRADO
    const productosFiltrados = useMemo(() => {
            if (!productos) return [];

            return productos.filter(prod => {
                const nombreProd = (prod.nombre || "").toLowerCase();
                const busquedaNormal = (busqueda || "").toLowerCase();
                const coincideBusqueda = nombreProd.includes(busquedaNormal);
                
                if (!categoria || categoria === "Todas") {
                    return coincideBusqueda;
                }

                // Función para quitar tildes y poner en minúsculas
                const normalizar = (texto) => 
                    texto.toString()
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");

                const tipoProducto = normalizar(prod.tipo || "");
                const categoriaSeleccionada = normalizar(categoria);

                // Ahora comparamos "alimentacion" con "alimentacion"
                const coincideCategoria = tipoProducto === categoriaSeleccionada;
                // -------------------------------

                return coincideCategoria && coincideBusqueda;
            });
        }, [productos, categoria, busqueda]);




    // 2. LÓGICA DE PAGINACIÓN
    const indexOfLastProduct = paginaActual * productosPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productosPerPage;
    const currentProducts = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda, categoria, setPaginaActual]);

    const handleAnadirConTooltip = (prod) => {
        const itemEnCarrito = carrito.find(item => item.id === prod.id);
        const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;

        if (cantidadActual >= 20) {
            setIdAnadido(`${prod.id}-error`);
        } else {
            onAnadirAlCarrito(prod);
            setIdAnadido(`${prod.id}-exito`);
        }
        setTimeout(() => setIdAnadido(null), 2000);
    };

    const paginate = (pageNumber) => {
        setPaginaActual(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center px-3 mb-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h2 className="h4 text-secondary m-0">Todos los productos</h2>
                <div className='d-flex gap-2 align-items-center'>
                    <div style={{ width: '180px' }}>
                        <FiltroCategorias categoriaActual={categoria} onCambio={setCategoria} />
                    </div>
                    <div style={{ width: '250px' }}>
                        <BuscadorProductos titulo="" terminoBusqueda={busqueda} onCambio={setBusqueda} />
                    </div>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 p-3 justify-content-center" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {currentProducts.length > 0 ? (
                    currentProducts.map((prod) => {
                        const info = obtenerAtributoExtra(prod);
                        const nombreVariante = variantesSeleccionadas[prod.id] || "";

                        return (
                            <div key={prod.id} className="col d-flex justify-content-center">
                                <div className="card shadow-sm border-0 card-producto-tienda" style={{ width: '320px', minHeight: '480px' }}>
                                    <div className="position-relative">
                                        <CarruselImagen
                                            prod={prod}
                                            setProductoSeleccionado={setProductoSeleccionado}
                                            onVarianteChange={(nombre) => {
                                                setVariantesSeleccionadas(prev => ({ ...prev, [prod.id]: nombre }));
                                            }}
                                        />
                                        <div className="btn-carrito-container">
                                            {idAnadido === `${prod.id}-exito` && <div className="mensaje-exito-flotante">¡Añadido!</div>}
                                            {idAnadido === `${prod.id}-error` && <div className="mensaje-error-flotante" style={{ backgroundColor: '#d93025' }}>Máx. 20</div>}
                                            <button className="btn-carrito-circular" onClick={() => handleAnadirConTooltip(prod)}>🛒</button>
                                        </div>
                                    </div>

                                    <div className="card-body d-flex flex-column text-start">
                                        <h4 className="card-title-escaparate">
                                            {prod.nombre}{nombreVariante ? ` - ${nombreVariante}` : ""}
                                        </h4>
                                        <p className="card-precio-escaparate">{prod.precio}€</p>
                                        <div className="mt-2">
                                            <p className="mb-1 text-secondary" style={{ fontSize: '0.9rem' }}>
                                                <strong>{info.etiqueta}:</strong> {info.valor}
                                            </p>
                                            <p className="description-text-card">{prod.descripcion}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center w-100 py-5">
                        <p className="text-muted">No se encontraron productos.</p>
                    </div>
                )}
            </div>

            <Paginacion
                totalProductos={productosFiltrados.length}
                productosPorPagina={productosPerPage}
                paginaActual={paginaActual}
                onCambiarPagina={paginate}
            />

            {productoSeleccionado && (
                <DetallesProducto
                    producto={productoSeleccionado.producto}
                    variante={productoSeleccionado.variante}
                    onCerrar={() => setProductoSeleccionado(null)}
                />
            )}
        </div>
    );
};

export default EscaparateProductos;