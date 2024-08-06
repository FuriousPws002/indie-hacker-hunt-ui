import '../css/signup.css'

import $ from 'jquery';

window.$ = $;

$('#signin').click(function () {
    let username = $("#username").val();
    let password = $("#password").val();

    console.log(username);
    console.log(password);
});