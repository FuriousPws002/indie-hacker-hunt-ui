// Import our custom CSS
import '../css/index.css'

import $ from 'jquery';

window.$ = $;

$(".card").click(function () {
  let id = $(this).attr("id");
  window.location.href = "/page/profile.html?id=" + id;
})