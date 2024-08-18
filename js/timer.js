import { disableButtons, enableButtons } from "./buttonsControl.js";

const modal = document.querySelector(".timer__modal");
const timerForm = document.querySelector(".modal__form");
const setTimerButton = document.querySelector(".timer__open-modal");
const display = document.querySelector(".display");
const playButton = document.querySelector("#play");
const pauseButton = document.querySelector("#pause");
const stopButton = document.querySelector("#stop");

let timerInterval;
let duration = 0;

function displayTime() {
  let remaningTime = duration;

  const hours = Math.floor(remaningTime / 3600);
  const minutes = Math.floor((remaningTime / 60) % 60);
  const seconds = Math.floor(remaningTime % 60);

  display.querySelector("#hours").textContent =
    hours < 10 ? `0${hours}` : hours;
  display.querySelector("#minutes").textContent =
    minutes < 10 ? `0${minutes}` : minutes;
  display.querySelector("#seconds").textContent =
    seconds < 10 ? `0${seconds}` : seconds;

  document.title = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds} | Timer`;

  if (remaningTime <= 0) {
    clearInterval(timerInterval);
    setTimerButton.disabled = false;
    disableButtons(...document.querySelectorAll("button__control"));
    document.title = "Timer";
  }

  duration--;
}

modal.querySelector(".modal__header__close").addEventListener("click", () => {
  modal.close();
});

timerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const hours = parseInt(timerForm.hours.value) || 0;
  const minutes = parseInt(timerForm.minutes.value) || 0;
  const seconds = parseInt(timerForm.seconds.value) || 0;

  duration = hours * 3600 + minutes * 60 + seconds;

  if (duration <= 0) {
    return;
  }

  timerInterval = setInterval(() => displayTime(), 1000);

  timerForm.reset();
  modal.close();
  setTimerButton.disabled = true;
  enableButtons(pauseButton, stopButton);
});

timerForm.addEventListener("reset", () => {
  modal.close();
});

setTimerButton.addEventListener("click", () => {
  modal.showModal();
});

playButton.addEventListener("click", () => {
  timerInterval = setInterval(() => displayTime(), 1000);
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
  duration = 0;
  displayTime(display);
  setTimerButton.disabled = false;
  disableButtons(playButton, pauseButton, stopButton);
  document.title = "Timer";
});
