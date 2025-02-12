import './form.js';
import { getData } from './api.js';
import { renderGallery, initGallery } from './gallery.js';
import { showAlert } from './dialogs.js';

getData()
  .then((photos) => {
    renderGallery(photos);
    initGallery(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });
