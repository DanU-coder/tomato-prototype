// if(Notification.permission !== "granted"){
//   Notification.requestPermission()
// }


const playPauseButton = document.querySelector('[data-testid="play-pause-button"]');

  let timer = "00:00";

  let pomoCounter = document.getElementById("pomo-timer");
  let pomoButton = document.getElementById("pomo-button"); 
  let pomoButtonImg = document.getElementById("pomo-button-icon")
  let pomoHover = new Audio("./assets/sounds/spout_2.ogg")
  let endSound = new Audio("./assets/sounds/pomoXP.mp3")
  let tenSeg = new Audio("./assets/sounds/10-seg.mp3")
  let time

  pomoCounter.innerHTML = `<h2>${timer}</h2>`;



  // let timerCountdown = () =>{
  //   timer = prompt("Asigna un tiempo de Pomodoro (min): ") * 60;

  //   pomoCounter.style.color = "#FFAA00"

  //   let i = timer
  //   pomoCounter.innerHTML = `<h2>Inicializando</h2>`;
  //   pomoButtonImg.src = "./assets/img/restart.png"
  //   let time = setInterval(function(){

  //       if(i <= 5){
  //           tenSeg.play()
  //       } 

  //       console.log(i)
  //       pomoCounter.innerHTML = `<h2>${i}</h2>`
  //       i--
  //       if(i < 0){
  //           clearInterval(time); 
  //           endSound.play()
  //         }

  //   }, 1000)
  // }

  let timerCountdown = () => {
    clearInterval(time)
    tenSeg.play();
    let minutes = parseInt(prompt("Asigna los minutos del Pomodoro: "));
    let seconds = 0
    


      if(isNaN(minutes)){
        alert("Número Inválido")
        
      }else{
                // Convertir todo a segundos
        let timer = (minutes * 60) + seconds;
        pomoCounter.style.color = "#FFAA00";
        pomoCounter.innerHTML = `<h2>Inicializando</h2>`;
        pomoButtonImg.src = "./assets/img/restart.png";
        time = setInterval(function () {
          if (timer <= 5 && timer > 0) {
              tenSeg.play(); // Reproducir sonido si quedan 5 segundos o menos
          }
  
          // Calcular minutos y segundos restantes
          let displayMinutes = Math.floor(timer / 60);
          let displaySeconds = timer % 60;
  
          // Formatear para que siempre muestre dos dígitos
          let formattedTime = `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
  
          // Actualizar el contador en pantalla
          pomoCounter.innerHTML = `<h2>${formattedTime}</h2>`;
          console.log(formattedTime);
  
          timer--;
  
          if (timer < 0) {
              clearInterval(time); // Detener el temporizador cuando llegue a 0
              endSound.play();
          }
      }, 1000);
      }
}