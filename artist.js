const checkData = () => {
  const getUsername = localStorage.getItem("username");
  const getPassword = localStorage.getItem("password");

  const userName = document.getElementById("username");
  userName.innerText = getUsername;
};

checkData();

//translate time
function fmtMSS(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

//the fetch
let band = "dj-Khaled";
let url = new URLSearchParams(window.location.search);

const getArtist = async () => {
  band = url.get("artistId");
  console.log(band);

  await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${band}`
  )
    .then((response) => response.json())
    .then((artist) => {
      changeBackground(artist);
      getId(artist);
      getName(artist);
      getNmOfFans(artist);
      getSongList(artist);
      getAlbums(artist);
      getArtistPick(artist);
      console.log(artist);
    });
};
getArtist();

//change bg photo to Artist

const changeBackground = (artist) => {
  const backgroundPhoto = document.getElementById("mainPanel");

  backgroundPhoto.style.backgroundImage = `url('${artist.picture_xl}')`;
};
const getId = (artist) => {
  console.log(artist.id);
};
const getName = (artist) => {
  const h1 = document.querySelector("h1");
  h1.innerText = artist.name;
};
const getNmOfFans = (artist) => {
  const numOfFans = document.querySelector(".lead");
  const num = artist.nb_fan;

  let obj1 = new Intl.NumberFormat("en-US");
  let output1 = obj1.format(num);

  numOfFans.innerText = `${output1} monthly listeners`;
};

const getSongList = (artist) => {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artist.id}/top?limit=30`
  )
    .then((response) => response.json())
    .then((music) => {
      console.log(music);
      let songArray = music.data;
      const popular = document.getElementById("popular");
      let count = 0;
      for (let i = 0; songArray.length; i++) {
        count++;
        //songArray.forEach((song) => {
        const li = document.createElement("li");
        li.classList.add("d-flex", "justify-content-between", "greenlist");
        li.dataset.img = `${songArray[i].album.cover}`;
        li.dataset.song = `${songArray[i].title_short}`;
        li.dataset.artistName = `${artist.name}`;
        li.dataset.audio = `${songArray[i].preview}`;
        li.innerHTML = `
          <div class="d-flex" style="gap:20px;">
          <div class="d-flex align-items-center tinynum" style="width:10px; position:relative;">
          <div class="tinyplay" style="position:absolute; left:-10px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
          </svg>
          </div>
          ${count}</div>
          <div style="width:50px; height:50px;">
          <img src="${songArray[i].album.cover}" class="img-fluid"/>
          </div>
          <div class="m-0 littletitle" style="display:flex; align-items:center;">${
            songArray[i].title_short
          }</div></div>
          <div class="text-truncate" style="width:40%; display:flex; justify-content:center; align-items:center">${
            songArray[i].album.title
          }</div>
          <div class="d-flex align-items-center">
          <div class='favoriteheart mr-2'>
          <i class="fa-regular fa-heart"></i>
          </div>
          ${fmtMSS(songArray[i].duration)}
          <div class="d-flex align-items-center pl-3 tinyellip">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
  </svg>
  <div>
  </div>
  `;
        popular.appendChild(li);
        getBtns();
      }
      console.log(songArray);
    });
};

const getAlbums = (artist) => {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artist.id}/top?limit=30`
  )
    .then((response) => response.json())
    .then((music) => {
      let array = music.data;
      console.log(array);

      const popularReleases = document.getElementById("disco");

      array.forEach((album) => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `<a href="album.html?albumId=${album.album.id}"><div class="card p-3 rounded">
        <img src="${album.album.cover_xl}" class="card-img-top rounded" alt="..." style="box-shadow:black 0px 0px 15px;">
        <div class="card-body">
        <p class="card-text text-truncate">${album.album.title}</p>
        <p class="card-text">ID: ${album.album.id}</p>
        </div>
        </div></a>`;
        popularReleases.appendChild(div);
      });
      //console.log(moresongsArray);
    });
};

const getArtistPick = (artist) => {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artist.id}/top?limit=30`
  )
    .then((response) => response.json())
    .then((stuff) => {
      let data = stuff.data;
      let albums = [];
      data.map((data) => {
        console.log(data.album);
        albums.push(data.album);
      });
      console.log(albums[2]);
      const artistPick = document.getElementById("smrightpanel");
      const inside = document.createElement("div");
      inside.classList.add("d-flex");
      inside.style.gap = "10px";
      inside.style.fontSize = "10pt";
      inside.style.fontWeight = "bold";
      inside.innerHTML = `
        <a href="album.html?albumId=${albums[2].id}"><div style="width:84px; height:84px;"><img src="${albums[2].cover_xl}" class="img-fluid"/></div></a>
        <div id="artistpickstuff">
      <div class="d-flex" style="gap:5px;"><div style="width:20px; height:20px;"><img src="${artist.picture_xl}" class="rounded-circle img-fluid"/></div><p class="m-0">posted By ${artist.name}</p></div>
      <a href="#"><p class="m-0">${albums[2].title}</p></a>
      <p class="m-0">Album</p>`;
      artistPick.appendChild(inside);
    });
};

//play pause btns
const playbtn = document.getElementById("play");
const pausebtn = document.getElementById("pause");
const miniPlaybtn = document.getElementById("miniplay");
const miniPausebtn = document.getElementById("minipause");

const displayPlay = () => {
  pausebtn.style.display = null;
  miniPausebtn.style.display = null;

  pausebtn.classList.add("hidden");
  miniPausebtn.classList.add("hidden");

  playbtn.classList.remove("hidden");
  miniPlaybtn.classList.remove("hidden");

  audio.pause();
};

const displayPause = () => {
  playbtn.classList.add("hidden");
  miniPlaybtn.classList.add("hidden");

  pausebtn.classList.remove("hidden");
  miniPausebtn.classList.remove("hidden");

  pausebtn.style.display = "flex";

  audio.play();
};

playbtn.addEventListener("click", displayPause);
miniPlaybtn.addEventListener("click", displayPause);

pausebtn.addEventListener("click", displayPlay);
miniPausebtn.addEventListener("click", displayPlay);

//li set to play

const setToPlay = (event) => {
  displayPause();
  const img = document.getElementById("smalbumpic");
  const musicInfo = document.querySelector(".music-player-info");
  const artistInfo = document.querySelector(".artist-small-player");
  //target specific li element
  const selected = event.target.closest("li");

  //turns selected green and remove green
  const littlePlaybtn = document.querySelectorAll("li");

  for (let i = 0; i < littlePlaybtn.length; i++) {
    littlePlaybtn[i].classList.remove("spotifygreen");
  }

  selected.classList.add("spotifygreen");

  //uses dataset to retrieve the correct info and send it to the correct place
  img.src = selected.dataset.img;
  musicInfo.innerText = selected.dataset.song;
  artistInfo.innerText = selected.dataset.artistName;
  audio.src = selected.dataset.audio;

  audio.play();
  //const title = event.target;

  console.log(selected.dataset.audio);
};

const getBtns = () => {
  const littlePlaybtn = document.querySelectorAll("li");
  for (let i = 0; i < littlePlaybtn.length; i++) {
    littlePlaybtn[i].addEventListener("click", setToPlay);
  }
};

//trying color change on scroll
window.onscroll = function (event) {
  let topbar = document.getElementById("user-bar");
  let scroll = window.pageYOffset;
  if (scroll < 100) {
    topbar.style.backgroundColor = "transparent";
  } else if (scroll >= 300) {
    topbar.style.backgroundColor = "#5d2222";
  }
};
