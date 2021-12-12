'use strict';

import {
  getTrends,
  getPopular,
  getTop
} from './services.js';
import renderCard from './renderCard.js';

const title = document.querySelector('.other-films__title');
const filmWeek = document.querySelector('.film-week');
const getNav = document.querySelectorAll('.get-nav');

const menuLink = () => {
  getNav.forEach(nav => {
    nav.addEventListener('click', event => {
      const target = event.target.closest('.get-nav__link');
      if (target) {
        event.preventDefault();
        filmWeek.style.display = 'none';
        title.textContent = target.textContent;
        //Популярные фильмы
        if (target.classList.contains('get-nav__link_popular-movies')) {
          getPopular('movie').then(data => renderCard(data, 'movie'));
        }
        //Топ сериалов
        if (target.classList.contains('get-nav__link_top-tv')) {
          getTop('tv').then(data => renderCard(data, 'tv'));
        }
        //Фильмы и сериалы в тренде
        if (target.classList.contains('get-nav__link_trends')) {
          getTrends('all', 'week').then(data => renderCard(data));
        }
        //Популярные сериалы
        if (target.classList.contains('get-nav__link_popular-tv')) {
          getPopular('tv').then(data => renderCard(data, 'tv'));
        }
        //Топ фильмов
        if (target.classList.contains('get-nav__link_top-movies')) {
          getTop('movie').then(data => renderCard(data, 'movie'));
        }
      }
    });
  });
};

export default menuLink;
