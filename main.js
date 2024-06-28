import createAudioPlayer from "./AudioPlayer/audio.js";
import playlist from "./assets/index.js";

document.addEventListener("DOMContentLoaded", function () {
  createAudioPlayer("music-container", playlist);
});
