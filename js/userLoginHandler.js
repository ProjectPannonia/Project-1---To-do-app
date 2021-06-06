/*
    LOGIN
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

/* If user registered ... */
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
        loadSavedListsFromDb(loggedEmail.innerText);
    }
}


// Clear Sign up input fields
loginFieldElements.forEach(field => {
    field.addEventListener('change', () => {
        field.classList.remove('invalidData');
    })
});


function getLoggedInUserObj() {
    let loggedInUser = document.getElementById('welcome_name').innerText;
    let loggedInEmail = document.getElementById('welcome_email').innerText;

    return userObject = JSON.parse(localStorage.getItem(loggedInEmail));
}

