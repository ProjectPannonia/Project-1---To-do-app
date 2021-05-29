const loginBox = document.querySelector('#sign_log_in');

const loginAndSignupButtons = loginBox.querySelectorAll('input').forEach(item => {
    item.addEventListener('click', event => {
        const target = event.target;
        const buttonText = target.value;

        switch(buttonText) {
            case 'Log In':
                console.log('Login pushed!');
                mainButtonsHandler(buttonText);
                break;
            case 'Sign up!':
                console.log('Sign up pushed!');
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

class Account {
    constructor(firstName, lastName, email, password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}
/*

*/
const registerForm = document.getElementById('sign_up_form');
const fieldElements = registerForm.querySelectorAll('input');

const registerButton = document.getElementById('register_btn').addEventListener('click', function(){
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
            console.log('Clear fields');
            // clear fields
            clearFields();
            // create account object
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
        function clearFields() {
            for(let i = 0; i < fieldElements.length-1; i++) {
                fieldElements[i].value = '';
            }
        };
    }
});

fieldElements.forEach(field => {
    field.addEventListener('change', () => {
        field.classList.remove('invalidData');
    })
});
