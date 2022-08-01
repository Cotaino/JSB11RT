"use strict";

  const letras = 
[ "T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B",   "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"]



function validate(dni){
try{


  if(typeof dni !== "string" || dni.length !== 10){
    throw new Error("Formato incorrecto")
  }


  let dniArr =  dni.split("-")

  if(dniArr.length !== 2){
    throw new Error("La letra debe ir separada con un guion")
  }

  let [numeros, letra] = dniArr


  if(isNaN(numeros) || numeros.length !== 8){
    throw new Error("La primera parte deben ser 8 números")
  }

  if(!isNaN(letra) || letra.length !== 1){
    throw new Error("La última parte debe ser una letra")
  }

  let letraIndex = numeros % 23


  if(letra.toUpperCase() !== letras[letraIndex]){
    throw new Error("La letra coincide")
  }


console.log("El DNI es válido")

}catch(e){
  console.error("Se ha producido un error: " + e.message)
}

}

validate("18649058-e")