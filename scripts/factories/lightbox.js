class Lightbox {

    static init() {
    const links = document.querySelectorAll('img[src$=".png"], img[src$=".jpg"], img[src$=".jpeg"]')
    links.forEach((link) =>
    link.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(link);
        new Lightbox(e.currentTarget.getAttribute("src"));
        })
      );
  }

  constructor (url) {

  }

}



/* <div class="lightbox">
<button class="lightbox_close">X</button>
<button class="lightbox_next"> > </button>
<button class="lightbox_prev"> < </button>
<div class="lightbox_container">
  <img class="media-card media-image" src="../assets/medias/${data}" alt="${this.title}">
</div>
</div> */
// Lightbox.init()
export default Lightbox


