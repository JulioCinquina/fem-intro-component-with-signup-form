'use strict';

const inputElements = document.querySelectorAll('.sign-up-card .input');
const labelElements = document.querySelectorAll('.sign-up-card .label');
const formElement = document.querySelector('#form-sign-up');

// --- form validation  ---

const validateInput = function (inputEl) {
  // Checks values entered in an input element
  // If invalid: style it, show error message and return input element
  // If valid: unstyle it and remove error message
  // Returns invalid input because handleForm() needs it to give focus
  // to the first invalid input

  const inputLabel = inputEl.previousElementSibling.textContent;
  const errorEl = inputEl.nextElementSibling;
  const inputType = inputEl.getAttribute('type');

  const validityObj = inputEl.validity;

  let errorMsg;

  if (validityObj.valueMissing) {
    errorMsg = `${inputLabel} cannot be empty`;
  } else if (inputType === 'email') {
    // The RegExp is a simple check for a TLD. It checks if there is at least
    // one character after the @, followed by a dot with at least two
    // characters after it. It is required because 'typeMismatch' is false
    // for dotless domains.
    const TLDRegExp = new RegExp('@.+?\\..{2,}');
    const emailContainsTLD = TLDRegExp.test(inputEl.value);
    const emailIsInvalid = validityObj.typeMismatch;

    if (!emailContainsTLD || emailIsInvalid)
      errorMsg = `Looks like this is not an email`;
  }

  if (errorMsg) {
    inputEl.setAttribute('aria-invalid', '');
    addInvalidStyle(inputEl);
    showErrorMessage(errorEl, errorMsg);
    return inputEl;
  } else {
    inputEl.removeAttribute('aria-invalid');
    removeInvalidStyle(inputEl);
    removeErrorMessage(errorEl);
  }
};

const showErrorMessage = function (errorEl, errorMsg) {
  const errorIsEmpty = errorEl.textContent === '';
  const currentError = errorEl.textContent;

  if (!errorIsEmpty && currentError !== errorMsg) {
    // If there is already an error message and a different one must be shown,
    // this prevents showing input's border by making just the text transparent
    // (keeping white background visible) and changing it when transition ends
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

  // Prevents showing input's border too soon by only removing text content
  // after opacity transition
  errorEl.addEventListener('transitionend', () => (errorEl.textContent = ''), {
    once: true,
  });
};

const addInvalidStyle = function (inputEl) {
  inputEl.classList.add('input--invalid'); // Red outline, error icon
  inputEl.classList.add('input--invalid-text'); // Red text

  // Removes red text color once user starts typing
  inputEl.addEventListener(
    'input',
    () => inputEl.classList.remove('input--invalid-text'),
    { once: true }
  );

  // After initial validation when the form is submitted,
  // invalid inputs will be validated when they lose focus
  inputEl.addEventListener('blur', () => {
    validateInput(inputEl);
  });
};

const removeInvalidStyle = function (inputEl) {
  inputEl.classList.remove('input--invalid');
  inputEl.classList.remove('input--invalid-text');
};

const handleForm = function (event) {
  event.preventDefault();

  const inputElements = event.target.querySelectorAll('input');

  let firstInvalidInput; // The first invalid input element will receive focus

  for (const inputEl of inputElements) {
    const invalidInput = validateInput(inputEl);

    if (invalidInput && !firstInvalidInput) {
      firstInvalidInput = inputEl;
    }
  }

  if (firstInvalidInput) firstInvalidInput.focus();
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
