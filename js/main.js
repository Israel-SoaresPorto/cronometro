const cronometerButton = document.querySelector('#cronometer');
const timerButton = document.querySelector('#timer');

cronometerButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

timerButton.addEventListener('click', () => {
    window.location.href = 'timer.html';
});