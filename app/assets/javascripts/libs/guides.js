$(document).ready(function() {
  var add = false, preview = false;

  // new guides
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

  $('a').live('ajax:complete', function(xhr, status) {
    $(".ajaxful-rating-wrapper").replaceWith(status.responseText)
  });

  // comments
  $('.like a').live('click', function(e) {
    e.preventDefault();
    like(this);
  });

  $('.sidebar-comment').click(function(e) {
    $('html, body').animate({ 
       scrollTop: $("#comment-list").offset().top - 60}
    );
  });

  $('.reply').click(function(e) {
    $('html, body').animate({ 
       scrollTop: $(document).height()-$(window).height()}
    );
  }); 

  //index
  $('#source li a').on("click", function(e) {
    e.preventDefault();
    $('#source li a').each(function() { $(this).removeClass('active') } );
    var filter = $(this).attr('class');
    $(this).addClass('active');
    if(filter == 'all') {
      $('#guides li.out').fadeIn('slow').removeClass('out');
    } else {
      $('#guides li').each(function() {
        if(!$(this).hasClass(filter)) { $(this).fadeOut('slow').addClass('out'); }
        else { $(this).fadeIn('slow').removeClass('out'); }
      });
    }
  });
 
  $('.searchbox').search('#guides li a .name', function(on) {
    on.all(function(results) { });
    on.reset(function() {
      $('#guides li').show();
    });
    on.empty(function() {
      $('#guides li').hide();
    });
    on.results(function(results) {
      $('#guides li').hide();
      results.parent().parent().show();
    });
  });

});

jQuery.expr[':'].Contains = function(a, i, m) { 
  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
};

(function($) {
  var Search = function(block) {
    this.callbacks = {};
    block(this);
  }

  Search.prototype.all = function(fn) { this.callbacks.all = fn; }
  Search.prototype.reset = function(fn) { this.callbacks.reset = fn; }
  Search.prototype.empty = function(fn) { this.callbacks.empty = fn; }
  Search.prototype.results = function(fn) { this.callbacks.results = fn; }

  function query(selector) {
    if (val = this.val()) {
      return $(selector + ':Contains("' + val + '")');
    } else {
      return false;
    }
  }

  $.fn.search = function search(selector, block) {
    var search = new Search(block);
    var callbacks = search.callbacks;

    function perform() {
      if (result = query.call($(this), selector)) {
        callbacks.all && callbacks.all.call(this, result);
        var method = result.size() > 0 ? 'results' : 'empty';
        return callbacks[method] && callbacks[method].call(this, result);
      } else {
        callbacks.all && callbacks.all.call(this, $(selector));
        return callbacks.reset && callbacks.reset.call(this);
      };
    }

    $(this).live('keypress', perform);
    $(this).live('keydown', perform);
    $(this).live('keyup', perform);
    $(this).bind('blur', perform);
  }
})(jQuery);
