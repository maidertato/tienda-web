import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files"; // Requisito 5.1.7

const FormularioNuevosProductos = ({ onAgregarProducto }) => {
    const fileTypes = ["JPG", "PNG", "GIF"];
    
    // Estados para controlar los inputs (Sin usar el Árbol DOM)
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [tipo, setTipo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [extra, setExtra] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const nuevoProducto = {
            nombre,
            precio: parseFloat(precio),
            descripcion,
            tipo,
            extra,
            // URL temporal para previsualizar la imagen subida
            imagen: file ? URL.createObjectURL(file) : 'imagenes/productos/default.png'
        };

        // 5.1.7: Mantiene la funcionalidad de agregar productos
        onAgregarProducto(tipo, nuevoProducto);

        // Limpiar formulario
        setNombre(""); setPrecio(""); setDescripcion(""); setExtra(""); setFile(null);
    };

    return (
        <aside className="col-auto ms-4">
            <h3 className="text-center mb-3">Añadir Productos</h3>
            <form id="form-producto" onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label className="form-label">Tipo de Producto</label>
                    <select 
                        className="form-select" 
                        value={tipo} 
                        onChange={(e) => setTipo(e.target.value)}
                        required 
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

                <div className="mb-3">
                    <label className="form-label">Nombre del Producto</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej: Pelota de goma"
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
                        step="0.01" 
                        placeholder="0.00"
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea 
                        className="form-control" 
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder="Describe tu producto..."
                        rows="3"
                    ></textarea>
                </div>

                {/* Campo dinámico que aparece según el tipo */}
                {tipo && (
                    <div className="mb-3">
                        <label className="form-label">Dato extra ({tipo})</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={extra}
                            onChange={(e) => setExtra(e.target.value)}
                            placeholder="Ej: Madera, sabor pollo, etc."
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label className="form-label">Imagen del Producto</label>
                    <div className="custom-drag-drop">
                        {/* 5.1.7: Librería React Drag & Drop obligatoria */}
                        <FileUploader
                            handleChange={(file) => setFile(file)}
                            name="file"
                            types={fileTypes}
                            label="Arrastra o haz clic aquí"
                            hoverTitle="Suelta la imagen"
                        >
                            <div className="drop-zone-content p-4 border rounded text-center bg-light">
                                {file ? (
                                    <p className="text-success m-0">✓ {file.name}</p>
                                ) : (
                                    <p className="m-0 text-muted">Arrastra tu imagen aquí</p>
                                )}
                            </div>
                        </FileUploader>
                    </div>
                </div>

                <button type="submit" className="btn btn-custom w-100">
                    + Subir Producto
                </button>
            </form>
        </aside>
    );
};

export default FormularioNuevosProductos;