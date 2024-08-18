//25 сгенерированных объектов. Каждый объект массива — описание фотографии, опубликованной пользователем.
const SIMILAR_PHOTO_USER_COUNT = 25;

// id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
const idPublishedPhoto = [];

const getRandomId = (min, max) => {
  const number = Math.floor(min + Math.random() * (max - min));

  if (idPublishedPhoto.includes(number)) {
    return getRandomId(min, max);
  } else {
    idPublishedPhoto.push(number);
    return number;
  }
};
// url, строка — адрес картинки. Адреса картинок не должны повторяться.
const urlPublishedPhoto = [];

const getRandomUrl = (min, max) => {
  const number = Math.floor(min + Math.random() * (max - min));

  if (urlPublishedPhoto.includes(number)) {
    return getRandomUrl(min, max);
  } else {
    urlPublishedPhoto.push(number);
    return number;
  }
};
// description, строка — описание фотографии. Описание придумайте самостоятельно.
const PHOTO_DESCRIPTION = [
  'фото замка',
  'фото лужайки перед замком',
  'фото заката на фоне замка',
  'фото восхода на фоне замка',
  'фото леса на фоне замка',
  'фото герба',
  'фото бассеина',
  'семейное фото',
  'схема замка',
  'схема потайных входов/выходов из/с замка',
  'фото прислуги',
  'фото кухонной утвари',
  'фото детской спальни замка',
  'фото спальни для взрослых замка',
  'фото комнаты со скульптурами',
  'фото комнаты с чучелами животных',
  'фото автопарка',
  'фото спальни для прислуги замка',
  'фото конюшни замка',
  'фото пародистых лошадей',
  'фото статуй перед замком',
  'фото статуй внутри замка',
  'фото статуи хозяина замка',
  'картина хозяина замка',
  'картина хозяина замка с семьей',
];
// Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
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
];
// Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:
const MESSAGE_USERS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
// likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
// comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30. Все комментарии генерируются случайным образом.

// У каждого комментария есть идентификатор — id — любое число. Идентификаторы не должны повторяться.

// Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createDescriptionPhotoUser = () => ({
  id: getRandomId(1, 26),
  pictureAddress: `photos/${getRandomUrl(1, 26)}.jpg`,
  photoDescription: getRandomArrayElement(PHOTO_DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: {
    idComments: getRandomId(0, 999),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGE_USERS),
    name: getRandomArrayElement(NAME_USERS),
  },
});

const similarPhotoUser = Array.from({length: SIMILAR_PHOTO_USER_COUNT}, createDescriptionPhotoUser);
console.log(similarPhotoUser);








