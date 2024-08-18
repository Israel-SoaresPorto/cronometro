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

function saveState() {
  sessionStorage.setItem("cronometerTimeInit", timeInit);
  sessionStorage.setItem("cronometerElapsedTime", elapsedTime);
}

function loadState() {
  const savedTimeInit = sessionStorage.getItem("cronometerTimeInit") || 0;
  const savedElapsedTime = sessionStorage.getItem("cronometerElapsedTime") || 0;

  timeInit = parseInt(savedTimeInit);
  elapsedTime = parseInt(savedElapsedTime);
}

function setPauseState(pauseState) {
  isPaused = pauseState;
  sessionStorage.setItem("cronometerIsPaused", isPaused);
}

function setPartialState(partials) {
  sessionStorage.setItem("cronometerPartials", JSON.stringify(partials));
  sessionStorage.setItem("cronometerElapsedPartialTime", elapsedPartialTime);
}

function disableButtons(...buttons) {
  buttons.forEach((button) => (button.disabled = true));
}

function enableButtons(...buttons) {
  buttons.forEach((button) => (button.disabled = false));
}

function convertTime(time) {
  let hours = Math.floor(time / 3600000);
  let rest = time % 3600000;
  let minutes = Math.floor(rest / 60000);
  let seconds = Math.floor((rest % 60000) / 1000);
  let milliseconds = rest % 1000;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  milliseconds =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;

  return [hours, minutes, seconds, milliseconds];
}

function startCronometer(display) {
  let timeNow = Date.now();
  let timeDiff = timeNow - timeInit;
  updateTime(timeDiff, display);
}

function updateTime(time) {
  let [hours, minutes, seconds, milliseconds] = convertTime(time);

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
  let partialTimeArray = convertTime(partial.totalTime);
  let elapsedPartialTimeArray = convertTime(partial.elapsedTime);

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
  document.title = "Cronômetro";
}

window.addEventListener("load", () => {
  loadState();

  if (timeInit) {
    if (isPaused) {
      updateTime(elapsedTime);
      disableButtons(btnPause, btnPartial);
      enableButtons(btnPlay, btnStop);
    } else {
      disableButtons(btnPlay);
      enableButtons(btnPause, btnPartial, btnStop);
      timerInterval = setInterval(() => startCronometer(display), 1);
    }
  }

  restorePartials(partials);
});

btnPlay.addEventListener("click", () => {
  timeInit = Date.now() - elapsedTime;
  timerInterval = setInterval(() => startCronometer(display), 1);
  disableButtons(btnPlay);
  enableButtons(btnPause, btnPartial, btnStop);
  setPauseState(false);
  saveState();
});

btnPause.addEventListener("click", () => {
  pauseCronometer();
  disableButtons(btnPause, btnPartial);
  enableButtons(btnPlay);
  saveState();
  setPauseState(true);
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
  display.querySelector("#miliseconds").textContent = "000";
  display.querySelector("#seconds").textContent = "00";
  display.querySelector("#minutes").textContent = "00";
  display.querySelector("#hours").textContent = "00";
  partialsList.innerHTML = "";
  setPartialState([]);
  setPauseState(false);
  saveState();
});
