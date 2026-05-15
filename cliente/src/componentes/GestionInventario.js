import React, { useState } from 'react';
import FormularioNuevosProductos from './FormularioNuevosProductos';

const GestionInventario = ({ productos, alEliminarVarios, alActualizarProducto }) => {
    const [seleccionados, setSeleccionados] = useState([]);
    const [editandoId, setEditandoId] = useState(null); // Guarda el ID del producto que se está editando

    
    const toggleSeleccion = (id) => {
        setSeleccionados(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const manejarBorradoMasivo = () => {
        if (seleccionados.length > 0) {
            alEliminarVarios(seleccionados);
            setSeleccionados([]);
        }
    };

    return (
        <div style={{ fontFamily: "'Quicksand', sans-serif", padding: '1.5rem' }}>

            {/* Cabecera */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '1rem' }}>

                <button
                    onClick={manejarBorradoMasivo}
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
        </div>
    );
};

export default GestionInventario;
