export default function createAudioPlayer(containerId, playlist) {
  // GLOBAL
  let currentTrackIndex = 0;
  // SETUP ELEMENTS
  const trackContainer = document.getElementById("track-container");
  const nowPlaying = document.getElementById("now-playing");
  const audioPlayer = document.getElementById("audio-player");
  const progressBar = document.getElementById("progress-bar");
  const startTime = document.getElementById("start-time");
  const timeLeft = document.getElementById("time-left");

  const trackTitle = document.createElement("h2");
  const controls = document.createElement("div");

  nowPlaying.appendChild(trackTitle);

  // UPDATE AND LOAD TRACK INFO
  function updateTrackInfo(index) {
    // Check if the index is within the playlist range
    if (index < 0 || index >= playlist.length) {
      console.error("Track index out of bounds:", index);
      return;
    }

    const track = playlist[index];
    if (!track) {
      console.error("No track found at index", index);
      return;
    }
    trackTitle.innerText = `Now playing: ${track.title}`;
    audioPlayer.src = track.src;
    audioPlayer.load();
  }

  // INITIALIZE TRACK
  updateTrackInfo(currentTrackIndex);

  document.addEventListener("playSong", function (e) {
    const { index } = e.detail;
    currentTrackIndex = index;
    updateTrackInfo(currentTrackIndex);
    playButton.innerHTML = "❚❚";
  });

  // UPDATE TIME DISPLAY
  function updateTimeDisplay() {
    const currentTime = audioPlayer.currentTime;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    startTime.textContent = `${pad(minutes)}:${pad(seconds)}`;
  }

  function pad(number) {
    return number.toString().padStart(2, "0");
  }

  audioPlayer.addEventListener("timeupdate", updateTimeDisplay);

  // TABULATE TIME ONCE MEDIA IS LOADED
  audioPlayer.onloadedmetadata = function () {
    const totalMinutes = Math.floor(this.duration / 60);
    const totalSeconds = Math.floor(this.duration % 60);
    timeLeft.textContent = `-${String(totalMinutes).padStart(2, "0")}:${String(
      totalSeconds
    ).padStart(2, "0")}`;
  };

  // UPDATE PROGRESS BAR WHEN PLAYED
  audioPlayer.addEventListener("timeupdate", function () {
    if (isNaN(this.duration)) return;
    const percentage = (this.currentTime / this.duration) * 100;
    progressBar.style.width = `${percentage}%`;
    const remaining = this.duration - this.currentTime;
    const minutes = Math.floor(remaining / 60);
    const seconds = Math.floor(remaining % 60);
    timeLeft.textContent = `-${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  });

  // BUTTON CONTROL HANDLERS
  controls.className = "controls";
  const playButton = createButton("▶", togglePlayPause, "play-pause-btn");
  const stopButton = createButton("◼", () => {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    playButton.innerHTML = "▶";
  });

  const nextButton = createButton("⏭", () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    updateTrackInfo(currentTrackIndex);
    playButton.innerHTML = "❚❚";
  });

  const backButton = createButton("⏮", () => {
    if (currentTrackIndex > 0) {
      updateTrackInfo(--currentTrackIndex);
    } else {
      audioPlayer.currentTime = 0;
    }
    playButton.innerHTML = "❚❚";
  });
  controls.append(backButton, playButton, stopButton, nextButton);
  trackContainer.appendChild(controls);

  // TOGGLE PLAY/PAUSE UI HANDLER
  function togglePlayPause() {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playButton.innerHTML = "❚❚";
    } else {
      audioPlayer.pause();
      playButton.innerHTML = "▶";
    }
  }

  // RENDER BUTTON HANDLER
  function createButton(text, onClick, id = null) {
    const button = document.createElement("button");
    button.classList.add("control-button");
    button.innerHTML = text;
    button.onclick = onClick;
    if (id) {
      button.id = id;
    }
    return button;
  }
  console.log(playlist);
}
