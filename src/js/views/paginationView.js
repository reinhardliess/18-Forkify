import icons from "url:../../img/icons.svg";
import View from "./view";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  /**
   * Installs handler for pagination buttons
   * @param {function} handler - handler for pagination buttons
   */
  addHandlerPagination(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) {
        return;
      }

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {

    const { currentPage, numPages } = this._data;
    let markup = "";

    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      markup += `
      <button class="btn--inline pagination__btn--prev" data-goto="${prevPage}">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${prevPage}</span>
      </button>
      `;
    }
    if (currentPage < numPages) {
      const nextPage = currentPage + 1;
      markup += `
      <button class="btn--inline pagination__btn--next" data-goto="${nextPage}">
        <span>Page ${nextPage}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    return markup;
  }
}

export default new PaginationView();
