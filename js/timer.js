import { disableButtons, enableButtons, formatTime } from "./utils.js";

/* Elementos do DOM */
const modal = document.querySelector(".timer__modal");
const timerForm = document.querySelector(".modal__form");
const display = document.querySelector(".display");
const playButton = document.querySelector("#play");
const pauseButton = document.querySelector("#pause");
const stopButton = document.querySelector("#stop");
const configTimerButton = document.querySelector("#config");

/* Variáveis */

// ultima duração definida
let lastDefinedDuration = sessionStorage.getItem("lastDefinedDuration") || 0;
// duração do timer
let duration = 0;
// intervalo do timer
let timerInterval;

/* Funções */

// salva a última duração definida em armazenamento de sessão
function saveLastTimerDuration() {
  sessionStorage.setItem("lastDefinedDuration", lastDefinedDuration);
}

// inicia o timer
function startTimer() {
  // exibe o tempo restante
  displayTime(duration);

  // para o timer se o tempo acabar
  if (duration <= 0) {
    resetTimer();
    return;
  }

  // decrementa o tempo restante
  duration -= 1000;
}

// exibe o tempo
function displayTime(time) {
  let [hours, minutes, seconds] = formatTime(time);

  display.querySelector("#hours").textContent = hours;
  display.querySelector("#minutes").textContent = minutes;
  display.querySelector("#seconds").textContent = seconds;

  document.title = `${hours}:${minutes}:${seconds} | Timer`;
}

// reseta o timer
function resetTimer() {
  clearInterval(timerInterval);
  duration = 0;
  lastDefinedDuration = 0;
  /* limpa o display do timer, para evitar números negativos quando o tempo acabar ou quando o timer por parado, evitar que o tempo restante fique visível na tela. */
  displayTime(0);
  disableButtons(playButton, pauseButton, stopButton);
  enableButtons(configTimerButton);
  document.title = "Timer";
  saveLastTimerDuration();
}

/* Eventos */

// salva a última duração definida antes de fechar/recarregar a janela
window.addEventListener("beforeunload", () => {
  saveLastTimerDuration();
});

// carrega a última duração definida ao carregar a janela
window.addEventListener("load", () => {
  if (lastDefinedDuration > 0) {
    duration = lastDefinedDuration;
    displayTime(duration);
    disableButtons(pauseButton, stopButton, configTimerButton);
    enableButtons(playButton);
  }
});

// fecha o modal ao clicar no botão de fechar
modal.querySelector(".modal__header__close").addEventListener("click", () => {
  modal.close();
});

// configura o timer e o inicia
timerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // obtém o tempo definido
  const hours = parseInt(timerForm.hours.value) || 0;
  const minutes = parseInt(timerForm.minutes.value) || 0;
  const seconds = parseInt(timerForm.seconds.value) || 0;

  // converte o tempo para milissegundos
  duration = (hours * 3600 + minutes * 60 + seconds) * 1000;

  // validação para não inicia o timer caso o tempo seja menor ou igual a zero
  if (duration <= 0) {
    return;
  }

  timerForm.reset();
  modal.close();

  // salva a última duração definida
  lastDefinedDuration = duration;
  saveLastTimerDuration();

  disableButtons(configTimerButton);
  enableButtons(pauseButton, stopButton);

  // inicia o timer
  timerInterval = setInterval(() => startTimer(), 1000);
});

// cancela a configuração do timer
timerForm.addEventListener("reset", () => {
  modal.close();
});

// reinicia o timer
playButton.addEventListener("click", () => {
  timerInterval = setInterval(() => startTimer(), 1000);
  disableButtons(playButton);
  enableButtons(pauseButton, stopButton);
});

// pausa o timer
pauseButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  disableButtons(pauseButton);
  enableButtons(playButton, stopButton);
});

// para o timer
stopButton.addEventListener("click", () => {
  resetTimer();
});

// ativa o modal de configuração do timer
configTimerButton.addEventListener("click", () => {
  modal.showModal();
});
