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
    step: 0.10,
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

const uploadWrapperImg = document.querySelector('.img-upload__wrapper');
const uploadPreviewImg = uploadWrapperImg.querySelector('.img-upload__preview img');
const effectsList = uploadWrapperImg.querySelector('.effects__list');
const uploadEffect = uploadWrapperImg.querySelector('.img-upload__effect-level');
const effectValue = uploadEffect.querySelector('.effect-level__value');
const slider = uploadEffect.querySelector('.effect-level__slider');

let activeEffectFilter = DEFAULT_EFFECT_SETTING;

const isDefaultEffect = () => activeEffectFilter === DEFAULT_EFFECT_SETTING;

noUiSlider.create(slider, {
  range: {
    min: DEFAULT_EFFECT_SETTING.min,
    max: DEFAULT_EFFECT_SETTING.max,
  },
  start: DEFAULT_EFFECT_SETTING.max,
  step: DEFAULT_EFFECT_SETTING.step,
  format: {
    to: (value) => Number(value),
    from: (value) => parseFloat(value)
  },
});

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

export const resetEffect = () => {
  activeEffectFilter = DEFAULT_EFFECT_SETTING;
  uploadPreviewImg.className = '';
  uploadPreviewImg.style.filter = '';
  effectValue.value = '';
  uploadEffect.classList.add('hidden');
};

const onEffectChange = (evt) => {
  resetEffect();

  const effect = evt.target.value;
  activeEffectFilter = EFFECTS[effect] ?? EFFECTS.default;
  uploadPreviewImg.className = `effects__preview--${activeEffectFilter.name}`;

  updateSlider();

  if (isDefaultEffect()) {
    uploadEffect.classList.add('hidden');
  } else {
    uploadEffect.classList.remove('hidden');
  }
};

const onSliderUpdate = () => {
  const sliderValue = slider.noUiSlider.get();
  uploadPreviewImg.style.filter = `${activeEffectFilter.style}(${sliderValue}${activeEffectFilter.unit})`;
  effectValue.value = sliderValue;
};

effectsList.addEventListener('change', onEffectChange);
slider.noUiSlider.on('update',onSliderUpdate);
