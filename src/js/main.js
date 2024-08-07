// Import our custom CSS
import '../css/index.css'

import $ from 'jquery';

window.$ = $;

$("#avatar").click(function () {
  openPopupForm();
})

$(".card").click(function () {
  let id = $(this).attr("id");
  window.location.href = "/page/profile.html?id=" + id;
})

function openPopupForm() {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');

  popup.style.display = 'block';
  overlay.style.display = 'block';
}

overlay.addEventListener('click', function () {
  popup.style.display = 'none';
  overlay.style.display = 'none';
})