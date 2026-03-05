import React, { useState, useEffect } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { 
  inventario as productosIniciales, 
  DIVISA, 
  crearNuevoProducto,
  obtenerAtributoExtra 
} from './tienda/tienda';
import './App.css';

function App() {
  // 1. ESTADO: Persistencia corregida con reinstanciación de clases
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('productos_tienda');
    if (guardados) {
      try {
        const datosPlanos = JSON.parse(guardados);
        // IMPORTANTE: Convertimos los objetos planos de vuelta a instancias de Clase
        return datosPlanos.map(p => crearNuevoProducto(p.tipo, p));
      } catch (e) {
        console.error("Error cargando localStorage", e);
        return productosIniciales;
      }
    }
    return productosIniciales;
  });

  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [file, setFile] = useState(null);

  // 2. EFECTO: Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem('productos_tienda', JSON.stringify(productos));
  }, [productos]);

  // 3. EFECTO: Detector de conexión (Requisito 3.2 - Figura 1)
  useEffect(() => {
    const handleStatusChange = () => setIsOffline(!navigator.onLine);

    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  // 4. MANEJADOR: Alta de productos
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOffline) return; // Bloqueo de seguridad

    const fd = new FormData(e.target);
    
    // Generar URL temporal si hay archivo, si no usar una por defecto
    let rutaImagen = 'imagenes/productos/default.png';
    if (file) {
      rutaImagen = URL.createObjectURL(file);
    }

    const datos = {
      nombre: fd.get('productName'),
      precio: parseFloat(fd.get('productPrice')),
      descripcion: fd.get('productDescription'),
      imagen: rutaImagen,
      extra: fd.get('extra'),
      tipo: fd.get('tipo') // Aseguramos capturar el tipo para crearNuevoProducto
    };

    const nuevo = crearNuevoProducto(datos.tipo, datos);
    if (nuevo) {
      setProductos(prev => [nuevo, ...prev]); // Añadimos al principio
      e.target.reset();
      setFile(null); // Limpiar el estado del FileUploader
    }
  };

  return (
    <div id="contenedor">
      {/* Requisito 3.2 - Figura 1: Señalización offline */}
      {isOffline && (
        <div className="offline-badge">
          Estás offline
        </div>
      )}

      <header className="py-3 bg-light shadow-sm mb-4">
        <h1 className="text-center m-0">🐈 🐦 Tienda de Mascotas 🦮 🐇</h1>
      </header>

      <div id="contenido" className="container-fluid">
        <div className="row">
          {/* MAIN: LISTA DE PRODUCTOS */}
          <main className="col">
            <div className="row row-cols-1 row-cols-md-3 g-4 px-3">
              {productos.map((p, index) => (
                <div key={p.id || index} className="col">
                  <div className="card h-100 shadow-sm border-0">
                    <div className="d-flex justify-content-center align-items-center bg-white" style={{ height: '200px' }}>
                      <img src={p.imagen} className="card-img-top" alt={p.nombre} style={{ 
                          maxHeight: '100%', 
                          maxWidth: '90%', 
                          objectFit: 'contain',
                          padding: '15px'
                        }} 
                      />
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{p.nombre}</h5>
                      <p className="card-text small text-muted flex-grow-1">
                        {p.descripcion ? p.descripcion.substring(0, 80) + "..." : "Sin descripción"}
                      </p>
                      {/* Uso de obtenerAtributoExtra corregido gracias a la reinstanciación */}
                      <p className="small fw-bold text-secondary mb-2">
                        {obtenerAtributoExtra(p)}
                      </p>
                      <div className="mt-auto pt-3 border-top">
                        <p className="fw-bold fs-5 mb-1 text-primary">{p.precio}{DIVISA}</p>
                        <span className="badge bg-info text-dark mb-3">{p.tipo}</span>
                        <button className="btn btn-dark w-100 py-2">🛒 Añadir al carrito</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* ASIDE: FORMULARIO (Requisito 3.1 y 3.2) */}
          <aside className="col-lg-3 col-md-4 ms-4">
            <div className="p-4 bg-white rounded shadow-sm border">
              <h3 className="text-center mb-4">Nuevo Producto</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Categoría</label>
                  <select name="tipo" className="form-select" required disabled={isOffline}>
                    <option value="">Escoge tipo...</option>
                    <option value="juguete">Juguete</option>
                    <option value="alimentacion">Alimentación</option>
                    <option value="mobiliario">Mobiliario</option>
                    <option value="cabello">Cabello</option>
                    <option value="merchandising">Merchandising</option>
                    <option value="accesorios">Accesorios</option>
                  </select>
                </div>

                <div className="mb-3">
                  <input type="text" name="productName" className="form-control" placeholder="Nombre" required disabled={isOffline} />
                </div>
                
                <div className="mb-3">
                  <div className="input-group">
                    <input type="number" name="productPrice" className="form-control" placeholder="Precio" step="0.01" required disabled={isOffline} />
                    <span className="input-group-text">{DIVISA}</span>
                  </div>
                </div>

                {/* Input para el dato extra capturado en handleSubmit */}
                <div className="mb-3">
                  <input type="text" name="extra" className="form-control" placeholder="Dato extra (Material, Estilo...)" disabled={isOffline} />
                </div>

                <div className="mb-3">
                  <textarea name="productDescription" className="form-control" placeholder="Descripción breve..." rows="3" disabled={isOffline}></textarea>
                </div>

                {/* Requisito 3.1 - React Drag & Drop */}
                <div className="mb-4">
                  <label className="form-label fw-bold">Imagen del producto</label>
                  <FileUploader
                    handleChange={(f) => setFile(f)}
                    name="file"
                    types={["JPG", "PNG", "GIF"]}
                    hoverTitle="Suelta la imagen" // Requisito 3.1
                    label="" // Sin mensaje inicial
                    disabled={isOffline} //
                  >
                    {/* Requisito 3.2 - Estética offline */}
                    <div className="drop-zone-custom" 
                         style={{ 
                           backgroundColor: isOffline ? '#eeeeee' : '#f8f9fa',
                           cursor: isOffline ? 'not-allowed' : 'pointer',
                           border: '2px dashed #ccc',
                           padding: '20px',
                           textAlign: 'center'
                         }}>
                      <p className="m-0 small">
                        {isOffline ? "Campo deshabilitado" : file ? `Cargado: ${file.name}` : "Arrastra tu imagen aquí"}
                      </p>
                    </div>
                  </FileUploader>
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold py-2" disabled={isOffline}>
                  + Subir Producto
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;