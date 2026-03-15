import React from "react";

const FiltroCategorias = ({ categoriaActual, onCambio, precioMax, onCambioPrecio, alLimpiar }) => {
    const categorias = ["Todas", "Mobiliario", "Cabello", "Juguete", "Merchandising", "Alimentación", "Accesorios"];

    return (
        <div className="p-3" style={{ minWidth: '220px' }}>
            <label className="fw-bold mb-2 small text-secondary">Categoría</label>
            <div className="d-flex flex-column gap-1 mb-3">
                {categorias.map(cat => (
                    <button
                        key={cat}
                        className={`btn btn-sm text-start ${categoriaActual === cat ? 'fw-bold text-primary' : 'text-dark'}`}
                        onClick={() => onCambio(cat)}
                        style={{ border: 'none', background: categoriaActual === cat ? '#f3ebff' : 'transparent', borderRadius: '8px' }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <hr className="my-2" />

            <label className="fw-bold mb-1 small text-secondary">Precio máximo: {precioMax}€</label>
            <input
                type="range"
                className="form-range"
                min="0"
                max="100"
                value={precioMax}
                onChange={(e) => onCambioPrecio(Number(e.target.value))}
                style={{ accentColor: '#d1b3ff' }}
            />

            <button 
                className="btn btn-sm w-100 mt-3" 
                onClick={alLimpiar}
                style={{ borderRadius: '10px', backgroundColor: '#fee2e2', color: '#991b1b', border: 'none', fontWeight: '500' }}
            >
                Borrar Filtros
            </button>
        </div>
    );
};

export default FiltroCategorias;