import React from 'react';

const Cabecera = ({ titulo }) => {
  return (
    // Incluye el elemento <header> de la primera iteración
    <header className="py-3 bg-light">
      {/* El título es pasado por props */}
      <h1 className="text-center">{titulo}</h1>
    </header>
  );
};

export default Cabecera;