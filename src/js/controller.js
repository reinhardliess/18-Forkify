import recipeView from "./views/recipeView";
import * as model from "./model";

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

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
};

// == Execute Section ==

init();
