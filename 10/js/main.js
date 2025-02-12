import './form.js';
import { getData } from './api.js';
import { renderGallery, initPhotoClickHandlers } from './gallery.js';
import { showAlert } from './dialogs.js';

getData()
  .then((photos) => {
    renderGallery(photos);
    initPhotoClickHandlers(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });
