import { disableButtons, enableButtons, formatTime } from "./utils.js";

const display = document.querySelector(".display");
const btnPlay = document.querySelector("#play");
const btnPause = document.querySelector("#pause");
const btnPartial = document.querySelector("#partial");
const btnStop = document.querySelector("#stop");
const partialsList = document.querySelector("#partials-list");

let timeInit;
let elapsedTime = 0;
let elapsedPartialTime =
  sessionStorage.getItem("cronometerElapsedPartialTime") || 0;
let timerInterval;
let isPaused = sessionStorage.getItem("cronometerIsPaused") === "true";
let partialCount = 0;
let partials = JSON.parse(sessionStorage.getItem("cronometerPartials")) || [];

function saveCronometerState() {
  sessionStorage.setItem("cronometerTimeInit", timeInit);
  sessionStorage.setItem("cronometerElapsedTime", elapsedTime);
}

function loadCronometerState() {
  const savedTimeInit = sessionStorage.getItem("cronometerTimeInit") || 0;
  const savedElapsedTime = sessionStorage.getItem("cronometerElapsedTime") || 0;

  timeInit = parseInt(savedTimeInit);
  elapsedTime = parseInt(savedElapsedTime);
}

function setCronometerPauseState(pauseState) {
  isPaused = pauseState;
  sessionStorage.setItem("cronometerIsPaused", isPaused);
}

function setPartialState(partials) {
  sessionStorage.setItem("cronometerPartials", JSON.stringify(partials));
  sessionStorage.setItem("cronometerElapsedPartialTime", elapsedPartialTime);
}

function startCronometer() {
  let timeNow = Date.now();
  let timeDiff = timeNow - timeInit;
  updateCronometerDisplay(timeDiff);
}

function updateCronometerDisplay(time) {
  let [hours, minutes, seconds, milliseconds] = formatTime(time);

  display.querySelector("#miliseconds").textContent = milliseconds;
  display.querySelector("#seconds").textContent = seconds;
  display.querySelector("#minutes").textContent = minutes;
  display.querySelector("#hours").textContent = hours;

  document.title = `${hours}:${minutes}:${seconds} | Cronômetro`;
}

function pauseCronometer() {
  clearInterval(timerInterval);
  elapsedTime = Date.now() - timeInit;
}

function restorePartials(partials) {
  partials.map((partial) => {
    showPartial(partial);
  });
}

function recordPartial() {
  let partialTime = Date.now() - timeInit;

  let elapsedPartial = partialTime - elapsedPartialTime;

  partials.push({
    totalTime: partialTime,
    elapsedTime: elapsedPartial,
  });

  elapsedPartialTime = partialTime;
}

function showPartial(partial) {
  let partialTimeArray = formatTime(partial.totalTime);
  let elapsedPartialTimeArray = formatTime(partial.elapsedTime);

  let partialTimeDisplay = `${partialTimeArray[0]} : ${partialTimeArray[1]} : ${partialTimeArray[2]} : ${partialTimeArray[3]}`;

  let elapsedPartialTimeDisplay = `${elapsedPartialTimeArray[0]} : ${elapsedPartialTimeArray[1]} : ${elapsedPartialTimeArray[2]} : ${elapsedPartialTimeArray[3]}`;

  partialCount++;

  let partialTimeElement = document.createElement("div");

  partialTimeElement.classList.add("partial");

  partialTimeElement.innerHTML = `
        <span>${partialCount}</span>
        <span>${elapsedPartialTimeDisplay}</span>
        <span>${partialTimeDisplay}</span>
    `;

  partialsList.insertBefore(partialTimeElement, partialsList.firstChild);
}

function stopCronometer() {
  clearInterval(timerInterval);
  timeInit = 0;
  elapsedTime = 0;
  partialCount = 0;
  elapsedPartialTime = 0;
  partials = [];
}

window.addEventListener("load", () => {
  loadCronometerState();

  if (timeInit) {
    if (isPaused) {
      updateCronometerDisplay(elapsedTime);
      disableButtons(btnPause, btnPartial);
      enableButtons(btnPlay, btnStop);
    } else {
      disableButtons(btnPlay);
      enableButtons(btnPause, btnPartial, btnStop);
      timerInterval = setInterval(() => startCronometer(), 1);
    }
  }

  restorePartials(partials);
});

btnPlay.addEventListener("click", () => {
  timeInit = Date.now() - elapsedTime;
  timerInterval = setInterval(() => startCronometer(), 1);
  disableButtons(btnPlay);
  enableButtons(btnPause, btnPartial, btnStop);
  setCronometerPauseState(false);
  saveCronometerState();
});

btnPause.addEventListener("click", () => {
  pauseCronometer();
  disableButtons(btnPause, btnPartial);
  enableButtons(btnPlay);
  saveCronometerState();
  setCronometerPauseState(true);
});

btnPartial.addEventListener("click", () => {
  recordPartial();
  showPartial(partials[partials.length - 1]);
  setPartialState(partials);
});

btnStop.addEventListener("click", () => {
  stopCronometer();
  disableButtons(btnPause, btnPartial, btnStop);
  enableButtons(btnPlay);
  updateCronometerDisplay(0);
  document.title = "Cronômetro";
  partialsList.innerHTML = "";
  setPartialState([]);
  setCronometerPauseState(false);
  saveCronometerState();
});
