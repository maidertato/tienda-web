import React, { useState } from 'react';

const BuscadorProductos = ({ 
    titulo,
    terminoBusqueda, 
    onCambio 

}) => {
    
    const [termino, setTermino] = useState(terminoBusqueda);

    return (
        <div className="d-flex align-items-center w-100 p-3">
            <h2 className="m-0">{titulo}</h2>
            <input
                type="text"
                className="form-control ms-auto buscador-custom"
                placeholder="Buscar por nombre..."
                value={terminoBusqueda}
                onChange={e => onCambio(e.target.value)}
            />
        </div>
    );
};

export default BuscadorProductos;