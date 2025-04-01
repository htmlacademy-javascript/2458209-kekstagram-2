import './form.js';
import { getData } from './api.js';
import { initGallery } from './gallery.js';
import { showAlert } from './dialogs.js';
import { initFilters } from './filters.js';

getData()
  .then((photos) => {
    initGallery(photos);
    initFilters();
  })
  .catch((err) => {
    showAlert(err.message);
  });
