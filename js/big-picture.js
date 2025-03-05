import { isEscapeKey } from './utils.js';

const COMMENTS_STEP = 5;

const sectionBigPicture = document.querySelector('.big-picture');
const bigPictureImg = sectionBigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCounter = sectionBigPicture.querySelector('.likes-count');
const commentShownCount = sectionBigPicture.querySelector('.social__comment-shown-count');
const comentDescription = sectionBigPicture.querySelector('.social__caption');
const bigPictureCancel = sectionBigPicture.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentTotalCounter = document.querySelector('.social__comment-total-count');
const commentsLoader = document.querySelector('.comments-loader');

let shownComments = 0;
let comments = [];

const createComment = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const onCommentsLoadClick = () => {
  const commentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(shownComments, shownComments + COMMENTS_STEP);
  const renderedCommentsLength = renderedComments.length + shownComments;

  renderedComments.forEach ((commentData) => {
    const comment = createComment(commentData);
    commentsFragment.append(comment);
  });

  commentsList.append(commentsFragment);

  socialCommentCount.textContent = shownComments;
  commentTotalCounter.textContent = comments.length;

  if (renderedCommentsLength >= comments.length) {
    commentsLoader.classList.add('hidden');
  }

  shownComments += COMMENTS_STEP;
};

const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  onCommentsLoadClick();

  commentsLoader.addEventListener('click', onCommentsLoadClick);
};

const clearComments = () => {
  shownComments = 0;

  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', onCommentsLoadClick);
};

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
  commentsList.innerHTML = '';

  renderComments(currentPhoto.comments);

  document.addEventListener('keydown', onPhotoKeydown);
  bigPictureCancel.addEventListener('click', onBigPictureCancel);
};
