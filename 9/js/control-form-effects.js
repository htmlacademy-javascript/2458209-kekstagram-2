const EFFECTS_LIST = {
  default: {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  chrome: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const uploadEffect = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const uploadPreviewImg = document.querySelector('.img-upload__preview img');
const effectValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

const DEFAULT_EFFECT_SETTING = EFFECTS_LIST.default;

let activeEffectElement = DEFAULT_EFFECT_SETTING;

const isEqualityEffect = () => activeEffectElement === DEFAULT_EFFECT_SETTING;

export const initializationSliderEffect = () => {
  noUiSlider.create(slider, {
    range: {
      min: DEFAULT_EFFECT_SETTING.min,
      max: DEFAULT_EFFECT_SETTING.max,
    },
    start: DEFAULT_EFFECT_SETTING.max,
    step: DEFAULT_EFFECT_SETTING.step,
  });

  effectsList.addEventListener('change', onSliderChange);
  slider.noUiSlider.on('update',onSliderUpdate);
  uploadEffect.classList.add('hidden');
};

const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: activeEffectElement.min,
      max: activeEffectElement.max,
    },
    step: activeEffectElement.step,
    start: activeEffectElement.max,
  });
};

function onSliderChange (evt) {
  activeEffectElement = Object.values(EFFECTS_LIST).find((effect) => effect.name === evt.target.value);
  uploadPreviewImg.className = `effects__preview--${activeEffectElement.name}`;

  updateSlider();

  return isEqualityEffect() ? uploadEffect.classList.add('hidden') : uploadEffect.classList.remove('hidden');
}

export const resetSliderEffect = () => {
  activeEffectElement = DEFAULT_EFFECT_SETTING;
  effectsList.removeEventListener('change', onSliderChange);
  slider.noUiSlider.destroy();
};

function onSliderUpdate () {
  const sliderValue = slider.noUiSlider.get();
  uploadPreviewImg.style.filter = isEqualityEffect() ? DEFAULT_EFFECT_SETTING.style : `${activeEffectElement.style}(${sliderValue}${activeEffectElement.unit})`;
  effectValue.value = sliderValue;
}
