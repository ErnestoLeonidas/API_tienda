require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.port || 5500;

// configuración body parser para permitir json, y url encoded
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = require('./config/config');

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get("/api/test/",function(request,response){
	response.send("Bienvenido a API ");
});


// Se inicia servidor
app.listen(port, function (){
    console.log('Servidor esta corriendo! http://localhost:5500/');
	controladores();
});


const roles = require('./controllers/roles');
const usuarios = require('./controllers/usuarios');
const donaciones = require('./controllers/donaciones');
const estadoDespacho = require('./controllers/estado_despacho');
const despachos = require('./controllers/despachos');
const promociones = require('./controllers/promociones');
const especies = require('./controllers/especies');
const productos = require('./controllers/productos');
const productosVentas = require('./controllers/productos_ventas');

function controladores() {
  // Rutas para la tabla Roles
  app.use('/api/roles/', roles.buscar_todo);
  app.use('/api/roles/', roles.buscar_activos);
  app.use('/api/roles/', roles.buscar);
  app.use('/api/roles/', roles.actualizar);
  app.use('/api/roles/', roles.agregar);
  app.use('/api/roles/', roles.eliminar);

  // Rutas para la tabla Usuarios
  app.use('/api/usuarios/', usuarios.buscar_todo);
  app.use('/api/usuarios/', usuarios.buscar_activos);
  app.use('/api/usuarios/', usuarios.buscar);
  app.use('/api/usuarios/', usuarios.actualizar);
  app.use('/api/usuarios/', usuarios.agregar);
  app.use('/api/usuarios/', usuarios.eliminar);

  // Rutas para la tabla Donaciones
  app.use('/api/donaciones/', donaciones.buscar_todo);
  app.use('/api/donaciones/', donaciones.buscar);
  app.use('/api/donaciones/', donaciones.actualizar);
  app.use('/api/donaciones/', donaciones.agregar);
  app.use('/api/donaciones/', donaciones.eliminar);

  // Rutas para la tabla Estado_Despacho
  app.use('/api/estado-despacho/', estadoDespacho.buscar_todo);
  app.use('/api/estado-despacho/', estadoDespacho.buscar);
  app.use('/api/estado-despacho/', estadoDespacho.actualizar);
  app.use('/api/estado-despacho/', estadoDespacho.agregar);
  app.use('/api/estado-despacho/', estadoDespacho.eliminar);

  // Rutas para la tabla Despachos
  app.use('/api/despachos/', despachos.buscar_todo);
  app.use('/api/despachos/', despachos.buscar);
  app.use('/api/despachos/', despachos.actualizar);
  app.use('/api/despachos/', despachos.agregar);
  app.use('/api/despachos/', despachos.eliminar);

  // Rutas para la tabla Promociones
  app.use('/api/promociones/', promociones.buscar_todo);
  app.use('/api/promociones/', promociones.buscar);
  app.use('/api/promociones/', promociones.actualizar);
  app.use('/api/promociones/', promociones.agregar);
  app.use('/api/promociones/', promociones.eliminar);

  // Rutas para la tabla Especies
  app.use('/api/especies/', especies.buscar_todo);
  app.use('/api/especies/', especies.buscar);
  app.use('/api/especies/', especies.actualizar);
  app.use('/api/especies/', especies.agregar);
  app.use('/api/especies/', especies.eliminar);

  // Rutas para la tabla Productos
  app.use('/api/productos/', productos.buscar_todo);
  app.use('/api/productos/', productos.buscar);
  app.use('/api/productos/', productos.actualizar);
  app.use('/api/productos/', productos.agregar);
  app.use('/api/productos/', productos.eliminar);

  // Rutas para la tabla Productos_Ventas
  app.use('/api/productos-ventas/', productosVentas.buscar_todo);
  app.use('/api/productos-ventas/', productosVentas.buscar);
  app.use('/api/productos-ventas/', productosVentas.actualizar);
  app.use('/api/productos-ventas/', productosVentas.agregar);
  app.use('/api/productos-ventas/', productosVentas.eliminar);
}
