//the fetch

let band = "Rihanna";

const getArtist = async () =>
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
      console.log(artist);
    });
getArtist();

//change bg photo to Artist

const changeBackground = (artist) => {
  const backgroundPhoto = document.getElementById("mainPanel");

  backgroundPhoto.style.backgroundImage = `url('${artist.picture_big}')`;
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
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artist.id}/top?limit=5`
  )
    .then((response) => response.json())
    .then((music) => {
      let songArray = music.data;
      const popular = document.getElementById("popular");
      songArray.forEach((song) => {
        const li = document.createElement("li");
        li.classList.add("mb-2", "d-flex", "justify-content-between");
        li.innerHTML = `<div style="width:50px; height:50px;">
        <img src="${song.album.cover}" class="img-fluid"/></div>
        <div>${song.title_short}</div>
        `;
        popular.appendChild(li);
      });
      console.log(songArray);
    });
};
