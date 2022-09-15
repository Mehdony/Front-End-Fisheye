import Lightbox from "../factories/lightbox.js";
import { like } from "../utils/like.js";
import { initSort} from "../utils/sort.js";

//  récupérer l'id du photographe dans l'url
const urlRequest = window.location.search;
const urlSearchParams = new URLSearchParams(urlRequest);
const userId = urlSearchParams.get("id");


fetch("../data/photographers.json").then((res) => {
  res.json().then((res) => {
    // liste des photographes
    const photographersList = res;
    // avec la methode Find on va récupérer les données du photographe qui correspond à l'id dans l'url
    const photographer = photographersList.photographers.find(
      (photographer) => photographer.id == userId
    );
  
  // ****************************** AFFICHAGE DE LA BANNIERE DU PHOTOGRAPHE ****************************** //
    const infoContainer = document.querySelector(".info-container");
    const userName = document.querySelector(".photograph-name");
    const location = document.querySelector(".photograph-location");
    const quote = document.querySelector(".photograph-quote");
    const pp = document.querySelector(".pp");
    pp.setAttribute("alt", photographer.name);

    infoContainer.setAttribute("aria-label", `${photographer.name} - ${photographer.location}`);
    userName.innerText = photographer.name;
    location.innerText = `${photographer.city}, ${photographer.country}`;
    quote.innerText = photographer.tagline;
    pp.setAttribute("src", ` ../assets/photographers/${photographer.portrait}`);
    pp.classList.add("profile-picture");

    // ****************************** AFFICHAGE DES MEDIAS DU PHOTOGRAPHE ****************************** //

    // Récupérations des medias d'un photographe(correspondant à userId)
    const medias = photographersList.media.filter(
      (media) => media.photographerId == userId
    );

    // permet d'accumuler le nombre de likes de chaque média du photographe
    const totalLikes = medias?.reduce((acc, media) => {
      return acc + media.likes;
    }, 0);
    //  récuperation du prix journalier du photographe
    const dailyPrice = photographer.price;
    // affichage des likes et du prix journalier du photographe
    displayLikes(totalLikes, dailyPrice);


    function displayLikes(totalLikes, dailyPrice) {
      let likes = document.querySelector(".info-like-number");
      let price = document.querySelector(".info-price-number");
      likes.innerHTML = totalLikes;
      price.innerHTML = dailyPrice;
      
    }

    // géré l'affichage des médias par rapport au filtre choisi
    const select = document.querySelector("select");
    select.addEventListener("change", function (e) {
      initSort(medias, e.currentTarget.value);
      like();
      Lightbox.init();
    });

    
    // Fonction permettant d'afficher les médias triés par popularité par défaut au chargement de la page
    async function init() {
      initSort(medias, "popularity");
      like();
      Lightbox.init();
    }



    init();
  });
});
