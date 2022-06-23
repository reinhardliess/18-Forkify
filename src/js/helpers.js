/**
 * Converts string to camelCase
 * @param {string} str
 * @returns str converted to camelCase
 */
export const toCamelCase = (str) => {
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
export const camelCaseKeys = (obj) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[toCamelCase(key)] = obj[key];
    return acc;
  }, {});
