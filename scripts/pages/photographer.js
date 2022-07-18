//Mettre le code JavaScript lié à la page photographer.html
const id = window.location.search;
const urlSearchParams = new URLSearchParams(id);
const userId = urlSearchParams.get("id");
console.log(userId);

fetch("../data/photographers.json").then((res) => {
  res.json().then((res) => {
    const photographersList = res;
    console.log(photographersList.photographers);
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
  });
});
