import React, { useState, useMemo } from 'react';
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
  const [productos, setProductos] = useState([]); 
  const [carrito, setCarrito] = useState(new Map());
  const [showCarrito, setShowCarrito] = useState(false);

  // Probando algun prod
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState("");


  return (
    <div className="contenedor">
      {/* Cabecera */}
      <Cabecera titulo="Mi Tienda de Mascotas" />

      {/* MenuNavegacion */}
      <MenuNavegacion 
        carritoCount={carrito.size} 
        toggleCarrito={() => setShowCarrito(!showCarrito)} 
        isOnline={true} // temporal
      />

      {/* Carrito */}
      {showCarrito && (
        <Carrito 
          carrito={carrito} 
          setCarrito={setCarrito} 
          setShowCarritoProp={setShowCarrito} 
        />
      )}

      {/* escaparate + formulario */}
      <div className="row">
        <main className="col-md-8">
          <EscaparateProductos 
            productos={productos} 
            paginaActual={paginaActual} 
            setPaginaActual={setPaginaActual}
            busqueda={busqueda} 
            setBusqueda={setBusqueda} 
            carrito={carrito}
            setCarrito={setCarrito}
          />
        </main>
        
        {/* Aside */}
        <aside className="col-md-4">
          <FormularioNuevosProductos 
            onProductoAdded={(nuevoProducto) => {
              setProductos(prev => [...prev, nuevoProducto]);
            }}
          />
        </aside>
      </div>
      {/* Footer */}
      <Pie contenido="© Dawidawe taldea" />
    </div>
  );
}

export default App;