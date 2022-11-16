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
  const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
  const data = await response.json()
  const songs = data.data
  const gymRow = document.querySelector('.gymsongs')

 for(let i =0; i < songs.length -15; i++) {
  const song = songs[i]
    gymRow.innerHTML += card(song);
  };
};


let defaultArtist = "Queen";

const search = async (artist = defaultArtist) => {
  const row = document.querySelector("#results .row");
  const h2 = document.querySelector("#results h2");

  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`
  );
  const data = await response.json();
  const songs = data.data;

  h2.innerText = 'Results: ' +artist;
  h2.id="searchResult"
  

  row.innerHTML = "";

  songs.forEach((song) => {
    row.innerHTML += card(song);
    
  });
};
let xmas = "santa"
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
}


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
  console.log(elem)
}



window.onload = () => {
  search();
};