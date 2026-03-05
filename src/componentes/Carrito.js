import React from 'react';

const Carrito = ({ items }) => {
    const total = items.reduce((acc, prod) => acc + prod.precio, 0);

    return (
        <div className="carrito p-3 bg-light rounded shadow">
            <h3>Carrito</h3>
            {items.length === 0 ? <p>El carrito está vacío</p> :
                <ul>
                    {items.map((prod, i) => <li key={i}>{prod.nombre} - ${prod.precio}</li>)}
                </ul>
            }
            <p>Total: ${total.toFixed(2)}</p>
        </div>
    );
};

export default Carrito;