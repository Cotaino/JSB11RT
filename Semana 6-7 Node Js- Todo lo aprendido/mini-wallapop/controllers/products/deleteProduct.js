const getDB = require("../../db/getDB");
const { deletePhoto } = require("../../helpers");

const deleteProduct = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Recuperar el idProduct que queremos eliminar
        const { idProduct } = req.params;

        // Primero deberíamos eliminar las fotos del producto
        const [photos] = await connection.query(
            `SELECT name FROM product_photo WHERE idProduct = ?`,
            [idProduct]
        );

        // Una vez tenemos todas las fotos del producto que queremos eliminar recorremos su array para
        // acceder al nombre de cada una de ellas y ejercutar la funcion que las alimina

        for (let i = 0; i < photos.length; i++){
            // En cada vuelta del array accederemos a la propiedad name de cada foto, esta se la pasaremos
            // a la función deletePhoto para que la elimine del servidor
            await deletePhoto(photos[i].name, 1); // Es una imagen de producto, indicamos el 1
        }

        // Una vez eliminadas las fotos del servidor, podemos eliminar los campos de la base de datos
        await connection.query(
            `DELETE FROM product_photo WHERE idProduct = ?`,
            [idProduct]
        );

        // Eliminamos el producto de la BBDD
        await connection.query(`DELETE FROM product WHERE id = ?`, [idProduct]);

        res.send({
            status: 'Ok',
            message: `El producto con id ${idProduct} ha sido eliminado con éxito !`,
        });
        
    } catch (error) {
        next(error);
    }finally{
        if (connection) connection.release();
    }
};

module.exports = deleteProduct;