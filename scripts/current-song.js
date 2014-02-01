require([
  '$api/models',
  '$views/image#Image'
], function(models, Image) {
  'use strict';
  var nowPlaying = function() {
    function updateStatus(track) {
      var nowPlayingTitle = document.getElementById('now-playing');
      if (track === null) {
        nowPlayingTitle.innerHTML = 'No track currently playing';
      } else {
        nowPlayingTitle.innerHTML = 'Now playing: ' + track.name;
        var image = Image.forAlbum(track.album, {width: 200, height: 200, player: true});
        document.getElementById('now-playing-cover').appendChild(image.node);
      }
    }

    // update on load
    models.player.load('track').done(function(p) {
      updateStatus(p.track);
    });

    // update on change
    models.player.addEventListener('change', function(p) {
      updateStatus(p.data.track);
    });
  }

  exports.nowPlaying = nowPlaying;
});