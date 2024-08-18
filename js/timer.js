import { disableButtons, enableButtons } from "./utils.js";

const modal = document.querySelector(".timer__modal");
const timerForm = document.querySelector(".modal__form");
const setTimerButton = document.querySelector(".timer__open-modal");
const display = document.querySelector(".display");
const playButton = document.querySelector("#play");
const pauseButton = document.querySelector("#pause");
const stopButton = document.querySelector("#stop");

let timeInit = 0;
let elapsedTime = 0;
let timerInterval;
let timeEnd = parseInt(sessionStorage.getItem("timerEnd")) || 0;

function saveTimerState() {
  sessionStorage.setItem("timerEnd", timeEnd);
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
  timeInit = Date.now() - elapsedTime;

  let remaningTime = timeEnd - timeInit;

  displayTime(remaningTime / 1000);

  if (remaningTime <= 0) {
    clearInterval(timerInterval);
    setTimerButton.disabled = false;
    disableButtons(playButton, pauseButton, stopButton);
    document.title = "Timer";
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

window.addEventListener("beforeunload", saveTimerState);

window.addEventListener("load", () => {
  if (timeEnd > 0) {
    timerInterval = setInterval(() => startTimer(), 1000);
    disableButtons(setTimerButton);
    enableButtons(pauseButton, stopButton);
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

  timeEnd = Date.now() + (hours * 3600 + minutes * 60 + seconds) * 1000;

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
  timerInterval = setInterval(() => startTimer(), 1000);
  disableButtons(playButton);
  enableButtons(pauseButton);
});

pauseButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  disableButtons(pauseButton);
  enableButtons(playButton);
});

stopButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  timeInit = 0;
  timeEnd = 0;
  displayTime(0);
  setTimerButton.disabled = false;
  disableButtons(playButton, pauseButton, stopButton);
  document.title = "Timer";
});
