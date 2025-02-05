// Model
// permet de créer un model que l'on pourra utiliser pour chaque photographe
export function photographerFactory(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
        article.setAttribute("tabindex", 1);
        article.setAttribute("data-id", id);   
        article.classList.add("photographer_card"); 
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `portrait de ${name}`);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const location = document.createElement("p");
    location.textContent = `${city}, ${country}`;
    location.classList.add("location");

    const description = document.createElement("p");
    description.textContent = tagline;
    description.classList.add("description");

    const textPrice = document.createElement("p");
    textPrice.textContent = `${price}€/jour`;
    textPrice.classList.add("textPrice");

    article.setAttribute(
      "onclick",
      `location.href='photographer.html?id=${id}'`
    );
    
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(description);
    article.appendChild(textPrice);

    return article;
  }



  return { name, picture, id, getUserCardDOM };
}
