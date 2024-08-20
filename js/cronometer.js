import { disableButtons, enableButtons, formatTime } from "./utils.js";

const display = document.querySelector(".display");
const btnPlay = document.querySelector("#play");
const btnPause = document.querySelector("#pause");
const btnPartial = document.querySelector("#partial");
const btnStop = document.querySelector("#stop");
const partialsList = document.querySelector("#partials-list");

let timeInit;
let elapsedTime = 0;
let elapsedPartialTime = 0;
let timerInterval;
let partialCount = 0;

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


function recordPartial() {
  let partialTime = Date.now() - timeInit;
  elapsedPartialTime = partialTime - elapsedPartialTime;

  let partialTimeArray = formatTime(partialTime);
  let elapsedPartialTimeArray = formatTime(elapsedPartialTime);

  let partialTimeDisplay = `${partialTimeArray[0]} : ${partialTimeArray[1]} : ${partialTimeArray[2]} : ${partialTimeArray[3]}`;

  let elapsedPartialTimeDisplay = `${elapsedPartialTimeArray[0]} : ${elapsedPartialTimeArray[1]} : ${elapsedPartialTimeArray[2]} : ${elapsedPartialTimeArray[3]}`;

  partialCount++;

  elapsedPartialTime = partialTime;

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
}

btnPlay.addEventListener("click", () => {
  timeInit = Date.now() - elapsedTime;
  timerInterval = setInterval(() => startCronometer(), 1);
  disableButtons(btnPlay);
  enableButtons(btnPause, btnPartial, btnStop);
});

btnPause.addEventListener("click", () => {
  pauseCronometer();
  disableButtons(btnPause, btnPartial);
  enableButtons(btnPlay);
});

btnPartial.addEventListener("click", () => {
  recordPartial();
});

btnStop.addEventListener("click", () => {
  stopCronometer();
  disableButtons(btnPause, btnPartial, btnStop);
  enableButtons(btnPlay);
  updateCronometerDisplay(0);
  document.title = "Cronômetro";
  partialsList.innerHTML = "";
});
