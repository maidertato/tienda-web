import React from 'react';

const Paginacion = ({ 
    totalProductos,
    productosPorPagina,
    paginaActual,
    onCambiarPagina
}) => {
    const totalPaginas = Math.ceil(totalProductos / productosPorPagina);

    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = Math.min(inicio + productosPorPagina, totalProductos);
    const mostrados = totalProductos === 0 ? 0 : fin - inicio;
    // si no hay productoos nada --> 0 de 0 productos
    if (totalProductos === 0) {
        return (
            <nav>
                <p className="text-center">Mostrando 0 de 0 productos</p>
            </nav>
        );
    }

    return (
        <nav>
            <div className="mb-2 text-center">
                <p className="mb-0">
                    Mostrando {mostrados} de {totalProductos} productos
                </p>
            </div>

            <ul className="pagination justify-content-center">

                {/* btn Anterior */}
                {paginaActual > 1 && (
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => onCambiarPagina(paginaActual - 1)}
                        >
                            Anterior
                        </button>
                    </li>
                )}

                {/* Num Páginas */}
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(num => (
                    <li key={num} className={`page-item ${num === paginaActual ? 'active' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => onCambiarPagina(num)}
                        >
                            {num}
                        </button>
                    </li>
                ))}

                {/* btn Siguiente */}
                {paginaActual < totalPaginas && (
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => onCambiarPagina(paginaActual + 1)}
                        >
                            Siguiente
                        </button>
                    </li>
                )}

            </ul>
        </nav>
    );
};

export default Paginacion;