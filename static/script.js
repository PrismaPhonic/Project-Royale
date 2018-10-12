// UTILITY FUNCTIONS
function scrollToSection(selector) {
  $('html, body').animate({
    scrollTop: $(selector).offset().top
  }, 1500);
};

function toggleMuteIcon() {
  $('.fal').toggleClass('fa-volume-up fa-volume-slash')
}

// YOUTUBE JAVASCRIPT CONTROL
window.player = undefined;

window.onYoutubeIframeAPIReady = function (callback) {
  callback();
};

// JQUERY ON DOCUMENT LOAD
$(document).ready(function () {

  //YOUTUBE CALLBACK ON DOM READY TO SPEED UP PAGE LOAD
  window.onYoutubeIframeAPIReady(function () {
    window.player = new YT.Player('video-placeholder', {
      width: '100%',
      height: '100%',
      videoId: 'iWxZiuTX_h4',
      playerVars: {
        color: 'white',
        autoplay: 1,
        controls: 0,
      },
      events: {
        onReady: (event) => event.target.playVideo(),
        onStateChange: function (e) {
          if (e.data === YT.PlayerState.ENDED) {
            window.player.playVideo();
          }
        },
      }
    });
  });

  // EVENT HANDLERS
  // NAVBAR LINK SCROLLING ANIMATION
  $('.navbar-nav').on('click', 'a', function (event) {
    event.preventDefault();
    let elem = $(this);
    let section = `#${elem.attr('id').match(/\w+(?=-)/)[0]}`
    scrollToSection(section);
  });

  // HERO SECTION LISTEN BUTTON SCROLL
  $('#hero a').on('click', function () {
    scrollToSection('#music')
  });

  // HANDLE MUTING VIDEO ELEGANTLY
  $('.volume').on('click', function () {
    if (window.player.isMuted()) {
      window.player.unMute();
      toggleMuteIcon();
    } else {
      window.player.mute();
      toggleMuteIcon();
    }
  })
});
