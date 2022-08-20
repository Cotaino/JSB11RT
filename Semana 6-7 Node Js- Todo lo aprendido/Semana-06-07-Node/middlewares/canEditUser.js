const getDB = require('../db/getDB');
const { generateError } = require('../helpers');

const canEditUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Normalmente recibiremos un id de usuario que queremos editar de los parametros de ruta (path params)
        const { idUser } = req.params;

        // Guardamos en una variable que creamos nosotros que guarda el id del usuario logueado
        const idReqUser = req.userAuth.id;

        // Si son distintos id (distintos usuarios) no le permitimos continuar
        if (Number(idUser) !== idReqUser) {
            throw generateError(
                'No eres el propietario del usuario a editar',
                401
            );
        }

        next();
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = canEditUser;
