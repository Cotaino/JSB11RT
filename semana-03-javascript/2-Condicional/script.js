"use strict"

let nombre = "Raul"
let edad = 24



if(edad <= 12){
  console.log(`A ${nombre} le corresponde el descuento infantil`)
} else if(edad <= 30){
console.log(`A ${nombre} le corresponde el descuento juvenil`)
} else if(edad >= 60){
  console.log(`A ${nombre} le corresponde el descuento de jubilados.`)
} else {
  console.log(`A ${nombre} no le corresponde ningún descuento.`)
}

function crearFrase(descuento, nombre){
return `A ${nombre} le corresponde el descuento ${descuento}.`
}


if(edad <= 12){
  console.log(crearFrase("infantil", nombre))
} else if(edad <= 30){
console.log(crearFrase("juvenil", nombre))
} else if(edad >= 60){
  console.log(crearFrase("de jubilados", nombre))
} else {
  console.log(`A ${nombre} no le corresponde ningún descuento.`)
}