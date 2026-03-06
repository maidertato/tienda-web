

import React from 'react';

const Cabecera = ({ titulo }) => {
    return (
        <header className="py-3 bg-light">
            <h1 className="text-center">{titulo}</h1>
        </header>
    );
};

export default Cabecera;

