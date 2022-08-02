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

  constructor(url) {
    const element = this.buildDOM(url)
    document.body.appendChild(element)
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
      return dom
  }
}

/* <div class="lightbox">

</div> */
// Lightbox.init()
export default Lightbox;
{/* <div class="lightbox_loader"><div/>  */}