// Model
export default function factory(data) {

    class ImageMedia {
        constructor(data) {
          this.title = data.title;
          this.image = data.image;
          this.likes = data.likes;
          this.id = data.photographerId;
        }
      
        displayInList() {
          return `<figure>
                      <img class="media-card media-image" src="../assets/medias/${this.id}/${this.image}" alt="${this.title}">
                      <div class='figcaption-container'>
                          <figcaption>${this.title}</figcaption>
                          <p class='media-likes-count'>${this.likes} <3</p>
                      </div>
                  </figure>`;
        }
      }
      

      class VideoMedia {
        constructor(data) {
          this.title = data.title;
          this.video = data.video;
          this.likes = data.likes;
          this.id = data.photographerId;
        }
      
        displayInList() {
          return `<figure>
                          <video class=" media-card media-video" width="300" height="300" controls>
                              <source  src="../assets/medias/${this.id}/${this.video}" type="video/mp4">
                              Your browser does not support the video tag.
                          </video>
                          <div class='figcaption-container'>
                          <figcaption>${this.title}</figcaption>
                          <p class='media-likes-count'>${this.likes} <3</p>
                          </div>
                      </figure>`;
        }
      }
      

    if (data.image) {
        console.log(data);
        return new ImageMedia(data)
    } else {
        return new VideoMedia(data)
    }
}

// export function mediaFactory(data) {
//     const { id, photographerId, title, image, likes, date, price } = data;


//     function getMediaCardDOM() {
//         const title = document.createElement( 'h2' );

//         const img = document.createElement( 'img' );
//         img.setAttribute("src", `../assets/medias/${photographerId}/${image} `)
//         // img.setAttribute("alt", title)
        

//         // const likes = document.createElement()

//         const mediaArticle = document.createElement("div")
//         const textPrice = document.createElement("p")

    
//         title.textContent = data.title
//         // article.setAttribute('onclick', `location.href='photographer.html?id=${photographerId}'`);

//         mediaArticle.appendChild(img);
//         mediaArticle.appendChild(title);
//         mediaArticle.appendChild(textPrice);
//         return (mediaArticle);
//     }
//     return { id, photographerId, title, image, likes, date, price, getMediaCardDOM }
// }