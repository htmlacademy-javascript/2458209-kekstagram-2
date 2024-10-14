import {isEscapeKey} from './utils.js';
import {gallery} from './gallery.js';

const sectionBigPicture = document.querySelector('.big-picture');
const bigPictureImg = sectionBigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCounter = sectionBigPicture.querySelector('.likes-count');
const commentSocial = sectionBigPicture.querySelector('.social__comments');
const commentSocialTemplate = commentSocial.querySelector('.social__comment');
const comentDescription = sectionBigPicture.querySelector('.social__caption');
const bigPictureCancel = sectionBigPicture.querySelector('.big-picture__cancel');
const socialCommentsFragment = document.createDocumentFragment();

const createComments = (comment) => {
  const socialComments = commentSocialTemplate.cloneNode(true);

  socialComments.querySelector('.social__picture').src = comment.avatar;
  socialComments.querySelector('.social__picture').alt = comment.name;
  socialComments.querySelector('.social__text').textContent = comment.message;
  socialCommentsFragment.append(socialComments);
};

const renderComments = (comments) => {

  comments.forEach((comment) => {
    const createComment = createComments(comment);
    socialCommentsFragment.append(createComment);
  });

  commentSocial.append(socialCommentsFragment);
};

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
  bigPictureImg.src = currentPhoto.url;
  likesCounter.textContent = currentPhoto.likes;
  commentSocial.innerHTML = '';

  renderComments();

  commentSocial.append(socialCommentsFragment);
  comentDescription.textContent = currentPhoto.description;
  sectionBigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click',onBigPictureCancel);
  document.body.classList.add('modal-open');
};
