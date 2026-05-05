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
            <style>{`
                .mc-pantalla {
                    min-height: 75vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .mc-book {
                    position: relative;
                    width: 320px;
                    height: 420px;
                    perspective: 2000px;
                    transform-style: preserve-3d;
                    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                                height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .mc-book:hover, .mc-book.abierto {
                    width: 480px;
                    height: 580px;
                }

                .mc-inner {
                    position: absolute;
                    inset: 0;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 6px 6px 24px rgba(100, 50, 150, 0.18);
                    padding: 32px 28px 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    overflow-y: auto;
                }

                .mc-inner-titulo {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #7b3fa0;
                    font-family: 'Quicksand', sans-serif;
                    margin-bottom: 2px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .mc-campo {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }

                .mc-label {
                    font-size: 0.72rem;
                    font-weight: 700;
                    color: #b39ddb;
                    font-family: 'Quicksand', sans-serif;
                    text-transform: uppercase;
                    letter-spacing: 0.6px;
                }

                .mc-input {
                    border: 1.5px solid #e1d5f0;
                    border-radius: 10px;
                    padding: 7px 12px;
                    font-size: 0.88rem;
                    font-family: 'Quicksand', sans-serif;
                    background: #faf6ff;
                    color: #444;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    width: 100%;
                }

                .mc-input:focus {
                    border-color: #9575cd;
                    box-shadow: 0 0 0 3px rgba(149, 117, 205, 0.15);
                }

                .mc-input:disabled {
                    background: #f3f0f8;
                    color: #bbb;
                }

                .mc-btn {
                    margin-top: 6px;
                    width: 100%;
                    padding: 10px;
                    background: linear-gradient(135deg, #9575cd, #7b3fa0);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-family: 'Quicksand', sans-serif;
                    font-weight: 700;
                    font-size: 0.92rem;
                    cursor: pointer;
                    transition: opacity 0.2s, transform 0.1s;
                    letter-spacing: 0.3px;
                }

                .mc-btn:hover:not(:disabled) {
                    opacity: 0.9;
                    transform: translateY(-1px);
                }

                .mc-btn:disabled {
                    opacity: 0.45;
                    cursor: not-allowed;
                }

                .mc-msg {
                    font-family: 'Quicksand', sans-serif;
                    font-weight: 600;
                    font-size: 0.83rem;
                    margin: 0;
                    padding: 6px 10px;
                    border-radius: 8px;
                }

                /* ── PORTADA ── */
                .mc-cover {
                    position: absolute;
                    inset: 0;
                    border-radius: 16px;
                    cursor: pointer;
                    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    transform-origin: left center;
                    box-shadow: 6px 6px 28px rgba(100, 50, 160, 0.35);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;
                    background: linear-gradient(150deg, #b39ddb 0%, #9575cd 40%, #7b3fa0 100%);
                    color: white;
                    z-index: 2;
                    user-select: none;
                }

                .mc-cover::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 18px;
                    background: rgba(0,0,0,0.15);
                    border-radius: 16px 0 0 16px;
                }

                .mc-cover.abierta {
                    transform: rotatey(-115deg);
                    pointer-events: none;
                }

                .mc-book:hover .mc-cover:not(.abierta) {
                    transform: rotatey(-115deg);
                    pointer-events: none;
                }

                .mc-cover-avatar {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 40px;
                    border: 3px solid rgba(255,255,255,0.4);
                }

                .mc-cover-nombre {
                    font-size: 1.4rem;
                    font-weight: 800;
                    font-family: 'Quicksand', sans-serif;
                    text-align: center;
                    padding: 0 24px;
                    text-shadow: 0 1px 4px rgba(0,0,0,0.15);
                }

                .mc-cover-email {
                    font-size: 0.8rem;
                    opacity: 0.75;
                    font-family: 'Quicksand', sans-serif;
                    padding: 0 24px;
                    text-align: center;
                }

                .mc-cover-hint {
                    font-size: 0.75rem;
                    opacity: 0.6;
                    font-family: 'Quicksand', sans-serif;
                    position: absolute;
                    bottom: 20px;
                }
            `}</style>

            <div className="mc-pantalla">
                <div className={`mc-book ${abierto ? 'abierto' : ''}`}>
                    {/* Interior con el formulario */}
                    <div className="mc-inner">
                        <p className="mc-inner-titulo">🐾 Mis datos</p>

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

                        {error && <p className="mc-msg" style={{ color: '#c62828', background: '#fce4e4' }}>{error}</p>}
                        {exito && <p className="mc-msg" style={{ color: '#2e7d32', background: '#e8f5e9' }}>{exito}</p>}

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
