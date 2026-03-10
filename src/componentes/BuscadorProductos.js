import React, { useState } from 'react';

const BuscadorProductos = ({
    titulo,
    terminoBusqueda,
    onCambio

}) => {

    //const [termino, setTermino] = useState(terminoBusqueda);

    return (
        <div className="d-flex align-items-center flex-grow mx-1">
            <h4 className="m-0 me-3 text-nowrap d-none d-md-block">{titulo}</h4>
            
            <div className='input-group'>
                <span className="input-group-text bg-transparent border-end-0"> 
                    🔍
                </span>
                <input 
                    type="text"
                    className="form-control border-start-0 ps-0 shadow-none"
                    placeholder="Buscar por nombre..."
                    value={terminoBusqueda}
                    onChange={(e) => onCambio(e.target.value)}                
                />
            </div>
        </div>
    );
};

export default BuscadorProductos;