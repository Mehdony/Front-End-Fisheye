import Lightbox from "../factories/lightbox.js";
import { like } from "../utils/like.js";
import { initSort} from "../utils/sort.js";

//Mettre le code JavaScript lié à la page photographer.html
const urlRequest = window.location.search;
const urlSearchParams = new URLSearchParams(urlRequest);
const userId = urlSearchParams.get("id");


fetch("../data/photographers.json").then((res) => {
  res.json().then((res) => {
    const photographersList = res;
    const photographer = photographersList.photographers.find(
      (photographer) => photographer.id == userId
    );
  
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

    // Récupérations des medias d'un photographe(correspondant à userId)
    const medias = photographersList.media.filter(
      (media) => media.photographerId == userId
    );

    const totalLikes = medias?.reduce((acc, media) => {
      return acc + media.likes;
    }, 0);
    const dailyPrice = photographer.price;
    displayLikes(totalLikes, dailyPrice);


    const select = document.querySelector("select");
    select.addEventListener("change", function (e) {
      initSort(medias, e.currentTarget.value);
      like();
      Lightbox.init();
    });

    function displayLikes(totalLikes, dailyPrice) {
      let likes = document.querySelector(".info-like-number");
      let price = document.querySelector(".info-price-number");
      likes.innerHTML = totalLikes;
      price.innerHTML = dailyPrice;
      
    }

    

    async function init() {
      initSort(medias, "popularity");
      like();
      Lightbox.init();
    }



    init();
  });
});
