// Model
export function mediaFactory(data) {
    const { id, photographerId, title, image, likes, date, price } = data;

    function getMediaCardDOM() {
        const title = document.createElement( 'h2' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", `../assets/medias/${photographerId}/${image} `)
        // img.setAttribute("alt", title)
        

        // const likes = document.createElement()

        const mediaArticle = document.createElement("div")
        const textPrice = document.createElement("p")

    
        title.textContent = data.title
        // article.setAttribute('onclick', `location.href='photographer.html?id=${photographerId}'`);

        mediaArticle.appendChild(img);
        mediaArticle.appendChild(title);
        mediaArticle.appendChild(textPrice);
        return (mediaArticle);
    }
    return { id, photographerId, title, image, likes, date, price, getMediaCardDOM }
}