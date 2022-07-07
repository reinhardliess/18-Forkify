import icons from "url:../../img/icons.svg";
import fracty from "fracty";
import View from "./view";
import { API_KEY } from "../apikey";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "No recipes found for your query. Please try again!";

  /**
   * Generate recipe markup
   */
  _generateMarkup() {
    const userGeneratedState = this._data.key !== API_KEY ? "hidden" : "";
    const html = `
        <figure class="recipe__fig">
          <img src=${this._data.imageUrl} alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-servings="${
                this._data.servings - 1
              }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-servings="${
                this._data.servings + 1
              }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
          <div class="recipe__user-generated ${userGeneratedState}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn-toggle-bookmark" data-bookmarked="${
            this._data.bookmarked ? 1 : 0
          }">
            <svg class="">
              <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">

           ${this._data.ingredients
             .map(this._generateIngredientMarkup)
             .join("")}
          </ul>
        </div>
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
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
   * Installs event handler
   * @param {function} handler - event handler callback
   */
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((type) =>
      window.addEventListener(type, handler)
    );
  }

  /**
   * Installs handler for +- buttons to change servings
   * @param {function} handler
   */
  addHandlerServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) {
        return;
      }
      e.preventDefault();
      const newServings = +btn.dataset.servings;
      if (newServings > 0) {
        handler(newServings);
      }
    });
  }

  /**
   * Installs bookmark button event handler
   * @param {function} handler - callback
   */
  addHandlerToggleBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-toggle-bookmark");
      if (!btn) {
        return;
      }
      e.preventDefault();
      const bookmarkedState = +btn.dataset.bookmarked;
      handler(bookmarkedState);
    });
  }
}

export default new RecipeView();
