import Cronometer from "./Cronometer.js";
import Timer from "./Timer.js";
import Modal from "./Modal.js";

const mainContainer = document.querySelector('.container');
const cronometerButton = document.querySelector('#cronometer');
const timerButton = document.querySelector('#timer');

const cronometerPage = new Cronometer().render();
const timerPage = new Timer().render();
const modal = new Modal().render();

cronometerButton.addEventListener('click', () => {
    mainContainer.innerHTML = '';
    mainContainer.appendChild(cronometerPage);
});

timerButton.addEventListener('click', () => {
    mainContainer.innerHTML = '';
    mainContainer.appendChild(timerPage);
});

mainContainer.appendChild(modal);

modal.showModal();