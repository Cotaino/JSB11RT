const getDB = require("../db/getDB");
const { generateError } = require("../helpers");

const canEditProduct = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Solamente el usuario propietario del producto a "editar" puede modificar sus datos

        // Id del producto que queremos modificar
        const { idProduct } = req.params;

        // Id del usuario login
        const idReqUser = req.userAuth.id;

        // Una consulta a la base de datos donde se seleccione un campo de la tabla producto WHERE el id corresponda
        // con el idProduct y el idUser que lo ha subido corresponde con el idReqUser

        const [user] = await connection.query(
            `SELECT * FROM product WHERE id = ? AND idUser = ?`,
            [idProduct, idReqUser]
        );

        // Si la consulta no devuelve ningún resultado quiere decir que el producto a editar no pertenece al usuario logueado
        if (user.length < 1) {
            throw generateError('No eres el propietario del producto a editar', 401);
        }

        // Si es el propietario del producto pasamos la pelota
        next();

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = canEditProduct;