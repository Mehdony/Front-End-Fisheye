// import factory from "../factories/media.js";
import Lightbox from "../factories/lightbox.js";
import { like } from "../utils/like.js";
import { initSort} from "../utils/sort.js";
// import { init } from "../utils/sort.js";

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
    console.log("photographer");
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

    const totalLikes = medias?.reduce((acc, media) => {
      return acc + media.likes;
    }, 0);
    const dailyPrice = photographer.price;
    displayLikes(totalLikes, dailyPrice);

    // ***********
    const select = document.querySelector("select");
    select.addEventListener("change", function (e) {
      console.log(e.currentTarget.value);
      initSort(medias, e.currentTarget.value);
      like();
      Lightbox.init();
    });
    // ***********

    // // Affichage du model et des datas
    // async function displayData(medias) {
    //   const mediasSection = document.querySelector(".medias_section");

    //   medias.forEach((media) => {
    //     // Envoie des medias vers la factory
    //     // Construction de la carte media grâce aux données envoyées à la factory
    //     const mediaCardDOM = factory(media);
    //     // Ajout de la carte a media_section
    //     mediasSection.innerHTML += mediaCardDOM.displayInList();

    //     console.log(media);
    //   });
    // }

    function displayLikes(totalLikes, dailyPrice) {
      let likes = document.querySelector(".info-like-number");
      let price = document.querySelector(".info-price-number");
      likes.innerHTML = totalLikes;
      price.innerHTML = dailyPrice;
    }

    async function init() {
      // Récupère les datas des photographes
      // const { medias } = await get();
      // await displayData(medias);
      initSort(medias, "popularity");
      like();
      Lightbox.init();

      // init();
    }



    init();
  });
});
