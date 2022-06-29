import { camelCaseKeys, getJSON } from "./helpers";
import { API_URL, RESULTS_PER_PAGE } from "./config";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    currentPage: 0,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: {},
};

/**
 * Loads recipe from api
 * @param {string} id - api id of recipe
 */
export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    state.recipe = camelCaseKeys(data.data.recipe);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

/**
 * Adjust number of servings
 * @param {number} numServings - number of servings
 */
export const updateServings = (numServings) => {
  state.recipe.ingredients.forEach((ingredient) => {
    ingredient.quantity =
      (ingredient.quantity * numServings) / state.recipe.servings;
  });
  state.recipe.servings = numServings;
};

/**
 * Load search results
 * @param {string} query - query text
 */
export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map((recipe) =>
      camelCaseKeys(recipe)
    );
  } catch (error) {
    throw error;
  }
};

// loadSearchResults("avocado");

/**
 * Get results for page
 * @param {number} [page=1] - page
 * @returns {object[]} paginated results
 */
export const getPaginationResults = (page = 1) => {
  const { results, resultsPerPage } = state.search;
  state.search.currentPage = page;
  state.search.numPages = Math.ceil(results.length / resultsPerPage);
  const offset = (page - 1) * resultsPerPage;
  return results.slice(offset, offset + resultsPerPage);
};
