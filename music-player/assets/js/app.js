
class MusicPlayer {
    constructor() {
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
      this.randomBtn = document.querySelector(".random-btn");
   
      // this.artistInput = document.getElementById('artist-input');
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
  
    setupEventListeners() {
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
  
  
      // this.addBtn.addEventListener('click', this.handleAddSong.bind(this));
    }
  
    // handleAddSong() {
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
  
    loadSongs() {
      // Load songs from an API or other data source
      // For demonstration purposes, we'll use a dummy array of songs
      this.songs = [
        {
          artist: "billy Ellish",
          title: "Song 1",
          fileUrl: "/assets/music/panda.mp3"
        },
        {
          artist: "Artist 2",
          title: "Song 2",
          fileUrl: "/assets/music/bill.mp3"
        },
        {
          artist: "ed sheeran ",
          title: "shape of you ",
          fileUrl: "/assets/music/ed.mp3"
        }
      ];
  
      this.loadSong();
    }
  
    loadSong() {
      const { fileUrl } = this.songs[this.currentSongIndex];
      this.audio.src = fileUrl;
    }
  
    togglePlay() {
      if (this.isPlaying) {
        this.pauseSong();
      } else {
        this.playSong();
      }
    }
  
    playSong() {
      this.audio.play()
        .then(() => {
          this.isPlaying = true;
          this.updatePlayButtonIcon();
        })
        .catch(error => {
          console.error("Failed to play the song:", error);
          this.showError("Failed to play the song. Please try again.");
        });
    }
  
    pauseSong() {
      this.audio.pause();
      this.isPlaying = false;
      this.updatePlayButtonIcon();
    }
  
  
    updatePlayButtonIcon() {
      const iconClass = this.isPlaying ? "fa-pause" : "fa-play";
      this.playBtn.querySelector("i").className = `fas ${iconClass}`;
    }
  
    playNextSong() {
      this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
      this.loadSong();
      this.playSong();
      this.updateSongInfo();
    }
  
    playPreviousSong() {
      this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
      this.loadSong();
      this.playSong();
      this.updateSongInfo();
    }
  
  
    updateTime() {
      const currentTime = this.audio.currentTime;
      const duration = this.audio.duration;
  
      if (!isNaN(duration)) {
        this.currentTimeEl.textContent = this.formatTime(currentTime);
        this.totalDurationEl.textContent = this.formatTime(duration);
        this.rangeEl.value = (currentTime / duration) * 100;
      }
    }
    
    playRandomSong() {
      const randomIndex = Math.floor(Math.random() * this.songs.length);
      this.currentSongIndex = randomIndex;
      this.loadSong();
      this.playSong();
      this.updateSongInfo();
    }
  
  
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
  
    updateSongInfo() {
      const { artist, title } = this.songs[this.currentSongIndex];
      this.singerNameEl.textContent = artist;
      this.musicTitleEl.textContent = title;
    }
  
    showError(message) {
      this.errorEl.textContent = message;
    }
    
    createMusicList() {
      const musicList = document.createElement('div');
      musicList.classList.add('music-list');
  
      this.songs.forEach((song, index) => {
        const musicItem = document.createElement('div');
        musicItem.classList.add('music-item');
        musicItem.textContent = `${song.title} - ${song.artist}`;
        musicItem.addEventListener('click', () => {
          this.playSelectedSong(index);
        });
  
        musicList.appendChild(musicItem);
      });
  
      this.playlist.appendChild(musicList);
    }
  
    playSelectedSong(index) {
      this.currentSongIndex = index;
      this.loadSong();
      this.playSong();
      this.updateSongInfo();
    }
  }
  
  // Initialize the music player
  const player = new MusicPlayer();
  player.createMusicList();