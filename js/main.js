import Cronometer from "./Cronometer.js";
import Timer from "./Timer.js";

const mainContainer = document.querySelector('.container');
const cronometerButton = document.querySelector('#cronometer');
const timerButton = document.querySelector('#timer');
const changeThemeButton = document.querySelector('#change-theme');

const cronometerPage = new Cronometer().render();
const timerPage = new Timer().render();
let actualTheme = localStorage.getItem('theme');

window.addEventListener('load', () => {
    mainContainer.appendChild(cronometerPage);
    document.title = "Cronômetro";

    if (actualTheme === 'light') {
        document.body.classList.add('light');
    }
});

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

changeThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('light');

    if(document.body.classList.contains('light')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

