# Backend Experiencias

Vamos a realizar el backend de una aplicación de gestión de experiencias, tales como una tarde de surft, tirarse por paracaidas etc...

Habrá dos tipos de usuarios, un administrador que será el único que pueda crear una nueva experiencia y los usuario 'normales' o 'clientes' que podrán ver las experiencias.

En este primer ejercicio vamos a crear la estructura de una proyecto en Node, instalación de algunas dependencias y la creación de los scripts para la coexión con la base de datos y creación y reseteo de tablas. (getDB e init DB)

## Ejercicio 1

- Crea el script del servidor y configura sus middleware de Error y Not Found, ponlo a la escucha en el puerto 4000 junto a un mensaje `Server listening at http://localhost:4000``✅

-   Crea la base de datos con el nombre `experiencias`.✅

- Crea una carpeta de nombre `databases`o `db`y dentro de esta un script encargado de realizar la conexión con la base de datos (getDB).

- Haz otro script (initDB) encargado de crear las tablas para esa base de datos. Previamente debe borrarlas en caso de que existan.

Tablas: 

            usuario
                id PRIMARY KEY
                nombre VARCHAR
                apellido1 VARCHAR
                apellido2 VARCHAR
                fecha_nac DATE
                email VARCHAR
                password VARCHAR
                tipo ('admin' o 'normal')   (ENUM)
                createdAt DATETIME


            empresa 
                id PRIMARY KEY
                nombre VARCHAR

            
            experiencia
                id PRIMARY KEY