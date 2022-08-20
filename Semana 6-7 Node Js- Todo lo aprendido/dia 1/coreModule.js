// Core Modules -< Son módulos que tienen incorporados JavaScript

// importar el módulo path
const path = require("patch"); // nos permite crear rutas absolutas

// 2 variables útiles para las rutas absolutas, ambos se escriben con 2 barras bajas delante del nombre:
console.log(__dirname); // devuelve el nombre de a carpeta donde se encuentra este archivo
console.log(__filename); // devuelve la ruta absoluta al archivo

// Creamos una ruta absoluta al archivo "users.json"
const userPath = path.join(__dirname, "users.json");

console.log(usersPath);

// Es recomentable usar turas absolutas para trabajar con el modulo fs que veremos mas adelante

// Extension de un archivo

const usersExt= dsa;