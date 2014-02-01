require([
  '$api/models',
  '$views/image#Image'
], function(models, Image) {
  'use strict';
  var nowPlaying = function() {
    var currentTrack = null;

    function updateStatus(track) {
      if (track === null) {
        nowPlayingTitle.innerHTML = 'No track currently playing';
      } else {
        track.load(['album', 'name']).done( function() {
          var nowPlayingTitle = document.getElementById('now-playing');
          var nowPlayingCover = document.getElementById('now-playing-cover');

          var image = Image.forAlbum(track.album, {width: 200, height: 200, player: true});
          nowPlayingTitle.innerHTML = 'Now playing: ' + track.name;
          nowPlayingCover.appendChild(image.node);
        });
      }
    }

    models.player.load('track').done(function(p) {
      updateStatus(p.track);
    });

    models.player.load('position').done(function(p) {
      var nowPlayingPosition = document.getElementById('now-playing-position');
      window.setInterval(function() {
        nowPlayingPosition.innerHTML = 'Current position: ' + (p.position / 1000);
      }, 1000);
    });

    // update on change
    models.player.addEventListener('change', function(p) {
      updateStatus(p.data.track);
    });
  }

  exports.nowPlaying = nowPlaying;
});