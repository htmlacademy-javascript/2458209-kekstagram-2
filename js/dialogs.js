import { isEscapeKey } from './utils.js';

const ALERT_SHOW_TIME = 5000;

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const successDialog = document.querySelector('#success').content.querySelector('[data-message]');
const errorDialog = document.querySelector('#error').content.querySelector('[data-message]');
const body = document.body;

let currentDialog;

export const showAlert = (errorMessage = '') => {
  const errorElement = dataError.cloneNode(true);
  errorElement.querySelector('.data-error__title').textContent = errorMessage;
  body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

const onBodyClick = (evt) => {
  const message = evt.target.closest('[data-message]') || evt.target.closest('button[type="button"]');

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
  if (!currentDialog) {
    return;
  }

  document.removeEventListener('keydown', onDocumentKeydown, true);
  document.removeEventListener('click', onBodyClick);
  currentDialog.remove();
  currentDialog = null;
}

const showDialog = (template) => {
  currentDialog = template.cloneNode(true);

  body.append(currentDialog);

  document.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown, true);
};

export const showSuccessDialog = () => showDialog(successDialog);
export const showErrorDialog = () => showDialog(errorDialog);
