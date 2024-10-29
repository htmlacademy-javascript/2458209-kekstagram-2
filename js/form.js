import {isEscapeKey} from './utils';

const isRegularHashtagValid = /^#[a-zа-яё0-9]{1,19}$/i;
const isMaxHashtag = 5;
const isMaxLengthComment = 140;
const isErrCommentMessage = 'Длина комментария не более 140 символов';
const isErrHashtagMessage = 'Хэштег введен не правильно';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const resetBtn = uploadForm.querySelector('.img-upload__cancel');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const textComment = uploadForm.querySelector('.text__description');

const onResetBtnCloseClick = () => closeModalForm();

const isActiveElement = () => document.activeElement === textHashtags || document.activeElement === textComment;

const onFormEscapeDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (isActiveElement()) {
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
  document.addEventListener('keydown', onFormEscapeDown);
};

const onResetBtnOpenChange = () => showModalForm();

function closeModalForm () {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  resetBtn.removeEventListener('click', onResetBtnCloseClick);
  document.removeEventListener('keydown', onFormEscapeDown);
}

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const onSubmitForm = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    // uploadForm.submit();
  }
};

const isCommentLengthValid = (data) => data.length <= isMaxLengthComment;

pristine.addValidator(textComment, isCommentLengthValid, isErrCommentMessage);

const hashtagValue = textHashtags.value = textHashtags.value.trim().replaceAll(/\s+/g, ' ');

const isHashtagsValid = (data) => !data ? !hashtagValue : data.trim().split(' ').every((tag) => isRegularHashtagValid.test(tag));

const isHashtagsCountValid = (data) => data.split(' ').length <= isMaxHashtag;

const isHashtagsUnique = (data) => (new Set(data.split(' '))).size === data.split(' ').length;

const isHashtagsValidatorsValid = () => {
  const pureTags = textHashtags.value = textHashtags.value.replaceAll(/\s+/g, ' ').toLowerCase();

  return isHashtagsValid(pureTags) && isHashtagsCountValid(pureTags) && isHashtagsUnique(pureTags);
};

pristine.addValidator(textHashtags, isHashtagsValidatorsValid, isErrHashtagMessage);

uploadForm.addEventListener('submit', onSubmitForm);
uploadFile.addEventListener('change', onResetBtnOpenChange);
