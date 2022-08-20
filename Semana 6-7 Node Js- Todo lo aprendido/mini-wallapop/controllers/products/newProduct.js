const getDB = require("../../db/getDB");
const { generateError, validate } = require("../../helpers");
const newProductSchema = require("../../schemas/newProductSchema");

const newProduct = async (req, res, next) =>{
    let connection;

    try{
        connection = await getDB();

        // Recuperar los datos del body de la request
     const { name, price, description } = req.body;

     //Validar los datos que recibimos usando el esquema
     await validate(newProductSchema, req.body);

     //Necesitamos el id del usuario para asignarselo al producto
     // como propietario del mismo
     const idReqUser = req.userAuth.id;

     // Si falta alguno de los campos obligatorios damos un error
     if(!name || !price){
        throw generateError('Debes indicar los campos obligatorios', 400);
     }

     // Si nos indica el nombre y precio, insertamos el nuevo producto
     await connection.query(
        `INSERT INTO product (name, precio, description, createdAt, idUser)
        VALUES (?,?,?,?,?)`,
        [name, price, description, new Date(), idReqUser]
     );

     res.send({
        status: 'Ok',
        message: 'Producto insertado con éxito!'
    });

    
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newProduct;