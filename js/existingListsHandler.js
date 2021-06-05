/*
    Load registered to-do lists from localstorage
*/
const registeredListsBox = document.getElementById('registered_list_box');
const existingListsBtn = document.getElementById('existing_lists_btn');
existingListsBtn.addEventListener('click', () => {
    const loggedEmail = document.getElementById('welcome_email').innerText;
    loadSavedListsFromDb(loggedEmail);
});
function loadSavedListsFromDb(userEmail) {
    
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
    const box = document.createElement('div');
    box.classList.add('list_box');

    box.appendChild(header);
////////////////////////////////////////////////////////////////////////////
    return box;
}
function getHeader(listName) {
    const header = document.createElement('h2');
    header.innerText = listName;
    header.addEventListener('click', (event) => {
        const target = event.target;
        console.log('Target: ' + target.innerText);
    });
    return header;
}