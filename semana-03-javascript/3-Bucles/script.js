"use strict";

let inicio = 8;

let fin = 22;


for(let i = 0; i < 24; i++){

  if(i >= inicio && i <= fin){

    let string = i


    let hora = i;

    if(hora > 12){
      hora %= 12
    }

    for(let j = 0; j < hora; j++){
      string += " cucú" 
    }

    console.log(string)
  }
}


