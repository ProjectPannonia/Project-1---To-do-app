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
        loginBox.classList.add('hide');
    };
});
