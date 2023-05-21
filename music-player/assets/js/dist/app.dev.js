"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MusicPlayer =
/*#__PURE__*/
function () {
  function MusicPlayer() {
    _classCallCheck(this, MusicPlayer);

    this.songs = [];
    this.currentSongIndex = 0;
    this.audio = new Audio();
    this.isPlaying = false;
    this.playBtn = document.querySelector(".play-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.previousBtn = document.querySelector(".previous-btn");
    this.currentTimeEl = document.querySelector(".current-time");
    this.totalDurationEl = document.querySelector(".total-duration");
    this.rangeEl = document.querySelector(".range");
    this.singerNameEl = document.querySelector(".singer-name");
    this.musicTitleEl = document.querySelector(".music-title");
    this.randomBtn = document.querySelector(".random-btn"); // this.artistInput = document.getElementById('artist-input');
    // this.titleInput = document.getElementById('title-input');
    // this.fileInput = document.getElementById('file-input');
    // this.addBtn = document.querySelector('.add-btn');

    this.playlist = document.querySelector('.playlist');
    this.errorEl = document.querySelector(".error-message");
    this.setupEventListeners();
    this.loadSongs();
    this.updateSongInfo();
    this.updatePlayButtonIcon();
  }

  _createClass(MusicPlayer, [{
    key: "setupEventListeners",
    value: function setupEventListeners() {
      var _this = this;

      this.playBtn.addEventListener("click", function () {
        _this.togglePlay();
      });
      this.nextBtn.addEventListener("click", function () {
        _this.playNextSong();
      });
      this.previousBtn.addEventListener("click", function () {
        _this.playPreviousSong();
      });
      this.audio.addEventListener("timeupdate", function () {
        _this.updateTime();
      });
      this.audio.addEventListener("ended", function () {
        _this.playNextSong();
      });
      this.randomBtn.addEventListener("click", this.playRandomSong.bind(this)); // this.addBtn.addEventListener('click', this.handleAddSong.bind(this));
    } // handleAddSong() {
    //   const artist = this.artistInput.value.trim();
    //   const title = this.titleInput.value.trim();
    //   const fileUrl = this.fileInput.value.trim();
    //   if (artist && title && fileUrl) {
    //     const song = document.createElement('div');
    //     song.classList.add('song');
    //     const songInfo = document.createElement('div');
    //     songInfo.classList.add('song-info');
    //     songInfo.innerHTML = `<h3>${title}</h3><p>${artist}</p>`;
    //     song.appendChild(songInfo);
    //     const audio = document.createElement('audio');
    //     audio.src = fileUrl;
    //     audio.controls = true;
    //     song.appendChild(audio);
    //     this.playlist.appendChild(song);
    //     this.clearInputFields();
    //   }
    // }
    // clearInputFields() {
    //   this.artistInput.value = '';
    //   this.titleInput.value = '';
    //   this.fileInput.value = '';
    // }

  }, {
    key: "loadSongs",
    value: function loadSongs() {
      // Load songs from an API or other data source
      // For demonstration purposes, we'll use a dummy array of songs
      this.songs = [{
        artist: "billy Ellish",
        title: "Song 1",
        fileUrl: "/assets/music/panda.mp3"
      }, {
        artist: "Artist 2",
        title: "Song 2",
        fileUrl: "/assets/music/bill.mp3"
      }, {
        artist: "ed sheeran ",
        title: "shape of you ",
        fileUrl: "/assets/music/ed.mp3"
      }];
      this.loadSong();
    }
  }, {
    key: "loadSong",
    value: function loadSong() {
      var fileUrl = this.songs[this.currentSongIndex].fileUrl;
      this.audio.src = fileUrl;
    }
  }, {
    key: "togglePlay",
    value: function togglePlay() {
      if (this.isPlaying) {
        this.pauseSong();
      } else {
        this.playSong();
      }
    }
  }, {
    key: "playSong",
    value: function playSong() {
      var _this2 = this;

      this.audio.play().then(function () {
        _this2.isPlaying = true;

        _this2.updatePlayButtonIcon();
      })["catch"](function (error) {
        console.error("Failed to play the song:", error);

        _this2.showError("Failed to play the song. Please try again.");
      });
    }
  }, {
    key: "pauseSong",
    value: function pauseSong() {
      this.audio.pause();
      this.isPlaying = false;
      this.updatePlayButtonIcon();
    }
  }, {
    key: "updatePlayButtonIcon",
    value: function updatePlayButtonIcon() {
      var iconClass = this.isPlaying ? "fa-pause" : "fa-play";
      this.playBtn.querySelector("i").className = "fas ".concat(iconClass);
    }
  }, {
    key: "playNextSong",
    value: function playNextSong() {
      this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
      this.loadSong();
      this.playSong();
      this.updateSongInfo();
    }
  }, {
    key: "playPreviousSong",
    value: function playPreviousSong() {
      this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
      this.loadSong();
      this.playSong();
      this.updateSongInfo();
    }
  }, {
    key: "updateTime",
    value: function updateTime() {
      var currentTime = this.audio.currentTime;
      var duration = this.audio.duration;

      if (!isNaN(duration)) {
        this.currentTimeEl.textContent = this.formatTime(currentTime);
        this.totalDurationEl.textContent = this.formatTime(duration);
        this.rangeEl.value = currentTime / duration * 100;
      }
    }
  }, {
    key: "playRandomSong",
    value: function playRandomSong() {
      var randomIndex = Math.floor(Math.random() * this.songs.length);
      this.currentSongIndex = randomIndex;
      this.loadSong();
      this.playSong();
      this.updateSongInfo();
    }
  }, {
    key: "formatTime",
    value: function formatTime(time) {
      var minutes = Math.floor(time / 60);
      var seconds = Math.floor(time % 60);
      return "".concat(minutes.toString().padStart(2, "0"), ":").concat(seconds.toString().padStart(2, "0"));
    }
  }, {
    key: "updateSongInfo",
    value: function updateSongInfo() {
      var _this$songs$this$curr = this.songs[this.currentSongIndex],
          artist = _this$songs$this$curr.artist,
          title = _this$songs$this$curr.title;
      this.singerNameEl.textContent = artist;
      this.musicTitleEl.textContent = title;
    }
  }, {
    key: "showError",
    value: function showError(message) {
      this.errorEl.textContent = message;
    }
  }, {
    key: "createMusicList",
    value: function createMusicList() {
      var _this3 = this;

      var musicList = document.createElement('div');
      musicList.classList.add('music-list');
      this.songs.forEach(function (song, index) {
        var musicItem = document.createElement('div');
        musicItem.classList.add('music-item');
        musicItem.textContent = "".concat(song.title, " - ").concat(song.artist);
        musicItem.addEventListener('click', function () {
          _this3.playSelectedSong(index);
        });
        musicList.appendChild(musicItem);
      });
      this.playlist.appendChild(musicList);
    }
  }, {
    key: "playSelectedSong",
    value: function playSelectedSong(index) {
      this.currentSongIndex = index;
      this.loadSong();
      this.playSong();
      this.updateSongInfo();
    }
  }]);

  return MusicPlayer;
}(); // Initialize the music player


var player = new MusicPlayer();
player.createMusicList();