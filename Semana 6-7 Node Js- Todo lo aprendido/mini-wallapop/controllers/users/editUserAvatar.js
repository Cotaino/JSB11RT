const getDB = require("../../db/getDB");
const { generateError, deletePhoto, savePhoto } = require("../../helpers");

const editUserAvatar = async (req, res, next) =>{
let Connection;
        try{
            Connection = await getDB();
            const {idUser} = req.params;

            // Comprobamos que existe el archivo del nuevo avatar
            if(!req.files || !req.files.avatar){
                throw generateError('Debes indicar un nuevo avatar', 400);
            }

            // Recuperamos el avatar antiguo del usuario de la base de datos
            const [user] = await Connection.query(
                `SELECT avatar FROM user WHERE id = ?`,
                [idUser]
            );

                // Si existe un avatar previo, vamos a eliminarlo
                if (user[0].avatar){
                    await deletePhoto(user[0].avatar, 0);  // recibe el nombre de la imagen a eliminar y el tipo que identifica si es un avatar o producto
                }

                // Guarda el nuevo avatar en el servidor
                const avatarName = await savePhoto(req.files.avatar,0);

                // Modificar en base de datos el nombre de la imagen del usuario
                await Connection.query(`update user set avatar = ? where id = ?`,[
                    avatarName, idUser
                ])

                res.send({
                    status:"Ok",
                    message: "Avatar Actualizado con éxito"
                })
        }catch (error){
            next(error);
        } finally {
            if (Connection) Connection.release();
        }
    };

module.exports = editUserAvatar;