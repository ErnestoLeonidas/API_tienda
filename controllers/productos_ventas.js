
require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

// Obtener todos los productos en venta
module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = `
      SELECT
        id_producto_venta,
        valor_venta,
        cantidad_venta,
        id_producto,
        id_venta,
        estado
      FROM Productos_Ventas 
    `;
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        response.status(200).send(results);
      } else {
        response.status(204).send('Sin resultado');
      }
    })               
  });
  
  // Obtener un producto en venta por su ID
  module.exports.buscar = app.get('/:id', (request, response) => {  
    let id_producto_venta = request.params.id;
    const sql = `
      SELECT
        id_producto_venta,
        valor_venta,
        cantidad_venta,
        id_producto,
        id_venta,
        estado
      FROM Productos_Ventas 
      WHERE id_producto_venta = ?
    `;
    connection.query(sql, id_producto_venta, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        response.status(200).send(results);
      } else {
        response.status(204).send('Sin resultado');
      }
    })               
  });
  
  // Actualizar un producto en venta
  module.exports.actualizar = app.patch('/', (request, response) => {  
    let {
      id_producto_venta,
      valor_venta,
      cantidad_venta,
      id_producto,
      id_venta,
      estado
    } = request.body;
  
    const sql = `
      UPDATE Productos_Ventas
      SET
        valor_venta = ?,
        cantidad_venta = ?,
        id_producto = ?,
        id_venta = ?,
        estado = ?
      WHERE id_producto_venta = ?
    `;
  
    let values = [
      valor_venta,
      cantidad_venta,
      id_producto,
      id_venta,
      estado,
      id_producto_venta
    ];
  
    connection.query(sql, values, (error, results) => {
      if (error) throw error;
      response.send(`Producto en venta con id ${id_producto_venta} actualizado correctamente`);
    })               
  });
  
  // Agregar un nuevo producto en venta
  module.exports.agregar = app.post('/', (request, response) => {  
    let {
      valor_venta,
      cantidad_venta,
      id_producto,
      id_venta,
      estado
    } = request.body;
  
    const sql = `
      INSERT INTO Productos_Ventas (valor_venta, cantidad_venta, id_producto, id_venta, estado)
      VALUES (?, ?, ?, ?, ?)
    `;
  
    let values = [
      valor_venta,
      cantidad_venta,
      id_producto,
      id_venta,
      estado
    ];
  
    connection.query(sql, values, (error, results) => {
      if (error) throw error;
      response.status(200).send(`Producto en venta registrado correctamente con id ${results.insertId}`);
    });
  
  });
  
  // Eliminar un producto en venta por su ID
  module.exports.eliminar = app.delete('/:id', (request, response) => {  
    const id_producto_venta = request.params.id;
  
    const sql = "DELETE FROM Productos_Ventas WHERE id_producto_venta = ?";
    connection.query(sql, id_producto_venta, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`Producto en venta con id ${id_producto_venta} eliminado correctamente`);
      } else {
        response.status(204).send('Sin resultado');
      }
    });
  
  });
  