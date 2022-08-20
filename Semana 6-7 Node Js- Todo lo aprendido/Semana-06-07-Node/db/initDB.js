const getDB = require('./getDB');

// Creamos la funcion que reinicia las tablas de la BBDD
async function main() {
    let connection;

    try {
        // Abrir la conexion
        connection = await getDB();

        console.log('Conexion realizada');

        console.log('Eliminando tablas...');

        await connection.query('DROP TABLE IF EXISTS experiencia');
        await connection.query('DROP TABLE IF EXISTS empresa');
        await connection.query('DROP TABLE IF EXISTS usuario');

        console.log('Tablas eliminadas!');

        console.log('Creando tablas...');

        await connection.query(
            `CREATE TABLE IF NOT EXISTS usuario (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                nombre VARCHAR(50) NOT NULL,
                apellido1 VARCHAR(50) NOT NULL,
                apellido2 VARCHAR(50),
                fecha_nac DATE,
                email VARCHAR(200) NOT NULL,
                password VARCHAR(255) NOT NULL,
                avatar VARCHAR(255),
                tipo ENUM('admin', 'normal') DEFAULT 'normal',
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`
        );

        await connection.query(
            `CREATE TABLE IF NOT EXISTS empresa (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                nombre VARCHAR(100) NOT NULL
            )`
        );

        await connection.query(
            `CREATE TABLE IF NOT EXISTS experiencia (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                titulo VARCHAR(200) NOT NULL,
                precio DECIMAL(8, 2) NOT NULL,
                descripcion TEXT,
                localizacion VARCHAR(100) NOT NULL,
                idEmpresaOrganiza INT UNSIGNED NOT NULL,
                FOREIGN KEY (idEmpresaOrganiza) REFERENCES empresa (id)
            )`
        );

        console.log('Tablas creadas!');

        console.log('Insertando datos de ejemplo');

        await connection.query(
            `INSERT INTO usuario (nombre, apellido1, email, password, tipo)
            VALUES ('Administrador', 'Admin', 'administrador@gmail.com', '123', 'admin')`
        );

        await connection.query(
            `INSERT INTO empresa (nombre)
            VALUES ('MediMarkt'),
                   ('Ikea')`
        );

        await connection.query(
            `INSERT INTO experiencia (titulo, precio, descripcion, localizacion, idEmpresaOrganiza)
            VALUES ('Lectura', 10.20, 'Lectura tranquila', 'Biblioteca Mercedes', 1),
            ('Futbol', 2000, null, 'Vigo', 1),
            ('Paseo en kayak', 49.99, 'No te caigas', 'Sella', 2),
            ('Escalada', 500, 'No tan tranquila', 'Picos de europa', 2)`
        );

        console.log('Datos insertados!');
    } catch (error) {
        console.error(error.message);
    } finally {
        if (connection) connection.release();
        process.exit(); // Para finalizar el script
    }
}

// Ejecutamos la funcion main
main();