const getDB = require("../../db/getDB");
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");
require("dotenv").config();

const loginUser = async (req, res, next) =>{
    let connection;

    try{
        // establecemos una conexion a la base de datos
        connection = await getDB();

        // Obtener los datos email y password del body
        const {email, password} = req.body;

        if (!email || !password){
            const error = new Error("Faltan campos obligatorios");
            error.httpStatus = 400; // Bad Request
            throw error;
        }

        // Comprobamos que existe un usuario con ese email en la base de datos
        const [user] = await connection.query(
            'SELECT id, email, password FROM user WHERE email = ?',
            [email]
        );
    // Si no existe un usuario con ese email? Lanzamos un error
    if (user.length < 1) {
        const error = new Error(
            " No existe un usuario registrado con ese email"
        );
        error.httpStatus = 404; // Not found
        throw error;
    }
    // Si existe un usuario con ese email comprobamos que las contraseñas coinciden

    const validPassword = await bcrypt.compare(password, user[0].password);

    // Si no coinciden las contraseñas damos un error
    if (!validPassword) {
        const error = new Error ("La contraseña es incorrecta");
        error.httpStatus = 401; // Not found
        throw error;
    }


        // Si el usuario indica un email y contraseña correctos, generamos un token de inicio de sesión

        // Crear un objeto con la información que pasemos al token
        const tokenInfo = {
            id: user[0].id,
        };

        // Crear el token
        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '10d',
        });

        res.send({
            status: "Ok",
            authToken: token,
        });

    } catch(error){
        next(error);
    }finally{
        if (connection) connection.release();
    }
};

module.exports = loginUser;