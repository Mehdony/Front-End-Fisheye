class Lightbox {

  // gerer le chargement de la lightbox
  static init() {
    // récupérer les images
    const links = Array.from(
      document.querySelectorAll(
        "img:not(.logo):not(.heading-image):not(.close):not(.pp):not(#close):not(.heart-icon):not(.heart-icon-bottom), video"
      )
    );

    // récupérer les attributs src et alt des images et vidéos et les stocker dans des tableaux
    const gallery = links.map((link) => link.getAttribute("src"));
    const alts = links.map((link) => link.getAttribute("alt"));


    // ajouter un écouteur d'événement sur chaque image et vidéo
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        // créer une nouvelle instance de Lightbox en lui passant l'url de l'image et le tableau des images
        new Lightbox(
          e.currentTarget.getAttribute("src"),
          gallery,
          alts,
          e.currentTarget.getAttribute("alt")
        );
      })
    );

    // Idem qu'au dessus mais pour l'accessibilité au clavier
    links.forEach((link) =>
      link.addEventListener("keydown", (e) => {
       if(e.key === "Enter") {
          e.preventDefault();

          new Lightbox(
            e.currentTarget.getAttribute("src"),
            gallery,
            alts,
            e.currentTarget.getAttribute("alt")
          );
        }
      })
    );
  }

  
  constructor(url, gallery, alts, alt) {
    this.element = this.buildDOM(url);
    this.gallery = gallery;
    this.alts = alts;

    if (url.endsWith(".mp4")) {
      this.loadVideo(url, alt);
    } else {
      this.loadImage(url, alt);
    }

    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }


  // construire le DOM de la lightbox pour une image 
  loadImage(url, alt) {
    this.alt = alt;
    this.url = null;
    const image = new Image();
    const container = this.element.querySelector(".lightbox_container");
    const loader = document.createElement("div");
    const caption = document.createElement("p");
    const figContainer = document.createElement("figure");
    figContainer.appendChild(image);
    figContainer.appendChild(caption);
    caption.innerHTML = this.alt;
    loader.classList.add("lightbox_loader");
    container.innerHTML = "";
    container.appendChild(loader);
    image.onload = () => {
      container.removeChild(loader);
      container.appendChild(figContainer);
      this.url = url;
      this.alt = alt;
    };
    image.src = url;
  }

  // construire le DOM de la lightbox pour une vidéo
  loadVideo(url, alt) {
    this.alt = alt;
    this.url = null;
    const video = document.createElement("video");
    const container = this.element.querySelector(".lightbox_container");
    const loader = document.createElement("div");
    const caption = document.createElement("p");
    const figContainer = document.createElement("div");
    figContainer.appendChild(video);
    figContainer.appendChild(caption);
    caption.innerHTML = this.alt;

    loader.classList.add("lightbox_loader");
    container.innerHTML = "";
    container.appendChild(loader);
    const refresher = () => {
      container.replaceChildren(figContainer);
      this.alt = alt;
      this.url = url;
    };
    video.onloadeddata = refresher;
    video.setAttribute("src", url);
    video.setAttribute("controls", true);
    video.setAttribute("autoplay", true);
    video.setAttribute("preload", "auto");
    video.setAttribute("alt", alt);
    this.url = url;
    video.src = url;
    video.innerHTML = `<source src="${url}" type="video/mp4">`;
  }


  // gestion de la navigation entre les images (suivant)
  next(e) {
    e.preventDefault();
    let i = this.gallery.findIndex((image) => image === this.url);

    if (i === this.gallery.length - 1) {
      i = -1;
    }

    if (this.gallery[i + 1].endsWith(".mp4")) {
      this.loadVideo(this.gallery[i + 1], this.alts[i + 1]);
    } else {
      this.loadImage(this.gallery[i + 1], this.alts[i + 1]);
    }
    
  }

  // gestion de la navigation entre les images (précédent)
  prev(e) {
    e.preventDefault();
    let i = this.gallery.findIndex((image) => image === this.url);
    if (i === 0) {
      i = this.gallery.length;
    }
    if (this.gallery[i - 1].endsWith(".mp4")) {
      this.loadVideo(this.gallery[i - 1], this.alts[i - 1]);
    } else {
      this.loadImage(this.gallery[i - 1], this.alts[i - 1]);
    }
  }


// gestion des touches du clavier pour l'accèsibilité
  onKeyUp(e) {
    switch (e.key) {
      case 'Escape' : 
      this.close(e);
      break
      case 'ArrowLeft' :
      this.prev(e);
      break
      case 'ArrowRight' :
      this.next(e);
      break
    }
  }

  // fermer la lightbox
  close(e) {
    e.preventDefault();
    this.element.classList.add("fadeOut");
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  // construire le DOM de la lightbox
  buildDOM() {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `
            <button class="lightbox_close"></button>
            <button class="lightbox_next"></button>
            <button class="lightbox_prev"></button>
            <div class="lightbox_container">
            </div>`;
    dom
      .querySelector(".lightbox_close")
      .addEventListener("click", this.close.bind(this));
    dom
      .querySelector(".lightbox_next")
      .addEventListener("click", this.next.bind(this));
    dom
      .querySelector(".lightbox_prev")
      .addEventListener("click", this.prev.bind(this));
    return dom;
  }
}

export default Lightbox;
