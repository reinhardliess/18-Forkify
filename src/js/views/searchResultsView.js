import ResultsView from "./resultsView";

class SearchResultsView extends ResultsView {
  _parentElement = document.querySelector(".search-results .results");
  _errorMessage =
    "No recipes found for your search. Please try a different search!";
}

export default new SearchResultsView();
