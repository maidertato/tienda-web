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
    }, [idx, imagenes]);

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
const EscaparateProductos = ({ productos, onAnadirAlCarrito, busqueda, setBusqueda, categoria, setCategoria, precioMax, setPrecioMax, paginaActual, setPaginaActual, carrito = [] }) => {
    
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [productosPerPage] = useState(6);
    const [idAnadido, setIdAnadido] = useState(null);
    const [variantesSeleccionadas, setVariantesSeleccionadas] = useState({});
    
    // Estado para controlar la visibilidad del botón de filtros
    const [showFiltros, setShowFiltros] = useState(false);

    // 1. LÓGICA DE FILTRADO
    const productosFiltrados = useMemo(() => {
            if (!productos) return [];

            return productos.filter(prod => {
                const nombreProd = (prod.nombre || "").toLowerCase();
                const busquedaNormal = (busqueda || "").toLowerCase();
                const coincideBusqueda = nombreProd.includes(busquedaNormal);
                const coincidePrecio = prod.precio <= precioMax;

                if (!categoria || categoria === "Todas") {
                    return coincideBusqueda && coincidePrecio;
                }

                const normalizar = (texto) => 
                    texto.toString()
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");

                const tipoProducto = normalizar(prod.tipo || "");
                const categoriaSeleccionada = normalizar(categoria);

                const coincideCategoria = tipoProducto === categoriaSeleccionada;

                return coincideCategoria && coincideBusqueda && coincidePrecio;
            });
        }, [productos, categoria, busqueda, precioMax]);

    // 2. LÓGICA DE PAGINACIÓN
    const indexOfLastProduct = paginaActual * productosPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productosPerPage;
    const currentProducts = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda, categoria, precioMax, setPaginaActual]);

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
                <div className='d-flex gap-2 align-items-center position-relative'>
                    
                    <div style={{ width: '250px' }}>
                        <BuscadorProductos titulo="" terminoBusqueda={busqueda} onCambio={setBusqueda} />
                    </div>

                    {/* Botón Morado con icono de niveles (Sliders) */}
                    <button 
                        onClick={() => setShowFiltros(!showFiltros)}
                        style={{ 
                            backgroundColor: '#8e24aa', 
                            border: 'none',
                            borderRadius: '12px',
                            width: '45px',
                            height: '45px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white'
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
                        </svg>
                    </button>

                    {/* Popover que contiene TODO el menú de FiltroCategorias */}
                    {showFiltros && (
                        <div className="shadow" style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            zIndex: 1050,
                            backgroundColor: 'white',
                            borderRadius: '15px',
                            marginTop: '10px',
                            border: '1px solid #eee',
                            minWidth: '220px'
                        }}>
                            <FiltroCategorias 
                                categoriaActual={categoria} 
                                onCambio={(cat) => { setCategoria(cat); setShowFiltros(false); }} 
                                precioMax={precioMax} 
                                onCambioPrecio={setPrecioMax}
                                alLimpiar={() => {
                                    setCategoria("Todas");
                                    setPrecioMax(100);
                                    setBusqueda("");
                                    setShowFiltros(false);
                                }}
                            />
                        </div>
                    )}
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