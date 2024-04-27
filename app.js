let currentMusic = 0;

const music = document.querySelector('#audio');

const seekbar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.current-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');
const menuBar = document.querySelector('.menu .bar');


playBtn.addEventListener('click', () => {
    if(playBtn.className.includes('pause')){
        music.play();
    }else{
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle("play");
})

// setup music

const setmusic = (i) =>{
    seekbar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path; 
    
    songName.innerHTML = song.name
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;
    
    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekbar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);

    },300)

}



setmusic(0)

// formating time in min and seconds format

const formatTime = (time) =>{
    let min = Math.floor(time/60);
    if(min < 10){
        min = `0${min}`
    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`
    }
    return `${min}:${sec}`;
}

// seek bar running

setInterval(()=>{
    seekbar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);

},500);


seekbar.addEventListener('change',() => {
    music.currentTime = seekbar.value;
    playMusic();
})

const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
}

// foeward and backward button

forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    }else{
        currentMusic++;
    }
    setmusic(currentMusic);
    playMusic()
});

backwardBtn.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = song.length - 1;
    }else{
        currentMusic--;
    }
    setmusic(currentMusic);
    playMusic()
    
});

