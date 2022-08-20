const express = require('express');
const app = express();
app.use(express.json());

// Controllers
const getHour = require('./controllers/getHour');

// Endpoints
app.get('/hours', getHour );

app.get("/direcctorio", getDirectory);
// Middleware de Error
app.use((error, req, res, next) =>{
    console.error(error);

    res.status(error.httpStatus || 500);

    res.send({
        status: 'Error',
        message: error.message,
    });
});

//Middleware de not found
app.use((req, res) => {
    //Establecemos el codigo 404 a la respuesta
    res.status(404);

    //Enviamos una respuesta
    res.send({
        status: "Error",
        message: "Not found"
    })
}
);




// Ponemos el servidor a la escucha
app.listen(4000, () =>{
    console.log("Server listening at http://localhost:4000")
});