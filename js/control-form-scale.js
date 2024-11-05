const STEP = 0.25;

const controlSmallerElementbtn = document.querySelector('.scale__control--smaller');
const controlBiggerElementbtn = document.querySelector('.scale__control--bigger');
const controlValueElementInput = document.querySelector('.scale__control--value');
const uploadPreviewElementImg = document.querySelector('.img-upload__preview img');

let scale = 1;

const showScaleSmaller = () => {
  if (scale > STEP && scale <= 1) {
    uploadPreviewElementImg.style.transform = `scale(${scale -= STEP})`;
    controlValueElementInput.value = `${scale * 100}%`;
  }
};

const showScaleBigger = () => {
  if (scale >= STEP && scale < 1) {
    uploadPreviewElementImg.style.transform = `scale(${scale += STEP})`;
    controlValueElementInput.value = `${scale * 100}%`;
  }
};

const onScaleSmallerClick = () => showScaleSmaller();

const onScaleBiggerClick = () => showScaleBigger();

controlSmallerElementbtn.addEventListener('click', onScaleSmallerClick);

controlBiggerElementbtn.addEventListener('click', onScaleBiggerClick);
