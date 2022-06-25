class SearchView {
  _parentElement = document.querySelector("form.search");

  /**
   * Retrieves the search input
   * @returns {string} search input text
   */
  getQuery() {
    const inputSearch = this._parentElement.querySelector(".search__field");
    return inputSearch.value;
  }

  /**
   * Adds event handler for search button
   * @param {function} handler - handler callback
   */
  addHandlerSearch(handler) {
    const button = this._parentElement.querySelector(".search__btn");
    button.addEventListener("click", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
