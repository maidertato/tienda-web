import React from 'react';

const Cabecera = ({ titulo }) => {
    return (
        <header className="navbar navbar-light bg-white p-3 shadow-sm mb-0">
            <div className="container-fluid justify-content-center">
                {}
                <h1 className="navbar-brand mb-0 h1 fs-2">
                    {titulo}
                </h1>
            </div>
        </header>
    );
};

export default Cabecera;