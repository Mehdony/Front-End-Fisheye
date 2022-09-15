// Récuperations des datas dans le fichier json
import { photographerFactory } from "../factories/photographer.js";

// on récupère les données des photographes dans le fichier json
async function getPhotographers() {

  const response = await fetch("../data/photographers.json");
  const photographersList = await response.json();

  // on crée un tableau vide
  const photographers = [];

  // on envoie dans le tableau vide les données des photographes
  photographers.push(...photographersList.photographers);

  // et bien retourner le tableau photographers seulement une fois
  return {
    photographers: [...photographers],
  };
}

// Affichage du model et des datas
async function displayData(photographers) {

    // on récupère l'endroit où seront affichés les photographes
  const photographersSection = document.querySelector(".photographer_section");

//   on parcourt le tableau photographers pour afficher les données des photographes dans le DOM
  photographers.forEach((photographer) => {
    //  on crée une instance de photographerFactory pour chaque photographe
    const photographerModel = photographerFactory(photographer);
    // on récupère la carte avec les infos du photographe
    const userCardDOM = photographerModel.getUserCardDOM();
    // on affiche la carte dans le DOM
    photographersSection.appendChild(userCardDOM);
    
    // permet de rediriger vers la page du photographe en appuyant sur la touche entrée
    userCardDOM.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        window.location.href = `photographer.html?id=${photographer.id}`;
      }
    });
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
