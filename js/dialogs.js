import { isEscapeKey } from './utils.js';

const ALERT_SHOW_TIME = 5000;

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const successDialog = document.querySelector('#success').content.querySelector('.success');
const errorDialog = document.querySelector('#error').content.querySelector('.error');
const body = document.body;

export const showAlert = (errorMessage = true) => {
  const errorElement = dataError.cloneNode(true);
  errorElement.querySelector('.data-error__title').textContent = errorMessage;
  body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME
  );
};

const onBodyClick = (evt) => {
  const message = evt.target.closest('[data-backdrop]');

  if (message) {
    closeDialog();
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    closeDialog();
  }
};

function closeDialog() {
  const messageElem = document.querySelector('.success') || document.querySelector('.error');

  if (messageElem) {
    messageElem.remove();
  }

  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
}

const showDialog = (template, trigger = null) => {
  trigger?.();

  const dialog = template.cloneNode(true);
  body.append(dialog);

  body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown, true);
};

export const showSuccessDialog = () => showDialog(successDialog);
export const showErrorDialog = () => showDialog(errorDialog);
