import { isEscapeKey } from './utils.js';
const ALERT_SHOW_TIME = 5000;

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const successDialog = document.querySelector('#success').content.querySelector('.success');
const errorDialog = document.querySelector('#error').content.querySelector('.error');
const body = document.body;

export const showAlert = (errorMessage) => {
  const dataErrorElement = dataError.cloneNode(true);

  if (errorMessage) {
    dataErrorElement.querySelector('.data-error__title').textContent = errorMessage;
  }
  body.append(dataErrorElement);

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
  closeDialog();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    closeDialog();
  }
};

function closeDialog() {
  const messageElem = document.querySelector('.success') || document.querySelector('.error');

  messageElem.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
}

const showDialog = (template) => {
  const message = template.cloneNode(true);
  body.append(message);

  const dialog = document.querySelector('[data-message]');

  if (dialog.target) {
    closeDialog();
  }

  body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown, true);
};

export const showSuccessDialog = () => showDialog(successDialog, '.success__button');
export const showErrorDialog = () => showDialog(errorDialog, '.error__button');
