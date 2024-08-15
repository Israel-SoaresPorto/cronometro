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
            <dialog class="timer__modal">
                <div class="modal__header">
                    <h2>Iniciar o Timer</h2>
                    <button class="modal__header__close">&times</button>
                </div>
                <form class="modal__form" formmethod="dialog">
                    <div class="modal__form-inputs">
                        <div class="modal__form-inputs__group">
                            <label for="hours">Horas</label>
                            <input type="number" id="hours" name="hours" min="0" max="23" step="1">
                        </div>
                        <div class="modal__form-inputs__group">
                            <label for="minutes">Minutos</label>
                            <input type="number" id="minutes" name="minutes" min="0" max="59" step="1">
                        </div>
                        <div class="modal__form-inputs__group">
                            <label for="seconds">Segundos</label>
                            <input type="number" id="seconds" name="seconds" min="0" max="59" step="1">
                        </div>
                    </div>
                    <div class="modal__form-actions">
                        <button type="submit" class="modal__form-actions__button">Iniciar</button>
                        <button type="reset" class="modal__form-actions__button">Cancelar</button>
                    </div>    
                </form>
            </dialog>
            <button class="timer__open-modal">Iniciar o Timer</button>
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

    const modal = timerPage.querySelector(".timer__modal");
    const timerForm = timerPage.querySelector(".modal__form");
    const setTimerButton = timerPage.querySelector(".timer__open-modal");
    const display = timerPage.querySelector(".display");
    const playButton = timerPage.querySelector("#play");
    const pauseButton = timerPage.querySelector("#pause");
    const stopButton = timerPage.querySelector("#stop");

    modal.querySelector(".modal__header__close").addEventListener("click", () => {
      modal.close();
    });

    timerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const hours = parseInt(timerForm.hours.value) || 0;
      const minutes = parseInt(timerForm.minutes.value) || 0; 
      const seconds = parseInt(timerForm.seconds.value) || 0;

      this.duration = hours * 3600 + minutes * 60 + seconds;

      if (this.duration <= 0) {
        return;
      }    

      this.timerInterval = setInterval(() => this.displayTime(display), 1000);

      modal.close();
      setTimerButton.disabled = true;
      this.enableButtons(pauseButton, stopButton);
    });

    setTimerButton.addEventListener("click", () => {
      modal.showModal();
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
      setTimerButton.disabled = false;
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
      display.previousElementSibling.disabled = false;
      this.disableButtons(...display.nextElementSibling.querySelectorAll("button"));
    }

    this.duration--;
  }
}
