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
const commentTotalCounter = document.querySelector('.social__comment-total-count');
const commentsLoader = document.querySelector('.comments-loader');

let currentComment = 0;
let comments = [];

const onPhotoKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    closePhoto();
  }
};

const updateCommentShownCount = () => {
  commentShownCount.textContent = currentComment;
};

const createComment = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  const commentsStep = currentComment + COMMENTS_STEP;
  const renderedComments = comments.slice(currentComment, commentsStep);
  currentComment += renderedComments.length;

  const commentsFragment = document.createDocumentFragment();

  renderedComments.forEach ((commentData) => {
    const comment = createComment(commentData);
    commentsFragment.append(comment);
  });

  commentsList.append(commentsFragment);

  updateCommentShownCount();

  if (currentComment >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const onCommentsLoadClick = () => renderComments();

const clearComments = () => {
  currentComment = 0;

  commentTotalCounter.textContent = '';
  commentShownCount.textContent = '';
  commentsList.innerHTML = '';

  commentsLoader.classList.add('hidden');
  commentsLoader.removeEventListener('click', onCommentsLoadClick);
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

  comments = currentPhoto.comments;

  bigPictureImg.src = currentPhoto.url;
  likesCounter.textContent = currentPhoto.likes;
  commentShownCount.textContent = currentPhoto.comments.length;
  commentTotalCounter.textContent = comments.length;
  comentDescription.textContent = currentPhoto.description;
  commentsList.innerHTML = '';

  renderComments();
  updateCommentShownCount();

  document.addEventListener('keydown', onPhotoKeydown);
  bigPictureCancel.addEventListener('click', onBigPictureCancel);

  if (comments.length >= COMMENTS_STEP) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onCommentsLoadClick);
  }
};
