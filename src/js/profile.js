import '../css/index.css'

import $ from 'jquery';
import axios from 'axios';
import * as util from './util.js';

window.$ = $;

init();

function init() {
  let uuid = util.getQueryVariable("id");
  if (util.isNull(uuid)) {
    uuid = '';
  }
  $.ajax({
    url: util.default.baseUrl + '/user/detail?uuid=' + uuid,
    headers: {
      'token': util.getToken()
    },
    type: "post",
    success: function (data) {
      let info = data.result;

      console.log(info);

      $(".detail-head-left img").attr("src",info.avatar)

      $(".detail").find("*[id]").each(function (index, value) {
        let id = $(this).attr("id");
        $(this).text(info[id]);
      })
    }
  });
}
