import { getSearch } from './services.js';
import renderCard from './renderCard.js';

const title = document.querySelector('.other-films__title');
const filmWeek = document.querySelector('.film-week');
const searchForm = document.querySelector('.header__search-form');
const searchInput = document.querySelector('.header__search-input');
const search = () => {
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!searchInput.value.trim() !== '') {
      getSearch(searchInput.value).then(data => {
        if (data.results.length) {
          renderCard(data, '');
        } else {
          throw 'К сожаления по вашему запросу ничего не найдено';
        }
      }).then(() => {
        filmWeek.remove();
        title.textContent = 'Результат поиска';
      }).catch(err => {
        filmWeek.remove();
        title.textContent = err;
      });
      searchForm.reset();
    }
  });
};

export default search;
