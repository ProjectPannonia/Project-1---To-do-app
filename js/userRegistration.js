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

/*
    Create new TO-DO list
*/
const newListTable = document.getElementById('new_list_Table');
const saveListName = document.getElementById('save_list_name');
const saveListNameLabel = document.getElementById('new_list_name_label');
const activitySaveBtn = document.getElementById('add_activity_btn');
const activityNameLabel = document.getElementById('activity_name_label');
const activityNameInput = document.getElementById('activity_name');
const deadlineLabel = document.getElementById('datepicker_label');
const deadlineInput = document.getElementById('datepicker');

/* New list -> Add name to the list */
saveListName.addEventListener('click', () => {
    const listnameInputField = document.getElementById('new_list_name');
    const listName = listnameInputField.value;

    if(listName === '') {
        alert('List name cannot be empty');
    } else {
        document.getElementById('create_new_list').querySelector('p').innerText = listName;
        listnameInputField.innerText = '';
        
        toggleActivityControls(listnameInputField,saveListName,saveListNameLabel,activityNameLabel,activityNameInput,activitySaveBtn,deadlineLabel,deadlineInput);
    }
    function toggleActivityControls(...fields) {
        fields.forEach(arg => {
            arg.classList.toggle('hide');
        });
    }
    
});

activitySaveBtn.addEventListener('click', () => {
    const newTable = document.getElementById('new_list_Table');
    const newTableBody = newTable.querySelector('tbody');
    const activityName = activityNameInput.value;
    const deadLineInput = document.getElementById('datepicker');
    const deadLineTime = deadLineInput.value;
    
    if(activityName !== '' && deadLineTime !== '') {
        const nameCol = getEmptyColumn(activityName);

        const specDate = getDate();
        const timeCol = getEmptyColumn(specDate);
        
        const deadlineCol = getEmptyColumn(deadLineTime);
        const editBtn = createEditButton();
        
        const row = createRow(nameCol, timeCol,deadlineCol,editBtn);
        newTableBody.appendChild(row);

        clearInputFields();
        
    } else {
        alert('Activity name is empty!');
    }


    function getEmptyColumn(innerText) {
        let col = document.createElement('td');
        col.innerText = innerText;

        return col;
    }
    function createRow(nameCol, timeCol, deadLineCol, editBtn) {
        let row = document.createElement('tr');
        row.appendChild(nameCol);
        row.appendChild(timeCol);
        row.appendChild(deadLineCol);
        row.appendChild(editBtn);
        return row;
    }
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
    function clearInputFields() {
        activityNameInput.value = '';
        deadLineInput.value = '';
    }
    function getDate() {
        let fullDate = new Date();
       
        return fullDate.getUTCDay() + "/" + fullDate.getUTCMonth() + "/" + fullDate.getUTCFullYear();
    }
});

/*
    Save new list and send to local storage
*/
document.getElementById('save_created_list').addEventListener('click', () => {
    const listName = document.getElementById('create_new_list').querySelector('p').innerText;
    const table = document.getElementById('new_list_Table');
    const tbody = table.querySelector('tbody');
    const tableRows = tbody.childNodes;
    //const listName = document.getElementById('create_new_list').querySelector('p').innerText;

    createActivities(tableRows,listName);

    function createActivities(tbodyNode,listName) {
        let activityObjArr = [];
    
        for(let i = 0; i < tbodyNode.length; i++) {
            let row = tbodyNode[i];
            let rowNodes = row.childNodes;
            let activityName = rowNodes[0].innerText;
            let timeStamp = rowNodes[1].innerText;
            let deadLine = rowNodes[2].innerText;
    
            activityObjArr.push(new Activity(activityName, timeStamp, deadLine));
            console.log('NAme: ' + rowNodes[0].innerText + ", time: " + rowNodes[1].innerText);
        }
    
        const toDoList = new ToDoList(listName, activityObjArr);
        const loggedEmail = document.getElementById('welcome_email').innerText;
        getUserData(loggedEmail,toDoList)
    }
    function getUserData(loggedEmail,toDoListObj) {
        const loggedUserData = localStorage.getItem(loggedEmail);
        const parsedLoggedUserData = JSON.parse(loggedUserData);
        parsedLoggedUserData.lists.push(toDoListObj);
        sendToLocalstorage(loggedEmail,parsedLoggedUserData);
    }
    function sendToLocalstorage(loggedEmail,parsedUserData) {
        localStorage.setItem(loggedEmail, JSON.stringify(parsedUserData));
    }
});