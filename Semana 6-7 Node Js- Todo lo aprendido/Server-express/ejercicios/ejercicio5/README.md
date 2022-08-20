# Ejercicio node 5

Programa un servidor web usando express que contenga:

-   Una ruta '/hora' que devuelva la hora actual.

-   Una ruta '/directorio' que devuelva el directorio donde ejecutamos el archivo del servidor.

-   Una ruta '/matematicas/:number' que compruebe que es un número ( si no es un número que de error) u 
que devuelva el número indicado multiplicado por 2.

-   Una ruta '/newUser' que reciba por el body `email` y `password` si falta alguno que lance un error
    si no falta ninguno que muestre lo que recibe en la respuesta.

-   Un middleware de error y otro que se ocupe de los errores 404.

Pon el servidor a la escucha en el puerto 4000.
