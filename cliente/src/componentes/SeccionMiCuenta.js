import React, { useState } from 'react';

const SeccionMiCuenta = ({ usuario, apiBaseUrl, isOnline, onActualizar }) => {
    const [nombre, setNombre] = useState(usuario?.nombre || '');
    const [campoExtra1, setCampoExtra1] = useState(usuario?.campoExtra1 || '');
    const [campoExtra2, setCampoExtra2] = useState(usuario?.campoExtra2 || '');
    const [campoExtra3, setCampoExtra3] = useState(usuario?.campoExtra3 || '');
    const [error, setError] = useState('');
    const [exito, setExito] = useState('');
    const [abierto, setAbierto] = useState(false);

    const manejarGuardar = async () => {
        if (!nombre.trim()) {
            setError('El nombre no puede estar vacío.');
            setTimeout(() => setError(''), 3000);
            return;
        }
        try {
            const respuesta = await fetch(`${apiBaseUrl}/usuarios/actualizar`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ nombre, campoExtra1, campoExtra2, campoExtra3 })
            });
            if (!respuesta.ok) {
                const data = await respuesta.json();
                throw new Error(data.error || 'Error al guardar');
            }
            const actualizado = await respuesta.json();
            onActualizar(actualizado);
            setExito('¡Cambios guardados!');
            setTimeout(() => setExito(''), 3000);
        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <>

            <div className="mc-pantalla">
                <div className={`mc-book ${abierto ? 'abierto' : ''}`}>
                    {/* Interior con el formulario */}
                    <div className="mc-inner">
                        <div className="mc-inner-header">
                            <p className="mc-inner-titulo">🐾 Mis datos</p>
                            <button className="mc-btn-cerrar" onClick={() => setAbierto(false)} title="Cerrar">✕</button>
                        </div>

                        <div className="mc-campo">
                            <label className="mc-label">Nombre</label>
                            <input className="mc-input" type="text" value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                disabled={!isOnline} placeholder="Tu nombre" />
                        </div>

                        <div className="mc-campo">
                            <label className="mc-label">Email</label>
                            <input className="mc-input" type="email" value={usuario?.email || ''} disabled />
                        </div>

                        <div className="mc-campo">
                            <label className="mc-label">Teléfono</label>
                            <input className="mc-input" type="text" value={campoExtra1}
                                onChange={e => setCampoExtra1(e.target.value)}
                                disabled={!isOnline} placeholder="Tu teléfono" />
                        </div>

                        <div className="mc-campo">
                            <label className="mc-label">Dirección</label>
                            <input className="mc-input" type="text" value={campoExtra2}
                                onChange={e => setCampoExtra2(e.target.value)}
                                disabled={!isOnline} placeholder="Tu dirección" />
                        </div>

                        <div className="mc-campo">
                            <label className="mc-label">Ciudad</label>
                            <input className="mc-input" type="text" value={campoExtra3}
                                onChange={e => setCampoExtra3(e.target.value)}
                                disabled={!isOnline} placeholder="Tu ciudad" />
                        </div>

                        {error && <p className="mc-msg mc-msg-error">{error}</p>}
                        {exito && <p className="mc-msg mc-msg-exito">{exito}</p>}

                        <button className="mc-btn" onClick={manejarGuardar} disabled={!isOnline}>
                            Guardar cambios
                        </button>
                    </div>

                    {/* Portada del libro */}
                    <div className={`mc-cover ${abierto ? 'abierta' : ''}`} onClick={() => setAbierto(true)}>
                        <div className="mc-cover-avatar">🐾</div>
                        <span className="mc-cover-nombre">{usuario?.nombre || 'Mi Cuenta'}</span>
                        <span className="mc-cover-email">{usuario?.email || ''}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SeccionMiCuenta;
