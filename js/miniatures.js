import {createPhoto} from './gallery.js';
import {getRandomInteger} from './utils.js';

const MIN_QUANTITY_PHOTOS = 1;
const MAX_QUANTITY_PHOTOS = 25;
const MAX_VISABLE = 12; //не уверен, что эти переменные нужны, но не понял как сделать лучше.//

const section = document.querySelector('.pictures');
const templateFregment = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

function createPhotos() {

  for (let i = 0; i < MAX_VISABLE; i++) {
    const photoSample = templateFregment.cloneNode(true);

    const image = photoSample.querySelector('.picture__img');
    image.src = `photos/${getRandomInteger(MIN_QUANTITY_PHOTOS, MAX_QUANTITY_PHOTOS)}.jpg`; //подскажи пожалуйста! Как тут лучше сделать не пойму?//
    image.alt = createPhoto().description;

    const likes = photoSample.querySelector('.picture__likes');
    likes.textContent = createPhoto().likes;

    const comments = photoSample.querySelector('.picture__comments');
    comments.textContent = createPhoto().comment.length;

    fragment.append(photoSample);
    section.append(fragment);
  }
}

createPhotos();
