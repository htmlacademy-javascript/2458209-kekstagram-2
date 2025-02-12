const COMMENTS_STEP = 5;

const commentsList = document.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentTotalCounter = document.querySelector('.social__comment-total-count');
const commentsLoader = document.querySelector('.comments-loader');

let shownComments = 0;
let comments = [];

commentsList.innerHTML = '';

const onCommentsLoadClick = () => {
  const commentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(shownComments, shownComments + COMMENTS_STEP);
  const renderedCommentsLength = renderedComments.length + shownComments;

  renderedComments.forEach ((comment) => {
    const pictureComment = commentTemplate.cloneNode(true);

    pictureComment.querySelector('.social__picture').src = comment.avatar;
    pictureComment.querySelector('.social__picture').alt = comment.name;
    pictureComment.querySelector('.social__text').textContent = comment.message;

    commentsFragment.append(pictureComment);
  });

  commentsList.append(commentsFragment);

  socialCommentCount.firstChild.textContent = `${renderedCommentsLength} `;
  commentTotalCounter.textContent = comments.length;

  if (renderedCommentsLength >= comments.length) {
    commentsLoader.classList.add('hidden');
  }

  shownComments += COMMENTS_STEP;
};

export const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  onCommentsLoadClick();

  commentsLoader.addEventListener('click', onCommentsLoadClick);
};

export const clearComments = () => {
  shownComments = 0;
  commentsList.innerHTML = '';

  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', onCommentsLoadClick);
};
