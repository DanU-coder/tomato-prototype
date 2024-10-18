// if(Notification.permission !== "granted"){
//   Notification.requestPermission()
// }
const playPauseButton = document.querySelector('[data-testid="play-pause-button"]');
const buttons = document.querySelectorAll("button");
const pomoHover = new Audio("./assets/sounds/spout_2.ogg")
const endSound = new Audio("./assets/sounds/pomoXP.mp3")
const tenSeg = new Audio("./assets/sounds/10-seg.mp3")
const pomoCounter = document.getElementById("pomo-timer");
const pomoButton = document.getElementById("pomo-button"); 
const decreaseBtn = document.getElementById("pomo-decrease")
const increaseBtn = document.getElementById("pomo-increase")
const nxtPageBtn = document.querySelectorAll(".nxt-page")

let counter = 0;
let minutes = 25;
let seconds = 0;
let timer = "25:00";
let time;
let startTime; // Nuevo: para almacenar la hora de inicio
let remainingTime; // Nuevo: para almacenar el tiempo restante en segundos


buttons.forEach(button => {
    button.addEventListener("click", () => {
        tenSeg.currentTime = 0;
        tenSeg.play()
    })
})

nxtPageBtn.forEach(nxtPageBtn => {
    const bgOriginal = nxtPageBtn.style.backgroundImage;
    nxtPageBtn.addEventListener("mouseover", () => {
        nxtPageBtn.style.backgroundImage = "url('./assets/img/nxt-page-hover.png')"
    })
    nxtPageBtn.addEventListener("mouseleave", () => {
        nxtPageBtn.style.backgroundImage = bgOriginal
    })
})
const updateDisplay = () => {
    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(seconds).padStart(2, '0');
    pomoCounter.innerHTML = `<h2>${formattedMinutes}:${formattedSeconds}</h2>`;
};

let increaseTime = () =>{
    minutes += 5
    updateDisplay();
}
let decreaseTime = () =>{
    minutes > 0 ? minutes -= 5 : alert("No se puede retroceder más.");
    updateDisplay();
}

decreaseBtn.addEventListener("click", decreaseTime)
increaseBtn.addEventListener("click", increaseTime)
updateDisplay();


let timerCountdown = () => {
    tenSeg.play()
    if(counter % 2 != 0){
        clearInterval(time);
        ++counter
        increaseBtn.disabled = false
        decreaseBtn.disabled = false
        pomoButton.innerText = "⏵"
    }else if (counter % 2 == 0){
        counter = true
        clearInterval(time);
    
        if (minutes === null) {
            pomoCounter.innerHTML = `<h2>00:00</h2>`;
            alert("Pomodoro Cancelado");
        } else if (isNaN(minutes) || minutes <= 0 || !Number.isInteger(Number(minutes))) {
            alert("Por favor, ingresa un número válido de minutos.");
            pomoCounter.innerHTML = `<h2>00:00</h2>`;
        } else {
            
            increaseBtn.disabled = true
            decreaseBtn.disabled = true
            pomoButton.innerText = "⏹"

            remainingTime = minutes * 60;
            pomoCounter.style.color = "#FFAA00";
            pomoCounter.innerHTML = `<h2>Inicializando</h2>`;
    
            // Ajustamos el tiempo de inicio y finalización
            startTime = Date.now();
            const endTime = startTime + remainingTime * 1000;
    
            time = setInterval(function () {
                const now = Date.now();
                // Calcula el tiempo restante real en base a la diferencia de tiempo
                remainingTime = Math.max(Math.round((endTime - now) / 1000), 0);
    
                if (remainingTime <= 10 && remainingTime > 0) {
                    tenSeg.play();
                }
    
                let displayMinutes = Math.floor(remainingTime / 60);
                let displaySeconds = remainingTime % 60;
                let formattedTime = `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
    
                pomoCounter.innerHTML = `<h2>${formattedTime}</h2>`;
    
                if (remainingTime <= 0) {
                    clearInterval(time);
                    pomoCounter.innerHTML = `<h2>00:00</h2>`;
                    endSound.play();
                }
            }, 1000);
        }
    }

}
pomoButton.addEventListener("click", timerCountdown)