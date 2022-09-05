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
                      <figcaption>${this.title} </figcaption>
                      <h2 class='media-likes-count'>${this.likes} </h2> 
                      <img src='../assets/icons/heart.svg'  class='heart-icon' alt='heart'>
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
                          <video class=" media-card media-video" width="300" height="300"  src="../assets/medias/${this.id}/${this.video}" type="video/mp4" alt="${this.title}">
                              <source  src="../assets/medias/${this.id}/${this.video}" type="video/mp4">
                              Your browser does not support the video tag.
                          </video>
                          <div class='figcaption-container'>
                          <figcaption>${this.title}</figcaption>
                          <h2 class='media-likes-count'>${this.likes} </h2>
                          <img src='../assets/icons/heart.svg'  class='heart-icon' alt='heart'>
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

