const loginBox = document.querySelector('#sign_log_in');

loginBox.querySelectorAll('input').forEach(item => {
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
        this.lists = []; // contain ToDoList objects
    }
}
class ToDoList {
    constructor(listName) {
        this.listName = listName;
        this.listElements = [];
    }
}

const registerForm = document.getElementById('sign_up_form');
const fieldElements = registerForm.querySelectorAll('input');

document.getElementById('register_btn').addEventListener('click', function(){
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

const loginForm = document.getElementById('login_form');
const loginFieldElements = loginForm.querySelectorAll('input');

document.getElementById('login_btn').addEventListener('click', function(){
    
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
            let registeredUser = parsed.firstName + " " + parsed.lastName;
            redirectToLoggedIn(registeredUser,email);
        }
    }
    function redirectToLoggedIn(loggedInUser,email) {
        document.getElementById('log_in').classList.add('hide');
        document.getElementById('log_in').classList.remove('main_box');
        document.getElementById('logged_in').classList.remove('hide');
        document.getElementById('logged_in').classList.add('main_box');
        document.getElementById('welcome_name').innerText = loggedInUser;
        document.getElementById('welcome_email').innerText = email;
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


const topMenuDiv = document.querySelector('.top_menu');

topMenuDiv.querySelectorAll('input').forEach(item => {

    item.addEventListener('click', event => {
        const target = event.target;
        const buttonText = target.value;

        topButtonsHandler(buttonText);
    });

    function topButtonsHandler(buttonText) {
        if(buttonText === 'Settings' || buttonText === 'My list') {
            const tableContent = document.getElementById('my_list_div');
            const settingsDiv = document.getElementById('account_settings');
            
            showAndHide(tableContent, settingsDiv);
        } else if(buttonText === 'Log out'){
            
        }
    }
    function showAndHide(...elements) {
        console.log(elements);
        elements.forEach(arg => {
            console.log('switch');
            arg.classList.toggle('hide');
            arg.classList.toggle('content');
        });
    }
});
function getLoggedInUserObj() {
    let loggedInUser = document.getElementById('welcome_name').innerText;
    let loggedInEmail = document.getElementById('welcome_email').innerText;

    return userObject = JSON.parse(localStorage.getItem(loggedInEmail));
}
/*
    Existing lists and create new buttons handlers
*/
const myListDivButtonsContainer = document.getElementById('my_list_div_menu');
myListDivButtonsContainer.querySelectorAll('input').forEach(item => {
    item.addEventListener('click', event => {
        const target = event.target;
        const btnText = target.value;

        buttonsHandler(btnText);
    });
    function buttonsHandler(text) {
        const existingLists = document.getElementById('existing_lists');
        const createNew = document.getElementById('create_new_list');

        if(text === 'Existing lists') {
            existingLists.classList.add('my_list_box');
            existingLists.classList.remove('hide');
            createNew.classList.add('hide');
        } else {
            createNew.classList.add('my_list_box');
            createNew.classList.remove('hide');
            existingLists.classList.add('hide');
        }
    }
});

/*
    Save new to-do list
*/
const saveListBtn = document.getElementById('save_list_name');
const newListTable = document.getElementById('new_list_Table');
const createNewListDiv = document.getElementById('create_new_list');

const activitySaveBtn = document.getElementById('add_activity_btn');
const activityNameLabel = document.getElementById('activity_name_label');
const activityNameInput = document.getElementById('activity_name');

saveListBtn.addEventListener('click', function(event){
    const newListElement = document.getElementById('new_list_name');
    const newListName = newListElement.value;
    
    if(newListName === '') {
        alert('List name cannot be empty');
    } else {
        createNewListDiv.querySelector('p').innerText = newListName;
        newListElement.value = '';
        saveListBtn.classList.add('hide');
        newListElement.classList.add('hide');
        document.getElementById('new_list_name_label').classList.add('hide');
        toggleActivityControls();
    }

    function toggleActivityControls() {
        activityNameLabel.classList.toggle('hide');
        activityNameInput.classList.toggle('hide');
        activitySaveBtn.classList.toggle('hide');
    }
});

const newTable = document.getElementById('new_list_Table');
const newTableBody = newTable.querySelector('tbody');

activitySaveBtn.addEventListener('click', () => {
    const activityName = activityNameInput.value;
    
    const nameCol = document.createElement('td');
    nameCol.innerText = activityName;

    const timeCol = document.createElement('td');
    timeCol.innerText = new Date();
    const editCol = document.createElement('td');
    const editBtn = createEditButton();
    
    const row = document.createElement('tr');
    row.appendChild(nameCol);
    row.appendChild(timeCol);
    row.appendChild(editBtn);
    newTableBody.appendChild(row);
});
function createEditButton() {
    const button = document.createElement('input');
    button.type = "button";
    button.value = "Edit";
    button.classList.add('edit_btn');
    
    return button;
}