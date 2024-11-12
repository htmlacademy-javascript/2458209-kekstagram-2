import * as DATA from './data.js';
import {isEscapeKey} from './utils.js';

const sectionBigPicture = document.querySelector('.big-picture');
const bigPictureImg = sectionBigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCounter = sectionBigPicture.querySelector('.likes-count');
const bigPictureCancel = sectionBigPicture.querySelector('.big-picture__cancel');
const commentSocial = sectionBigPicture.querySelector('.social__comments');
const commentSocialTemplate = commentSocial.querySelector('.social__comment');
const comentDescription = sectionBigPicture.querySelector('.social__caption');
const commentTotalCounter = document.querySelector('.social__comment-total-count');
const commentCounter = 0;

let comments = [];

const onBigPictureCancel = () => {
  closePhoto();
};

const onPhotoKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
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
  document.removeEventListener('keydown', onPhotoKeydown);
}

bigPictureCancel.addEventListener('click', () => {
  closePhoto();
});

const createComment = (comment) => {
  const socialComment = commentSocialTemplate.cloneNode(true);

  socialComment.querySelector('.social__picture').src = comment.avatar;
  socialComment.querySelector('.social__picture').alt = comment.name;
  socialComment.querySelector('.social__text').textContent = comment.message;

  return socialComment;
};

const renderComments = () => {
  const socialCommentsFragment = document.createDocumentFragment();

  comments.splice(commentCounter, DATA.MAX_COMMENTS).forEach((item) => {
    socialCommentsFragment.append(createComment(item));
  });

  commentSocial.append(socialCommentsFragment);
};

export const openBigPicture = (photoData) => {
  showModal();

  comments = [...photoData.comment];
  commentSocial.innerHTML = '';
  commentTotalCounter.textContent = photoData.comment;
  bigPictureImg.src = photoData.url;
  likesCounter.textContent = photoData.likes;
  comentDescription.textContent = photoData.description;

  renderComments();

  bigPictureCancel.addEventListener('click', onBigPictureCancel);
  document.addEventListener('keydown', onPhotoKeydown);
};
