let url = new URL(window.location);
let params = url.searchParams;
let idProduct = params.get('id');

fetch("http://localhost:3000/api/cameras/" + idProduct, {method:"GET"})
  .then(function(response){
    return response.json();
  })
  .then(function (response){
    displayProducts(response);             
    displayMiniBasket();
    eventPanier();
  })
  .catch(function(error){
    console.log("erreur", error);
    let mainDiv = document.getElementById("container");
    mainDiv.innerHTML = "Une erreur s'est produite, le produit n'a pas été identifié, veuillez retourner à l'accueil.";
  })