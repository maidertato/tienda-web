const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Esquema del usuario — nombre, email, rol + 3 campos extra (cámbialos por los que hayáis elegido)
const usuarioSchema = new mongoose.Schema({
    nombre:      { type: String, required: true },
    email:       { type: String, required: true, unique: true },
    rol:         { type: String, default: '' },   // 'admin' o vacío
    campoExtra1: { type: String, default: '' },
    campoExtra2: { type: String, default: '' },
    campoExtra3: { type: String, default: '' }
});

const Usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios');

// POST /usuarios/login — Firebase ya autenticó; aquí arrancamos la sesión
router.post('/login', async (req, res) => {
    const { email } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado en MongoDB' });

        req.session.email = email;
        req.session.visitas = 1;

        await req.session.save();
        res.json({ mensaje: 'Sesión iniciada', usuario, visitas: 1 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /usuarios/mi-cuenta — datos del usuario + incrementar visitas
router.get('/mi-cuenta', async (req, res) => {
    if (!req.session.email) return res.status(401).json({ error: 'No autenticado' });

    req.session.visitas = (req.session.visitas || 1) + 1;

    try {
        const usuario = await Usuario.findOne({ email: req.session.email });
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        await req.session.save();
        res.json({ ...usuario.toObject(), visitas: req.session.visitas });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /usuarios/actualizar — editar datos (nombre obligatorio, email no se toca)
router.put('/actualizar', async (req, res) => {
    if (!req.session.email) return res.status(401).json({ error: 'No autenticado' });

    const { nombre, campoExtra1, campoExtra2, campoExtra3 } = req.body;
    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    try {
        const actualizado = await Usuario.findOneAndUpdate(
            { email: req.session.email },
            { $set: { nombre, campoExtra1, campoExtra2, campoExtra3 } },
            { new: true }
        );
        res.json(actualizado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /usuarios/logout — destruir sesión
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ error: 'Error al cerrar sesión' });
        res.json({ mensaje: 'Sesión cerrada' });
    });
});

router.get('/mi-cuenta', async (req, res) => {
    if (!req.session.email) return res.status(401).json({ error: 'No autenticado' });

    req.session.visitas = (req.session.visitas || 1) + 1;  // incrementa siempre

    try {
        const usuario = await Usuario.findOne({ email: req.session.email });
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        await req.session.save();
        res.json({ ...usuario.toObject(), visitas: req.session.visitas });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
