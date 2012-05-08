// ajax calls
function like(button) {
  var data = { comment_id: $(button).attr('id') }
  var success = function(e) {
    $(button).parent().parent().find('.count').html(e.count);
    $(button).toggleClass('active'); 
  }
  var failure = function(e) {
    $(button).parent().parent().find('.count').html(e.count);
    $(button).toggleClass('active'); 
  }

  ajax_request('/like', 'post', data, success, failure);
}

function submit_guide(type) {
  var data = { guide:
                { avatar: $('.image').val(),
                  name: $('.name').val(),
                  body: $('.body textarea').val(),
                  category: $('#guide_category').val(),
                  map: $('#guide_map').val(),
                  video: $('.video-url').val() 
                }
              }
  var success = function(e) { window.location.href = e.redirect; }
  var failure = function(e) {
    $('.guides .alert').html("").fadeIn();
    $.each(e.errors, function() {
      $('.guides .alert').append("<div>"+this+"</div>");
    }); 
  }

  ajax_request('/guides', type, data, success, failure);
}

function save_guide(type) {
  var request = function(avatar) {
    var id = $('div[class^="guide-"]').attr('class').replace('guide-','');
    var data = { guide:
                  { avatar: avatar,
                    name: $('.name').val(),
                    body: $('.body textarea').val(),
                    category: $('#guide_category').val(),
                    map: $('#guide_map').val(),
                    video: $('.video-url').val() 
                  }
                }
    var success = function(e) { window.location.href = e.redirect; }
    var failure = function(e) {
      $('.guides .alert').html("").fadeIn();
      $.each(e.errors, function() {
        $('.guides .alert').append("<div>"+this+"</div>");
      }); 
    }

    ajax_request('/guides/'+id, type, data, success, failure);
  }
  var value = $('.image').val();
  if (value == "") value = "url of image";
  $('<img/>').attr('src', value).load(function() { request($('input.image').val()); });   
  $('<img/>').attr('src', value).error(function() { request(""); });   
}
 
function register() {
  var failure = function(e) {
    $('#new_user .alert').html("").fadeIn();
    $.each(e.errors, function() {
      $('#new_user .alert').append("<div>"+this+"</div>");
    });
  }
  var success = function(e) { window.location.href = e.redirect; }

  ajax_request('/users', 'post', $('#new_user').serialize(), success, failure);
}

function avatar(val) {
  var failure = function(e) { $('.brand.avatar input').addClass('failure'); }
  var success = function(e) { window.location.reload() }

  ajax_request('/avatar', 'post', { avatar: val }, success, failure);
}

function login(username, password) {
  var data = { username: username, password: password}
  var failure = function(e) {
    $('.username, .password').addClass('failure');
    $('li.error').fadeIn();
  }
  var success = function(e) { window.location.href = e.redirect; }

  ajax_request('/sessions', 'post', data, success, failure)
}

