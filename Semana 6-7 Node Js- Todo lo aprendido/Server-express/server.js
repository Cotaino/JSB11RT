// Requerimos el express
const expres = require("express");

// Creamos la aplicacion/servidor con express
const app = expres();

// Middleware que deserializa el body con el formato raw
app.use(expres.json());

// En express podemos crear "rutas" endpoints para obtener distintos datos del servidor
app.get("/user", (request, response) => {
    response.send({
        status: "Ok",
        message: "Aqui la lista de los usuarios",
    })
});
    // Lista de usuarios
    app.get('/users', (request, response) =>{
        // Contactar con la base de datos
        
        // Hacer una consulta sobre los usuarios que existan

        // Responder con los datos necesarios

        // Ruta al que se hace la request
        console.log(request.path);

        response.send({
            status: "Ok",
            message: 'Aqui la lista de los usuarios',
        });
    });

// Enviamos información del cliente
app.post("/register", (req, res) => {
    // Recibimos los datos de la peticion a través del body
    const {email, password}= req.body;

    // Esto de primeras da un error, porque hay que deserializar el body

    // Enviamos una respuesta
    res.send({
        status: "Ok",
        message: `Email ${email} y la contraseña es ${password}`,
    })
})

// Enviar infor del cliente desde la url -> query params
app.get("/products", (req, res) => {

    // Obtenemos los query params -> ?search=botella&order=ASC
    const { search, order} = req.query;

    // Le damos un cofigo de estado a la respuesta
    res.status(200);

    res.send({
        status: "Ok",
        message: `Los datos por query recibidos son ${search} y ${order}`,
    });
});

// Enviar info desde el cliente -> path params
app.get('/user/:idUser', (req, res) => {
    // endpoint para recuperar los datos de un usuario en concreto
    const { idUser } = req.params;

    res.send({
        status: 'Ok',
        message: `El id de usuario recibido por path param es ${idUser}`,
    });
});

// Middleware de not found y error deben ir justo encima del servidor a la 

//Middleware de nor found
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