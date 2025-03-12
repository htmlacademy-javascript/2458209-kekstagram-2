const EFFECTS = {
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
const DEFAULT_EFFECT_SETTING = EFFECTS.default;

const uploadEffect = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const uploadPreviewImg = document.querySelector('.img-upload__preview img');
const effectValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

let activeEffectFilter = DEFAULT_EFFECT_SETTING;

const isDefaultEffect = () => activeEffectFilter === DEFAULT_EFFECT_SETTING;

export const initializationSlider = () => {
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
};

const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: activeEffectFilter.min,
      max: activeEffectFilter.max,
    },
    step: activeEffectFilter.step,
    start: activeEffectFilter.max,
  });
};

function onSliderChange(evt) {
  const effect = evt.target.value;
  activeEffectFilter = EFFECTS[effect] ?? EFFECTS.default;
  uploadPreviewImg.className = `effects__preview--${activeEffectFilter.name}`;

  updateSlider();

  if (isDefaultEffect()) {
    uploadEffect.classList.add('hidden');
  } else {
    uploadEffect.classList.remove('hidden');
  }
}

export const resetEffect = () => {
  activeEffectFilter = DEFAULT_EFFECT_SETTING;
  effectsList.removeEventListener('change', onSliderChange);
  slider.noUiSlider.destroy();
};

function onSliderUpdate () {
  const sliderValue = slider.noUiSlider.get();
  uploadPreviewImg.style.filter = isDefaultEffect() ? DEFAULT_EFFECT_SETTING.style : `${activeEffectFilter.style}(${sliderValue}${activeEffectFilter.unit})`;
  effectValue.value = sliderValue ;
}
