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
const listnameInputField = document.getElementById('new_list_name');
const createNewList = document.getElementById('create_new_list');
const listName = createNewList.querySelector('p');

/* New list -> Add name to the list */
saveListName.addEventListener('click', () => {
    
    const listName = listnameInputField.value;

    if(listName === '') {
        alert('List name cannot be empty');
    } else {
        //document.getElementById('create_new_list').querySelector('p').innerText = listName;
        createNewList.querySelector('p').innerText = listName;
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
    //const listName = document.getElementById('create_new_list').querySelector('p').innerText;
    const listName = createNewList.querySelector('p').innerText;
    const table = document.getElementById('new_list_Table');
    const tbody = table.querySelector('tbody');
    const tableRows = tbody.childNodes;

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
        setFieldsToDefault();
    }
    function setFieldsToDefault() {
        document.getElementById('create_new_list').querySelector('p').innerText = 'Unnamed list';
        tbody.innerHTML = '';
        listnameInputField.value = '';
        addHideToClasslist(activitySaveBtn, deadlineInput, deadlineLabel, activityNameInput, activityNameLabel);
        removeHideFromClasslist(saveListNameLabel, listnameInputField,saveListName);
        alert('List saved');
    }
    function addHideToClasslist(...elements) {
        elements.forEach(element => {
            element.classList.add('hide');
        });
    }
    function removeHideFromClasslist(...elements) {
        elements.forEach(element => {
            element.classList.remove('hide');
        });
    }
});