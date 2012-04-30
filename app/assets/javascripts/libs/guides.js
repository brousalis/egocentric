$(document).ready(function() {
  var add = false;

  // new guides
  $('.guides .preview').live('click', function(e) {
    $('.guides textarea').toggle();
    $('.guides #preview').toggle();
    $('.guides .video').toggle();
    $('.guides .preview').toggleClass('active');
    if (add == false) {
      $('.header').toggleClass('no-avatar');
      $('.add').toggle();
    }
    return false;
  });

 $('.add-video').live('click', function(e) {
    var url = $('.video-url').val();
    if (url.indexOf('youtube') == -1) {
      alert("Enter a valid youtube url");
      return false;
    }
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[7].length==11){
        url = match[7];
    }
    $('.video-url').val(url);
    $('.youtube').attr("src", "http://www.youtube.com/embed/"+url).fadeIn();
    return false;
  });

  $('.add-image').live('click', function(e) {
    url = "url('" + $('.image').val() + "')";
    $('<img/>').attr('src', $('.image').val()).load(function() { 
      $('.image').removeClass('error');
      $('.header').css('background', url);
      $('.add').fadeTo('slow', 0.5);
      add = true;
    });
    $('<img/>').attr('src', $('.image').val()).error(function() { 
      $('.image').addClass('error');
    });
    return false;
  });

  $('.guides .submit').live('click', function(e) {
    submit_guide('post');
    return false;
  });

  $('.guides .save').live('click', function(e) {
    save_guide('put');
    return false;
  });  

  $('.delete').live('click', function(e) {
    delete_guide($(this).attr('href'));
    return false;
  });

  $('.remove-image').live('click', function(e) {
    $('.header').css('background', 'none');
    $('.image').val('url of image');
    $('.add').fadeTo('slow', 1);
    add = false;
    return false;
  });

  $('.remove-video').live('click', function(e) {
    $('.youtube').attr('src', '').hide();
    $('.video-url').val('url of video');
    return false;
  });

  $('.header').hover(function() {
    if (add) $('.add').fadeTo('fast', 1);
  }, function() {
    if (add) $('.add').fadeTo('fast', 0.5);
  });
 
  $('textarea').autogrow();

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

  /*var carousel = $('#promo-slider').carousel({
    interval: false
  });
  $('#promo-slider .item').live('click', function() {
    carousel.carousel('next');
  });*/

  /*var $sidebar = $(".scroll");
  if ($sidebar.length != 0) {
    var $window    = $(window),
        offset     = $sidebar.offset(),
        topPadding = 15;

    if ($sidebar.hasClass("index")) topPadding = 55;
    $window.scroll(function() {
        console.log(offset.top);
        if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
            $sidebar.stop().animate({
                marginTop: 0
            });
        }
    });
  }*/

  //index
  $('#source li a').on("click", function(e) {
    $('#source li a').each(function() { $(this).removeClass('active') } );
    var filter = $(this).attr('class');
    $(this).addClass('active');
    if(filter == 'all') {
      $('#guides li.out').fadeIn('slow').removeClass('out');
    } else {
      $('#guides li:not(.show-value)').each(function() {
        if(!$(this).hasClass(filter)) { 
          $(this).fadeOut('slow').addClass('out'); 
        } else { 
          $(this).fadeIn('slow').removeClass('out');
        }
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
      $('.no-guides').hide();
    });
    on.empty(function() {
      $('#guides li').hide();
      $('.no-guides').show();
    });
    on.results(function(results) {
      $('#guides li').hide();
      $('.no-guides').hide();
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

(function($)
{
    $.fn.autogrow = function(options)
    {
        return this.filter('textarea').each(function()
        {
            var self                                = this;
            var $self                               = $(self);
            var minHeight                           = $self.height();
            var noFlickerPad                        = $self.hasClass('autogrow-short') ? 0 : parseInt($self.css('lineHeight'));

            var shadow = $('<div></div>').css({
                position:   'absolute',
                top:        -10000,
                left:       -10000,
                width:      $self.width(),
                fontSize:   $self.css('fontSize'),
                fontFamily: $self.css('fontFamily'),
                fontWeight: $self.css('fontWeight'),
                lineHeight: $self.css('lineHeight'),
                resize:     'none'
            }).appendTo(document.body);

            var update = function()
            {
                var times = function(string, number)
                {
                    for (var i=0, r=''; i<number; i++) r += string;
                    return r;
                };

                var val = self.value.replace(/</g, '&lt;')
                                    .replace(/>/g, '&gt;')
                                    .replace(/&/g, '&amp;')
                                    .replace(/\n$/, '<br/>&nbsp;')
                                    .replace(/\n/g, '<br/>')
                                    .replace(/ {2,}/g, function(space){ return times('&nbsp;', space.length - 1) + ' ' });

                shadow.css('width', $self.width());
                shadow.html(val);
                $self.css('height', Math.max(shadow.height() + noFlickerPad, minHeight));
            }

            $self.change(update).keyup(update).keydown(update);
            $(window).resize(update);

            update();
        });
    };
})(jQuery);
