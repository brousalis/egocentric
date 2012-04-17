//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require_tree .

$(document).ready(function() {
  $('.nav input, #register input, .brand input, .guide-new input').input_focus();
  $('.navbar input').attr('autocomplete', 'off');
  $('.alert').alert();
});

// ajax
function ajax_request(url, type, data, success, failure) {
  $.ajax({
    headers: {
      'X-Transaction': 'POST Example',
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    },
    data: data,
    url: url,
    type: type,
    dataType: 'json',
    success: function(e) {
      if (e.status == "success") {
        success(e);
      } else if (e.status == "failure") {
        failure(e);
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
 
 
