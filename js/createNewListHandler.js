/*
    Create new TO-DO list
*/
const newListTable = document.getElementById('new_list_Table');


const activitySaveBtn = document.getElementById('add_activity_btn');
const activityNameLabel = document.getElementById('activity_name_label');
const activityNameInput = document.getElementById('activity_name');
const deadlineLabel = document.getElementById('datepicker_label');
const deadlineInput = document.getElementById('datepicker');

/* New list -> Add name to the list */
document.getElementById('save_list_name').addEventListener('click', () => {
    const listnameInputField = document.getElementById('new_list_name');
    const listName = listnameInputField.value;

    if(listName === '') {
        alert('List name cannot be empty');
    } else {
        document.getElementById('create_new_list').querySelector('p').innerText = listName;
        listnameInputField.innerText = '';
        
        listnameInputField.classList.add('hide');
        
        toggleActivityControls();
    }

    function toggleActivityControls() {
        document.getElementById('save_list_name').classList.toggle('hide');
        document.getElementById('new_list_name_label').classList.toggle('hide');
        activityNameLabel.classList.toggle('hide');
        activityNameInput.classList.toggle('hide');
        activitySaveBtn.classList.toggle('hide');
        deadlineLabel.classList.toggle('hide');
        deadlineInput.classList.toggle('hide');
    }
});

const newTable = document.getElementById('new_list_Table');
const newTableBody = newTable.querySelector('tbody');

let editBtns = document.querySelectorAll('.edit_btn');;

activitySaveBtn.addEventListener('click', () => {
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
    //console.log('Logged account firstName: ' + loggedAccount.firstName + ", lists length: " + loggedAccount.lists.length);
    loggedAccount.lists.push(activitiesObjectsArray);
    //console.log('Logged account firstName: ' + loggedAccount.firstName + ", lists length: " + loggedAccount.lists.length);
    //console.log('Activites objc arr: ' + activitiesObjectsArray + ', created to-do: ' + toDoList + ', Logged email: ' + loggedEmail + ', Logged user data from local storage: ' + loggedUserData + ', Logged account: ' + loggedAccount);
    // Save modified account to local storage
    localStorage.setItem(loggedEmail, JSON.stringify(loggedAccount));

    function createActivities(tbodyNode) {
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
    
        return activityObjArr;
    }
});