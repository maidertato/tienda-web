import React, { useState, useRef, useEffect } from 'react';
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const LogIn = ({ onLogin, isOnline, apiBaseUrl }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
    const avatarRef = useRef(null);

    // Ojos siguen el ratón
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!avatarRef.current || passwordFocused) {
                setEyeOffset({ x: 0, y: 0 });
                return;
            }
            const rect = avatarRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const factor = Math.min(dist, 300) / 300;
            const max = 4;
            setEyeOffset({ x: (dx / dist) * max * factor, y: (dy / dist) * max * factor });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [passwordFocused]);

    const manejarSubmit = async (e) => {
        e.preventDefault();
        if (!isOnline) return;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const respuesta = await fetch(`${apiBaseUrl}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email })
            });
            if (!respuesta.ok) {
                const data = await respuesta.json();
                throw new Error(data.error || 'Error al iniciar sesión');
            }
            const data = await respuesta.json();
            onLogin(data.usuario, data.visitas);
        } catch (err) {
            setError(err.message || 'No se ha podido iniciar sesión');
        }
    };

    const ex = eyeOffset.x;
    const ey = eyeOffset.y;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '16px 8px' }}>
            <style>{`
                @keyframes blink {
                    0%,2%,4%,26%,28%,71%,73%,100% { ry: 4.5; cy: 31.7; }
                    1%,3%,27%,72% { ry: 0.5; cy: 30; }
                }
                .lg-eye { animation: blink 8s 1s infinite; transition: all 0.2s ease; }
                .lg-eye-closed { ry: 0.5 !important; cy: 30 !important; animation: none !important; }

                .lg-avatar {
                    width: 120px; height: 120px;
                    border-radius: 50%;
                    border: 2px solid #c9b8e8;
                    background: #f3eeff;
                    display: flex; align-items: center; justify-content: center;
                    position: relative; overflow: hidden;
                }
                .lg-avatar svg { position: absolute; width: 110px; height: 110px; }
                .lg-hands {
                    z-index: 2;
                    transform-origin: 50% 100%;
                    transition: transform 0.3s ease;
                    transform: translateY(80px) rotateX(-21deg);
                }
                .lg-hands.tapando { transform: translate3d(0, 18px, 0) rotateX(0deg); }

                .lg-input-wrap { display: flex; flex-direction: column; gap: 3px; width: 100%; }
                .lg-label { font-size: 0.75rem; font-weight: 700; color: #9575cd;
                    font-family: 'Quicksand', sans-serif; text-transform: uppercase; letter-spacing: 0.5px; }
                .lg-input {
                    border: 1.5px solid #d1c4e9; border-radius: 8px;
                    padding: 7px 10px; font-size: 0.88rem;
                    font-family: 'Quicksand', sans-serif;
                    background: #faf6ff; color: #333; outline: none; width: 100%;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .lg-input:focus { border-color: #9575cd; box-shadow: 0 0 0 3px rgba(149,117,205,0.15); }

                .lg-pass-wrap {
                    display: flex; align-items: center; gap: 6px;
                }
                .lg-pass-wrap .lg-input { flex: 1; }
                .lg-pass-toggle {
                    flex-shrink: 0;
                    background: white; border: 1.5px solid #d1c4e9;
                    border-radius: 8px; cursor: pointer;
                    font-size: 0.72rem; font-weight: 700; color: #9575cd;
                    font-family: 'Quicksand', sans-serif;
                    padding: 6px 8px; white-space: nowrap;
                    transition: background 0.2s;
                }
                .lg-pass-toggle:hover { background: #f3eeff; }

                /* Botón expandible */
                .lg-btn {
                    display: flex; align-items: center; justify-content: flex-start;
                    width: 45px; height: 45px;
                    border: none; border-radius: 50%;
                    cursor: pointer; position: relative; overflow: hidden;
                    transition: width 0.3s ease, border-radius 0.3s ease;
                    box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
                    background: linear-gradient(135deg, #9575cd, #7b3fa0);
                    margin: 4px auto 0;
                }
                .lg-btn:hover { width: 130px; border-radius: 40px; }
                .lg-btn:active { transform: translate(2px, 2px); }
                .lg-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                .lg-btn-icon {
                    width: 100%; display: flex; align-items: center; justify-content: center;
                    transition: width 0.3s ease, padding 0.3s ease; flex-shrink: 0;
                }
                .lg-btn:hover .lg-btn-icon { width: 30%; padding-left: 14px; }
                .lg-btn-icon svg { width: 17px; fill: white; }

                .lg-btn-text {
                    position: absolute; right: 0; width: 0; opacity: 0;
                    color: white; font-size: 0.95rem; font-weight: 700;
                    font-family: 'Quicksand', sans-serif;
                    transition: width 0.3s ease, opacity 0.3s ease;
                    white-space: nowrap;
                }
                .lg-btn:hover .lg-btn-text { opacity: 1; width: 70%; padding-right: 12px; }

                .lg-error {
                    font-size: 0.8rem; color: #c62828;
                    background: #fce4e4; border-radius: 8px;
                    padding: 5px 10px; font-family: 'Quicksand', sans-serif;
                    font-weight: 600; width: 100%; text-align: center;
                }

                .lg-titulo {
                    font-size: 1.35rem; font-weight: 800; color: white;
                    font-family: 'Quicksand', sans-serif; text-align: center;
                    letter-spacing: 0.3px;
                }
            `}</style>

            <p className="lg-titulo">Acceso Clientes</p>

            {/* Mono */}
            <div ref={avatarRef} className="lg-avatar">
                <svg viewBox="0 0 64 64" style={{ zIndex: 1 }}>
                    <ellipse cx="53.7" cy="33" rx="8.3" ry="8.2" fill="#89664c"/>
                    <ellipse cx="53.7" cy="33" rx="5.4" ry="5.4" fill="#ffc5d3"/>
                    <ellipse cx="10.2" cy="33" rx="8.2" ry="8.2" fill="#89664c"/>
                    <ellipse cx="10.2" cy="33" rx="5.4" ry="5.4" fill="#ffc5d3"/>
                    <g fill="#89664c">
                        <path d="m43.4 10.8c1.1-.6 1.9-.9 1.9-.9-3.2-1.1-6-1.8-8.5-2.1 1.3-1 2.1-1.3 2.1-1.3-20.4-2.9-30.1 9-30.1 19.5h46.4c-.7-7.4-4.8-12.4-11.8-15.2"/>
                        <path d="m55.3 27.6c0-9.7-10.4-17.6-23.3-17.6s-23.3 7.9-23.3 17.6c0 2.3.6 4.4 1.6 6.4-1 2-1.6 4.2-1.6 6.4 0 9.7 10.4 17.6 23.3 17.6s23.3-7.9 23.3-17.6c0-2.3-.6-4.4-1.6-6.4 1-2 1.6-4.2 1.6-6.4"/>
                    </g>
                    <path d="m52 28.2c0-16.9-20-6.1-20-6.1s-20-10.8-20 6.1c0 4.7 2.9 9 7.5 11.7-1.3 1.7-2.1 3.6-2.1 5.7 0 6.1 6.6 11 14.7 11s14.7-4.9 14.7-11c0-2.1-.8-4-2.1-5.7 4.4-2.7 7.3-7 7.3-11.7" fill="#e0ac7e"/>
                    <g fill="#3b302a">
                        <path d="m35.1 38.7c0 1.1-.4 2.1-1 2.1-.6 0-1-.9-1-2.1 0-1.1.4-2.1 1-2.1.6.1 1 1 1 2.1"/>
                        <path d="m30.9 38.7c0 1.1-.4 2.1-1 2.1-.6 0-1-.9-1-2.1 0-1.1.4-2.1 1-2.1.5.1 1 1 1 2.1"/>
                    </g>
                    {/* Ojo derecho - se mueve con transform para no interferir con CSS */}
                    <g transform={`translate(${ex}, ${ey})`}>
                        <ellipse cx="40.7" cy="31.7" rx="3.5" ry="4.5" fill="#3b302a"
                            className={passwordFocused || showPassword ? 'lg-eye-closed' : 'lg-eye'} />
                    </g>
                    {/* Ojo izquierdo */}
                    <g transform={`translate(${ex}, ${ey})`}>
                        <ellipse cx="23.3" cy="31.7" rx="3.5" ry="4.5" fill="#3b302a"
                            className={passwordFocused || showPassword ? 'lg-eye-closed' : 'lg-eye'} />
                    </g>
                </svg>

                {/* Manos tapando ojos */}
                <svg viewBox="0 0 64 64" className={`lg-hands ${passwordFocused || showPassword ? 'tapando' : ''}`}>
                    <path fill="#89664C" d="M9.4,32.5L2.1,61.9H14c-1.6-7.7,4-21,4-21L9.4,32.5z"/>
                    <path fill="#FFD6BB" d="M15.8,24.8c0,0,4.9-4.5,9.5-3.9c2.3,0.3-7.1,7.6-7.1,7.6s9.7-8.2,11.7-5.6c1.8,2.3-8.9,9.8-8.9,9.8s10-8.1,9.6-4.6c-0.3,3.8-7.9,12.8-12.5,13.8C11.5,43.2,6.3,39,9.8,24.4C11.6,17,13.3,25.2,15.8,24.8"/>
                    <path fill="#89664C" d="M54.8,32.5l7.3,29.4H50.2c1.6-7.7-4-21-4-21L54.8,32.5z"/>
                    <path fill="#FFD6BB" d="M48.4,24.8c0,0-4.9-4.5-9.5-3.9c-2.3,0.3,7.1,7.6,7.1,7.6s-9.7-8.2-11.7-5.6c-1.8,2.3,8.9,9.8,8.9,9.8s-10-8.1-9.7-4.6c0.4,3.8,8,12.8,12.6,13.8c6.6,1.3,11.8-2.9,8.3-17.5C52.6,17,50.9,25.2,48.4,24.8"/>
                </svg>
            </div>

            {/* Formulario */}
            <form onSubmit={manejarSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {error && <div className="lg-error">{error}</div>}

                <div className="lg-input-wrap">
                    <label className="lg-label">Correo Electrónico</label>
                    <input className="lg-input" type="email" value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="nombre@ejemplo.com" required />
                </div>

                <div className="lg-input-wrap">
                    <label className="lg-label">Contraseña</label>
                    <div className="lg-pass-wrap">
                        <input
                            className="lg-input"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                            placeholder="Contraseña"
                                required
                        />
                        <button type="button" className="lg-pass-toggle"
                            onClick={() => setShowPassword(p => !p)}>
                            {showPassword ? (
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9575cd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                    <line x1="1" y1="1" x2="23" y2="23"/>
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9575cd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="lg-btn" type="submit" disabled={!isOnline}>
                        <div className="lg-btn-icon">
                            <svg viewBox="0 0 512 512">
                                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                            </svg>
                        </div>
                        <div className="lg-btn-text">{isOnline ? 'Entrar' : 'Sin conexión'}</div>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LogIn;
