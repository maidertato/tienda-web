import React, { useState, useMemo } from 'react';
import { inventario as inventarioInicial, crearNuevoProducto, guardarEnCarrito, cargarCarrito } from './tienda/tienda';
import './App.css';

// importo de los componentees que pide y que he creado 
import Cabecera from './componentes/Cabecera';
import MenuNavegacion from './componentes/MenuNavegacion';
import EscaparateProductos from './componentes/EscaparateProductos';
import FormularioNuevosProductos from './componentes/FormularioNuevosProductos';
import Pie from './componentes/Pie';
import Carrito from './componentes/Carrito';


function App() {
  // Estados básicos
  const [productos, setProductos] = useState(inventarioInicial);
  const [carrito, setCarrito] = useState(cargarCarrito());
  const [showCarrito, setShowCarrito] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const manejarNuevoProducto = (tipo, datos) => {
    const nuevo = crearNuevoProducto(tipo, datos);
    if (nuevo) {
      setProductos(prevProductos => [...prevProductos, nuevo]);
      setBusqueda("");
    }
  };

  const productosFiltrados = productos.filter(p =>
    p?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const manejarAnadirAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const existe = prevCarrito.find(item => item.id === producto.id);
      
      let nuevoCarrito;
      if (existe) {
        nuevoCarrito = prevCarrito.map(item =>
          item.id === producto.id 
            ? { ...item, cantidad: (item.cantidad || 1) + 1 } 
            : item
        );
      } else {
        nuevoCarrito = [...prevCarrito, { ...producto, cantidad: 1 }];
      }
      
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  };

  const manejarCambiarCantidad = (id, delta) => {
    setCarrito(prevCarrito => {
      const nuevoCarrito = prevCarrito.map(item => {
        if (item.id === id) {
          const nuevaCantidad = (item.cantidad || 1) + delta;
          return { ...item, cantidad: Math.max(1, nuevaCantidad) };
        }
        return item;
      });
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  };

  const manejarEliminarDelCarrito = (id) => {
    setCarrito(prevCarrito => {
      const nuevoCarrito = prevCarrito.filter(item => item.id !== id);
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  };


  return (
    <div className="contenedor">
      {/* 1. Cabecera limpia: Solo recibe el título */}
      <Cabecera titulo="🐱 🦩 Tienda de Mascotas 🐕 🐇" />

      {/* MenuNavegacion */}
      <MenuNavegacion
        cantidadCarrito={carrito.length}
        toggleCarrito={() => setShowCarrito(true)}
      />

      {/* Carrito */}
      <Carrito
        show={showCarrito} 
        alCerrar={()=> setShowCarrito(false)}
        productosCarrito={carrito}
        alEliminar={manejarEliminarDelCarrito}
        onCambiarCantidad={manejarCambiarCantidad}
        alVaciar={() => { localStorage.clear(); setCarrito([]); }}
      />
  

      {/* escaparate + formulario */}
      <div id="contenido" className="container-fluid mt-4">
        <div className="row">
          <main className="col-md-8">
            {/* 2. EscaparateProductos ahora recibe la lógica de búsqueda */}
            <EscaparateProductos
              productos={productosFiltrados}
              onAnadirAlCarrito={manejarAnadirAlCarrito}
              busqueda={busqueda}
              setBusqueda={setBusqueda}
            />
          </main>

          <aside className="col-md-3">
            <FormularioNuevosProductos onAgregarProducto={manejarNuevoProducto}
            />
          </aside>
        </div>
      </div>
      {/* Footer */}
      <Pie contenido="© Dawidawe taldea" />
    </div>
  );
}

export default App;