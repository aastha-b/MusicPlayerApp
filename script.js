songsList = window.allSongs;

var songDiv = document.querySelector(".songs");
var audioPlayer = document.querySelector("audio");
var playIcon;

LoadSongs();

function LoadSongs() {
  var num = 0;
  songsList.forEach((song) => {
    loadSong(num,song);
    num++;
  });
}

function emptySongs() {
  songDiv.innerHTML = "";
}

var isPlaying = false;

function playSong(id) {
  audioPlayer.src = songsList[id].audioSrc;
  
  if (!isPlaying) {
    // console.log( document.getElementById(id));
    document.getElementById(id).innerText = "pause";
    songsList[id].isPlayingSong = true;
    audioPlayer.play();
    isPlaying = true;
    setInterval(changeProgress, 1000, id);
  } else {
    document.getElementById(id).innerText = "play_arrow";
    audioPlayer.pause();
    songsList[id].isPlayingSong = false;
    isPlaying = false;
    clearInterval(changeProgress);
  }
}

function changeProgress(num) {
  console.log(num);
  progressBar = document.getElementById("progress-bar-" + num);
  console.log(progressBar);
  progressBar.value = audioPlayer.currentTime;
  progressBar.max = audioPlayer.duration;
  if (audioPlayer.ended) {
    audioPlayer.pause();
  }
}

function addToFav(id) {
  let ID = "fav-" + id;
  document.getElementById(ID).innerText = "favorite";
  songsList[id].isLike = true;
}

favList = document.querySelector(".favourite");

favList.addEventListener("click", function () {
  for (i of allItems) {
    i.classList.remove("selected");
  }
  favList.classList.add("selected");
  emptySongs();
  var num = 0;
  songsList.forEach((song) => {
    if (song.isLike) {
      loadSong(num,song);
    }
    num++;
  });
});
allItems = document.querySelectorAll(".menu");

document.querySelector(".home").addEventListener("click", function () {
  for (i of allItems) {
    i.classList.remove("selected");
  }
  this.classList.add("selected");
  emptySongs();
  LoadSongs();
});

var number = 0;

function addPlayList(id) {
  let modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML += `<div class="title">Add PlayList</div>
  <div ><input class="name" type="text"/></div>
  <div class="addButton"> Add </div>`;

  document.querySelector("body").append(modal);

  document.querySelector(".addButton").addEventListener("click", function (e) {
    let playlistName = document.querySelector(".name").value;
    console.log(id)
    if (!document.querySelector("." + playlistName)) {
      let newPlayList = document.createElement("div");
      newPlayList.setAttribute("id", number);
      newPlayList.classList.add("list");
      newPlayList.classList.add(playlistName);
      newPlayList.innerText += playlistName;
      newPlayList.onclick = playListDisplay;
      document.querySelector(".playlists").append(newPlayList);
      number++;
    }
    allSongs[id].playlists.push(playlistName);
    modal.remove();
  });
}

function playListDisplay(e) {
  for (i of allItems) {
    i.classList.remove("selected");
  }
  document.querySelector(".playlist").classList.add("selected");
  classes = e.target.classList.value.split(" ");
  console.log(classes[1])
  emptySongs();
  var num = 0;
  allSongs.forEach((song) => {
    if (song.playlists.includes(classes[1])) {
      loadSong(num,song)
    }
    num++;
  })
}

function loadSong(num,song){
  
  var favClass = "favorite_border"
  var songPlaying = 'play_arrow';
   if(song.isLike) favClass = "favorite";
   if(song.isPlayingSong) songPlaying = 'pause';
    songDiv.innerHTML += `<div class="song-div">
    <div class="song-image">
        <img src="${song.imgUrl}" />
    </div>
    <div class="info">
        <div class="song-title">${song.title}</div>
        <div class="artist-name">${song.artist}</div>
        <div class="audio">
            <span id=${num} onclick = "playSong(${num})" class="song-icon play material-icons">${songPlaying}</span>
            <input type="range" value = "0"  id="progress-bar-${num}" />
        </div>
        <div class="song-icons">
            <span onclick=addPlayList(${num}) class="song-icon material-icons">add_circle</span>
            <span id='fav-${num}' onclick=addToFav(${num}) class="song-icon material-icons">${favClass}</span>
        </div>
    </div>
   </div>`;
  }

var isSearching = false;
var input = document.getElementById("search-input");
input.addEventListener("click",function(e){
  if(!isSearching){
    for (i of allItems) {
      i.classList.remove("selected");
    }
    document.querySelector(".playlist").classList.add("selected");
    input.innerHTML = "";
    input.setAttribute("contenteditable","true");
    input.addEventListener("keyup",function(e){
      console.log(e.target.innerHTML); 
      emptySongs();
      var num = 0;
      allSongs.forEach((song) => {
        console.log(song.title.startsWith(e.target.innerHTML))
        if (song.title.startsWith(e.target.innerHTML)) {
          loadSong(num,song)
        }
        num++;
      })
    })
    isSearching = true;
  }else{
    input.innerHTML = "Search";
    isSearching = false;
    emptySongs();
    LoadSongs();
  }
});