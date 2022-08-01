"use strict";

let secondsCounter = 50;

function printTime(){
  secondsCounter += 5
  console.log(formatTime(secondsCounter))
}


function formatTime(time){
  let seconds = secondsCounter % 60;
  let totalMinutes = Math.floor(secondsCounter /60)

  let minutes = totalMinutes % 60

  let totalHours = Math.floor(totalMinutes / 60)

  let hours = totalHours % 24

  let days = Math.floor(totalHours / 24)


  return `Han pasado ${days} día${s(days)}, ${hours} hora${s(hours)}, ${minutes} minuto${s(minutes)} y ${seconds} segundo${s(seconds)}`
}

let timeInterval = setInterval(printTime, 5000)


function stop(num, letter){

  let ms = num;

  switch(letter){
    case "D": 
      ms *= 24 ;

    case "H": 
      ms *= 60;

    case "M": 
      ms*=60;

    case "S": 
      ms*=1000
  }

  setTimeout(()=>{
    clearInterval(timeInterval)
    console.log("El programa se ha detenido")
  }, ms)

}


stop(17, "S")


function s(num){
  if(num !== 1){
    return "s"
  } else{
    return ""
  }
}