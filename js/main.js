import Cronometer from "./Cronometer.js";
import Timer from "./Timer.js";

const mainContainer = document.querySelector('.container');
const cronometerButton = document.querySelector('#cronometer');
const timerButton = document.querySelector('#timer');

const cronometerPage = new Cronometer();
const timerPage = new Timer();

cronometerButton.addEventListener('click', () => {
    mainContainer.innerHTML = '';
    mainContainer.appendChild(cronometerPage.render());
});

timerButton.addEventListener('click', () => {
    mainContainer.innerHTML = '';
    mainContainer.appendChild(timerPage.render());
});

mainContainer.appendChild(timerPage.render());