/*
    Archivo encargado de hacer la concexiñon con la base de datos
*/
const mysql = require("mysql2/promise");
//requerimos dotenv para poder leer las variables del entorno del archivo.env
require("dotenv").config();

//Hacemos destructuring para acceder a las variables de entorno del process.env
const {MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE} = process.env;

// Funcion que exportaremos y devuelve una conexion a la base de datos
const getDB = async () =>{
    let pool;

    try{
        // Si tenemos conexiones libre, creamos una conexion nueva
        if(!pool){
        // Creamos un grupo de conexiones
        pool = mysql.createPool({
            connectionLimit: 10,
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
            database: MYSQL_DATABASE,
            timezone: "Z",
        });
    }
        // Ejecutar el método getConnection y devolver una conexion libre
            return await pool.getConnection();
    } catch (error){
            console.error(error.message);
        }
    };

// Exportar la funcion que devuelve una conexión en la BBDD
module.exports = getDB;
