import Button from "./Button.js";

export default class Timer {
  constructor() {
    this.timerInterval;
    this.duration = 0;
  }

  render() {
    const timerPage = document.createElement("div");
    timerPage.classList.add("timer");

    timerPage.innerHTML = `
            <form class="timer__form">
                <div class="timer__form__inputs">
                    <input type="number" id="hours-input" min="0" max="99">
                    <label for="hours-input">h</label>
                    <input type="number" id="minutes-input" min="0" max="59" >
                    <label for="minutes-input">m</label>
                    <input type="number" id="seconds-input" min="0" max="59">
                    <label for="seconds-input">s</label>
                </div>
                <button type="submit">Iniciar</button>
            </form>    
            <div class="display">
                <span id="hours">00</span>
                <span class="colon">:</span>
                <span id="minutes">00</span>
                <span class="colon">:</span>
                <span id="seconds">00</span>
            </div>
            <div class="timer__controls">
                ${new Button("play", "play", true).render()}
                ${new Button("pause", "pause", true).render()}
                ${new Button("stop", "stop", true).render()}
            </div>
        `;

    const form = timerPage.querySelector(".timer__form");
    const display = timerPage.querySelector(".display");
    const playButton = timerPage.querySelector("#play");
    const pauseButton = timerPage.querySelector("#pause");
    const stopButton = timerPage.querySelector("#stop");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const hours = parseInt(form.querySelector("#hours-input").value) || 0;
      const minutes = parseInt(form.querySelector("#minutes-input").value) || 0;
      const seconds = parseInt(form.querySelector("#seconds-input").value) || 0;

      this.duration = (hours * 60 * 60) + (minutes * 60) + seconds;

      if (this.duration <= 0) {
        return;
      }

      form.reset();
      this.timerInterval = setInterval(() => this.displayTime(display), 1000);
      this.displayTime(display);

      form.querySelector("button").disabled = true;
      this.enableButtons(pauseButton, stopButton);
    });

    playButton.addEventListener("click", () => {
      this.timerInterval = setInterval(() => this.displayTime(display), 1000);
      this.disableButtons(playButton);
      this.enableButtons(pauseButton);
    });

    pauseButton.addEventListener("click", () => {
      clearInterval(this.timerInterval);
      this.disableButtons(pauseButton);
      this.enableButtons(playButton);
    });

    stopButton.addEventListener("click", () => {
      clearInterval(this.timerInterval);
      this.duration = 0;
      this.displayTime(display);
      form.querySelector("button").disabled = false;
      this.disableButtons(playButton, pauseButton, stopButton);
    });

    return timerPage;
  }

  disableButtons(...buttons) {
    buttons.forEach((button) => (button.disabled = true));
  }

  enableButtons(...buttons) {
    buttons.forEach((button) => (button.disabled = false));
  }

  displayTime(display) {
    let remaningTime = this.duration;

    const hours = Math.floor(remaningTime / 3600);
    const minutes = Math.floor((remaningTime / 60) % 60);
    const seconds = Math.floor(remaningTime % 60);

    display.querySelector("#hours").textContent =
      hours < 10 ? `0${hours}` : hours;
    display.querySelector("#minutes").textContent =
      minutes < 10 ? `0${minutes}` : minutes;
    display.querySelector("#seconds").textContent =
      seconds < 10 ? `0${seconds}` : seconds;
    
    if (remaningTime <= 0) {
      clearInterval(this.timerInterval);
      display.previousElementSibling.querySelector("button").disabled = false;
      this.disableButtons(...display.nextElementSibling.querySelectorAll("button"));
    }

    this.duration--;
  }
}
