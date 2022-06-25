import { camelCaseKeys, getJSON } from "./helpers";
import { API_URL } from "./config";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
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
