const STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const controlSmallerElementbtn = document.querySelector('.scale__control--smaller');
const controlBiggerElementbtn = document.querySelector('.scale__control--bigger');
const controlValueElementInput = document.querySelector('.scale__control--value');
const uploadPreviewElementImg = document.querySelector('.img-upload__preview img');

const tranformScaleElement = (data) => {
  uploadPreviewElementImg.style.transform = `scale(${data / MAX_SCALE})`;
  controlValueElementInput.value = `${data}%`;
};

const onScaleClickUp = () => {
  tranformScaleElement(Math.min(parseInt(controlValueElementInput.value, 10) + STEP, MAX_SCALE));
};

const onScaleClickDown = () => {
  tranformScaleElement(Math.max(parseInt(controlValueElementInput.value, 10) - STEP, MIN_SCALE));
};

controlBiggerElementbtn.addEventListener('click', onScaleClickUp);
controlSmallerElementbtn.addEventListener('click', onScaleClickDown);
