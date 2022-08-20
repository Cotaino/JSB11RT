// Eliminar un archivo usando fs

const fs = require("fs/promises");
const path = require ("path");

// funcion que elimina un fichero
const deleteFile = async () => {
    try {
        // Creamos la ruta absoluta ak archivo que queremos eliminar
        const filePath = path.join(__dirname, "data", "prueba.txt");

        //Eliminamos el archivo
        await fs.unlink(filePath);
    }
};