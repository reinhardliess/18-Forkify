import ResultsView from "./resultsView";

class BookmarksView extends ResultsView {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";
}

export default new BookmarksView();
