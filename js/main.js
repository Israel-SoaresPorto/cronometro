import Cronometer from "./Cronometer.js";
import Timer from "./Timer.js";

const mainContainer = document.querySelector('.container');
const cronometerButton = document.querySelector('#cronometer');
const timerButton = document.querySelector('#timer');

const cronometerPage = new Cronometer().render();
const timerPage = new Timer().render();

cronometerButton.addEventListener('click', () => {
    document.title = "Cronômetro";
    mainContainer.innerHTML = '';
    mainContainer.appendChild(cronometerPage);
});

timerButton.addEventListener('click', () => {
    document.title = "Timer";
    mainContainer.innerHTML = '';
    mainContainer.appendChild(timerPage);
});

mainContainer.appendChild(cronometerPage);
