import React, { useRef, useState, useEffect, useMemo } from 'react';
import DetallesProducto from './DetallesProducto';
import BuscadorProductos from './BuscadorProductos';
import Paginacion from './Paginacion';
import { obtenerAtributoExtra } from '../tienda/tienda.js';

const categorias = ["Todas", "Mobiliario", "Cabello", "Juguete", "Merchandising", "Alimentación", "Accesorios"];
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
                onClick={() => setProductoSeleccionado({ producto: prod, variante: imagenes[idx] })}
            />
        </div>
    );
};

//////////////////////////////////////
// COMPONENTE PRINCIPAL: ESCAPARATE COMPLETO
//////////////////////////////////////
const EscaparateProductos = ({ productos, onAnadirAlCarrito, busqueda, setBusqueda, categoria, setCategoria, precioMax, setPrecioMax, paginaActual, setPaginaActual, carrito = [] }) => {
    // Estado para saber qué producto mostrar en la caja de detalles
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    // 6 productos para que sean filas de 3
    const [productosPerPage] = useState(6);
    // Estado para controlar qué burbuja de mensaje (exito/error) se muestra
    const [idAnadido, setIdAnadido] = useState(null);
    // Guardamos qué variante está seleccionada en cada producto para el título
    const [variantesSeleccionadas, setVariantesSeleccionadas] = useState({});
    const refFiltros = useRef(null);

    const [showFiltros, setShowFiltros] = useState(false);

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
                texto.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            return normalizar(prod.tipo || "") === normalizar(categoria) && coincideBusqueda && coincidePrecio;
        });
    }, [productos, categoria, busqueda, precioMax]);

    // Si el usuario busca algo, volvemos automáticamente a la página 1
    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda, categoria, precioMax, setPaginaActual]);

    // click fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (refFiltros.current && !refFiltros.current.contains(event.target)) {
                setShowFiltros(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


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
    const currentProducts = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);

    // Cambia de página y sube el scroll arriba del todo
    const paginate = (pageNumber) => {
        setPaginaActual(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="container-fluid">
            {/* Buscador integrado en la parte superior del escaparate */}
            <div className="d-flex justify-content-between align-items-center px-3 mb-2" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/*Título dinámico según la búsqueda */}
                <h2 className="h4 text-secondary m-0">
                    {busqueda
                        ? `Buscando por: "${busqueda}"`
                        : (categoria && categoria !== "Todas" ? `Categoría: ${categoria}` : "Todos los productos")
                    }

                </h2>
                <div className="d-flex gap-2 align-items-center">
                    <div style={{ width: '250px' }}>
                        <BuscadorProductos
                            titulo=""
                            terminoBusqueda={busqueda}
                            onCambio={setBusqueda}
                        />
                    </div>

                    <div ref={refFiltros} style={{ position: "relative" }}>

                        <button
                            onClick={() => setShowFiltros(!showFiltros)}
                            className="btn-filtros-toggle"
                            style={{
                                backgroundColor: '#8e24aa', border: 'none', borderRadius: '12px',
                                width: '45px', height: '45px', color: 'white', display: 'flex',
                                alignItems: 'center', justifyContent: 'center'
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z" />
                            </svg>
                        </button>

                        {showFiltros && (
                            <div className="shadow-lg p-3" style={{
                                position: 'absolute', top: '100%', right: 0, zIndex: 1050,
                                backgroundColor: 'white', borderRadius: '15px', marginTop: '10px', minWidth: '250px'
                            }}>
                                <label className="fw-bold mb-2 small text-secondary">Categoría</label>
                                <div className="d-flex flex-column gap-1 mb-3">
                                    {categorias.map(cat => (
                                        <button
                                            key={cat}
                                            className={`btn btn-sm text-start ${categoria === cat ? 'fw-bold' : 'text-dark'}`}
                                            onClick={() => { setCategoria(cat); setShowFiltros(false); }}
                                            style={{
                                                border: 'none',
                                                background: categoria === cat ? '#f3ebff' : 'transparent',
                                                color: categoria === cat ? '#8e24aa' : '#333',
                                                borderRadius: '8px'
                                            }}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                <hr className="my-2" />

                                <label className="fw-bold mb-1 small text-secondary">Precio máximo: {precioMax}€</label>
                                <input
                                    type="range"
                                    className="form-range"
                                    min="0"
                                    max="100"
                                    value={precioMax}
                                    onChange={(e) => setPrecioMax(Number(e.target.value))}
                                    style={{ accentColor: '#8e24aa' }}
                                />

                                <button
                                    className="btn btn-sm w-100 mt-3"
                                    onClick={() => { setCategoria("Todas"); setPrecioMax(100); setBusqueda(""); setShowFiltros(false); }}
                                    style={{ borderRadius: '10px', backgroundColor: '#fee2e2', color: '#991b1b', border: 'none', fontWeight: '500' }}
                                >
                                    Borrar Filtros
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Ajuste de rejilla para asegurar 3 productos en pantallas grandes y medianas */}
            <div id="lista-productos" className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-3 px-3" style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
                                                Max. 20 unidades
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
                    totalProductos={productosFiltrados.length}
                    productosPorPagina={productosPerPage}
                    paginaActual={paginaActual}
                    onCambiarPagina={paginate}
                />
            </div>

            {/* Si hay un producto clickado, mostramos la caja de detalles */}
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