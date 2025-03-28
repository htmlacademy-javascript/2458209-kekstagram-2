import './form-scale.js';
import { initializationSlider, resetEffect } from './form-effects.js';
import { isEscapeKey} from './utils.js';
import { sendData } from './api.js';
import { showSuccessDialog, showErrorDialog, showAlert } from './dialogs.js';

const REGULAR_HASHTAG_VALID = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG = 5;
const MAX_SYMBOLS = 20;
const MAX_LENGTH_COMMENT = 140;
const ERR_COMMENT_MESSAGE = 'Длина комментария не более 140 символов';
const ERR_HASHTAG_MESSAGE = 'Хэштег введен не правильно';
const SUBMIT_BUTTON_TEXT = {
  IDLE:'Опубликовать',
  SENDING: 'Публикую...'
};
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];
const WRONG_FILE_TYPE_MESSAGE = 'Недопустимый формат файла';
const FILE_NUMBERS = 0;

let pristine = '';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('.img-upload__input');
export const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const resetBtn = uploadForm.querySelector('.img-upload__cancel');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const textComment = uploadForm.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');
const effectsPreview = uploadForm.querySelectorAll('.effects__preview');

const showPreview = (file) => {
  const newUrl = URL.createObjectURL(file);

  imgUploadPreview.src = newUrl;

  effectsPreview.forEach((item) => {
    item.style.backgroundImage = `url(${newUrl})`;
  });
};

const resetPreview = () => {
  imgUploadPreview.src = '';

  effectsPreview.forEach((item) => {
    item.style.backgroundImage = '';
  });
};

const uploadUserPhoto = () => {
  const file = uploadFile.files[FILE_NUMBERS];
  const fileName = file.name.toLowerCase();
  const fileExt = fileName.split('.').pop();
  const matches = FILE_TYPES.includes(fileExt);

  if (matches) {
    showPreview(file);
  } else {
    showAlert(WRONG_FILE_TYPE_MESSAGE);
    closeModalForm();
  }
};

const onResetBtnCloseClick = () => closeModalForm();

const isActiveElement = () => document.activeElement === textHashtags || document.activeElement === textComment;

const onFormKeyDown = (evt) => {
  if (isEscapeKey(evt.key) && !isActiveElement()) {
    evt.preventDefault();
    closeModalForm();
  }
};

const isCommentLengthValid = (data) => data.length <= MAX_LENGTH_COMMENT;

const isHashtagsValid = (data) => !data ? true : data.every((tag) => REGULAR_HASHTAG_VALID.test(tag));

const isHashtagsMaxSimbols = (data) => data.length < MAX_SYMBOLS;

const isHashtagsCountValid = (data) => data.length <= MAX_HASHTAG;

const isHashtagsUnique = (data) => new Set(data).size === data.length;

const isHashtagsValidatorsValid = () => {
  const pureTags = textHashtags.value.toLowerCase().trim().split(' ').filter(Boolean);

  return isHashtagsValid(pureTags) && isHashtagsCountValid(pureTags) && isHashtagsUnique(pureTags) && isHashtagsMaxSimbols(pureTags);
};

const addValidators = () => {

  pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error'
  }, false);

  pristine.addValidator(textComment, isCommentLengthValid, ERR_COMMENT_MESSAGE);
  pristine.addValidator(textHashtags, isHashtagsValidatorsValid, ERR_HASHTAG_MESSAGE);
};

function closeModalForm () {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  uploadFile.value = '';
  resetBtn.removeEventListener('click', onResetBtnCloseClick);
  document.removeEventListener('keydown', onFormKeyDown);

  resetPreview();
  resetEffect();
  uploadForm.reset();
  pristine.reset();
}

const showModalForm = () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  resetBtn.addEventListener('click', onResetBtnCloseClick);
  document.addEventListener('keydown', onFormKeyDown);

  initializationSlider();
  addValidators();
  uploadUserPhoto();
};

const onResetBtnOpenChange = () => showModalForm();

const toggleSubmitButton = (disabled) => {
  submitButton.disabled = disabled;

  submitButton.textContent = disabled ? SUBMIT_BUTTON_TEXT.SENDING : SUBMIT_BUTTON_TEXT.IDLE;
};

const onSubmitForm = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    const formData = new FormData(evt.target);

    toggleSubmitButton(true);
    sendData(formData)
      .then(() => {
        closeModalForm();
        showSuccessDialog();
      })
      .catch(() => {
        showErrorDialog();
      })
      .finally(() => {
        toggleSubmitButton(false);
      });
  }
};

uploadForm.addEventListener('submit', onSubmitForm);
uploadFile.addEventListener('change', onResetBtnOpenChange);
