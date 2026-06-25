import React, { useState, useEffect } from 'react';

// Forzamos la limpieza al refrescar la página (F5)
if (performance.navigation.type === 1 || window.performance?.getEntriesByType("navigation")[0]?.type === "reload") {
    sessionStorage.removeItem('resenas_productos');
}

const ResenasProducto = ({ productoId, onCerrar }) => {
    const [listaResenas, setListaResenas] = useState(() => {
        const guardadas = sessionStorage.getItem('resenas_productos');
        return guardadas ? JSON.parse(guardadas) : [];
    });

    const [nombre, setNombre] = useState("");
    const [comentario, setComentario] = useState("");
    const [puntuacion, setPuntuacion] = useState(5);

    useEffect(() => {
        sessionStorage.setItem('resenas_productos', JSON.stringify(listaResenas));
    }, [listaResenas]);

    const resenasFiltradas = listaResenas.filter(r => r.productoId === productoId);

    const manejarEnvio = (e) => {
        e.preventDefault();
        if (!nombre.trim() || !comentario.trim()) return;

        const nuevaResena = {
            id: Date.now(),
            productoId,
            usuario: nombre,
            puntuacion,
            comentario,
            fecha: new Date().toLocaleDateString()
        };

        setListaResenas([nuevaResena, ...listaResenas]);
        setNombre(""); setComentario(""); setPuntuacion(5);
    };

    return (
        // Usamos la misma clase que el modal principal para heredar diseño, 
        // y definimos maxHeight para activar el scroll interno
        <div className="modal-container-custom" 
             onClick={(e) => e.stopPropagation()} 
             style={{ 
                 maxWidth: '400px', 
                 maxHeight: '80vh', 
                 width: '90%', 
                 margin: 'auto',
                 display: 'flex', 
                 flexDirection: 'column',
                 padding: '20px',
                 overflow: 'hidden' // Escondemos el desborde para controlar el scroll interno
             }}>
            
            {/* Botón X de cerrar posicionado para que quede estético arriba a la derecha */}
            <button type="button" className="btn-close-custom" onClick={onCerrar} style={{ position: 'absolute', top: '10px', right: '10px' }}>×</button>

            <h5 className="modal-title-box" style={{ fontSize: '1.4rem', marginBottom: '15px' }}>
                Reseñas y Opiniones
            </h5>

            {/* Lista de reseñas con scroll fino y morado */}
            <div style={{ 
                overflowY: 'auto', 
                flex: '1', 
                marginBottom: '15px',
                paddingRight: '5px' 
            }}>
                {/* CSS Inyectado para el scrollbar morado */}
                <style>{`
                    div::-webkit-scrollbar { width: 6px; }
                    div::-webkit-scrollbar-thumb { background-color: #a362bc; border-radius: 10px; }
                `}</style>
                
                {resenasFiltradas.length === 0 ? (
                    <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>Aún no hay reseñas. ¡Sé la primera persona en opinar!</p>
                ) : (
                    resenasFiltradas.map((r) => (
                        <div key={r.id} className="resena-item" style={{ borderLeft: '3px solid #a362bc', padding: '10px', marginBottom: '10px', backgroundColor: '#f9f5fc' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                <span>{r.usuario}</span>
                                <span style={{ color: '#951f7c' }}>{"★".repeat(r.puntuacion)}</span>
                            </div>
                            <p style={{ margin: '5px 0' }}>{r.comentario}</p>
                            <small style={{ color: '#aaa' }}>{r.fecha}</small>
                        </div>
                    ))
                )}
            </div>

            {/* Formulario */}
            <form onSubmit={manejarEnvio} className="purple-light" style={{ padding: '15px', borderRadius: '12px', border: '1px solid #eee' }}>
                <h6 className="description-title" style={{ fontSize: '1rem', marginBottom: '10px' }}>Deja tu opinión</h6>
                <input className="form-control mb-2" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                
                <div style={{ textAlign: 'center', fontSize: '1.5rem', cursor: 'pointer', marginBottom: '10px' }}>
                    {[1, 2, 3, 4, 5].map(n => (
                        <span key={n} onClick={() => setPuntuacion(n)} style={{ color: n <= puntuacion ? '#951f7c' : '#ccc' }}>★</span>
                    ))}
                </div>

                <textarea className="form-control mb-2" rows="2" placeholder="¿Qué te ha parecido?" value={comentario} onChange={(e) => setComentario(e.target.value)} required />
                
                <button type="submit" className="btn w-100" style={{ backgroundColor: '#a362bc', color: 'white', fontWeight: 'bold' }}>
                    Publicar reseña
                </button>
            </form>
        </div>
    );
};

export default ResenasProducto;