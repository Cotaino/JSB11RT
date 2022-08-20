const getDB = require("../../db/getDB");
const { generateError } = require("../../helpers");
const bcrypt = require('bcrypt');

// Función que modifica la contraseña del usuario
const editUserPassword = async (req, res, next) => {
    let connection;

    try {
        // Abrimos la conexión con la base de datos
        connection = await getDB();

        //Recuperamos el idUser de los parametros de ruta (path params)
        const { idUser } = req.params;

        // Obtenemos los campos del body
        const{ oldPass, newPass } = req.body;

        // Si no existe alguna de las contraseñas
        if (!oldPass || !newPass) {
            throw generateError('Debes indicar la constraseña antigua y la nueva para el cambio',
            400
            );
        }
        
        // Recuperamos la contraseña antigua de la base de datos
        const [user] = await connection.query(
            `SELECT password FROM user WHERE id = ?`,
            [idUser]
        );

        // Comprobamos que la contraseña antigua coincide con la guardada en la base de datos
        const isValid = await bcrypt.compare(oldPass, user[0].password);

        // Si la contraseña antigua no coincide 
        if (!isValid) {
            throw generateError('La contraseña antigua no coincide', 401); // Unauthorized
        }

        // Si la contraseña es correcta, encriptamos (hash) la constraseña nueva
        const hashedPassword = await bcrypt.hash(newPass, 10);

        // Actualizar la base de datos con la contraseña nueva
        await connection.query(
            `UPDATE user SET password = ? WHERE id = ?`,
            [hashedPassword, idUser]
        );

        // Si todo va bién, enviamos una respuesta, hemos modificado la contraseña
        res.send({
            status: 'Ok',
            message: 'Contraseña actualizada con éxito!',
        });
        
    } catch (error) {
        next (error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editUserPassword;