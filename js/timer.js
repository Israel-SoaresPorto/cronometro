import { disableButtons, enableButtons } from "./utils.js";

const modal = document.querySelector(".timer__modal");
const timerForm = document.querySelector(".modal__form");
const setTimerButton = document.querySelector(".timer__open-modal");
const display = document.querySelector(".display");
const playButton = document.querySelector("#play");
const pauseButton = document.querySelector("#pause");
const stopButton = document.querySelector("#stop");

let timerInterval;
let duration = 0;

function formatTimerTime(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time / 60) % 60);
  let seconds = Math.floor(time % 60);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return [hours, minutes, seconds];
}

function displayTime() {
  let [hours, minutes, seconds] = formatTimerTime(duration);

  display.querySelector("#hours").textContent = hours;
  display.querySelector("#minutes").textContent = minutes;
  display.querySelector("#seconds").textContent = seconds;

  document.title = `${hours}:${minutes}:${seconds}`;
  
  if (duration <= 0) {
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
