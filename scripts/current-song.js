require([
  '$api/models',
  '$views/image#Image'
], function(models, Image) {
  'use strict';
  var nowPlaying = function() {
    var currentTrack = null;
    var nowPlayingTitle = document.getElementById('now-playing-title');
    var nowPlayingCover = document.getElementById('now-playing-cover');
    var nowPlayingArtist = document.getElementById('now-playing-artist');
    var nowPlayingPosition = document.getElementById('now-playing-position');

    function updateStatus(track) {
      if (track === null) {
        nowPlayingTitle.innerHTML = 'No track currently playing';
      } else {
        track.load(['album', 'name']).done( function() {

          var image = Image.forAlbum(track.album, {width: 200, height: 200});
          nowPlayingTitle.innerHTML = 'Now playing: ' + track.name;
          nowPlayingCover.appendChild(image.node);

          track.load('artists').done(onArtistsLoad);
        });
      }

      function onArtistsLoad(t) {
        var artist = t.artists[Math.floor(Math.random() * t.artists.length)];
        var image = Image.forArtist(artist, {width: window.innerWidth, height: window.innerHeight});
        nowPlayingArtist.appendChild(image.node);
        console.log(image);
      }
    }

    models.player.load('track').done(function(p) {
      updateStatus(p.track);
    });

    models.player.load('position').done(function(p) {
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