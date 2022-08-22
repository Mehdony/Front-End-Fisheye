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
  // modal.style.padding =  "50px"
  modal.style.backgroundColor = "rgba(255, 255, 255, 0.6)"
  const name = document.querySelector(".photograph-name").textContent
  const contactNameContainer = document.querySelector(".modal-title")
  contactNameContainer.innerHTML = "Contactez-moi" +  "</br>" + name

}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

const contactForm = document.querySelector(".contact_form");

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
