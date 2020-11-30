var requete = new XMLHttpRequest();

let tPrice;

requete.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

        let response = JSON.parse(this.responseText);

        
        createProducts(response); 
        eventDelProduct(response);
        cleanBasket(response);

        
        totalPrice(response);
        
        
        
        
    } 

};
requete.open("GET", "http://localhost:3000/api/cameras");
requete.send();

formPost();
