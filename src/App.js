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
    const nuevo = crearNuevoProducto(tipo.toLowerCase(), datos);
    if (nuevo) {
      setProductos([...inventarioInicial]);
      setBusqueda("");
    }
  };

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );


  const manejarAnadirAlCarrito = (producto) => {
  setCarrito(prevCarrito => {
    // Buscamos si el producto ya está en el carrito
    const existe = prevCarrito.find(item => item.id === producto.id);
    
    let nuevoCarrito;
    if (existe) {
      // Si existe, mapeamos el carrito y sumamos 1 a la cantidad del producto encontrado
      nuevoCarrito = prevCarrito.map(item =>
        item.id === producto.id 
          ? { ...item, cantidad: (item.cantidad || 1) + 1 } 
          : item
      );
    } else {
      // Si no existe, lo añadimos con cantidad 1
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
        // Evitamos que baje de 1. Si llega a 1 y pulsan "-", no hace nada.
        return { ...item, cantidad: Math.max(1, nuevaCantidad) };
      }
      return item;
    });
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    return nuevoCarrito;
  });
};

  // Función para la PAPELERA (Elimina todo el grupo de ese producto)
  const manejarEliminarDelCarrito = (id) => {
    setCarrito(prevCarrito => {
      // Filtramos para que NO queden productos con ese ID
      const nuevoCarrito = prevCarrito.filter(item => item.id !== id);
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  };


  return (
    <div className="contenedor">
      {/* Cabecera */}
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

            <EscaparateProductos
              productos={productosFiltrados}
              onAnadirAlCarrito={manejarAnadirAlCarrito}
            />
          </main>

          {/* Aside */}
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