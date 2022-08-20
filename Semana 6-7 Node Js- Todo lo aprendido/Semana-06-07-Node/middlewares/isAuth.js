const getDB = require('../db/getDB');
const { generateError } = require('../helpers');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuth = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Comprobamos que existe un token de autorizacion y que ese token pertenece a un usuario y lo hemos creado nosotros (el token)

        // Obtener la cabecera de autorizacion (que contiene el token)
        const { authorization } = req.headers;

        // Si no existe ese campo, lanzamos un error
        if (!authorization) {
            throw generateError('Falta la cabecera de autorizacion', 400);
        }

        // Creamos la variable que albergará la info del token (que es el id del usuario logueado)
        let tokenInfo;

        try {
            // Desencriptar el token
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (error) {
            throw generateError('No has iniciado sesion', 401);
        }

        // Comprobamos que con el id recibido del token, hay algun usuario en la base de datos
        const [user] = await connection.query(
            `SELECT * FROM usuario WHERE id = ?`,
            [tokenInfo.id]
        );

        if (user.length < 1) {
            throw generateError('El token no es válido', 401);
        }

        // Si el token es válido

        // Añadimos una nueva propiedad a la request con la informacion del usuario logueado
        req.userAuth = tokenInfo;

        // Si todo está ok, pasamos la pelota al siguiente middleware
        next();
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = isAuth;
