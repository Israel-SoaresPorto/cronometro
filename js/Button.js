export default class Button {
  constructor(id, icon, disabled = false) {
    this.button = document.createElement("button");
    this.button.id = id;
    this.button.classList.add("button__control");
    this.button.disabled = disabled;
    this.button.innerHTML = `<i class="fa-solid fa-${icon}"></i>`;
  }

  render() {
    return this.button.outerHTML;
  }
}
