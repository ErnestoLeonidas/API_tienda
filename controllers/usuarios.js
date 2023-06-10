require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = `
        SELECT
            id_usuario,
            rut,
            nombres,
            ap_paterno,
            ap_materno,
            esta_suscrito,
            id_rol
        FROM Usuarios 
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

module.exports.buscar_activos = app.get('/', (request, response) => {  
    const sql = `
        SELECT
            id_usuario,
            rut,
            nombres,
            ap_paterno,
            ap_materno,
            esta_suscrito,
            id_rol
        FROM Usuarios 
        WHERE estado = 1
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
    const id_usuario = request.params.id;
    const sql = `
        SELECT
            id_usuario,
            rut,
            nombres,
            ap_paterno,
            ap_materno,
            esta_suscrito,
            id_rol
        FROM Usuarios 
        WHERE id_usuario = ?
        `;
    connection.query(sql, id_usuario, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    });               
});

module.exports.actualizar = app.patch('/', (request, response) => {  
    const {
        id_usuario,
        rut,
        nombres,
        ap_paterno,
        ap_materno,
        esta_suscrito,
        id_rol
    } = request.body;
    
    const sql = `
        UPDATE Usuarios
        SET rut = ?,
            nombres = ?,
            ap_paterno = ?,
            ap_materno = ?,
            esta_suscrito = ?,
            id_rol = ?
        WHERE id_usuario = ?
    `;

    const values = [
        rut,
        nombres,
        ap_paterno,
        ap_materno,
        esta_suscrito,
        id_rol,
        id_usuario
    ];
    
    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        response.send(`Usuario con id ${id_usuario} actualizado correctamente`);
    });               
});

module.exports.agregar = app.post('/', (request, response) => {  
    const {
        rut,
        nombres,
        ap_paterno,
        ap_materno,
        esta_suscrito,
        id_rol
    } = request.body;

    const sql = `
        INSERT INTO Usuarios (rut, nombres, ap_paterno, ap_materno, esta_suscrito, id_rol)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        rut,
        nombres,
        ap_paterno,
        ap_materno,
        esta_suscrito,
        id_rol
    ];
    
    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        response.status(200).send(`Usuario registrado correctamente con id ${results.insertId}`);
    });
});

module.exports.eliminar = app.delete('/:id', (request, response) => {  
    const id_usuario = request.params.id;
    
    const sql = "UPDATE Usuarios SET estado = 0 WHERE id_usuario = ?";
    connection.query(sql, id_usuario, (error, results) => {
        if (error) throw error;
        if (results.affectedRows > 0) {
            response.status(200).send(`Usuario con id ${id_usuario} eliminado correctamente`);
        } else {
            response.status(404).send(`Usuario con id ${id_usuario} no encontrado`);
        }
    });
});