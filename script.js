'use strict';

const inputElements = document.querySelectorAll('.sign-up-card .input');
const labelElements = document.querySelectorAll('.sign-up-card .label');
const formElement = document.querySelector('#form-sign-up');

// --- form validation  ---

const showErrorMessage = function (errorEl, errorMsg) {
  const errorIsEmpty = errorEl.textContent === '';
  const currentError = errorEl.textContent;

  if (!errorIsEmpty && currentError !== errorMsg) {
    // If there is already an error message and a different one must be shown,
    // prevent showing input's border by making just the text transparent
    // (keeping white background visible) and changing it on transition end
    errorEl.classList.add('error-message--transparent-text');
    errorEl.addEventListener(
      'transitionend',
      () => {
        errorEl.textContent = errorMsg;
        errorEl.classList.remove('error-message--transparent-text');
      },
      { once: true }
    );
  } else {
    errorEl.textContent = errorMsg;
    errorEl.classList.add('error-message--visible');
  }
};

const removeErrorMessage = function (errorEl) {
  const errorIsEmpty = errorEl.textContent === '';
  if (errorIsEmpty) return;

  errorEl.classList.remove('error-message--visible');

  // Prevent showing input's border too soon by only removing text content
  // after opacity transition
  errorEl.addEventListener('transitionend', () => (errorEl.textContent = ''), {
    once: true,
  });
};

const handleForm = function (event) {
  event.preventDefault();

  const inputElements = event.target.querySelectorAll('input');

  let firstInvalidElement; // The first invalid element will receive focus

  for (const inputEl of inputElements) {
    const inputLabel = inputEl.previousElementSibling.textContent;
    const errorEl = inputEl.nextElementSibling;
    const inputType = inputEl.getAttribute('type');

    const inputIsValid = inputEl.checkValidity();
    const validityObj = inputEl.validity;

    let errorMsg;

    if (validityObj.valueMissing) {
      errorMsg = `${inputLabel} cannot be empty`;
    } else if (inputType === 'email' && validityObj.typeMismatch) {
      errorMsg = `Looks like this is not an email`;
    }

    if (errorMsg) {
      inputEl.setAttribute('aria-invalid', '');
      showErrorMessage(errorEl, errorMsg);
    } else {
      inputEl.removeAttribute('aria-invalid');
      removeErrorMessage(errorEl);
    }

    if (!inputIsValid && !firstInvalidElement) {
      firstInvalidElement = inputEl;
    }
  }

  if (firstInvalidElement) firstInvalidElement.focus();
};

// --- input label positioning ---

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

// --- page setup ---

formElement.addEventListener('submit', handleForm);
formElement.setAttribute('novalidate', '');
inputElements.forEach((inputEl) => positionLabel(inputEl));

inputElements.forEach((inputEl) => {
  inputEl.addEventListener('input', () => positionLabel(inputEl));
});

// Enables label transition after a delay to prevent visible shift on page load
labelElements.forEach((labelEl) => {
  setTimeout(() => {
    labelEl.classList.add('label--transition');
  }, 300);
});
