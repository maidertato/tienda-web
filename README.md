## Para ver Tablas:
### usuarios
     db.usuarios.find().pretty()
### productos
     db.productos.find().pretty()

## Para añadir usuarios de prueba:
### atributos ( el rol es o usuario o admin --> obligatoriamente)
db.usuarios.insertOne({
  nombre: '',
  email: '@gmail.com',
  rol: '', 
  password: '',
  edad: ,
  universidad: ''
})


## Para Abrir la web:
     cd servidor / cliente 
     npm start
