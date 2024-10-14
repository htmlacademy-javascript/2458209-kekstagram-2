import {isEscapeKey} from './utils.js';
import {gallery} from './gallery.js';

const sectionBigPicture = document.querySelector('.big-picture');
const bigPictureImg = sectionBigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCounter = sectionBigPicture.querySelector('.likes-count');
const commentSocial = sectionBigPicture.querySelector('.social__comments');
const commentSocialTemplate = commentSocial.querySelector('.social__comment');
const comentDescription = sectionBigPicture.querySelector('.social__caption');
const commentCount = sectionBigPicture.querySelector('.social__comment-count');
const commentLoad = sectionBigPicture.querySelector('.comments-loader');
const bigPictureCancel = sectionBigPicture.querySelector('.big-picture__cancel');

const onBigPictureCancel = (evt) => {
  evt.preventDefault();
  closePhoto();
};

const onPhotoEscKeydown = (evt) => {
  if (isEscapeKey()) {
    evt.preventDefault();
    closePhoto();
  }
};

export const openPhoto = () => {
  sectionBigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPhotoEscKeydown);
};

function closePhoto () {
  sectionBigPicture.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', onBigPictureCancel);
  document.removeEventListener('keydown', onPhotoEscKeydown);
}

bigPictureCancel.addEventListener('click', () => {
  closePhoto();
});

export const openBigPicture = (pictureId) => {
  const currentPhoto = gallery.find((photo) => photo.id === Number(pictureId));
  const socialCommentsFragment = document.createDocumentFragment();
  bigPictureImg.src = currentPhoto.url;
  likesCounter.textContent = currentPhoto.likes;
  commentSocial.innerHTML = '';

  currentPhoto.comment.forEach((comments) => {
    const socialComments = commentSocialTemplate.cloneNode(true);

    socialComments.querySelector('.social__picture').src = comments.avatar;
    socialComments.querySelector('.social__picture').alt = comments.name;
    socialComments.querySelector('.social__text').textContent = comments.message;
    socialCommentsFragment.append(socialComments);
  });

  commentSocial.append(socialCommentsFragment);
  comentDescription.textContent = currentPhoto.description;
  commentCount.classList.add('hidden');
  commentLoad.classList.add('hidden');
  sectionBigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click',onBigPictureCancel);
  document.body.classList.add('modal-open');
};
