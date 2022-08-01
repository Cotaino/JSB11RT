"use strict";


function getRandom(minNum, maxNum){
  return Math.round(Math.random() * (maxNum - minNum) + minNum)
}


function game(min, max, tries){


  let pass = getRandom(min, max)


  console.log(pass)


  for(let i = 0; i < tries; i++){


    let userPass = +prompt(`Itroduce un número entre el ${min} y el ${max}`)

    if(userPass === pass){
      alert("Has ganado!!")
    return
    }


   if(i < tries - 1){ 
    alert(`El número introducido es ${userPass < pass ? "menor" : "mayor"} que el buscado.
    Has introducido el ${userPass}`)
  }


  } 


  alert(`Has perdido.
  El número buscado era el ${pass}
  `)

}

game(0, 100, 5)