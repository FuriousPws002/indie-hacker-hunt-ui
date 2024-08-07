import '../css/index.css'

import $ from 'jquery';
import axios from 'axios';

window.$ = $;

init();

function init() {
  console.log(window.location.href);

  axios.get('http://localhost:8080/test', {
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });



  console.log("===" + window.location.href);
}
