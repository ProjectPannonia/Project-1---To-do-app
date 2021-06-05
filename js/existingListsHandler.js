/*
    Load registered to-do lists from localstorage
*/
const registeredListsBox = document.getElementById('registered_list_box');
const existingListsBtn = document.getElementById('existing_lists_btn');
const loggedEmail = document.getElementById('welcome_email');

existingListsBtn.addEventListener('click', () => {
    loadSavedListsFromDb(loggedEmail.innerText);
});
function loadSavedListsFromDb(userEmail) {
    console.log('User email: ' + userEmail);
    // Registered to-do list of logged user
    const dbResponse = localStorage.getItem(userEmail);
    const parsed = JSON.parse(dbResponse);
    const listObjectArray = parsed.lists;
    
    removeListBoxes(listObjectArray);
    return parsed;
    
}
function removeListBoxes(listObjectArray) {
    const registeredListBox = document.getElementById('registered_list_box');
    registeredListsBox.innerHTML = '';
    updateRegisteredListBox(registeredListBox,listObjectArray);
}
function updateRegisteredListBox(listsContainer,arrayOfToDos) {
    
    arrayOfToDos.forEach(toDoObj => {
        const listName = toDoObj.listName;
        const listBox = getEmptyBox(listName);
        listsContainer.appendChild(listBox);
    });
}
function getEmptyBox(listName) {
    const header = getHeader(listName);
    const headerBox = document.createElement('div');
    const tableContainer = getTableContainer(listName);
    headerBox.classList.add('list_box');

    headerBox.appendChild(header);
    headerBox.appendChild(tableContainer);

    return headerBox;
}
function getHeader(listName) {
    const header = document.createElement('h2');
    header.innerText = listName;
    header.addEventListener('click', (event) => {
        
        const target = event.target;
        const parent = target.parentElement;
        const parentParent = parent.parentElement;
        parent.querySelector('table').classList.toggle('hide');
        parent.querySelector('table').classList.toggle('tableContainer');
        parent.classList.toggle('active_list_box');
        
    });
    return header;
}
function getTableContainer(listName) {
    const tableContainer = getEmptyTable();
    tableContainer.classList.add('hide');
    const tableBody = getTableBody(listName);
    tableContainer.appendChild(tableBody);
    return tableContainer;
}
function getEmptyTable() {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    
    const row = document.createElement('tr');
    row.appendChild(getTh('Name'));
    row.appendChild(getTh('Timestamp'));
    row.appendChild(getTh('Deadline'));
    row.appendChild(getTh('Edit'));
    thead.appendChild(row);
    table.appendChild(thead);
    return table;
}
function getTh(name) {
    const th = document.createElement('th');
    th.innerText = name;
    return th;
}
function getTableBody(listName) {
    const accountObj = JSON.parse(localStorage.getItem(loggedEmail.innerText));
    const listObjects = accountObj.lists; // Account.lists
    let toDoListObj;
    let filledTbody;

    listObjects.forEach(toDoObj => { // To do objects
        if(toDoObj.listName === listName) {
            filledTbody = appendRowsToBody(toDoObj.listElements);// Activity object array
        }
    });
    
    return filledTbody;
}
function appendRowsToBody(todolist) { // Todolist = Array of ActivityObjects
    const tbody = document.createElement('tbody');
    todolist.forEach(activity => {
        const activityName = activity.activityName;
        const activityTimestamp = activity.timeStamp;
        const activityDeadline = activity.deadline;
        tbody.appendChild(getActivityRow(activityName, activityTimestamp, activityDeadline));
    });

    return tbody;
}
function getActivityRow(activityName, activityTimestamp, activityDeadline) {

    const row = document.createElement('tr');
    const nameCol = document.createElement('td');
    const timestampCol = document.createElement('td');
    const deadlineCol = document.createElement('td');
    const editCol = document.createElement('td');

    nameCol.innerText = activityName;
    timestampCol.innerText = activityTimestamp;
    deadlineCol.innerText = activityDeadline;
    editCol.appendChild(createEditButton());

    row.appendChild(nameCol);
    row.appendChild(timestampCol);
    row.appendChild(deadlineCol);
    row.appendChild(editCol);

    return row;
}
function createEditButton() {
    
    const button = document.createElement('input');
    button.type = "button";
    button.value = "Edit";
    button.classList.add('edit_btn');
    button.addEventListener('click', event => {
        const target = event.target;
        const targetParentNodes = (target.parentElement).parentElement.childNodes;
        
        let prompt = window.prompt('Modify name to:');
        if(prompt !== '') {
            targetParentNodes[0].innerText = prompt;
        } else {
            alert('Cannot be null!');
        }
        
    });
    return button;
}