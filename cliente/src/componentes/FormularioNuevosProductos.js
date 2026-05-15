import React, { useState, useRef, useEffect } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { DIVISA } from '../tienda/tienda.js';

const FormularioNuevosProductos = ({ onAgregarProducto, deshabilitado, productoAEditar, esEdicion, onGuardarCambios }) => {
    const fileTypes = ["jpg", "png", "jpeg"];
    const [formData, setFormData] = useState({
        tipo: productoAEditar?.tipo || '',
        nombre: productoAEditar?.nombre || '',
        precio: productoAEditar?.precio || '',
        descripcion: productoAEditar?.descripcion || '',
        material: productoAEditar?.material || '',
        categoriajuguete: productoAEditar?.categoriajuguete || '',
        tipoAlimento: productoAEditar?.tipoAlimento || '',
        tipoMascota: productoAEditar?.tipoMascota || '',
        categoria: productoAEditar?.categoria || '',
        estilo: productoAEditar?.estilo || ''
    });
    const [file, setFile] = useState(null);
    const [alerta, setAlerta] = useState({ visible: false, texto: "", tipo: "" });
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [errorPrecio, setErrorPrecio] = useState('');

    const handlePrecio = (e) => {
        const valor = e.target.value;
        setFormData(prev => ({ ...prev, precio: valor }));
        if (valor > 200) {
            setErrorPrecio('El precio no puede superar los 200€');
        } else {
            setErrorPrecio('');
        }
    };

    useEffect(() => {
        if (productoAEditar) {
            setFormData({ ...productoAEditar, tipo: productoAEditar.tipo || '' });
        } else {
            setFormData({
            tipo: '', nombre: '', precio: '', descripcion: '', material: '',
            categoriajuguete: '', tipoAlimento: '', tipoMascota: '', categoria: '', estilo: ''
        });
        }
    }, [productoAEditar]);

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

    const handleFile = (archivo) => {
        if (!archivo) return;
        // Si ya hay imagen
        if (file) {
            mostrarAlerta("Ya hay una imagen seleccionada. No puedes subir otra.", "danger");
            return;
        }
        // Validar formato
        const extension = archivo.name.split(".").pop().toLowerCase();
        if (!fileTypes.includes(extension)) {
            mostrarAlerta(
                "Formato no válido. La imagen debe ser JPG, JPEG o PNG.",
                "danger"
            );
            return;
        }
        setFile(archivo);
    };

    const renderCampoDinamico = () => {
        if (esEdicion) return null;
        const configExtra = {
            'Mobiliario': { label: 'Material', name: 'material', ph: 'Ej: Madera, Roble...' },
            'Juguete': { label: 'Tipo de Juguete', name: 'categoriajuguete', ph: 'Ej: Peluche, Cuerda...' },
            'Alimentacion': { label: 'Tipo Alimento', name: 'tipoAlimento', ph: 'Ej: Snack, Pienso...' },
            'Accesorios': { label: 'Tipo de Mascota', name: 'tipoMascota', ph: 'Ej: Perro, Gato...' },
            'Cabello': { label: 'Estilo', name: 'estilo', ph: 'Ej: Pop, Moderno...' },
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
                    value={formData[config.name] || ''}
                    onChange={handleChange}
                    placeholder={config.ph}
                    required
                    disabled={deshabilitado}
                />
            </div>
        );
    };

    const handleSubmit = (e) => { // Errores usando metodo centralizado
        e.preventDefault();
        const tipoFinal = formData.tipo || productoAEditar?.tipo;
        
        if (!tipoFinal) {
        mostrarAlerta("Escoge un tipo", "danger");
        return;
    }
        //Offline
        if (deshabilitado) {
            mostrarAlerta("El formulario está deshabilitado", "danger");
            return;
        }

        if (!formData.tipo) {
            mostrarAlerta("Escoge un tipo", "danger");
            return;
        }

        if (formData.precio > 200) {
            setErrorPrecio('El precio no puede superar los 200€');
            return;
        }

        let imagenUrl = file ? URL.createObjectURL(file) : (productoAEditar?.imagen || process.env.PUBLIC_URL + "/imagenes/productos/default.png");

        const datosActualizados = {
            ...formData,
            id: productoAEditar?.id,
            tipo: tipoFinal,
            precio: parseFloat(formData.precio),
            imagen: imagenUrl
        };

        if (esEdicion) {
            onGuardarCambios(datosActualizados);
            mostrarAlerta("¡Cambios guardados!", "success");
        } else {
            const nuevoProducto = {
                ...datosActualizados,
                id: "prod-" + Date.now()
            };
            onAgregarProducto(formData.tipo, nuevoProducto);
            mostrarAlerta("¡Producto añadido!", "success");
            // Reset del formulario
            setFormData({
                tipo: '',
                nombre: '',
                precio: '',
                descripcion: '',
                material: '',
                categoriajuguete: '',
                tipoAlimento: '',
                tipoMascota: '',
                categoria: '',
                estilo: ''
            });
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };



    return (
        <div className={`formulario-wrapper ${deshabilitado ? "offline-mode" : ""}`}> {/* cuando deshabilitado = true --> se ponen todos gris (heredan todos)*/}
            <h3 className="text-center mb-3">
                {esEdicion ? `Editando: ${productoAEditar.nombre}` : "Añadir Productos"}
            </h3>
            <form id="form-producto" onSubmit={handleSubmit}>

                {/* Tipo de Producto */}
                <div className="mb-3">
                    <label className="form-label">Tipo de Producto</label>
                    <select name="tipo" className="form-select" value={formData.tipo} onChange={handleChange} required disabled={deshabilitado || esEdicion} >
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
                    <input
                        type="number"
                        className="form-control"
                        name="precio"
                        value={formData.precio}
                        onChange={handlePrecio}
                        required
                        disabled={deshabilitado}
                        onKeyDown={(e) => { if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault(); }}
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                    />
                    {errorPrecio && (
                        <p style={{
                            margin: '6px 0 0',
                            padding: '5px 10px',
                            background: 'rgba(219, 62, 62, 0.15)',
                            border: '1px solid rgba(255, 100, 100, 0.5)',
                            borderRadius: '8px',
                            color: '#e45858',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            fontFamily: "'Quicksand', sans-serif",
                        }}>
                            {errorPrecio}
                        </p>
                    )}
                </div>


                {/* Descripción */}
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea className="form-control" disabled={deshabilitado} name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Describe tu producto..." rows="2"></textarea>
                </div>

                {renderCampoDinamico()}

                {/* Imagen upload */}
                <div className="mb-3">
                    <label className="form-label text-white">Imagen del Producto {esEdicion && "(deja vacío para mantener la actual)"}</label>
                    <input type="file" ref={fileInputRef} className="form-control" accept=".jpg, .jpeg, .png" disabled={deshabilitado} onChange={(e) => {
                        const archivos = e.target.files;
                        if (!archivos || archivos.length === 0) return;
                        if (archivos.length > 1) {
                            mostrarAlerta("Solo puedes subir un archivo", "danger");
                            e.target.value = "";
                            return;
                        }
                        handleFile(archivos[0]);
                    }}
                    />
                </div>

                {/* Imagen D&D */}
                <div className="mb-4">
                    <label className="form-label">O arrastra la imagen aquí</label>
                    <FileUploader
                        handleChange={(file) => handleFile(file)}
                        name="file"
                        types={fileTypes}
                        disabled={deshabilitado}
                        onDraggingStateChange={setIsDragging}
                        onTypeError={() =>
                            mostrarAlerta("Formato no válido. La imagen debe ser JPG, JPEG o PNG.", "danger")
                        }
                        /* Limpiamos textos por defecto de la librería */
                        hoverTitle=" "
                        dropMessageStyle={{ display: 'none' }}
                        classes="w-100"
                    >
                        <div
                            className={`drop-zone-style ${isDragging ? "is-dragging" : ""} ${file ? "drop-zone-active" : ""} ${deshabilitado ? "offline-mode" : ""}`}
                            style={{
                                width: "100%",
                                minHeight: "100px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: deshabilitado ? "not-allowed" : "pointer",
                                border: "2px dashed #ccc"
                            }}
                        >
                            {isDragging ? (
                                <p className="m-0">Suelta la imagen</p>
                            ) : file ? (
                                <span className="success-message">✓ {file.name}</span>
                            ) : deshabilitado ? (
                                <p className="m-0">Estas sin conexión</p>
                            ) : null
                            }
                        </div>
                    </FileUploader>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={deshabilitado}
                    style={esEdicion ? {
                        width: '100%',
                        marginTop: '6px',
                        background: deshabilitado ? 'rgba(255,255,255,0.3)' : 'white',
                        color: deshabilitado ? 'rgba(255,255,255,0.5)' : '#9C66D4',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '11px',
                        fontFamily: "'Quicksand', sans-serif",
                        fontWeight: 800,
                        fontSize: '0.92rem',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        cursor: deshabilitado ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: deshabilitado ? 'none' : '0 4px 16px rgba(0,0,0,0.15)',
                        transition: 'all 0.25s',
                    } : {}}
                    className={!esEdicion ? 'btn btn-custom w-100' : ''}
                >
                    {esEdicion ? (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                                <polyline points="17 21 17 13 7 13 7 21"/>
                                <polyline points="7 3 7 8 15 8"/>
                            </svg>
                            Guardar cambios
                        </>
                    ) : (deshabilitado ? "+ SUBIR PRODUCTO" : "+ Subir Producto")}
                </button>

                {alerta.visible && (
                    <div className={`alert alert-${alerta.tipo} mt-3`}>{alerta.texto}</div>
                )}
            </form>
        </div>
    );
};

    export default FormularioNuevosProductos;
