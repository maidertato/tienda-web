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
        <div className="card shadow p-4 animate__animated animate__fadeIn">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                    className="btn btn-secondary"
                    onClick={manejarBorradoMasivo}
                    disabled={seleccionados.length === 0}
                >
                    Borrar todos los seleccionados
                </button>
            </div>

            <ul className="list-group list-group-flush">
                {productos.map((p) => (
                    <React.Fragment key={p._id}>
                        <li className="list-group-item d-flex align-items-center justify-content-between py-3">
                            <div className="d-flex align-items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={seleccionados.includes(p._id)}
                                    onChange={() => toggleSeleccion(p._id)}
                                />
                                <img src={p.imagen} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                <span>{p.nombre}</span>
                            </div>

                            <button
                                className="btn btn-link text-decoration-none"
                                onClick={() => setEditandoId(editandoId === p._id ? null : p._id)}
                            >
                                {editandoId === p._id ? "Cerrar" : "Editar"}
                            </button>
                        </li>

                        {/* FORMULARIO DE EDICIÓN */}
                        {editandoId === p._id && (
                            <li className="list-group-item bg-light p-4 animate__animated animate__fadeIn">
                                <FormularioNuevosProductos
                                    productoAEditar={p}
                                    esEdicion={true}
                                    onGuardarCambios={(datosActualizados) => {
                                        const productoCompleto = { ...datosActualizados, id: p._id };
                                        alActualizarProducto(productoCompleto);
                                        setEditandoId(null);
                                    }}
                                />
                            </li>
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};

export default GestionInventario;
