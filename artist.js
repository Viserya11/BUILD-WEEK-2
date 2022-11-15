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
