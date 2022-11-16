//the fetch

let band = "staind";
let url = new URLSearchParams(window.location.search);

const getArtist = async () => {
  band = url.get("name");
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
      songArray.forEach((song) => {
        const li = document.createElement("li");
        li.classList.add("mb-2", "d-flex", "justify-content-between");
        li.innerHTML = `<div class="d-flex" style="gap:10px;";><div style="width:50px; height:50px;">
        <img src="${song.album.cover}" class="img-fluid"/></div>
        <div class="m-0" style="display:flex; align-items:center;">${song.title_short}</div></div><div class="text-truncate" style="width:40%; display:flex; justify-content:center;">${song.album.title}</div><div>${song.duration}</div>
        `;
        popular.appendChild(li);
      });
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
        div.innerHTML = `<div class="card p-3">
          <img src="${album.album.cover_xl}" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text text-truncate">${album.album.title}</p>
            <p class="card-text">ID: ${album.album.id}</p>
          </div>
        </div>`;
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
      inside.innerHTML = `
      <div style="width:84px; height:84px; background-color:aliceblue"><img src="${albums[2].cover_xl}" class="img-fluid"/></div>
      <div id="artistpickstuff">
          <div class="d-flex" style="gap:5px;"><div style="width:20px; height:20px;"><img src="${artist.picture_xl}" class="rounded-circle img-fluid"/></div><p class="m-0">posted By ${artist.name}</p></div>
          <a href="#"><p class="m-0">${albums[2].title}</p></a>
          <p class="m-0">Album</p>`;
      artistPick.appendChild(inside);
    });
};
