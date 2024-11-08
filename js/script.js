const playPauseButton = document.querySelector('[data-testid="play-pause-button"]');
const buttons = document.querySelectorAll("button");
const pomoHover = new Audio("./assets/sounds/spout_2.ogg");
const endSound = new Audio("./assets/sounds/pomoXP.mp3");
const tenSeg = new Audio("./assets/sounds/10-seg.mp3");
const pomoCounter = document.getElementById("pomo-timer");
const nxtTimePreview = document.getElementById("break-preview");
const pomoButton = document.getElementById("pomo-button"); 
const decreaseBtn = document.getElementById("pomo-decrease");
const increaseBtn = document.getElementById("pomo-increase");
const nxtPageBtn = document.querySelectorAll(".nxt-page");
const pageOne = document.getElementById("page-1")
const pageTwo = document.getElementById("page-2")

let counter = 0;
let workMinutes = 25; // Duración de trabajo
let breakMinutes = 5; // Duración del descanso
let seconds = 0;
let timer = "25:00";
let time;
let startTime;
let remainingTime;
let isRunning = false; // Para saber si el temporizador está en ejecución
let isBreak = false; // Para saber si estamos en tiempo de descanso
let ifPaused = false;
let comment;
let pageDisplay = true

buttons.forEach(button => {
    button.addEventListener("click", () => {
        tenSeg.currentTime = 0;
        tenSeg.play();
    });
});



nxtPageBtn.forEach(nxtPageBtn =>{
    nxtPageBtn.addEventListener("click", () =>{
        if(pageDisplay || !pageDisplay){
            pageDisplay = !pageDisplay
            if(pageDisplay == true){
                pageOne.style.display = "block"
                pageTwo.style.display = "none"
            }else if (pageDisplay == false){
                pageOne.style.display = "none"
                pageTwo.style.display = "block"
            }
        }
    })
})




//Cambio de Página


nxtPageBtn.forEach(nxtPageBtn => {
    const bgOriginal = nxtPageBtn.style.backgroundImage;
    nxtPageBtn.addEventListener("mouseenter", () => {
        nxtPageBtn.style.backgroundImage = "url('./assets/img/nxt-page-hover.png')";
    });
    nxtPageBtn.addEventListener("mouseleave", () => {
        nxtPageBtn.style.backgroundImage = bgOriginal;
    });
});

const updateDisplay = () => {
    let formattedMinutes = String(isBreak ? breakMinutes : workMinutes).padStart(2, '0');
    let formattedSeconds = String(seconds).padStart(2, '0');
    pomoCounter.innerHTML = `<h2>${formattedMinutes}:${formattedSeconds}</h2>`;

    if(workMinutes <= 30){
        breakMinutes = 5;
        comment = "Un estudio Ideal."
        nxtTimePreview.style.color = "#00AA00"
        
    }else if(workMinutes <= 55){
        breakMinutes = 10;
        comment = "Bueno para la concentración."
        nxtTimePreview.style.color = "#0000AA"
    }else if(workMinutes <= 80){
        breakMinutes = 15;
        comment = "A ponerse serios."
        nxtTimePreview.style.color = "#B4684D"
    }else if(workMinutes <= 110){
        breakMinutes = 25;
        comment = "!Hay que aprobar esas materias!"
        nxtTimePreview.style.color = "#443A3B"
    }else{
        breakMinutes = 30;
        comment = '¿Qué es "vida social"?'
        nxtTimePreview.style.color = "#AA0000"
    }
    nxtTimePreview.innerHTML = `Tiempo de Descanso <b>${breakMinutes} ${breakMinutes > 1 ? "Minutos" : "Minuto"}</b> <br> <u>${comment}</u>`
};

const textColorFormatter = () => {
    if (pomoCounter.style.color != "#000") {
        pomoCounter.style.color = "#000";
    }
};

let increaseTime = () => {
    if (!isRunning) { // Solo permite cambiar tiempo si no está en ejecución
        textColorFormatter();
        workMinutes < 120 ? workMinutes += 5 : alert("¡No te excedas con el estudio!.");

        
        updateDisplay();
    }
};

let decreaseTime = () => {
    if (!isRunning) { // Solo permite cambiar tiempo si no está en ejecución
        textColorFormatter();
        workMinutes > 5 ? workMinutes -= 5 : alert("No se puede retroceder más.");
        updateDisplay();
    }
};

decreaseBtn.addEventListener("click", decreaseTime);
increaseBtn.addEventListener("click", increaseTime);
updateDisplay();

const counterPaused = () => {
    pomoButton.innerText = "⏵"; // Cambia el botón a play cuando termina
    pomoCounter.style.color = isBreak ? "#AA0000" : "#00AA00"; // Verde para descanso, rojo para trabajo
    isRunning = false;
    increaseBtn.disabled = false;
    decreaseBtn.disabled = false;
    counter = 0; // Restablecer counter para evitar problemas de doble clic
};

const counterFinalized = () => {
    pomoButton.innerText = "⏵"; // Cambia el botón a play cuando termina
    pomoCounter.style.color = isBreak ? "#AA0000" : "#00AA00"; // Verde para descanso, rojo para trabajo
    pomoCounter.innerHTML = `<h2>${isBreak ? "Finalizado" : "Descanso"}</h2>`;
    isRunning = false;
    increaseBtn.disabled = false;
    decreaseBtn.disabled = false;
    counter = 0; // Restablecer counter para evitar problemas de doble clic
};

let startBreak = () => {
    isBreak = true; // Cambia a estado de descanso
    remainingTime = breakMinutes * 60; // Establece el tiempo de descanso
    pomoCounter.style.color = "#00AAAA"; // Cambia el color a verde
    pomoCounter.innerHTML = `<h2>Descanso</h2>`;
    pomoButton.innerText = "⏸️"; // Cambia el botón a detener
    startTime = Date.now();
    const endTime = startTime + remainingTime * 1000;

    time = setInterval(function () {
        decreaseBtn.disabled = true;
        increaseBtn.disabled = true;
        const now = Date.now();
        remainingTime = Math.max(Math.round((endTime - now) / 1000), 0);

        if (remainingTime <= 5 && remainingTime > 0) {
            tenSeg.play();
        }

        let displayMinutes = Math.floor(remainingTime / 60);
        let displaySeconds = remainingTime % 60;
        let formattedTime = `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;

        pomoCounter.innerHTML = `<h2>${formattedTime}</h2>`;

        if (remainingTime <= 5 && remainingTime > 0) {
            tenSeg.play();
        }
        if (remainingTime <= 0) {
            clearInterval(time);
            decreaseBtn.disabled = false;
            increaseBtn.disabled = false;
            pomoCounter.innerHTML = `<h2>00:00</h2>`;
            counterFinalized();
            endSound.play();
            isBreak = false; // Restablecer el estado a no descanso
        }
    }, 1000);
};

let timerCountdown = () => {
    if (isRunning) {
        clearInterval(time);
        counterFinalized();
        pomoCounter.style.color = "#971607"
        pomoCounter.innerHTML = "<h2>Finalizado</h2>"
        endSound.play();
        return;
    }

    tenSeg.play();

    clearInterval(time);
    counter = 0; // Asegúrate de que counter sea 0 para empezar un nuevo ciclo

    if (workMinutes === null) {
        pomoCounter.innerHTML = `<h2>00:00</h2>`;
        alert("Pomodoro Cancelado");
    } else if (isNaN(workMinutes) || workMinutes <= 0 || !Number.isInteger(Number(workMinutes))) {
        alert("Por favor, ingresa un número válido de minutos.");
        pomoCounter.innerHTML = `<h2>00:00</h2>`;
    } else {
        increaseBtn.disabled = true;
        decreaseBtn.disabled = true;
        pomoButton.innerText = "⏸️";
        isRunning = true; // Actualizar el estado del temporizador

        remainingTime = workMinutes * 60;
        pomoCounter.style.color = "#FFAA00";
        pomoCounter.innerHTML = `<h2>Inicializando</h2>`;

        startTime = Date.now();
        const endTime = startTime + remainingTime * 1000;

        time = setInterval(function () {
            const now = Date.now();
            remainingTime = Math.max(Math.round((endTime - now) / 1000), 0);

            if (remainingTime <= 5 && remainingTime > 0) {
                tenSeg.play();
            }

            let displayMinutes = Math.floor(remainingTime / 60);
            let displaySeconds = remainingTime % 60;
            let formattedTime = `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;

            pomoCounter.innerHTML = `<h2>${formattedTime}</h2>`;

            if (remainingTime <= 0) {
                clearInterval(time);
                pomoCounter.innerHTML = `<h2>00:00</h2>`;
                counterFinalized();
                endSound.play();
                startBreak(); // Inicia el tiempo de descanso después de finalizar el trabajo
            }
        }, 1000);
    }
};

pomoButton.addEventListener("click", timerCountdown);
