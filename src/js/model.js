import {
  camelCaseKeys,
  snakeCaseKeys,
  AJAX,
  partition,
} from "./helpers";
import { API_URL, RESULTS_PER_PAGE } from "./config";
import { DEFAULT_FORM_DATA } from "./config";

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
    const data = await AJAX(`${API_URL}/${id}`);
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

/**
 * Adds current recipe to bookmarks
 */
export const addBookmark = () => {
  state.bookmarks.push(state.recipe);
  state.recipe.bookmarked = true;
  saveBookmarks();
};

/**
 * Removes current recipe from bookmarks
 */
export const removeBookmark = () => {
  const index = state.bookmarks.findIndex(
    (bookmark) => bookmark.id === state.recipe.id
  );
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;
  saveBookmarks();
};

/**
 * Creates recipe object from form data
 * @param {any[]} formData - data from form
 * @returns {object} recipe object
 */
const _createUploadData = (formData) => {
  try {
    const partitioned = partition(formData, (arr) =>
      arr[0].startsWith("ingredient")
    );
    ingredients = partitioned[0]
      .map((arr) => arr[1])
      .filter((ingredient) => ingredient.trim())
      .map((ingredient, index) => {
        const arr = ingredient.split(",").map((el) => el.trim());
        if (arr.length !== 3) {
          throw new Error(
            `Invalid data for ingredient&nbsp;${
              index + 1
            }: '${ingredient}'. Correct format is: Quantity,Unit,Description`
          );
        }
        const [_, unit, description] = arr;
        const quantity = arr[0] ? +arr[0] : null;
        return { quantity, unit, description };
      });
    const props = snakeCaseKeys(Object.fromEntries(partitioned[1]));
    const data = {
      ...props,
      ingredients,
    };
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Return default data for add recipe form
 * @returns {object} default form data
 */
export const getDefaultFormData = () => {
  return DEFAULT_FORM_DATA;
};

/**
 * Sends new recipe to server via api
 * @param {any[]} formData - data from form
 */
export const uploadRecipe = async (formData) => {
  try {
    const formattedData = _createUploadData(formData);
    const resData = await AJAX(`${API_URL}`, formattedData);
    state.recipe = camelCaseKeys(resData.data.recipe);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

/**
 * Load search results
 * @param {string} query - query text
 */
export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}`);
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

/**
 * Saves bookmarks to local storage
 */
export const saveBookmarks = () => {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

/**
 * Loads bookmarks from local storage
 */
export const loadBookmarks = () => {
  const storedBookmarks = localStorage.getItem("bookmarks");
  if (storedBookmarks) {
    state.bookmarks = JSON.parse(storedBookmarks);
  }
};
