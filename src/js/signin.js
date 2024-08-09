import '../css/signup.css'

import $ from 'jquery';
import axios from 'axios';
import * as util from './util.js';

window.$ = $;

$('#signin').click(function () {
  util.clearLocalStorage();
  let username = $("#username").val();
  let password = $("#password").val();

  axios.post(util.default.baseUrl + '/user/sign-in', {
    username: username,
    password: password
  })
    .then(function (response) {
      if (util.isSuccess(response.data)) {
        window.localStorage.setItem("token", util.getData(response.data));
        window.location.href = '/';
      } else {
        document.getElementById('message').textContent = response.data.message;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});