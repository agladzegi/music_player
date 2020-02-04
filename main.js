const cover = document.getElementById('cover-img');
const title = document.getElementById('title');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
const volumeBtn = document.getElementById('volume-btn');
const volume = document.getElementById('volume');
const volumeContainer = document.getElementById('volume-container')
const audio = document.getElementById('audio');
const startTime = document.getElementById('start-time');
const endTime = document.getElementById('end-time');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');


const songs = ['Good Man', 'Every Little Thing', 'R U Mine'];

let songIndex = 1;

loadSong(songs[songIndex]);

function setVolume(param) {
  const width = parseInt(volume.style.width);
  const isMuted = volumeBtn.classList.contains('muted');
  if (isMuted) {
    audio.volume = 0
  } else {
    audio.volume = width / 100;
  }
}

function loadSong(song) {
  title.innerText = song
  audio.src = `music/${song}.mp3`;
  cover.src = `cover/${song}.jpg`;
  setVolume()
}

function playSong() {
  play.classList.add('play');
  play.querySelector('i.fas').classList.remove('fa-play');
  play.querySelector('i.fas').classList.add('fa-pause');
  setVolume();
  audio.play();
}

function pauseSong() {
  play.classList.remove('play');
  play.querySelector('i.fas').classList.remove('fa-pause');
  play.querySelector('i.fas').classList.add('fa-play');
  setVolume();
  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  
  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  
  loadSong(songs[songIndex]);

  playSong();
}

function mute() {
  volumeBtn.classList.add('muted');
  volumeBtn.querySelector('i.fas').classList.remove('fa-volume-up');
  volumeBtn.querySelector('i.fas').classList.add('fa-volume-mute');

  setVolume();
}

function unmute() {
  volumeBtn.classList.remove('muted');
  volumeBtn.querySelector('i.fas').classList.remove('fa-volume-mute');
  volumeBtn.querySelector('i.fas').classList.add('fa-volume-up');
  
  setVolume();
}

function updateVolume(e) {
  const param = (e.offsetX / this.clientWidth).toFixed(1);
  volume.style.width = `${param * 100}%`; 
  setVolume(param)
}

function zero(number) {
  return (number < 10) ? '0' + number : number;
}

function convert(number) {
  if (number) {
    const sec = zero(parseInt(number % 60));
    const min = zero(parseInt((number / 60) % 60));
    return `${min}:${sec}`;
  } else {
    return `0:0`;
  }
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPrecent = (currentTime / duration) * 100;
  startTime.innerText = `${convert(currentTime)}`;
  endTime.innerText = `${convert(duration - currentTime)}`;
  progress.style.width = `${progressPrecent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  
  audio.currentTime = (clickX / width) * duration;
}



play.addEventListener('click', () => {
  const isPlaying = play.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
})

prev.addEventListener('click', prevSong);
next.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong);

volumeBtn.addEventListener('click', () => {
  const isMuted = volumeBtn.classList.contains('muted');
  if (isMuted) {
    unmute();
  } else {
    mute();
  }
})

audio.addEventListener('timeupdate', updateProgress);

volumeContainer.addEventListener('click', updateVolume);
progressContainer.addEventListener('click', setProgress);