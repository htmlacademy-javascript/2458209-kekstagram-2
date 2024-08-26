const MAX_PHOTOS = 25;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_NUMBER_PHOTO = 1;
const MAX_NUMBER_PHOTO = 25;
const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;
const MIN_NUMBER_AVATARS = 1;
const MAX_NUMBER_AVATARS = 6;
const MIN_ID_COMMENTS = 1;
const MAX_ID_COMMENTS = 999;

const PHOTOS_DESCRIPTION = [
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

const MESSAGE_USERS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const createGallery = (length) => {

  const getRandomInteger = (min, max) => {
    const lower = Math.ceil(Math.min(min, max));
    const upper = Math.floor(Math.max(min, max));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
  };

  function createRandom (min, max) {
    const previousValues = [];

    return function () {

      let currentValue = getRandomInteger(min, max);
      if (previousValues.length >= (max - min + 1)) {
        return null;
      }

      while (previousValues.includes(currentValue)) {
        currentValue = getRandomInteger(min, max);
      }
      previousValues.push(currentValue);

      return currentValue;
    };
  }
  const generateIdPhotos = createRandom(MIN_NUMBER_PHOTO, MAX_NUMBER_PHOTO);
  const generatePictureAddress = createRandom(MIN_NUMBER_PHOTO, MAX_NUMBER_PHOTO);
  const generateLikes = createRandom(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES);
  const generatIdComments = createRandom(MIN_ID_COMMENTS, MAX_ID_COMMENTS);
  const generatComments = createRandom(MIN_COMMENTS, MAX_COMMENTS);

  const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

  const createComment = () => ({
    idComments: generatIdComments(),
    avatar: `img/avatar-${getRandomInteger(MIN_NUMBER_AVATARS, MAX_NUMBER_AVATARS)}.svg`,
    message: getRandomArrayElement(MESSAGE_USERS),
    name: getRandomArrayElement(NAME_USERS),
  });

  const createPhoto = () => ({
    id: generateIdPhotos(),
    pictureAddress: `photos/${generatePictureAddress()}.jpg`,
    photoDescription: getRandomArrayElement(PHOTOS_DESCRIPTION),
    likes: generateLikes(),
    comments: Array.from({length: generatComments()}, createComment),
  });

  length = Array.from({length: MAX_PHOTOS}, createPhoto);

  return length;
};

createGallery();
