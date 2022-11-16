const urlParams = new URLSearchParams(window.location.search);
const albumId = urlParams.get("album_id");

const options = {
    method: "GET",
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZmUyZmQ0YmUzZDAwMTU4NDYwNDkiLCJpYXQiOjE2Njg1OTcwNzMsImV4cCI6MTY2OTgwNjY3M30.FqRjs8mQxhkR9YOH9MxqgSOIVnidFK_PPFHdW2kmIAU"
        }
        }


async function getAlbum() {
const response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + albumId, options)
const album = await response.json();
console.log(album)


const albumPhoto = document.querySelector('.topimg')
const albumTitle = document.querySelector('.toptext .albumtitle');
const bandName = document.querySelector('.toptext .bandname a');
const playerimage = document.querySelector('.playerimg')
const bottomalbumname = document.querySelector('.bottomalbumname')

albumTitle.innerHTML = album.title;
bandName.innerHTML = album.artist.name;
bandName.href = "artist.html?=artist_id=";
albumPhoto.src = album.cover;
playerimage.src = album.cover;
bottomalbumname.innerHTML = album.title;


}

document.addEventListener("DOMContentLoaded", function(event) {
    getAlbum();
  });

