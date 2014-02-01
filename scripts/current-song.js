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

    var currentTrack = null;

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
      }, 2000);
    });

    function updateTab(positionInSeconds) {
      var newTabIndex = Math.floor(positionInSeconds / 2);
      if(newTabIndex === currentTabIndex) return;

      var currentTabIndex = newTabIndex;
      var currentTab = tabs[currentTabIndex];
      console.log(currentTabIndex, currentTab.image);
      $( nowPlayingTabs ).find("img").animate({
        opacity: 0
      }, 200, function() {
        $(nowPlayingTabs).html("");
        nowPlayingTabs.appendChild(currentTab.image);
        $( currentTab.image ).animate({
          opacity: 1
        }, 500, function() {
          // Animation complete.
        });
      });

      

      
    }

    // update on change
    models.player.addEventListener('change', function(p) {
      var track = p.data.track;

      if (currentTrack != track) {
        console.log("TRYING UPDATE");
        currentTrack = track;
        updateStatus(track);
      }
    });
  }

  exports.nowPlaying = nowPlaying;
});