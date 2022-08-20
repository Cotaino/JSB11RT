/**
 * ###################
 * ### Ejercicio 4 ###
 * ###################
 *
 * Servidor web que escucha en el puerto 4000.
 *
 * - Cuando la request es un 'POST' a '/data', se devuelve el *JSON* recibido.
 *
 * - Cuando se llama a cualquier otra ruta con cualquier método, devuelve status `404` (not found)
 * con el body:
 *
 *      {
 *          message: 'No lo encuentro'
 *      }
 */

// Lo que se pretende en el POSt es que lo que se escriba en el JSON del body se envie como res.send() es una tontería
// solo para practicar

const express = require("express"); // Cuando queremos trabajar trabajar con una depedencia que hay que requerirla AL INICIO

 const app = express(); // Crea un servidor/aplicacion

 // Para poder leer esto necesitamos deserializarlo
 app.use(express.json());

 // Endpoin a /data
 app.post("/data", (req, res) =>{
    // Recuperamos las variables escritas en json del body
    const {dato1, dato2, dato3} = req.body;

    res.send({
        valor: dato1,
        valor2: dato2,
        valor3: dato3,
    });
 });

 //MIddleware not found
 app.use((req, res) => {
    res.status(404);

    res.send({
    message: "no lo encuentro",
 });
});

// Ponemos el servidor a la escucha en el puerto 4000
 app.listen(4000,() => {
console.log(`Server listening at http://localhost:4000`)
});