//the fetch

let band = "queen";

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
      console.log(artist);
    });

//change bg photo to Artist

const changeBackground = (artist) => {
  const backgroundPhoto = document.getElementById("mainPanel");

  backgroundPhoto.style.backgroundImage = `url('${artist.picture_big}')`;
};
const getId = (artist) => {
  console.log(artist.id);
};
const getName = (artist) => {
  const h1 = document.getElementsByTagName("h1");
  h1.innerText = artist.name;
};
const getNmOfFans = (artist) => {
  const numOfFans = document.querySelector(".lead");
  const num = artist.nb_fan;

  let obj1 = new Intl.NumberFormat("en-US");
  let output1 = obj1.format(num);

  numOfFans.innerText = `${output1} monthly listeners`;
};
