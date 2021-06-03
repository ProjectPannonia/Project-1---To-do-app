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
    constructor(activityName, timeStamp) {
        this.activityName = activityName;
        this.timeStamp = timeStamp;
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

    /*
        New user registration tagmethods
    */
    function readValuesFromRegistrationForm(fieldElements) {
        fieldElements.forEach(element => {
            inputArr.push(element.value);
        });
        /*
        for(let i = 0; i < fieldElements.length-2; i++) {
                let val = fieldElements[i].value;
                inputArr.push(val);
        }
        */
    }

    function validateValues(arr) {
        let emptyIndexes = [];
        arr.forEach(element => {
            if(element === '')
                emptyIndexes.push(i);
        });
        /*
        for(let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if(element === ''){
                emptyIndexes.push(i);
            }
        }
        */
        if(emptyIndexes.length !== 0) {
            addRedBorder(emptyIndexes);
        } else {
            
            let inDb = localStorage.getItem(inputArr[2]);

            if(inDb !== null) {
                alert('This email is already registered');
            } else {
                const checkbox = document.getElementById('aggreTerms').checked;
                if(checkbox === true) {
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
                    alert('Please accept the therms!');
                }
            }
            
        }

        function createAccountAnd() {
            // create new account object
            const newAccount = new Account(inputArr[0], inputArr[1], inputArr[2], inputArr[3]);
            // send to local storage
            localStorage.setItem(inputArr[2], JSON.stringify(newAccount));
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
                case 3:
                    selectedElement = document.getElementById('password');
                    break;
            }

            return selectedElement;
        };
    }
});

function clearFields(elementCollection) {
    for(let i = 0; i < elementCollection.length-2; i++) {
        fieldElements[i].value = '';
    }
    document.getElementById('aggreTerms').checked = false;
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
            createNew.classList.remove('my_list_box');
        } else {
            createNew.classList.add('my_list_box');
            createNew.classList.remove('hide');
            existingLists.classList.add('hide');
            existingLists.classList.remove('my_list_box');
        }
    }
});

/*
    Save new to-do list
*/
const saveNewListName = document.getElementById('save_list_name');
const newListTable = document.getElementById('new_list_Table');
const createNewListDiv = document.getElementById('create_new_list');

const activitySaveBtn = document.getElementById('add_activity_btn');
const activityNameLabel = document.getElementById('activity_name_label');
const activityNameInput = document.getElementById('activity_name');

saveNewListName.addEventListener('click', function(event){
    const newListElement = document.getElementById('new_list_name');
    const newListName = newListElement.value;
    
    if(newListName === '') {
        alert('List name cannot be empty');
    } else {
        createNewListDiv.querySelector('p').innerText = newListName;
        newListElement.value = '';
        saveNewListName
    .classList.add('hide');
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

let editBtns = document.querySelectorAll('.edit_btn');;

activitySaveBtn.addEventListener('click', () => {
    const activityName = activityNameInput.value;
    
    if(activityName !== '') {
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

        activityNameInput.value = '';

        //editBtns = document.querySelectorAll('.edit_btn');
        
    } else {
        alert('Activity name is empty!');
    }
});

function createEditButton() {
    
    const button = document.createElement('input');
    button.type = "button";
    button.value = "Edit";
    button.classList.add('edit_btn');
    button.addEventListener('click', event => {
        const target = event.target;
        const targetParentNodes = target.parentElement.childNodes;
        let prompt = window.prompt('Modify name to:');
        if(prompt !== '') {
            targetParentNodes[0].innerText = prompt;
        } else {
            alert('Cannot be null!');
        }
        
    });
    return button;
}

/*
    Edit buttons
*/
document.querySelectorAll('.edit_btn').forEach(item => {
    item.addEventListener('click', event => {
        console.log(event.target);
    });
});

/*
    Save new list and send to local storage
*/
const saveNewListBtn = document.getElementById('save_created_list');
saveNewListBtn.addEventListener('click', () => {
    const table = document.getElementById('new_list_Table');
    const tbody = table.querySelector('tbody');
    const tableRows = tbody.childNodes;
    const listName = document.getElementById('create_new_list').querySelector('p').innerText;

    const activitiesObjectsArray = createActivities(tableRows);
    // New list object created
    const toDoList = new ToDoList(listName, activitiesObjectsArray);
    // Get logged user email
    const loggedEmail = document.getElementById('welcome_email').innerText;
    // Get logged user data from local storage
    const loggedUserData = localStorage.getItem(loggedEmail);
    // Parse user data to an Account object
    const loggedAccount = JSON.parse(loggedUserData);
    console.log('Logged account firstName: ' + loggedAccount.firstName + ", lists length: " + loggedAccount.lists.length);
    loggedAccount.lists.push(activitiesObjectsArray);
    console.log('Logged account firstName: ' + loggedAccount.firstName + ", lists length: " + loggedAccount.lists.length);
    console.log('Activites objc arr: ' + activitiesObjectsArray + ', created to-do: ' + toDoList + ', Logged email: ' + loggedEmail + ', Logged user data from local storage: ' + loggedUserData + ', Logged account: ' + loggedAccount);
    // Save modified account to local storage
    localStorage.setItem(loggedEmail, JSON.stringify(loggedAccount));
});

function createActivities(tbodyNode) {
    let activityObjArr = [];

    for(let i = 0; i < tbodyNode.length; i++) {
        let row = tbodyNode[i];
        let rowNodes = row.childNodes;
        let activityName = rowNodes[0].innerText;
        let timeStamp = rowNodes[1].innerText;
        activityObjArr.push(new Activity(activityName, timeStamp));
        console.log('NAme: ' + rowNodes[0].innerText + ", time: " + rowNodes[1].innerText);
    }

    return activityObjArr;
}
/*
    Load registered to-do lists from localstorage
*/
const registeredListsBox = document.getElementById('registered_list_box');
function loadSavedListsFromDb(userEmail) {
    
    // Registered to-do list of logged user
    const account = JSON.parse(localStorage.getItem(userEmail));

    
    const fn = account.firstName;
    const userLists = account.lists[0];
    const flist = userLists[0];
    console.log('First name: ' + flist.listName);
    //updateListBoxes(userLists,registeredListsBox);
}

/*
    Update list boxes
*/
function updateListBoxes(userLists, registeredListsContainer) {
    const registeredBoxes = registeredListsContainer.querySelectorAll('list_box');
    registeredBoxes.forEach(element => {
        element.parentNode.removeChild(element);
    });
    
    let userListCounter = 0;
    userLists.forEach(element => {
        const elementFirstArr = element[0];
        //const firstObj = elementFirstArr[0];
        console.log('List: ' + String(elementFirstArr));

        userListCounter++;
    });
    
}
/*
    Create boxForList
*/
function createListBox(listName, listElements) {
    const listBoxElement = document.createElement('div');
    listBoxElement.classList.add('list_box');
    
    const listBoxH2 = document.createElement('h2');
    listBoxH2.innerText = listName;
    listBoxElement.appendChild(listBoxH2);
    listBoxElement.appendChild(createTableForList(listElements));

}
let createTableForList = (listElements) => {
    const table = document.createElement('table');
    const tableHeader = document.createElement('thead');
    const NameHeader = document.createElement('th');
    const timestampHeader = document.createElement('th');
    const editHeader = document.createElement('th');

    tableHeader.appendChild(NameHeader,timestampHeader,editHeader);
    table.appendChild(tableHeader);
    const tableBody = document.createElement('tbody');
    
    listElements.forEach(element => {
        const row = document.createElement('tr');
        
        const nameCol = document.createElement('td');
        nameCol.innerText = element.activityName;
        row.appendChild(nameCol);
        
        const timeStampCol = document.createElement('td');
        timeStampCol.innerText = element.timeStamp;
        row.appendChild(timeStampCol);

        const editCol = document.createElement('td');
        const editButton = document.createElement('input');
        editButton.classList.add('edit_btn');
        editCol.appendChild(editButton);
        row.appendChild(editCol);

        tableBody.appendChild(row);
    });
}


