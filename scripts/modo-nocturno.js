//MODO NOCTURNO
let body = document.getElementById("body");
let url = window.location.pathname;

let darkModeStorage = localStorage.getItem("darkMode");
let darkModeBtn = document.getElementById("menu-modo");
darkModeBtn.addEventListener("click", cambioMode);

//Darkmode activado
let darkModeActivado = () => {
  body.classList.add("body-dark");
  darkModeBtn.innerHTML = "Modo diurno";

  //navbar
  cambioLogos();
  cambioIconoCrearGifo();

  //home
  if (url === "/index.html" || url === "/gifos/index.html") {
    //funcion cambiar icono lupa violeta
    cambioIconosBusqueda();
  }

  //crear gifos
  if (url === "/creargifo.html" || url === "/gifos/creargifo.html") {
    //funcion cambiar imagenes camaras
    cambioCamaras();
  }

  localStorage.setItem("darkMode", "activado");
};

//Darkmode desactivado
let darkModeDesactivado = () => {
  body.classList.remove("body-dark");
  darkModeBtn.innerHTML = "Modo nocturno";

  //navbar
  cambioLogos();
  cambioIconoCrearGifo();

  //home
  if (url === "/index.html" || url === "/gifos/index.html") {
    //funcion cambiar icono lupa violeta
    cambioIconosBusqueda();
  }

  //crear gifos
  if (url === "/creargifo.html" || url === "/gifos/creargifo.html") {
    cambioCamaras();
  }

  localStorage.setItem("darkMode", null);
};

if (darkModeStorage === "activado") {
  darkModeActivado();
}

//Cambiar el modo
function cambioMode() {
  darkModeStorage = localStorage.getItem("darkMode");

  if (darkModeStorage !== "activado") {
    darkModeActivado();
  } else {
    darkModeDesactivado();
  }
}

function cambioLogos() {
  let logoMobile = document.getElementById("logo");
  let logoDesktop = document.getElementById("logo-desktop");

  if (darkModeBtn.innerHTML == "Modo nocturno") {
    logoDesktop.setAttribute("src", "./assets/logo-desktop.svg");
    logoMobile.setAttribute("src", "./assets/logo-mobile.svg");
  } else {
    logoDesktop.setAttribute("src", "./assets/logo-desktop-modo-noc.svg");
    logoMobile.setAttribute("src", "./assets/logo-mobile-modo-noc.svg");
  }
}

function cambioIconoCrearGifo() {
  let iconoCrearGifo = document.querySelector(".mas-violeta");
  let iconoCrearGifoHover = document.querySelector(".mas-blanco");

  if (darkModeBtn.innerHTML == "Modo nocturno") {
    iconoCrearGifo.setAttribute("src", "./assets/button-crear-gifo.svg");
    iconoCrearGifoHover.setAttribute(
      "src",
      "./assets/button-crear-gifo-hover.svg"
    );
  } else {
    iconoCrearGifo.setAttribute("src", "./assets/button-crear-gifo-hover.svg");
    iconoCrearGifoHover.setAttribute(
      "src",
      "./assets/button-crear-gifo-dark.svg"
    );
  }
}

function cambioIconosBusqueda() {
  if (darkModeBtn.innerHTML == "Modo nocturno") {
    iconBuscar.setAttribute("src", "./assets/icon-search.svg");
    btnCerrarBusqueda.setAttribute("src", "./assets/button-close.svg");
  } else {
    iconBuscar.setAttribute("src", "./assets/icon-search-mod-noc.svg");
    btnCerrarBusqueda.setAttribute("src", "./assets/button-close-modo-noc.svg");
  }
}

function cambioCamaras() {
  let camaraIlus = document.getElementById("camara-ilustracion");
  let peliculaIlus = document.getElementById("pelicula-ilus");

  if (darkModeBtn.innerHTML == "Modo nocturno") {
    camaraIlus.setAttribute("src", "./assets/camara.svg");
    peliculaIlus.setAttribute("src", "./assets/pelicula.svg");
  } else {
    camaraIlus.setAttribute("src", "./assets/camara-modo-noc.svg");
    peliculaIlus.setAttribute("src", "./assets/pelicula-modo-noc.svg");
  }
}
