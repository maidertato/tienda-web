const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    tipo:           { type: String, required: true },
    nombre:         { type: String, required: true },
    precio:         { type: Number, required: true },
    descripcion:    { type: String },
    imagen:         { type: String },
    variantes:      [{ nombre: String, imagen: String }],
    // Juguete
    categoriajuguete: { type: String },
    tamano:           { type: String },
    esInteractivo:    { type: Boolean },
    // Alimentacion
    tipoAlimento:   { type: String },
    tipoMascota:    { type: String },
    // Merchandising
    parteDelCuerpo: { type: String },
    talla:          { type: String },
    color:          { type: String },
    // Cabello
    estilo:         { type: String },
    tamaño:         { type: String },
    // Mobiliario
    material:       { type: String },
    usoInterior:    { type: Boolean }
});

const Producto = mongoose.model('Producto', productoSchema, 'productos');

// GET /productos — obtener todos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /productos/anadir — añadir uno nuevo
router.post('/anadir', async (req, res) => {
    try {
        const nuevo = new Producto(req.body);
        const guardado = await nuevo.save();
        res.json(guardado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /productos/editar/:id — editar campos concretos
router.put('/editar/:id', async (req, res) => {
    try {
        const actualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!actualizado) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(actualizado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /productos/borrar — borrar lista de ids
router.delete('/borrar', async (req, res) => {
    try {
        const { ids } = req.body;
        if (!ids || !ids.length) return res.status(400).json({ error: 'No se enviaron ids' });

        const objectIds = ids.map(id => new mongoose.Types.ObjectId(id));
        const resultado = await Producto.deleteMany({ _id: { $in: objectIds } });
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;