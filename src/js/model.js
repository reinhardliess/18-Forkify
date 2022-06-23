import { camelCaseKeys } from "./helpers";
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
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`API error: ${data.message} (${res.status})`);
    }
    const recipe = camelCaseKeys(data.data.recipe);
    console.log(recipe);
    state.recipe = recipe;
  } catch (error) {
    console.error(error.message);
  }
};
