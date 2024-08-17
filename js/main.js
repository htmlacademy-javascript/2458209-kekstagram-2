// В файле main.js напишите необходимые функции для создания массива из 25 сгенерированных объектов. Каждый объект массива — описание фотографии, опубликованной пользователем.
const SIMILAR_PHOTO_USER_COUNT = 25;
// Структура каждого объекта должна быть следующей:

// id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
const ID_PUBLISHED_PHOTO = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

// url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.

const PICTURE_ADDRESS_URL = [
  'photos/1.jpg',
  'photos/2.jpg',
  'photos/3.jpg',
  'photos/4.jpg',
  'photos/5.jpg',
  'photos/6.jpg',
  'photos/7.jpg',
  'photos/8.jpg',
  'photos/9.jpg',
  'photos/10.jpg',
  'photos/11.jpg',
  'photos/12.jpg',
  'photos/13.jpg',
  'photos/14.jpg',
  'photos/15.jpg',
  'photos/16.jpg',
  'photos/17.jpg',
  'photos/18.jpg',
  'photos/19.jpg',
  'photos/20.jpg',
  'photos/21.jpg',
  'photos/22.jpg',
  'photos/23.jpg',
  'photos/24.jpg',
  'photos/25.jpg',
];

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

// Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:


// Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createDescriptionPhotoUser = () => ({
  id: getRandomArrayElement(ID_PUBLISHED_PHOTO),
  pictureAddress: getRandomArrayElement(PICTURE_ADDRESS_URL),
  photoDescription: getRandomArrayElement(PHOTO_DESCRIPTION),
});

const similarPhotoUser = Array.from({length: SIMILAR_PHOTO_USER_COUNT}, createDescriptionPhotoUser);
console.log(similarPhotoUser);
