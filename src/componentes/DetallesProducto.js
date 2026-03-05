import React from 'react';

const DetallesProducto = ({ producto, onCerrar }) => {
    if (!producto) return null;

    return (
        <div className="overlay">
            <div className="detalle-producto p-4 bg-white rounded shadow">
                <button className="btn btn-danger mb-2" onClick={onCerrar}>Cerrar</button>
                <h3>{producto.nombre}</h3>
                <p>Precio: ${producto.precio}</p>
                <p>{producto.descripcion}</p>
            </div>
        </div>
    );
};

export default DetallesProducto;