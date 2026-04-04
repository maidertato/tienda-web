const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const mongoose = require('mongoose');

const app = express();


const misProductos = require('./rutas/productos');
const misUsuarios = require('./rutas/usuarios');
// Middlewares
app.use(cors({
    origin: 'http://localhost:3000', // El puerto de React
    credentials: true                // Para  las sesiones
}));
app.use(express.json()); 

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
    if (req.session.vistas === undefined) {
        req.session.vistas = 0;
    }
    req.session.vistas++;
    next();
});

mongoose.connect('mongodb://127.0.0.1:27017/tienda')
    .then(() => console.log('Conectado a MongoDB (Base de datos: tienda)'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// usar rutas
app.use('/api/productos', misProductos);
app.use('/api/usuarios', misUsuarios);

app.get('/', (req, res) => {
    res.send('Servidor de la Tienda de mascotas funcionando correct');
});

// Para ver contador de react
app.get('/api/contador', (req, res) => {
    res.json({ vistas: req.session.vistas });
});

// Puerto
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});