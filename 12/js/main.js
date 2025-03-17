import './form.js';
import { getData } from './api.js';
import { initGallery } from './gallery.js';
import { showAlert } from './dialogs.js';
import { initFilter } from './filters.js';

getData()
  .then((photos) => {
    initGallery(photos);
    initFilter();
  })
  .catch((err) => {
    showAlert(err.message);
  });
