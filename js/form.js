import './form-scale.js';
import { resetEffect } from './form-effects.js';
import { isEscapeKey} from './utils.js';
import { sendData } from './api.js';
import { showSuccessDialogOverlay, showErrorDialogOverlay, showAlert } from './dialogs.js';

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
const FILE_POSITION = 0;

let pristine = null;

const uploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const submitButton = uploadOverlay.querySelector('.img-upload__submit');
const resetBtn = uploadForm.querySelector('.img-upload__cancel');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const textComment = uploadForm.querySelector('.text__description');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');
const effectsPreview = uploadForm.querySelectorAll('.effects__preview');

const setFormPictures = (image = '') => {
  imgUploadPreview.src = image;
  effectsPreview.forEach((item) => {
    item.style.backgroundImage = `url(${image})`;
  });
};

const uploadUserPhoto = () => {
  const file = uploadFileInput.files[FILE_POSITION];
  const fileName = file.name.toLowerCase();
  const fileExt = fileName.split('.').pop();
  const matches = FILE_TYPES.includes(fileExt);
  const newUrl = URL.createObjectURL(file);

  if (matches) {
    setFormPictures(newUrl);
  } else {
    showAlert(WRONG_FILE_TYPE_MESSAGE);
    closeModalForm();
  }
};

const onCancelClick = () => closeModalForm();

const isActiveFormElement = () => document.activeElement === textHashtags || document.activeElement === textComment;

const onFormKeyDown = (evt) => {
  if (isEscapeKey(evt.key) && !isActiveFormElement()) {
    evt.preventDefault();
    closeModalForm();
  }
};

const isCommentLengthValid = (data) => data.length <= MAX_LENGTH_COMMENT;

const isHashtagsValid = (data) => !data ? true : data.every((tag) => REGULAR_HASHTAG_VALID.test(tag));

const isHashtagsMaxSymbols = (data) => data.length < MAX_SYMBOLS;

const isHashtagsCountValid = (data) => data.length <= MAX_HASHTAG;

const isHashtagsUnique = (data) => new Set(data).size === data.length;

const isHashtagsValidatorsValid = () => {
  const pureTags = textHashtags.value.toLowerCase().trim().split(' ').filter(Boolean);

  return isHashtagsValid(pureTags) && isHashtagsCountValid(pureTags) && isHashtagsUnique(pureTags) && isHashtagsMaxSymbols(pureTags);
};

pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
}, false);

pristine.addValidator(textComment, isCommentLengthValid, ERR_COMMENT_MESSAGE);
pristine.addValidator(textHashtags, isHashtagsValidatorsValid, ERR_HASHTAG_MESSAGE);


function closeModalForm () {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  uploadFileInput.value = '';
  resetBtn.removeEventListener('click', onCancelClick);
  document.removeEventListener('keydown', onFormKeyDown);

  resetEffect();
  uploadForm.reset();
  pristine.reset();
}

const showModalForm = () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  resetBtn.addEventListener('click', onCancelClick);
  document.addEventListener('keydown', onFormKeyDown);

  uploadUserPhoto();
};

const onImgUploadInputChange = () => showModalForm();

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
        showSuccessDialogOverlay();
      })
      .catch(() => {
        showErrorDialogOverlay();
      })
      .finally(() => {
        toggleSubmitButton(false);
      });
  }
};

uploadForm.addEventListener('submit', onSubmitForm);
uploadFileInput.addEventListener('change', onImgUploadInputChange);
