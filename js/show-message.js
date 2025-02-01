import { isEscapeKey } from './utils.js';
import { ALERT_SHOW_TIME } from './constants.js';

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const messageSuccess = document.querySelector('#success').content.querySelector('.success');
const messageError = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

export const showAlert = (errorMessage) => {
  const dataErrorElement = dataError.cloneNode(true);

  if (errorMessage) {
    dataErrorElement.querySelector('.data-error__title').textContent = errorMessage;
  }
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME
  );
};

const onBodyClick = (evt) => {
  const message = evt.target.closest('.success__inner') || evt.target.closest('.error__inner');

  if (message) {
    return;
  }
  hideMessage();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    hideMessage();
  }
};

function hideMessage() {
  const messageElem = document.querySelector('.success') || document.querySelector('.error');

  messageElem.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
}

const showMessage = (messageElement, closeBtnClass) => {
  body.append(messageElement);
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onBodyClick);

  messageElement.querySelector(closeBtnClass).addEventListener('click', hideMessage);
};

export const showSuccessMessage = () => showMessage(messageSuccess, '.success__button');
export const showErrorMessage = () => showMessage(messageError, '.error__button');
