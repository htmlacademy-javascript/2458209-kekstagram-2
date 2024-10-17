import {isEscapeKey} from './utils.js';
import DATA from './data.js';

const sectionBigPicture = document.querySelector('.big-picture');
const bigPictureImg = sectionBigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCounter = sectionBigPicture.querySelector('.likes-count');
const bigPictureCancel = sectionBigPicture.querySelector('.big-picture__cancel');
const commentSocial = sectionBigPicture.querySelector('.social__comments');
const commentSocialTemplate = commentSocial.querySelector('.social__comment');
const comentDescription = sectionBigPicture.querySelector('.social__caption');
const commentTotalCounter = document.querySelector('.social__comment-total-count');

let comments;

const onBigPictureCancel = () => {
  if (isEscapeKey) {
    closePhoto();
  }
};

const onPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhoto();
  }
};

const showModal = () => {
  sectionBigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

function closePhoto () {
  sectionBigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancel.removeEventListener('click', onBigPictureCancel);
  document.removeEventListener('keydown', onPhotoEscKeydown);
}

bigPictureCancel.addEventListener('click', () => {
  closePhoto();
});

const renderComment = (comment) => {
  const socialComment = commentSocialTemplate.cloneNode(true);

  socialComment.querySelector('.social__picture').src = comment.avatar;
  socialComment.querySelector('.social__picture').alt = comment.name;
  socialComment.querySelector('.social__text').textContent = comment.message;

  return socialComment;
};

const renderComments = () => {
  const socialCommentsFragment = document.createDocumentFragment();

  comments.splice(0, DATA.MAX_COMMENTS).forEach((item) => {
    socialCommentsFragment.append(renderComment(item));
  });

  commentSocial.appendChild(socialCommentsFragment);
};

const renderModal = (currentPhoto) => {
  bigPictureImg.src = currentPhoto.url;
  likesCounter.textContent = currentPhoto.likes;
  comentDescription.textContent = currentPhoto.description;

  renderComments();
};

export const openBigPicture = (currentPhoto) => {
  showModal();

  comments = [...currentPhoto.comment];
  commentSocial.innerHTML = '';
  commentTotalCounter.textContent = currentPhoto.comment;

  renderModal(currentPhoto);

  bigPictureCancel.addEventListener('click', closePhoto);
  document.addEventListener('keydown', onPhotoEscKeydown);
};
