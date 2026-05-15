import React, { useState } from 'react';
import FormularioNuevosProductos from './FormularioNuevosProductos';

const GestionInventario = ({ productos, alEliminarVarios, alActualizarProducto }) => {
    const [seleccionados, setSeleccionados] = useState([]);
    const [editandoId, setEditandoId] = useState(null); // Guarda el ID del producto que se está editando
    const [modalBorrar, setModalBorrar] = useState(false);
    
    const toggleSeleccion = (id) => {
        setSeleccionados(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const manejarBorradoMasivo = () => {
        if (seleccionados.length > 0) {
            setModalBorrar(true);
            alEliminarVarios(seleccionados);
            setSeleccionados([]);
            
        }
    };

    const confirmarBorrado = () => {
        alEliminarVarios(seleccionados);
        setSeleccionados([]);
        setModalBorrar(false);
    };

    const PerroTristeIcono = () => {
        const uniqueId = Math.random().toString(36).substring(2, 9);

        return (
            <svg
            width="200"
            height="200"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', margin: 'auto' }}
            >
            <defs>
                {/* --- DEFINICIÓN DE GRADIENTES PARA VOLUMEN --- */}

                {/* Gradiente para el pelaje base del cuerpo/cabeza  */}
                <radialGradient id={`gradPelaje-${uniqueId}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#D7CCC8" /> 
                <stop offset="70%" stopColor="#A1887F" /> 
                <stop offset="100%" stopColor="#8D6E63" /> 
                </radialGradient>

                {/* Gradiente para las orejas caídas (Más oscuras y con sombra) */}
                <linearGradient id={`gradOreja-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8D6E63" />
                <stop offset="100%" stopColor="#5D4037" /> 
                </linearGradient>

                {/* Gradiente para los ojos (Profundidad y brillo de pena) */}
                <radialGradient id={`gradOjo-${uniqueId}`} cx="45%" cy="45%" r="50%">
                <stop offset="0%" stopColor="#424242" /> 
                <stop offset="80%" stopColor="#000000" /> 
                <stop offset="100%" stopColor="#212121" />
                </radialGradient>

                {/* Gradiente para el hocico (Crema rosado) */}
                <radialGradient id={`gradHocico-${uniqueId}`} cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#F5F5F5" />
                <stop offset="100%" stopColor="#E0E0E0" />
                </radialGradient>

                {/* Sombra suave debajo del perro */}
                <radialGradient id={`gradSombraSuelo-${uniqueId}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* --- DIBUJO DEL PERRO --- */}

            {/* Sombra proyectada en el suelo */}
            <ellipse cx="60" cy="110" rx="40" ry="10" fill={`url(#gradSombraSuelo-${uniqueId})`} />

            {/* Orejas largas y caídas (Detrás de la cabeza) */}
            <path
                d="M25,25 C10,25 5,50 5,75 C5,95 15,105 25,105 C32,105 35,95 35,75 C35,50 35,25 25,25 Z"
                fill={`url(#gradOreja-${uniqueId})`}
            />
            <path
                d="M95,25 C110,25 115,50 115,75 C115,95 105,105 95,105 C88,105 85,95 85,75 C85,50 85,25 95,25 Z"
                fill={`url(#gradOreja-${uniqueId})`}
            />

            {/* Cabeza principal con volumen */}
            <circle cx="60" cy="60" r="45" fill={`url(#gradPelaje-${uniqueId})`} />

            {/* El Hocico */}
            <ellipse cx="60" cy="80" rx="25" ry="20" fill={`url(#gradHocico-${uniqueId})`} stroke="#D7CCC8" strokeWidth="0.5"/>

            {/* OJOS GRANDES Y TRISTES */}
            {/* Ojo Izquierdo */}
            <circle cx="42" cy="55" r="9" fill={`url(#gradOjo-${uniqueId})`} />
            <circle cx="39" cy="51" r="3" fill="white" fillOpacity="0.8" /> {/* Brillo principal */}
            <circle cx="44" cy="57" r="1" fill="white" fillOpacity="0.4" /> {/* Brillo secundario */}
            
            {/* Ojo Derecho */}
            <circle cx="78" cy="55" r="9" fill={`url(#gradOjo-${uniqueId})`} />
            <circle cx="75" cy="51" r="3" fill="white" fillOpacity="0.8" />
            <circle cx="80" cy="57" r="1" fill="white" fillOpacity="0.4" />

            {/* CEJAS INCLINADAS */}
            <path d="M35,42 C38,38 45,38 48,42" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M72,42 C75,38 82,38 85,42" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* NARIZ*/}
            <path
                d="M54,75 C54,72 56,70 60,70 C64,70 66,72 66,75 C66,80 60,84 60,84 C60,84 54,80 54,75 Z"
                fill="#212121"
            />
            <circle cx="58" cy="73" r="1" fill="white" fillOpacity="0.5" /> {/* Brillo nariz */}

            {/* BOCA*/}
            <path
                d="M48,92 C52,88 68,88 72,92"
                stroke="#5D4037"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />

            {/* Pequeño detalle de pelaje en la frente */}
            <path d="M55,20 C58,15 62,15 65,20" stroke="#8D6E63" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
            </svg>
        );
        };


    

    return (
        <div style={{ fontFamily: "'Quicksand', sans-serif", padding: '1.5rem' }}>

            {/* Cabecera */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '1rem' }}>

                <button
                    onClick={() => { if (seleccionados.length > 0) setModalBorrar(true); }}
                    disabled={seleccionados.length === 0}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        background: '#fff7fc', color: '#9C66D4',
                        border: '1.5px solid #e0c5f2', borderRadius: '14px',
                        padding: '9px 18px', fontFamily: "'Quicksand', sans-serif",
                        fontWeight: 700, fontSize: '0.85rem', cursor: seleccionados.length === 0 ? 'not-allowed' : 'pointer',
                        opacity: seleccionados.length === 0 ? 0.38 : 1,
                        transition: 'all 0.25s ease',
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                    </svg>
                    Borrar seleccionados
                    {seleccionados.length > 0 && (
                        <span style={{ background: '#9C66D4', color: 'white', borderRadius: '20px', padding: '1px 8px', fontSize: '11px', fontWeight: 700 }}>
                            {seleccionados.length}
                        </span>
                    )}
                </button>
            </div>

            {/* Lista */}
            <div style={{ borderRadius: '18px', overflow: 'hidden', border: '1.5px solid #ede0f7' }}>
                {productos.map((p) => (
                    <React.Fragment key={p._id}>

                        {/* Fila producto */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '12px',
                            padding: '13px 18px',
                            background: seleccionados.includes(p._id) ? '#f5ecff' : '#fff7fc',
                            borderBottom: '1px solid #f5eaff',
                            transition: 'background 0.15s',
                        }}>

                            {/* Checkbox personalizado */}
                            <label style={{ position: 'relative', width: '20px', height: '20px', flexShrink: 0, cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={seleccionados.includes(p._id)}
                                    onChange={() => toggleSeleccion(p._id)}
                                    style={{ opacity: 0, position: 'absolute', width: '20px', height: '20px', cursor: 'pointer', zIndex: 2, margin: 0 }}
                                />
                                <div style={{
                                    width: '20px', height: '20px', borderRadius: '6px',
                                    border: `2px solid ${seleccionados.includes(p._id) ? '#9C66D4' : '#d0aef0'}`,
                                    background: seleccionados.includes(p._id) ? '#9C66D4' : 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all 0.18s', pointerEvents: 'none',
                                }}>
                                    {seleccionados.includes(p._id) && (
                                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="2,6 5,9 10,3"/>
                                        </svg>
                                    )}
                                </div>
                            </label>

                            <img
                                src={p.imagen}
                                alt=""
                                style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #ead5f7', flexShrink: 0 }}
                            />

                            <span style={{ flex: 1, fontWeight: 700, color: '#521F84', fontSize: '0.92rem' }}>
                                {p.nombre}
                            </span>

                            {/* Botón editar/cerrar */}
                            <button
                                onClick={() => setEditandoId(editandoId === p._id ? null : p._id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '5px',
                                    background: editandoId === p._id ? '#fdf7ff' : 'none',
                                    border: `1.5px solid ${editandoId === p._id ? '#e0c5f2' : 'transparent'}`,
                                    borderRadius: '20px', padding: '5px 14px',
                                    fontFamily: "'Quicksand', sans-serif", fontWeight: 700,
                                    fontSize: '0.82rem',
                                    color: editandoId === p._id ? '#b085d4' : '#9C66D4',
                                    cursor: 'pointer', transition: 'all 0.2s',
                                }}
                            >
                                {editandoId === p._id ? (
                                    <>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                        </svg>
                                        Cerrar
                                    </>
                                ) : (
                                    <>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                        </svg>
                                        Editar
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Formulario de edición */}
                        {editandoId === p._id && (
                            <div style={{
                                background: '#fdf7ff',
                                padding: '22px 24px',
                                borderBottom: '1px solid #f0e4fb',
                            }}>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 2px' }}>Editando</p>
                                <p style={{ color: 'white', fontSize: '1rem', fontWeight: 700, margin: '0 0 18px', fontFamily: "'Quicksand', sans-serif" }}>{p.nombre}</p>

                                <FormularioNuevosProductos
                                    productoAEditar={p}
                                    esEdicion={true}
                                    onGuardarCambios={(datosActualizados) => {
                                        alActualizarProducto({ ...datosActualizados, id: p._id });
                                        setEditandoId(null);
                                    }}
                                />
                            </div>
                        )}

                    </React.Fragment>
                ))}
            </div>
            {modalBorrar && (
                <div
                    onClick={() => setModalBorrar(false)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        background: 'rgba(0,0,0,0.35)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'white', borderRadius: '24px',
                            padding: '2.5rem 2rem', maxWidth: '380px', width: '90%',
                            textAlign: 'center', boxShadow: '0 20px 60px rgba(82,31,132,0.2)',
                            fontFamily: "'Quicksand', sans-serif",
                        }}
                    >
                        <div style={{ marginBottom: '1rem' }}>
                            <PerroTristeIcono />
                        </div>
                        <h3 style={{ color: '#521F84', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                            ¿Estás segura?
                        </h3>
                        <p style={{ color: '#9C66D4', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1.8rem' }}>
                            Vas a borrar {seleccionados.length} producto{seleccionados.length > 1 ? 's' : ''}... ¡no hay vuelta atrás! 
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <button
                                onClick={() => setModalBorrar(false)}
                                style={{
                                    flex: 1, padding: '10px', borderRadius: '12px',
                                    border: '1.5px solid #e0c5f2', background: 'white',
                                    color: '#9C66D4', fontFamily: "'Quicksand', sans-serif",
                                    fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmarBorrado}
                                style={{
                                    flex: 1, padding: '10px', borderRadius: '12px',
                                    border: 'none', background: 'linear-gradient(135deg, #7b3fa0, #9C66D4)',
                                    color: 'white', fontFamily: "'Quicksand', sans-serif",
                                    fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                                    boxShadow: '0 4px 15px rgba(156,102,212,0.4)',
                                }}
                            >
                                Sí, borrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GestionInventario;
