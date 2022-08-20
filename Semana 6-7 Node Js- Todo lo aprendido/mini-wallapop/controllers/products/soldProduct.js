const getDB = require("../../db/getDB");
const { generateError } = require("../../helpers");

const soldProduct = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idProduct } = req.params;

        // Se podría generar una funcion en helpers que modifique imagenes para añadir
        // una marca de agua tipo: "vendido".

        // Tendríamos que recorrer las imagenes del producto seleccionado y pasarselas a la 
        // función que las modifique y las guarde de nuevo

        // Antes de marcar el producto como vendido, comprobaremos que estaba en venta
        const [products] = await connection.query(
            ` SELECT sold FROM product WHERE id = ?`,
            [idProduct]
        )

        //Si el producto ya está vendido, devuelva un error
        if(products[0].sold){
            throw generateError('El producto ya consta como vendido', 409); // Conflict
        }

        // Marcamos el producto como vendido
        await connection.query(
            `UPDATE product SET sold = true WHERE id = ?`,
            [idProduct,]
        );

        res.send({
            status: "Ok",
            message: 'Producto marcado como vendido!',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = soldProduct;