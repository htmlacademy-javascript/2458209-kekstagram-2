import { debounce } from './utils.js';
import { renderGallery, clearPhotos, getUserPhotos } from './gallery.js';

const RENDER_PHOTOS_DELAY = 500;
const PHOTOS_COUNT = {
  min: 0,
  max: 10
};
const SORT_FUNC = {
  random: () => Math.random() - 0.5,
  discussed: (a, b) => b.comments.length - a.comments.length
};
const ACTIVE_FILTER_BUTTON_CLASS = 'img-filters__button--active';
const INACTIVE_FILTER_LIST_CLASS = 'img-filters--inactive';

const imgFilters = document.querySelector('.img-filters');
const defaultFilter = imgFilters.querySelector('#filter-default');
const randomFilter = imgFilters.querySelector('#filter-random');
const discussedFilter = imgFilters.querySelector('#filter-discussed');

let activeFilter = defaultFilter;
let pictures = [];

const getFilterPhotos = () => {
  switch (activeFilter) {
    case randomFilter:
      return pictures.toSorted(SORT_FUNC.random).slice(PHOTOS_COUNT.min, PHOTOS_COUNT.max);
    case discussedFilter:
      return pictures.toSorted(SORT_FUNC.discussed);
    default:
      return getUserPhotos();
  }
};

const selectFilter = () => {
  pictures = getFilterPhotos();

  clearPhotos();
  renderGallery(pictures);
};

const debounceFilter = debounce(selectFilter, RENDER_PHOTOS_DELAY);

const onFilterClick = (evt) => {
  const filterButton = evt.target;

  if (activeFilter === filterButton) {
    return;
  }

  activeFilter.classList.remove(ACTIVE_FILTER_BUTTON_CLASS);
  filterButton.classList.add(ACTIVE_FILTER_BUTTON_CLASS);
  activeFilter = filterButton;

  debounceFilter();
};

export const initFilter = () => {
  pictures = getUserPhotos();

  imgFilters.classList.remove(INACTIVE_FILTER_LIST_CLASS);
  imgFilters.addEventListener('click', onFilterClick);
};
