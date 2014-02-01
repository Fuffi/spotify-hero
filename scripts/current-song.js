require([
  '$api/models',
  '$views/image#Image'
], function(models, SpotifyImage) {
  'use strict';
  var nowPlaying = function() {
    var nowPlayingTitle = document.getElementById('now-playing-title');
    var nowPlayingCover = document.getElementById('now-playing-cover');
    var nowPlayingArtist = document.getElementById('now-playing-artist');
    var nowPlayingPosition = document.getElementById('now-playing-position');
    var nowPlayingTabs = document.getElementById('now-playing-tabs');

    var tabs = loadTabs();

    function updateStatus(track) {
      if (track === null) {
        nowPlayingTitle.innerHTML = 'No track currently playing';
      } else {
        track.load(['album', 'name']).done( function() {

          var image = SpotifyImage.forAlbum(track.album, {width: 200, height: 200});
          nowPlayingTitle.innerHTML = 'Now playing: ' + track.name;
          nowPlayingCover.appendChild(image.node);

          track.load('artists').done(onArtistsLoad);
        });
      }

      function onArtistsLoad(t) {
        var artist = t.artists[Math.floor(Math.random() * t.artists.length)];
        var image = SpotifyImage.forArtist(artist, {width: window.innerWidth, height: window.innerHeight});
        nowPlayingArtist.appendChild(image.node);
      }
    }

    function loadTabs() {
      var size = 95;
      var tabs = [];
      for (var i = 1; i <= size; ++i) {
        var image = new Image();
        image.src = 'images/tabs/' + i + '.png';
        tabs.push({time: 2 * (i - 1), image: image});
      }
      return tabs;
    }

    models.player.load('track').done(function(p) {
      updateStatus(p.track);
    });

    models.player.load('position').done(function(p) {
      window.setInterval(function() {
        updateTab(p.position / 1000);
        nowPlayingPosition.innerHTML = 'Current position: ' + (p.position / 1000);
      }, 1000);
    });

    function updateTab(positionInSeconds) {
      var currentTabIndex = Math.floor(positionInSeconds / 2);
      var currentTab = tabs[currentTabIndex];
      console.log(currentTabIndex, currentTab.image);
      nowPlayingTabs.innerHTML = '';
      nowPlayingTabs.appendChild(currentTab.image);
    }

    // update on change
    models.player.addEventListener('change', function(p) {
      updateStatus(p.data.track);
    });
  }

  exports.nowPlaying = nowPlaying;
});