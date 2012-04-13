$(document).ready(function() {
  var add = false, preview = false;

  // new guides
  $('.guides .preview').live('click', function(e) {
    $('.guides textarea').toggle();
    $('.guides #preview').toggle();
    $('.guides .video').toggle();
    $('.guides .preview').toggleClass('active');
    preview = !preview;
    return false;
  });
 
 $('.add-video').live('click', function(e) {
    var url = $('.video-url').val();
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[7].length==11){
        url = match[7];
    }
    $('.video-url').val(url);
    $('.youtube').attr("src", "http://youtube.com/embed/"+url).fadeIn();
    return false;
  });

  $('.add-image').live('click', function(e) {
    url = "url('" + $('input.image').val() + "')";
    $('.header').css('background', url);
    $('.add').fadeOut();
    add = true;
    return false;
  });

  $('.header').hover(function() {
    if (add == true && preview == true) $('.add').fadeIn();
  }, function() {
    if (add == true) $('.add').fadeOut();
  });

  $('.guides .submit').live('click', function(e) {
    submit_guide();
    return false;
  });

  $('.rating a').live('ajax:complete', function(xhr, status) {
    $(".ajaxful-rating-wrapper").replaceWith(status.responseText)
  });

  $('.guides .page .body textarea').autogrow();

  // comments
  $('.like a').live('click', function(e) {
    like(this);
    return false;
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
    return false;
  });
 
  $('.searchbox').search('#guides li a .name', function(on) {
    on.all(function(results) {
      $('#source li a').each(function() { $(this).removeClass('active') } );
      $('#source li a.all').addClass('active')
    });
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

  $('.name').keyup( function() {
    var $this = $(this);
    if($this.val().length > 36)
      $this.val($this.val().substr(0, 36));     
  });

  $('.filter').live('click', function(e) {
    $('.filter').each(function() { $(this).removeClass('active') });
    $(this).addClass('active');
    $('.ajax').fadeIn();
    $.getScript(this.href);
    return false;
  });

  $('.sorting a').live('click', function(e) {
    $(this).addClass('active');
    $('.ajax').fadeIn();
    var url = document.location.href + "/reload_comments"
    $.ajax({
      headers: {
        'X-Transaction': 'POST Example',
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      data: { filter: $(this).attr('id') },
      url: url,
      type: 'get',
      success: function(e) {
        console.log(e);
        $('#comment-list').html(e);
      }
    }); 
    return false;
  });

  $('.line').live('click', function(e) {
    $(this).parent().parent().toggleClass('closed');
    $(this).parent().parent().parent().find('.replies').toggle();
    return false;
  });

  $('.collapse-all').live('click', function(e) {
    $('.comment').each(function() { $(this).addClass('closed'); });
    return false;
  });
  $('.collapse-none').live('click', function(e) {
    $('.comment').each(function() { $(this).removeClass('closed') });
    return false;
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

(function($) {
  $.fn.autogrow = function(options) {
    this.filter('textarea').each(function() {
      var $this       = $(this),
          minHeight   = $this.height(),
          lineHeight  = $this.css('lineHeight');
      var shadow = $('<div></div>').css({
          position:   'absolute',
          top:        -10000,
          left:       -10000,
          width:      $(this).width(),
          fontSize:   $this.css('fontSize'),
          fontFamily: $this.css('fontFamily'),
          lineHeight: $this.css('lineHeight'),
          resize:     'none'
      }).appendTo(document.body);
      var update = function() {
          
          var val = this.value.replace(/</g, '&lt;')
                              .replace(/>/g, '&gt;')
                              .replace(/&/g, '&amp;')
                              .replace(/\n/g, '<br/>');
          
          shadow.html(val);
          $(this).css('height', Math.max(shadow.height() + 20, minHeight));
      }
      $(this).change(update).keyup(update).keydown(update);
      update.apply(this);
    });
    return this;
  }
})(jQuery);
