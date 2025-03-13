import { debounce } from './utils.js';
import { initGallery } from './gallery.js';

const RENDER_PHOTOS_DELAY = 500;
const PHOTOS_COUNT = {
  min: 0,
  max: 10
};

const SORTFUNC = {
  random: () => Math.random() - 0.5,
  discussed: (a, b) => b.comments.length - a.comments.length
};
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const INACTIVE_FILTER_CLASS = 'img-filters--inactive';

const imgFilters = document.querySelector('.img-filters');
const defaultFilter = imgFilters.querySelector('#filter-default');
const randomFilter = imgFilters.querySelector('#filter-random');
const discussedFilter = imgFilters.querySelector('#filter-discussed');

let activeFilter = defaultFilter;
let pictures = [];

const clearPhotos = () => document.querySelectorAll('.picture').forEach((item) => {
  item.remove();
});

const setFilter = (button) => {
  activeFilter.classList.remove(ACTIVE_BUTTON_CLASS);
  button.classList.add(ACTIVE_BUTTON_CLASS);
  activeFilter = button;
};

const selectFilter = () => {
  clearPhotos();

  let filteredData = [];

  switch (activeFilter) {
    case randomFilter:
      filteredData = pictures.toSorted(SORTFUNC.random).slice(PHOTOS_COUNT.min, PHOTOS_COUNT.max);
      break;
    case discussedFilter:
      filteredData = pictures.toSorted(SORTFUNC.discussed);
      break;
    default:
      filteredData = pictures;
  }

  initGallery(filteredData);
};

const debounceFilter = debounce(selectFilter, RENDER_PHOTOS_DELAY);

const onFilterClick = (evt) => {
  const targetButton = evt.target;

  if (activeFilter === targetButton) {
    return;
  }

  setFilter(targetButton);
  debounceFilter();
};


export const showFilter = (picturesData) => {
  pictures = picturesData;

  imgFilters.classList.remove(INACTIVE_FILTER_CLASS);
  imgFilters.addEventListener('click', onFilterClick);
};
