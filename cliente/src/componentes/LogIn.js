import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config'; 

const LogIn = ({ onLogin, isOnline, apiBaseUrl }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const manejarSubmit = async (e) => {
        e.preventDefault();
        if (!isOnline) return; 

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const response = await fetch(`${apiBaseUrl}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email: user.email }),
            });

            if (response.ok) {
                const datosServidor = await response.json();
                onLogin(datosServidor); 
            }
        } catch (err) {
            setError("Credenciales incorrectas");
        }
    };

    return (
        <div className="card shadow-lg border-0" style={{ 
            borderRadius: '20px', 
            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
            backdropFilter: 'blur(10px)', 
            padding: '10px'
        }}> 
            <div className="card-header bg-primary text-white text-center border-0" style={{ borderRadius: '15px 15px 0 0' }}>
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

                    <button type="submit" className="btn btn-primary w-100 fw-bold py-2" disabled={!isOnline}>
                        {isOnline ? "IDENTIFICARSE" : "SIN CONEXIÓN"}
                    </button>
                </form>
            </div>
        </div>
    );
}; 

export default LogIn;