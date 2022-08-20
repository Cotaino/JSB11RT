const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const newCompany = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Recuperamos del cuerpo de la peticion los campos necesarios
        const { nombre } = req.body;

        // Si no nos indican un nombre
        if (!nombre) {
            throw generateError(
                'Debes indicar al menos el nombre de la empresa',
                400
            );
        }

        // Si el nombre tiene menos de 3 caracteres
        if (nombre.length < 3) {
            throw generateError(
                'El nombre de la empresa debe tener más de 3 caracteres.',
                400
            );
        }

        // Si existe el nombre
        await connection.query(
            `INSERT INTO empresa (nombre)
            VALUES (?)`,
            [nombre]
        );

        res.send({
            status: 'ok',
            message: 'Empresa insertada!',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newCompany;
