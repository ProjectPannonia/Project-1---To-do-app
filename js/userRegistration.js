class Account {
    constructor(firstName, lastName, email, password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.lists = []; // contains ToDoList objects
    }
}
class ToDoList {
    constructor(listName,listElements) {
        this.listName = listName;
        this.listElements = listElements; // contains activity objects
    }
}
class Activity {
    constructor(activityName, timeStamp,deadline) {
        this.activityName = activityName;
        this.timeStamp = timeStamp;
        this.deadline = deadline;
    }
}
/*
    New user registration functionality
*/
const registerForm = document.getElementById('sign_up_form');
const fieldElements = registerForm.querySelectorAll('input');
const registerUserBtn = document.getElementById('register_btn');

registerUserBtn.addEventListener('click', () => {
    let inputArr = [];
    
    readValuesFromRegistrationForm(fieldElements);
    validateValues(inputArr);

    function readValuesFromRegistrationForm(fieldElements) {
        fieldElements.forEach(element => {
            inputArr.push(element.value);
        });
    }

    function validateValues(arr) {
        let fieldIndex = 0;
        let emptyIndexes = getEmptyInputFields(arr);
        
        if(emptyIndexes.length !== 0) {
            addRedBorder(emptyIndexes);
        } else if(localStorage.getItem(inputArr[2]) !== null){
            alert('This email is already registered');
        } else if(document.getElementById('aggreTerms').checked){
            if(passwordValidarot(inputArr[3])) {
                    /* validate email*/
                if(validateEmail(inputArr[2])) {
                    // clear fields
                clearFields(fieldElements);
                // create account object
                const newAccount = new Account(inputArr[0], inputArr[1], inputArr[2], inputArr[3]);
                // send to local storage
                localStorage.setItem(inputArr[2], JSON.stringify(newAccount));
                
                document.getElementById('sign_up').classList.add('hide');
                document.getElementById('sign_up').classList.remove('main_box');
                document.getElementById('sign_log_in').classList.remove('hide');
                } else {
                    alert('Invalid email address!');
                }
            }

        } else {
            alert('Please accept the therms!');
        }

        function getEmptyInputFields(arr) {
            let emptyIndexes = [];
            arr.forEach(element => {
                if(element === '') emptyIndexes.push(fieldIndex);
                fieldIndex++;
            });
            return emptyIndexes;
        }

        function addRedBorder(indexesArr) {
            indexesArr.forEach(index => {
                let element = getElementByIndex(index);
                element.classList.add('invalidData');
            });
        };

        function getElementByIndex(index) {
            let selectedElement;

            switch(index) {
                case 0:
                    selectedElement = document.getElementById('first_name');
                    break;
                case 1:
                    selectedElement = document.getElementById('last_name');
                    break;
                case 2:
                    selectedElement = document.getElementById('email');
                    break;
                default:
                    selectedElement = document.getElementById('password');
                    break;
            }

            return selectedElement;
        };
    }
});
/* Clear input fields */
function clearFields(elementCollection) {
    for(let i = 0; i < elementCollection.length-2; i++) {
        fieldElements[i].value = '';
    }
    document.getElementById('aggreTerms').checked = false;
};

/* Clear Sign up input fields */
fieldElements.forEach(field => {
    field.addEventListener('change', () => {
        field.classList.remove('invalidData');
    })
});
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function passwordValidarot(password) {
    const strongPassword = passwordStrengthValidator(password);
    const enoughLength = password.length >= 8;

    if(!strongPassword) {
        alert('Weak password!');
    } else if(!enoughLength) {
        alert('Short password!');
    }
    console.log('Password weak: ' + strongPassword);
    console.log('Password short: ' + enoughLength);
    return strongPassword && enoughLength;
}
function passwordStrengthValidator(password) {
    const re = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    return re.test(password);
}

