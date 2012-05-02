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
  $("input:file").change(function (){
    $('.edit_user').submit();
  });

  $('.brand a img').live('click', function(e) {
    $('.brand.avatar').toggle();
  });

  $('.brand.avatar input').keypress(function(e) {
    if(e.which == 13) {
      avatar($(this).val());
    }
  });

  // cool
  var c = 1
  $('.leaderboard li').each(function() {
    if (c <= 3) { $(this).prepend('<span class="medal"></span>'); }
    c = c + 1
  });

    
  $('.ad-tip').tooltip({ placement: 'left', trigger: 'manual' }); 
  $('.carousel-inner').hover(function() { $(this).find('.ad-tip').tooltip('show') },
                            function() { $(this).find('.ad-tip').tooltip('hide') });

  $('.time').tooltip({ placement: 'right', trigger: 'manual' }); 
  $('.activities li').hover(function() { $(this).find('.time').tooltip('show') },
                            function() { $(this).find('.time').tooltip('hide') });

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

  $('#user_username').keyup( function() {
    var $this = $(this);
    if($this.val().length > 18)
      $this.val($this.val().substr(0, 18));     
  }); 

});
