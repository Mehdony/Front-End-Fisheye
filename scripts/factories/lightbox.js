class Lightbox {
  static init() {
    const links = document.querySelectorAll(
      'img[src$=".png"], img[src$=".jpg"], img[src$=".jpeg"], video'
    );
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(link);
        new Lightbox(e.currentTarget.getAttribute("src"));
      })
    );
  }

  // Chaine de carractères qui renvois vers l'url de l'image
  constructor(url) {
    this.element = this.buildDOM(url)
    if(url.endsWith(".mp4")) {
      console.log(url);
      this.loadVideo(url)
    }
    else {
      console.log("image");
      this.loadImage(url)
    }
    this.onKeyUp = this.onKeyUp.bind(this)
    document.body.appendChild(this.element)
    document.addEventListener("keyup", this.onKeyUp.bind(this))
  }


  loadImage(url) {
    const image = new Image();
    const container = this.element.querySelector(".lightbox_container");
    const loader = document.createElement("div");
    loader.classList.add("lightbox_loader");
    container.appendChild(loader);
    image.onload = function () {
      container.removeChild(loader);
      container.appendChild(image);
    }
    image.src = url;
  }


  loadVideo(url) {
    this.url = null;
    const video = document.createElement("video");
    const container = this.element.querySelector(".lightbox_container");
    const loader = document.createElement("div");
    loader.classList.add("lightbox_loader");
    container.appendChild(loader);
    const refresher =() => {
      container.replaceChildren(video);
    }
    video.onloadeddata = refresher;
    video.setAttribute("src", url);
    video.setAttribute("controls", true);
    video.setAttribute("autoplay", false);
    video.setAttribute("preload", "auto");
    this.url = url;
    console.log(this.url);
    video.src = url;
    video.innerHTML = `<source src="${url}" type="video/mp4">`;
  }

  next(e)
  {
    
  }
  prev(e)
  {
    
  }

  // Keyboard event

  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e)
    }
  }

  // Fermeture de la lightbox

  close(e) {
    e.preventDefault();
    this.element.classList.add('fadeOut');
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  buildDOM() {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `
    <button class="lightbox_close">Close</button>
    <button class="lightbox_next"> next </button>
    <button class="lightbox_prev"> prev </button>
    <div class="lightbox_container"> 
        </div>`
        dom.querySelector(".lightbox_close").addEventListener("click", this.close.bind(this))
      return dom
  }
}

/* <div class="lightbox">

</div> */
// Lightbox.init()
export default Lightbox;
{/* <div class="lightbox_loader"><div/>  */}