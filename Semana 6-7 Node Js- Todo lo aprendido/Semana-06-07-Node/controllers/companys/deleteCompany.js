const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const deleteCompany = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idCompany } = req.params;

        // Antes de eliminar la empresa comprobamos que existe
        const [company] = await connection.query(
            `SELECT * FROM empresa WHERE id = ?`,
            [idCompany]
        );

        if (company.length < 1) {
            throw generateError('La empresa seleccionada no existe', 404);
        }

        // Si eliminamos una compañia, con ella deberiamos de eliminar todas
        // sus experiencias

        // Primero seleccionamos las experiencias que le pertenecen
        const [experiencias] = await connection.query(
            `SELECT id FROM experiencia WHERE idEmpresaOrganiza = ?`,
            [idCompany]
        );

        // No sería un error que la consulta no devuelva ningun valor, puede haber
        // una empresa que no haya subido ninguna experiencia

        // En caso de que sí que tenga alguna experiencia creada, procederemos a eliminarlas
        if (experiencias.length > 0) {
            // La consulta anterior devuelve el id de cada experiencia creada por la empresa
            for (let i = 0; i < experiencias.length; i++) {
                // Si la experiencia tiene fotos asignadas, tendríamos que recuperarlas de la base de datos
                // Recorrerlas (todos los resultados) con un bucle for
                // en cada vuelta eliminar cada una de las fotos

                // En cada vuelta vamos a usar el id de esa experiencia para eliminarla
                await connection.query(`DELETE FROM experiencia WHERE id = ?`, [
                    experiencias[i].id,
                ]);
            }
        }

        // Una vez eliminadas todas las experiencias que pertenezcan a esa empresa

        await connection.query(`DELETE FROM empresa WHERE id = ?`, [idCompany]);

        res.send({
            status: 'Ok',
            message: 'La empresa y todas sus experiencias han sido eliminadas.',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteCompany;
