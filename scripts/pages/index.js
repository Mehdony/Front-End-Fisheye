    // Récuperations des datas
    import {photographerFactory} from "../factories/photographer.js"

    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        const response = await fetch("../data/photographers.json")
        const photographersList = await response.json()
        const photographers = []
        photographers.push(...photographersList.photographers)
        // et bien retourner le tableau photographers seulement une fois
        return ({
            photographers: [...photographers]})
    }

    // Affichage du model et des datas
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
            // get article from photographerModel
           
            userCardDOM.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    window.location.href = `photographer.html?id=${photographer.id}`;
                }
            })
        });
    
    };

    

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers(); 
        displayData(photographers);
    };
    
    init();

  
    