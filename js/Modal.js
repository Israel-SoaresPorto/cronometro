export default class Modal {
  constructor() {
    this.modal = document.createElement("dialog");
    this.modal.classList.add("modal");
  }

  render() {
    this.modal.innerHTML = `
        <div class="modal__header">
            <h2>Iniciar o Timer</h2>
            <button class="modal__header__close">&times</button>
        </div>
        <form class="modal__form" formmethod="dialog">
            <div class="modal__form-inputs">
                <div class="modal__form-inputs__group">
                    <label for="hours">Horas</label>
                    <input type="number" id="hours" name="hours" min="0" max="23" step="1">
                </div>
                <div class="modal__form-inputs__group">
                    <label for="minutes">Minutos</label>
                    <input type="number" id="minutes" name="minutes" min="0" max="59" step="1">
                </div>
                <div class="modal__form-inputs__group">
                    <label for="seconds">Segundos</label>
                    <input type="number" id="seconds" name="seconds" min="0" max="59" step="1">
                </div>
            </div>
            <div class="modal__form-actions">
                <button type="submit" class="modal__form-actions__button">Iniciar</button>
                <button type="reset" class="modal__form-actions__button">Cancelar</button>
            </div>    
        </form>
        
    `;

    return this.modal;
  }
}
