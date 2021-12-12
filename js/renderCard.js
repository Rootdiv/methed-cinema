'use strict';

import { getVideo, getPagination } from './services.js';

const listCard = document.querySelector('.other-films__list');
const pagination = document.querySelector('.pagination');

let paginationType = '';

const renderCard = async (data, type) => {
  console.log('data: ', data);
  paginationType = type;
  listCard.textContent = '';
  pagination.textContent = '';
  Promise.all(data.results.map(async item => {
    const mediaType = item.media_type ?? type;
    const video = await getVideo(item.id, mediaType);
    const key = video.results[0]?.key;
    const card = document.createElement('li');
    card.className = 'other-films__item';

    const link = document.createElement('a');
    if (key) {
      link.href = `https://youtu.be/${key}`;
    }
    link.className = 'other-films__link tube';
    if (item.vote_average) {
      link.dataset.rating = item.vote_average;
    }

    const img = document.createElement('img');
    img.className = 'other-films__img';
    img.alt = `постер ${item.name || item.title}`;
    img.src = item.poster_path ?
      `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}` :
      'img/no-poster.png';
    link.append(img);
    card.append(link);
    return card;
  }))
    .then(cards => listCard.append(...cards))
    .then(() => {
      if (data.total_pages > 1) {

        if (data.page > 1) {
          const buttonLeft = document.createElement('button');
          buttonLeft.className = 'pagination-arrow';
          buttonLeft.dataset.page = data.page - 1;
          buttonLeft.textContent = '<';
          pagination.append(buttonLeft);
        }

        if (data.page < data.total_pages) {
          const buttonRight = document.createElement('button');
          buttonRight.className = 'pagination-arrow';
          buttonRight.dataset.page = data.page + 1;
          buttonRight.textContent = '>';
          pagination.append(buttonRight);
        }
      }
    });

  pagination.addEventListener('click', async event => {
    if (event.target.classList.contains('pagination-arrow')) {
      const data = await getPagination(event.target.dataset.page);
      renderCard(data, paginationType);
    }
  });
};

export default renderCard;
