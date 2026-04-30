import React, { useState } from 'react';
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const LogIn = ({ onLogin, isOnline, apiBaseUrl }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const manejarSubmit = async (e) => {
        e.preventDefault();
        if (!isOnline) return;

        try {
            // autenticar con Firebase
            await signInWithEmailAndPassword(auth, email, password);

            // avisar al servidor Express para crear la sesión
            // y obtener los datos del usuario desde MongoDB
            const respuesta = await fetch(`${apiBaseUrl}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // necesario para que la cookie de sesión se guarde
                body: JSON.stringify({ email })
            });

            if (!respuesta.ok) {
                const data = await respuesta.json();
                throw new Error(data.error || 'Error al iniciar sesión en el servidor');
            }

            const data = await respuesta.json();

            // data.usuario tiene los datos de MongoDB (nombre, rol, campos extra...)
            // data.visitas tiene el contador (empieza en 1)
            onLogin(data.usuario, data.visitas);

        } catch (err) {
            console.error("Error login:", err);
            setError(err.message || "No se ha podido iniciar sesión");
        }
    };

    return (
        <div>
            <div className="titulo formulario">
                <h5 className="mb-0 fw-bold">Acceso Clientes</h5>
            </div>
            <div className="card-body">
                <form onSubmit={manejarSubmit}>
                    {error && <div className="alert alert-danger py-1 small">{error}</div>}

                    <div className="mb-3 text-start">
                        <label className="form-label small fw-bold text-dark">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control shadow-sm"
                            style={{ border: '1px solid #000000', color: '#000' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nombre@ejemplo.com"
                            required
                        />
                    </div>

                    <div className="mb-4 text-start">
                        <label className="form-label small fw-bold text-dark">Contraseña</label>
                        <input
                            type="password"
                            className="form-control shadow-sm"
                            style={{ border: '1px solid #000000', color: '#000' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-custom w-100 fw-bold py-2"
                        disabled={!isOnline}
                    >
                        {isOnline ? "IDENTIFICARSE" : "SIN CONEXIÓN"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LogIn;
