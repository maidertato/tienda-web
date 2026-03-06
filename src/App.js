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

  // Probando algun prod
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState("");

  const manejarNuevoProducto = (tipo, datos) => {
    const nuevo = crearNuevoProducto(tipo, datos);
    if (nuevo) {
      setProductos([nuevo, ...productos]);
      setPaginaActual(1);
    }
  };

  const manejarAnadirAlCarrito = (producto) => {
    const nuevoCarrito = [...carrito, producto];
    setCarrito(nuevoCarrito);
    guardarEnCarrito(nuevoCarrito);
  };

  const manejarEliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  return (
    <div className="contenedor">
      {/* Cabecera */}
      <Cabecera titulo="Mi Tienda de Mascotas" />

      {/* MenuNavegacion */}
      <MenuNavegacion 
        cantidadCarrito={carrito.length} 
        toggleCarrito={() => setShowCarrito(!showCarrito)} 
        isOnline={true} // temporal
      />

      {/* Carrito */}
      {showCarrito && (
        <Carrito 
          productosCarrito={carrito} 
          alEliminar={manejarEliminarDelCarrito}
          alVaciar={() => { localStorage.clear(); setCarrito([]); }}
        />
      )}

      {/* escaparate + formulario */}
      <div id="contenido" className="container-fluid mt-4">
        <div className="row">
          <main className="col-md-8">
            <EscaparateProductos 
              productos={productos} 
              onAnadirAlCarrito={manejarAnadirAlCarrito}
            />
          </main>
        
        {/* Aside */}
        <aside className="col-md-4">
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