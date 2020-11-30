let imgIndex = document.getElementById("imgIndex");


var requete = new XMLHttpRequest();

requete.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);

        
        
        
        displayMiniBasket(); // affiche le mini panier du header 
        createArticle(response); // crée les articles dynamiques et transmet l'id dans l'url via href, sur la photo pour acceder a page product + id
        eventPanier(); // écoute les click des btns add-product, puis push les id dans le panier 
        
        
        
        
    } 
};
requete.open("GET", "http://localhost:3000/api/cameras");
requete.send();



