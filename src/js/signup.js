import '../css/signup.css'

import $ from 'jquery';
import axios from 'axios';
import * as util from './util.js';

window.$ = $;

$('#submit').click(function () {
    util.clearLocalStorage();
    let username = $("#username").val();
    let password = $("#password").val();
    let confirmPassword = $("#confirmPassword").val();
    let message = document.getElementById('message');
    let usernameError = document.getElementById('usernameError');
    let passwordError = document.getElementById('passwordError');
    let confirmPasswordError = document.getElementById('confirmPasswordError');

    if (username === '') {
        usernameError.textContent = 'Username must not be null';
        return;
    }
    if (!validateUsername(username)) {
        usernameError.textContent = 'Username does not meet the requirements.';
        return;
    }

    if (password === '') {
        passwordError.textContent = 'Password must not be null';
        return;
    }
    if (!validatePassword(password)) {
        passwordError.textContent = 'Password does not meet the requirements.';
        return;
    }

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match!';
        return;
    }

    axios.post(util.default.baseUrl + '/user/sign-up', {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
    })
        .then(function (response) {
            if (util.isSuccess(response.data)) {
                window.localStorage.setItem("token", util.getData(response.data));
                window.location.href = '/';
            } else {
                message.textContent = response.data.message;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
});



document.getElementById('username').addEventListener('focus', function () {
    usernameError.textContent = '';
});


document.getElementById('password').addEventListener('focus', function () {
    passwordError.textContent = '';
});


document.getElementById('confirmPassword').addEventListener('focus', function () {
    confirmPasswordError.textContent = '';
});

function validateUsername(username) {
    let regex = /^[a-z0-9_-]{3,16}$/;
    return regex.test(username);
}

function validatePassword(password) {
    let regex = /^[a-z0-9_-]{6,18}$/;
    return regex.test(password);
}

