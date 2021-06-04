/*
    Load registered to-do lists from localstorage
*/
const registeredListsBox = document.getElementById('registered_list_box');
function loadSavedListsFromDb(userEmail) {
    
    // Registered to-do list of logged user
    const dbResponse = localStorage.getItem(userEmail);
    console.log('DB response: ' + dbResponse);
    const account = JSON.parse(dbResponse);
    console.log('Parsed db response: ' + account.toString());
    const a = account[0];
    console.log('A: ' + a);
    /*
    const fn = account.firstName;
    const userLists = account.lists[0];
    const flist = userLists[0];
    console.log('First name: ' + flist.listName);
    */
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