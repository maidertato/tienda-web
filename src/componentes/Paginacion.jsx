import React from 'react';

const Paginacion = ({ paginaActual, totalProductos, productosPorPagina, alCambiarPagina }) => {
    // Calculamos el número total de páginas
    const totalPaginas = Math.ceil(totalProductos / productosPorPagina);

    // Si no hay productos, no mostramos la paginación
    if (totalPaginas <= 1 && totalProductos === 0) return null;

    // Cálculo para el mensaje informativo (Requisito 5.1.4)
    const inicio = (paginaActual - 1) * productosPorPagina + 1;
    const fin = Math.min(paginaActual * productosPorPagina, totalProductos);

    return (
        <div className="mt-4 text-center">
            {/* Mensaje Informativo: Ejemplo "Mostrando 1-6 de 12 productos" */}
            <p className="small text-muted">
                Mostrando {inicio}-{fin} de {totalProductos} productos
            </p>

            <nav>
                <ul className="pagination justify-content-center">
                    {/* Botón Anterior */}
                    <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                        <button 
                            className="page-link" 
                            onClick={() => alCambiarPagina(paginaActual - 1)}
                            disabled={paginaActual === 1}
                        >
                            Anterior
                        </button>
                    </li>

                    {/* Generar números de página dinámicamente */}
                    {[...Array(totalPaginas)].map((_, index) => (
                        <li 
                            key={index + 1} 
                            className={`page-item ${paginaActual === index + 1 ? 'active' : ''}`}
                        >
                            <button 
                                className="page-link" 
                                onClick={() => alCambiarPagina(index + 1)}
                                style={paginaActual === index + 1 ? { backgroundColor: '#8e29b6', borderColor: '#8e29b6', color: 'white' } : {}}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    {/* Botón Siguiente */}
                    <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
                        <button 
                            className="page-link" 
                            onClick={() => alCambiarPagina(paginaActual + 1)}
                            disabled={paginaActual === totalPaginas}
                        >
                            Siguiente
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Paginacion;