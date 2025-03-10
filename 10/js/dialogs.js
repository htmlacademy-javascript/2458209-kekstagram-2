import { isEscapeKey } from './utils.js';

const ALERT_SHOW_TIME = 5000;

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const successDialog = document.querySelector('#success').content.querySelector('[data-overlay]');
const errorDialog = document.querySelector('#error').content.querySelector('[data-overlay]');
const body = document.body;

let currentDialog;

export const showAlert = (errorMessage = 'Данные не загружены') => {
  const errorElement = dataError.cloneNode(true);

  if (errorMessage) {
    errorElement.querySelector('.data-error__title').textContent = errorMessage;
  }

  body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

const onDocumentClick = (evt) => {
  const dialog = evt.target.closest('[data-overlay]') || evt.target.closest('button[type="button"]');

  if (dialog) {
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
  document.removeEventListener('click', onDocumentClick);
  currentDialog.remove();
  currentDialog = null;
}

const showDialog = (template) => {
  currentDialog = template.cloneNode(true);

  body.append(currentDialog);

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown, true);
};

export const showSuccessDialog = () => showDialog(successDialog);
export const showErrorDialog = () => showDialog(errorDialog);
