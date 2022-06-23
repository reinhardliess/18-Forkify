// TODO: move to separate module
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
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
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
