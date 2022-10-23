'use strict';

const inputElements = document.querySelectorAll('.sign-up-card .input');
const labelElements = document.querySelectorAll('.sign-up-card .label');

const positionLabel = function (inputEl) {
  // Checks if an input field has a value
  // If true: positions label on top of input
  // If false: centers label inside of input

  const labelEl = inputEl.previousElementSibling;
  const inputHasValue = inputEl.value !== '';

  if (inputHasValue) {
    labelEl.classList.remove('label--centered');
  } else {
    labelEl.classList.add('label--centered');
  }
};

inputElements.forEach((inputEl) => {
  inputEl.addEventListener('input', () => positionLabel(inputEl));
});

inputElements.forEach((inputEl) => positionLabel(inputEl));

// Enables label transition after a delay to prevent visible shift on page load
labelElements.forEach((labelEl) => {
  setTimeout(() => {
    labelEl.classList.add('label--transition');
  }, 300);
});
