import icons from "url:../../img/icons.svg";
import fracty from "fracty";

class RecipeView {
  #parentElement = document.querySelector(".recipe");
  #data;
  #errorMessage = "No recipes found for your query. Please try again!";

  /**
   * Render recipe
   * @param {object} data - recipe object from api
   */
  render(data) {
    this.#data = data;
    const markup = this._generateMarkup();
    this._clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Clear contents of container
   */
  _clear() {
    this.#parentElement.innerHTML = "";
  }

  /**
   * Generate recipe markup
   */
  _generateMarkup() {
    const html = `
        <figure class="recipe__fig">
          <img src=${this.#data.imageUrl} alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this.#data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this.#data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">

           ${this.#data.ingredients
             .map(this._generateIngredientMarkup)
             .join("")}
          </ul>
        </div>
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this.#data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
          `;
    return html;
  }

  /**
   * Generate recipe ingredients markup
   */
  _generateIngredientMarkup(ingredient) {
    const quantity = ingredient.quantity ? fracty(ingredient.quantity) : "";
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${quantity}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ingredient.unit}</span>
          ${ingredient.description}
        </div>
      </li>`;
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
    this.#parentElement.insertAdjacentHTML("afterbegin", html);
  }

  /**
   * Installs event handler
   * @param {function} handler - event handler callback
   */
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((type) =>
      window.addEventListener(type, handler)
    );
  }

  /**
   * Displays error message in DOM
   * @param {string} [message=this.#errorMessage] - error message
   */
  renderErrorMessage(message = this.#errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="src/img/icons.svg#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new RecipeView();
