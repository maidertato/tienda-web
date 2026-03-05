import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";

const FormularioNuevosProductos = ({ onAgregar }) => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [archivo, setArchivo] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre || !precio) return;
        onAgregar({ nombre, precio: parseFloat(precio), descripcion });
        setNombre(''); setPrecio(''); setDescripcion(''); setArchivo(null);
    };

    return (
        <form className="p-3" onSubmit={handleSubmit}>
            <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} className="form-control mb-2"/>
            <input type="number" placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} className="form-control mb-2"/>
            <textarea placeholder="Descripcion" value={descripcion} onChange={e => setDescripcion(e.target.value)} className="form-control mb-2"/>
            <FileUploader handleChange={setArchivo} name="file" types={["JPG","PNG","GIF"]} />
            <button className="btn btn-primary mt-2" type="submit">Agregar Producto</button>
        </form>
    );
};

export default FormularioNuevosProductos;