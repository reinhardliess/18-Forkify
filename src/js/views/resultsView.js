import icons from "url:../../img/icons.svg";
import View from "./view";
import { API_KEY } from "../apikey";

export default class ResultsView extends View {
  _generateMarkup() {
    const markup = this._data.map(this._generateResultMarkup).join("");
    return markup;
  }

  _generateResultMarkup(result) {
    const id = window.location.hash.slice(1);
    const className = result.id === id ? "preview__link--active" : "";
    const userGeneratedState = result.key !== API_KEY ? "hidden" : "";
    const html = `
    <li class="preview">
      <a class="preview__link ${className}" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.imageUrl}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
          <div class="preview__user-generated ${userGeneratedState}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
    `;
    return html;
  }
}
