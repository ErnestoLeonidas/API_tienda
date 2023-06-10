require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

module.exports.buscar_todo = app.get('/', (request, response) => {
  const sql = `
    SELECT
      id_despacho,
      fecha_despacho,
      fecha_entrega,
      id_venta,
      id_estado_despacho
    FROM Despachos
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
  const id_despacho = request.params.id;
  const sql = `
    SELECT
      id_despacho,
      fecha_despacho,
      fecha_entrega,
      id_venta,
      id_estado_despacho
    FROM Despachos
    WHERE id_despacho = ?
  `;
  connection.query(sql, id_despacho, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      response.status(200).send(results[0]);
    } else {
      response.status(204).send('Sin resultado');
    }
  });
});

module.exports.actualizar = app.patch('/', (request, response) => {
  const { id_despacho, fecha_despacho, fecha_entrega, id_venta, id_estado_despacho } = request.body;

  const sql = `
    UPDATE Despachos
    SET fecha_despacho = ?,
        fecha_entrega = ?,
        id_venta = ?,
        id_estado_despacho = ?
    WHERE id_despacho = ?
  `;

  const values = [fecha_despacho, fecha_entrega, id_venta, id_estado_despacho, id_despacho];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.send(`Despacho con id ${id_despacho} actualizado correctamente`);
  });
});

module.exports.agregar = app.post('/', (request, response) => {
  const { fecha_despacho, fecha_entrega, id_venta, id_estado_despacho } = request.body;

  const sql = `
    INSERT INTO Despachos (fecha_despacho, fecha_entrega, id_venta, id_estado_despacho)
    VALUES (?, ?, ?, ?)
  `;

  const values = [fecha_despacho, fecha_entrega, id_venta, id_estado_despacho];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.status(200).send(`Despacho registrado correctamente con id ${results.insertId}`);
  });
});

module.exports.eliminar = app.delete('/:id', (request, response) => {
  const id_despacho = request.params.id;

  const sql = "DELETE FROM Despachos WHERE id_despacho = ?";
  connection.query(sql, id_despacho, (error, results) => {
    if (error) throw error;
    if (results.affectedRows > 0) {
      response.status(200).send(`Despacho con id ${id_despacho} eliminado correctamente`);
    } else {
      response.status(404).send(`Despacho con id ${id_despacho} no encontrado`);
    }
  });
});
