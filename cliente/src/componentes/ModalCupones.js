import React, { useState } from 'react';
import diccionarioCupones from '../cupones.json';

const ModalCupones = ({ show, onCerrar, onAplicarDescuento, descuentoGlobal }) => {
    const [entradaCodigo, setEntradaCodigo] = useState("");
    const [notificacion, setNotificacion] = useState({ mensaje: "", estilo: "" });

    // Control de renderizado: si la visibilidad está desactivada, no dibuja nada
    if (!show) return null;

    const procesarValidacion = () => {
        // No ponemos nada de uppercase ni lowercase, para que tenga que ser exactamente el kode de descuento del json
        const formatoClave = entradaCodigo.trim();
        
        if (diccionarioCupones[formatoClave]) {
            onAplicarDescuento(diccionarioCupones[formatoClave]);
            setNotificacion({
                mensaje: "¡Código promocional activado correctamente!",
                estilo: "success"
            });
        } else {
            setNotificacion({
                mensaje: "El cupón introducido es incorrecto o ya no está vigente.",
                estilo: "danger"
            });
        }

        setTimeout(() => {
            setNotificacion({ mensaje: "", estilo: "" });
        }, 3000);
    };

    return (
        <div className="modal-overlay-custom" onClick={onCerrar}>
            {/* 📐 Se ha subido el primer valor del padding a 55px para empujar el bloque hacia abajo */}
            <div className="modal-container-custom" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px', width: '100%', padding: '55px 25px 15px 25px' }}>

                {/* Aspa de cierre de la ventana */}
                <button type="button" className="btn-close-custom" onClick={onCerrar} style={{ top: '15px', right: '15px' }}>×</button>

                <div style={{ textAlign: 'center' }}>
                    
                    {/* Encabezado principal */}
                    <div className="modal-title-box" style={{ fontSize: '1.35rem', marginBottom: '12px', fontWeight: '700', color: '#FFFFFF' }}>
                        ¿Tienes un código de descuento?
                    </div>

                    <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '18px' }}>
                        Introduce tu código para recalcular el precio final de tu carrito.
                    </p>

                    {/* Controles de interacción en formato vertical */}
                    <form 
                        onSubmit={(e) => { e.preventDefault(); procesarValidacion(); }} 
                        className="d-flex flex-column gap-2 mb-2"
                    >
                        <input 
                            type="text" 
                            className="form-control text-center" 
                            placeholder="Introduce tu código aquí" 
                            value={entradaCodigo} 
                            onChange={evento => {
                                setEntradaCodigo(evento.target.value);
                                if (notificacion.mensaje) setNotificacion({ mensaje: "", estilo: "" });
                            }}
                            style={{ borderRadius: '10px', border: '1px solid #d1a7eb', padding: '10px', fontSize: '0.95rem' }}
                        />
                        <button 
                            type="submit" 
                            className="btn text-white w-100"
                            style={{ backgroundColor: '#6A1B9A', borderRadius: '10px', fontWeight: '600', padding: '10px', fontSize: '0.95rem' }}
                        >
                            Validar código
                        </button>
                    </form>

                    {/* Alertas de información al usuario */}
                    {notificacion.mensaje && (
                        <div className={`alert alert-${notificacion.estilo === 'success' ? 'success' : 'danger'} p-2 mt-2`} style={{ fontSize: '0.82rem', borderRadius: '8px', margin: 0 }}>
                            {notificacion.mensaje}
                        </div>
                    )}

                    {/* Línea divisoria */}
                    <div style={{ width: '100%', minHeight: '1px', backgroundColor: '#e0e0e0', margin: '15px 0' }}></div>

                    {/* Panel inferior del estado promocional */}
                    <div className="modal-info-row purple-light" style={{ margin: 0, padding: '8px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Beneficio aplicado:</span>
                        <span style={{ color: '#6A1B9A', fontWeight: '700', fontSize: '0.95rem' }}>
                            {descuentoGlobal > 0 ? `${descuentoGlobal * 100}%` : "Ninguno"}
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ModalCupones;