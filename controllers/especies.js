require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

module.exports.buscar_todo = app.get('/', (request, response) => {
  const sql = `
    SELECT
      id_especie,
      nombre
    FROM Especies
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
  const id_especie = request.params.id;
  const sql = `
    SELECT
      id_especie,
      nombre
    FROM Especies
    WHERE id_especie = ?
  `;
  connection.query(sql, id_especie, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      response.status(200).send(results[0]);
    } else {
      response.status(204).send('Sin resultado');
    }
  });
});

module.exports.actualizar = app.patch('/', (request, response) => {
  const { id_especie, nombre } = request.body;

  const sql = `
    UPDATE Especies
    SET nombre = ?
    WHERE id_especie = ?
  `;

  const values = [nombre, id_especie];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.send(`Especie con id ${id_especie} actualizada correctamente`);
  });
});

module.exports.agregar = app.post('/', (request, response) => {
  const { nombre } = request.body;

  const sql = `
    INSERT INTO Especies (nombre)
    VALUES (?)
  `;

  const values = [nombre];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    response.status(200).send(`Especie registrada correctamente con id ${results.insertId}`);
  });
});

module.exports.eliminar = app.delete('/:id', (request, response) => {
  const id_especie = request.params.id;

  const sql = "DELETE FROM Especies WHERE id_especie = ?";
  connection.query(sql, id_especie, (error, results) => {
    if (error) throw error;
    if (results.affectedRows > 0) {
      response.status(200).send(`Especie con id ${id_especie} eliminada correctamente`);
    } else {
      response.status(404).send(`Especie con id ${id_especie} no encontrada`);
    }
  });
});
