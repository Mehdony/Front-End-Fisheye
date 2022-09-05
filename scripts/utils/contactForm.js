// Affichage de la modal avec le style
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.right = "0";
  modal.style.bottom = "0";
  modal.style.margin = "0";
  modal.style.backgroundColor = "rgba(255, 255, 255, 0.6)"
  const name = document.querySelector(".photograph-name").textContent
  const contactNameContainer = document.querySelector(".modal-title")
  contactNameContainer.innerHTML = "Contactez-moi" +  "</br>" + name

}
// fonction qui permet de fermer la modal
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}


// ferme la modal lorsqu'on presse la touche escape
document.addEventListener("keydown", (e) => {
if(e.key === "Escape") {
  closeModal()
}
})

const contactForm = document.querySelector(".contact_form");

// On submit: Envoi du formulaire 
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const prenom = document.getElementById("prenom").value;
  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const formData = new FormData()
  formData.append("Prénom", prenom)
  formData.append("Nom", nom)
  formData.append("Email", email)
  formData.append("Message", message)
  for (const [key, value] of formData.entries()){
    console.log(`${key}: ${value}`)
  }
closeModal()
});
