const express = require('express');

const cors = require('cors');

const session = require('express-session');

const mongoose = require('mongoose');

const MongoStore = require('connect-mongo').default;

const path = require('path');

const app = express();


const misProductos = require('./rutas/productos');
const misUsuarios = require('./rutas/usuarios');

app.use(cors({
    origin: 'http://localhost:3000', // El puerto de tu React (cliente)
    credentials: true
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


// Aquí conectamos Express con la base de datos 'tienda'
app.use(session({
    secret: 'mi_clave_secreta',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/tienda', 
        collectionName: 'sessions'
    }),
    cookie: { 
        maxAge: 1000 * 60 * 60, // 1 hora
        secure: false 
    }
}));
// contador de visitras
app.use((req, res, next) => {
    if (req.session.visitas === undefined) {
        req.session.visitas = 0;
    }
    next();
});

// incrementar visitas manualmente
app.post('/api/visitas', (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ error: 'Debes iniciar sesión' });
    }
    req.session.visitas++;

    req.session.save((err) => {
        if (err) {
            console.error('Error guardando sesión:', err);
            return res.status(500).json({ error: 'No se pudo actualizar' });
        }

        res.json({ visitas: req.session.visitas });
    });
});
// ver las visitas
app.get('/api/contador', (req, res) => {
    res.json({ visitas: req.session.visitas });
});

// usar rutas de productos y usuarios
app.use('/productos', misProductos);
app.use('/usuarios', misUsuarios);

// Para probar que el servidor funciona
app.get('/', (req, res) => {
    res.send('Servidor de la Tienda de mascotas funcionando correct');
});

// Puerto
const PORT = 4000;

async function iniciarApp() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/tienda');
        console.log('Conectado a MongoDB');

        app.listen(PORT, () => {
            console.log(`Servidor en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error(' Error al conectar:', error);
        process.exit(1);
    }
}

iniciarApp();