import './form.js';
import { getData} from './api.js';
import { renderGallery, openGallery } from './gallery.js';
import { showAlert } from './show-message.js';

getData()
  .then((photos) => {
    renderGallery(photos);
    openGallery(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });
