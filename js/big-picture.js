
import {isEscapeKey} from './utils.js';
import {pictureSection} from './render-gallery.js';
import {gallery} from './create-gallery.js';

const sectionBigPicture = document.querySelector('.big-picture');
const bigPictureImg = sectionBigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCounter = sectionBigPicture.querySelector('.likes-count');
const commentSocial = sectionBigPicture.querySelector('.social__comments');
const commentSocialTemplate = commentSocial.querySelector('.social__comments');
const comentDescription = sectionBigPicture.querySelector('.social__caption');
const commentCount = sectionBigPicture.querySelector('.social__comment-count');
const commentLoad = sectionBigPicture.querySelector('.social__comments-loader');
const bigPictureCancel = sectionBigPicture.querySelector('.big-picture__cancel');

const onBigPictureCancel = () => {
  closePhoto();
};

const onPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhoto();
  }
};

function openPhoto () {
  sectionBigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPhotoEscKeydown);
}

function closePhoto () {
  sectionBigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPhotoEscKeydown);
}

pictureSection.addEventListener('click', () => {
  openPhoto();
});

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

    socialComments.querySelector('.social_picture').src = comments.avatar;
    socialComments.querySelector('.social_picture').alt = comments.name;
    socialComments.querySelector('.social_text').textContent = comments.message;
    socialCommentsFragment.append(socialComments);
  });

  commentSocial.append(socialCommentsFragment);
  comentDescription.textContent = currentPhoto.description;
  commentCount.classList('hidden');
  commentLoad.classList('hidden');
  sectionBigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click',onBigPictureCancel);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPhotoEscKeydown);
};

pictureSection.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    openBigPicture(currentPicture.dataset.picturedID);
  }
});
