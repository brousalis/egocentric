// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require_tree .

$(window).load(function() {
  $("#slider").orbit({directionalNav: false, animationSpeed: 1200, advanceSpeed: 5000}); 
});

$(document).ready(function(){
  new jPlayerPlaylist({
    jPlayer: "#jquery_jplayer_1",
    cssSelectorAncestor: "#jp_container_1"
  }, [
    { title:"Cricket", mp3:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/mp3/Deftones-Prince.mp3", oga:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/ogg/Deftones-Prince.ogg" },
    { title:"Slide on Down", mp3:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/mp3/AliceInChains-CheckMyBrain.mp3", oga:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/ogg/AliceInChains-CheckMyBrain.ogg" },
    { title:"Why Are You Such A Bitch", mp3:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/mp3/AliceInChains-CheckMyBrain.mp3", oga:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/ogg/AliceInChains-CheckMyBrain.ogg" },
    { title:"Midnight Rain", mp3:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/mp3/AliceInChains-CheckMyBrain.mp3", oga:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/ogg/AliceInChains-CheckMyBrain.ogg" },
    { title:"Elenor Rigby > Breath", mp3:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/mp3/AliceInChains-CheckMyBrain.mp3", oga:"http://themeforest.brutal-design.com/html/musicpro/assets/audio/live-preview/ogg/AliceInChains-CheckMyBrain.ogg" }
  ], {
    swfPath: "js",
    supplied: "mp3",
    wmode: "window",
    playlistOptions: {
       autoPlay : false
    }
  });

  $('.content').click(function(e) {
    e.preventDefault();
    $('.orbit-wrapper').fadeOut();
    $('#top').animate({height:"700px"}, 500).css({background:"url('/assets/black.png')"});
    $('#ajax').delay(800).fadeIn();
  });
  $('.close').click(function(e) {
    e.preventDefault();
    $('#ajax').fadeOut();
    $('#top').animate({height:"410px"}, 500).css({background:"none"});
    $('.orbit-wrapper').delay(800).fadeIn();
  });
});
