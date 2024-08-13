import cronometer from "./cronometer.js";
import timer from "./timer.js";

const mainContainer = document.querySelector('.container');

const cronometerPage = cronometer();
const timerPage = timer();

mainContainer.appendChild(timerPage);