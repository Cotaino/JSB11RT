const getDB = require('../db/getDB');
const { generateError } = require('../helpers');

const isAdmin = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // En el middleware de isAuth guardamos una propiedad nueva en la request, el id del usuario logueado
        const idReqUser = req.userAuth.id;

        // Consultamos a la base de datos segun el id del usuario logueado y sacamos el tipo de usuario que es
        const [user] = await connection.query(
            `SELECT tipo FROM usuario WHERE id = ?`,
            [idReqUser]
        );

        // Si el tipo de este usuario NO es admin, lanzamos un error
        if (user[0].tipo !== 'admin') {
            throw generateError('No eres un usuario administrador', 401);
        }

        // Si el tipo de usuario es un administrador, continuamos
        next();
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = isAdmin;
