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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            onLogin(user);
            
        } catch (err) {
            console.log("Error Firebase:", err.code, err.message);
            setError("No se ha podido iniciar sesión");
        }
    };

    return (
        <div > 
            <div className="titulo formulario" >
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