/*
    Main page -- LOGIN AND SIGN UP --
*/
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