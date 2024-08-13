import cronometer from "./cronometer.js";
import timer from "./timer.js";

const mainContainer = document.querySelector('.container');
const cronometerButton = document.querySelector('#cronometer');
const timerButton = document.querySelector('#timer');

const cronometerPage = cronometer();
const timerPage = timer();

cronometerButton.addEventListener('click', () => {
    mainContainer.innerHTML = '';
    mainContainer.appendChild(cronometerPage);
});

timerButton.addEventListener('click', () => {
    mainContainer.innerHTML = '';
    mainContainer.appendChild(timerPage);
});

mainContainer.appendChild(cronometerPage);