import View from "./view";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".add-recipe-window");

  constructor() {
    super();
    document
      .querySelector(".overlay")
      .addEventListener("click", this._handlerDialogClose.bind(this));
  }

  _clear() {
    this._parentElement.innerHTML = "";

    const specialMarkup = this._generateSpecialMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", specialMarkup);
    this._addHandlerDialogClose();
  }

  /**
   * Generates markup to create close button
   * @returns {string} generates markup to create close button
   */
  _generateSpecialMarkup() {
    const markup = `
    <button class="btn--close-modal">&times;</button>
    `;
    return markup;
  }

  /**
   * Generate recipe markup
   */
  _generateMarkup() {
    const markup = `
      <form class="upload">
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input
            value="${this._data.title}"
            required
            name="title"
            type="text"
          />
          <label>URL</label>
          <input
            value="${this._data.sourceUrl}"
            required
            name="sourceUrl"
            type="text"
          />
          <label>Image URL</label>
          <input
            value="${this._data.imageUrl}"
            required
            name="imageUrl"
            type="text"
          />
          <label>Publisher</label>
          <input value="${this._data.publisher}" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="${this._data.cookingTime}" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="${this._data.servings}" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="${this._data.ingredients[0]}"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value="${this._data.ingredients[1]}"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value="${this._data.ingredients[2]}"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            value="${this._data.ingredients[3]}"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            value="${this._data.ingredients[4]}"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            value="${this._data.ingredients[5]}"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="${icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
      </form>
      `;
    return markup;
  }

  /**
   * Closes add recipe input form
   */
  closeDialog() {
    this._parentElement.classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
  }

  /**
   * Shows add recipe input form
   */
  showDialog() {
    this._parentElement.classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
  }

  _handlerDialogClose(e) {
    e.preventDefault();
    this.closeDialog();
  }

  _addHandlerDialogClose() {
    document
      .querySelector(".btn--close-modal")
      .addEventListener("click", this._handlerDialogClose.bind(this));
  }

  /**
   * Installs handler for add recipe button
   * @param {function} handler - callback
   */
  addHandlerAddRecipe(handler) {
    document
      .querySelector(".nav__btn--add-recipe")
      .addEventListener("click", (e) => {
        e.preventDefault();
        handler();
        // this._addHandlerDialogClose();
      });
  }

  /**
   * Installs handler for upload recipe button
   * @param {function(formData[]):void} handler - callback
   */
  addHandlerUpload(handler) {
    this._parentElement
      .querySelector(".upload__btn")
      .addEventListener("click", (e) => {
        e.preventDefault();
        const formEl = this._parentElement.querySelector(".upload");
        const data = new FormData(formEl);
        handler([...data.entries()]);
      });
  }
}

export default new AddRecipeView();
