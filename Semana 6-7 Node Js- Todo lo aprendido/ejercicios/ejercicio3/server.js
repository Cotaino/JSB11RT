/**
 * ###################
 * ### Ejercicio 3 ###
 * ###################
 *
 *  Servidor web que escucha en el puerto 4000
 *
 *  - Cuando se llama a '/curso' con el método GET, devuelve status `200` con el body:
 *
 *      {
 *          curso: 'backend'
 *      }
 *
 *  - Cuando se llama al endpoint '/message' con metodo GET, devuelve status `200` con body:
 *
 *      {
 *          message: 'Hello World'
 *      }
 *
 *  - Cuando se llama a cualquier otra ruta con cualquier método, devuelve status `404` (not found)
 *      con el body:
 *
 *      {
 *          message: 'No lo encuentro :('
 *      }
 */

 const express = require("express"); // Cuando queremos trabajar trabajar con una depedencia que hay que requerirla AL INICIO

 const app = express(); // Crea un servidor/aplicacion

 app.get("/curso", (request, response) => {
    res.send({
        curso: "backend",
    })
});     
 

 app.get("/message", (request, response)=> {
 
    res.send({
        curso: "backend",
    });
     });

//Middleware de not found

app.use((req, res) => {
    //Estado 404
    res.status(404)

    res.send({
        message: "No lo encuentro",
    });
     });


 
 // Ponemos el servidor a la escucha en el puerto 4000
 app.listen(4000,() => {
     console.log(`Server listening at http://localhost:4000`)
    });
