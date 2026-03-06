import React from 'react';

const BuscadorProductos = ({ tituloBuscador, onBuscar }) => {
  return (
    <div className="d-flex align-items-center w-100 p-3">
      {/* 5.1.3: Título de lo que se busca pasado por props */}
      <h2 className="m-0">{tituloBuscador}</h2>
      
      <div className="contenedor-busqueda-filtro ms-auto">
        {/* 5.1.3: Input para filtrar productos por nombre */}
        <input 
          type="text" 
          className="form-control buscador-custom" 
          placeholder="Buscar por nombre..." 
          onChange={(e) => onBuscar(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BuscadorProductos;