import React from 'react';
// Importamos el buscador para que la Cabecera lo reconozca
import BuscadorProductos from './BuscadorProductos';

const Cabecera = ({ titulo, busqueda, setBusqueda, totalItems, onAbrirCarrito }) => {
    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light p-3 shadow-sm">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                
                {/* LADO IZQUIERDO: Título que viene por props */}
                <h1 className="navbar-brand mb-0 h1">{titulo}</h1>

                {/* CENTRO: El Buscador (conectado a los estados de App.js) */}
                <BuscadorProductos 
                    titulo="Buscando:" 
                    terminoBusqueda={busqueda} 
                    onCambio={setBusqueda} 
                />

                {/* LADO DERECHO: Botones */}
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary">Inicio</button>
                    <button className="btn btn-primary position-relative" onClick={onAbrirCarrito}>
                        🛒
                        {totalItems > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>

            </div>
        </header>
    );
};

export default Cabecera;