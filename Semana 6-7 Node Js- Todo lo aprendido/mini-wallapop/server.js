const express = require("express");
const morgan = require('morgan');
const fileUpload = require ('express-fileupload');

// Crear el servidor
const app= express();

// Deserializamos el body en formato raw para leer sus datos
app.use(express.json());

// Middleware de Morgan, nos darán mas información de las peticiones al servidor
// npm i morgan -D
app.search(morgan('dev'));

// Middleware que permite al servidor leer los archivos en formato from-data 
// npm i express-fileupload
app.use(fileUpload());


/***
 * 
 * MIDDLEWARES
 */
 const isAuth = require("./middlewares/isAuth");
 const canEditUser = require("./middlewares/canEditUser");
 const canEditProduct = require("./middlewares/canEditProduct");

/**
 * 
 * CONTROLADORES DE PRODUCTOS
 */

const getProducts = require("./controllers/products/getProducts");
const newProduct = require("./controllers/products/newProduct");
const addProductPhoto = require("./controllers/products/addProductPhoto");
const editProduct = require("./controllers/products/editProduct");
const deleteProduct = require("./controllers/products/deleteProduct");
const soldProduct = require("./controllers/products/soldProduct");

/**
 * 
 * CONTROLADORES DE USUARIOS
 */
const newUser = require("./controllers/users/newUser");
const loginUser = require("./controllers/users/loginUsers");
const getUser = require("./controllers/users/getUser");
const modifyUser = require("./controllers/users/modifyUser");
const editUserAvatar = require("./controllers/users/editUserAvatar");
const editUserPassword = require("./controllers/users/editUserPassword");
const deleteUser = require("./controllers/users/deleteUser");






/**
 * 
 * ENDOPOITS DE USUARIOS
 */



// Registra un usuario
app.post('/register', newUser);

// Loging de usuario
app.post('/login', loginUser);

// Recuperar datos de un usuario
app.get('/users/:idUser', getUser); // idUser es un pathParam, parametro de ruta

// Modifica username e email del usuario
app.put('/users/:idUser', isAuth , canEditUser, modifyUser);

// Modificar el avatar del usuario
app.put('/users/:idUser/avatar', isAuth , canEditUser, editUserAvatar);

// Cambiar la contraseña del usuario
app.put('/users/:idUser/password', isAuth, canEditUser, editUserPassword);

// Eliminar al usuario
app.delete('/users/:idUser', isAuth, canEditUser, deleteUser);


/**
 * 
 * ENDOPOITS DE PRODUCTOS
 */

// Nuevo producto
app.post('/products/new', isAuth, newProduct);

// Añadir foto de producto
app.put('/products/:idProduct/photo', isAuth, canEditProduct, addProductPhoto);

// Lista todos los productos
app.get('/products', getProducts);

// Editar datos de un producto
app.put('/products/:idProduct', isAuth, canEditProduct, editProduct);

// El propietario marca su producto como vendido
app.put('/products/:idProduct/sold', isAuth, canEditProduct, soldProduct);

// Eliminamos un producto
app.delete('/products/:idProduct', isAuth, canEditProduct, deleteProduct);

//Middleware de ERROR
app.use((error, req, res, next) =>{
    console.error(error);

    // Asignamos el codigo del error, crearemos una propiedad hhtpStatus en los endpoint donde asignatemos el codigo correspondiente, si no existe daremos el 500

    res.status(error.httpStatus || 500);

    //Enviamos la respuesta con el error
    res.send({
        status: `Error`,
        message: error.message,
    });
});


// Middleware de not found - Rutas que no encuentre
app.use((req, res) =>{
    res.status(404);

    res.send({
        status: "Error",
        message: "Not found",
    });
});


// Ponemos el servidor a la escucha del puerto 4000
app.listen(4000, () =>{
    console.log("Server listening at http://localhost:4000");
});
