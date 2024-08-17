import Cronometer from "./Cronometer.js";
import Timer from "./Timer.js";

const mainContainer = document.querySelector('.container');
const cronometerButton = document.querySelector('#cronometer');
const timerButton = document.querySelector('#timer');
const changeThemeButton = document.querySelector('#change-theme');

const cronometerPage = new Cronometer().render();
const timerPage = new Timer().render();

cronometerButton.addEventListener('click', () => {
    Cronometer.onScreen = true;
    Timer.onScreen = false;
    document.title = "Cronômetro";
    mainContainer.innerHTML = '';
    mainContainer.appendChild(cronometerPage);
});

timerButton.addEventListener('click', () => {
    Cronometer.onScreen = false;
    Timer.onScreen = true;
    document.title = "Timer";
    mainContainer.innerHTML = '';
    mainContainer.appendChild(timerPage);
});

mainContainer.appendChild(cronometerPage);

changeThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('light');
});

