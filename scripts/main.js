require([
  '$api/models',
  'scripts/language-example',
  'scripts/current-song'
], function(models, languageExample, currentSong) {
  'use strict';

  languageExample.doHelloWorld();
  currentSong.nowPlaying();
});
