import React, { useState, useRef } from 'react';
    // Hooks de React:
    // useState --> para guardar datos que cambioan
    // useRef --> Sirve para acceder a cosas del DOM (inputs) ( apunta directamenete a algo)
import { FileUploader } from "react-drag-drop-files";
    // Libreria para arrastrar imagenes
import { DIVISA } from '../tienda/tienda.js';

const FormularioNuevosProductos = ({ onAgregarProducto, deshabilitado }) => {
    // onAgregarProducto --> se ejecuta cuando añado un producto
    // deshabilitado --> si es true, OFFLINE
    const fileTypes = ["jpg", "png", "jpeg"];
    const [formData, setFormData] = useState({ // guardar todos los datos del formulario en un solo estado ( los que pone el usuario)
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
    }); // un oslo objeto que guarda todo


    const [file, setFile] = useState(null); // guarda la imagen que subes
    const [alerta, setAlerta] = useState({ visible: false, texto: "", tipo: "" }); // para mostrar mensajes
    const [isDragging, setIsDragging] = useState(false); // detecta si estas haciendo d&d
    const fileInputRef = useRef(null); // controla el input de archivo 

    const handleChange = (e) => { // Cuando escribes en el input
        const { name, value } = e.target; 
        setFormData(prev => ({ ...prev, [name]: value })); // coge lo que teniamos (..prev) y lo actualiza con el campo que el usuario a tocado
    };
    // (name) mira que campos has cambiado
    // (value) el valor que has puesto
    // setFormat --> actualiza el estado

    const mostrarAlerta = (texto, tipo) => { // metodo de alertas generalizado. 
        setAlerta({ visible: true, texto, tipo });
        setTimeout(() => 
            setAlerta({ 
                visible: false, texto: "", tipo: "" 
            }), 2500);
    };


    const handleFile = (archivo) => { // control de la imagen
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
    // 3 cosas:
        // 1. si hay una iamgen, no deja subir otra
        // 2. si formato no valido, no deja subir
        // 3. si todo correcto, guarda la imagen en el estado 

    const renderCampoDinamico = () => { // depende el tipo  que se escoja, un campo extra u otro
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
                    value={formData[config.name]} 
                    onChange={handleChange} 
                    placeholder={config.ph} 
                    required 
                    disabled={deshabilitado} 
                />
            </div>
        );
        // genera un trozo del html que dependiendo de lo que elija el usuario, cambia
        
    };

    const handleSubmit = (e) => { // Al darle a subir producto
        e.preventDefault();
        //Offline
        if (deshabilitado) {
            mostrarAlerta("El formulario está deshabilitado", "danger");
            return;
        }
        // si no hay tipo de producto
        if (!formData.tipo) {
            mostrarAlerta("Escoge un tipo", "danger");
            return;
        }
        // si el precio introducido mayor 200
        if(formData.precio > 200){
            mostrarAlerta("No se permite añadir un producto que supere los 200€.", "danger");
            return; 
        }   
        // Si hay imagen, usa esa
        // sino la default
        let imagenUrl = file
            ? URL.createObjectURL(file)
            : process.env.PUBLIC_URL + "/imagenes/productos/default.png";
        // Convierte texto -->  numero
        const precioNum = parseFloat(formData.precio);
        // creo objeto producto con id unico, datos del form e imagen
        const nuevoProducto = {
            id: "prod-" + Date.now(),
            ...formData,
            precio: precioNum,
            imagen: imagenUrl
        };
        // le pasas los datos al padre
        onAgregarProducto(formData.tipo, nuevoProducto); // envair producto a tienda.js
            // le paso el tipo (mobiliario...)
            // nuevo producto --> el producto (dato)
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

        if (fileInputRef.current) {
            fileInputRef.current.value = ""; 
        }

        const primerInput = document.querySelector('#form-producto [name="tipo"]');
        if (primerInput) primerInput.focus();
    };

    return (
        <div className={`formulario-wrapper ${deshabilitado ? "offline-mode" : ""}`}> {/* cuando deshabilitado = true --> se ponen todos gris (heredan todos)*/}
            <h3 className="text-center mb-3">Añadir Productos</h3>
            <form id="form-producto" onSubmit={handleSubmit}>
                
                {/* Tipo de Producto */}
                <div className="mb-3">
                    <label className="form-label">Tipo de Producto</label>
                    {/*El tipo qu ele paso a tienda.js */}
                    <select name="tipo" className="form-select" value={formData.tipo} onChange={handleChange} required disabled={deshabilitado} >
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
                    <input type="text" className="form-control"  name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Pelota de goma" required disabled={deshabilitado} />
                </div>

                {/* Precio */}
                <div className="mb-3">
                    <label className="form-label">Precio ({DIVISA})</label>
                    <input type="number" className="form-control"  name="precio" value={formData.precio} onChange={handleChange} required disabled={deshabilitado} 
                        onKeyDown={(e) => { if (["e","E","+","-"].includes(e.key)) e.preventDefault(); }} step="0.01" min="0" placeholder="0.00" /> {/* Para que no permita las e ni nada de eso + que empiece en 0 y que incremente centimo a centimo si usas las flechas */}
                </div>


                {/* Descripción */}
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea className="form-control"  disabled={deshabilitado} name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Describe tu producto..." rows="2"></textarea>
                </div>

                {renderCampoDinamico()}

                {/* Imagen upload */}
                <div className="mb-3">
                    <label className="form-label text-white">Imagen del Producto</label>
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
                <button type="submit" className="btn btn-custom w-100" disabled={deshabilitado}>
                    {deshabilitado ? "+ SUBIR PRODUCTO" : "+ Subir Producto"}
                </button>

                {alerta.visible && (
                    <div className={`alert alert-${alerta.tipo} mt-3`}>{alerta.texto}</div>
                )}
            </form>
        </div>
    );
};

export default FormularioNuevosProductos;