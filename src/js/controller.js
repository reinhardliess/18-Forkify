import * as model from "./model";
import recipeView from "./views/recipeView";
import bookmarksView from "./views/bookmarksView";
import addRecipeView from "./views/addRecipeView";
import searchView from "./views/searchView";
import searchResultsView from "./views/searchResultsView";
import paginationView from "./views/paginationView";
import { ADD_RECIPE_MESSAGE_TIMEOUT } from "./config";

import { async } from "regenerator-runtime";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) {
      return;
    }

    recipeView.renderSpinner();

    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
    searchResultsView.update(model.getPaginationResults());
    bookmarksView.update(model.state.bookmarks);
  } catch (error) {
    console.error(error.message);
    recipeView.renderErrorMessage();
  }
};

const controlServings = (numServings) => {
  model.updateServings(numServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlBookmarks = (bookmarkedState) => {
  try {
    if (bookmarkedState === 0) {
      model.addBookmark();
    } else {
      model.removeBookmark();
    }
    recipeView.update(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
  } catch (error) {
    bookmarksView.renderErrorMessage();
    console.error(error);
  }
};

/**
 * Called when add recipe button clicked
 * Generates html form with default form data
 */
const controlAddRecipe = () => {
  addRecipeView.render(model.getDefaultFormData());
  addRecipeView.showDialog();
  addRecipeView.addHandlerUpload(controlUploadRecipe);
};

const controlUploadRecipe = async (formData) => {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(formData);
    recipeView.render(model.state.recipe);

    // Change ID in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    addRecipeView.renderMessage(
      `The new recipe with the title "${model.state.recipe.title}" was added successfully!`
    );
    model.addBookmark();
    bookmarksView.render(model.state.bookmarks);
    setTimeout(
      addRecipeView.closeDialog.bind(addRecipeView),
      ADD_RECIPE_MESSAGE_TIMEOUT
    );
  } catch (error) {
    console.error(error);
    addRecipeView.renderErrorMessage(error.message);
  }
};

const controlSearchResults = async () => {
  try {
    const search = searchView.getQuery().trim();
    if (!search) {
      return;
    }
    searchView.clearSearchInput();
    searchResultsView.renderSpinner();

    await model.loadSearchResults(search);
    searchResultsView.render(model.getPaginationResults());
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
    searchResultsView.renderErrorMessage();
  }
};

/**
 * Callback for pagination buttons
 * @param {number} gotoPage - number of page
 */
const controlPagination = (gotoPage) => {
  searchResultsView.render(model.getPaginationResults(gotoPage));
  paginationView.render(model.state.search);
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerToggleBookmark(controlBookmarks);
  addRecipeView.addHandlerAddRecipe(controlAddRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  model.loadBookmarks();
  bookmarksView.render(model.state.bookmarks);
};

// == Execute Section ==

init();
