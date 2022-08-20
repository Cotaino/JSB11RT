const getDB = require ('../../db/getDB');
const { generateError } = require('../../helpers');

const modifyUser = async (req,res, next) => {
    let Connection;

    try {
        Connection = await getDB();

        // Recuperanos el id del usuario a modificar
        const {idUser} = req.params;

        // Recuperamos el email y username que quiere modificar el usuario
        const { email, username} = req.body;

        // Si no nos indica ningúno de los datos
        if (!(email || username)){
            throw generateError('Si no vas a hacer nada pa que tocas', 400);
        }

        // ANtes de modificar el usuario, vamos a recuuperar los datos anteriores
        // de la bbdd
        const [user] = await Connection.query(
            `SELECT email, username FROM user where id = ?`,
            [idUser]
        );

        // Hacemos la actualización, si no indicado un dato (email o username)
        // lo actualizaremos por el dato guardado previamente en la BBDD
        await Connection.query(
            `UPDATE user SET email = ?, username = ? WHERE id = ?`,
            [email ||user[0].email, username || user[0].username, idUser]
        );

        res.send({
            status: 'Ok',
            message: 'Datos del usuario modificados con éxito',
        });
    } catch (error) {
        next (error);
    }finally{
        if (Connection) Connection.release();
    }
};

module.exports = modifyUser;