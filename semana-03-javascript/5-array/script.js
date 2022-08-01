"use strict";

const names = [
  "A-Jay",
  "Manuel",
  "Manuel",
  "Eddie",
  "A-Jay",
  "Su",
  "Reean",
  "Manuel",
  "A-Jay",
  "Zacharie",
  "Zacharie",
  "Tyra",
  "Rishi",
  "Arun",
  "Kenton",
];





function clean(arr){
  let newArr = []

  for(let name of names){
    if(!newArr.includes(name)){
      newArr.push(name)
    }
  }

  return newArr
}


console.log(clean(names))



///////

function filter(arr){

/*   for(let i = 0; i < arr.length; i++){
    console.log(arr[i], i, arr.indexOf(arr[i]))
  } */


  return arr.filter((name, i) => i === arr.indexOf(name))
  
}

console.log(filter(names))