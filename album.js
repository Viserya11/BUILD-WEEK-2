const options = {
    method: "GET",
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZmUyZmQ0YmUzZDAwMTU4NDYwNDkiLCJpYXQiOjE2Njg1OTcwNzMsImV4cCI6MTY2OTgwNjY3M30.FqRjs8mQxhkR9YOH9MxqgSOIVnidFK_PPFHdW2kmIAU"
        }
        }


async function getAlbum() {
const response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/album/75621062", options)
const parsed = await response.json();
console.log(parsed)
return parsed
}

getAlbum()

const showData = (albums) => {

    let albumPhoto = document.querySelector(".topimage")
    let topdetails = document.querySelector(".toptext")
    
    albumPhoto.innerHTML = ""
    topdetails.innerHTML = ""

    for (let album of albums) {
       albumPhoto.innerHtml +=`
        <div class="topimage"><img src="${album.picture}" alt=""></div>
        `
        topdetails.innerHTML += `<p class="albumname">ALBUM</p>
        <h1 class="albumtitle">${album.title}</h1>
        <p class="bandname"><a href="#">${album.artist}</a></p>
        `

        

   }


}

showData(albums)
