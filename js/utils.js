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

export { enableButtons, disableButtons };
