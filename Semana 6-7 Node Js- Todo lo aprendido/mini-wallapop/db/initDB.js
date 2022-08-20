/*
    Archivo que iniciará y reiniciará las tablas de la base da datos
    e intentará algunos datos de ejemplo
*/

// Requerimos getDB que hará la conexion con la base de datos
const getDB = require("./getDB");
require("dotenv").config();
// Funcion que qcreará y borrara la base de datos
async function main(){

    // Crear la variable que albergará la base de datos
    let connection;
    try {
        // Abrir una conexion con la base de datos
        connection = await getDB();
        

        // Eliminar las tablas de la base de datos si existen
        console.log("Eliminando tablas...")

        await connection.query(` DROP TABLE IF EXISTS product_photo`);
        await connection.query(` DROP TABLE IF EXISTS product`);
        await connection.query(` DROP TABLE IF EXISTS user`);




        // Crear las tablas de la base de datos
        console.log("Creando tablas...");

        await connection.query(`
            CREATE TABLE IF NOT EXISTS user (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR (30) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR (200) NOT NULL,
                avatar VARCHAR (255),
                createdAt DATETIME
            )
        `);

        await connection.query(`
                CREATE TABLE IF NOT EXISTS product(
                    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(50) NOT NULL,
                    precio DECIMAL(8,2) NOT NULL,
                    description TEXT,
                    sold BOOLEAN DEFAULT false,
                    createdAt DATETIME,
                    idUser INT UNSIGNED NOT NULL,
                    FOREIGN KEY (idUser) REFERENCES user (id)
                )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS product_photo(
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                idProduct INT UNSIGNED NOT NULL,
                FOREIGN KEY (idProduct) REFERENCES product (id)
            )
        `);

        console.log("Tablas creadas!");

        // Insertar algunos datos de ejemplo

        console.log("Insertando datos de prueba...");

        await connection.query(`
                INSERT INTO user (username, email, password, createdAt)
                VALUES ("userPrueba01", "emailprueba@gmail.com", "123456", ?)
        `,
            [new Date()]
        ); 

        await connection.query(`
                INSERT INTO product (name, precio, description, createdAt, idUser)
                VALUES ("Videocamara", 20.10, "Esto es una camara", "2022-08-09", 1),
                ("Game Boy", 20.10, null, "2021-06-09", 1),
                ("Teclado mecanico", 20.10, "Esto es un teclado", "2022-05-09", 1),
                ("Guantes ElBronx", 85.99, "Estos son guantes", "2022-04-09", 1)
        `
        );
        
        await connection.query(
            `INSERT INTO product_photo (name, idProduct)
            VALUES ("foto.jpg", 1),
            ("foto.jpg", 1),
            ("foto.jpg", 2),
            ("foto.jpg", 3),
            ("foto.jpg", 4)
            `
        );

        console.log("Completado con éxito");
        
    } catch (error) {
        console.error(error.message);
        } finally{
            // Si o si al final del try catch, ejecutara el codigo dentro del finally

            // Siempre al final cerraremos la conexion con la base de datos
            if (connection) connection.release();

            // Finalizamos la ejecucion del script
            process.exit();
        }
    }


// Ejecutamos la función
main();