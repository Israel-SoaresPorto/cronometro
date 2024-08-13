/* export default function button(id, icon, disabled = false) {
  const button = document.createElement("button");
  button.id = id;
  button.classList.add("button__control");
  button.disabled = disabled;

  button.innerHTML = `<img src="assets/icons/${icon}.svg" alt="" />`;

  return button;
} */

export default class Button {
  constructor(id, icon, disabled = false) {
    this.button = document.createElement("button");
    this.button.id = id;
    this.button.classList.add("button__control");
    this.button.disabled = disabled;
    this.button.innerHTML = `<img src="assets/icons/${icon}.svg" alt="" />`;
  }

 /*  eventClick(callback) {
    this.button.addEventListener("click", callback);
  } */

  render() {
    return this.button.outerHTML;
  }
}
