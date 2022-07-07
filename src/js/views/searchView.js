class SearchView {
  _parentElement = document.querySelector("form.search");
  _inputSearch = this._parentElement.querySelector(".search__field");

  /**
   * Retrieves the search input
   * @returns {string} search input text
   */
  getQuery() {
    // const inputSearch = this._parentElement.querySelector(".search__field");
    return this._inputSearch.value;
  }

  /**
   * Clears search input field
   */
  clearSearchInput() {
    this._inputSearch.value = "";
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
