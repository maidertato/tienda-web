import React from 'react';

const Paginacion = ({ paginaActual, totalPaginas, onAnterior, onSiguiente }) => {
    return (
        <div className="d-flex justify-content-between align-items-center p-3">
            <button className="btn btn-secondary" onClick={onAnterior} disabled={paginaActual === 1}>
                Anterior
            </button>
            <span>Página {paginaActual} de {totalPaginas}</span>
            <button className="btn btn-secondary" onClick={onSiguiente} disabled={paginaActual === totalPaginas}>
                Siguiente
            </button>
        </div>
    );
};

export default Paginacion;