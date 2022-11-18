const urlParams = new URLSearchParams(window.location.search);
const albumId = urlParams.get("albumId");
function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}
const pausebutton = document.querySelector("#pause")
pausebutton.classList.add("hidden")


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

async function getSongs() {
    const response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + albumId, options)
const album = await response.json();
console.log(album)

const songinfo = document.querySelector('.song-info')
songinfo.innerHTML = ""


for (i=0; i < album.tracks.data.length; i++) {
    songinfo.innerHTML +=`
    
    <div class="songrow" onclick="passDetails('${album.tracks.data[i].title}', '${album.tracks.data[i].duration}', '${album.tracks.data[i].preview}', event )">
            <div class="songtitle col">
              <span class="songnumber">${i+1}</span>${album.tracks.data[i].title}
            </div>
            <div class="songduration col order-5">
            ${fmtMSS(album.tracks.data[i].duration)}
            </div>
            <div class="album col order-1" >
              ${album.tracks.data[i].title}
            </div>
          </div>
        </div>`
}

}

getSongs()

document.addEventListener("DOMContentLoaded", function(event) {
    getAlbum();
  });

 
async function passDetails(songtitle, duration, preview, event) {
    const response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + albumId, options)
const album = await response.json();
console.log(album)

const playertitle = document.querySelector(".bottomsongtitle")
const songduration = document.querySelector(".duration")
const audio = document.querySelector("#audio")
const playbutton = document.querySelector("#play")

    playertitle.innerHTML =`<p class="bottomsongtitle">${songtitle}</p>`
    songduration.innerHTML = `<span class="duration">${fmtMSS(duration)}</span>`
    audio.src = preview
    playbutton.classList.add("hidden")
    pausebutton.classList.remove("hidden")
    audio.play()

    
    let green = document.querySelectorAll(".greentext")

    for (i=0; i < green.length; i++) {
        green[i].classList.remove("greentext")
    }
   
    event.target.classList.add("greentext")
  
  
    
}

const checkData = () => {
    const getUsername = localStorage.getItem("username");
    const getPassword = localStorage.getItem("password");
  
   document.querySelector(".account-dropdown-nav-link").innerHTML = `${getUsername}`
}

checkData()

function pauseSong() {



const playbutton = document.querySelector("#play")
playbutton.classList.remove("hidden")
pausebutton.classList.add("hidden")



audio.pause()

}

function playSong() {
    const playbutton = document.querySelector("#play")
    playbutton.classList.add("hidden")   
    pausebutton.classList.remove("hidden")

    audio.play()
}

