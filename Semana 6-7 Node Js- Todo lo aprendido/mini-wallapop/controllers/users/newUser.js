const getDB = require("../../db/getDB");
const bcrypt = require("bcrypt"); // requerimos la dependencia bcrypt para encriptar la contraseña
const { generateError } = require("../../helpers");
const newUser = async (req, res, next) => {
    let connection;

    try{
        // Abrir una nueva conexion a la base de datos
        connection = await getDB();

        // Recuperar los datos que indique el usuario
        const {email, username, password} = req.body;

        // Comprobaciones
        if (!email || !username || !password) {
            // Si no existe alguno de los campos obligatorios, Lanzamos un error
            throw generateError('Faltan campos obligatorios', 400); // Bad Request
        }

        // Comprobamos que el email no existe previamente en la base de datos
        const [user] = await connection.query(
            `SELECT ID FROM user WHERE email = ?`,
            [email]
        );

        // Si la consulta devuelve algun dato quiere decir que ya existe un usuario con ese email
        if(user.length > 0){
            throw generateError('Ya existe un usuario con este email', 404);// Conflict
        }

        // Encriptamos la contraseña -> instalamos una nueva dependencia brcypt
        const hashedPassword = await bcrypt.hash(password, 10)


        // Insertar el usuario nuevo
        await connection.query(
            `INSERT INTO user (username, email, password, createdAt)
            VALUES (?,?,?,?)`,
            [username, email, hashedPassword, new Date()]
        );

        // Enviar una respuesta conforme todo ha ido ok
        res.send({
            status: "Ok",
            message: "Usuario creado con éxito",
        });

    } catch (error){
        // Los errores que ocurran los pasamos al siguiente middleware ( el de error)
        next(error);
    }finally{
        // Siempre debemos cerrar la conexion con la BBDD
        if (connection) connection.release();
    }
}

module.exports = newUser;