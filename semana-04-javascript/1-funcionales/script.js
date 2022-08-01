"use strict";

//puntuaciones
const puntuaciones = [
  {
    equipo: "Toros Negros",
    puntos: [1, 3, 4, 2, 10, 8],
  },
  {
    equipo: "Amanecer Dorado",
    puntos: [8, 5, 2, 4, 7, 5, 3],
  },
  {
    equipo: "Águilas Plateadas",
    puntos: [5, 8, 3, 2, 5, 3],
  },
  {
    equipo: "Leones Carmesí",
    puntos: [5, 4, 3, 1, 2, 3, 4],
  },
  {
    equipo: "Rosas Azules",
    puntos: [2, 1, 3, 1, 4, 3, 4],
  },
  {
    equipo: "Mantis Verdes",
    puntos: [1, 4, 5, 1, 3],
  },
  {
    equipo: "Ciervos Celestes",
    puntos: [3, 5, 1, 1],
  },
  {
    equipo: "Pavos Reales Coral",
    puntos: [2, 3, 2, 1, 4, 3],
  },
  {
    equipo: "Orcas Moradas",
    puntos: [2, 3, 3, 4],
  },
];


function mapper(obj){

let {equipo, puntos} = obj;

let total = puntos.reduce((acc, current) => acc + current )

return {equipo, total}

}


function getWinnerLoser(arr){
  let newArr = arr.map(mapper)

  let ordered = newArr.sort((a, b) => a.total-b.total)

  let loser = ordered[0]

  let winner = ordered[ordered.length - 1]

  console.log(`El peor equipo es ${loser.equipo} con un total de ${loser.total}`)

   console.log(`El mejor equipo es ${winner.equipo} con un total de ${winner.total}`)
}


getWinnerLoser(puntuaciones)


function winnerLoser(arr){
  let newArr = arr.map(mapper)

  console.log(newArr)
  let loser = newArr[0]
  let winner = newArr[0]



  for(let obj of newArr){ 
    if(obj.total > winner.total){
      winner = obj
    }

    if(obj.total < loser.total){
      loser = obj
    }

  }

   console.log(`El peor equipo es ${loser.equipo} con un total de ${loser.total}`)

   console.log(`El mejor equipo es ${winner.equipo} con un total de ${winner.total}`)
}


winnerLoser(puntuaciones)