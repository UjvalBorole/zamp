//Intialize the Variables
let songIndex = 0;
let flag =1;
let audioElement = new Audio("song/1.mpeg");
let masterplay = document.getElementById('masterplay');
let myprogressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItems')); //error is occured asong items is not function so we do Array.from
let mastersongname = document.getElementById('mastersongname');

let songs = [
    {songName:"Heat Waves",filePath:"song/1.mpeg",coverPath:"1.jpg"},
    {songName:"come back home",filePath:"song/2.mpeg",coverPath:"2.jpg"},
    {songName:"Dusk till down",filePath:"song/3.mpeg",coverPath:"3.jpg"},
    {songName:"let me",filePath:"song/4.mpeg",coverPath:"4.jpg"},
    {songName:"mirror",filePath:"song/5.mpeg",coverPath:"5.jpg"},
    {songName:"no me",filePath:"song/6.mpeg",coverPath:"6.jpg"},
    {songName:"on",filePath:"song/7.mpeg",coverPath:"7.jpg"},
    {songName:"red",filePath:"song/8.mpeg",coverPath:"8.png"},
    {songName:"see u again",filePath:"song/9.mpeg",coverPath:"9.jpg"},
    {songName:"thunder",filePath:"song/10.mpeg",coverPath:"10.jpg"},
]

songItems.forEach((element, i)=>{
    // console.log(element);
    element.getElementsByTagName('img')[0].src= songs[i].coverPath;
    element.getElementsByClassName('songname')[0].innerText =songs[i].songName;
})

//audioElement.play();

//handle play/pause click
masterplay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){ 
    audioElement.play();
      masterplay.classList.remove('fa-circle-play');
      masterplay.classList.add('fa-circle-pause');
      gif.style.opacity=1;
    }
    else{
      audioElement.pause();
      masterplay.classList.remove('fa-circle-pause');
      masterplay.classList.add('fa-circle-play');
      gif.style.opacity=0;
    }
 
});

//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
myprogressBar.value = progress;
})

myprogressBar.addEventListener('change',()=>{
  audioElement.currentTime = myprogressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{ 
  Array.from(document.getElementsByClassName('songItemsPlay')).forEach((element)=>{
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
  
  })
}

Array.from(document.getElementsByClassName('songItemsPlay')).forEach((element)=>{
  element.addEventListener('click',(e)=>{
    makeAllPlays();
    // gif.style.opacity=1;
    
    
    songIndex = parseInt(e.target.id);
    audioElement.src=`song/${songIndex+1}.mpeg`;
    audioElement.currentTime = 0;
    // audioElement.play();
    
    // e.target.classList.remove('fa-circle-play');
    // e.target.classList.add('fa-circle-pause');//target property is used to grab a data

    if(audioElement.paused){ 
      audioElement.play();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        flag=1;
      }
      else{
        audioElement.pause();
        e.target.classList.remove('fa-circle-pause');
        e.target.classList.add('fa-circle-play');
        gif.style.opacity=0;
        flag=0;
      }
    
    mastersongname.innerText = songs[songIndex].songName;

    // masterplay.classList.remove('fa-circle-play');
    // masterplay.classList.add('fa-circle-pause');

    if(flag==1){ 
      // audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        // gif.style.opacity=1;
      }
      else{
        // audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        // gif.style.opacity=0;
      }
   
  })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
      songIndex +=1;
    }
    audioElement.src=`song/${songIndex+1}.mpeg`;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
  if(songIndex <= 0){
      songIndex = 0;
  }
  else{
    songIndex -=1;
  }
  audioElement.src=`song/${songIndex+1}.mpeg`;
  mastersongname.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();

  masterplay.classList.remove('fa-circle-play');
  masterplay.classList.add('fa-circle-pause');
})
