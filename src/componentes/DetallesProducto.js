import React from 'react';
import { DIVISA } from '../tienda/tienda.js';

const DetallesProducto = ({ producto, onCerrar }) => {
    if (!producto) return null;

    return (
        <div className="modal-overlay-custom" onClick={onCerrar}>
            <div className="modal-container-custom" onClick={(e) => e.stopPropagation()}>

                {/* Botón X de cerrar */}
                <button type="button" className="btn-close-custom" onClick={onCerrar}>×</button>

                <div className="modal-content-wrapper">
                    {/* Columna Izquierda: Imagen */}
                    <div className="modal-left-column">
                        <img src={producto.imagen} alt={producto.nombre} className="modal-img" />
                    </div>

                    {/* Columna Derecha: Información */}
                    <div className="modal-right-column">
                        <div className="modal-title-box">
                            {producto.nombre}
                        </div>

                        <div className="modal-info-row purple-light">
                            <span className="label">Precio:</span>
                            <span className="value">{producto.precio}{DIVISA}</span>
                        </div>

                        <div className="modal-info-row gray-light">
                            <span className="label">Tipo:</span>
                            <span className="value">{producto.tipo || 'Peluche'}</span>
                        </div>


                        <hr className="modal-separator" />

                        <div className="modal-description-section">
                            <h6 className="description-title">Descripción:</h6>
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