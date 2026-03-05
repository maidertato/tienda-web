import React, { useState, useMemo } from 'react';
import { inventario, obtenerAtributoExtra } from './tienda/tienda.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [productos, setProductos] = useState(inventario);
  const [carrito, setCarrito] = useState(new Map());
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all");
  const [precioMax, setPrecioMax] = useState(100);
  const [variantesState, setVariantesState] = useState({});

  const productosPorPagina = 6;

  // --- LÓGICA DE FILTRADO ---
  const productosFiltrados = useMemo(() => {
    return productos.filter(p => {
      const nombreNorm = p.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const busquedaNorm = busqueda.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const coincideTexto = nombreNorm.includes(busquedaNorm);
      const coincidePrecio = p.precio <= precioMax;
      const coincideCat = categoriaSeleccionada === "all" || 
                          p.tipo?.toLowerCase() === categoriaSeleccionada.toLowerCase();
      return coincideTexto && coincidePrecio && coincideCat;
    });
  }, [productos, busqueda, categoriaSeleccionada, precioMax]);

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const inicio = (paginaActual - 1) * productosPorPagina;
  const productosVisibles = productosFiltrados.slice(inicio, inicio + productosPorPagina);

  const cambiarVariante = (id, direccion, totalVariantes) => {
    setVariantesState(prev => {
      const actual = prev[id] || 0;
      const siguiente = (actual + direccion + totalVariantes) % totalVariantes;
      return { ...prev, [id]: siguiente };
    });
  };

  const agregarAlCarrito = (producto) => {
    const idx = variantesState[producto.id] || 0;
    const variante = producto.variantes?.[idx];
    const clave = variante ? `${producto.id}_${variante.nombre}` : producto.id;
    setCarrito(prev => {
      const nuevo = new Map(prev);
      if (nuevo.has(clave)) {
        const item = nuevo.get(clave);
        if (item.cantidad < 20) item.cantidad++;
      } else {
        nuevo.set(clave, {
          nombre: variante ? `${producto.nombre} – ${variante.nombre}` : producto.nombre,
          precio: producto.precio,
          imagen: variante ? variante.imagen : producto.imagen,
          cantidad: 1
        });
      }
      return nuevo;
    });
  };

  return (
    <div className="container-fluid py-4 px-5">
      <h1 className="text-center mb-5">Tienda de mascotas</h1>

      <div className="row">
        {/* --- MAIN: PRODUCTOS (8 columnas) --- */}
        <main className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Todos los productos</h2>
            <div className="d-flex gap-2">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Buscar producto..." 
                value={busqueda}
                onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }}
              />
            </div>
          </div>

          <div className="row">
            {productosVisibles.map(p => {
              const vIdx = variantesState[p.id] || 0;
              const varianteAct = p.variantes?.[vIdx];
              const imgAMostrar = varianteAct ? varianteAct.imagen : p.imagen;
              return (
                <div key={p.id} className="col-12 col-lg-6 mb-4">
                  <div className="card h-100 shadow-sm border-0">
                    <div className="position-relative" style={{ height: '250px' }}>
                      <img src={imgAMostrar} className="card-img-top h-100 w-100" style={{ objectFit: 'cover' }} alt={p.nombre} />
                      {p.variantes?.length > 1 && (
                        <div className="position-absolute top-50 w-100 d-flex justify-content-between px-2">
                          <button className="btn btn-light btn-sm rounded-circle" onClick={() => cambiarVariante(p.id, -1, p.variantes.length)}>‹</button>
                          <button className="btn btn-light btn-sm rounded-circle" onClick={() => cambiarVariante(p.id, 1, p.variantes.length)}>›</button>
                        </div>
                      )}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{p.nombre}</h5>
                      <p className="text-primary fw-bold fs-4">{p.precio}€</p>
                      <p className="text-muted small"><strong>{obtenerAtributoExtra(p)}</strong></p>
                      <p className="card-text text-truncate">{p.descripcion}</p>
                      <button className="btn btn-dark w-100" onClick={() => agregarAlCarrito(p)}>🛒 Añadir</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Paginación */}
          {totalPaginas > 1 && (
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination">
                {Array.from({ length: totalPaginas }, (_, i) => (
                  <li key={i} className={`page-item ${paginaActual === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setPaginaActual(i + 1)}>{i + 1}</button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </main>

        {/* --- ASIDE: FORMULARIO (4 columnas) --- */}
        <aside className="col-md-4 ps-4 border-start">
          <div className="p-4 bg-white rounded shadow-sm">
            <h3 className="mb-4">Añadir Productos</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Tipo de Producto</label>
                <select className="form-select" onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
                  <option value="all">Escoge un tipo</option>
                  <option value="Juguete">Juguete</option>
                  <option value="Alimentacion">Alimentación</option>
                  <option value="Mobiliario">Mobiliario</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Precio</label>
                <input type="number" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea className="form-control" rows="3"></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Imagen</label>
                <div className="border border-dashed p-4 text-center text-muted">
                  Arrastra tu imagen aquí
                </div>
              </div>
              <button type="button" className="btn btn-primary w-100">+ Subir Producto</button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;