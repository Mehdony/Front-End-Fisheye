class Lightbox {
  static init() {
    const links = document.querySelectorAll(
      'img[src$=".png"], img[src$=".jpg"], img[src$=".jpeg"]'
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
    this.onKeyUp = this.onKeyUp.bind(this)
    document.body.appendChild(this.element)
    document.addEventListener("keyup", this.onKeyUp.bind(this))
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

  buildDOM(url) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `
    <button class="lightbox_close">Close</button>
    <button class="lightbox_next"> next </button>
    <button class="lightbox_prev"> prev </button>
    <div class="lightbox_container"> 
    <img src="${url}"/>
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