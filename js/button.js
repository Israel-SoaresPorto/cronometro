export default function button(id, icon, disabled = false) {
  const button = document.createElement("button");
  button.id = id;
  button.classList.add("button__control");
  button.disabled = disabled;

  button.innerHTML = `<img src="assets/icons/${icon}.svg" alt="" />`;

  return button;
}
