import { isEscapeKey } from './utils.js';
import {clearComments, renderComments} from './render-comments.js';

const sectionBigPicture = document.querySelector('.big-picture');
const bigPictureImg = sectionBigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCounter = sectionBigPicture.querySelector('.likes-count');
const commentShownCount = sectionBigPicture.querySelector('.social__comment-shown-count');
const comentDescription = sectionBigPicture.querySelector('.social__caption');
const bigPictureCancel = sectionBigPicture.querySelector('.big-picture__cancel');

const onPhotoKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    closePhoto();
  }
};

const onBigPictureCancel = () => closePhoto();

const showModal = () => {
  sectionBigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

function closePhoto() {
  clearComments();

  sectionBigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancel.removeEventListener('click', onBigPictureCancel);
  document.removeEventListener('keydown', onPhotoKeydown);
}

bigPictureCancel.addEventListener('click', () => closePhoto());

export const openBigPicture = (pictureId, picturesDataList) => {
  showModal();

  const currentPhoto = picturesDataList.find((photo) => photo.id === Number(pictureId));

  bigPictureImg.src = currentPhoto.url;
  likesCounter.textContent = currentPhoto.likes;
  commentShownCount.textContent = currentPhoto.comments.length;
  comentDescription.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  document.addEventListener('keydown', onPhotoKeydown);
  bigPictureCancel.addEventListener('click', onBigPictureCancel);
};
