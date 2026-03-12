import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { DIVISA, crearNuevoProducto } from '../tienda/tienda.js';

const FormularioNuevosProductos = ({ onAgregarProducto, deshabilitado }) => {
    const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

    // Estados
    const [formData, setFormData] = useState({
        tipo: '',
        nombre: '',
        precio: '',
        descripcion: '',
        extra: ''
    });
    const [file, setFile] = useState(null);

    // Alertas
    const [alerta, setAlerta] = useState({ visible: false, texto: "", tipo: "" });
    const mostrarAlerta = (texto, tipo) => {
        setAlerta({ visible: true, texto, tipo });
        setTimeout(() => setAlerta({ visible: false, texto: "", tipo: "" }), 3000);
    };

    // HandleChange unificado
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const extraFieldsMap = {
        Mobiliario: { material: formData.extra },
        Cabello: { estilo: formData.extra },
        Juguete: { tipoJuguete: formData.extra },
        Merchandising: { parteCuerpo: formData.extra },
        Alimentacion: { sabor: formData.extra },
        Accesorios: { tipoMascota: formData.extra }
    };

    const placeholdersExtra = {
        Mobiliario: "ej: Madera",
        Alimentacion: "ej: Sabor Pollo",
        Cabello: "ej: Rizado",
        Juguete: "ej: Peluche",
        Merchandising: "ej: Cabeza",
        Accesorios: "ej: Perro"
    };

    const titulosExtra = {
        Mobiliario: "Material",
        Alimentacion: "Tipo de Alimento",
        Cabello: "Estilo",
        Juguete: "Tipo de Juguete",
        Merchandising: "Parte del cuerpo",
        Accesorios: "Tipo de Mascota"
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (deshabilitado) return;

        if (!formData.tipo) return mostrarAlerta("Debes escoger un tipo de producto", "danger");
        
        const precioNum = parseFloat(formData.precio);
        if (isNaN(precioNum) || precioNum <= 0) return mostrarAlerta("Introduce un precio válido", "danger");

        const nuevoProducto = {
            id: "prod-" + Date.now(),
            nombre: formData.nombre,
            precio: precioNum,
            descripcion: formData.descripcion,
            tipo: formData.tipo, // sin toLowerCase
            ...extraFieldsMap[formData.tipo]
        };

        try {
            // Pasamos tipo en minúsculas para que el switch de tienda.js no falle
            const productoInstanciado = crearNuevoProducto(formData.tipo, nuevoProducto);
            if (productoInstanciado) {
                onAgregarProducto(formData.tipo, productoInstanciado);
                mostrarAlerta("¡Producto añadido con éxito!", "success");
                setFormData({ tipo: '', nombre: '', precio: '', descripcion: '', extra: '' });
                setFile(null);
            } else {
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
                
                <div className="mb-3">
                    <label className="form-label">Tipo de Producto</label>
                    <select
                        name="tipo"
                        className="form-select"
                        value={formData.tipo}
                        onChange={(e) => { handleChange(e); setFormData(prev => ({ ...prev, extra: '' })); }}
                        required
                        disabled={deshabilitado}
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

                <div className="mb-3">
                    <label className="form-label">Nombre del Producto</label>
                    <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Pelota de goma" required disabled={deshabilitado} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Precio ({DIVISA})</label>
                    <input type="number" className="form-control" name="precio" value={formData.precio} onChange={handleChange} onKeyDown={(e) => { if (["e","E","+","-"].includes(e.key)) e.preventDefault(); }} step="0.01" min="0" placeholder="0.00" required disabled={deshabilitado} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea className="form-control" name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Describe tu producto..." rows="3" disabled={deshabilitado}></textarea>
                </div>

                {formData.tipo && placeholdersExtra[formData.tipo] && (
                    <div className="mb-3 animate__animated animate__fadeIn">
                        <label className="form-label fw-bold">{titulosExtra[formData.tipo]}</label>
                        <input type="text" className="form-control" name="extra" value={formData.extra} onChange={handleChange} placeholder={placeholdersExtra[formData.tipo]} required disabled={deshabilitado} />
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label text-white">Imagen del Producto</label>
                    <input type="file" className="form-control" accept="image/*" disabled={deshabilitado} onChange={(e) => e.target.files && setFile(e.target.files[0])} />
                </div>

                <div className="mb-4">
                    <label className="form-label d-block text-white">O arrastra la imagen aquí</label>
                    <FileUploader
                        handleChange={(file) => setFile(file)}
                        name="file"
                        types={fileTypes}
                        hoverTitle="Suelta aquí"
                        classes="w-100"
                        disabled={deshabilitado}
                    >
                        <div className="drop-zone-custom p-3 border rounded text-center w-100" style={{
                            cursor: deshabilitado ? 'not-allowed' : 'pointer',
                            borderStyle: 'dashed',
                            borderColor: deshabilitado ? '#ced4da' : 'rgba(255,255,255,0.7)',
                            backgroundColor: deshabilitado ? '#e9ecef' : 'rgba(255,255,255,0.1)',
                            minHeight: '80px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxSizing: 'border-box',
                            transition: 'background-color 0.3s'
                        }}>
                            {file ? (
                                <div className="animate__animated animate__fadeIn text-center">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="Vista previa"
                                        style={{ maxWidth: '80px', borderRadius: '5px', opacity: deshabilitado ? 0.5 : 1 }}
                                        className="mb-2 d-block mx-auto"
                                    />
                                    <p className="text-success m-0 small fw-bold">{deshabilitado ? "Conexión perdida" : `✓ ${file.name}`}</p>
                                </div>
                            ) : (
                                <p className="m-0" style={{ color: deshabilitado ? '#6c757d' : 'white', opacity: 0.8 }}>
                                    {deshabilitado ? "Formulario deshabilitado" : "Arrastra tu imagen aquí"}
                                </p>
                            )}
                        </div>
                    </FileUploader>
                </div>

                <button type="submit" className="btn btn-custom w-100" disabled={deshabilitado}>
                    {deshabilitado ? "Sin conexión" : "+ Subir Producto"}
                </button>

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