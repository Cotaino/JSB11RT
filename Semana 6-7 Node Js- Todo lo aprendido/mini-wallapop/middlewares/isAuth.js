const getDB = require("../db/getDB");
const jwt = require('jsonwebtoken');
const { generateError } = require("../helpers");
require ('dotenv').config();

// Comprueba que existe la cabecera de autorización y el susuario está logueado
const isAuth = async (req, res, next) => {

 let Connection;
    // Los middleware NO envían una respuesta, dejan pasar la peticion -> nect ()

    try{
        Connection = await getDB();

        // Obtener la cabecera de autorización
        
        const {authorization} = req.headers;

        // Si no indica la cabecera de autorización lanzaremos un error
        if(!authorization){
            throw generateError('Falta la cabecera de autorización', 401); // Unauthorized
        }

        // Variable que almacenará la info del token
        let tokenInfo;

        // Desencriptar el token (cabecera de autorización) recibida
        try{
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (error){
            // Si el token no es valido, no es generado por nosotros
            throw generateError('No has iniciado sesión', 401);
        }

        // El token devuelve un id, seleccionamos de la base de datos al usuario con ese id
        const [user] = await Connection.query(`SELECT id FROM user WHERE id =?`,[
            tokenInfo.id,
        ]);

        // Si no hubiera un suario con ese id en la base de datos lanzariamos un error
        if(user.length < 1){
            throw generateError('El token no es válido', 401);     
        }

        // Si el usuario existe, y el token es válido, creamos en la request una propiedad que guardará
        // el id del usuario que ha hecho login
        req.userAuth = tokenInfo;
        console.log(req.userAuth);
        // Pasasmos la pelota
        next();
    }   catch (error) {
        next(error);
    }
         finally {
        if (Connection) Connection.release(); // Si existe la conexión -> la cierras
    }
};

module.exports = isAuth;
