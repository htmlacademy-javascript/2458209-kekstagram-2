import { isEscapeKey } from './utils.js';
import { uploadOverlay } from './form.js';

const ALERT_SHOW_TIME = 5000;
const ERROR_MESSAGE = 'Неизвестная ошибка';

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const successDialog = document.querySelector('#success').content.querySelector('[data-overlay]');
const errorDialog = document.querySelector('#error').content.querySelector('[data-overlay]');
const body = document.body;

let currentDialog;

export const showAlert = (errorMessage = ERROR_MESSAGE) => {
  const errorElement = dataError.cloneNode(true);
  errorElement.querySelector('.data-error__title').textContent = errorMessage;
  body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

const onDocumentClick = (evt) => {
  const dialog = evt.target.matches('[data-overlay]') || evt.target.closest('button[type="button"]');

  if (dialog) {
    closeDialog();
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    uploadOverlay.classList.remove('hidden');
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
  document.addEventListener('keydown', onDocumentKeydown);
};

export const showSuccessDialog = () => showDialog(successDialog);
export const showErrorDialog = () => showDialog(errorDialog);
