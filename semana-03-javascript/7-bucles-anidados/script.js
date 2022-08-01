"use strict";

const catalogo = [
  "margarita",
  "cuatro quesos",
  "prosciutto",
  "carbonara",
  "barbacoa",
  "tropical",
];


function combinar(catalogo){
  
  let newArr = []

  for(let i = 0; i < catalogo.length; i++){
    
    for(let j = i + 1; j < catalogo.length; j++){
      
      newArr.push(`${catalogo[i]} y ${catalogo[j]}`)
    }
  }


  return newArr
}


console.log(combinar(catalogo))