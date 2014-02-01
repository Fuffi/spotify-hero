require([
  '$api/models',
  'scripts/current-song'
], function(models, currentSong) {
  'use strict';

  currentSong.nowPlaying();
});
