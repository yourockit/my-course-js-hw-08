import throttle from "lodash.throttle";

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
};
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormChange, 500));

const USER_DATA = 'feedback-form-state';
const formData = {};

populateInput();

function onFormChange(e) {
    formData[e.target.name] = e.target.value;
    const formDataJSON = JSON.stringify(formData);
    localStorage.setItem(USER_DATA, formDataJSON);
};

function populateInput() {
    const userDataJSON = localStorage.getItem(USER_DATA);
    const userData = JSON.parse(userDataJSON);
    if (userData) {
        Object.entries(userData).forEach(([key, value]) => {
            refs.form.elements[key].value = value;
            formData[key] = value;
        });
    };
};

function onFormSubmit(e) {
    e.preventDefault();
    console.log(formData);
    e.currentTarget.reset();
    localStorage.removeItem(USER_DATA);

};