# Frontend Mentor - Intro component with sign up form solution

This is a solution to the [Intro component with sign up form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/intro-component-with-signup-form-5cf91bd49edda32581d28fd1). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

[Live Site on GitHub Pages](https://juliocinquina.github.io/fem-intro-component-with-signup-form/)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Receive an error message when the `form` is submitted if:
  - Any `input` field is empty. The message for this error should say _"[Field Name] cannot be empty"_
  - The email address is not formatted correctly (i.e. a correct email address should have this structure: `name@host.tld`). The message for this error should say _"Looks like this is not an email"_

### Links

- [Solution on Frontend Mentor](https://www.frontendmentor.io/solutions/signup-form-with-accessible-labels-and-error-messages-20eDGlooZN)
- [Live Site on GitHub Pages](https://juliocinquina.github.io/fem-intro-component-with-signup-form/)

### Screenshots (click below to expand)

<details>
  <summary>Mobile layout</summary>
  <img src="./screenshots/mobile-layout.png" alt="Mobile layout of the solution">
</details>

<details>
  <summary>Desktop layout</summary>
  <img src="./screenshots/desktop-layout.png" alt="Desktop layout of the solution">
</details>

<details>
  <summary>Form validation demonstration (GIF)</summary>
  <img src="./screenshots/demonstration.gif" alt="error messages are displayed after trying to submit an empty sign-up form or entering an invalid email address">
</details>

## My process

### What I learned

In this project, I have practiced the following skills:

- Creating a responsive page with **semantic HTML**, **CSS** and **JavaScript**
- Using **JavaScript** for **client-side form validation** and **DOM manipulation**
- Graceful degradation: if JavaScript is disabled, the default HTML5 client-side form validation is used
- Graceful degradation: if JavaScript is disabled, labels are positioned on top of input fields by default
- **Accessibility**: input labels are always visible, even after entering data
- **Accessibility**: input fields with invalid data receive the `aria-invalid` attribute and are described by their error message using `aria-describedby`
- **Accessibility**: the first input field with invalid data receives focus after submitting the form
- **Accessibility**: links that open a new tab or window are described using `aria-describedby`
- Using **CSS relative units** to ensure the page scales according to the user's font size settings
- Using **CSS custom properties** to allow easy customization and reusability of components
- Using **Git** and **GitHub**

**Note on accessibility**: Parts of this project contain color contrast ratios that are not WCAG compliant. The colors used are part of Frontend Mentor's original design. In a real-world scenario, changes would be requested to the design team before deploying the project.

---

### Continued development

To further develop this project, I would like to use the relational pseudo-class (`:has()`) to position the input labels (inside the input when it is empty; on top of it when the user starts typing) instead of relying on JavaScript. At the moment, however, the support for `:has()` is still insufficient for it to be used in production.

## Author

- Twitter - [@JulioCinquina](https://twitter.com/JulioCinquina)
- Frontend Mentor - [@JulioCinquina](https://www.frontendmentor.io/profile/JulioCinquina)
