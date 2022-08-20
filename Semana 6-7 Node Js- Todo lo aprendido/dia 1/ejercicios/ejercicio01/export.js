// Creamos 2 funciones

// Funcion  saludo
const saludo = (nombre) => {
return "Hola ${nombre}, que tal estás?";
};

//Funccion que recorre desde 0 hasta el número indicado
const bucle = (numero) => {
    for (let i = 0; i <= numero; i++){
        console.log(i);
    }
}

// Exportamos las funciones
module.exports = {
    saludo,
    bucle
};