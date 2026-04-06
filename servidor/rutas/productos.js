const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
// Conexión a la base de datos 'tienda' y colección a los productos 
const db = mongojs('tienda', ['productos']);

// Obtener todos los productos para el escaparate
router.get('/', (req, res) => {
    db.productos.find((err, docs) => {
        if (err) return res.status(500).send(err);
        res.json(docs);
    });
});

// Añadir un nuevo producto 
router.post('/anadir', (req, res) => {
    const nuevoProducto = req.body; 
    //  tipo, nombre, precio, descripción, campo extra e imagen 
    db.productos.insert(nuevoProducto, (err, doc) => {
        if (err) return res.status(500).send(err);
        res.json(doc);
    });
});

// Editar un producto específico
router.put('/editar/:id', (req, res) => {
    db.productos.update(
        { _id: mongojs.ObjectId(req.params.id) },
        { $set: req.body }, // Actualiza campos concretos 
        (err, doc) => {
            if (err) return res.status(500).send(err);
            res.json(doc);
        }
    );
});

// Borrar una lista de productos 
router.delete('/borrar', (req, res) => {
    const idsABorrar = req.body.ids.map(id => mongojs.ObjectId(id));
    db.productos.remove({ _id: { $in: idsABorrar } }, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

module.exports = router;