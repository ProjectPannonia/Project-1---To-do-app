const loginBox = document.querySelector('#sign_log_in');

const loginAndSignupButtons = loginBox.querySelectorAll('input').forEach(item => {
    item.addEventListener('click', event => {
        const target = event.target;
        const buttonText = target.value;

        switch(buttonText) {
            case 'Log In':
                mainButtonsHandler(buttonText);
                break;
            case 'Sign up!':
                mainButtonsHandler(buttonText);
                break;
        }
    });
    let mainButtonsHandler = (buttonText) => {
        const selectedOption = (buttonText === 'Log In') ?  document.getElementById('log_in') : document.getElementById('sign_up');
        selectedOption.classList.remove('hide');
        selectedOption.classList.add('main_box');
        loginBox.classList.add('hide');
    };
});

/*
    Functions for user registration
*/
class Account {
    constructor(firstName, lastName, email, password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

const registerForm = document.getElementById('sign_up_form');
const fieldElements = registerForm.querySelectorAll('input');

const registerButton = document.getElementById('register_btn').addEventListener('click', function(){
    let inputArr = [];
    
    fieldElements.forEach(item => {
       let val = item.value;
       if(val !== 'Register') inputArr.push(val);
    });
    
    validateValues(inputArr);

    function validateValues(arr) {
        let emptyIndexes = [];
        for(let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if(element === ''){
                emptyIndexes.push(i);
            }
        }

        if(emptyIndexes.length !== 0) {
            addRedBorder(emptyIndexes);
        } else {
            
            let inDb = localStorage.getItem(inputArr[2]);

            if(inDb !== null) {
                alert('This email is already registered');
            } else {
                // clear fields
                clearFields(fieldElements);
                // create account object
                const newAccount = new Account(inputArr[0], inputArr[1], inputArr[2], inputArr[3]);
                // send to local storage
                localStorage.setItem(inputArr[0], JSON.stringify(newAccount));
                document.getElementById('sign_up').classList.add('hide');
                document.getElementById('sign_up').classList.remove('main_box');
                document.getElementById('sign_log_in').classList.remove('hide');
            }
            
        }

        function addRedBorder(indexesArr) {
            indexesArr.forEach(index => {
                const element = getElementByIndex(index);
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
                case 3:
                    selectedElement = document.getElementById('password');
                    break;
            }

            return selectedElement;
        };
    }
});

function clearFields(elementCollection) {
    for(let i = 0; i < elementCollection.length-1; i++) {
        fieldElements[i].value = '';
    }
};

// Clear Sign up input fields
fieldElements.forEach(field => {
    field.addEventListener('change', () => {
        field.classList.remove('invalidData');
    })
});

/*
    Function for login
*/
let registeredUser = "";

const loginForm = document.getElementById('login_form');
const loginFieldElements = loginForm.querySelectorAll('input');

const loginButton = document.getElementById('login_btn').addEventListener('click', function(){
    
    let inputArr = [];
    let email, psw;

    loginFieldElements.forEach(item => {
       let val = item.value;
       if(val !== '' && val !== 'Login') {
        inputArr.push(val);
       } else if(val === '' && val !== 'Login'){
        item.classList.add('invalidData');
       }
    });

    if(inputArr.length === 2) {
        email = inputArr[0];
        psw = inputArr[1];
        logMeIn(email,psw);
    }
    
});

// Registered email? -> Then log me in
function logMeIn(email, psw) {
    const emailDbResponse = localStorage.getItem(email);
    if(emailDbResponse === null) {
        alert('This email isn\'t registered!');
    } else {
        const parsed = JSON.parse(emailDbResponse);
        if(psw === parsed.password) {
            registeredUser = parsed.firstName + " " + parsed.lastName;
            
            redirectToLoggedIn();
        }
    }
    function redirectToLoggedIn() {
        document.getElementById('log_in').classList.add('hide');
        document.getElementById('log_in').classList.remove('main_box');
        document.getElementById('logged_in').classList.remove('hide');
        document.getElementById('logged_in').classList.add('main_box');
    }
}


// Clear Sign up input fields
loginFieldElements.forEach(field => {
    field.addEventListener('change', () => {
        field.classList.remove('invalidData');
    })
});

/*
    Logged in handler
*/
const loggedInPage = document.getElementById('logged_in');
const loggedHeader = loggedInPage.querySelector('h2');
//console.log('Registered user: ' + registeredUser);
//loggedHeader.querySelector('span').innerHTML = registeredUser;
const topMenu = document.getElementsByClassName('top_menu');
const topMenuButtons = topMenu.querySelectorAll('input');

const topMenuButtonsHandler = topMenuButtons.querySelectorAll('input').forEach(item => {

    item.addEventListener('click', event => {
        const target = event.target;
        const buttonText = target.value;

        switch(buttonText) {
            case 'Settings':
                topButtonsHandler(buttonText);
                break;
            case 'Log out':
                topButtonsHandler(buttonText);
                break;
        }
    });

    function topButtonsHandler(buttonText) {
        if(buttonText === 'Settings') {
            const tableContent = document.getElementById('table_content');
            const settingsDiv = document.getElementById('account_settings');

            tableContent.classList.add('hide');
            tableContent.classList.remove('content');
            settingsDiv.classList.add('content');
            settingsDiv.classList.remove('hide');
        } else {

        }
    }
});