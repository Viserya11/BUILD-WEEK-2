const card = (
  song
) => `<div   class="col-12 col-md-3 col-lg-2 card  m-2 text-center dark-cards SongCards ">
<img  class="img-fluid" src="${song.album.cover_xl}" alt="img placeholder" />

<img class="playButtonCard"src="./assets/Spotify-Play-Button.png" 

<p>
  <a href="/album.html?albumId=${song.album.id}">${song.album.title}</a>
  <br />
  <a href="/artist.html?artistId=${song.artist.id}">${song.artist.name}</a>
</p>
</div>
`;

let gym = "gym";
const gymSongs = async (artist = gym) => {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`
  );
  const data = await response.json();
  const songs = data.data;
  const gymRow = document.querySelector(".gymsongs");

  for (let i = 0; i < songs.length - 15; i++) {
    const song = songs[i];
    console.log(song);
    gymRow.innerHTML += card(song);
  }
};

gymSongs();

let defaultArtist = "Queen";

const search = async (artist = defaultArtist) => {
  const row = document.querySelector("#results .row");
  const h2 = document.querySelector("#results h2");

  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`
  );
  const data = await response.json();
  const songs = data.data;

  h2.innerText = "Results: " + artist;
  h2.id = "searchResult";

  row.innerHTML = "";

  songs.forEach((song) => {
    row.innerHTML += card(song);
  });
};
let xmas = "santa";
const christmasSongs = async (artist = xmas) => {
  const goodMorningRow = document.querySelector(".goodMorning");
  const ul = document.getElementById("list");
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`
  );
  const data = await response.json();
  const songs = data.data;

  goodMorningRow.classList.add = "text-center justifty-content-center";
  for (let i = 0; i < songs.length - 15; i++) {
    const song = songs[i];

    goodMorningRow.innerHTML += `<div class="col-5  col-lg-2  goodMorningDivs m-2 mb-5">
<div class="img-div">
 <img class="  " src="${song.album.cover_medium}" alt="img placeholder" height="60px"  />
 </div>

<div class="text-div">
<a class=" a-gm ml-2" href="/album.html">${song.title_short}</a>
</p></div>
 
 
 
</div>
`;

    ul.innerHTML += `<li class="li-list">${song.title_short}</li>`;
    console.log(ul);
  }
};

christmasSongs();

const getSearch = (event) => {
  const query = document.getElementById("searchField").value;

  if (query.length > 2) {
    search(query);
  }

  defaultArtist = event.target.value;

  if (event.key === "Enter" && event.target.value.length > 3) {
    search();
  }
};

function scrolldiv() {
  var elem = document.getElementById("searchResult");
  elem.scrollIntoView();
  console.log(elem);
}

window.onload = () => {
  search();
};


const checkData = () => {
  const getUsername = localStorage.getItem("username");
  const getPassword = localStorage.getItem("password");
  const topbar = document.getElementById("topbar");
  const newTopbar = document.getElementById("newTopbar");
  const usernameDiv = document.getElementById("usernameDiv");

  const margin = document.getElementById('margin-div')

  console.log(getPassword);
  console.log(getUsername);
  if (getUsername === "") {
    topbar.style.display = "inline";
    newTopbar.style.display = "none";
    usernameDiv.style.display = "none";
    margin.style.display = "none";
    annoyingRow.classList.add("background-color-row");
  } else {
    topbar.style.display = "none";
    newTopbar.style.display = "inline";
    newTopbar.innerHTML += ` <div class="account-dropdown-nav-item dropdown newdropdown loginName">
<div class="d-flex "><svg class="mr-1"xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-person" viewBox="0 0 16 16">
<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
</svg><img class="spotify-logo-mobile" height="50px" src="./logo/Spotify_Logo.png"/><div>
  <a class="account-dropdown-nav-link newdropdown-2 dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">${getUsername}</a></div>`;
  }
};
checkData();
