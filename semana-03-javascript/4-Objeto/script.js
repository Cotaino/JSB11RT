"use strict";

const people = {
  Maria: 20,
  Ana: 14,
  Luis: 16,
  Pepe: 35,
  Manuel: 50,
  Teresa: 12,
  Daniel: 27,
  Irene: 23,
  Alex: 10,
};


function checkAge(obj){

  for(let name in obj){

    let age = obj[name]

    if(age <18){
      console.log(`${name} es menor de edad`)
    } else {
      console.log(`${name} es mayor de edad`)
    }

  }
}


checkAge(people)



console.log(``)

function checkTernario(obj){
  for(let name in obj){
    let age = obj[name]


    console.log(`${name} es ${age < 18? "menor" : "mayor"} de edad.`)

  }
}

checkTernario(people)