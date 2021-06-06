/*
    Logged in handler
*/
const topMenuDiv = document.querySelector('.top_menu');

topMenuDiv.querySelectorAll('input').forEach(item => {

    item.addEventListener('click', event => {
        const target = event.target;
        const buttonText = target.value;

        topButtonsHandler(buttonText);
    });

    function topButtonsHandler(buttonText) {
        const tableContent = document.getElementById('my_list_div');
        const settingsDiv = document.getElementById('account_settings')
        if(buttonText === 'Settings') {
            tableContent.classList.add('hide');
            settingsDiv.classList.remove('hide');
            settingsDiv.querySelector('form').style.display = 'flex';
            settingsDiv.querySelector('h2').style.display = 'inline';
        } else if(buttonText === 'My list') {
            tableContent.classList.remove('hide');
            settingsDiv.classList.add('hide');
            settingsDiv.querySelector('form').style.display = 'none';
            settingsDiv.querySelector('h2').style.display = 'none';
        } else {
            const loggedinpage = document.getElementById('logged_in');
            const signupAndLogin = document.getElementById('sign_log_in');

            loggedinpage.classList.remove('main_box');
            loggedinpage.classList.add('hide');
            signupAndLogin.classList.remove('hide');
        }
    }
});