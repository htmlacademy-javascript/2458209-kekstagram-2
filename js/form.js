import {isEscapeKey} from './utils';

const regularHashtagValid = /^#[a-zа-яё0-9]{1,19}$/i;
const maxHashtag = 5;
const maxLengthComment = 140;
const errCommentMessage = 'Длина комментария не более 140 символов';
const errHashtagMessage = 'Хэштег введен не правильно';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const resetBtn = uploadForm.querySelector('.img-upload__cancel');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const textComment = uploadForm.querySelector('.text__description');

const onResetBtnCloseClick = () => closeModalForm();

const isactiveElement = (tag, comment) => document.activeElement === tag || document.activeElement === comment;

const onKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (isactiveElement(textHashtags, textComment)) {
      evt.preventDefault();
    } else {
      uploadForm.reset();
      closeModalForm();
    }
  }
};

const showModalForm = () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  resetBtn.addEventListener('click', onResetBtnCloseClick);
  document.addEventListener('keydown', onKeyDown);
};

const onResetBtnOpenChange = () => showModalForm();

function closeModalForm () {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  resetBtn.removeEventListener('click', onResetBtnCloseClick);
  document.removeEventListener('keydown', onKeyDown);
}

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const onSubmitForm = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    uploadForm.submit();
  }
};

const isCommentLengthValid = (data) => data.length <= maxLengthComment;

pristine.addValidator(textComment, isCommentLengthValid, errCommentMessage);

const hashtagValue = textHashtags.value = textHashtags.value.trim().replaceAll(/\s+/g, ' ');

const isValidHashtags = (data) => !data ? !hashtagValue : data.trim().split(' ').every((tag) => regularHashtagValid.test(tag));

const isCountHashtags = (data) => data.split(' ').length <= maxHashtag;

const isUniqHashtags = (data) => (new Set(data.split(' '))).size === data.split(' ').length;

const isAllValidatorhashtags = (data) => isValidHashtags(data) && isCountHashtags(data) && isUniqHashtags(data);

pristine.addValidator(textHashtags, isAllValidatorhashtags, errHashtagMessage);

uploadForm.addEventListener('submit', onSubmitForm);
uploadFile.addEventListener('change', onResetBtnOpenChange);
