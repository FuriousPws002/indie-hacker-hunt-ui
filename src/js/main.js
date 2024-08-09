// Import our custom CSS
import '../css/index.css'

import $ from 'jquery';
import axios from 'axios';
import * as util from './util.js';

window.$ = $;

init_();

$("#avatar").click(function () {
  openPopupForm();
})

// $(".card").click(function () {
//   let id = $(this).attr("id");
//   window.location.href = "/page/profile.html?id=" + id;
// })

// $(document).on("click", $(".card"), function () {
//   let id = $(this).attr("id");
//   window.location.href = "/page/profile.html?id=" + id;
// })


function init_() {
  $(".not-login").hide();
  $(".login").hide();

  if (util.isLogin()) {
    $(".not-login").hide();
    let info = detail('');
    $("#avatar").attr("src", info.avatar);
    $(".login").show();
  } else {
    $(".not-login").show();
    $(".login").hide();
  }

  listCard();




}

$("#save-profile").click(function () {
  axios.post(util.default.baseUrl + '/user/edit', {
    role: $("#role").val(),
    looking: $("#looking").val(),
    nickname: $("#nickname").val(),
    email: $("#email").val(),
    twitter: $("#twitter").val(),
    github: $("#github").val(),
    reddit: $("#reddit").val(),
    website: $("#website").val(),
    ability: $("#ability").val(),
    intro: $("#intro").val()
  }, {
    headers: {
      'token': util.getToken()
    }
  })
    .then(function (response) {
      if (util.isSuccess(response.data)) {
        closePopupForm();
      }
    })
    .catch(function (error) {
      console.log(error);
      closePopupForm();
    });
});


function detail(uuid) {
  let val;
  $.ajax({
    url: util.default.baseUrl + '/user/detail?uuid=' + uuid,
    headers: {
      'token': util.getToken()
    },
    type: "post",
    async: false,
    success: function (data) {
      val = data.result;
    }
  });
  return val;
}

/**
 * 
 * @returns async
 */
function listCard() {
  let val;
  $.ajax({
    url: util.default.baseUrl + '/user/list',
    headers: {
      'token': util.getToken()
    },
    type: "post",
    success: function (data) {

      // for (let i = 0; i < 10; i++) {
      //   $("#partner").append(
      //     "            <div class=\"card\" id='123'>\n" +
      //     "                <div class=\"card-head\">\n" +
      //     "                    <img src=\"images/avatar.png\" alt=\"\">\n" +
      //     "                    <div>\n" +
      //     "                        <p><strong class=\"card-head-nickname\"></strong></p>\n" +
      //     "                        <p><strong class=\"card-head-role\">Developers</strong></p>\n" +
      //     "                    </div>\n" +
      //     "                </div>\n" +
      //     "                <div class=\"card-tech\">\n" +
      //     "                    <p><span><strong>Ability:</strong></span><span\n" +
      //     "                            class=\"cad-tech-content\">java,spring,MySql,Mybatis,Redis,MQ</span></p>\n" +
      //     "                </div>\n" +
      //     "                <div class=\"card-intro\">\n" +
      //     "                    <p><strong>Intro:</strong></p>\n" +
      //     "                    <p class=\"cad-intro-content\">Indie hacker hunt is a platform that links developers and marketers...\n" +
      //     "                    </p>\n" +
      //     "                </div>\n" +
      //     "            </div>"
      //   )
      // }
      // onclick="window.location.href= /page/profile?id="+item['uuid']+";return false"
      // onclick="window.location.href= /page/profile?id=123;return false"

      data.result.forEach((item) => {
        $("#partner").append(
          "<div class=\"card\" onclick=\"window.location.href='/page/profile.html?id=" + item['uuid'] + "'\">\n" +
          "                <div class=\"card-head\">\n" +
          "                    <img src=\"" + item['avatar'] + "\" alt=\"\">\n" +
          "                    <div>\n" +
          "                        <p><strong class=\"card-head-nickname\">" + item['nickname'] + "</strong></p>\n" +
          "                        <p><strong class=\"card-head-role\">" + item['role'] + "</strong></p>\n" +
          "                    </div>\n" +
          "                </div>\n" +
          "                <div class=\"card-tech\">\n" +
          "                    <p><span><strong>Ability:</strong></span><span\n" +
          "                            class=\"cad-tech-content\">" + item['ability'] + "</span></p>\n" +
          "                </div>\n" +
          "                <div class=\"card-intro\">\n" +
          "                    <p><strong>Intro:</strong></p>\n" +
          "                    <p class=\"cad-intro-content\">" + item['intro'] + "\n" +
          "                    </p>\n" +
          "                </div>\n" +
          "            </div>"
        )
      });
    }
  });
  return val;
}

function openPopupForm() {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');

  popup.style.display = 'block';
  overlay.style.display = 'block';

  let info = detail('');

  $("#profile-form").find("input").each(function (index, value) {
    let id = $(this).attr("id");
    $(this).val(info[id]);
  })

  $("#intro").val(info['intro']);
}

function closePopupForm() {
  popup.style.display = 'none';
  overlay.style.display = 'none';
}

overlay.addEventListener('click', function () {
  closePopupForm();
})