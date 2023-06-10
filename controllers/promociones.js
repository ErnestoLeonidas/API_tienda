require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

module.exports.buscar_todo = app.get('/', (request, response) => {
  const sql = `
    SELECT
      id_promocion,
      nombre,
      porcentaje_descuento,
      fecha_inicio,
      fecha_fin,
      estado
    FROM Promociones
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
  const id_promocion = request.params.id;
  const sql = `
    SELECT
      id_promocion,
      nombre,
      porcentaje_descuento,
      fecha_inicio,
      fecha_fin,
      estado
    FROM Promociones
    WHERE id_promocion = ?
  `;
  connection.query(sql, id_promocion, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      response.status(200).send(results[0]);
    } else {
      response.status(204).send('Sin resultado');
    }
  });
});

module.exports.actualizar = app.patch('/', (request, response) => {
  const { id_promocion, nombre, porcentaje_descuento, fecha_inicio, fecha_fin, estado } = request.body;

  const sql = `
    UPDATE Promociones
    SET nombre = ?,
        porcentaje_descuento = ?,
        fecha_inicio = ?,
        fecha_fin = ?,
        estado = ?
    WHERE id_promocion = ?
  `;

  const values = [nombre, porcentaje_descuento, fecha_inicio, fecha_fin, estado, id_promocion];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.send(`Promoción con id ${id_promocion} actualizada correctamente`);
  });
});

module.exports.agregar = app.post('/', (request, response) => {
  const { nombre, porcentaje_descuento, fecha_inicio, fecha_fin, estado } = request.body;

  const sql = `
    INSERT INTO Promociones (nombre, porcentaje_descuento, fecha_inicio, fecha_fin, estado)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [nombre, porcentaje_descuento, fecha_inicio, fecha_fin, estado];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.status(200).send(`Promoción registrada correctamente con id ${results.insertId}`);
  });
});

module.exports.eliminar = app.delete('/:id', (request, response) => {
  const id_promocion = request.params.id;

  const sql = "DELETE FROM Promociones WHERE id_promocion = ?";
  connection.query(sql, id_promocion, (error, results) => {
    if (error) throw error;
    if (results.affectedRows > 0) {
      response.status(200).send(`Promoción con id ${id_promocion} eliminada correctamente`);
    } else {
      response.status(404).send(`Promoción con id ${id_promocion} no encontrada`);
    }
  });
});
