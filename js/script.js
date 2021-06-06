
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

/* Date picker */
$( function() {
    $( "#datepicker" ).datepicker({
        minDate: 'today'
    });
});

/* Import js file */
function include(file) {
    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('body').item(0).appendChild(script);
}

include('js/loginHandler.js');
include('js/loginAndSignupHandler.js');
include('js/userRegistration.js');
include('js/userLoginHandler.js');
include('js/existingListsHandler.js');
include('js/userSettings.js');
include('js/createToDoList.js');
