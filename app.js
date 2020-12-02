//////////////////////////////////////////////////////// Clean Basket ////////////////////////////////////////////////////////////////////////////////////////////
function cleanBasket(response) { //Fonction qui nettoie l'integralité du panier
document.getElementById("clean-basket").addEventListener("click", function(){ // On récupère le bouton pour vider le panier
	localStorage.clear(); // On clean le panier et donc le localStorage (On se le permet car on sait qu'il n'est utilisé que pour le panier)
    displayMiniBasket(response); // On met à jour le contenu du mini-panier dans le header
    createProducts(response); // On met à jour les articles de createProducts
    let totalPrice = document.getElementById("total-price");
    totalPriceClear ="";
    totalPrice.innerHTML = totalPriceClear;


    });
}







////////////////////////////////////////////////////////// page Panier /////////////////////////////////////////////////////////////////


function createProducts(response) { // fonction qui crée les articles des produits de la page panier

    let basket = localStorage.getItem("panier"); //on récupere le panier dans le localStorage
    let panier = JSON.parse(basket); // on utilise l'item panier du localstorage comme un tableau

    let allArticles = ""; // on crée une varable qui contient une string vide
    let mainDiv = document.getElementById('mainDiv'); // récupération de l'element mainDiv dans l'html

    if (panier != null){ //si le panier est null
    for(i = 0; i < panier.length; i++) {// on boucle jusqu'à la fin du tableau panier
            let product = response.filter(function(element){ //on utilise filter pour comparer les id du panier avec les éléments de l'API

                return panier[i] == element._id; // on retourne le contenu d'un élement dans panier qui contient l'id du produits
            });

            let priceDiv = product[0].price / 100;
                
            let article = // creation de l'article en HTML celon le produit
                '<div class="row mb-4 border-bottom">'+
                    '<div class="col-3 mb-2">'+
                        '<div class="img-responsive">'+
                            '<img class=img-responsive src="'+ product[0].imageUrl +'">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-2 offset-1 pt-4">'+
                        '<p>qté : 1</p>'+
                    '</div>'+
                    '<div class="col-2 offset-1 pt-4">'+
                        '<button class="btn-delProduct" data-id="'+ product[0]._id +'">Supprimer</button>'+
                    '</div>'+
                    '<div class="col-2 offset-1 pt-4">'+
                        '<p id="price"> <b>'+ priceDiv + ' € </b></p>'+
                    '</div>'+
                '</div>'

                    
                                   
                    allArticles += article; //on ajoute la variable article dans la variable allArticles
        }
    }
                
                mainDiv.innerHTML = allArticles; //on applique la modification de la variable allArticles qui contient l'element HTML mainDiv
                
}


function totalPrice(response) {
    let totalPrice = 0; // on initie la variable totalPrice, et lui ajoute la valeur 0 par sécurité
    let totalP = document.getElementById("total-price");  // on recupere l'element HTML total-price
    let basket = JSON.parse(localStorage.getItem("panier")); // on récupere l'élement du localStorage "panier", le transforme en tableau puis on le met dans une variable
    let allArticles = ""; // on crée une varable qui contient une string vide

    if (basket != null){
        for (i = 0; i < basket.length; i++) { // on crée la boucle sur la longueur du panier
            let productPrice = response.filter(function(element){ //on crée une variable qui contient le résultat du filter (l'objet de l'API)

                return basket[i] == element._id;
            });
            let priceDiv = productPrice[0].price / 100; // on divise le prix par 100
            totalPrice = totalPrice + priceDiv; // On ajoute PriceDiv dans totalPrice (totalPrice était égale a 0)
        }

        let article = '<b>'+ totalPrice + ' € </b>' // on crée la balise en HTML

        allArticles += article; //on ajoute la variable article dans la variable allArticles
        totalP.innerHTML = allArticles; //on applique la modification de la variable allArticles qui contient l'element HTML total-price
    }
}







// //////////////////////////////////////////////////////// Creation d'articles page INDEX \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



function createArticle(response) { //fonction qui crée les articles dans la page Index
    let allArticles = "";  //Création d'une variable qui contient une string vide
    let mainDiv = document.getElementById('mainDiv'); // recupere l'element mainDiv dans l'HTML
    
    for(i = 0; i < response.length; i++){ 
        let priceDiv = response[i].price / 100; // on divise le prix par 100
        let article = // creation de l'article en HTML celon le produit
                        '<div class="article row mb-5">'+
                        
                            '<div class="col-4">'+
                            '<a href="product.html?id='+ response[i]._id + '">'+
                                '<div class="img">'+
                                    '<img id="imgIndex" class="img-responsive" src="'+ response[i].imageUrl +'">'+ 
                                '</div>'+
                                '</a>'+ 
                            '</div>'+
                            
                            
                            '<div class="col-6 offset-1">'+
                                '<div class="description">'+
                                    '<p id="txtDescription"> '+ response[i].description + '</p>'+
                                    '<p id="lenses"> <i> '+ response[i].lenses + '</i></p><br>'+
                                    '<p id="price"> <b>'+ priceDiv + ' € </b></p>'+
        
                                    '<button class="btn-addProduct mt-3" data-id="'+ response[i]._id +'">Ajouter au panier</button>'+
                                    
                                '</div>'+
                            
                            '</div>'+ 
                           
                        '</div>'
                    
        allArticles += article; //on ajoute la variable article dans la variable allArticles
        
    }
    mainDiv.innerHTML = allArticles; //on applique la modification de la variable allArticles qui contient l'element HTML mainDiv
    
}



/////////////////////////////////////////////////// test displayMiniBasket \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



function displayMiniBasket() { // Fonction servant à afficher le mini panier dans le Header


    let all = document.getElementById("mini-product"); // On récupère le contenant de nos produits affichés
    let productInBasket = JSON.parse(localStorage.getItem('panier')); // On récupère nos produits dans le localStorage 

    if (productInBasket != null) { // Si le panier existe bien et donc n'est pas vide: on les affiches
            all.innerHTML = productInBasket.length;  //on insére le contenu


    }
}


/////////////////////////////////////////////////////////////// ADD to Basket \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//



/**Gère les boutons AddProduct */


function eventPanier() { // Fonction servant à l'ajout au panier lors du click sur un bouton
        let btnAddProduct = document.getElementsByClassName("btn-addProduct"); // récupération des elements (boutons) html contenant la class btn-addProduct

        let selectedProduct = JSON.parse(localStorage.getItem("panier")); // on transforme le localStorage panier en tableau

        if(selectedProduct === null){ // si selectedProduct est null
            selectedProduct = []; // on le transforme en tableau vide
        }
        
        for (let i = 0; i < btnAddProduct.length; i++) {  // pour tous les boutons addProduct
            
            btnAddProduct[i].addEventListener("click", function (event){ //on écoute le click du bouton addProduct
                selectedProduct.push(event.target.dataset.id); // On push l'ID du produits selectionnés dans la variable selectedProduct
                localStorage.setItem("panier", JSON.stringify(selectedProduct)); // on applique la modification au panier et le stringify

             
                displayMiniBasket(); // on actualise le panier du header
                

            });
        }
    }



    ////////////////////////////////////////////////////// Affichage des produits dans page Product ////////////////////////////////////////////////////////////////////////////






    /**
     * 
     * Le parametre produit = la réponse de l'API ( URL + IdProduct) et donc le produit individuel
     */

    function displayProducts(produit) { //Affiche le contenu de la page Product

        let allArticles = ""; //Création d'une variable qui contient une string vide
        let imgProduct = document.getElementById('imgProduct'); // recupere l'element imgProduct dans l'HTML

        let article ='<img class=img-responsive src="'+ produit.imageUrl +'">' // creation de l'image en HTML selon le produit

        allArticles += article; //on ajoute la variable article dans la variable allArticles

        imgProduct.innerHTML = allArticles; //on applique la modification de la variable allArticles qui contient l'element HTML imgProduct




        let allName = ""; //** meme principe que pour l'element imgProduct  ( au dessus)
        let nameProduct = document.getElementById('nameProduct');

        let name = '<p>'+ produit.name +'</p>' 
                                    
        allName += name;

        nameProduct.innerHTML = allName;



        let lensesProduct = document.getElementById('lensesProduct');

        let selectLenses = document.createElement("select");
        
            for (i = 0; i < produit.lenses.length; i++) { //creation de la liste deroulante pour le choix de l'objectif

                let lenseChoice = produit.lenses[i];

		        let optionLenses = document.createElement("option");
		        optionLenses.setAttribute("value", lenseChoice);
		        optionLenses.textContent = lenseChoice;
                selectLenses.appendChild(optionLenses); 

            }


        lensesProduct.appendChild(selectLenses);

        

        let allPrice = ""; //** meme principe que pour l'element imgProduct  ( au dessus)
        let priceProduct = document.getElementById('priceProduct');
        let divPrice = produit.price / 100;

        let price ='<p> Prix : <b>'+ divPrice +' €</b> </p>' // on divise le prix par 100

        allPrice += price;
        priceProduct.innerHTML = allPrice;



        let allButton = ""; //** meme principe que pour l'element imgProduct  ( au dessus)
        let buttonProduct = document.getElementById('buttonProduct');

        let button ='<button class="btn-addProduct mt-3" data-id="'+ produit._id +'">Ajouter au panier</button>'

        allButton += button;
        buttonProduct.innerHTML = allButton;



        let allDescription = ""; //** meme principe que pour l'element imgProduct  ( au dessus)
        let descriptionProduct = document.getElementById('descriptionProduct');

        let description ='<p>'+ produit.description +'</p>'

        allDescription += description;
        descriptionProduct.innerHTML = allDescription;
       

  
    }




















    /////////////////////////////////////////////////////////////////////////////////////////// PAGE CONFIRMATION ACHAT (new page basket) /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //Affiche le contenu de la page  confirmation d'achat 
    function displayAchats(response) { 

        let firstname = response.contact.firstName; // on crée toutes les variables grace a la réponse du POST contenu dans la fonction formPost
        let adresse = response.contact.address;
        let email = response.contact.email;
        let city = response.contact.city;
        let orderId = response.orderId;

        let allFirstname = ""; //Création d'une variable qui contient une string vide
        let firstnameAchat = document.getElementById('container'); // recupere l'element container dans l'HTML

        let article = // création de l'HTML en integrant les variables
        '<div class="col-8 offset-2">'+
                '<div class="grid-achat">'+
                    '<div id= "achatFirstname" class="col-10 offset-1 mb-3">'+
                        '<h1> Felicitations pour votre achat '+ firstname +' !</h1>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div class="col ml-3 mt-5">'+
                            '<p>Relevé de commande :</p>'+
                            '<p id="idCommande"></p> '+
                        '</div>'+
                    '</div>'+
                    
                    '<div class="row">'+
                        '<div id="order-id" class="col ml-3 mt-5">'+
                            '<p>Numéro de commande : <b> '+ orderId +' </b> </p>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div id="emailAchat" class="col ml-3 mt-5">'+
                            '<p> Un email de confirmation vous sera envoyé à l\'adresse : '+ email +' </p>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row">'+
                        '<div id="adresseAchat" class="col ml-3 mt-5">'+
                        '<p> Votre commande sera expédiée au '+ adresse +' à '+ city +' </p>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row">'+
                        '<div class="col-3 offset-9 mb-3 mt-5">'+
                            '<p>Montant TTC:</p>'+
                            '<p id="total-price"></p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row">'+
                    '<div class="return-index col mb-5 mt-4">'+
                        '<a href="index.html">'+
                            '<button>Retour à l\'accueil</button>'+
                        '</a>'+
                    '</div>'+
                '</div>'+
            '</div>'
        

        allFirstname += article; //on ajoute la variable article dans la variable allFirstname

        firstnameAchat.innerHTML = allFirstname; //on modifie la variable firstname qui contient l'element HTML achatFirstname

    }




    ///////////////////////////////////////////////////////////////////// Btn-DELETE-PRODUCT////////////////////////////////////////////////////////////////////////////


    function eventDelProduct(response) { //fonction qui sert a supprimer les produits individuelement
        let btnDelProduct = document.getElementsByClassName("btn-delProduct"); // on récupére le bouton HTML DelProduct
    
        let panier = JSON.parse(localStorage.getItem("panier")); // on récupere le panier et le transforme en tableau
        if(panier === null) { //si le panier est null
            panier = []; // on le transforme en tableau vide
    
        }
    
        for (let i = 0; i < btnDelProduct.length; i++) { //prend en compte TOUS les btnDelProduct
    
            btnDelProduct[i].addEventListener("click", function (event) { //écoute du bouton btnDelProduct lors d'un click
                let targ = event.target.dataset.id; // création d'une variable qui contient l'id du produit selectionné


                panier.splice(panier.indexOf(targ), 1);  //supprime l'élement sélectionné du panier
                


                localStorage.setItem("panier", JSON.stringify(panier)); //applique les modifications et transforme en JSON le panier

                createProducts(response); // on rappelle les fonctions pour raffraichir
                eventDelProduct(response);
                totalPrice(response);
                cleanBasket();
    
            
            
            });
            
        }
    }


    ////////////////////////////////////////////////////////////////////////////////// Envoi contact + product à l'API ////////////////////////////////////////////////////////////////////


    // fonction qui sert a calculer le prix total DANS LA PAGE CONFIRMATION ACHAT (new basket)
    function totalPriceProduct(response) {
        let totalP = document.getElementById("total-price"); // on récupere l'element HTML total-price
        let productPrice = 0; // on initie productPrice à 0
        let allArticles = ""; // on crée allArtcicles, contenant une string vide
        
         for (i = 0; i < response.products.length; i++) { // on parcours chaque produits
            productPrice = productPrice + response.products[i].price; // on initie productPrice et lui ajoute a chaque tour le prix du produit
        }

        let priceDiv = productPrice / 100; //on divise le total par 100
        let article = '<b>'+ priceDiv + ' € </b>' // creation de la balise HTML

        allArticles += article; // ajout de la variable article qui contient la balise HTML dans la variable qui contient une string vide
        totalP.innerHTML = allArticles; // on applique les modifs grace à innerHTML
    }


    // fonction qui sert à récuperer les id des articles et les afficher grace au POST du formPost (numero de commande)
    function idCommande (response) {
        let allProduct = ""; // on crée les variables contenant les strings vides
        let product= "";
        let idCommande = document.getElementById("idCommande"); // on récupere l'element HTML idCommande

        for(i = 0; i < response.products.length; i++) { // on parcours les produits grace au for
            product = product += response.products[i].name; // on ajoute le nom du produit dans product pour chaque produit
            
            if (i != response.products.length - 1) { // on ajoute une condition pour ajouter une virgule entre chaque nom d'article sauf pour le dernier(panier.length - 1))
                product += ", ";
            }           
            
        }
        allProduct += product; // on ajoute le produit dans une variable contenant tous les produits
        let article = '<p> <b>'+ allProduct +' </b></p>' // on crée la balse <p> en HTML
        idCommande.innerHTML = article; // on applique les modifs
    }



    function post(url, data) { // Fonction pour envoyer les données au back en asynchrone
        console.log("post url,data", url, data);
        return new Promise((resolve, reject) => { // La fonction renvoie une promesse pour éviter les callback
            let request = new XMLHttpRequest(); // On crée un nouvel objet XMLHttpRequest
            request.open("POST", url); // On initialise la requête en précisant le type et l'url cible
            request.setRequestHeader("content-type", "application/json"); // On précise ce que l'on envoi
            request.send(JSON.stringify(data)); // On envoie la requête que l'on stringify
            request.onreadystatechange = function() { // A chaque changement d'état de la propriété onreadystatechange
                if (this.readyState === 4) { // Si l'état vaut 4 (=DONE) la requête est terminée
                    if (this.status === 201) { // On check aussi le status: si il est = 201 -> la requête est un succès et une ressource a été crée
                        resolve(JSON.parse(this.responseText)); // On resolve donc la promesse en récupérant la réponse, notamment l'id de commande
                    } else {
                        reject(request); // Sinon on la rejette et on passe en argument la requête pour éventuellement récupérer les codes erreurs
                    }
                }
            }
        })
    }

    /**
     * formpPost permet de récuperer les données inputs
     */
    function formPost() {


        let inputOrder = document.getElementsByTagName("input"); // On récupère tous les input de la page (donc ceux concernant le formulaire de commande)
        let formOrder = document.getElementById("formOrder"); // On récupère le formulaire

        formOrder.addEventListener("submit", function(e){ // Lorsque le formulaire est envoyé
            e.preventDefault(); // On l'empêche de changer de page pour le rediriger nous-même
        });
        document.getElementById("confirmOrder").addEventListener("click", function(){ // A l'envoi

            if(formOrder.checkValidity()){
                let contact = { // On crée un object contact: les propriété ayant comme valeur chacune des valeurs de nos input
                    firstName: inputOrder[0].value,
                    lastName: inputOrder[1].value,
                    address: inputOrder[2].value,
                    city: inputOrder[3].value,
                    email: inputOrder[4].value
                };

                let basket = JSON.parse(localStorage.getItem("panier")); // On récupère notre panier
                let products = []; // On initialise un tableau qui contiendra les id des produits acheté et qu'on enverra au back

                for(i = 0; i < basket.length; i++) { // on parcours chaque objets en fonction la longueur du panier
                    products.push(basket[i]) // on ajoute l'element du panier dans le tableau products
                }


                let data = { contact, products }; // On défini la data à envoyer
                
                post("http://localhost:3000/api/cameras/order", data) // On envoi data au back
                .then (function(response) { // si il y a une réponse de la requete POST
                   let formBasket = document.getElementById("form-basket"); // on récupere l'element HTML form-basket
                   formBasket.innerHTML = ""; //on remplace le formulaire par une string vide pour qu'il n'apparaisse plus
                   displayAchats(response); // on appelle les fonctions pour remplacer la page basket de base par la nouvelle qui est la confirmation d'achat
                   idCommande(response);
                   totalPriceProduct(response);
                   localStorage.clear(); // on clear le localStorage pour les commandes suivantes
                   
                   
                   

                })
            }
        });
}