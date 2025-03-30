import { isEscapeKey } from './utils.js';

const ALERT_SHOW_TIME = 5000;
const ERROR_MESSAGE = 'Неизвестная ошибка';

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const successDialog = document.querySelector('#success').content.querySelector('[data-overlay]');
const errorDialog = document.querySelector('#error').content.querySelector('[data-overlay]');

let currentDialog = null;

export const showAlert = (errorMessage = ERROR_MESSAGE) => {
  const errorElement = dataError.cloneNode(true);
  errorElement.querySelector('.data-error__title').textContent = errorMessage;
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

const onDocumentClick = (evt) => {
  const isCloseDialogElement = evt.target.matches('[data-overlay]') || evt.target.closest('button[type="button"]');
  if (isCloseDialogElement) {
    closeDialog();
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.stopPropagation();
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

  document.body.append(currentDialog);

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown, true);
};

export const showSuccessDialogOverlay = () => showDialog(successDialog);
export const showErrorDialogOverlay = () => showDialog(errorDialog);
