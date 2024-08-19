function enableButtons(...buttons) {
  buttons.forEach(button => {
    button.disabled = false;
  });
}

function disableButtons(...buttons) {
  buttons.forEach(button => {
    button.disabled = true;
  });
}

function formatTime(time) {
  let hours = Math.floor(time / 3600000);
  let rest = time % 3600000;
  let minutes = Math.floor(rest / 60000);
  let seconds = Math.floor((rest % 60000) / 1000);
  let milliseconds = rest % 1000;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  milliseconds =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;

  return [hours, minutes, seconds, milliseconds];
}

export { enableButtons, disableButtons, formatTime };
