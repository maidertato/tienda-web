import React, { useState, useEffect } from 'react';
// Importamos la lógica de la tienda
import { inventario as inventarioInicial, crearNuevoProducto, guardarEnCarrito, cargarCarrito } from './tienda/tienda';

import Cabecera from './componentes/Cabecera';
import MenuNavegacion from './componentes/MenuNavegacion';
import EscaparateProductos from './componentes/EscaparateProductos';
import FormularioNuevosProductos from './componentes/FormularioNuevosProductos';
import DetallesProducto from './componentes/DetallesProducto';
import Carrito from './componentes/Carrito';
import Pie from './componentes/Pie';

import './App.css';

function App() {
  const [productos, setProductos] = useState(inventarioInicial);
  const [carrito, setCarrito] = useState(cargarCarrito());
  const [paginaActual, setPaginaActual] = useState(1);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const productosPorPagina = 6;

  // Filtrado y Paginación
  const productosFiltrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const ultimoIndice = paginaActual * productosPorPagina;
  const primerIndice = ultimoIndice - productosPorPagina;
  const productosVisibles = productosFiltrados.slice(primerIndice, ultimoIndice);

  const manejarNuevoProducto = (tipo, datos) => {
    const nuevo = crearNuevoProducto(tipo, datos);
    if (nuevo) {
      setProductos([nuevo, ...productos]);
      setPaginaActual(1);
    }
  };

  const manejarAnadirAlCarrito = (producto) => {
    guardarEnCarrito(producto);
    setCarrito(cargarCarrito());
  };

  return (
    <div id="contenedor">
      {/* USO DE COMPONENTES: Siempre con la primera letra en MAYÚSCULA */}
      <Cabecera titulo="🐈 🐦 Tienda de Mascotas 🦮 🐇" />

      <MenuNavegacion cantidadCarrito={carrito.length} />
      
      <div id="contenido" className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-8">
            <EscaparateProductos 
              productos={productosVisibles} 
              totalProductos={productosFiltrados.length}
              paginaActual={paginaActual}
              productosPorPagina={productosPorPagina}
              onBuscar={(texto) => { setBusqueda(texto); setPaginaActual(1); }}
              onCambiarPagina={setPaginaActual}
              onVerDetalle={setProductoSeleccionado}
              onAnadirCarrito={manejarAnadirAlCarrito}
            />
          </div>

          <div className="col-md-4">
            <FormularioNuevosProductos onAgregarProducto={manejarNuevoProducto} />
          </div>
        </div>
      </div>

      <DetallesProducto 
        producto={productoSeleccionado} 
        alCerrar={() => setProductoSeleccionado(null)} 
        alAnadirAlCarrito={manejarAnadirAlCarrito} // Nombre de prop corregido
      />

      <Carrito 
        productosCarrito={carrito} 
        total={carrito.reduce((acc, p) => acc + p.precio, 0)}
        alVaciar={() => { localStorage.clear(); setCarrito([]); }} 
        alEliminar={(id) => {
            // Lógica simple para borrar un item si lo necesitas
            const nuevoCarrito = carrito.filter(item => item.id !== id);
            setCarrito(nuevoCarrito);
            localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
        }}
      />

      <Pie contenido="© Dawidawe taldea - Proyecto React" />
    </div>
  );
}

export default App;