require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

module.exports.buscar_todo = app.get('/', (request, response) => {
  const sql = `
    SELECT
      id_donacion,
      fecha_donacion,
      monto,
      id_usuario
    FROM Donaciones
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

module.exports.buscar_activos = app.get('/activos', (request, response) => {
  const sql = `
    SELECT
      id_donacion,
      fecha_donacion,
      monto,
      id_usuario
    FROM Donaciones
    WHERE estado = '1'
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
  const id_donacion = request.params.id;
  const sql = `
    SELECT
      id_donacion,
      fecha_donacion,
      monto,
      id_usuario
    FROM Donaciones
    WHERE id_donacion = ?
  `;
  connection.query(sql, id_donacion, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      response.status(200).send(results[0]);
    } else {
      response.status(204).send('Sin resultado');
    }
  });
});

module.exports.actualizar = app.patch('/', (request, response) => {
  const { id_donacion, fecha_donacion, monto, id_usuario } = request.body;

  const sql = `
    UPDATE Donaciones
    SET fecha_donacion = ?,
      monto = ?,
      id_usuario = ?
    WHERE id_donacion = ?
  `;

  const values = [fecha_donacion, monto, id_usuario, id_donacion];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.send(`Donación con id ${id_donacion} actualizada correctamente`);
  });
});

module.exports.agregar = app.post('/', (request, response) => {
  const { fecha_donacion, monto, id_usuario } = request.body;

  const sql = `
    INSERT INTO Donaciones (fecha_donacion, monto, id_usuario)
    VALUES (?, ?, ?)
  `;

  const values = [fecha_donacion, monto, id_usuario];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.status(200).send(`Donación registrada correctamente con id ${results.insertId}`);
  });
});

module.exports.eliminar = app.delete('/:id', (request, response) => {
  const id_donacion = request.params.id;

  const sql = "DELETE FROM Donaciones WHERE id_donacion = ?";
  connection.query(sql, id_donacion, (error, results) => {
    if (error) throw error;
    if (results.affectedRows > 0) {
      response.status(200).send(`Donación con id ${id_donacion} eliminada correctamente`);
    } else {
      response.status(404).send(`Donación con id ${id_donacion} no encontrada`);
    }
  });
});
