apiKey = "vduTWNh4rqZFjyNl1Hhs46qphCdPljbT";

let pantallaFavoritos = document.getElementById("resultados-favoritos");

let favoritosArray = [];
let favoritosString = localStorage.getItem("gifosFavoritos");

let modalMobileFav = document.createElement("div");
let modalDesktopFav = document.createElement("div");

let urlActual = window.location.pathname;

/* if (urlActual ==="/gifos/favoritos.html" || urlActual==="/favoritos.html") {
    //solo corre la funcion si estoy en la pagina de favoritos
    buscarFavoritos();
} */

buscarFavoritos();

function buscarFavoritos() {
  let pantallaFavoritosVacio = document.getElementById("favoritos-vacio");

  if (favoritosString == null || favoritosString == "[]") {
    pantallaFavoritosVacio.style.display = "block";
    pantallaFavoritos.style.display = "none";
  } else {
    favoritosArray = JSON.parse(favoritosString);
    let urlFavoritos = `https://api.giphy.com/v1/gifs?ids=${favoritosArray.toString()}&api_key=${apiKey}`;

    fetch(urlFavoritos)
      .then((response) => response.json())
      .then((content) => {
        mostrarFavoritos(content);
      })
      .catch((err) => {
        console.error("fetch favoritos fallo", err);
      });
  }
}

function mostrarFavoritos(content) {
  let gifosFavoritosArray = content.data;

  for (let i = 0; i < gifosFavoritosArray.length; i++) {
    pantallaFavoritos.innerHTML += `
        <div class="resultados-gif-box-fav" onclick="maxGifMobileFav('${content.data[i].images.downsized.url}', '${content.data[i].id}', '${content.data[i].slug}', '${content.data[i].username}', '${content.data[i].title}')">
        <div class="gif-acciones-resultados-fav">
            <div class="iconos-acciones-gif">
                <button class="iconos-acciones-box favorito-fav" onclick="borrarFav('${content.data[i].id}')">
                    <img src="./assets/icon-fav-active.svg" alt="icon-favorito" id="icon-borrar-fav-${content.data[i].id}">
                </button>
                <button class="iconos-acciones-box download" onclick="descargarGif('${content.data[i].images.downsized.url}', '${content.data[i].slug}')">
                    <img src="./assets/icon-download.svg" alt="icon-dowlnoad">
                </button>
                <button class="iconos-acciones-box max" onclick="maxGifDesktopFav('${content.data[i].images.downsized.url}', '${content.data[i].id}', '${content.data[i].slug}', '${content.data[i].username}', '${content.data[i].title}')">
                    <img src="./assets/icon-max.svg" alt="icon-max">
                </button>
            </div>
            <div class="textos-descripcion-gif-favoritos">
                <p class="user-gif-favoritos">${content.data[i].username}</p>
                <p class="titulo-gif-favoritos">${content.data[i].title}</p>
            </div>
        </div>
        <img src="${content.data[i].images.downsized.url}" alt="${content.data[i].title}" class="resultados-gif">
    </div>
        `;
  }
}

//FUNCION BORRAR FAV
function borrarFav(gif) {
  let arrayAux = [];
  arrayAux = JSON.parse(favoritosString);
  let indice = arrayAux.indexOf(gif);

  arrayAux.splice(indice, 1);

  let nuevoFavoritosString = JSON.stringify(arrayAux);
  localStorage.setItem("gifosFavoritos", nuevoFavoritosString);

  let iconFavBorrar = document.getElementById("icon-borrar-fav-" + gif);
  iconFavBorrar.setAttribute("src", "./assets/icon-fav-hover.svg");

  location.reload();
}

//FUNCION DESCARGAR GIF
async function descargarGif(gifImg, gifNombre) {
  let blob = await fetch(gifImg).then((img) => img.blob());
  invokeSaveAsDialog(blob, gifNombre + ".gif");
}

//FUNCION MAXIMIZAR GIF mobile
function maxGifMobileFav(img, id, slug, user, title) {
  if (window.matchMedia("(max-width: 1023px)").matches) {
    modalMobileFav.style.display = "block";
    modalMobileFav.innerHTML = `
    <button class="modal-btn-close" onclick="cerrarModalMobileFav()"><img src="./assets/button-close.svg" alt=""></button>
    <img src="${img}" alt="${id}" class="modal-gif">

    <div class="modal-bar">
        <div class="modal-textos">
            <p class="modal-user">${user}</p>
            <p class="modal-titulo">${title}</p>
        </div>
        <div>
            <button class="modal-btn" onclick="borrarFavMaxMob('${id}')"><img src="./assets/icon-fav-active.svg" alt="fav-gif" id="icon-borrar-fav-max-mobile-${id}"></button>
            <button class="modal-btn" onclick="descargarGif('${img}', '${slug}')"><img src="./assets/icon-download.svg" alt="download-gif"></button>
        </div>
    </div>
    `;
    modalMobileFav.classList.add("modal-activado");
    document.body.appendChild(modalMobileFav);
  }
}

function cerrarModalMobileFav() {
  modalMobileFav.style.display = "none";
}

function borrarFavMaxMob(gif) {
  let iconNoFavMaxMob = document.getElementById(
    "icon-borrar-fav-max-mobile-" + gif
  );
  iconNoFavMaxMob.setAttribute("src", "./assets/icon-fav-hover.svg");
  borrarFav(gif);
}

//MAXIMIZAR GIF DESKTOP
function maxGifDesktopFav(img, id, slug, user, title) {
  if (window.matchMedia("(min-width: 1023px)").matches) {
    modalDesktopFav.style.display = "block";
    modalDesktopFav.innerHTML = `
    <button class="modal-btn-close" onclick="cerrarModalDesktopFav()"><img src="./assets/button-close.svg" alt=""></button>
    <img src="${img}" alt="${id}" class="modal-gif">

    <div class="modal-bar">
        <div class="modal-textos">
            <p class="modal-user">${user}</p>
            <p class="modal-titulo">${title}</p>
        </div>
        <div>
            <button class="modal-btn" onclick="borrarFavMax('${id}')"><img src="./assets/icon-fav-active.svg" alt="fav-gif" id="icon-borrar-fav-max-${id}"></button>
            <button class="modal-btn" onclick="descargarGif('${img}', '${slug}')"><img src="./assets/icon-download.svg" alt="download-gif"></button>
        </div>
    </div>
    `;
    modalDesktopFav.classList.add("modal-activado");
    document.body.appendChild(modalDesktopFav);
  }
}

function cerrarModalDesktopFav() {
  modalDesktopFav.style.display = "none";
}

function borrarFavMax(gif) {
  let iconNoFavMax = document.getElementById("icon-borrar-fav-max-" + gif);
  iconNoFavMax.setAttribute("src", "./assets/icon-fav-hover.svg");
  borrarFav(gif);
}
