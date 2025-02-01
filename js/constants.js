export const EFFECTS = {
  default: {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  chrome: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};
export const DEFAULT_EFFECT_SETTING = EFFECTS.default;
export const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
export const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};
export const METHODS = {
  GET: 'GET',
  POST: 'POST'
};
export const TEXT_ERROR = {
  GET_DATA: 'Не удаётся загрузить данные.',
  SEND_DATA: 'Не удаётся отправить форму'
};
export const SUBMIT_BUTTON_TEXT = {
  IDLE:'Опубликовать',
  SENDING: 'Публикую...'
};
export const MAX_COMMENTS = 30;
export const ALERT_SHOW_TIME = 5000;
export const STEP = 25;
export const MIN_SCALE = 25;
export const MAX_SCALE = 100;
export const REGULAR_HASHTAG_VALID = /^#[a-zа-яё0-9]{1,19}$/i;
export const MAX_HASHTAG = 5;
export const MAX_LENGTH_COMMENT = 140;
export const ERR_COMMENT_MESSAGE = 'Длина комментария не более 140 символов';
export const ERR_HASHTAG_MESSAGE = 'Хэштег введен не правильно';
