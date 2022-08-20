/*
    Estructura por defecto de todos los controladores

    Puede cambiar el New User
*/

const getDB = require("../../db/getDB")

const template = async (req, res, next) => {
    let connection;

    try{
        // Abrir una nueva conexion a la base de datos
        connection = await getDB();
    } catch (error){
        // Los errores que ocurran los pasamos al siguiente middleware ( el de error)
        next(error);
    }finally{
        // Siempre debemos cerrar la conexion con la BBDD
        if (connection) connection.release();
    }
}

module.exports = template;