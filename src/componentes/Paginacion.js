import React from 'react';

const Paginacion = ({ totalProductos, productosPorPagina, paginaActual,onCambiarPagina}) => {
    const totalPaginas = Math.ceil(totalProductos / productosPorPagina); // calculo de num de paginas
    // PARA MOSTRADOS
      // cuantos productos se estan viendo
    const inicio = (paginaActual - 1) * productosPorPagina; // el numero del primer roduct de la pagina
    const fin = Math.min(inicio + productosPorPagina, totalProductos); // el numero del ultimo producto de la pagina (6(0-5))
    // cuantos de cuantos se muetsran - Luego para el return
    const mostrados = totalProductos === 0 ? 0 : fin - inicio;
    
    // si no hay productos nada --> 0 de 0 productos
    if (totalProductos === 0) {
        return (
            <nav className="mt-3">
                <p className="text-center">No hay productos disponibles</p>
            </nav>
        );
    }
    // Crear lista con num de botones 
    const paginas = [];
    for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
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
                {paginaActual > 1 && ( // si es la pagian 1 no sale
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
                {paginas.map(num => ( // se crean los botones. react recorre con .map()
                    <li key={num} className={`page-item ${num === paginaActual ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => onCambiarPagina(num)} >
                            {num}
                        </button>
                    </li>
                ))}

                {/* btn Siguiente */}
                {paginaActual < totalPaginas && ( // si es la ultima no sale
                    <li className="page-item">
                        <button className="page-link" onClick={() => onCambiarPagina(paginaActual + 1)} >
                            Siguiente
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Paginacion;