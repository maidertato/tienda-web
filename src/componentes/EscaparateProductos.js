import React, { useState, useEffect, useMemo } from 'react';
import DetallesProducto from './DetallesProducto';
import BuscadorProductos from './BuscadorProductos';
import Paginacion from './Paginacion';
import Carrito from './Carrito';
import { obtenerAtributoExtra } from '../tienda/tienda.js';

//////////////////////////////////
// COMPONENTE PARA GESTIONAR LAS IMÁGENES Y VARIANTES
//////////////////////////////////
const CarruselImagen = ({ prod, setProductoSeleccionado, onVarianteChange }) => {
    // Usamos useMemo para que el array de imágenes sea estable y no cambie en cada render
    const imagenes = useMemo(() => {
        return prod.variantes && prod.variantes.length > 0 
            ? prod.variantes 
            : [{ nombre: '', imagen: prod.imagen }];
    }, [prod.variantes, prod.imagen]);
     
    const [idx, setIdx] = useState(0);

    // Sincronizar el nombre de la variante
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

//////////////////////////////////
// COMPONENTE HIJO: TARJETA INDIVIDUAL
//////////////////////////////////
const TarjetaProducto = ({ prod, setProductoSeleccionado, idAnadido, handleAnadirConTooltip }) => {
    const info = obtenerAtributoExtra(prod);
    const [nombreVariante, setNombreVariante] = useState("");

    return (
        <div className="col d-flex justify-content-center">
            <div className="card shadow-sm border-0 card-producto-tienda" style={{ width: '320px', minHeight: '480px' }}>
                <div className="position-relative">
                    <CarruselImagen 
                        prod={prod} 
                        setProductoSeleccionado={setProductoSeleccionado}
                        onVarianteChange={setNombreVariante}
                    />
                    
                    <div className="btn-carrito-container">
                        {idAnadido === prod.id && (
                            <div className="mensaje-exito-flotante">¡Añadido!</div>
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
                    <h4 className="card-title-escaparate">
                        {prod.nombre} {nombreVariante ? `- ${nombreVariante}` : ""}
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
};

//////////////////////////////////////
// COMPONENTE PRINCIPAL
//////////////////////////////////////
const EscaparateProductos = ({ productos, onAnadirAlCarrito, busqueda, setBusqueda, paginaActual, setPaginaActual,carrito }) => {
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [productosPerPage] = useState(6);
    const [idAnadido, setIdAnadido] = useState(null);

    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda, setPaginaActual]);

    const handleAnadirConTooltip = (prod) => {
        const itemEnCarrito =carrito.find(item => item.id === prod.id);
        const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;

        // Comprobamos el límite de 20 unidades
        if (cantidadActual >= 20) {
            setIdAnadido(`${prod.id}-error`);
        } else {
            onAnadirAlCarrito(prod);
            setIdAnadido(`${prod.id}-exito`);
        }

        // Limpiamos el mensaje después de 2 segundos
        setTimeout(() => setIdAnadido(null), 2000);
    };

    const indexOfLastProduct = paginaActual * productosPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productosPerPage;
    const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => {
        setPaginaActual(pageNumber);
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
                                        {/*Mensaje de exito*/ }
                                        {idAnadido === `${prod.id}-exito` && (
                                            <div className="mensaje-exito-flotante">
                                                ¡Añadido!
                                            </div>
                                        )}
                                        {/*Mensaje de error*/ }
                                        {idAnadido === `${prod.id}-error` && (
                                            <div className="mensaje-error-flotante" style={{ backgroundColor: '#d93025' }}>
                                                Máx. 20 unidades
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
                paginaActual={paginaActual}
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
