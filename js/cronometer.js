import { disableButtons, enableButtons, formatTime } from "./utils.js";

/* Elementos do DOM */
const display = document.querySelector(".display");
const btnPlay = document.querySelector("#play");
const btnPause = document.querySelector("#pause");
const btnPartial = document.querySelector("#partial");
const btnStop = document.querySelector("#stop");
const partialsList = document.querySelector("#partials-list");

/* Variáveis */

// Inicializa o cronômetro
let timeInit;
// Tempo total decorrido
let elapsedTime = 0;
// Último tempo parcial
let lastPartialTime = 0;
// Intervalo do cronômetro
let timerInterval;
// Contador de parciais
let partialCount = 0;

/* Funções */

// Inicia o cronômetro
function startCronometer() {
  // Calcula o tempo decorrido
  let timeNow = Date.now();
  // Calcula a diferença entre o tempo atual e o tempo inicial
  let timeDiff = timeNow - timeInit;
  // Atualiza o display do cronômetro
  updateCronometerDisplay(timeDiff);
}

// Atualiza o display do cronômetro
function updateCronometerDisplay(time) {
  // Formata o tempo
  let [hours, minutes, seconds, milliseconds] = formatTime(time);

  // Atualiza o display
  display.querySelector("#miliseconds").textContent = milliseconds;
  display.querySelector("#seconds").textContent = seconds;
  display.querySelector("#minutes").textContent = minutes;
  display.querySelector("#hours").textContent = hours;

  // Atualiza o título da página
  document.title = `${hours}:${minutes}:${seconds} | Cronômetro`;
}

// Pausa o cronômetro
function pauseCronometer() {
  clearInterval(timerInterval);
  // Atualiza o tempo total decorrido
  elapsedTime = Date.now() - timeInit;
}

// Registra uma parcial
function recordPartial() {
  // Calcula o tempo decorrido
  let TotalTime = Date.now() - timeInit;
  // Calcula o tempo parcial decorrido desde a última parcial
  let partialTime = TotalTime - lastPartialTime;

  // Atualiza o display das parciais
  let TotalTimeArray = formatTime(TotalTime);
  let PartialTimeArray = formatTime(partialTime);

  let TotalTimeDisplay = `${TotalTimeArray[0]} : ${TotalTimeArray[1]} : ${TotalTimeArray[2]} : ${TotalTimeArray[3]}`;

  let partialTimeDisplay = `${PartialTimeArray[0]} : ${PartialTimeArray[1]} : ${PartialTimeArray[2]} : ${PartialTimeArray[3]}`;

  // Incrementa o contador de parciais
  partialCount++;

  // Atualiza o último tempo parcial
  lastPartialTime = TotalTime;

  // Cria um elemento para exibir a parcial
  let partialTimeElement = document.createElement("div");
  partialTimeElement.classList.add("partial", "w-100", "d-flex", "align-items-center", "justify-content-between", "p-2","gap-2", "text-center");

  // Atualiza o conteúdo do elemento
  partialTimeElement.innerHTML = `
        <span>${partialCount}</span>
        <span>${partialTimeDisplay}</span>
        <span>${TotalTimeDisplay}</span>
    `;

  // Insere o elemento na lista de parciais
  partialsList.insertBefore(partialTimeElement, partialsList.firstChild);
}

// Para o cronômetro
function stopCronometer() {
  clearInterval(timerInterval);
  timeInit = 0;
  elapsedTime = 0;
  partialCount = 0;
  lastPartialTime = 0;
}

/* Eventos */

// Evento para inciar/retornar o cronômetro
btnPlay.addEventListener("click", () => {
  timeInit = Date.now() - elapsedTime;
  timerInterval = setInterval(() => startCronometer(), 1);
  disableButtons(btnPlay);
  enableButtons(btnPause, btnPartial, btnStop);
});

// Evento para pausar o cronômetro
btnPause.addEventListener("click", () => {
  pauseCronometer();
  disableButtons(btnPause, btnPartial);
  enableButtons(btnPlay);
});

// Evento para registrar uma parcial
btnPartial.addEventListener("click", () => {
  recordPartial();
});

// Evento para parar o cronômetro
btnStop.addEventListener("click", () => {
  stopCronometer();
  disableButtons(btnPause, btnPartial, btnStop);
  enableButtons(btnPlay);
  updateCronometerDisplay(0);
  document.title = "Cronômetro";
  partialsList.innerHTML = "";
});
