import React from 'react';


const SeccionMiCuenta = ({ usuario }) => {
return( 
    <div className="card p-5 text-center">
        <h2>Mi Cuenta</h2>
        {usuario ? <p>Conectado como {usuario.nombre}</p> : <p>Inicia sesión para ver tu perfil.</p>}
    </div>
    );
}

export default SeccionMiCuenta;
