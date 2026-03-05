import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files"; // Librería requerida

// Recibe 'isOffline' como prop desde App.js para manejar el bloqueo
const FormularioProducto = ({ isOffline, onAgregarProducto }) => {
    const fileTypes = ["JPG", "PNG", "GIF"];
    
    // Estados para los campos del formulario
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [tipo, setTipo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [extra, setExtra] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isOffline) return; // Doble seguridad: no enviar si está offline

        const nuevoDoc = {
            nombre,
            precio: parseFloat(precio),
            descripcion,
            tipo,
            extra,
            imagen: file ? URL.createObjectURL(file) : 'imagenes/productos/default.png'
        };

        onAgregarProducto(tipo, nuevoDoc);
        // Limpiar formulario tras subir
        setNombre(""); setPrecio(""); setDescripcion(""); setExtra(""); setFile(null);
    };

    return (
        <aside className="col-auto ms-4">
            <h3 className="text-center mb-3">Añadir Productos</h3>
            <form id="form-producto" onSubmit={handleSubmit}>
                
                {/* Selector de tipo */}
                <div className="mb-3">
                    <label className="form-label">Tipo de Producto</label>
                    <select 
                        className="form-select" 
                        value={tipo} 
                        onChange={(e) => setTipo(e.target.value)}
                        required 
                        disabled={isOffline} // Deshabilitar si está offline
                    >
                        <option value="">Escoge un tipo</option>
                        <option value="mobiliario">Mobiliario</option>
                        <option value="cabello">Cabello</option>
                        <option value="juguete">Juguete</option>
                        <option value="merchandising">Merchandising</option>
                        <option value="alimentacion">Alimentación</option>
                        <option value="accesorios">Accesorios</option>
                    </select>
                </div>

                {/* Nombre y Precio */}
                <div className="mb-3">
                    <label className="form-label">Nombre del Producto</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        disabled={isOffline} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Precio (€)</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        disabled={isOffline} 
                        step="0.01" 
                        required 
                    />
                </div>

                {/* Campo dinámico según el tipo (Atributo Extra) */}
                {tipo && (
                    <div className="mb-3">
                        <label className="form-label">Dato extra ({tipo})</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={extra}
                            onChange={(e) => setExtra(e.target.value)}
                            disabled={isOffline} 
                            placeholder="Ej: Madera, Pequeño, etc."
                        />
                    </div>
                )}

                {/* Drag & Drop Requisito 3.1 */}
                <div className="mb-4">
                    <label className="form-label">Imagen del Producto</label>
                    <div className={`custom-drag-drop ${isOffline ? 'offline-mode' : ''}`}>
                        <FileUploader
                            handleChange={(file) => setFile(file)}
                            name="file"
                            types={fileTypes}
                            disabled={isOffline} // Bloqueado si no hay conexión
                            hoverTitle="Suelta la imagen" // Mensaje al arrastrar
                            label="" // Sin mensaje inicial
                        >
                            {/* Diseño personalizado para cumplir con el requisito de NO usar el de serie */}
                            <div className="drop-zone-content">
                                {file ? (
                                    <p className="text-success m-0">Archivo cargado: {file.name}</p>
                                ) : (
                                    <p className="m-0 text-muted">
                                        {isOffline ? "Subida deshabilitada" : "Arrastra tu imagen aquí"}
                                    </p>
                                )}
                            </div>
                        </FileUploader>
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="btn btn-custom w-100" 
                    disabled={isOffline}
                >
                    + Subir Producto
                </button>
            </form>
        </aside>
    );
};

export default FormularioProducto;