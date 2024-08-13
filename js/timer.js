import button from "./Button.js";

export default function timer() {
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
            ${button("play", "play").outerHTML}
            ${button("pause", "pause").outerHTML}
            ${button("stop", "stop").outerHTML}
        </div>
    `;

    const form = timerPage.querySelector(".timer__form");
    const hoursDisplay = timerPage.querySelector("#hours");
    const minutesDisplay = timerPage.querySelector("#minutes");
    const secondsDisplay = timerPage.querySelector("#seconds");
    const playButton = timerPage.querySelector("#play");
    const pauseButton = timerPage.querySelector("#pause");
    const stopButton = timerPage.querySelector("#stop");

    let timerInterval;
    let duration = 0;

    function disableButtons(...buttons) {
        playButton.disabled = buttons.includes("play");
        pauseButton.disabled = buttons.includes("pause");
        stopButton.disabled = buttons.includes("stop");
    }

    playButton.disabled = true;
    pauseButton.disabled = true;
    stopButton.disabled = true;

    function displayTime() {
      let remaningTime = duration;

      const hours = Math.floor(remaningTime / 3600);
      const minutes = Math.floor((remaningTime / 60) % 60);
      const seconds = Math.floor(remaningTime % 60);

      hoursDisplay.textContent = hours < 10 ? `0${hours}` : hours;
      minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
      secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;

      if (remaningTime <= 0) {
        clearInterval(timerInterval);
        form.querySelector("button").disabled = false;
        disableButtons("play", "pause", "stop");
      }

      duration--;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const hours = parseInt(form.querySelector("#hours-input").value) || 0;
        const minutes = parseInt(form.querySelector("#minutes-input").value) || 0;
        const seconds = parseInt(form.querySelector("#seconds-input").value) || 0;

        duration = (hours * 60 * 60) + (minutes * 60) + seconds;

        if (duration <= 0) {
            return;
        }

        clearInterval(timerInterval);
        timerInterval = setInterval(displayTime, 1000);

        form.reset();
        displayTime();
        form.querySelector("button").disabled = true;
        disableButtons("play");
    });

    playButton.addEventListener("click", () => {
        timerInterval = setInterval(displayTime, 1000);
        disableButtons("play");
    });

    pauseButton.addEventListener("click", () => {
        clearInterval(timerInterval);
        disableButtons("pause");
    });

    stopButton.addEventListener("click", () => {
        clearInterval(timerInterval);
        duration = 0;
        displayTime();
        form.querySelector("button").disabled = false;
        disableButtons("play", "pause", "stop");
    });
    

  return timerPage;
}
