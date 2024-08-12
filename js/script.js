const timer = document.querySelector(".timer");
const displayMiliseconds = document.querySelector("#miliseconds");
const displaySeconds = document.querySelector("#seconds");
const displayMinutes = document.querySelector("#minutes");
const displayHours = document.querySelector("#hours");
const btnPlay = document.querySelector("#play");
const btnPause = document.querySelector("#pause");
const btnPartial = document.querySelector("#partial");
const btnStop = document.querySelector("#stop");
const partialsList = document.querySelector("#partials-list");

let timeInit;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let partialCount = 0;

function startTimer() {
  let timeNow = Date.now();
  let timeDiff = timeNow - timeInit;
  showTime(timeDiff);
}

function showTime(time) {
  let hours = Math.floor(time / 3600000);
  let rest = time % 3600000;
  let minutes = Math.floor(rest / 60000);
  let seconds = Math.floor((rest % 60000) / 1000);
  let milliseconds = rest % 1000;

  displayMiliseconds.textContent =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;
  displaySeconds.textContent = seconds < 10 ? "0" + seconds : seconds;
  displayMinutes.textContent = minutes < 10 ? "0" + minutes : minutes;
  displayHours.textContent = hours < 10 ? "0" + hours : hours;
}

btnPlay.addEventListener("click", () => {
  timeInit = Date.now() - elapsedTime;
  timerInterval = setInterval(startTimer, 1);
  btnPlay.disabled = true;
  btnPause.disabled = false;
  btnPartial.disabled = false;
  btnStop.disabled = false;
});

btnPause.addEventListener("click", () => {
  clearInterval(timerInterval);
  elapsedTime = Date.now() - timeInit;
  btnPlay.disabled = false;
  btnPause.disabled = true;
  btnPartial.disabled = true;
});

btnPartial.addEventListener("click", () => {
  let partialHours = displayHours.textContent;
  let partialMinutes = displayMinutes.textContent;
  let partialSeconds = displaySeconds.textContent;
  let partialMilliseconds = displayMiliseconds.textContent;

  let partialTimeDisplay = `${partialHours} : ${partialMinutes} : ${partialSeconds} : ${partialMilliseconds}`;

  partialCount++;

  let partialTimeElement = document.createElement("div");
  partialTimeElement.classList.add("partial");
  partialTimeElement.innerHTML = `<span>${partialCount}</span><span>${partialTimeDisplay}</span>`;
  partialsList.appendChild(partialTimeElement);
});

btnStop.addEventListener("click", () => {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  partialCount = 0;
  btnPlay.disabled = false;
  btnPause.disabled = true;
  btnPartial.disabled = true;
  btnStop.disabled = true;
  displayMiliseconds.textContent = "000";
  displaySeconds.textContent = "00";
  displayMinutes.textContent = "00";
  displayHours.textContent = "00";
  partialsList.innerHTML = "";
});
