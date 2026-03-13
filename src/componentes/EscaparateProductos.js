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

    // Índice para saber qué foto del carrusel estamos viendo
    const [idx, setIdx] = useState(0);

    // Sincronizar el nombre de la variante cada vez que se cambie de imagen
    useEffect(() => {
        if (onVarianteChange && imagenes[idx]) {
            onVarianteChange(imagenes[idx].nombre || "");
        }
    }, [idx, imagenes]);

    // Función para pasar fotos adelante o atrás sin que se cierren los detalles
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
            {/* Solo mostramos flechas si hay más de una imagen disponible */}
            {imagenes.length > 1 && (
                <>
                    <div className="flecha flecha-izq" onClick={(e) => cambiarImagen(e, 'prev')}></div>
                    <div className="flecha flecha-der" onClick={(e) => cambiarImagen(e, 'next')}></div>
                </>
            )}

            {/* Imagen principal: Si haces clic en ella, se abre el modal de detalles */}
            <img
                src={imagenes[idx]?.imagen || prod.imagen}
                className="card-img-top p-3"
                alt={prod.nombre}
                style={{ height: '100%', width: '100%', objectFit: 'contain', cursor: 'pointer' }}
                onClick={() => setProductoSeleccionado(prod)}
            />
        </div>
    );
};

//////////////////////////////////
// COMPONENTE HIJO: TARJETA INDIVIDUAL
//////////////////////////////////
const TarjetaProducto = ({ prod, setProductoSeleccionado, idAnadido, handleAnadirConTooltip }) => {
    // Obtenemos la etiqueta personalizada (Material, Estilo...) según la clase del producto
    const info = obtenerAtributoExtra(prod);
    const [nombreVariante, setNombreVariante] = useState("");

    return (
        <div className="col d-flex justify-content-center">
            <div className="card shadow-sm border-0 card-producto-tienda">
                <div className="card-img-container">
                    {/* El carrusel de fotos dentro de la tarjeta */}
                    <CarruselImagen
                        prod={prod}
                        setProductoSeleccionado={setProductoSeleccionado}
                        onVarianteChange={setNombreVariante}
                    />

                    {/* Contenedor flotante para el botón de compra y mensajes de aviso */}
                    <div className="btn-carrito-container">

                        {/* Burbuja verde si se añade correctamente */}
                        {idAnadido === `${prod.id}-exito` && (
                            <div className="mensaje-exito-flotante">¡Añadido!</div>
                        )}

                        {/* Burbuja roja si intentas meter más de 20 unidades */}
                        {idAnadido === `${prod.id}-error` && (
                            <div className="mensaje-error-flotante" style={{ backgroundColor: '#d93025' }}>
                                Máx. 20 unidades
                            </div>
                        )}

                        {/* El botón circular del carrito */}
                        <button
                            className="btn-carrito-circular"
                            onClick={() => handleAnadirConTooltip(prod)}
                        >
                            🛒
                        </button>
                    </div>
                </div>

                {/* Información de la tarjeta */}
                <div className="card-body d-flex flex-column text-start">
                    <h4 className="card-title-escaparate" >
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
// COMPONENTE PRINCIPAL: ESCAPARATE COMPLETO
//////////////////////////////////////
const EscaparateProductos = ({ productos, onAnadirAlCarrito, busqueda, setBusqueda, paginaActual, setPaginaActual, carrito = [] }) => {
    // Estado para saber qué producto mostrar en la caja de detalles
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    // 6 productos para que sean filas de 3
    const [productosPerPage] = useState(6);
    // Estado para controlar qué burbuja de mensaje (exito/error) se muestra
    const [idAnadido, setIdAnadido] = useState(null);
    // Guardamos qué variante está seleccionada en cada producto para el título
    const [variantesSeleccionadas, setVariantesSeleccionadas] = useState({});

    // Si el usuario busca algo, volvemos automáticamente a la página 1
    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda]);

    // Gestiona el clic en el carrito y controla el límite de 20 unidades
    const handleAnadirConTooltip = (prod) => {
        const itemEnCarrito = carrito.find(item => item.id === prod.id);
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

    // Lógica de paginación: calculamos qué trozo del array de productos mostrar
    const indexOfLastProduct = paginaActual * productosPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productosPerPage;
    const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);

    // Cambia de página y sube el scroll arriba del todo
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

            <div id="lista-productos" className="row row-cols-1 row-cols-md-3 g-4 px-3" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {currentProducts.map((prod) => {
                    const info = obtenerAtributoExtra(prod);
                    const nombreVariante = variantesSeleccionadas[prod.id] || "";

                    return (
                        <div key={prod.id} className="col d-flex justify-content-center">
                            <div className="card-producto-tienda w-100 h-100 shadow-sm border-0">
                                <div className="position-relative">
                                    <CarruselImagen
                                        prod={prod}
                                        setProductoSeleccionado={setProductoSeleccionado}
                                        onVarianteChange={(nombre) => {
                                            setVariantesSeleccionadas(prev => ({
                                                ...prev,
                                                [prod.id]: nombre
                                            }));
                                        }}
                                    />

                                    {/* Boton lateral del producto */}
                                    <div className="btn-carrito-container">
                                        {idAnadido === `${prod.id}-exito` && (
                                            <div className="mensaje-exito-flotante">¡Añadido!</div>
                                        )}
                                        {idAnadido === `${prod.id}-error` && (
                                            <div className="mensaje-error-flotante">
                                                Máx. 20 unidades
                                            </div>
                                        )}
                                        <button
                                            className="btn-agregar-flotante"
                                            onClick={() => handleAnadirConTooltip(prod)}
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px' }}><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="card-body d-flex flex-column">
                                    <h4 className="card-title">
                                        {prod.nombre}{nombreVariante ? ` - ${nombreVariante}` : ""}
                                    </h4>
                                    <p className="card-precio-estilo">{prod.precio}€</p>

                                    <div className="mt-auto">
                                        <p className="mb-1 text-secondary" style={{ fontSize: '0.85rem' }}>
                                            <strong>{info.etiqueta}:</strong> {info.valor}
                                        </p>
                                        <p className="descripcion-producto">
                                            {prod.descripcion}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Componente de flechas/números de página */}
            <div className="mt-4">
                <Paginacion
                    totalProductos={productos.length}
                    productosPorPagina={productosPerPage}
                    paginaActual={paginaActual}
                    onCambiarPagina={paginate}
                />
            </div>

            {/* Si hay un producto clickado, mostramos la caja de detalles */}
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