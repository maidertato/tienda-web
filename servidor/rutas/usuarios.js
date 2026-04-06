const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('tienda', ['usuarios']);

// Login y creación de sesión 
router.post('/login', (req, res) => {
    const { email } = req.body;
    // Se usa el email como prueba de sesión iniciada
    req.session.email = email;
    req.session.visitas = 1; // = 1 al autenticarse 
    
    // Buscar datos adicionales del usuario en MongoDB 
    db.usuarios.findOne({ email: email }, (err, usuario) => {
        if (err || !usuario) return res.status(404).send("Usuario no en MongoDB");
        res.json({ mensaje: "Sesión iniciada", usuario, visitas: req.session.visitas });
    });
});

// obtener datos del usuario actual y actualizar contador
router.get('/mi-cuenta', (req, res) => {
    if (!req.session.email) return res.status(401).send("No autenticado");

    // Incrementar contador de visitas en cada actualización de página 
    req.session.visitas++;

    db.usuarios.findOne({ email: req.session.email }, (err, usuario) => {
        if (err) return res.status(500).send(err);
        res.json({ ...usuario, visitas: req.session.visitas });
    });
});

//  Editar datos de usuario
router.put('/actualizar', (req, res) => {
    const { nombre } = req.body;
    
    // El nombre de u no puede estar vacío 
    if (!nombre || nombre.trim() === "") {
        return res.status(400).send("El nombre es obligatorio");
    }

    db.usuarios.update(
        { email: req.session.email },
        { $set: { 
            nombre: nombre,
            // El email no se puede modificar
            campoExtra1: req.body.campoExtra1,
            campoExtra2: req.body.campoExtra2,
            campoExtra3: req.body.campoExtra3
        }},
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json(result);
        }
    );
});

// Cerrar sesión
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ mensaje: "Sesión cerrada" });
});

module.exports = router;