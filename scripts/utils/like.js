export function like() {
    // Récupération du coeur (like)
    const likeButtons = document.querySelectorAll(".heart-icon");
    
    // pour chaque elements de la liste likeButtons 
    likeButtons.forEach((likeButton) => {
        // on initialise l'état du bouton par défault sur "non clické ( false )"
        let clicked = false;
        // au click sur un de ses boutons 
        likeButton.addEventListener ("click", (e) => {
            //  on empêche le comportement par défaut du bouton
            e.preventDefault()
            // on récupère l'élément parent du coeur (card)( pour pouvoir acceder au nombre de likes associés au coeur)
            const parent = likeButton.parentElement
            // on récupère le nombre de likes dans l'element parent du coeur 
            const nombreDeLikes = parent.querySelector('.media-likes-count')
            const totalLikes = document.querySelector(".info-like-number")
            console.log(totalLikes)
            // si le coeur n'a pas été cliqué 
            if(!clicked){
                likeButton.style.filter = "saturate(200%)"
                // on incrémente le contenu de l'élément (nombre de likes) de 1 
                nombreDeLikes.innerHTML = parseInt(nombreDeLikes.innerHTML) + 1
                totalLikes.innerHTML = parseInt(totalLikes.innerHTML) + 1
                // une fois liké on passe l'état de clicked sur true
                clicked = true
                // si le coeur a été cliqué 
            } else {
                likeButton.style.filter = "saturate(100%)"
                // on décrémente le contenu de l'élément (nombre de likes) de 1 
                nombreDeLikes.innerHTML = parseInt(nombreDeLikes.innerHTML) - 1
                totalLikes.innerHTML = parseInt(totalLikes.innerHTML) -1
                // une fois unliké on passe l'état de clicked sur false
                clicked = false
            }
    })
});
}
