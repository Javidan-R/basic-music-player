"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MusicPlayer =
/*#__PURE__*/
function () {
  function MusicPlayer() {
    _classCallCheck(this, MusicPlayer);

    // Müzik çalıcının özellikleri
    this.songs = []; // Şarkı listesi

    this.currentSongIndex = 0; // Şu an çalınan şarkının dizinini tutar

    this.audio = new Audio(); // Audio öğesi

    this.isPlaying = false; // Çalma durumu

    this.playBtn = document.querySelector(".play-btn"); // Çalma düğmesi

    this.nextBtn = document.querySelector(".next-btn"); // Sonraki düğmesi

    this.previousBtn = document.querySelector(".previous-btn"); // Önceki düğmesi

    this.randomBtn = document.querySelector(".random-btn"); // Rastgele çal düğmesi

    this.currentTimeEl = document.querySelector(".current-time"); // Geçen süre göstergesi

    this.totalDurationEl = document.querySelector(".total-duration"); // Toplam süre göstergesi

    this.rangeEl = document.querySelector(".range"); // Sürgü öğesi

    this.singerNameEl = document.querySelector(".singer-name"); // Şarkıcı adı göstergesi

    this.musicNameEl = document.querySelector(".music-title");
    this.musicList = document.querySelector(".music-list"); // Şarkı listesi öğesi

    this.errorEl = document.querySelector(".error-message"); // Hata mesajı göstergesi

    this.setupEventListeners();
    this.loadSongs();
    this.updateSongInfo();
    this.updatePlayButtonIcon();
  }

  _createClass(MusicPlayer, [{
    key: "setupEventListeners",
    value: function setupEventListeners() {
      var _this = this;

      // Olay dinleyicilerini ayarla
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
      this.randomBtn.addEventListener("click", this.playRandomSong.bind(this));
    }
  }, {
    key: "clearInputFields",
    value: function clearInputFields() {
      // Giriş alanlarını temizle
      this.artistInput.value = "";
      this.titleInput.value = "";
      this.fileInput.value = "";
    }
  }, {
    key: "renderSongItem",
    value: function renderSongItem(song) {
      var _this2 = this;

      // Şarkı öğesini oluştur
      var artist = song.artist,
          title = song.title;
      var songItem = document.createElement("div");
      songItem.classList.add("music-item");
      songItem.textContent = "".concat(song.title, " - ").concat(song.artist);
      songItem.addEventListener("click", function () {
        var index = _this2.songs.indexOf(song);

        _this2.currentSongIndex = index;

        _this2.loadSong();

        _this2.playSong();

        _this2.updateSongInfo();
      });
      this.musicList.appendChild(songItem);
    }
  }, {
    key: "loadSongs",
    value: function loadSongs() {
      // Şarkıları yükle
      var storedSongs = localStorage.getItem("songs");

      if (storedSongs) {
        this.songs = JSON.parse(storedSongs);
        this.renderMusicList();
      } else {
        // Eğer localStorage'da şarkı bulunamazsa, varsayılan şarkıları yükle
        this.loadDefaultSongs();
      }
    }
  }, {
    key: "loadDefaultSongs",
    value: function loadDefaultSongs() {
      // Varsayılan şarkıları yükle
      var defaultSongs = [{
        artist: "Sanatçı 1",
        title: "Şarkı 1",
        img: ".webp",
        fileUrl: "f.mp3"
      }, {
        artist: "Sanatçı 2",
        title: "Şarkı 2",
        img: ".png",
        fileUrl: "ed.mp3"
      }, {
        artist: "Sanatçı 3",
        title: "Şarkı 3",
        img: "3.webp",
        fileUrl: ".mp3"
      }];
      this.songs = defaultSongs;
      this.saveSongs();
      this.renderMusicList();
    }
  }, {
    key: "saveSongs",
    value: function saveSongs() {
      // Şarkıları localStorage'a kaydet
      localStorage.setItem("songs", JSON.stringify(this.songs));
    }
  }, {
    key: "renderMusicList",
    value: function renderMusicList() {
      var _this3 = this;

      // Şarkı listesini render et
      this.musicList.innerHTML = "";
      this.songs.forEach(function (song, index) {
        var artist = song.artist,
            title = song.title;
        var songItem = document.createElement("div");
        songItem.classList.add("music-item");
        songItem.textContent = "".concat(title, " - ").concat(artist);
        songItem.addEventListener("click", function () {
          _this3.currentSongIndex = index;

          _this3.loadSong();

          _this3.playSong();

          _this3.updateSongInfo();
        });

        _this3.musicList.appendChild(songItem);
      });
    }
  }, {
    key: "loadSong",
    value: function loadSong() {
      // Şarkıyı yükle
      if (this.songs.length > 0) {
        this.currentSongIndex = this.clampIndex(this.currentSongIndex, 0, this.songs.length - 1);
        var _this$songs$this$curr = this.songs[this.currentSongIndex],
            fileUrl = _this$songs$this$curr.fileUrl,
            img = _this$songs$this$curr.img;
        this.audio.src = fileUrl;
        document.body.style.backgroundImage = "url(".concat(img, ")");
      }
    }
  }, {
    key: "clampIndex",
    value: function clampIndex(index, min, max) {
      // İndisi belirtilen aralıkta sınırla
      return Math.max(min, Math.min(index, max));
    }
  }, {
    key: "togglePlay",
    value: function togglePlay() {
      // Çalmayı durdur veya başlat
      if (this.isPlaying) {
        this.pauseSong();
      } else {
        this.playSong();
      }
    }
  }, {
    key: "playSong",
    value: function playSong() {
      var _this4 = this;

      // Şarkıyı çal
      this.audio.play().then(function () {
        _this4.isPlaying = true;

        _this4.updatePlayButtonIcon();
      })["catch"](function (error) {
        _this4.showError("Şarkı çalınamadı. Lütfen tekrar deneyin.");

        console.error("Şarkı çalınamadı:", error);
      });
    }
  }, {
    key: "pauseSong",
    value: function pauseSong() {
      // Şarkıyı duraklat
      this.audio.pause();
      this.isPlaying = false;
      this.updatePlayButtonIcon();
    }
  }, {
    key: "playRandomSong",
    value: function playRandomSong() {
      // Rastgele şarkı çal
      var randomIndex = Math.floor(Math.random() * this.songs.length);

      if (randomIndex !== this.currentSongIndex) {
        this.currentSongIndex = randomIndex;
        this.loadSong();
        this.playSong();
        this.updateSongInfo();
      }
    }
  }, {
    key: "updatePlayButtonIcon",
    value: function updatePlayButtonIcon() {
      // Çalma düğmesinin ikonunu güncelle
      var iconClass = this.isPlaying ? "fa-pause" : "fa-play";
      this.playBtn.querySelector("i").className = "fas ".concat(iconClass);
    }
  }, {
    key: "playNextSong",
    value: function playNextSong() {
      // Bir sonraki şarkıyı çal
      this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
      this.loadSong();
      this.playSong();
      this.updateSongInfo();
    }
  }, {
    key: "playPreviousSong",
    value: function playPreviousSong() {
      // Bir önceki şarkıyı çal
      this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
      this.loadSong();
      this.playSong();
      this.updateSongInfo();
    }
  }, {
    key: "updateTime",
    value: function updateTime() {
      // Zamanı güncelle
      var currentTime = this.audio.currentTime;
      var duration = this.audio.duration;

      if (!isNaN(duration)) {
        this.currentTimeEl.textContent = this.formatTime(currentTime);
        this.totalDurationEl.textContent = this.formatTime(duration);
        this.rangeEl.value = currentTime / duration * 100;
      }
    }
  }, {
    key: "formatTime",
    value: function formatTime(time) {
      // Zamanı biçimlendir
      var minutes = Math.floor(time / 60);
      var seconds = Math.floor(time % 60);
      return "".concat(minutes.toString().padStart(2, "0"), ":").concat(seconds.toString().padStart(2, "0"));
    }
  }, {
    key: "updateSongInfo",
    value: function updateSongInfo() {
      // Şarkı bilgilerini güncelle
      var _this$songs$this$curr2 = this.songs[this.currentSongIndex],
          artist = _this$songs$this$curr2.artist,
          title = _this$songs$this$curr2.title;
      this.singerNameEl.textContent = artist;
      this.musicNameEl.textContent = title;
    }
  }, {
    key: "showError",
    value: function showError(message) {
      // Hata mesajını göster
      this.errorEl.textContent = message;
    }
  }]);

  return MusicPlayer;
}(); // Müzik çalıcıyı başlat


var player = new MusicPlayer();