document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");
  const muteBtn = document.getElementById("mute-btn");
  const muteIcon = document.getElementById("mute-icon");

  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteIcon.src = audio.muted ? "images/preg.png" : "images/mpreg.png";
  });
});