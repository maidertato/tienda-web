import React, { useState, useMemo, useEffect, useRef  } from 'react';
import { inventario as inventarioInicial, cargarCarrito } from './tienda/tienda';
import './App.css';

// import de los componentees que pide y que he creado 
import Cabecera from './componentes/Cabecera';
import MenuNavegacion from './componentes/MenuNavegacion';
import EscaparateProductos from './componentes/EscaparateProductos';
import FormularioNuevosProductos from './componentes/FormularioNuevosProductos';
import Pie from './componentes/Pie';
import Carrito from './componentes/Carrito';
import ModalCupones from './componentes/ModalCupones';
import ListaDeseos from './componentes/ListaDeseos';

import LogIn from './componentes/LogIn';
import SeccionMiCuenta from './componentes/SeccionMiCuenta';
import GestionInventario from './componentes/GestionInventario';

const API = '/api';

function App() {
  // ESTADOS BÁSICOS DE LA APLICACIÓN
  // Lista total de productos (empieza con el inventario de tienda.js)
  const [productos, setProductos] = useState([]);
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
  const [visitas, setVisitas] = useState(1);
  const loginReciente = useRef(false);
  
  //________________________________________________________________________
  // NUEVO : aplicacion de los descuentos 
  const [descuento, setDescuento] = useState(0);
  const [verModalCupones, setVerModalCupones] = useState(false);
  
  //________________________________________________________________________
  // NUEVO : Lista de deseos (Estructurada por subtipos dinámicos de MongoDB)
  const [listaDeseos, setListaDeseos] = useState({
    Juguete: [],
    Alimentacion: [],
    Merchandising: [],
    Accesorios: [],
    Cabello: [],
    Mobiliario: []
  });
  //________________________________________________________________________
  
  // Login: guarda usuario y visitas por separado
  const manejarLogin = (datosUsuario, visitasIniciales) => {
    loginReciente.current = true;
    setUsuario(datosUsuario);
    setVisitas(visitasIniciales || 1);
  };

   // Logout: avisa al servidor y limpia el estado
  const manejarLogout = async () => {
    loginReciente.current = false;
    try {
      await fetch(`${API}/usuarios/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
    setUsuario(null);
    setVisitas(1);
    setSeccion("inicio");
    loginReciente.current = false;
  };

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

  // Cargar productos desde MongoDB al arrancar
  useEffect(() => {
    fetch(`${API}/productos`, { credentials: 'include' })
      .then(r => r.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error cargando productos:', err));
  }, []);

  // Recuperar sesión al arrancar / incrementar visitas al recargar
  useEffect(() => {
    if (loginReciente.current) return; // si acabamos de hacer login, no llamar a mi-cuenta
    
    fetch(`${API}/usuarios/mi-cuenta`, { credentials: 'include' })
        .then(r => {
            if (!r.ok) return null;
            return r.json();
        })
        .then(data => {
            if (data && data.email) {
                setUsuario(data);
                setVisitas(data.visitas);
            }
        })
        .catch(() => {});
  }, []);

  //_______________________________________________________________________


  // Función para resetear la vista al estado original
  const irAInicio = () => {
    setBusqueda("");      // Limpia el buscador
    setPaginaActual(1);   // Vuelve a la página 1
    setCategoria("Todas"); // Cambia el filtro a todas
    setPrecioMax(200); // Pone a 200 el filtro del precio
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Crea un producto nuevo desde el formulario y lo mete en la lista
  const manejarNuevoProducto = async (tipo, datos) => {
    try {
      const respuesta = await fetch(`${API}/productos/anadir`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(datos)
      });
      const productoGuardado = await respuesta.json();
      setProductos(prev => [...prev, productoGuardado]);
      irAInicio();
    } catch (err) {
      console.error('Error añadiendo producto:', err);
    }
  };
  
  // Borrar varios: llama al servidor y actualiza el estado local
  const alEliminarVarios = async (idsABorrar) => {
    try {
      await fetch(`${API}/productos/borrar`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ids: idsABorrar })
      });
      setProductos(prev => prev.filter(p => !idsABorrar.includes(p._id)));
    } catch (err) {
      console.error('Error borrando productos:', err);
    }
  };

  // Editar producto: llama al servidor y actualiza el estado local
  const alActualizarProducto = async (productoEditado) => {
    try {
      const respuesta = await fetch(`${API}/productos/editar/${productoEditado._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(productoEditado)
      });
      const actualizado = await respuesta.json();
      setProductos(prev => prev.map(p => p._id === actualizado._id ? actualizado : p));
    } catch (err) {
      console.error('Error actualizando producto:', err);
    }
  };


  // Filtra los productos en tiempo real según lo que escribas en el buscador
  const productosFiltrados = useMemo(() => {
    return productos.filter(p => {
      // Función interna para quitar tildes y pasar a minúsculas
      const normalizar = (texto) =>
        texto?.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";

      const nombreProd = normalizar(p.nombre);
      const busquedaNormal = normalizar(busqueda);
      const tipoProducto = normalizar(p.tipo || p.categoria);
      const categoriaSeleccionada = normalizar(categoria);

      const coincideNombre = nombreProd.includes(busquedaNormal);
      const coincideCategoria = categoria === "Todas" || tipoProducto === categoriaSeleccionada;
      const coincidePrecio = Number(p.precio) <= Number(precioMax);

      return coincideNombre && coincideCategoria && coincidePrecio;
    });
  }, [productos, busqueda, categoria, precioMax]);

  // Lógica para añadir cosas a la cesta de la compra (Corregida para evitar duplicados y "Grande-Grande")
  const manejarAnadirAlCarrito = (productoDeClase) => {
    const idCompleto = productoDeClase._id || productoDeClase.id || "";
    const baseId = idCompleto.includes('_') ? idCompleto.split('_')[0] : idCompleto;

    if (!baseId) return;

    let variante = "default";
    if (productoDeClase.varianteNombre) {
      variante = productoDeClase.varianteNombre;
    } else if (productoDeClase.variante) {
      variante = typeof productoDeClase.variante === 'object' ? productoDeClase.variante.nombre : productoDeClase.variante;
    } else if (idCompleto.includes('_')) {
      variante = idCompleto.split('_')[1];
    }

    if (!variante || variante === "default") {
      variante = "default";
    }

    const idUnicoCarrito = `${baseId}_${variante}`;

    // Corta el nombre ante cualquier tipo de guion y elimina espacios extra
    let nombreLimpio = productoDeClase.nombre || "Producto";
    nombreLimpio = nombreLimpio.split(/\s*[-–—]\s*/)[0].trim(); 

    let imagenCorrecta = productoDeClase.imagen;
    if (variante !== "default" && productoDeClase.variantes?.length > 0) {
      const varianteEncontrada = productoDeClase.variantes.find(v => v.nombre === variante);
      if (varianteEncontrada) {
        imagenCorrecta = varianteEncontrada.imagen;
      }
    }

    const productoSimple = {
      id: idUnicoCarrito,
      _id: baseId,
      nombre: variante === "default" ? nombreLimpio : `${nombreLimpio} - ${variante}`,
      precio: parseFloat(productoDeClase.precio) || 0,
      imagen: imagenCorrecta,
      varianteNombre: variante === "default" ? "" : variante
    };

    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item.id === productoSimple.id);
      let nuevoCarrito;

      if (productoExistente) {
        if (productoExistente.cantidad >= 20) return prevCarrito;

        nuevoCarrito = prevCarrito.map(item =>
          item.id === productoSimple.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        nuevoCarrito = [...prevCarrito, { ...productoSimple, cantidad: 1 }];
      }

      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  };

  // NUEVA FUNCIÓN CORREGIDA: Controla cantidades sin romper ni duplicar
  const manejarCambiarCantidad = (idUnico, delta) => {
    setCarrito(prevCarrito => {
      const nuevoCarrito = prevCarrito.map(item => {
        if (item.id === idUnico) {
          const nuevaCantidad = (item.cantidad || 1) + delta;
          
          // Límites seguros: no permitimos bajar de 1 ni pasar de 20
          if (nuevaCantidad <= 0) return null; 
          if (nuevaCantidad > 20) return { ...item, cantidad: 20 };
          
          return { ...item, cantidad: nuevaCantidad };
        }
        return item;
      }).filter(Boolean); // Si devolvió null (cantidad <= 0), se elimina del carrito de forma segura

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

  // Gestión de la lista de deseos
  const manejarEliminarDeseo = (id) => {
    setListaDeseos(prev => {
      const nuevoEstado = { ...prev };
      for (const subtipo in nuevoEstado) {
        nuevoEstado[subtipo] = nuevoEstado[subtipo].filter(item => item._id !== id);
      }
      return nuevoEstado;
    });
  };

  const manejarAnadirDeseo = (producto) => {
    const subtipo = producto.tipo || producto.categoria;
    if (!subtipo) return;

    // 1. Extraer el ID base limpio
    const idCompleto = producto._id || producto.id || "";
    const baseId = idCompleto.includes('_') ? idCompleto.split('_')[0] : idCompleto;

    // 2. Averiguar la variante de forma segura
    let variante = "default";
    if (producto.varianteNombre) {
      variante = producto.varianteNombre;
    } else if (producto.variante) {
      variante = typeof producto.variante === 'object' ? producto.variante.nombre : producto.variante;
    } else if (idCompleto.includes('_')) {
      variante = idCompleto.split('_')[1];
    }

    const idUnicoFavorito = `${baseId}_${variante}`;

    setListaDeseos(prev => {
      const existe = prev[subtipo]?.some(item => item._id === idUnicoFavorito);
      
      if (existe) {
        return {
          ...prev,
          [subtipo]: prev[subtipo].filter(item => item._id !== idUnicoFavorito)
        };
      } else {
        // 3. FOTO CORRECTA: Buscar la imagen específica de la variante seleccionada
        let imagenCorrecta = producto.imagen;
        if (variante !== "default" && producto.variantes?.length > 0) {
          const varianteEncontrada = producto.variantes.find(v => v.nombre === variante);
          if (varianteEncontrada) {
            imagenCorrecta = varianteEncontrada.imagen; // ¡Asigna la foto rosa si es Grande!
          }
        }

        // 4. NOMBRE LIMPIO: Evitar guardar nombres que ya lleven guiones duplicados
        let nombreLimpio = producto.nombre || "Producto";
        if (nombreLimpio.includes(' - ')) nombreLimpio = nombreLimpio.split(' - ')[0];

        const productoConVariante = {
          ...producto,
          _id: idUnicoFavorito,
          nombre: nombreLimpio, // Guardamos solo el nombre base para que no explote luego
          imagen: imagenCorrecta, // Guardamos su foto buena
          varianteNombre: variante
        };

        return {
          ...prev,
          [subtipo]: [...(prev[subtipo] || []), productoConVariante]
        };
      }
    });
  };

  // Cuenta el total de deseos sumando la longitud de cada array de categoría
  const totalDeseos = useMemo(() => {
    return Object.values(listaDeseos).reduce((acc, arr) => acc + arr.length, 0);
  }, [listaDeseos]);

  return (
    <div id="contenedor">
      <Cabecera titulo="🐈  🐦 Tienda de Mascotas 🦮  🐇" />
      
      <MenuNavegacion
        cantidadCarrito={totalUnidades}
        cantidadDeseos={totalDeseos}
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
        alVaciar={() => { localStorage.removeItem('carrito'); setCarrito([]); }}
        onAbrirCupones={() => setVerModalCupones(true)}
        descuentoGlobal={descuento}
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
                
                // Convertimos el objeto de categorías en una lista plana para que el .some() del hijo no rompa
                listaDeseos={Object.values(listaDeseos).flat()} 
                
                onAnadirDeseo={manejarAnadirDeseo}
              />
            )}
            {seccion === "add" && usuario?.rol === "admin" &&(
              <div className="card shadow p-4 animate__animated animate__fadeIn">
                <h2 className="mb-4 text-center">Añadir productos</h2>
                <hr />
                <FormularioNuevosProductos onAgregarProducto={manejarNuevoProducto}
                deshabilitado={!isOnline} />
              </div>
            )}

            {seccion === "editar/borrar" && usuario?.rol === "admin" && (
              <div className="card shadow p-4 animate__animated animate__fadeIn">
                <h2 className="text-center mb-4">Editar/Borrar</h2>
                <p className="text-center text-muted">Selecciona productos para borrar o edita sus detalles.</p>
                <hr />
                {/* Modificado para que sea idéntico al de GitHub sin la prop alAñadirAFavoritos */}
                <GestionInventario
                  productos={productos}
                  alEliminarVarios={alEliminarVarios}
                  alActualizarProducto={alActualizarProducto}
                  deshabilitado={!isOnline}
                />
              </div>
            )}

            {seccion === "cuenta" && (
              <SeccionMiCuenta
                usuario={usuario}
                apiBaseUrl={API}
                isOnline={isOnline}
                onActualizar={(datosActualizados) => setUsuario(prev => ({ ...prev, ...datosActualizados }))}
              />
            )}

            {seccion === "deseos" && (
              <ListaDeseos 
                // Convertimos el objeto en array plano antes de pasárselo al componente
                listaDeseos={Object.values(listaDeseos).flat()}
                alEliminarDeseo={manejarEliminarDeseo}
                alAñadirAlCarrito={manejarAnadirAlCarrito}
              />
            )}
          </main>
            
          {/* Barra lateral: Formulario para crear productos nuevos */}
          {seccion === "inicio" && (
            <aside className="col-md-3">
              <div style={{ backgroundColor: '#9C66D4', borderRadius: '20px', padding: '1.2rem', marginLeft: '1.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}>
                {!usuario ? (
                  <LogIn
                    onLogin={manejarLogin}
                    isOnline={isOnline}
                    apiBaseUrl={API}
                  />
                ) : (
                  <div className="card p-3 shadow-sm border-success text-center">
                    <h4>Bienvenide, {usuario.nombre}</h4>
                    <hr />
                    {usuario.rol === 'admin' && (
                      <p className="mb-1"><strong>Rol:</strong> {usuario.rol}</p>
                    )}
                    <p className="mb-3">Número de visitas: {visitas}</p>
                    <button className="btn btn-outline-danger btn-sm w-100" onClick={manejarLogout}>
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
      
      {/* NUEVO : Modal de Cupones */}
      <ModalCupones 
        show={verModalCupones} 
        onCerrar={() => setVerModalCupones(false)} 
        onAplicarDescuento={setDescuento} 
        descuentoGlobal={descuento} 
      />
    </div>
  );
}

export default App;