const EFFECTS_LIST = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },
];

const uploadEffect = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const uploadPreviewImg = document.querySelector('.img-upload__preview img');
const effectValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

const defaultEffectElement = EFFECTS_LIST[0];
let activeEffectElement = defaultEffectElement;

export const restartSliderEffect = () => {
  noUiSlider.create(slider, {
    range: {
      min: defaultEffectElement.min,
      max: defaultEffectElement.max,
    },
    start: defaultEffectElement.max,
    step: defaultEffectElement.step,
  });

  effectsList.addEventListener('change', onEffectsSliderChange);
  slider.noUiSlider.on('update',onSliderUpdate);
  uploadEffect.classList.add('hidden');
};

const updateSlider = (data) => {
  data.noUiSlider.updateOptions({
    range: {
      min: activeEffectElement.min,
      max: activeEffectElement.max,
    },
    step: activeEffectElement.step,
    start: activeEffectElement.max,
  });

  return activeEffectElement === defaultEffectElement ? uploadEffect.classList.add('hidden') : uploadEffect.classList.remove('hidden');
};

function onEffectsSliderChange (evt) {
  activeEffectElement = EFFECTS_LIST.find((effect) => effect.name === evt.target.value);
  uploadPreviewImg.className = `effects__preview--${activeEffectElement.name}`;
  updateSlider(slider);
}

export const resetSliderEffect = () => {
  activeEffectElement = defaultEffectElement;
  effectsList.removeEventListener('change', onEffectsSliderChange);
  slider.noUiSlider.destroy();
};

function onSliderUpdate () {
  const sliderValue = slider.noUiSlider.get();
  uploadPreviewImg.style.filter = activeEffectElement === defaultEffectElement ? defaultEffectElement.style : `${activeEffectElement.style}(${sliderValue}${activeEffectElement.unit})`;
  effectValue.value = sliderValue;
}
