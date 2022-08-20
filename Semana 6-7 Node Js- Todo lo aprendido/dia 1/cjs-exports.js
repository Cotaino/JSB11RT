/**
 * 
 * COMMON JS: export
 * 
 * Cómo exportar funciones en Node
 */

// Funcion que devuelve la suma de 2 números

function suma(a,b){
    return a+b;
}

//Arrow Funcion que devuelve la resta de 2 números
const resta = (a, b) =>{
    return a - b;
};

//Arrow function con return implícito
const multiplicacion = (a, b) => a * b;

modele.exports = {
    suma,
    resta,
    multiplicacion,
};
