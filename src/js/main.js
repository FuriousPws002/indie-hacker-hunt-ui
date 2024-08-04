// Import our custom CSS
import '../css/index.css'

import $ from 'jquery';
window.$ = $;

$(".card").click(function () {
    window.location.href = "/profile.html";
})