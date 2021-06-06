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
        if(buttonText === 'Settings' || buttonText === 'My list') {
            const tableContent = document.getElementById('my_list_div');
            const settingsDiv = document.getElementById('account_settings');
            
            showAndHide(tableContent, settingsDiv);
        } else if(buttonText === 'Log out'){
            const loggedinpage = document.getElementById('logged_in');
            const signupAndLogin = document.getElementById('sign_log_in');
            const login = document.getElementById('log_in');

            loggedinpage.classList.remove('main_box');
            loggedinpage.classList.add('hide');
            signupAndLogin.classList.remove('hide');
            
        }
    }
    function showAndHide(...elements) {
        elements.forEach(arg => {
            arg.classList.toggle('hide');
            arg.classList.toggle('content');
        });
    }
});
/* Import js file */
function include(file) {
    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('body').item(0).appendChild(script);
}