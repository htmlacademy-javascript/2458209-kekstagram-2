import {gallery} from './create-gallery';
export const pictureSection = document.querySelector('.pictures');

const templateFragmentPhotos = document.querySelector('#picture').content.querySelector('.picture');

const createPictureEl = (photo) => {
  const photoSample = templateFragmentPhotos.cloneNode(true);
  photoSample.dataset.pictureId = photo.id;
  const image = photoSample.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;
  photoSample.querySelector('.picture__likes').textContent = photo.likes;
  photoSample.querySelector('.picture__comments').textContent = photo.comment.length;

  return photoSample;
};

export const renderGallery = () => {
  const fragment = document.createDocumentFragment();

  gallery.forEach((photo) => {
    const photoSample = createPictureEl(photo);
    fragment.append(photoSample);
  });

  pictureSection.append(fragment);
};
renderGallery();
