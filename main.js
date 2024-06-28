import createAudioPlayer from "./AudioPlayer/audio.js";
import playlist from "./assets/index.js";
import cardRenderer from "./AudioPlayer/cards.js";

document.addEventListener("DOMContentLoaded", function () {
  createAudioPlayer("music-container", playlist);
  cardRenderer(".cards-container", playlist);
});
