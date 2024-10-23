const OBJ_FORM_DATA = {
  maxHashtag: 5,
  maxLengthComment: 140,
  errCommentMessage: 'Длина комментария не более 140 символов',
  errInvalidHashtagMessage: 'Введён невалидный хэштег',
  errLimitHashtagMessege: 'Превышено количество хэштегов',
  errRepeatedHashtagsMessage : 'Хэштеги повторяются'
};

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileElement = uploadFormElement.querySelector('.img-upload__input');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const resetBtnElement = uploadFormElement.querySelector('.img-upload__cancel');
const textHashtagsElement = uploadFormElement.querySelector('.text__hashtags');
const textCommentElement = uploadFormElement.querySelector('.text__description');

const onResetBtnElementClick = () => closeModalForm();

const onEscapeKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    if (document.activeElement === textHashtagsElement || document.activeElement === textCommentElement) {
      evt.stopPropagation();
    } else {
      uploadFormElement.reset();
      closeModalForm();
    }
  }
};

const showModalForm = () => {
  document.body.classList.add('modal-open');
  uploadOverlayElement.classList.remove('hidden');
  resetBtnElement.addEventListener('click', onResetBtnElementClick);
  document.addEventListener('keydown', onEscapeKeyDown);
};

function closeModalForm () {
  document.body.classList.remove('modal-open');
  uploadOverlayElement.classList.add('hidden');
  resetBtnElement.removeEventListener('click', onResetBtnElementClick);
  document.removeEventListener('keydown', onEscapeKeyDown);
}

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const onSubmitForm = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    textHashtagsElement.value = textHashtagsElement.value.trim().replaceAll(/\s+/g, ' ');
    uploadFormElement.submit();
  }
};

const checkLengthComment = (data) => data.length <= OBJ_FORM_DATA.maxLengthComment;

pristine.addValidator(textCommentElement, checkLengthComment, OBJ_FORM_DATA.errCommentMessage
);

const checkValidHashtags = (data) => {
  const regularHashtagValid = /^#[a-zа-яё0-9]{1,19}$/i;

  if (!data) {
    return true;
  }

  return data.trim().split(' ').every((tag) => regularHashtagValid.test(tag));
};

pristine.addValidator(textHashtagsElement, checkValidHashtags, OBJ_FORM_DATA.errInvalidHashtagMessage
);

const checkCountHashtags = (data) => data.split(' ').length <= OBJ_FORM_DATA.maxHashtag;

pristine.addValidator(textHashtagsElement, checkCountHashtags, OBJ_FORM_DATA.errLimitHashtagMessege
);

const checkUniqHashtags = (data) => (new Set(data.split(' '))).size === data.split(' ').length;

pristine.addValidator(textHashtagsElement, checkUniqHashtags,OBJ_FORM_DATA.errRepeatedHashtagsMessage
);

uploadFormElement.addEventListener('submit', onSubmitForm);

uploadFileElement.addEventListener('change', showModalForm);
