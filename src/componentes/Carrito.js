import React from 'react';
import { DIVISA } from '../tienda/tienda';

const Carrito = ({ productosCarrito = [] }) => {
    const total = productosCarrito.reduce((acc, prod) => acc + prod.precio, 0);

    return (
        <div className="carrito p-3 bg-light rounded shadow">
            <h3>Carrito</h3>
            {productosCarrito.length === 0 ? <p>El carrito está vacío</p> :
                <ul>
                    {productosCarrito.map((prod, i) => <li key={prod.i}>{prod.nombre} - ${prod.precio}{DIVISA}</li>)}
                </ul>
            }
            <p>Total: ${total.toFixed(2)}{DIVISA}</p>
        </div>
    );
};

export default Carrito;

