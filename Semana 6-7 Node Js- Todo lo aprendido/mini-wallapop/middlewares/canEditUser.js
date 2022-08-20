// Compara el id del usuario logueado con el id del que quiere modificar
// SI es el mismo, permite la modificación, si no da un error

const getDB = require("../db/getDB");
const  {generateError}  = require("../helpers");

const canEditUser = async (req, res, next) => {
    let Connection;
    try{
        Connection = await getDB();

        // Recuperar el id del usuario de los params
        const{idUser} = req.params;

        // Id del usuario que hace la request (el que está login)
        const idReqUser = req.userAuth.id;

        // Si son distintos id, no son el mismo usuario, por lo tanto
        // no permitimos que modifique sus datos
        if (Number(idUser) !== idReqUser) {
            throw generateError(
                'No eres el propietario del usuario a editar',
                401
            );
        }

        // Si son el mismo id
        next();
    }  catch (error){
        next (error);
    } finally {
        if (Connection) Connection.release();
    }
};

module.exports = canEditUser;