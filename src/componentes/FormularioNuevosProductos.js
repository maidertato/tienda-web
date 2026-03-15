import React, { useState, useRef } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { DIVISA, crearNuevoProducto } from '../tienda/tienda.js';

const FormularioNuevosProductos = ({ onAgregarProducto, deshabilitado }) => {
    const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
    
    const [formData, setFormData] = useState({
        tipo: '',
        nombre: '',
        precio: '',
        descripcion: '',
        material: '',
        tipoJuguete: '',
        tipoAlimento: '',
        tipoAccesorio: '',
        categoria: '',
        estilo: ''
    });
    const [file, setFile] = useState(null);
    const [alerta, setAlerta] = useState({ visible: false, texto: "", tipo: "" });
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const mostrarAlerta = (texto, tipo) => {
        setAlerta({ visible: true, texto, tipo });
        setTimeout(() => 
            setAlerta({ 
                visible: false, texto: "", tipo: "" 
            }), 3000);
    };

    const renderCampoDinamico = () => {
        const configExtra = {
            'Mobiliario': { label: 'Material', name: 'material', ph: 'Ej: Madera, Roble...' },
            'Juguete': { label: 'Tipo de Juguete', name: 'tipoJuguete', ph: 'Ej: Peluche, Cuerda...' },
            'Alimentacion': { label: 'Tipo Alimento', name: 'tipoAlimento', ph: 'Ej: Snack, Pienso...' },
            'Accesorios': { label: 'Tipo de Mascota', name: 'estilo', ph: 'Ej: Perro, Gato...' },
            'Cabello': { label: 'Estilo', name: 'categoria', ph: 'Ej: Pop, Moderno...' },
            'Merchandising': { label: 'Parte del Cuerpo', name: 'parteDelCuerpo', ph: 'Ej: Cabeza, Patas...' }
        };

        const config = configExtra[formData.tipo];
        if (!config) return null;

        return (
            <div className="mb-3 animate__animated animate__fadeIn">
                <label className="form-label fw-bold">{config.label}</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name={config.name} 
                    value={formData[config.name]} 
                    onChange={handleChange} 
                    placeholder={config.ph} 
                    required 
                    disabled={deshabilitado} 
                />
            </div>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //Offline
        if (deshabilitado) {
            mostrarAlerta("El formulario está deshabilitado", "danger");
            return;
        }


        

        if (!formData.tipo) {
            mostrarAlerta("Escoge un tipo", "danger");
            return;
        }

        let imagenUrl = null;
        if (file) {
            imagenUrl = URL.createObjectURL(file); // Esto crea una ruta tipo blob:http://...
        }

        const precioNum = parseFloat(formData.precio);
        const nuevoProducto = {
            id: "prod-" + Date.now(),
            ...formData,
            precio: precioNum,
            imagen: imagenUrl
        };

        try {
            const productoInstanciado = crearNuevoProducto(formData.tipo, nuevoProducto);
            if (productoInstanciado) {
                onAgregarProducto(formData.tipo, productoInstanciado);
                mostrarAlerta("¡Producto añadido!", "success");

                // Reset del formulario
                setFormData({
                    tipo: '',
                    nombre: '',
                    precio: '',
                    descripcion: '',
                    material: '',
                    tipoJuguete: '',
                    tipoAlimento: '',
                    tipoAccesorio: '',
                    categoria: '',
                    estilo: ''
                });
                setFile(null);

                if (fileInputRef.current) {
                    fileInputRef.current.value = ""; 
                }

                const primerInput = document.querySelector('#form-producto [name="tipo"]');
                if (primerInput) primerInput.focus();

            } else {
                mostrarAlerta("Error. No se pudo crear el producto", "danger");
            }
        } catch (error) {
            mostrarAlerta("Error al añadir el producto", "danger");
        }
    };

    return (
        <div className="formulario-wrapper">
            <h3 className="text-center mb-3">Añadir Productos</h3>
            <form id="form-producto" onSubmit={handleSubmit}>
                
                {/* Tipo de Producto */}
                <div className="mb-3">
                    <label className="form-label">Tipo de Producto</label>
                    <select name="tipo" className="form-select" value={formData.tipo} onChange={handleChange} required disabled={deshabilitado}>
                        <option value="">Escoge un tipo</option>
                        <option value="Mobiliario">Mobiliario</option>
                        <option value="Cabello">Cabello</option>
                        <option value="Juguete">Juguete</option>
                        <option value="Merchandising">Merchandising</option>
                        <option value="Alimentacion">Alimentación</option>
                        <option value="Accesorios">Accesorios</option>
                    </select>
                </div>

                {/* Nombre */}
                <div className="mb-3">
                    <label className="form-label">Nombre del Producto</label>
                    <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Pelota de goma" required disabled={deshabilitado} />
                </div>

                {/* Precio */}
                <div className="mb-3">
                    <label className="form-label">Precio ({DIVISA})</label>
                    <input type="number" className="form-control" name="precio" value={formData.precio} onChange={handleChange} onKeyDown={(e) => { if (["e","E","+","-"].includes(e.key)) e.preventDefault(); }} step="0.01" min="0" placeholder="0.00" required disabled={deshabilitado} />
                </div>


                {/* Descripción */}
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea className="form-control" name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Describe tu producto..." rows="2" disabled={deshabilitado}></textarea>
                </div>

                {renderCampoDinamico()}

                {/* Imagen upload */}
                <div className="mb-3">
                    <label className="form-label text-white">Imagen del Producto</label>
                    <input type="file" ref={fileInputRef} className="form-control" accept="image/*" disabled={deshabilitado} onChange={(e) => e.target.files && setFile(e.target.files[0])} />
                </div>

                {/* Imagen D&D */}
                <div className="mb-4">
                    <label className="form-label">O arrastra la imagen aquí</label>

                    <FileUploader
                        handleChange={(file) => setFile(file)}
                        name="file"
                        types={fileTypes}
                        disabled={deshabilitado}
                        onDraggingStateChange={setIsDragging}
                        hoverTitle=" "
                        dropMessageStyle={{ display: 'none' }}
                        classes="w-100" // Esto asegura que la librería ocupe el 100%
                    >
                        <div
                            /* Combinamos tus clases dinámicamente */
                            className={`drop-zone-style ${isDragging ? "hover" : ""} ${file ? "drop-zone-active" : ""} ${deshabilitado ? "offline-mode" : ""}`}
                            style={{
                                width: "100%",
                                minHeight: "100px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: deshabilitado ? "not-allowed" : "pointer"
                            }}
                        >
                            {file ? (
                                <span className="success-message">✓ {file.name}</span>
                            ) : (
                                <p className="m-0" style={{ pointerEvents: 'none' }}>
                                    {deshabilitado 
                                        ? "Subida deshabilitada (Sin conexión)" 
                                        : (isDragging ? "¡Suelta la imagen!" : "Arrastra o haz clic para subir imagen")
                                    }
                                </p>
                            )}
                        </div>
                    </FileUploader>
                </div>
                {/* Submit Button */}
                <button type="submit" className="btn btn-custom w-100" disabled={deshabilitado}>
                    {deshabilitado ? "Sin conexión" : "+ Subir Producto"}
                </button>

                {alerta.visible && (
                    <div className={`alert alert-${alerta.tipo} mt-3`}>{alerta.texto}</div>
                )}
            </form>
        </div>
    );
};

export default FormularioNuevosProductos;