
import React, { useState, useMemo } from 'react';
import { inventario, obtenerAtributoExtra, DIVISA } from './tienda/tienda.js';
// Importamos Bootstrap (asegúrate de tenerlo instalado)
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // --- ESTADOS (El sustituto de tus variables let) ---
  const [productos, setProductos] = useState(inventario);
  const [carrito, setCarrito] = useState(new Map());
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all");
  const [precioMax, setPrecioMax] = useState(100);
  
  // Para las variantes: { productoId: indiceVariante }
  const [variantesState, setVariantesState] = useState({});

  const productosPorPagina = 6;

  // --- LÓGICA DE FILTRADO (Sustituye a aplicarFiltros) ---
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

  // --- PAGINACIÓN ---
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const inicio = (paginaActual - 1) * productosPorPagina;
  const productosVisibles = productosFiltrados.slice(inicio, inicio + productosPorPagina);

  // --- FUNCIONES DE ACCIÓN ---
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
    <div className="container py-4">
      <h1 className="text-center mb-4">Tienda de mascotas</h1>

      {/* --- BARRA DE FILTROS --- */}
      <div className="row mb-4 g-3">
        <div className="col-md-4">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Buscar producto..." 
            value={busqueda}
            onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }}
          />
        </div>
        <div className="col-md-4">
          <select 
            className="form-select" 
            value={categoriaSeleccionada}
            onChange={(e) => { setCategoriaSeleccionada(e.target.value); setPaginaActual(1); }}
          >
            <option value="all">Todas las categorías</option>
            <option value="Juguete">Juguetes</option>
            <option value="Alimentación">Alimentación</option>
            <option value="Mobiliario">Mobiliario</option>
            <option value="Accesorios">Accesorios</option>
            <option value="Cabello">Cabello</option>
            <option value="Merchandising">Merchandising</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Precio máx: {precioMax}€</label>
          <input 
            type="range" 
            className="form-range" 
            min="0" max="100" 
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
          />
        </div>
      </div>

      {/* --- GRID DE PRODUCTOS --- */}
      <div className="row">
        {productosVisibles.map(p => {
          const vIdx = variantesState[p.id] || 0;
          const varianteAct = p.variantes?.[vIdx];
          const imgAMostrar = varianteAct ? varianteAct.imagen : p.imagen;
          const nombreAMostrar = varianteAct ? `${p.nombre} – ${varianteAct.nombre}` : p.nombre;

          return (
            <div key={p.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm border-0 card-producto">
                <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                  <img 
                    src={imgAMostrar} 
                    className="card-img-top w-100 h-100" 
                    style={{ objectFit: 'cover' }} 
                    alt={p.nombre}
                  />
                  {/* Flechas de variantes */}
                  {p.variantes?.length > 1 && (
                    <>
                      <button className="flecha-izq" onClick={() => cambiarVariante(p.id, -1, p.variantes.length)}>‹</button>
                      <button className="flecha-der" onClick={() => cambiarVariante(p.id, 1, p.variantes.length)}>›</button>
                    </>
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{nombreAMostrar}</h5>
                  <p className="text-primary fw-bold fs-4">{p.precio}€</p>
                  <p className="text-muted small"><strong>{obtenerAtributoExtra(p)}</strong></p>
                  <p className="card-text text-truncate-3">{p.descripcion}</p>
                  <button 
                    className="btn btn-dark w-100 mt-auto"
                    onClick={() => agregarAlCarrito(p)}
                  >
                    🛒 Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- PAGINACIÓN --- */}
      {totalPaginas > 1 && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            {Array.from({ length: totalPaginas }, (_, i) => (
              <li key={i} className={`page-item ${paginaActual === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setPaginaActual(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default App;