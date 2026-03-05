import React, { useState } from 'react';
import BuscadorProductos from './BuscadorProductos';
import Paginacion from './Paginacion';
import DetallesProducto from './DetallesProducto';

const EscaparateProductos = ({ productos }) => {
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const productosFiltrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );

    const porPagina = 5;
    const totalPaginas = Math.ceil(productosFiltrados.length / porPagina);
    const productosPagina = productosFiltrados.slice((paginaActual-1)*porPagina, paginaActual*porPagina);

    return (
        <div>
            <BuscadorProductos
                titulo="Buscar Productos"
                terminoBusqueda={terminoBusqueda}
                onCambio={valor => { setTerminoBusqueda(valor); setPaginaActual(1); }}
            />
            <div className="productos-grid p-3">
                {productosPagina.map(prod => (
                    <div key={prod.id} className="card p-2 mb-3" onClick={() => setProductoSeleccionado(prod)}>
                        <h4>{prod.nombre}</h4>
                        <p>${prod.precio}</p>
                    </div>
                ))}
            </div>
            <Paginacion
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                onAnterior={() => setPaginaActual(paginaActual-1)}
                onSiguiente={() => setPaginaActual(paginaActual+1)}
            />
            <DetallesProducto
                producto={productoSeleccionado}
                onCerrar={() => setProductoSeleccionado(null)}
            />
        </div>
    );
};

export default EscaparateProductos;