var requete = new XMLHttpRequest();
let tPrice;
fetch("http://localhost:3000/api/cameras/", {method:"GET"})
  .then(function(response){
    return response.json();
  })
  .then(function (response){
    let panier = localStorage.getItem("panier");
    if (panier != null){
        createProducts(response); 
        eventDelProduct(response);
        totalPrice(response);
    }
    else {
        let mainDiv = document.getElementById("mainDiv");
        mainDiv.innerHTML = "Vous n'avez pas d'articles dans votre panier. <br> Veuillez retourner à l'accueil et sélectionner un article avant de poursuivre.";
        let form = document.getElementById("form-basket");
        form.innerHTML = "";
        let footer = document.getElementById("footer");
        footer.innerHTML = "";
        let total = document.getElementById("totalPrice");
        total.innerHTML = "";
        let btnCleanBasket = document.getElementById("btnCleanBasket");
        btnCleanBasket.innerHTML = "";
    }
  })
  .catch(function(error){
    let mainDiv = document.getElementById("mainDiv");
    mainDiv.innerHTML = "L'erreur suivante a été identifiée : " + error;
    let form = document.getElementById("form-basket");
    form.innerHTML = "";
    let footer = document.getElementById("footer");
    footer.innerHTML = "";
  })
formPost();