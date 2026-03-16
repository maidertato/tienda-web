import React, { useState } from 'react';

const BuscadorProductos = ({
    titulo,
    terminoBusqueda,
    onCambio

}) => {

    //const [termino, setTermino] = useState(terminoBusqueda);

    return (
        // Selector de cantidad: Ajusta unidad a unidad
        <div className="d-flex align-items-center">
            <h4 className="m-0 me-3 text-nowrap d-none d-md-block">{titulo}</h4>

            <div className='input-group'>
                <input
                    type="text"
                    className="form-control shadow-none buscador-custom"
                    placeholder="Buscar por nombre..."
                    value={terminoBusqueda}
                    onChange={(e) => onCambio(e.target.value)}
                />
            </div>
        </div>
    );
};

export default BuscadorProductos;