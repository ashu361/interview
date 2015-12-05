function flatInterview(interview, response) {
  var flat = [];
  for (var i in interview) {
    var question_id = interview[i].id;
    var value = response[question_id];
    flat.push(interview[i]);
    if (interview[i].children && interview[i].children[value]) {
      var children = interview[i].children[value];
      flat = flat.concat(flatInterview(children, response));
    }
  }
  return flat;
}

function addStyle() {
  var formWrap = document.getElementById('fs-form-wrap');

  [].slice.call(document.querySelectorAll('select.cs-select')).forEach(function (el) {
    new SelectFx(el, {
      stickyPlaceholder: false,
      onChange: function (val) {
        document.querySelector('span.cs-placeholder').style.backgroundColor = val;
      }
    });
  });

  new FForm(formWrap, {
    onReview: function () {
      classie.add(document.body, 'overview'); // for demo purposes only
    }
  });
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function removeParam(key, sourceURL) {
  var rtn = sourceURL.split("?")[0],
      param,
      params_arr = [],
      queryString = sourceURL.indexOf("?") !== -1 ? sourceURL.split("?")[1] : "";
  if (queryString !== "") {
    params_arr = queryString.split("&");
    for (var i = params_arr.length - 1; i >= 0; i -= 1) {
      param = params_arr[i].split("=")[0];
      if (param === key) {
        params_arr.splice(i, 1);
      }
    }
    rtn = rtn + "?" + params_arr.join("&");
  }
  return rtn;
}

function login() {
  console.log('Loging');
  var login_data = {
    'email': $("input[name=email]").val(),
    'password': $("input[name=password]").val()
  };
  $.ajax({
    url: login_url,
    contentType: "application/json; charset=utf-8",
    cache: false,
    type: 'POST',
    data: JSON.stringify(login_data),
    success: function (result) {
      console.log(JSON.stringify(result));
      currentUser = result.data.user;
      window.localStorage.setItem('indifi.token', result.data.token);
      window.localStorage.setItem('user', JSON.stringify(currentUser));
      window.location = 'home.html';
    },
    error: function (xhr, status, err) {
      alert('loginError');
    }
  });
}