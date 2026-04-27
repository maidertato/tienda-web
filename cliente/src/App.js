import React, { useState, useMemo, useEffect } from 'react';
import { inventario as inventarioInicial, cargarCarrito } from './tienda/tienda';
import './App.css';

// import de los componentees que pide y que he creado 
import Cabecera from './componentes/Cabecera';
import MenuNavegacion from './componentes/MenuNavegacion';
import EscaparateProductos from './componentes/EscaparateProductos';
import FormularioNuevosProductos from './componentes/FormularioNuevosProductos';
import Pie from './componentes/Pie';
import Carrito from './componentes/Carrito';

import LogIn from './componentes/LogIn';
import SeccionMiCuenta from './componentes/SeccionMiCuenta';


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
  // Realizar busqueda / filtrado por categorias
  const [categoria, setCategoria] = useState("Todas");
  // Controla en qué página del escaparate estamos
  const [paginaActual, setPaginaActual] = useState(1);
  // Estado para controlar la conexión
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  // Controlamos el precio máximo para después aplicar el filtro
  const [precioMax, setPrecioMax] = useState(200);
  //________________________________________________________________________
  const [usuario, setUsuario] = useState(null);
  const [seccion, setSeccion] = useState("inicio");


  useEffect(() => {
    // Funciones para actualizar el estado
    const actualizarEstado = () => setIsOnline(navigator.onLine);

    // Escuchamos cuando el navegador cambia de estado
    window.addEventListener('online', actualizarEstado);
    window.addEventListener('offline', actualizarEstado);

    // Limpiamos los eventos al desmontar el componente
    return () => {
      window.removeEventListener('online', actualizarEstado);
      window.removeEventListener('offline', actualizarEstado);
    };
  }, []);

  // Función para resetear la vista al estado original
  const irAInicio = () => {
    setBusqueda("");      // Limpia el buscador
    setPaginaActual(1);   // Vuelve a la página 1
    setCategoria("Todas"); // Cambia el filtro a todas
    setPrecioMax(100); // Pone a 100 el filtro del precio
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  // Crea un producto nuevo desde el formulario y lo mete en la lista
  const manejarNuevoProducto = (tipo, datos) => {
    setProductos(prevProductos => {
      if (prevProductos.find(p => p.id === datos.id)) {
        return prevProductos;
      }
      return [...prevProductos, datos];
    });
    irAInicio();
  };

  // Filtra los productos en tiempo real según lo que escribas en el buscador
  const productosFiltrados = useMemo(() => {
    return productos.filter(p => {
      // Función interna para quitar tildes y pasar a minúsculas
      const normalizar = (texto) =>
        texto?.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";

      const nombreProd = normalizar(p.nombre);
      const busquedaNormal = normalizar(busqueda);
      const tipoProducto = normalizar(p.tipo);
      const categoriaSeleccionada = normalizar(categoria);

      const coincideNombre = nombreProd.includes(busquedaNormal);
      const coincideCategoria = categoria === "Todas" || tipoProducto === categoriaSeleccionada;

      return coincideNombre && coincideCategoria;
    });
  }, [productos, busqueda, categoria]);

  // Lógica para añadir cosas a la cesta de la compra
  const manejarAnadirAlCarrito = (productoDeClase) => {
    const productoSimple = {
      id: productoDeClase.id,
      nombre: productoDeClase.nombre,
      precio: productoDeClase.precio,
      imagen: productoDeClase.imagen,
      varianteNombre: productoDeClase.varianteNombre
    };

    const productoExistente = carrito.find(item => item.id === productoSimple.id);

    if (productoExistente) {
      if (productoExistente.cantidad >= 20) return;

      const nuevoCarrito = carrito.map(item =>
        item.id === productoSimple.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCarrito(nuevoCarrito);
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    } else {
      const nuevoCarrito = [...carrito, { ...productoSimple, cantidad: 1 }];
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
    <div id="contenedor">
      {/* 1. Cabecera limpia: Solo recibe el título */}
      <Cabecera titulo="🐈   🐦 Tienda de Mascotas 🦮   🐇" />

      {/* MenuNavegacion: buscador y botón del carrito */}
      <MenuNavegacion
        cantidadCarrito={totalUnidades}
        toggleCarrito={() => setShowCarrito(true)}
        irAInicio={irAInicio}
        isOnline={!isOnline}
        setSeccion={setSeccion}
        rolUsuario={usuario?.rol}
        usuario={usuario}
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
        <div className="row justify-content-center">
          {/* Parte principal: Lista de productos */}
          <main className={seccion === "inicio" ? "col-md-9" : "col-12"} >
            {/* 2. EscaparateProductos ahora recibe la lógica de búsqueda */}
            {seccion === "inicio" && (
              <EscaparateProductos
                productos={productosFiltrados}
                onAnadirAlCarrito={manejarAnadirAlCarrito}
                carrito={carrito}
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                categoria={categoria}
                setCategoria={setCategoria}
                precioMax={precioMax}
                setPrecioMax={setPrecioMax}
                paginaActual={paginaActual}
                setPaginaActual={setPaginaActual}
              />)}

            {seccion === "add" && usuario?.rol === "admin" && (
              <div className="card shadow p-4 animate__animated animate__fadeIn">
                <h2 className="mb-4 text-center">Añadir productos</h2>
                <hr />
                <FormularioNuevosProductos onAgregarProducto={manejarNuevoProducto} />
              </div>
            )}

            {seccion === "editar/borrar" && usuario?.rol === "admin" && (
              <div className="card p-5 text-center">
                <h2>Editar/Borrar</h2>
                <p>Sección para editar o eliminar productos existentes.</p>
              </div>
            )}

            {seccion === "cuenta" && (
              <SeccionMiCuenta usuario={usuario} />
            )}
          </main>

          {/* Barra lateral: Formulario para crear productos nuevos */}
          {seccion === "inicio" && (
            <aside className="col-md-3">
              <div style={{ backgroundColor: '#9C66D4', borderRadius: '20px', padding: '1.2rem', marginLeft: '1.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}>
                {!usuario ? (
                  <LogIn
                    onLogin={(datos) => setUsuario(datos)}
                    isOnline={isOnline}
                    apiBaseUrl="http://localhost:4000"
                  />
                ) : (
                  <div className="card p-3 shadow-sm border-success text-center">
                    <h4>Bienvenide, {usuario.nombre}</h4>
                    <hr />
                    {usuario.rol === 'admin' && (
                      <p className="mb-1"><strong>Rol:</strong> {usuario.rol}</p>
                    )}
                    <p className="mb-3">Visitas: {usuario.visitas || 1}</p>

                    <button className="btn btn-outline-danger btn-sm w-100" onClick={() => { setUsuario(null); setSeccion("inicio"); }}>
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>
      </div>
      {/* Footer con nuestro nombre :) */}
      <Pie contenido="© Dawidawe taldea" />
    </div >
  );
}

export default App;
