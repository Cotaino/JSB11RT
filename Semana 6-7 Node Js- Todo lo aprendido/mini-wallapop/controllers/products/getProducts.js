const getDB = require("../../db/getDB");

// Funcion encargada de listar los productos en la base de datos
const getProducts = async (req, res, next) => {
    let connection;

    try {
        // Abrimos una nueva conexion a la base de datos
        connection = await getDB();

        //Recibimos los query params para hacer un "filtrado" de los productos
        // {{server}}/products?search=camara&order=createAt&direction=ASC

        const {search, order, direction} = req.query;

        //Array de opciones válidas para los campos por los que ordenaremos
        const validOrderOptions = ['name', 'precio', 'createdAt'];

        // Array de opciones válidas para la direccion en la que se ordenan los campos
        const validDirectionOptions = ['DESC', 'ASC'];

        // Creamos las variables que ordenarán y establecerán el orden en el que mostraremos los resultados
        const orderBy = validOrderOptions.includes(order) ? order : 'createdAt';

        const orderDirection = validDirectionOptions.includes(direction)
            ? direction
            : 'DESC';
        
        // Realizar una consulta a la base de datos para recuperar los productos
        let products; // Realizar una consulta a la base de datos para recuperar los productos

        // Si existe una búsqueda 'search', haremos una consulta añadiendo la búsqueda
        if (search) {
            [products] = await connection.query(
                `SELECT * FROM product
                WHERE name LIKE ? OR description LIKE ? 
                ORDER BY ${orderBy} ${orderDirection}`,
                [`%${search}%`, `%${search}%`]
            );
        } else {
            [products] = await connection.query(
                `SELECT * FROM product
                ORDER BY ${orderBy} ${orderDirection}`,
            );
        }

        // Creamos el array que devolveremos en la respuesta, contendrá los datos del producto junto a sus fotos
        const data = [];

        // Cada producto tiene sus imagenes de producto, y recibimos su id por lo que podemos recorrer con un buble
        // los productos recividos y buscar sus fotos

        for (let i = 0; i < products.length; i++){
        
            const [photos] = await connection.query(
                `SELECT name FROM product_photo WHERE idProduct = ?`,
                [products[i].id]
            
            );

        // Pusheamos los datos del producto junto a sus fotos en el awway que devolveremos en la respuesta (data)
        data.push({
            ...products[i],
            photos,
        });
    }

        // Una vez recibimos los productos podemos responder con la lista de los productos en BBDD
        res.send({
            status: "OK",
            data: data,
        });

    }catch (error){
        // Si ocurre algún error lo pasamos (en el servidor lo captura el middleware de error para mostrarlo)
            next(error);
    }finally {
            
                // Para evitar llegar al límite de conexiones y saturar la base de daatos
                // Cerramos la conexión
                if (connection) connection.release();
            }
        };
  
module.exports = getProducts;