import { camelCaseKeys, getJSON } from "./helpers";
import { API_URL, RESULTS_PER_PAGE } from "./config";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    currentPage: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

/**
 * Loads recipe from api
 * @param {string} id - api id of recipe
 */
export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    state.recipe = camelCaseKeys(data.data.recipe);
    state.recipe.bookmarked = !!state.bookmarks.find(
      (bookmark) => bookmark.id === state.recipe.id
    );
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

export const addBookmark = () => {
  state.bookmarks.push(state.recipe);
  state.recipe.bookmarked = true;
};

export const removeBookmark = () => {
  const index = state.bookmarks.findIndex(
    (bookmark) => bookmark.id === state.recipe.id
  );
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;
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
    state.search.currentPage = 1;
  } catch (error) {
    throw error;
  }
};

/**
 * Get results for page
 * @param {number} [page] - page (default: current page)
 * @returns {object[]} paginated results
 */
export const getPaginationResults = (page = state.search.currentPage) => {
  const { results, resultsPerPage } = state.search;
  state.search.currentPage = page;
  state.search.numPages = Math.ceil(results.length / resultsPerPage);
  const offset = (page - 1) * resultsPerPage;
  return results.slice(offset, offset + resultsPerPage);
};

export const saveBookmarks = () => {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const loadBookmarks = () => {
  const storedBookmarks = localStorage.getItem("bookmarks");
  if (storedBookmarks) {
    state.bookmarks = JSON.parse(storedBookmarks);
  }
};
