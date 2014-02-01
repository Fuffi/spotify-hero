require(['$api/models'], function(models) {
  var nowPlaying = document.getElementById('now-playing');

  function updateStatus(track) {
      if (track === null) {
          nowPlaying.innerHTML = 'No track currently playing';
      } else {
          nowPlaying.innerHTML = 'Now playing: ' + track.name;
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