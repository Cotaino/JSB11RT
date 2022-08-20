// Modulo fs, nos permite trabajar con el sistema de archivos(crear, modificar, eliminar....(carpetas, archivos...))

// Utilizaremos la version asíncrona

const fs = require ("fs/promises"); 
const path = require("path");

// Funcion que lee el contenido de un fichero
const readFile = async () => {
    // Como vamos a trabajar con la versión asíncrona de fs, debemos indicarlo en la funcion
    try{
        // Crear la ruta absoluta al archivo que queremos leer
        const filePath = path.join(__dirname, "data", "data.txt");

        // Para leer el archivo usaremos el método readFile de el módulo fs
        const data = await fs.readFile(filePath, "utf-8"); // recibe 2 argumentos: la ryta al archivo a leer y la codificación de los caracteres
        console.log(data);
    }   catch (error){
        // En caso de que no exista el archivo o directorio el error que lanza fs es un code "ENOENT"
        if (error.code === "ENOENT"){
            console.log("No se ha encontrado el archivo o directorio");
        }  else {
            console.log(error);
        }
    } 
}

// ejecutamos la funcion readFile
readFile();