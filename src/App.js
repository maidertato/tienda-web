import React, { useState, useMemo, useEffect } from 'react';
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
  // ESTADOS BÁSICOS DE LA APLICACIÓN

  // Lista total de productos (empieza con el inventario de tienda.js)
  const [productos, setProductos] = useState(inventarioInicial);
  // Lista de lo que el usuario ha comprado (carga lo que haya en LocalStorage)
  const [carrito, setCarrito] = useState(cargarCarrito());
  // Controla si el panel lateral del carrito se ve o está escondido
  const [showCarrito, setShowCarrito] = useState(false);
  // El texto que el usuario escribe para filtrar productos
  const [busqueda, setBusqueda] = useState("");
  // Controla en qué página del escaparate estamos
  const [paginaActual, setPaginaActual] = useState(1);

  // Función para resetear la vista al estado original
  const irAInicio = () => {
    setBusqueda("");      // Limpia el buscador
    setPaginaActual(1);   // Vuelve a la página 1
  };

  // Crea un producto nuevo desde el formulario y lo mete en la lista
  const manejarNuevoProducto = (tipo, datos) => {
    const nuevo = crearNuevoProducto(tipo, datos);
    if (nuevo) {
      // Añadimos el nuevo al final de la lista de productos
      setProductos(prevProductos => [...prevProductos, nuevo]);
      setBusqueda("");
    }
  };

  // Filtra los productos en tiempo real según lo que escribas en el buscador
  const productosFiltrados = productos.filter(p =>
    p?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Lógica para añadir cosas a la cesta de la compra
  const manejarAnadirAlCarrito = (producto) => {
    // 1. Buscamos si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
      // 2. Si ya existe, comprobamos si ha llegado al tope de 20
      if (productoExistente.cantidad >= 20) {
        return; // Salimos de la función sin añadir nada
      }

      // 3. Si existe pero tiene menos de 20, incrementamos su cantidad
      const nuevoCarrito = carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCarrito(nuevoCarrito);
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    } else {
      // 4. Si es un producto nuevo, lo añadimos con cantidad 1
      const nuevoCarrito = [...carrito, { ...producto, cantidad: 1 }];
      setCarrito(nuevoCarrito);
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    }
  };

  // Aumenta o disminuye la cantidad de un producto (+1 o -1)
  const manejarCambiarCantidad = (id, delta) => {
    setCarrito(prevCarrito => {
      const nuevoCarrito = prevCarrito.map(item => {
        if (item.id === id) {
          const nuevaCantidad = (item.cantidad || 1) + delta;
          // Math.max evita que la cantidad sea menos de 1
          return { ...item, cantidad: Math.max(1, nuevaCantidad) };
        }
        return item;
      });
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  };

  // Quita un producto del carrito por completo
  const manejarEliminarDelCarrito = (id) => {
    setCarrito(prevCarrito => {
      const nuevoCarrito = prevCarrito.filter(item => item.id !== id);
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  };

  // Calcula cuántos artículos hay en total sumando las cantidades de cada uno
  const totalUnidades = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);

  return (
    <div className="contenedor">
      {/* 1. Cabecera limpia: Solo recibe el título */}
      <Cabecera titulo="🐱 🦩 Tienda de Mascotas 🐕 🐇" />

      {/* MenuNavegacion: buscador y botón del carrito */}
      <MenuNavegacion
        cantidadCarrito={totalUnidades}
        toggleCarrito={() => setShowCarrito(true)}
        irAInicio={irAInicio}
      />

      {/* Carrito: el panel lateral que se abre y cierra */}
      <Carrito
        show={showCarrito}
        alCerrar={() => setShowCarrito(false)}
        productosCarrito={carrito}
        alEliminar={manejarEliminarDelCarrito}
        onCambiarCantidad={manejarCambiarCantidad}
        alVaciar={() => { localStorage.clear(); setCarrito([]); }}
      />

      {/* escaparate + formulario */}
      <div id="contenido" className="container-fluid mt-4">
        <div className="row">

          {/* Parte principal: Lista de productos */}
          <main className="col-md-8">
            {/* 2. EscaparateProductos ahora recibe la lógica de búsqueda */}
            <EscaparateProductos
              productos={productosFiltrados}
              onAnadirAlCarrito={manejarAnadirAlCarrito}
              carrito={carrito}
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              paginaActual={paginaActual}
              setPaginaActual={setPaginaActual}
            />
          </main>

          {/* Barra lateral: Formulario para crear productos nuevos */}
          <aside className="col-md-3">
            <FormularioNuevosProductos onAgregarProducto={manejarNuevoProducto}
            />
          </aside>
        </div>
      </div>
      {/* Footer con el nuestro nombre :) */}
      <Pie contenido="© Dawidawe taldea" />
    </div>
  );
}

export default App;