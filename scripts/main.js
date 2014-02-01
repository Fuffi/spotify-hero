require([
  '$api/models',
  'scripts/language-example',
  'scripts/cover-example',
  'scripts/current-song'
], function(models, languageExample, coverExample, buttonExample, playlistExample) {
  'use strict';

  languageExample.doHelloWorld();
  coverExample.doCoverForAlbum();
});
