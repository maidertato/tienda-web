

import React from 'react';

const Carrito = ({ productosCarrito = [] }) => {
    const total = productosCarrito.reduce((acc, prod) => acc + prod.precio, 0);

    return (
        <div className="carrito p-3 bg-light rounded shadow">
            <h3>Carrito</h3>
            {productosCarrito.length === 0 ? <p>El carrito está vacío</p> :
                <ul>
                    {productosCarrito.map((prod, i) => <li key={i}>{prod.nombre} - ${prod.precio}</li>)}
                </ul>
            }
            <p>Total: ${total.toFixed(2)}</p>
        </div>
    );
};

export default Carrito;

