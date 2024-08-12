export default function timer() {
    const timerPage = document.createElement("div");
    timerPage.classList.add("timer");

    timerPage.innerHTML = `
        <div class="timer">
            <span id="hours">00</span>
            <span class="colon">:</span>
            <span id="minutes">00</span>
            <span class="colon">:</span>
            <span id="seconds">00</span>
            <span class="colon">:</span>
            <span id="miliseconds">000</span>
          </div>
    `;

    return timerPage;
}