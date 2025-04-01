const STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const RADIX = 10;

const uploadPreviewContainer = document.querySelector('.img-upload__preview-container');
const scaleControlSmaller = uploadPreviewContainer.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadPreviewContainer.querySelector('.scale__control--bigger');
const scaleControlValue = uploadPreviewContainer.querySelector('.scale__control--value');
const uploadPreviewImg = uploadPreviewContainer.querySelector('.img-upload__preview img');

const getControlValue = () => parseInt(scaleControlValue.value, RADIX);

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
