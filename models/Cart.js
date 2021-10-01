// module pour travailler avec les fichiers file system lire et ecrire dans fichier json
const fs = require('fs');
// Travailler avec les chemins
const path = require('path');

// recuperer le chemin de la racine du dossier shop_cart
const appDir = path.dirname(require.main.filename);
// creation du chemin vers le fichier json join pour eviter les slash et antislash
const p = path.join(appDir, 'data', 'cart.json');


class Cart {

    static add(id, productPrice,redirectPanier){

        fs.readFile(p, (err, fileContent) => {
             // creation tableau produit et prix du total
        let cart = { products: [], totalPrice: 0};
        if(!err){
            // redefinir le panier 
            cart = JSON.parse(fileContent);
        }
            // trouver la position du produit non unique 
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];

            // si le produit existe on modifie sa quantité 
            if (existingProduct) {
                cart.products[existingProductIndex].qty = cart.products[existingProductIndex].qty + 1

            }
            // s'il n'existe pas on l'ajoute au panier
            else{
                // ajout du produit au panier
                cart.products.push({id: id, qty: 1});    
            }

                // conversion chaine de caractere en nombre avec le plus devant

                // total du panier
                cart.totalPrice = cart.totalPrice + +productPrice;
        
         
        //  ecrire dans le fichier json
        fs.writeFile(p, JSON.stringify(cart), err => {
            if(err) console.log(err);
            redirectPanier()
        })

        })
       

       


    }

    static getCart(callback) {

        fs.readFile(p, (err, fileContent) => {
            // creation tableau produit et prix du total
       let cart = { products: [], totalPrice: 0};
       if(!err){
           // redefinir le panier 
           cart = JSON.parse(fileContent);
       }

       callback(cart)
           
});
    }

}

module.exports = Cart;