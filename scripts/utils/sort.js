// Model ( comportement des données , sortBy = [ les medias triés par date où les medias triés par likes où les medias triés par prix ] )
const sortBy = (items, option) => {
  if (option === "popularity") {
    items.sort(function (a, b) {
      return b.likes - a.likes;
    });
  } else if (option === "date") {
    items.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  } else if (option === "price") {
    items.sort(function (a, b) {
      return b.price - a.price;
    });
  }
};

// Vue ( affichage des données - comment les données vont être affichées sur la page )
const display = (items, mediasContainer) => {
  mediasContainer.innerHTML = "";
  items.forEach((item) => {
    mediasContainer.innerHTML += buildDom(item);
  });
};

const buildDom = (item) => {
  if (item.image) {
    // modèle de card image
    return `<figure>
        <img class="media-card media-image" src="../assets/medias/${item.photographerId}/${item.image}" alt="${item.title}" tabindex="1">
        <div class='figcaption-container'>
        <figcaption>${item.title} </figcaption>
        <h2 class='media-likes-count' aria-label="${item.likes} likes" tabindex='1'>${item.likes} </h2> 
        <img src='../assets/icons/heart.svg'  class='heart-icon' alt='heart' aria-label='ajouter un like' tabindex='1'>
        </div>
    </figure>`;
  } else {
    // modèle de card vidéo
    return `<figure>
        <video class=" media-card media-video" width="300" height="300"  src="../assets/medias/${item.photographerId}/${item.video}" type="video/mp4" alt="${item.title}" tabindex="1">
            <source  src="../assets/medias/${item.photographerId}/${item.video}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <div class='figcaption-container'>
        <figcaption>${item.title}</figcaption>
        <h2 class='media-likes-count'  aria-label="${item.likes} likes" tabindex='1'>${item.likes} </h2>
        <img src='../assets/icons/heart.svg'  class='heart-icon' alt='heart' aria-label='ajouter un like' tabindex='1'>
        </div>
    </figure>`;
  }
};

// controlleur ( traitement des données  , appeler la fonction sortBy pour obtenir les medias  et envoyer les médias à la fonction display qui va afficher les datas )
export const initSort = (items, option) => {
  const mediasContainer = document.querySelector(".medias_section");
  sortBy(items, option);
  display(items, mediasContainer);
};
