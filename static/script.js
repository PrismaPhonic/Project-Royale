// UTILITY FUNCTIONS
function scrollToSection(selector) {
  $('html, body').animate({
    scrollTop: $(selector).offset().top
  }, 1500);
};

// YOUTUBE JAVASCRIPT CONTROL
const player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-placeholder', {
    width: '100%',
    height: '100%',
    videoId: 'iWxZiuTX_h4',
    playerVars: {
      color: 'white',
      autoplay: 1,
      controls: 0,
    },
    events: {
      onReady: () => event.target.playVideo(),
      onStateChange: function (e) {
        if (e.data === YT.PlayerState.ENDED) {
          player.playVideo();
        }
      },
    }
  });
}

// JQUERY ON DOCUMENT LOAD
$(document).ready(function () {

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
    if (player.isMuted()) {
      player.unMute();
      $('.fal.fa-volume-up').toggleClass('fa-volume-up fa-volume-slash')
    } else {
      player.mute();
      $('.fal.fa-volume-slash').toggleClass('fa-volume-slash fa-volume-up')
    }

  })
});
