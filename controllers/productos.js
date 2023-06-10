require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

module.exports.buscar_todo = app.get('/', (request, response) => {
  const sql = `
    SELECT
      id_producto,
      ISBN,
      autor,
      titulo,
      valor,
      stock,
      imagen,
      id_promocion,
      id_especie
    FROM Productos
  `;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      response.status(200).send(results);
    } else {
      response.status(204).send('Sin resultado');
    }
  });
});

module.exports.buscar = app.get('/:id', (request, response) => {
  const id_producto = request.params.id;
  const sql = `
    SELECT
      id_producto,
      ISBN,
      autor,
      titulo,
      valor,
      stock,
      imagen,
      id_promocion,
      id_especie
    FROM Productos
    WHERE id_producto = ?
  `;
  connection.query(sql, id_producto, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      response.status(200).send(results[0]);
    } else {
      response.status(204).send('Sin resultado');
    }
  });
});

module.exports.actualizar = app.patch('/', (request, response) => {
  const {
    id_producto,
    ISBN,
    autor,
    titulo,
    valor,
    stock,
    imagen,
    id_promocion,
    id_especie
  } = request.body;

  const sql = `
    UPDATE Productos
    SET ISBN = ?,
        autor = ?,
        titulo = ?,
        valor = ?,
        stock = ?,
        imagen = ?,
        id_promocion = ?,
        id_especie = ?
    WHERE id_producto = ?
  `;

  const values = [
    ISBN,
    autor,
    titulo,
    valor,
    stock,
    imagen,
    id_promocion,
    id_especie,
    id_producto
  ];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.send(`Producto con id ${id_producto} actualizado correctamente`);
  });
});

module.exports.agregar = app.post('/', (request, response) => {
  const {
    ISBN,
    autor,
    titulo,
    valor,
    stock,
    imagen,
    id_promocion,
    id_especie
  } = request.body;

  const sql = `
    INSERT INTO Productos (ISBN, autor, titulo, valor, stock, imagen, id_promocion, id_especie)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    ISBN,
    autor,
    titulo,
    valor,
    stock,
    imagen,
    id_promocion,
    id_especie
  ];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.status(200).send(`Producto registrado correctamente con id ${results.insertId}`);
  });
});

module.exports.eliminar = app.delete('/:id', (request, response) => {
  const id_producto = request.params.id;

  const sql = "DELETE FROM Productos WHERE id_producto = ?";
  connection.query(sql, id_producto, (error, results) => {
    if (error) throw error;
    if (results.affectedRows > 0) {
      response.status(200).send(`Producto con id ${id_producto} eliminado correctamente`);
    } else {
      response.status(404).send(`Producto con id ${id_producto} no encontrado`);
    }
  });
});
