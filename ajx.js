
;(function(){

  "use strict";

  function send(method, url, data, opts) {

    var xhr = new XMLHttpRequest(),
        options = {
          async: true,
          success: function() {},
          error: function() {}
        };

    for (var i in opts) {
      if (options.hasOwnProperty(i)) {
        options[i] = opts[i];
      }
    }

    xhr.open(method, url, options.async);

    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {

        var response = xhr.responseText;

        if (xhr.getResponseHeader('Content-Type').indexOf('application/json') === 0) {
          response = JSON.parse(xhr.responseText);
        }

        if (xhr.status == 200 && options.success) {
          options.success(response, xhr.status, xhr);
        } else if (options.error) {
          options.error(response, xhr.status, xhr);
        }
      }
    };

    if (method == 'POST') {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }

    xhr.send(data);
  }

  function get(url, data, options) {
    data = build_query(data);

    if (data) {
      url += '?' + data;
    }

    send('GET', url, null, options);
  }

  function post(url, data, options) {
    data = build_query(data);
    send('POST', url, data, options);
  }

  function build_query(data) {
    var query = [];

    for (var key in data) {
      query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }

    return query.join('&');
  }

  window.ajx = {
    get: get,
    post: post
  };

}());
