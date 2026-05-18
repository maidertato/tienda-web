require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const { MongoStore } = require('connect-mongo');
const path = require('path');

const app = express();

const misProductos = require('./rutas/productos');
const misUsuarios = require('./rutas/usuarios');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'mi_clave_secreta',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hora
        secure: false
    }
}));

// Rutas
app.use('/productos', misProductos);
app.use('/usuarios', misUsuarios);

app.get('/', (req, res) => {
    res.send('Servidor de la tienda funcionando');
});

const PORT = 4000;

async function iniciarApp() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado a MongoDB');
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Servidor en puerto: ${PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar:', error);
        process.exit(1);
    }
}

iniciarApp();
