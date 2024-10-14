import {getRandomInteger, getRandomArrayElement} from './utils.js';
import {openPhoto, openBigPicture} from './big-picture.js';
import {MAX_PHOTOS, MIN_AVATARS_ID, MAX_AVATARS_ID, MESSAGE_USERS, NAME_USERS, PHOTO_DESCRIPTIONS, MIN_NUMBER_LIKES, MAX_NUMBER_LIKES, MIN_COMMENTS, MAX_COMMENTS} from './data.js';

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(MIN_AVATARS_ID, MAX_AVATARS_ID)}.svg`,
  message: getRandomArrayElement(MESSAGE_USERS),
  name: getRandomArrayElement(NAME_USERS),
});

export const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
  likes: getRandomInteger(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
  comment: Array.from({length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)}, (__, index) => createComment(index + 1)),
});

const createGallery = (length) => Array.from({length: length}, (_, index) => createPhoto(index + 1));
export const gallery = createGallery(MAX_PHOTOS);

export const pictureSection = document.querySelector('.pictures');
const templateFragmentPhotos = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const createPictureEl = (photo) => {
  const photoSample = templateFragmentPhotos.cloneNode(true);
  photoSample.dataset.pictureId = photo.id;
  const image = photoSample.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;
  photoSample.querySelector('.picture__likes').textContent = photo.likes;
  photoSample.querySelector('.picture__comments').textContent = photo.comment.length;

  return photoSample;
};

export const renderGallery = (photos) => {

  photos.forEach((photo) => {
    const photoSample = createPictureEl(photo);
    fragment.append(photoSample);
  });

  pictureSection.append(fragment);
};

pictureSection.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');
  const currentPictures = currentPicture.dataset.pictureId;

  openPhoto();

  if (currentPictures) {
    openBigPicture(currentPictures);
  }
});
