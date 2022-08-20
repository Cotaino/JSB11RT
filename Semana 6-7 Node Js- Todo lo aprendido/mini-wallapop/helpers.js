
// Archivo de ayuda donde crearemos funciones que utilizaremos en más de un archivo

const { unlink } = require('fs/promises');
const path = require('path'); // dependencia que nos sirve para crear rutas absolutas
const sharp = require('sharp');
const uuid = require('uuid');

// Creamos la ruta absoluta a la carpeta de avatares 
const avatarDir = path.join(__dirname, 'static/avatares');

// Creamos la ruta absoluta a la carpeta de productos 
const productsDir = path.join(__dirname, 'static/products');

// Funcion que genera un error
function generateError(message, code){
    const error = new Error(message);
    error.httpStatus = code;
    return error;
}
// Funcion que elimina una foto
async function deletePhoto(photoName, type) {
    // añado una propiedad type para diferenciar ruta a avatares de `rpdictps 0 = avaratares 1 = products
    try {
        let photoPath; // ruta absoluta a la imagen a borrar

        if (type === 0){
            // Si el type es 0 es una imagen de avatar lo que enviamos
            // Creamos la ruta absoluta al directorio de avatares junto al nombre de imagen
            photoPath = path.join(avatarDir, photoName);
        } else if (type === 1){
            // Tipo 1 es imagen de productos
            photoPath = path.join(productsDir, photoName);
        }

        // Eliminamos la imagen
        await unlink(photoPath);
    } catch (error) {
        throw new Error('Error al eliminar la imagen del servidor');
    }
}

// Funcion que guarda una foto en el servidor, devolverá el nombre de la foto para guardarlo en la base de datos

async function savePhoto(imagen,type){
    // Recibimos la imagen y el tipo, para diferenciar si se guarda en la carpeta avatars o products

    try {

        const sharpImagen = sharp(imagen.data);

        // Variable que guardará la ruta absoluta a la carpeta donde se guarda la imagen junto a su nombre
        let imagenDirectory;

        // Generar un nombre único a la imagen
        const imageName = uuid.v4() + '.jpg';

        // Según el tipo de la imagen creamos una ruta absoluta junto al nombre al directorio de avatares o products
        if (type === 0 ){
            // Si el type es 0 es una avatar
            imagenDirectory = path.join(avatarDir, imageName);

            // Como es una imagen de avatar, vamos a redimensionarla para que sea más pequeña
            sharpImagen.resize(150, 150);
        } else if (type === 1){
            // Si es una imagen de tipo producto, es una ruta distinta
            imagenDirectory = path.join(productsDir, imageName);
        }

        // Guarda la imagen
        await sharpImagen.toFile(imagenDirectory);
        // Retornar el nombre único de la imagen para guardarla en base de datos
        return imageName;
        } catch (error){
           throw new Error('Error al procesar la imagen');
        }
    }

// Funcion que valida el schema con los datos ingresados
async function validate (schema, data) {
    try {
        await schema.validateAsync(data);
    } catch (error) {
        error.httpStatus = 400; //Bad Request
        throw error;
    }
}

// El module.exports tiene que estar al final del archivo SIEMPRE
module.exports = {
    generateError,
    deletePhoto,
    savePhoto,
    validate
};