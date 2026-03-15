import React from "react";

const FiltroCategorias = ({ categoriaActual, onCambio, precioMax, onCambioPrecio }) => {
    const categorias = ["Todas", "Mobiliario", "Cabello", "Juguete", "Merchandising", "Alimentación", "Accesorios"];

    return (
        <div className="d-flex flex-column gap-3">
            {/* Selector de Categorías */}
            <div className="form-group">
                <label className="small fw-bold text-secondary mb-1">Categoría</label>
                <select 
                    className="form-select border-lila" 
                    value={categoriaActual || "Todas"} 
                    onChange={(e) => onCambio(e.target.value)} 
                    style={{ borderRadius: '20px', borderColor: '#d1b3ff', cursor: 'pointer' }}
                >
                    {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Selector de Precio */}
            <div className="form-group">
                <label className="small fw-bold text-secondary mb-1">
                    Precio máx: <span className="text-dark">{precioMax}€</span>
                </label>
                <input 
                    type="range" 
                    className="form-range custom-range-lila" 
                    min="0" 
                    max="100" 
                    step="1"
                    value={precioMax} 
                    onChange={(e) => onCambioPrecio(Number(e.target.value))}
                    style={{ accentColor: '#d1b3ff' }}
                />
                <div className="d-flex justify-content-between x-small text-muted" style={{ fontSize: '0.7rem' }}>
                    <span>0€</span>
                    <span>100€</span>
                </div>
            </div>
        </div>
    );
};

export default FiltroCategorias;