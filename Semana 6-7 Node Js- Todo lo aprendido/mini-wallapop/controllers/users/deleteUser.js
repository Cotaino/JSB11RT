const getDB = require('../../db/getDB');
const { generateError, deletePhoto } = require('../../helpers');
const bcrypt = require('bcrypt');

const deleteUser = async (req, res, next) => {
    let connection;

    try{
        connection = await getDB();

        const { idUser } = req.params;

        const { password } = req.body;

        // Si no indica la contraseña no permitimos eliminar el usuario
        if (!password) {
            throw generateError(
                'Debes indicar la contraseña para eliminar al usuario',
                400
            );
        }

        // Si la indica, primero vamos a recuperar la contraseña guardada en la BBDD para compararlas
        const [user] = await connection.query(
            `SELECT password, avatar FROM user WHERE id = ?`,
            [idUser]
        );

        // Comparar la contraseña recibida con la guardada en base de datos
        const isValid = await bcrypt.compare(password, user[0].password);

        // Si no son iguales, lanzamos un error
        if (!isValid) {
            throw generateError(
                'La contraseña no es correcta, no puede eliminar al usuario',
                401
            );
        }

        // Si está todo correcto hasta aquí, comprobamos si tiene un avatar, si es así lo eliminamos
        if (user[0].avatares) {
            await deletePhoto(user[0].avatares, 0);
        }

        // Una vez eliminada la imagen del usuario, nos lo podemos cargar
        await connection.query(`DELETE FROM user WHERE id = ?`, [idUser]);

        // Si lo elimina sin problema, enviamos una respuesta
        res.send({
            status: 'Ok',
            message: 'Usuario eliminado!',
        });
    } catch(error){
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteUser;