'use strict';
const API_KEY = 'fc4d5431d481c3e7e28e4c88d61a3581';
const BASE_URL = 'https://api.themoviedb.org/3/';
const LANGUAGE = '&language=ru-RU';

const getData = url => fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw `Что-то пошло не так, ошибка ${response.status}`;
  }).catch(err => console.error(err));

let url = '';

export const getPagination = async page => await getData(url + `&page=${page}`);

export const getTrends = async (type = 'all', period = 'day', page = 1) => {
  url = `${BASE_URL}trending/${type}/${period}?api_key=${API_KEY}${LANGUAGE}`;
  return await getData(url + `&page=${page}`);
};

export const getTop = async (type, page = 1) => {
  url = `${BASE_URL}${type}/top_rated?api_key=${API_KEY}${LANGUAGE}`;
  return await getData(url + `&page=${page}`);
};

export const getPopular = async (type, page = 1) => {
  url = `${BASE_URL}${type}/popular?api_key=${API_KEY}${LANGUAGE}`;
  return await getData(url + `&page=${page}`);
};

export const getVideo = async (id, type) => {
  const url = `${BASE_URL}${type}/${id}/videos?api_key=${API_KEY}${LANGUAGE}`;
  return await getData(url);
};

export const getSearch = async (query, page = 1) => {
  url = `${BASE_URL}search/multi?api_key=${API_KEY}${LANGUAGE}&query=${query}&include_adult=false`;
  return await getData(url + `&page=${page}`);
};
