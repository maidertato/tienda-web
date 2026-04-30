import React, { useState } from 'react';

const SeccionMiCuenta = ({ usuario, apiBaseUrl, isOnline, onActualizar }) => {
    const [nombre, setNombre] = useState(usuario?.nombre || '');
    const [campoExtra1, setCampoExtra1] = useState(usuario?.campoExtra1 || '');
    const [campoExtra2, setCampoExtra2] = useState(usuario?.campoExtra2 || '');
    const [campoExtra3, setCampoExtra3] = useState(usuario?.campoExtra3 || '');
    const [error, setError] = useState('');
    const [exito, setExito] = useState('');

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
            setExito('¡Cambios guardados correctamente!');
            setTimeout(() => setExito(''), 3000);
        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div className="card shadow animate__animated animate__fadeIn mi-cuenta-card">
            <div className="mi-cuenta-header">
                <h2>Mis datos</h2>
            </div>

            <div className="mi-cuenta-body">
                <div>
                    <label className="mi-cuenta-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control mi-cuenta-input"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        disabled={!isOnline}
                        placeholder="Tu nombre"
                    />
                </div>

                <div>
                    <label className="mi-cuenta-label">Email</label>
                    <input
                        type="email"
                        className="form-control mi-cuenta-input mi-cuenta-input-disabled"
                        value={usuario?.email || ''}
                        disabled
                    />
                </div>

                <div>
                    <label className="mi-cuenta-label">Teléfono</label>
                    <input
                        type="text"
                        className="form-control mi-cuenta-input"
                        value={campoExtra1}
                        onChange={e => setCampoExtra1(e.target.value)}
                        disabled={!isOnline}
                        placeholder="Tu teléfono"
                    />
                </div>

                <div>
                    <label className="mi-cuenta-label">Dirección</label>
                    <input
                        type="text"
                        className="form-control mi-cuenta-input"
                        value={campoExtra2}
                        onChange={e => setCampoExtra2(e.target.value)}
                        disabled={!isOnline}
                        placeholder="Tu dirección"
                    />
                </div>

                <div>
                    <label className="mi-cuenta-label">Ciudad</label>
                    <input
                        type="text"
                        className="form-control mi-cuenta-input"
                        value={campoExtra3}
                        onChange={e => setCampoExtra3(e.target.value)}
                        disabled={!isOnline}
                        placeholder="Tu ciudad"
                    />
                </div>

                {error && <p style={{ color: '#d32f2f', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>{error}</p>}
                {exito && <p style={{ color: '#008f39', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>{exito}</p>}

                <button
                    className="btn mi-cuenta-btn"
                    onClick={manejarGuardar}
                    disabled={!isOnline}
                >
                    Guardar cambios
                </button>
            </div>
        </div>
    );
};


export default SeccionMiCuenta;
