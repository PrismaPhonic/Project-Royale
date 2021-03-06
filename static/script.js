// UTILITY FUNCTIONS
function scrollToSection(selector) {
  $('html, body').animate({
    scrollTop: $(selector).offset().top
  }, 1500);
}

function toggleMuteIcon() {
  $('.fal').toggleClass('fa-volume-up fa-volume-slash')
}

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-placeholder', {
    width: '100%',
    height: '100%',
    videoId: 'iWxZiuTX_h4',
    playerVars: {
      color: 'white',
      controls: 0,
      mute: 1
    },
    events: {
      // onReady: (event) => event.target.playVideo(),
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
  // PROGRAMATICALLY ADD JQUERY API AFTER DOM LOADS
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = "https://www.youtube.com/iframe_api";

  $("body").append(script);

  // PROGRAMATICALLY ADD SPOTIFY IFRAME AFTER DOM LOADS
  let spotifyString = `<iframe src="https://open.spotify.com/embed/track/4aCgtybHFjKVyuKrIilKWp" style="border: 0; width: 100%; height: 380px;" allowfullscreen></iframe>`;
  let $spotifyIframe = $.parseHTML(spotifyString);

  $("#music .flex-col").append($spotifyIframe);

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

  // VIDEO PLAYER EVENT HANDLERS
  // PLAY VIDEO ON SCROLL
  var hasPlayed = false;
  $(window).on('scroll', function () {
    if (!hasPlayed) {
      player.playVideo();
      hasPlayed = true;
    }
  })

  // HANDLE MUTING VIDEO ELEGANTLY
  $('.volume').on('click', function () {
    if (player.isMuted()) {
      player.unMute();
      toggleMuteIcon();
    } else {
      player.mute();
      toggleMuteIcon();
    }
  })
});
