let imgIndex = document.getElementById("imgIndex");
var requete = new XMLHttpRequest();

fetch("http://localhost:3000/api/cameras/", {method:"GET"})
  .then(function(response){
    return response.json();
  })
  .then(function(response){
    displayMiniBasket(); // affiche le mini panier du header 
    createArticle(response); // crée les articles dynamiques et transmet l'id dans l'url via href, sur la photo pour acceder a page product + id
    eventPanier(); // écoute les click des btns add-product, puis push les id dans le panier     
  })
  .catch(function(error){
    console.log("erreur", error);
    let divDel = document.getElementById("mainDiv");
    divDel.innerHTML = "";
    let mainDiv = document.getElementById("container");
    mainDiv.innerHTML = "L'erreur suivante s'est produite : " + error;
    let footer = document.getElementById("footer");
    footer.innerHTML = "";
  })