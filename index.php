<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="/resources/demos/style.css">
    <link rel="stylesheet" href="style/style.css">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <title>To-do manager</title>
</head>
<body>
    <div id="wrapper">

        <!-- Sign in or register an account -->
        <div id="sign_log_in">
            <h2>My to-do application</h2>
            <form>
                <label for="">Already signed up?</label>
                <input type="button" value="Log In">
                <label for="">Don't have an account?</label>
                <input type="button" value="Sign up!">
            </form>
        </div>

        <!-- Registerpage -->
        <div id="sign_up" class="hide">
            <h2>Sign up!</h2>
            <form id='sign_up_form'>
                <label for="first_name">First name</label>
                <input id='first_name' type="text">
                <label for="last_name">Last name</label>
                <input id='last_name' type="text">
                <label for="email">Email</label>
                <input id='email' type="text">
                <label for="password">Password</label>
                <input id='password' type="password">
                <label for="">I agree to the Terms of Use</label>
                <input id="aggreTerms" type="checkbox">
                <input id="register_btn" type="button" value="Register">
            </form>
        </div>

        <!-- Loginpage -->
        <div id="log_in" class="hide">
            <h2>Login</h2>
            <form id="login_form">
                <label for="email_log">Email</label>
                <input id="email_log" type="text">
                <label for="psw_log">Password</label>
                <input id="psw_log" type="password">
                <input id="login_btn" type="button" value="Login"> 
            </form>
        </div>

        <!-- User logged in page -->
        <div id="logged_in" class="hide">

            <!-- Logged in main menu -->
            <div class="top_menu">
                <h2>Welcome <span id='welcome_name'></span><span id='welcome_email' class='hide'></span></h2>
                <form>
                    <input type="button" value="My list">
                    <input type="button" value="Settings">
                    <input type="button" value="Log out">
                </form>
            </div>
            
            <!-- To-do list -->
            <div class="main_content">
                
                <!-- My list div-->
                <div id='my_list_div'>
                    <div id='my_list_div_menu'>
                        <form>
                            <input id="existing_lists_btn" type="button" value="Existing lists">
                            <input type="button" value="Create new">
                        </form>
                    </div>
                    <div id="existing_lists" class="my_list_box">
                        <h2>Existing lists</h2>
                        <div id="registered_list_box"></div>
                    </div>
                    <div id="create_new_list" class="hide">
                        <h2>Create new To-Do list</h2>
                        <form>
                            <label id='new_list_name_label'>Name:</label>
                            <input id="new_list_name" type="text">
                            <input id="save_list_name" type="button" value="Save">

                            <label id='activity_name_label' for="activity_name" class="hide">Activity name:</label>
                            <input id='activity_name' type="text" class="hide">
                            <label id="datepicker_label" for="datepicker" class="hide">Deadline</label>
                            <input id="datepicker" class="hide" type="text">
                            <input id="add_activity_btn" type="button" class="hide" value="Add">
                            
                        </form>
                        <p>Unnamed to-do list</p>
                        <table id='new_list_Table'>
                            <thead>
                                <tr>
                                    <th>Activity</th>
                                    <th>Timestamp</th>
                                    <th>Deadline</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <input id="save_created_list" type="button" value="Save">
                    </div>
                </div>
                
                <!-- Account settings page -->
                <div id="account_settings" class="hide">
                    <h2>Account settings</h2>
                    <form id='settings_form'>
                        <label>First name</label>
                        <input type="text">
                        <label>Last name</label>
                        <input type="text">
                        <label>Email</label>
                        <input type="text">
                        <label>Password</label>
                        <input type="text">
                        <label>Password</label>
                        <input type="text">
                        <input type="button" value="Modify">
                    </form>
                </div>

            </div>
            <div class="footer">
                <h2>Created by: Adam Letenyei - <a href="">Project Pannonia</a></h2>
            </div>
        </div>

    </div>

    <script type="text/javascript" src="js/script.js"></script>
</body>
</html>