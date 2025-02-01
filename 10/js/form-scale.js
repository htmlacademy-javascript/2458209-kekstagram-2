import { STEP, MIN_SCALE, MAX_SCALE } from './constants.js';

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPreviewImg = document.querySelector('.img-upload__preview img');

const getControlValue = () => parseInt(scaleControlValue.value, 10);

const scaleImage = (data) => {
  uploadPreviewImg.style.transform = `scale(${data / MAX_SCALE})`;
  scaleControlValue.value = `${data}%`;
};

const onScaleUpClick = () => {
  const MAX_CONTROL_SCALE = Math.min(getControlValue() + STEP, MAX_SCALE);
  scaleImage(MAX_CONTROL_SCALE);
};

const onScaleDownClick = () => {
  const MIN_CONTROL_SCALE = Math.max(getControlValue() - STEP, MIN_SCALE);
  scaleImage(MIN_CONTROL_SCALE);
};

scaleControlBigger.addEventListener('click', onScaleUpClick);
scaleControlSmaller.addEventListener('click', onScaleDownClick);
