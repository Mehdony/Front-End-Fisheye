import factory from "../factories/media.js";
import Lightbox from "../factories/lightbox.js";

//Mettre le code JavaScript lié à la page photographer.html
const urlRequest = window.location.search;
const urlSearchParams = new URLSearchParams(urlRequest);
const userId = urlSearchParams.get("id");
// console.log(userId);

fetch("../data/photographers.json").then((res) => {
  res.json().then((res) => {
    const photographersList = res;
    // console.log(photographersList.photographers);
    const photographer = photographersList.photographers.find(
      (photographer) => photographer.id == userId
    );
    console.log(photographer);

    const userName = document.querySelector(".photograph-name");
    const location = document.querySelector(".photograph-location");
    const quote = document.querySelector(".photograph-quote");
    const pp = document.querySelector(".pp");

    userName.innerText = photographer.name;
    location.innerText = `${photographer.city}, ${photographer.country}`;
    quote.innerText = photographer.tagline;
    pp.setAttribute("src", ` ../assets/photographers/${photographer.portrait}`);
    pp.classList.add("profile-picture");

    // Récupérations des medias d'un photographe(correspondant à userId)
    const medias = photographersList.media.filter(
      (media) => media.photographerId == userId
    );
    console.log(medias);

    // Affichage du model et des datas
    async function displayData(medias) {
      const mediasSection = document.querySelector(".medias_section");

      medias.forEach((media) => {
        // Envoie des medias vers la factory
        // Construction de la carte media grâce aux données envoyées à la factory
        const mediaCardDOM = factory(media);
        // Ajout de la carte a media_section
        mediasSection.innerHTML += mediaCardDOM.displayInList();

        console.log(media);
      });

      // affichage du prix et des likes
      // const price = document.querySelector(".price");
      // const likes = document.querySelector(".likes");
      // price.innerText = `${photographer.price}€/jour`;
      // likes.innerText = `${photographer.likes} likes`;
  
    }

    async function init() {
      // Récupère les datas des photographes
      // const { medias } = await get();
      displayData(medias);
      Lightbox.init()
    }

    init();
  });
});
