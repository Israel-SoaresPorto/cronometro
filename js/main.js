import Cronometer from "./Cronometer.js";
import timer from "./timer.js";

const mainContainer = document.querySelector('.container');

const cronometerPage = new Cronometer();

/* cronometerButton.addEventListener('click', () => {
    mainContainer.innerHTML = '';
    mainContainer.appendChild(cronometerPage);
});

timerButton.addEventListener('click', () => {
    mainContainer.innerHTML = '';
    mainContainer.appendChild(timerPage);
}); */

mainContainer.appendChild(cronometerPage.render());