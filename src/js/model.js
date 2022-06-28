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

export const getPaginationResults = (page = 1) => {
  const { results, resultsPerPage } = state.search;
  state.search.currentPage = page;
  state.search.numPages = Math.ceil(results.length / resultsPerPage);
  const offset = (page - 1) * resultsPerPage;
  return results.slice(offset, offset + resultsPerPage);
};
