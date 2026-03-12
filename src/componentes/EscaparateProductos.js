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
    // Usamos useMemo para que el array de imágenes sea estable
    const imagenes = useMemo(() => {
        return prod.variantes && prod.variantes.length > 0
            ? prod.variantes
            : [{ nombre: '', imagen: prod.imagen }];
    }, [prod.variantes, prod.imagen]);

    // Índice para saber qué foto del carrusel estamos viendo
    const [idx, setIdx] = useState(0);

    // Sincronizar el nombre de la variante cada vez que se cambie de imagen
    useEffect(() => {
        if (onVarianteChange && imagenes[idx]) {
            onVarianteChange(imagenes[idx].nombre || "");
        }
    }, [idx, imagenes, onVarianteChange]);

    // Función para pasar fotos adelante o atrás
    const cambiarImagen = (e, direccion) => {
        e.stopPropagation();
        if (direccion === 'next') {
            setIdx((prev) => (prev + 1) % imagenes.length);
        } else {
            setIdx((prev) => (prev - 1 + imagenes.length) % imagenes.length);
        }
    };

    return (
        <div className="position-relative imagen-wrapper">
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
                style={{ height: '220px', objectFit: 'contain', cursor: 'pointer' }}
                onClick={() => setProductoSeleccionado(prod)}
            />
        </div>
    );
};

//////////////////////////////////////
// COMPONENTE PRINCIPAL: ESCAPARATE COMPLETO
//////////////////////////////////////
const EscaparateProductos = ({ productos, onAnadirAlCarrito, busqueda, setBusqueda, categoria, setCategoria, paginaActual, setPaginaActual, carrito = [] }) => {
    
    // ESTADOS
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [productosPerPage] = useState(6);
    const [idAnadido, setIdAnadido] = useState(null);
    const [variantesSeleccionadas, setVariantesSeleccionadas] = useState({});

    // 1. LÓGICA DE FILTRADO (Con limpieza de tildes para evitar fallos)
    const productosFiltrados = useMemo(() => {
    // Si no hay productos, devolvemos array vacío sin preguntar
    if (!productos) return [];

        return productos.filter(prod => {
            // SEGURIDAD: Si por error un producto no tiene nombre, usamos un texto vacío
            const nombreProd = (prod.nombre || "").toLowerCase();
            const busquedaNormal = (busqueda || "").toLowerCase();
            
            const coincideBusqueda = nombreProd.includes(busquedaNormal);
            
            // SEGURIDAD: Si categoria es "Todas" o no existe, mostramos todo lo que coincida con búsqueda
            if (!categoria || categoria === "Todas") {
                return coincideBusqueda;
            }

            // SEGURIDAD: Normalizamos ambos para comparar
            const tipoProducto = (prod.tipo || "").toLowerCase();
            const categoriaSeleccionada = categoria.toLowerCase();

            const coincideCategoria = tipoProducto === categoriaSeleccionada;

            return coincideCategoria && coincideBusqueda;
        });
    }, [productos, categoria, busqueda]);
    // 2. LÓGICA DE PAGINACIÓN
    const indexOfLastProduct = paginaActual * productosPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productosPerPage;
    const currentProducts = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);

    // Volver a página 1 si cambia la búsqueda o filtro
    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda, categoria, setPaginaActual]);

    // GESTIÓN DEL CARRITO (Límite 20 unidades)
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
            {/* Cabecera con Filtros y Buscador */}
            <div className="d-flex justify-content-between align-items-center px-3 mb-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h2 className="h4 text-secondary m-0">Todos los productos</h2>
                
                <div className='d-flex gap-2 align-items-center'>
                    <div style={{ width: '180px' }}>
                        <FiltroCategorias
                            categoriaActual={categoria}
                            onCambio={setCategoria}
                        />
                    </div>
                    <div style={{ width: '250px' }}>
                        <BuscadorProductos
                            titulo=""
                            terminoBusqueda={busqueda}
                            onCambio={setBusqueda}
                        />
                    </div>
                </div>
            </div>

            {/* Rejilla de Productos */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 p-3 justify-content-center" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {currentProducts.length > 0 ? (
                    currentProducts.map((prod) => {
                        const info = obtenerAtributoExtra(prod);
                        const nombreVariante = variantesSeleccionadas[prod.id] || "";

                        return (
                            <div key={prod.id} className="col d-flex justify-content-center">
                                <div className="card shadow-sm border-0 card-producto-tienda" style={{ width: '320px', minHeight: '480px' }}>
                                    
                                    {/* Imagen y Botón Carrito */}
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

                                    {/* Cuerpo de la Tarjeta */}
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

            {/* Paginación */}
            <Paginacion
                totalProductos={productosFiltrados.length}
                productosPorPagina={productosPerPage}
                paginaActual={paginaActual}
                onCambiarPagina={paginate}
            />

            {/* Modal de Detalles */}
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