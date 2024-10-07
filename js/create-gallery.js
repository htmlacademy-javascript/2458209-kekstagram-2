import {getRandomInteger, getRandomArrayElement} from './utils.js';

const MAX_PHOTOS = 25;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;
const MIN_AVATARS_ID = 1;
const MAX_AVATARS_ID = 6;

const PHOTO_DESCRIPTIONS = [
  'фото гостиницы со стороны пляжа',
  'фото вывески',
  'фото плажа',
  'фото девушки',
  'оригинальное фото обеда',
  'фото спорткара',
  'фото клубники',
  'фото напитков',
  'фото девушки на фоне самолета',
  'фото подставки для обуви',
  'вход на пляж',
  'фото машины',
  'фото еды',
  'фото котика',
  'фото обуви',
  'фото гор из стратосферы',
  'фото оркестра',
  'фото классической машины',
  'фото оригинальной обуви с подстветкой',
  'фото отеля',
  'фото завтрака',
  'фото заката',
  'фото фауны',
  'фото ночного клуба',
  'фото путешествие на машине',
];

const NAME_USERS = [
  'Артём',
  'Александр',
  'Фиофан',
  'Надежда',
  'Кристюша',
  'Аня',
  'Слава',
  'Кирилл',
  'Лиза',
  'Лена',
  'Оксана',
  'Лика',
  'Карл',
  'Иван',
  'Ксюша',
  'Джон',
];

const MESSAGE_USERS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(MIN_AVATARS_ID, MAX_AVATARS_ID)}.svg`,
  message: getRandomArrayElement(MESSAGE_USERS),
  name: getRandomArrayElement(NAME_USERS),
});

export const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
  likes: getRandomInteger(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
  comment: Array.from({length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)}, (__, index) => createComment(index + 1)),
});

const createGallery = (length) => Array.from({length: length}, (_, index) => createPhoto(index + 1));
export const gallery = createGallery(MAX_PHOTOS);
