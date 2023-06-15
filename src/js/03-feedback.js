const throttle = require('lodash.throttle');

const feedbackForm = document.querySelector('.feedback-form');

const feedbackFormStateKey = 'feedback-form-state';

feedbackForm.addEventListener('input', throttle(saveFormState, 500));


window.addEventListener('load', loadFormState);


feedbackForm.addEventListener('submit', handleSubmit);

let formState = {};

function saveFormState(e) {
  formState[e.target.name] = e.target.value

  localStorage.setItem(feedbackFormStateKey, JSON.stringify(formState));
}

function loadFormState() {
  try {
      const formStateJSON = localStorage.getItem(feedbackFormStateKey);

    if (formStateJSON) {
      formState = JSON.parse(formStateJSON);

      Object.entries(formState).forEach(([key, val]) => {
        feedbackForm.elements[key].value = val;
      })
    }
  } catch (error) {
    logMyErrors(error);
  }
  
}

function handleSubmit(evt) {
  evt.preventDefault();

  console.log(formState);
  formState = {};
  localStorage.removeItem(feedbackFormStateKey);

  feedbackForm.reset();
}
