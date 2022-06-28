import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  /**
   * Render recipe
   * @param {object} data - recipe object from api
   */
  render(data) {
    this._clear();
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Clear contents of container
   */
  _clear() {
    this._parentElement.innerHTML = "";
  }

  /**
   * Renders waiting spinner
   */
  renderSpinner() {
    const html = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  removeSpinner() {
    const spinnerEl = this._parentElement.querySelector(".spinner");
    spinnerEl && this._parentElement.removeChild(spinnerEl);
  }

  /**
   * Displays error message in DOM
   * @param {string} [message=this._errorMessage] - error message
   */
  renderErrorMessage(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
