require([
  '$api/models',
  '$views/image#Image'
], function(models, Image) {
  'use strict';
  var nowPlaying = document.getElementById('now-playing');

  function updateStatus(track) {
      if (track === null) {
        nowPlaying.innerHTML = 'No track currently playing';
      } else {
        nowPlaying.innerHTML = 'Now playing: ' + track.name;
        var album = track.album;
        var image = Image.forAlbum(album, {width: 200, height: 200, player: true});
        console.log("TEST");
        console.log(image);
        if (image != null && image.node != null) {
          document.getElementById('now-playing-cover').appendChild(image.node);
        }
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
});