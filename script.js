var mediaJSON = [
  {
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    ],
    subtitle: "By Blender Foundation",
    thumb: "images/BigBuckBunny.jpg",
    title: "Big Buck Bunny",
  },
  {
    description: "The first Blender Open Movie from 2006",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    ],
    subtitle: "By Blender Foundation",
    thumb: "images/ElephantsDream.jpg",
    title: "Elephant Dream",
  },
  {
    description:
      "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    ],
    subtitle: "By Google",
    thumb: "images/ForBiggerBlazes.jpg",
    title: "For Bigger Blazes",
  },
  {
    description:
      "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    ],
    subtitle: "By Google",
    thumb: "images/ForBiggerEscapes.jpg",
    title: "For Bigger Escape",
  },
  {
    description:
      "The Smoking Tire is going on the 2010 Bullrun Live Rally in a 2011 Shelby GT500, and posting a video from the road every single day! The only place to watch them is by subscribing to The Smoking Tire or watching at BlackMagicShine.com",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    ],
    subtitle: "By Garage419",
    thumb: "images/WeAreGoingOnBullrun.jpg",
    title: "We Are Going On Bullrun",
  },
  {
    description:
      "The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.",
    sources: [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    ],
    subtitle: "By Garage419",
    thumb: "images/WhatCarCanYouGetForAGrand.jpg",
    title: "What care can you get for a grand?",
  },
];
var items = [];
mediaJSON.forEach((video) => {
  let item = `<div class="item" onclick="loadMovie('${video.sources[0]}')"><div class="line"></div><div class="text">${video.title}</div></div>`;
  items.push(item);
});
document.querySelector("#videoList .content-layer .list").innerHTML =
  items.join("");

const video = document.getElementById("video");
const playPauseBtn = document.getElementById("playPause");
const rewindBtn = document.getElementById("rewind");
const forwardBtn = document.getElementById("forward");
const progressFill = document.getElementById("progressFill");
const elapsedSpan = document.getElementById("elapsed");
const remainingSpan = document.getElementById("remaining");
const more = document.getElementById("more");

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

playPauseBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPauseBtn.classList.remove("show-play");
    setTimeout(() => {
      playPauseBtn.classList.add("show-pause");
    }, 300);
  } else {
    video.pause();
    playPauseBtn.classList.remove("show-pause");
    setTimeout(() => {
      playPauseBtn.classList.add("show-play");
    }, 300);
  }
});

rewindBtn.addEventListener("click", () => {
  video.currentTime = Math.max(0, video.currentTime - 10);
});

forwardBtn.addEventListener("click", () => {
  video.currentTime = Math.min(video.duration, video.currentTime + 10);
});

video.addEventListener("timeupdate", () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressFill.style.width = `${progress}%`;

  elapsedSpan.textContent = formatTime(video.currentTime);
  remainingSpan.textContent =
    "-" + formatTime(video.duration - video.currentTime);
});

more.addEventListener("click", (event) => {
  const parent = event.target.parentElement;
  parent.classList.toggle("open");
});

function loadMovie(source) {
  video.setAttribute("src", source);
  more.parentElement.classList.toggle("open");
  video.pause();
  playPauseBtn.classList.remove("show-pause");
  setTimeout(() => {
    playPauseBtn.classList.add("show-play");
  }, 300);
}
