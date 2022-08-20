/**
 * ###################
 * ### Ejercicio 1 ###
 * ###################
 *
 * Crea un servidor web que escucha cualquier request en el puerto 4000 y devuelve siempre un status `200` con el body:
 *
 *      {
 *          curso: 'backend'
 *      }
 */

// Cómo podemos ir haciendo los ejercicios?
// Primero de nada, en el package.json podemos modificar el script dev para ejecutar este archivo
// y el siguiente

///////

const express = require("express"); // Cuando queremos trabajar trabajar con una depedencia que hay que requerirla AL INICIO

const app = express(); // Crea un servidor/aplicacion

// Para escuchar y devolver una respuesta ante cualquier peticion usamos un middleware
app.use((req, res) => {

    // Para escuchar y devolver una respuesta ante cualquier peticion usaremos un middleware
    res.status(200);

    //Devolvemos la respuesta
    res.send({
        curso: "backend",
    });
});


// Ponemos el servidor a la escucha en el puerto 4000
app.listen(4000,() => {
    console.log(`Server listening at http://localhost:4000`)
});