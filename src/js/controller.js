import icons from "url:../img/icons.svg";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
/**
 * Converts string to camelCase
 * @param {string} str
 * @returns str converted to camelCase
 */
const toCamelCase = (str) => {
  let s =
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join("");
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

/**
 * Converts keys of an object to camelCase (shallow)
 * @param {object} obj - object to convert
 * @returns {object} new object
 */
const camelCaseKeys = (obj) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[toCamelCase(key)] = obj[key];
    return acc;
  }, {});

const showSpinner = () => {
  const html = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
  recipeContainer.insertAdjacentHTML("afterbegin", html);
};

const showRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) {
      return;
    }

    showSpinner();
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`API error: ${data.message} (${res.status})`);
    }
    const recipe = camelCaseKeys(data.data.recipe);
    console.log(recipe);

    // render recipe

    const html = `
      <figure class="recipe__fig">
        <img src=${recipe.imageUrl} alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            recipe.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            recipe.servings
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
         ${recipe.ingredients
           .map((ingredient) => {
             return `
          <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${ingredient.quantity}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.description}
          </div>
        </li>`;
           })
           .join("")}
        </ul>
      </div>
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            recipe.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
        `;
    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", html);
  } catch (error) {
    console.error(error.message);
  }
};

// == Execute Section ==

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, showRecipe)
);

// showRecipe();
