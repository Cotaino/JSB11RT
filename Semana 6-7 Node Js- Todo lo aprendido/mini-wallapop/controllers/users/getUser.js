const getDB = require('../../db/getDB');

const getUser = async (req, res, next) => {
    let connection;

    try{
        //abrir la conexion
        connection = await getDB();

        // Recuperamos el path param del usuario que queremos saber los datos
        const {idUser} = req.params;

        // Seleccionamos todos los datos del usuario con el id indicado de la BBDD
        const [user] = await connection.query(
            `SELECT * FROM user WHERE id = ?`,
            [idUser]
        );

        // Comprobar que existe un usuario con ese id en la base de datos
        if (user.length < 1){
            const error = new Error('No existe el usuario seleccionado');
            error.httpStatus = 404; // Not found
            throw error;
        }
        
        // SI el usuario si que existe lo devolvemos
        res.send({
            status: "Ok",
            data: user[0],
        });

    }catch (error){
        next(error);
    } finally{
        if (connection) connection.release();
    }
};

module.exports = getUser;