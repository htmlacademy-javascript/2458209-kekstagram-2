import { isEscapeKey } from './utils.js';

const COMMENTS_STEP = 5;

const sectionBigPicture = document.querySelector('.big-picture');
const bigPictureImg = sectionBigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCounter = sectionBigPicture.querySelector('.likes-count');
const commentDescription = sectionBigPicture.querySelector('.social__caption');
const bigPictureCancel = sectionBigPicture.querySelector('.big-picture__cancel');
const commentsLoader = sectionBigPicture.querySelector('.comments-loader');
const commentShownCount = sectionBigPicture.querySelector('.social__comment-shown-count');
const commentTotalCounter = sectionBigPicture.querySelector('.social__comment-total-count');
const commentsList = sectionBigPicture.querySelector('.social__comments');
const commentsCount = sectionBigPicture.querySelector('.social__comment-count');
const commentTemplate = document.querySelector('#user-comment').content.querySelector('.social__comment');

let currentCommentCount = 0;
let currentComments = [];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const createComment = (comments) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = comments.avatar;
  comment.querySelector('.social__picture').alt = comments.name;
  comment.querySelector('.social__text').textContent = comments.message;

  return comment;
};

const renderComments = () => {
  const commentsStep = currentCommentCount + COMMENTS_STEP;
  const renderedComments = currentComments.slice(currentCommentCount, commentsStep);
  currentCommentCount += renderedComments.length;

  const commentsFragment = document.createDocumentFragment();

  renderedComments.forEach ((commentData) => {
    const comment = createComment(commentData);
    commentsFragment.append(comment);
  });

  commentsList.append(commentsFragment);

  commentShownCount.textContent = currentCommentCount;

  if (currentComments.length) {
    commentsCount.classList.remove('hidden');
  }

  if (currentCommentCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const onCommentsLoadClick = () => renderComments();

const onBigPictureCancel = () => closeBigPicture();

function closeBigPicture() {
  sectionBigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  currentCommentCount = 0;

  commentTotalCounter.textContent = '';
  commentShownCount.textContent = '';
  commentsList.innerHTML = '';

  bigPictureCancel.removeEventListener('click', onBigPictureCancel);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoadClick);
}

bigPictureCancel.addEventListener('click', () => closeBigPicture());

export const openBigPicture = (photo) => {
  sectionBigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  currentComments = photo.comments;

  bigPictureImg.src = photo.url;
  likesCounter.textContent = photo.likes;
  commentDescription.textContent = photo.description;
  commentTotalCounter.textContent = currentComments.length;

  renderComments();

  if (currentComments.length >= COMMENTS_STEP) {
    commentsLoader.classList.remove('hidden');
  }

  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCancel.addEventListener('click', onBigPictureCancel);
  commentsLoader.addEventListener('click', onCommentsLoadClick);
};
