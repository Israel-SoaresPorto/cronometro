import { disableButtons, enableButtons, formatTime } from "./utils.js";

const modal = document.querySelector(".timer__modal");
const timerForm = document.querySelector(".modal__form");
const display = document.querySelector(".display");
const playButton = document.querySelector("#play");
const pauseButton = document.querySelector("#pause");
const stopButton = document.querySelector("#stop");
const configTimerButton = document.querySelector("#config");

let lastDefinedDuration = sessionStorage.getItem("lastDefinedDuration") || 0;
let duration = sessionStorage.getItem("lastTimerDuration") || 0;
let timerInterval;

function saveLastTimerDuration() {
  sessionStorage.setItem("lastDefinedDuration", lastDefinedDuration);
}

function startTimer() {
  displayTime(duration);

  if (duration <= 0) {
    resetTimer();
    return;
  }

  duration -= 1000;
}

function displayTime(time) {
  let [hours, minutes, seconds] = formatTime(time);

  display.querySelector("#hours").textContent = hours;
  display.querySelector("#minutes").textContent = minutes;
  display.querySelector("#seconds").textContent = seconds;

  document.title = `${hours}:${minutes}:${seconds} | Timer`;
}

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

window.addEventListener("beforeunload", () => {
  saveLastTimerDuration();
});

window.addEventListener("load", () => {
  if (lastDefinedDuration > 0) {
    duration = lastDefinedDuration;
    displayTime(duration);
    disableButtons(pauseButton, stopButton, configTimerButton);
    enableButtons(playButton);
  }
});

modal.querySelector(".modal__header__close").addEventListener("click", () => {
  modal.close();
});

timerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const hours = parseInt(timerForm.hours.value) || 0;
  const minutes = parseInt(timerForm.minutes.value) || 0;
  const seconds = parseInt(timerForm.seconds.value) || 0;

  duration = (hours * 3600 + minutes * 60 + seconds) * 1000;

  if (duration <= 0) {
    return;
  }

  timerForm.reset();
  modal.close();
  lastDefinedDuration = duration;
  saveLastTimerDuration();

  disableButtons(configTimerButton);
  enableButtons(pauseButton, stopButton);

  timerInterval = setInterval(() => startTimer(), 1000);
});

timerForm.addEventListener("reset", () => {
  modal.close();
});

playButton.addEventListener("click", () => {
  timerInterval = setInterval(() => startTimer(), 1000);
  disableButtons(playButton);
  enableButtons(pauseButton, stopButton);
});

pauseButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  disableButtons(pauseButton);
  enableButtons(playButton, stopButton);
});

stopButton.addEventListener("click", () => {
  resetTimer();
});

configTimerButton.addEventListener("click", () => {
  modal.showModal();
});
