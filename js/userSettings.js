const settingsBtn =  ((document.querySelector('.top_menu')).querySelector('form')).querySelectorAll('input')[1];

const settingsForm = document.getElementById('settings_form');
const settingsFormFields = settingsForm.querySelectorAll('input');

const firstNameField = settingsFormFields[0];
const lastNameField = settingsFormFields[1];
const emailField = settingsFormFields[2];
const password = settingsFormFields[3];
const passwordRep = settingsFormFields[4];
const modifyButton = settingsFormFields[5];

settingsBtn.addEventListener('click', () => {
    getUserData();
});

function getUserData() {
    fillFields(getAccountDataFromDb());
}
function fillFields(account) {
    firstNameField.value = account.firstName;
    lastNameField.value = account.lastName;
    emailField.value = account.email;
    password.value = account.password;
    passwordRep.value = account.password;
}
function getAccountDataFromDb() {
    return JSON.parse(localStorage.getItem(loggedEmail.innerText));
}
modifyButton.addEventListener('click', () => {
    const fieldsValid = fieldsNotEmpty();
    if(fieldsValid) {
        if(password.value === passwordRep.value) {
            const originalAccount = getAccountDataFromDb();
            updateAndSave(originalAccount);
        } else {
            alert('Difference between password fields!');
        }
        
    } else {
        alert('Field or fields is/are empty.');
    }
});
function fieldsNotEmpty() {
    let index = 0;
    let fieldsNotEmpty = true;
    settingsFormFields.forEach(field =>{
        if(field.value === '') {
            fieldsNotEmpty = false;
        }
        index++;
    });
    return fieldsNotEmpty;
}
function updateAndSave(originalAccount) {
    originalAccount.firstName = firstNameField.value;
    originalAccount.lastName = lastNameField.value;
    originalAccount.email = emailField.value;
    originalAccount.password = password.value;
    
    localStorage.setItem(loggedEmail.innerText,JSON.stringify(originalAccount));
    alert('Modifications saved.');
}




