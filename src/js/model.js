import { camelCaseKeys, getJSON } from "./helpers";
import { API_URL } from "./config";

export const state = {
  recipe: {},
  search: {},
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
    console.log(state.recipe);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
