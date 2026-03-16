import React from 'react';
import { DIVISA, obtenerAtributoExtra } from '../tienda/tienda.js';


//Detalles producto es una ventana modal 
// (pop-up) que muestra la información 
// detallada de un producto.
const DetallesProducto = ({ producto, variante, onCerrar }) => {
    // - producto: el objeto con los datos (nombre, precio...)
    // - variante: la variante del producto seleccionada
    // - onCerrar: la función para quitar el modal de la pantalla

    
    //Si no hay producto seleccionado, no hace nada
    if (!producto) return null;

    const nombre = variante?.nombre || producto.nombre;
    const imagen = variante?.imagen || producto.imagen;
    const extra = obtenerAtributoExtra(producto);
    return (
        // Fondo oscuro y borroso que cubre toda la pantalla
        <div className="modal-overlay-custom" onClick={onCerrar}>

            {/*Caja de detalles, e.stopPropagation() es para que al hacer click dentro de la
            caja la ventana no se cierre*/}
            <div className="modal-container-custom" onClick={(e) => e.stopPropagation()}>

                {/* Botón X de cerrar */}
                <button type="button" className="btn-close-custom" onClick={onCerrar}>×</button>

                {/* Contenido de la caja de detalles. ORGANIZADO EN COLUMNAS*/}
                <div className="modal-content-wrapper">

                    {/*Columna izquierda --> imagen del producto*/}
                    <div className="modal-left-column">
                        <img src={imagen} alt={nombre} className="modal-img" />
                    </div>

                    {/* Columna derecha --> información del producto */}
                    <div className="modal-right-column">

                        {/* Título del producto */}
                        <div className="modal-title-box">
                            {producto.nombre}{variante?.nombre ? ` - ${variante.nombre}` : ""}
                        </div>

                        {/* Precio del producto */}
                        <div className="modal-info-row purple-light">
                            <span className="label">Precio:</span>
                            <span className="value">{producto.precio}{DIVISA}</span>
                        </div>

                        {/* Categoría del producto: Si no tiene tipo, por defecto es 'Peluche' */}
                        <div className="modal-info-row gray-light">
                            <span className="label">Tipo:</span>
                            <span className="value">{extra.valor}</span>
                        </div>

                        {/* Línea horizontal para separar los datos de la descripción */}
                        <div style={{ width: '100%', minHeight: '1px', backgroundColor: '#e0e0e0', margin: '20px 0', display: 'block', clear: 'both' }}></div>

                        {/* Sección de texto detallado */}
                        <div className="modal-description-section" >
                            <h6 className="description-title">Descripción:</h6>
                            {/* Bloque con scroll por si la descripción es muy larga */}
                            <div className="description-scroll">
                                {producto.descripcion}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetallesProducto;