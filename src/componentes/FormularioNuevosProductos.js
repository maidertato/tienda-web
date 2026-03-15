import React, { useState } from 'react';
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
            'Alimentacion': { label: 'Categoría Alimento', name: 'tipoAlimento', ph: 'Ej: Snack, Pienso...' },
            'Accesorios': { label: 'Estilo', name: 'estilo', ph: 'Ej: Vintage, Moderno...' },
            'Cabello': { label: 'Categoría', name: 'categoria', ph: 'Ej: Champú, Tinte...' },
            'Merchandising': { label: 'Tipo Accesorio', name: 'tipoAccesorio', ph: 'Ej: Llavero, Taza...' }
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

        const precioNum = parseFloat(formData.precio);
        const nuevoProducto = {
            id: "prod-" + Date.now(),
            ...formData,
            precio: precioNum
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
                    <input type="number" className="form-control" name="precio" value={formData.precio} onChange={handleChange} step="0.01" min="0" placeholder="0.00" required disabled={deshabilitado} />
                </div>


                {/* Descripción */}
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea className="form-control" name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Describe tu producto..." rows="2" disabled={deshabilitado}></textarea>
                </div>

                {renderCampoDinamico()}

                {/* Imagen / FileUploader */}
                <div className="mb-4">
                    <label className="form-label d-block text-white">Imagen del Producto</label>
                    <FileUploader handleChange={(file) => setFile(file)} name="file" types={fileTypes} disabled={deshabilitado}>
                        <div className="drop-zone-custom p-3 border rounded text-center w-100" style={{
                            cursor: deshabilitado ? 'not-allowed' : 'pointer',
                            borderStyle: 'dashed',
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }}>
                            {file ? <span className="text-success">✓ {file.name}</span> : "Arrastra o haz clic para subir imagen"}
                        </div>
                    </FileUploader>
                </div>

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