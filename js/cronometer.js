import button from "./button.js";

export default function cronometer() {
  const cronometerPage = document.createElement("div");
  cronometerPage.classList.add("cronometer");

  cronometerPage.innerHTML = `
      <div class="display">
        <span id="hours">00</span>
        <span class="colon">:</span>
        <span id="minutes">00</span>
        <span class="colon">:</span>
        <span id="seconds">00</span>
        <span class="colon">:</span>
        <span id="miliseconds">000</span>
      </div>
      <div class="controls">
        ${button("play", "play", false).outerHTML}
        ${button("pause", "pause", true).outerHTML}
        ${button("partial", "timer", true).outerHTML}
        ${button("stop", "stop", true).outerHTML}
      </div>
      <div id="partials-list"></div>
  `;

  const displayMiliseconds = cronometerPage.querySelector("#miliseconds");
  const displaySeconds = cronometerPage.querySelector("#seconds");
  const displayMinutes = cronometerPage.querySelector("#minutes");
  const displayHours = cronometerPage.querySelector("#hours");
  const btnPlay = cronometerPage.querySelector("#play");
  const btnPause = cronometerPage.querySelector("#pause");
  const btnPartial = cronometerPage.querySelector("#partial");
  const btnStop = cronometerPage.querySelector("#stop");
  const partialsList = cronometerPage.querySelector("#partials-list");

  let timeInit;
  let elapsedTime = 0;
  let timerInterval;
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

  function disableButtons(...buttons) {
    btnPlay.disabled = buttons.includes("play");
    btnPause.disabled = buttons.includes("pause");
    btnPartial.disabled = buttons.includes("partial");;
    btnStop.disabled = buttons.includes("stop");
  }

  btnPlay.addEventListener("click", () => {
    timeInit = Date.now() - elapsedTime;
    timerInterval = setInterval(startTimer, 1);
    disableButtons("play");
  });

  btnPause.addEventListener("click", () => {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - timeInit;
    disableButtons("pause", "partial");
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
    elapsedTime = 0;
    partialCount = 0;
    disableButtons("pause", "partial", "stop");
    displayMiliseconds.textContent = "000";
    displaySeconds.textContent = "00";
    displayMinutes.textContent = "00";
    displayHours.textContent = "00";
    partialsList.innerHTML = "";
  });

  return cronometerPage;
}
