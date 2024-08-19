import { disableButtons, enableButtons } from "./utils.js";

const modal = document.querySelector(".timer__modal");
const timerForm = document.querySelector(".modal__form");
const setTimerButton = document.querySelector(".timer__open-modal");
const display = document.querySelector(".display");
const playButton = document.querySelector("#play");
const pauseButton = document.querySelector("#pause");
const stopButton = document.querySelector("#stop");

let elapsedTime = parseInt(sessionStorage.getItem("timerElapsedTime")) || 0;
let timerInterval;
let timeEnd = parseInt(sessionStorage.getItem("timerEnd")) || 0;
let isPaused = sessionStorage.getItem("timerIsPaused") === "true";

function saveTimerState() {
  sessionStorage.setItem("timerEnd", timeEnd);
  sessionStorage.setItem("timerElapsedTime", elapsedTime);
}

function setPauseState(pauseState) {
  isPaused = pauseState;
  sessionStorage.setItem("timerIsPaused", isPaused);
}

function formatTimerTime(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time / 60) % 60);
  let seconds = Math.floor(time % 60);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return [hours, minutes, seconds];
}

function startTimer() {
  let remaningTime = timeEnd - Date.now();

  displayTime(remaningTime / 1000);

  if (remaningTime <= 0) {
    resetTimer();
    return;
  }
}

function displayTime(time) {
  let [hours, minutes, seconds] = formatTimerTime(time);

  display.querySelector("#hours").textContent = hours;
  display.querySelector("#minutes").textContent = minutes;
  display.querySelector("#seconds").textContent = seconds;

  document.title = `${hours}:${minutes}:${seconds} | Timer`;
}

function resetTimer() {
  clearInterval(timerInterval);
  timeEnd = 0;
  elapsedTime = 0;
  /* limpa o display do timer, para evitar números negativos quando o tempo acabar ou quando o timer por parado, evitar que o tempo restante fique visível na tela. */
  displayTime(0);
  setTimerButton.disabled = false;
  disableButtons(playButton, pauseButton, stopButton);
  document.title = "Timer";
  setPauseState(false);
  saveTimerState();
}

window.addEventListener("beforeunload", saveTimerState);

window.addEventListener("load", () => {
  if (timeEnd > 0) {
    if (isPaused) {
      displayTime(elapsedTime / 1000);
      disableButtons(pauseButton);
      enableButtons(playButton);
    } else {
      timerInterval = setInterval(() => startTimer(), 1000);
      disableButtons(playButton);
      enableButtons(pauseButton, stopButton);
    }

    setTimerButton.disabled = true;
  }
});

setTimerButton.addEventListener("click", () => {
  modal.showModal();
});

modal.querySelector(".modal__header__close").addEventListener("click", () => {
  modal.close();
});

timerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const hours = parseInt(timerForm.hours.value) || 0;
  const minutes = parseInt(timerForm.minutes.value) || 0;
  const seconds = parseInt(timerForm.seconds.value) || 0;

  const invalid = hours <= 0 && minutes <= 0 && seconds <= 0;

  if (invalid) {
    return;
  }

  // há um pequeno atraso de 2 segundos para o timer começar, por isso a soma de 2 segundos ao tempo final.
  timeEnd = Date.now() + (hours * 3600 + minutes * 60 + seconds) * 1000 + 2000;

  timerForm.reset();
  modal.close();
  setTimerButton.disabled = true;
  enableButtons(pauseButton, stopButton);

  timerInterval = setInterval(() => startTimer(), 1000);
});

timerForm.addEventListener("reset", () => {
  modal.close();
});

playButton.addEventListener("click", () => {
  timeEnd = Date.now() + elapsedTime;
  timerInterval = setInterval(() => startTimer(), 1000);
  setPauseState(false);
  disableButtons(playButton);
  enableButtons(pauseButton, stopButton);
});

pauseButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  elapsedTime = timeEnd - Date.now();
  setPauseState(true);
  disableButtons(pauseButton);
  enableButtons(playButton, stopButton);
});

stopButton.addEventListener("click", () => {
  resetTimer();
});
