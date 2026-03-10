import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files"; 
import { DIVISA, crearNuevoProducto } from '../tienda/tienda.js';

const FormularioNuevosProductos = ({ onAgregarProducto }) => {
    const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];    
    
    // Estados
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [tipo, setTipo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [extra, setExtra] = useState("");
    const [file, setFile] = useState(null);

    // Alertas
    const [alerta, setAlerta] = useState({ visible: false, texto: "", tipo: "" });
    
    const mostrarAlerta = (texto, tipo) => {
        setAlerta({ visible: true, texto, tipo });
        setTimeout(() => {
            setAlerta({ visible: false, texto: "", tipo: "" });
        }, 3000);
    };

    // Mapeo dinámico
    const placeholdersExtra = {
        Mobiliario: "ej: Madera",
        Alimentacion: "ej: Sabor Pollo",
        Cabello: "ej: Rizado",
        Juguete: "ej: Peluche",
        Merchandising: "ej: Cabeza",
        Accesorios: "ej: Perro"
    };

    // El que se muestra en el aside (form)
    const titulosExtra = {
        Mobiliario: "Material",
        Alimentacion: "Tipo de Alimento",
        Cabello: "Estilo",
        Juguete: "Tipo de Juguete",
        Merchandising: "Categoría",
        Accesorios: "Tipo de Mascota"
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!tipo) {
            mostrarAlerta('Debes escoger un tipo de producto', 'danger');
            return;
        }

        // Error de precio
        const precioNum = parseFloat(precio);
        if (isNaN(precioNum) || precioNum <= 0) {
            mostrarAlerta("Introduce un precio válido", "danger");
            return;
        }

        if (file && !file.type.startsWith("image/")) {
        mostrarAlerta("El archivo debe ser una imagen", "danger");
        return;
        }
        
        const nuevoProducto = {
            id: "prod-" + Date.now(),
            nombre,
            precio: parseFloat(precio),
            descripcion,
            tipo,
            imagen: file ? URL.createObjectURL(file) : 'imagenes/productos/default.png',
            extra: extra
        };
        try {
            const productoInstanciado = crearNuevoProducto(tipo.toLowerCase(), nuevoProducto);

            if (productoInstanciado) {
                onAgregarProducto(tipo, productoInstanciado);
                mostrarAlerta("¡Producto añadido con éxito!", "success");

                // Limpiar el formulario
                setNombre(""); setPrecio(""); setDescripcion(""); 
                setExtra(""); setFile(null); setTipo("");
            } else {
                // Si llega aquí es porque crearNuevoProducto devolvió null o false
                mostrarAlerta("Error: No se pudo crear el producto", "danger");
            }
        } catch (error) {
            console.error(error);
            mostrarAlerta("Error al añadir el producto", "danger");
        }
    };

    return (
        <div className="formulario-wrapper">
            <h3 className="text-center mb-3">Añadir Productos</h3>
            <form id="form-producto" onSubmit={handleSubmit}>
                
                {/* Tipo de producto */}
                <div className="mb-3">
                    <label className="form-label">Tipo de Producto</label>
                    <select 
                        className="form-select" 
                        value={tipo} 
                        onChange={(e) => {
                            setTipo(e.target.value);
                            setExtra(""); // Limpiar extra al cambiar
                        }}
                        required 
                    >
                        <option value="">Escoge un tipo</option>
                        <option value="Mobiliario">Mobiliario</option>
                        <option value="Cabello">Cabello</option>
                        <option value="Juguete">Juguete</option>
                        <option value="Merchandising">Merchandising</option>
                        <option value="Alimentacion">Alimentación</option>
                        <option value="Accesorios">Accesorios</option>
                    </select>
                </div>

                {/*  Nombre del Producto  */}
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

                {/* Precio */}
                <div className="mb-3">
                    <label className="form-label">Precio ({DIVISA})</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        step="0.01" 
                        min="0"
                        placeholder="0.00"
                        required 
                    />
                </div>

                {/* Descripción */}
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

                {/* Campo Extra  (Solo si hay tipo) */}
                {tipo && placeholdersExtra[tipo] && (
                    <div className="mb-3 animate__animated animate__fadeIn">
                        <label className="form-label fw-bold">
                            {titulosExtra[tipo] || "Dato Extra"}</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={extra}
                            onChange={(e) => setExtra(e.target.value)}
                            placeholder={placeholdersExtra[tipo]} 
                            required 
                        />
                    </div>
                )}

                {/* 6. Imagen */}
                <div className="mb-4">
                    <label className="form-label">Imagen del Producto</label>
                    <div className="custom-drag-drop">
                        <FileUploader
                            handleChange={(file) => setFile(file)}
                            name="file"
                            types={fileTypes}
                            label="Arrastra o haz clic aquí"
                            hoverTitle="Suelta la imagen"
                        >
                            <div className="drop-zone-content p-4 border rounded text-center bg-light" style={{cursor: 'pointer'}}>
                                {file ? (
                                    <p className="text-success m-0 fw-bold">✓ {file.name}</p>
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

                {/* Alerta de feedback */}
                {alerta.visible && (
                    <div className={`alert alert-${alerta.tipo} mt-3 animate__animated animate__fadeIn`}>
                        {alerta.texto}
                    </div>
                )}
            </form>
        </div>
    );
};

export default FormularioNuevosProductos;