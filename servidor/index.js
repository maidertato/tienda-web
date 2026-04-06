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
    if (req.session.vistas === undefined) {
        req.session.vistas = 0;
    }
    req.session.vistas++;
    next();
});


//  Conectar a MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/tienda')
//    .then(() => console.log('Conectado a MongoDB (Base de datos: tienda)'))
//    .catch(err => console.error('Error al conectar a MongoDB:', err));

// usar rutas
app.use('/productos', misProductos);
app.use('/usuarios', misUsuarios);

app.get('/', (req, res) => {
    res.send('Servidor de la Tienda de mascotas funcionando correct');
});

// Para ver contador de react
app.get('/api/contador', (req, res) => {
    res.json({ vistas: req.session.vistas });
});

// Puerto
const PORT = 5002;
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
    console.log(`Firebase HTML en: http://localhost:${PORT}/email-password.html`);
});