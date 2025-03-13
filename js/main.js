import './form.js';
import { getData } from './api.js';
import { initGallery } from './gallery.js';
import { showAlert } from './dialogs.js';
import { showFilter } from './filters.js';

getData()
  .then((photos) => {
    initGallery(photos);
    showFilter(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });
