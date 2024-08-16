import Button from "./Button.js";

export default class Cronometer {
  constructor() {
    this.timeInit;
    this.elapsedTime = 0;
    this.elapsedPartialTime = 0;
    this.timerInterval;
    this.partialCount = 0;
  }

  render() {
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
        ${new Button("play", "play", false).render()}
        ${new Button("pause", "pause", true).render()}
        ${new Button("partial", "clock", true).render()}
        ${new Button("stop", "stop", true).render()}
      </div>
      <div id="partials-list"></div>
    `;

    const display = cronometerPage.querySelector(".display");
    const btnPlay = cronometerPage.querySelector("#play");
    const btnPause = cronometerPage.querySelector("#pause");
    const btnPartial = cronometerPage.querySelector("#partial");
    const btnStop = cronometerPage.querySelector("#stop");
    const partialsList = cronometerPage.querySelector("#partials-list");

    btnPlay.addEventListener("click", () => {
      this.timeInit = Date.now() - this.elapsedTime;
      this.timerInterval = setInterval(() => this.startCronometer(display), 1);
      this.disableButtons(btnPlay);
      this.enableButtons(btnPause, btnPartial, btnStop);
    });

    btnPause.addEventListener("click", () => {
      this.pauseCronometer();
      this.disableButtons(btnPause, btnPartial);
      this.enableButtons(btnPlay);
    });

    btnPartial.addEventListener("click", () => {
      this.recordPartial(partialsList);
    });

    btnStop.addEventListener("click", () => {
      this.stopCronometer();
      this.disableButtons(btnPause, btnPartial, btnStop);
      this.enableButtons(btnPlay);
      display.querySelector("#miliseconds").textContent = "000";
      display.querySelector("#seconds").textContent = "00";
      display.querySelector("#minutes").textContent = "00";
      display.querySelector("#hours").textContent = "00";
      partialsList.innerHTML = "";
    });

    return cronometerPage;
  }

  disableButtons(...buttons) {
    buttons.forEach((button) => (button.disabled = true));
  }

  enableButtons(...buttons) {
    buttons.forEach((button) => (button.disabled = false));
  }

  convertTime(time) {
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

  startCronometer(display) {
    let timeNow = Date.now();
    let timeDiff = timeNow - this.timeInit;
    this.updateTime(timeDiff, display);
  }

  updateTime(time, display) {
    let [hours, minutes, seconds, milliseconds] = this.convertTime(time);

    display.querySelector("#miliseconds").textContent = milliseconds;
    display.querySelector("#seconds").textContent = seconds;
    display.querySelector("#minutes").textContent = minutes;
    display.querySelector("#hours").textContent = hours;

    document.title = `${hours}:${minutes}:${seconds} | Cronômetro`;
  }

  pauseCronometer() {
    clearInterval(this.timerInterval);
    this.elapsedTime = Date.now() - this.timeInit;
  }

  recordPartial(partials) {
    let partialTime = Date.now() - this.timeInit;

    let elapsedPartialTime = partialTime - this.elapsedPartialTime;

    let partialTimeArray = this.convertTime(elapsedPartialTime);
    let elapsedPartialTimeArray = this.convertTime(partialTime);

    let partialTimeDisplay = `${partialTimeArray[0]} : ${partialTimeArray[1]} : ${partialTimeArray[2]} : ${partialTimeArray[3]}`;

    let elapsedPartialTimeDisplay = `${elapsedPartialTimeArray[0]} : ${elapsedPartialTimeArray[1]} : ${elapsedPartialTimeArray[2]} : ${elapsedPartialTimeArray[3]}`;

    this.partialCount++;
    this.elapsedPartialTime = partialTime;

    let partialTimeElement = document.createElement("div");

    partialTimeElement.classList.add("partial");

    partialTimeElement.innerHTML = `
        <span>${this.partialCount}</span>
        <span>${partialTimeDisplay}</span>
        <span>${elapsedPartialTimeDisplay}</span>
    `;

    partials.appendChild(partialTimeElement);
  }

  stopCronometer() {
    clearInterval(this.timerInterval);
    this.elapsedTime = 0;
    this.partialCount = 0;
    this.elapsedPartialTime = 0;
    document.title = "Cronômetro";
  }
}
