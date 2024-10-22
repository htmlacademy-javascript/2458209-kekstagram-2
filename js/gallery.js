import {getRandomInteger, getRandomArrayElement} from './utils.js';
import {openBigPicture} from './big-picture.js';
import * as DATA from './data.js';

const objectData = Object.create(DATA);

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(objectData.MIN_AVATARS_ID, objectData.MAX_AVATARS_ID)}.svg`,
  message: getRandomArrayElement(objectData.MESSAGE_USERS),
  name: getRandomArrayElement(objectData.NAME_USERS),
});

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(objectData.PHOTO_DESCRIPTIONS),
  likes: getRandomInteger(objectData.MIN_NUMBER_LIKES, objectData.MAX_NUMBER_LIKES),
  comment: Array.from({length: getRandomInteger(objectData.MIN_COMMENTS, objectData.MAX_COMMENTS)}, (__, index) => createComment(index + 1)),
});

const createGallery = (length) => Array.from({length}, (_, index) => createPhoto(index + 1));
const gallery = createGallery(objectData.MAX_PHOTOS);

const pictureSection = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictureEl = (photo) => {
  const photoSample = photoTemplate.cloneNode(true);
  const image = photoSample.querySelector('.picture__img');

  photoSample.dataset.pictureId = photo.id;
  image.src = photo.url;
  image.alt = photo.description;
  photoSample.querySelector('.picture__likes').textContent = photo.likes;
  photoSample.querySelector('.picture__comments').textContent = photo.comment.length;

  return photoSample;
};

const renderGallery = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoSample = createPictureEl(photo);
    fragment.append(photoSample);
  });

  pictureSection.append(fragment);
};
renderGallery(gallery);

pictureSection.addEventListener('click', (evt) => {
  const data = evt.target.closest('.picture[data-picture-id]');
  const element = gallery.find((photo) => photo.id === Number(data.dataset.pictureId));

  if(!data) {
    return;
  }

  if(element) {
    openBigPicture(element);
  }
});
