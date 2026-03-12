import React from "react";

const FiltroCategorias = ({ categoriaActual, onCambio }) => {
    const categorias = ["Todas", "Mobiliario", "Cabello", "Juguete", "Merchandising", "Alimentación", "Accesorios"];

    const handleChange = (e) => {
        // Usamos esta función para validar
        if (typeof onCambio === 'function') {
            onCambio(e.target.value);
        } else {
            console.error("No has pasado la función onCambio al filtro");
        }
    };

    return (
        <div className="form-group">
            <select 
                className="form-select border-lila" 
                value={categoriaActual || "Todas"} 
                onChange={handleChange} // <-- CAMBIA ESTO (antes tenías onCambio directamente)
                style={{ borderRadius: '20px', borderColor: '#d1b3ff' }}
            >
                {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
        </div>
    );
};

export default FiltroCategorias;