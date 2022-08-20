const getDB = require("../../db/getDB");
const { generateError} = require('../../helpers');

const editProduct = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Recuperamos el id del producto de los params
        const { idProduct } = req.params;

        // Recuperamos los datos del cuerpo de la petición
        const { name, price, description } = req.body;

        // Si no envia nada para editar, lanzaremos un error
        if (!name && !price && !description) {
            throw generateError('Si no modificas nada, pa que tocas.', 400);
        }
        // Seleccionamos los datos antiguos del antiguos del producto
        const [product] = await connection.query(
            `SELECT name, precio, description FROM product WHERE id = ?`,
            [idProduct]
        );

        // Actualizamos la tabla producto con los nuevos datos
        await connection.query(
            `UPDATE product
            SET name = ?,
            precio = ?,
            description = ?
            WHERE id = ?`,
            [name || product[0].name, 
            price || product[0].precio, 
            description || product[0].description,
            idProduct,
        ]
        );

        res.send({
            status: 'OK',
            message: `El producto con id ${idProduct} ha sido modificado con éxito!`,
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editProduct;