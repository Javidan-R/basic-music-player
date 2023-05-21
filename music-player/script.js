class MusicPlayer {
  constructor() {
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

  setupEventListeners() {
    // Olay dinleyicilerini ayarla
    this.playBtn.addEventListener("click", () => {
      this.togglePlay();
    });

    this.nextBtn.addEventListener("click", () => {
      this.playNextSong();
    });

    this.previousBtn.addEventListener("click", () => {
      this.playPreviousSong();
    });

    this.audio.addEventListener("timeupdate", () => {
      this.updateTime();
    });

    this.audio.addEventListener("ended", () => {
      this.playNextSong();
    });

    this.randomBtn.addEventListener("click", this.playRandomSong.bind(this));
  }

  clearInputFields() {
    // Giriş alanlarını temizle
    this.artistInput.value = "";
    this.titleInput.value = "";
    this.fileInput.value = "";
  }

  renderSongItem(song) {
    // Şarkı öğesini oluştur
    const { artist, title } = song;
    const songItem = document.createElement("div");
    songItem.classList.add("music-item");
    songItem.textContent = `${song.title} - ${song.artist}`;

    songItem.addEventListener("click", () => {
      const index = this.songs.indexOf(song);
      this.currentSongIndex = index;
      this.loadSong();
      this.playSong();
      this.updateSongInfo();
    });

    this.musicList.appendChild(songItem);
  }

  loadSongs() {
    // Şarkıları yükle
    const storedSongs = localStorage.getItem("songs");

    if (storedSongs) {
      this.songs = JSON.parse(storedSongs);
      this.renderMusicList();
    } else {
      // Eğer localStorage'da şarkı bulunamazsa, varsayılan şarkıları yükle
      this.loadDefaultSongs();
    }
  }

  loadDefaultSongs() {
    // Varsayılan şarkıları yükle
    const defaultSongs = [
      {
        artist: "Sanatçı 1",
        title: "Şarkı 1",
        img: "1.webp",
        fileUrl: "f.mp3",
      },
      {
        artist: "Sanatçı 2",
        title: "Şarkı 2",
        img: "2.png",
        fileUrl: "ed.mp3",
      },
      {
        artist: "Sanatçı 3",
        title: "Şarkı 3",
        img: "3.webp",
        fileUrl: "bill.mp3",
      },
      {
        artist: "Sanatçı 1",
        title: "Şarkı 1",
        img: "4.png",
        fileUrl: "million.mp3",
      },
      {
        artist: "Sanatçı 1",
        title: "Şarkı 1",
        img: "5.webp",
        fileUrl: "rybak.mp3",
      },
      {
        artist: "Sanatçı 1",
        title: "Şarkı 1",
        img: "6.jpg",
        fileUrl: "sting.mp3",
      },
    ];
    
    this.songs = defaultSongs;
    this.saveSongs();
    this.renderMusicList();
  }

  saveSongs() {
    // Şarkıları localStorage'a kaydet
    localStorage.setItem("songs", JSON.stringify(this.songs));
  }

  renderMusicList() {
    // Şarkı listesini render et
    this.musicList.innerHTML = "";

    this.songs.forEach((song, index) => {
      const { artist, title } = song;

      const songItem = document.createElement("div");
      songItem.classList.add("music-item");
      songItem.textContent = `${title} - ${artist}`;

      songItem.addEventListener("click", () => {
        this.currentSongIndex = index;
        this.loadSong();
        this.playSong();
        this.updateSongInfo();
      });

      this.musicList.appendChild(songItem);
    });
  }

  loadSong() {
    // Şarkıyı yükle
    if (this.songs.length > 0) {
      this.currentSongIndex = this.clampIndex(
        this.currentSongIndex,
        0,
        this.songs.length - 1
      );
      const { fileUrl, img } = this.songs[this.currentSongIndex];
      this.audio.src = fileUrl;
      document.body.style.backgroundImage = `url(${img})`;
    }
  }

  clampIndex(index, min, max) {
    // İndisi belirtilen aralıkta sınırla
    return Math.max(min, Math.min(index, max));
  }

  togglePlay() {
    // Çalmayı durdur veya başlat
    if (this.isPlaying) {
      this.pauseSong();
    } else {
      this.playSong();
    }
  }

  playSong() {
    // Şarkıyı çal
    this.audio
      .play()
      .then(() => {
        this.isPlaying = true;
        this.updatePlayButtonIcon();
      })
      .catch((error) => {
        this.showError("Şarkı çalınamadı. Lütfen tekrar deneyin.");
        console.error("Şarkı çalınamadı:", error);
      });
  }

  pauseSong() {
    // Şarkıyı duraklat
    this.audio.pause();
    this.isPlaying = false;
    this.updatePlayButtonIcon();
  }

  playRandomSong() {
    // Rastgele şarkı çal
    const randomIndex = Math.floor(Math.random() * this.songs.length);
    if (randomIndex !== this.currentSongIndex) {
      this.currentSongIndex = randomIndex;
      this.loadSong();
      this.playSong();
      this.updateSongInfo();
    }
  }

  updatePlayButtonIcon() {
    // Çalma düğmesinin ikonunu güncelle
    const iconClass = this.isPlaying ? "fa-pause" : "fa-play";
    this.playBtn.querySelector("i").className = `fas ${iconClass}`;
  }

  playNextSong() {
    // Bir sonraki şarkıyı çal
    this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
    this.loadSong();
    this.playSong();
    this.updateSongInfo();
  }

  playPreviousSong() {
    // Bir önceki şarkıyı çal
    this.currentSongIndex =
      (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
    this.loadSong();
    this.playSong();
    this.updateSongInfo();
  }

  updateTime() {
    // Zamanı güncelle
    const currentTime = this.audio.currentTime;
    const duration = this.audio.duration;

    if (!isNaN(duration)) {
      this.currentTimeEl.textContent = this.formatTime(currentTime);
      this.totalDurationEl.textContent = this.formatTime(duration);
      this.rangeEl.value = (currentTime / duration) * 100;
    }
  }

  formatTime(time) {
    // Zamanı biçimlendir
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  updateSongInfo() {
    // Şarkı bilgilerini güncelle
    const { artist, title } = this.songs[this.currentSongIndex];
    this.singerNameEl.textContent = artist;
    this.musicNameEl.textContent = title;
  }

  showError(message) {
    // Hata mesajını göster
    this.errorEl.textContent = message;
  }
}

// Müzik çalıcıyı başlat
const player = new MusicPlayer();
