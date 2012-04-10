//
//= require_tree .
//= require jquery
//= require jquery_ujs
//= require bootstrap

$(document).ready(function() {
  // inputs
  $('input').input_focus();
  $('.navbar input').attr('autocomplete', 'off');
  $('.alert').alert();
  // login
  $('.login').live('click', function(e) {
    e.preventDefault();
    login($('.username').val(), $('.password').val());
  });
  $('.password').keypress(function(e) {
    if(e.which == 13) {
      login($('.username').val(), $('.password').val());
    }
  });

  // register
  var reg = true;
  $('#register').modal('hide');
  $('.hide-register, .show-register').live('click', function(e) {
    e.preventDefault();
    $('.register, #user_email, #user_password_confirmation, .have-account').toggle();
    reg= !reg
  });
  $('.submit').live('click', function(e) {
    e.preventDefault();
    if (reg) {
      register();
    } else {
      login($('#user_username').val(), $('#user_password').val());
    }
  });
  $('a').live('ajax:complete', function(xhr, status) {
    $(".ajaxful-rating-wrapper").replaceWith(status.responseText)
  });
  // guides
  var add = false, preview = false;
  $('.guides .preview').live('click', function(e) {
    e.preventDefault();
    $('.guides textarea').toggle();
    $('.guides #preview').toggle();
    $('.guides .video').toggle();
    $('.guides .preview').toggleClass('active');
    preview = !preview;
  });
  $('.add-video').live('click', function(e) {
    e.preventDefault();
    $('.youtube').attr("src", $('.video-url').val()).fadeIn();
  });
  $('.add-image').live('click', function(e) {
    e.preventDefault();
    url = "url('" + $('input.image').val() + "')";
    $('.header').css('background', url);
    $('.add').fadeOut();
    add = true;
  });
  $('.header').hover(function() {
    if (add == true && preview == true) $('.add').fadeIn();
  }, function() {
    if (add == true) $('.add').fadeOut();
  });
  $('.guides .submit').live('click', function(e) {
    e.preventDefault();
    submit_guide();
  });
  $('.like a').live('click', function(e) {
    e.preventDefault();
    like(this);
  });
});

function like(button) {
  cid = $(button).parent().parent().parent().parent().attr("id").replace("comment_", "");
  $.ajax({
    headers: {
      'X-Transaction': 'POST Example',
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    },
    data: { comment_id: parseInt(cid) },
    url: "/like",
    type: "post",
    dataType: 'json',
    success: function(e) {
      console.log(e);
      if (e.status == "success") {
        $(button).parent().parent().find('.count').html(e.count);
        $(button).toggleClass('active');
      } else if(e.status == "already likes") {
        $(button).parent().parent().find('.count').html(e.count);
        $(button).toggleClass('active');
      }
    }
  });  
}

function submit_guide() {
  var data = { guide: 
                { avatar: $('.header').css('background'),
                  name: $('.name').val(),
                  body: $('.body textarea').val(),   
                  category: $('#guide_category').val(),
                  video: $('.video-url').val() 
                }
              }
      
  $.ajax({
    headers: {
      'X-Transaction': 'POST Example',
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    },
    data: data,
    url: "/guides",
    type: "post",
    dataType: 'json',
    success: function(e) {
      if (e.status == "failure") {
        $('.guides .alert').html("").fadeIn();
        $.each(e.errors, function() {
          $('.guides .alert').append("<div>"+this+"</div>");
        });
      } else if (e.status == "success" && e.redirect) {
        window.location.href = e.redirect;
      }
    }
  });   
}

function register() {
  $.ajax({
    headers: {
      'X-Transaction': 'POST Example',
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    },
    data: $('#new_user').serialize(),
    url: "/users",
    type: "post",
    dataType: 'json',
    success: function(e) {
      if (e.status == "failure") {
        $('#new_user .alert').html("").fadeIn();
        $.each(e.errors, function() {
          $('#new_user .alert').append("<div>"+this+"</div>");
        });
      } else if (e.status == "success" && e.redirect) {
        window.location.href = e.redirect;
      }
    }
  });  
}

(function() {
// When using more than one `textarea` on your page, change the following line to match the one you’re after
var textarea = document.getElementsByTagName('textarea')[0],
    preview = document.createElement('div'),
    converter = new Markdown.Converter().makeHtml;
function update() {
 preview.innerHTML = converter(textarea.value);
}
// Continue only if the `textarea` is found
if (textarea) {
 preview.id = 'preview';
 // Insert the preview `div` after the `textarea`
 textarea.parentNode.insertBefore(preview, textarea.nextSibling);
 textarea.oninput = function() {
  textarea.onkeyup = null;
  update();
 };
 textarea.onkeyup = update;
 // Trigger the `onkeyup` event
 textarea.onkeyup.call(textarea);
};
}());



function login(username, password) {
  $.ajax({
    headers: {
      'X-Transaction': 'POST Example',
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    },
    data: { username: username, password: password},
    url: "/sessions",
    type: "post",
    dataType: 'json',
    success: function(e) {
      if (e.status == "failure") {
        $('.username, .password').addClass('failure');
        $('li.error').fadeIn();
      }
      if (e.status == "success" && e.redirect) {
        window.location.href = e.redirect;
      }
    }
  }); 
}
 
$.fn.input_focus = function() {
  return $(this).each(function() {
    var default_value = $(this).val();
    $(this).focus(function() {
      if($(this).val() == default_value) $(this).val("");
    }).blur(function(){
      if($(this).val().length == 0) $(this).val(default_value);
    });
  });
}
 

