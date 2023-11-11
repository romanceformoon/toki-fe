$(document).ready(function () {
  $.getJSON($("meta[name=bmstable]").attr("content"), function (header) {
    $.getJSON(header.data_url, function (data) {
      console.log(data);
    });
  });
});
