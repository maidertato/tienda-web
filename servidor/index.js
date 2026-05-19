require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const { MongoStore } = require('connect-mongo');
const path = require('path');

const app = express();
const isProd = process.env.NODE_ENV === 'production';

// Necesario para que Express confíe en el proxy de DigitalOcean y las cookies secure funcionen
if (isProd) app.set('trust proxy', 1);

const misProductos = require('./rutas/productos');
const misUsuarios = require('./rutas/usuarios');

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'mi_clave_secreta',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: isProd
    }
}));

// Rutas API
app.use('/api/productos', misProductos);
app.use('/api/usuarios', misUsuarios);

// En producción, cualquier ruta que no sea API devuelve el index.html de React
if (isProd) {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Servidor de la tienda funcionando');
    });
}

const PORT = process.env.PORT || 4000;

async function iniciarApp() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado a MongoDB');
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Servidor en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar:', error);
        process.exit(1);
    }
}

iniciarApp();
