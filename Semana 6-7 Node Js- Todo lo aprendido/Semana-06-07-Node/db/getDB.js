const mysql = require('mysql2/promise');
require('dotenv').config();

// requerimos las variables de entorno desde dotenv
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env; 

// Creamos la función que devolverá una conexión a la base de datos
const getDB = async () => {
    let pool;

    try{
        if (!pool) {
            // Crear un grupo de conexiones
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z',
            });

            // Ejecutamos el método getConnection y devolvemos una conexión libre
            return await pool.getConnection();
        }
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = getDB;