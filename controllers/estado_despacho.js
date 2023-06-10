require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

module.exports.buscar_todo = app.get('/', (request, response) => {
  const sql = `
    SELECT
      id_estado_despacho,
      nombre
    FROM Estado_Despacho
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
  const id_estado_despacho = request.params.id;
  const sql = `
    SELECT
      id_estado_despacho,
      nombre
    FROM Estado_Despacho
    WHERE id_estado_despacho = ?
  `;
  connection.query(sql, id_estado_despacho, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      response.status(200).send(results[0]);
    } else {
      response.status(204).send('Sin resultado');
    }
  });
});

module.exports.actualizar = app.patch('/', (request, response) => {
  const { id_estado_despacho, nombre } = request.body;

  const sql = `
    UPDATE Estado_Despacho
    SET nombre = ?
    WHERE id_estado_despacho = ?
  `;

  const values = [nombre, id_estado_despacho];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.send(`Estado de despacho con id ${id_estado_despacho} actualizado correctamente`);
  });
});

module.exports.agregar = app.post('/', (request, response) => {
  const { nombre } = request.body;

  const sql = `
    INSERT INTO Estado_Despacho (nombre)
    VALUES (?)
  `;

  const values = [nombre];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.status(200).send(`Estado de despacho registrado correctamente con id ${results.insertId}`);
  });
});

module.exports.eliminar = app.delete('/:id', (request, response) => {
  const id_estado_despacho = request.params.id;

  const sql = "DELETE FROM Estado_Despacho WHERE id_estado_despacho = ?";
  connection.query(sql, id_estado_despacho, (error, results) => {
    if (error) throw error;
    if (results.affectedRows > 0) {
      response.status(200).send(`Estado de despacho con id ${id_estado_despacho} eliminado correctamente`);
    } else {
      response.status(404).send(`Estado de despacho con id ${id_estado_despacho} no encontrado`);
    }
  });
});
