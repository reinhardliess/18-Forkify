import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import searchResultsView from "./views/searchResultsView";
import paginationView from "./views/paginationView";

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
  } catch (error) {
    console.error(error.message);
    recipeView.renderErrorMessage();
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
    const results = model.state.search.results;
    if (results.length === 0) {
      throw new Error("No search results");
    }
    searchResultsView.render(model.getPaginationResults());
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
    searchResultsView.renderErrorMessage();
  }
};

const controlPagination = (gotoPage) => {
  searchResultsView.render(model.getPaginationResults(gotoPage));
  paginationView.render(model.state.search);
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
};

// == Execute Section ==

init();
