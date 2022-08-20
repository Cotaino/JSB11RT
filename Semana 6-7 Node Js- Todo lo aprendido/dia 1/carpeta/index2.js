// node carpeta/index2.js

console.log ("Hola Mundo desde una carpeta del proyecto!");

// Tambien podemos ejecutar cualquier tipo de codigo JS

for(let i=0; i<=10; i++){
    //codigo que ejecuta mientras i<=10
    // console.log(i)
}

// hay cosas en node que no podemos ejecutar, por ejemplo un fetch()

// ACCESO A VARIABLES DE ENTORNO

//console.log(process);

console.log(process.env.username); //variable de entorno USERNAME podemos acceder desde cualquier archivo del proyecto (dial)

// Acceso a argumentos
console.log(process.argv);

// process.argv siempre devuelve 2 argumentos que podemos obviar, con splice creamos un array 
console.log(process.argv);