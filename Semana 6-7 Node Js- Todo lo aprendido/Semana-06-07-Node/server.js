const express = require('express');
require('dotenv').config();

// Destructuramos el process.env para acceder a la variable de entorno del puerto
const { PORT } = process.env;

const app = express();

// Deserializamos el body
app.use(express.json());

/**
 * MIDDLEWARES
 */
const isAuth = require('./middlewares/isAuth');
const canEditUser = require('./middlewares/canEditUser');
const isAdmin = require('./middlewares/isAdmin');

/**
 * CONTROLADORES
 */

const newUser = require('./controllers/users/newUser');
const newUserAdmin = require('./controllers/users/newUserAdmin');
const loginUser = require('./controllers/users/loginUser');
const getUser = require('./controllers/users/getUser');
const editUser = require('./controllers/users/editUser');
const listExperiences = require('./controllers/experiences/listExperiences');
const deleteExperience = require('./controllers/experiences/deleteExperience');
const newCompany = require('./controllers/companys/newCompany');
const deleteCompany = require('./controllers/companys/deleteCompany');

/**
 * ENDPOINTS
 */

// permite registrar un nuevo usuario "normal"
app.post('/register', newUser);

// permite registrar un nuevo usuario "admin"
app.post('/register/admin', newUserAdmin);

// Login de usuario
app.post('/login', loginUser);

// Devuelve info del usuario seleccionado
app.get('/user/:idUser', getUser);

// Permite modificar datos del usuario logueado
app.put('/user/:idUser', isAuth, canEditUser, editUser);

// Lista las experiencias
app.get('/experiences', listExperiences);

// Eliminar una experiencia
app.delete('/experiences/:idExperience', isAuth, isAdmin, deleteExperience);

// Añade una nueva empresa
app.post('/company', isAuth, isAdmin, newCompany);

// Elimina una empresa
app.delete('/company/:idCompany', isAuth, isAdmin, deleteCompany);

/**
 * MIDDLEWARES DE ERROR Y NOT FOUND
 */

app.use((error, req, res, _) => {
    console.error(error);

    res.status(error.httpStatus || 500);

    res.send({
        status: 'Error',
        message: error.message,
    });
});

app.use((req, res) => {
    res.status(404).send({
        status: 'Error',
        message: 'Not found',
    });
});

// Ponemos el servidor a la escucha
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
