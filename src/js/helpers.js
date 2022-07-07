import icons from "url:../img/icons.svg";
import { TIMEOUT_SEC } from "./config";
import { API_KEY } from "./apikey";

/**
 * Rejects Promise after s seconds
 * @param {number} s - seconds
 * @returns {Promise}
 */
const timeout = (s) => {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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

const toSnakeCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("_");

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

/**
 * Converts keys of an object to Snake_case (shallow)
 * @param {object} obj - object to convert
 * @returns {object} new object
 */
export const snakeCaseKeys = (obj) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[toSnakeCase(key)] = obj[key];
    return acc;
  }, {});

/**
 * Partitions array into two, using a filter function
 * @param {any[]} arr - array to partition
 * @param {function} fn - filter function
 * @returns {any[]} partitioned array
 */
export const partition = (arr, fn) =>
  arr.reduce(
    (acc, val, i, arr) => {
      acc[fn(val, i, arr) ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );

/**
 * Get data in JSON from api
 * @param {string} id - recipe id
 * @returns {Promise} data from api
 */
export const AJAX = async (baseUrl, postData = null) => {
  try {
    let options;
    if (postData) {
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      };
    }
    const url = `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}key=${API_KEY}`;
    const res = await Promise.race([fetch(url, options), timeout(TIMEOUT_SEC)]);
    const resData = await res.json();
    if (!res.ok) {
      throw new Error(`API error: ${resData.message} (${res.status})`);
    }
    return resData;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
