import React from 'react';
import { DIVISA } from '../tienda/tienda.js';

//Detalles producto es una ventana modal 
// (pop-up) que muestra la información 
// detallada de un producto.

const DetallesProducto = ({ producto, onCerrar }) => {
// - producto: el objeto con los datos (nombre, precio...)
// - onCerrar: la función para quitar el modal de la pantalla

    if (!producto) return null;
    //Si no hay producto seleccionado, no hace nada

    return (
        <div className="modal-overlay-custom" onClick={onCerrar}>
         {/*Fondo borroso, si el usuario hace clic fuera de la caja de los detalles, se ejecuta onCerrar */}
            <div className="modal-container-custom" onClick={(e) => e.stopPropagation()}>
            {/*Caja de detalles, e.stopPropagation() es para que al hacer click dentro de la
            caja la ventana no se cierre*/}
                <button type="button" className="btn-close-custom" onClick={onCerrar}>×</button>
                {/* Botón X de cerrar */}
                <div className="modal-content-wrapper">
                {/* Contenido de la caja de detalles. ORGANIZADO EN COLUMNAS*/}
                    <div className="modal-left-column">
                    {/*Columna izquierda --> imagen del producto*/}
                        <img src={producto.imagen} alt={producto.nombre} className="modal-img" />
                    </div>
                    <div className="modal-right-column">
                    {/* Columna derecha --> información del producto */}
                        <div className="modal-title-box">
                        {/* Título del producto */}
                            {producto.nombre}
                        </div>

                        <div className="modal-info-row purple-light">
                        {/* Precio del producto */}
                            <span className="label">Precio:</span>
                            <span className="value">{producto.precio}{DIVISA}</span>
                        </div>

                        <div className="modal-info-row gray-light">
                        {/* Categoría del producto: Si no tiene tipo, por defecto es 'Peluche' */}
                            <span className="label">Tipo:</span>
                            <span className="value">{producto.tipo || 'Peluche'}</span>
                        </div>

                        <hr className="modal-separator" />
                        {/* Línea horizontal para separar los datos de la descripción */}

                        <div className="modal-description-section">
                        {/* Sección de texto detallado */}
                            <h6 className="description-title">Descripción:</h6>
                            <div className="description-scroll">
                            {/* Bloque con scroll por si la descripción es muy larga */}
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