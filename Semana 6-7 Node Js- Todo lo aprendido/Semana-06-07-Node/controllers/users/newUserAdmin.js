const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const bcrypt = require('bcrypt');

const newUserAdmin = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Obtenemos por el req.body los datos para insertar un nuevo user
        const { name, lastname1, lastname2, birthday, email, password } =
            req.body;

        if (!name || !lastname1 || !email || !password) {
            throw generateError('Faltan campos obligatorios', 400);
        }

        // Comprobar que el email no exista previamente en la base de datos
        const [user] = await connection.query(
            `SELECT * FROM usuario WHERE email = ?`,
            [email]
        );

        if (user.length > 0) {
            throw generateError(
                'Ya existe un usuario con ese email en la base de datos',
                409
            );
        }

        // Encriptamos la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Una vez encriptada la contraseña podemos insertar el usuario nuevo

        await connection.query(
            `INSERT INTO usuario (nombre, apellido1, apellido2, fecha_nac, tipo, email, password)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                lastname1,
                lastname2,
                birthday,
                'admin',
                email,
                hashedPassword,
            ]
        );

        // Enviamos respuesta
        res.send({
            status: 'Ok',
            message: 'Usuario administrador insertado con éxito!',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newUserAdmin;
