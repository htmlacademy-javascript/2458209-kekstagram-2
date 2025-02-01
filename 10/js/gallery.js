import {openBigPicture} from './big-picture.js';

const pictureSection = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictureEl = (photo) => {
  const photoSample = photoTemplate.cloneNode(true);
  const image = photoSample.querySelector('.picture__img');

  photoSample.dataset.pictureId = photo.id;
  image.src = photo.url;
  image.alt = photo.description;
  photoSample.querySelector('.picture__likes').textContent = photo.likes;
  photoSample.querySelector('.picture__comments').textContent = photo.comment;

  return photoSample;
};

export const renderGallery = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoSample = createPictureEl(photo);
    fragment.append(photoSample);
  });

  pictureSection.append(fragment);
};

export const openGallery = (gallery) => {
  pictureSection.addEventListener('click', (evt) => {
    const element = evt.target.closest('.picture[data-picture-id]');

    if (!element) {
      return;
    }

    const data = gallery.find((photo) => photo.id === Number(element.dataset.pictureId));

    if (data) {
      openBigPicture(data);
    }
  });
};

