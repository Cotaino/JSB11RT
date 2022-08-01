"use strict";

//Promesa de la edad. Devuelve un número del 0 al 100, tardando entre 0 y 1 segundos
const agePromise = new Promise((resolve, reject) => setTimeout(() => resolve(Math.round(Math.random() * 100)), Math.random() * 1000)) 



function checkAge(age){
  console.log(age)
  return new Promise((resolve, reject)=>{



    if(age < 18){
      reject("Es menor de edad")
    }


    if(age % 2 === 0){
      setTimeout(()=>{
        resolve("La edad es par")
      }, 1000)
    } else {
      setTimeout(()=>{
        resolve("La edad es impar")
      }, 2000)
    }


  })
}

checkAge(25).then(res => {console.log(res)}).catch(e=> console.error(e))


agePromise.then(edad => checkAge(edad).then(res => {console.log(res)}).catch((e) => {console.error(e)}))