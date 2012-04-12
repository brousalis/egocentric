$(document).ready(function() {

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

  // change avatar
  $('.brand a img').live('click', function(e) {
    $('.brand.avatar').toggle();
  });

  $('.brand.avatar input').keypress(function(e) {
    if(e.which == 13) {
      avatar($(this).val());
    }
  });

  // register
  var reg = true;
  $('#register').modal('hide');

  $('.hide-register, .show-register').live('click', function(e) {
    e.preventDefault();
    $('.register, #user_email, #user_password_confirmation, .have-account').toggle();
    reg = !reg
  });

  $('.submit').live('click', function(e) {
    e.preventDefault();
    if (reg) {
      register();
    } else {
      login($('#user_username').val(), $('#user_password').val());
    }
  });

});
