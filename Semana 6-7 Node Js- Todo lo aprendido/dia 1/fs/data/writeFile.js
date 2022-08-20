// Escribir un archivo, usaremos fs y path
const fs = require("fs/promises");
const path = require("path");
const writeFile = async () => {
  try  {
        // Creamos la ruta al archivo que queremos escribir
        const filePath = path.join (__dirname, "data", "data", "prueba.txt");

        // Guardamos en una variable el contenido que vamos a escribir
        const fileContent = "Modificamos el fichero de texto";
        "Este archivo lo creamos usando fs y su metodo writeFile";
        // Escribimos el archivo de texto
        await fs.writeFile(filePath, fileContent);
    } catch (error) {
        // En caso de que no exita el archivo o directorio
        if (error.code === "ENOENT"){
            console.log("No se ha encontrado el archivo o directorio");
        } else{
            // Si no, mostramos el error que surja
            console.log(error);
        }
    }
};

writeFile();