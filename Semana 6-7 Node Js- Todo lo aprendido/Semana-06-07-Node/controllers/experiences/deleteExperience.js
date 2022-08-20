const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const deleteExperience = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idExperience } = req.params;

        // Si la experiencia tiene fotos asignadas, primero deberíamos seleccionarlas y elliminarlas
        // de una en una recorriendolas

        // Comprobamos que la experiencia que nos indican existe
        const [experiencia] = await connection.query(
            `SELECT id FROM experiencia WHERE id = ?`,
            [idExperience]
        );

        // Si no devuelve ningun resultado, es que esa experiencia no existe, lanzaremos un error
        if (experiencia.length < 1) {
            throw generateError(
                'La experiencia que intentas eliminar no existe',
                404
            );
        }

        // Si existe la experienica y el usuario es un administrador (middleware isAdmin)
        await connection.query(`DELETE FROM experiencia WHERE id = ?`, [
            idExperience,
        ]);

        res.send({
            status: 'ok',
            message: 'Experiencia eliminada correctamente!',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteExperience;
